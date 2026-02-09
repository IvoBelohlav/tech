import { deliverLeadToWebhook } from "@/lib/lead/delivery";
import { leadPayloadSchema, zodIssuesToFieldErrors } from "@/lib/lead/schema";
import { getRequestIp } from "@/lib/http/requestIp";
import { createInMemoryRateLimiter } from "@/lib/spam/rateLimit";

const leadLimiter = createInMemoryRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 8,
});

function getFallbackEmail() {
  return (
    process.env.LEAD_FALLBACK_EMAIL ??
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
    "contact@ebrix.tech"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        ok: false,
        error: {
          type: "validation",
          fieldErrors: { _form: ["Invalid JSON payload."] },
        },
      },
      { status: 400 }
    );
  }

  const parsed = leadPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        error: {
          type: "validation",
          fieldErrors: zodIssuesToFieldErrors(parsed.error.issues),
        },
      },
      { status: 400 }
    );
  }

  const lead = parsed.data;

  // Honeypot: silently accept but do not deliver.
  if (lead.website && lead.website.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const ip = getRequestIp(request) ?? "unknown";
  const rate = leadLimiter.check(ip);
  if (!rate.ok) {
    return Response.json(
      {
        ok: false,
        error: {
          type: "rate_limit",
          message: "Too many submissions. Please try again in a few minutes.",
          retryAfterSeconds: rate.retryAfterSeconds,
        },
      },
      {
        status: 429,
        headers: { "retry-after": String(rate.retryAfterSeconds) },
      }
    );
  }

  try {
    const timeoutMsRaw = process.env.LEAD_WEBHOOK_TIMEOUT_MS;
    const timeoutMs = timeoutMsRaw ? Number(timeoutMsRaw) : undefined;

    await deliverLeadToWebhook(lead, {
      webhookUrl: process.env.LEAD_WEBHOOK_URL,
      webhookAuthHeader: process.env.LEAD_WEBHOOK_AUTH_HEADER,
      timeoutMs:
        typeof timeoutMs === "number" && Number.isFinite(timeoutMs) && timeoutMs > 0
          ? timeoutMs
          : undefined,
    });
    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json(
      {
        ok: false,
        error: {
          type: "delivery",
          message:
            "We could not deliver your request right now. Please try again later.",
          fallbackEmail: getFallbackEmail(),
        },
      },
      { status: 503 }
    );
  }
}
