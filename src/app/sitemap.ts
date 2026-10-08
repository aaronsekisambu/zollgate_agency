import type { MetadataRoute } from "next";
import { players, posts, siteUrl } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/players", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/news", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ];

  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p.path}`, priority: p.priority })),
    ...players.map((p) => ({ url: `${siteUrl}/players/${p.slug}`, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${siteUrl}/news/${p.slug}`, lastModified: p.date, priority: 0.6 })),
  ];
}
