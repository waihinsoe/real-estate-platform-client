import type { Metadata } from "next";

export const siteName = "Lucky7andOne";

export function createPageMetadata(
  title: string,
  description: string,
  locale: string,
  type: "website" | "article" = "website",
): Metadata {
  const brandedTitle = `${title} | ${siteName}`;

  return {
    title: { absolute: brandedTitle },
    description,
    openGraph: {
      title: brandedTitle,
      description,
      siteName,
      locale: locale === "my" ? "my_MM" : "en_US",
      type,
    },
    twitter: {
      card: "summary",
      title: brandedTitle,
      description,
    },
  };
}
