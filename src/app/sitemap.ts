import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-02-09";

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}

