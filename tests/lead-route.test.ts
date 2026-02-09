import { afterEach, describe, expect, test, vi } from "vitest";
import { POST } from "../src/app/api/lead/route";

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.LEAD_WEBHOOK_URL;
  delete process.env.LEAD_WEBHOOK_AUTH_HEADER;
  delete process.env.LEAD_WEBHOOK_TIMEOUT_MS;
});

describe("POST /api/lead", () => {
  test("delivers a valid payload to the configured webhook (expected case)", async () => {
    process.env.LEAD_WEBHOOK_URL = "https://example.test/webhook";

    const fetchMock = vi.fn(async () => new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(
      new Request("http://localhost/api/lead", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "203.0.113.10",
        },
        body: JSON.stringify({
          name: "Ada",
          company: "Acme",
          email: "ada@example.com",
          website: "",
        }),
      })
    );

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("returns a delivery error when the webhook fails (provider failure case)", async () => {
    process.env.LEAD_WEBHOOK_URL = "https://example.test/webhook";

    vi.stubGlobal("fetch", vi.fn(async () => new Response("no", { status: 500 })));

    const res = await POST(
      new Request("http://localhost/api/lead", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "203.0.113.11",
        },
        body: JSON.stringify({
          name: "Ada",
          company: "Acme",
          email: "ada@example.com",
          website: "",
        }),
      })
    );

    expect(res.status).toBe(503);
    const json = (await res.json()) as unknown as {
      ok: boolean;
      error: { type: string; fallbackEmail: string };
    };
    expect(json.ok).toBe(false);
    expect(json.error.type).toBe("delivery");
    expect(typeof json.error.fallbackEmail).toBe("string");
  });

  test("returns validation errors for invalid input (invalid payload case)", async () => {
    process.env.LEAD_WEBHOOK_URL = "https://example.test/webhook";

    const fetchMock = vi.fn(async () => new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(
      new Request("http://localhost/api/lead", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "203.0.113.12",
        },
        body: JSON.stringify({
          name: "Ada",
          company: "Acme",
          email: "not-an-email",
          website: "",
        }),
      })
    );

    expect(res.status).toBe(400);
    const json = (await res.json()) as unknown as {
      ok: boolean;
      error: { type: string; fieldErrors: Record<string, string[]> };
    };
    expect(json.ok).toBe(false);
    expect(json.error.type).toBe("validation");
    expect(json.error.fieldErrors.email?.length).toBeGreaterThan(0);
    expect(fetchMock).toHaveBeenCalledTimes(0);
  });
});

