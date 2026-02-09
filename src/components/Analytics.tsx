import Script from "next/script";

function getPlausibleConfig() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  const scriptSrc =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL ??
    "https://plausible.io/js/script.js";

  return { domain, scriptSrc };
}

export function Analytics() {
  const plausible = getPlausibleConfig();
  if (!plausible) return null;

  return (
    <Script
      src={plausible.scriptSrc}
      data-domain={plausible.domain}
      strategy="afterInteractive"
    />
  );
}

