import type { Metadata } from "next";
import { siteUrl } from "@/lib/data";

export const siteName = "Zollgate Agency";

// Branded fallbacks served from app/opengraph-image.jpg and app/twitter-image.jpg.
const defaultImageAlt = "Zollgate Agency — Your talent. Our game plan. Football player representation.";
const defaultOgImage = { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: defaultImageAlt };
const defaultTwitterImage = { url: "/twitter-image.jpg", width: 1200, height: 630, alt: defaultImageAlt };

type PageSeo = {
  title: string;
  description: string;
  path: string;
  /** Share image; omit to use the branded default. */
  image?: { url: string; alt: string };
  article?: { publishedTime: string; section?: string; tags?: string[] };
  keywords?: string[];
};

/** Trims text to a search/social friendly length on a word boundary. */
export function clip(text: string, max = 160) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "") + "…";
}

/** Full metadata for a page: description, canonical URL, Open Graph and X/Twitter cards. */
export function pageMetadata({ title, description, path, image, article, keywords }: PageSeo): Metadata {
  // Avoid "X joins Zollgate Agency | Zollgate Agency".
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const desc = clip(description);

  return {
    title: { absolute: fullTitle },
    description: desc,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: path,
      siteName,
      locale: "en_GB",
      images: [image ?? defaultOgImage],
      ...(article
        ? { type: "article", publishedTime: article.publishedTime, section: article.section, tags: article.tags }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc, images: [image ?? defaultTwitterImage] },
  };
}

/** Breadcrumb trail for structured data, starting at the homepage. */
export function breadcrumbs(...items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
