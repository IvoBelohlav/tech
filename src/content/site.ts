export const SITE = {
  name: "Ebrix",
  domain: "ebrix.tech",
  url: "https://ebrix.tech",
  tagline: "Turn excess renewables into reliable industrial heat.",
  description:
    "Ebrix is an industry-first thermal battery concept that stores excess renewable electricity as high-temperature heat for 24/7 process heat and steam.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@ebrix.tech",
} as const;

export const NAV_ITEMS = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "how", label: "How it works" },
  { id: "industries", label: "Industries" },
  { id: "ai", label: "AI" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
] as const;

