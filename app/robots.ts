import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pohodazdomova.cz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout", "/diky"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
