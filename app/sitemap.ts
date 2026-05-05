import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pohodazdomova.cz";

const STATIC_PATHS = [
  "",
  "/pribeh",
  "/sdilet-pribeh",
  "/bundle",
  "/ai-ugc-reklamy",
  "/ai-grafika",
  "/ai-weby",
  "/obchodni-podminky",
  "/gdpr",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/ai-") || path === "/bundle" ? 0.9 : 0.5,
  }));
}
