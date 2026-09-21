import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getProperty } from "@/api/property";
import { createPageMetadata } from "@/lib/metadata";
import { PropertyDetail } from "@/app/[locale]/(root)/properties/[slug]/_components/property-detail";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const fallback = createPageMetadata(
    t("propertyTitle"),
    t("propertyDescription"),
    locale,
  );

  try {
    const property = await getProperty(slug);
    if (!property) {
      return {
        ...createPageMetadata(
          t("propertyNotFoundTitle"),
          t("propertyNotFoundDescription"),
          locale,
        ),
        robots: { index: false, follow: false },
      };
    }

    const description = property.description
      ?.replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);

    return createPageMetadata(
      property.title || t("propertyTitle"),
      description || property.subtitle || t("propertyDescription"),
      locale,
    );
  } catch {
    // Keep the detail page available for client-side retries during API outages.
    return fallback;
  }
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <Link
        href="/properties"
        className="group mb-8 inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        <span>All properties</span>
      </Link>
      <PropertyDetail slug={slug} />
    </div>
  );
}
