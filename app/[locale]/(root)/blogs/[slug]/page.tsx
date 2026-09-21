import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/app/[locale]/(root)/blogs/[slug]/_components/article-detail";
import { ArticlesSection } from "@/app/[locale]/(root)/blogs/[slug]/_components/articles-section";
import { mockArticles } from "@/lib/data/mock-articles";

export function generateStaticParams() {
  return mockArticles.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = mockArticles.find((article) => article.slug === slug);
  if (!post) notFound();
  return createPageMetadata(post.title, post.excerpt, locale, "article");
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("Blogs");
  const post = mockArticles.find((article) => article.slug === slug);
  if (!post) notFound();
  const related = mockArticles
    .filter((article) => article.id !== post.id)
    .sort(
      (a, b) =>
        Number(b.category === post.category) -
        Number(a.category === post.category),
    )
    .slice(0, 3);

  return (
    <>
      <ArticleDetail post={post} />
      <div className="border-t bg-muted/30">
        <ArticlesSection posts={related} title={t("keepExploring")} />
      </div>
    </>
  );
}
