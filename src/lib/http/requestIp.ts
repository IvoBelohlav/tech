function firstIp(value: string) {
  // x-forwarded-for can be a comma-separated list: client, proxy1, proxy2...
  const first = value.split(",")[0]?.trim();
  return first || null;
}

export function getRequestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return firstIp(forwarded);

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return firstIp(realIp);

  return null;
}

