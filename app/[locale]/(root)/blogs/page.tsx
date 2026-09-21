import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ArticlesExplorer } from "@/app/[locale]/(root)/blogs/_components/articles-explorer";
import { mockArticles } from "@/lib/data/mock-articles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blogs" });
  return createPageMetadata(t("metadataTitle"), t("metadataDescription"), locale);
}

export default function ArticlesPage() {
  const t = useTranslations("Blogs");
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase leading-6 tracking-wider text-primary">
          {t("journal")}
        </p>
        <h1 className="mt-6 text-4xl leading-relaxed sm:text-5xl sm:leading-relaxed">
          {t("title")}
        </h1>
        <p className="mt-8 leading-8 text-muted-foreground">
          {t("description")}
        </p>
      </header>
      <ArticlesExplorer posts={mockArticles} />
    </div>
  );
}
