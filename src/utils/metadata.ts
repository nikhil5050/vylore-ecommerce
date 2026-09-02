import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function buildMetadata({ title, description, path, noIndex, keywords }: BuildMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  // The root layout applies a "%s | Vylore" title template to `title`, but that
  // template doesn't cascade into nested openGraph/twitter fields, so build the
  // full title explicitly for those.
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
