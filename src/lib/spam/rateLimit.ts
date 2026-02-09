export type RateLimitOk = { ok: true };
export type RateLimitBlocked = { ok: false; retryAfterSeconds: number };
export type RateLimitResult = RateLimitOk | RateLimitBlocked;

export type InMemoryRateLimiter = {
  check: (key: string, nowMs?: number) => RateLimitResult;
};

export function createInMemoryRateLimiter(options: {
  windowMs: number;
  max: number;
}): InMemoryRateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>();

  const cleanup = (now: number) => {
    // Opportunistic cleanup to keep memory bounded.
    for (const [key, entry] of hits.entries()) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  };

  const check = (key: string, nowMs = Date.now()): RateLimitResult => {
    cleanup(nowMs);

    const existing = hits.get(key);
    if (!existing || existing.resetAt <= nowMs) {
      hits.set(key, { count: 1, resetAt: nowMs + options.windowMs });
      return { ok: true };
    }

    if (existing.count >= options.max) {
      return {
        ok: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((existing.resetAt - nowMs) / 1000)
        ),
      };
    }

    existing.count += 1;
    return { ok: true };
  };

  return { check };
}

