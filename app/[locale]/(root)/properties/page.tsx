import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createPageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import { PropertiesExplorer } from "@/app/[locale]/(root)/properties/[slug]/_components/item/properties-explorer";
import { PropertiesExplorerSkeleton } from "@/components/loading/properties-explorer-skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return createPageMetadata(t("propertiesTitle"), t("propertiesDescription"), locale);
}

export default function PropertiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <h1 className="font-serif text-4xl">Properties</h1>
      <p className="mb-8 mt-3 text-muted-foreground">
        Find your next home, investment, or business space.
      </p>
      <Suspense fallback={<PropertiesExplorerSkeleton />}>
        <PropertiesExplorer />
      </Suspense>
    </div>
  );
}
