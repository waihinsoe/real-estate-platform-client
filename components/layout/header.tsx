import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "../button/language-toggle";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const links = [
  { href: "/properties", label: "properties" },
  { href: "/blogs", label: "articles" },
];

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label={t("mainNavigation")}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Suspense
            fallback={
              <Skeleton className="h-11 w-40 rounded-full" aria-hidden="true" />
            }
          >
            <LanguageToggle />
          </Suspense>
          <ThemeToggle />

          <Link className={buttonVariants()} href="/properties">
            {t("findProperty")}
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
