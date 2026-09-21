import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createPageMetadata } from "@/lib/metadata";
import { HeroSection } from "./_components/section/hero-section";
import { FeaturedPropertiesSection } from "./_components/section/featured-properties-section";
import { ServicesSection } from "./_components/section/services-section";
import { HomeArticlesSection } from "./_components/section/articles-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return createPageMetadata(t("homeTitle"), t("homeDescription"), locale);
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPropertiesSection />
      <ServicesSection />
      <HomeArticlesSection />
    </>
  );
}
