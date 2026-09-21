import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="ZawTiKa Home"
      className="inline-flex items-center gap-3.5"
    >
      <div className="relative bg-white! size-14 shrink-0 sm:size-16">
        <Image
          src="/images/lucky7andOne-logo.png"
          alt="ZawTiKa"
          fill
          priority
          sizes="64px"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-baseline text-2xl font-bold leading-none tracking-tight sm:text-3xl">
          <span className="text-foreground group-hover:text-primary">
            Lucky
          </span>

          <span className="text-primary">7andOne</span>
        </div>

        <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-xs">
          Real Estate Platform
        </span>
      </div>
    </Link>
  );
}
