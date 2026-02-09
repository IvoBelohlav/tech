import type { LeadPayload } from "./schema";

export class LeadDeliveryError extends Error {
  public readonly code: "missing_config" | "upstream_error" | "unexpected";
  public readonly status?: number;

  constructor(
    code: LeadDeliveryError["code"],
    message: string,
    options?: { status?: number; cause?: unknown }
  ) {
    super(message);
    this.code = code;
    this.status = options?.status;
    if (options?.cause) (this as { cause?: unknown }).cause = options.cause;
  }
}

export type LeadDeliveryConfig = {
  webhookUrl?: string;
  webhookAuthHeader?: string;
  timeoutMs?: number;
  fetchFn?: typeof fetch;
};

export async function deliverLeadToWebhook(
  lead: LeadPayload,
  config: LeadDeliveryConfig
) {
  if (!config.webhookUrl) {
    throw new LeadDeliveryError(
      "missing_config",
      "Lead intake is not configured."
    );
  }

  const fetchFn = config.fetchFn ?? fetch;
  const timeoutMs = config.timeoutMs ?? 8000;

  let res: Response;
  try {
    res = await fetchFn(config.webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(config.webhookAuthHeader
          ? { authorization: config.webhookAuthHeader }
          : {}),
      },
      body: JSON.stringify({
        lead,
        receivedAt: new Date().toISOString(),
        source: "ebrix-web",
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (cause) {
    throw new LeadDeliveryError(
      "unexpected",
      "Failed to deliver the lead intake request.",
      { cause }
    );
  }

  if (!res.ok) {
    throw new LeadDeliveryError(
      "upstream_error",
      "Lead intake destination rejected the request.",
      { status: res.status }
    );
  }
}

