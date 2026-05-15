"use client";

// 브라우저 크롬 좌측 홈·대시보드 바로가기 (호버 시 툴팁)
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard } from "lucide-react";

const iconBtn =
  "group relative flex size-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/[0.08] hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400/60 sm:size-9";

const iconSize = "size-4 sm:size-[1.125rem]";

function NavIconLink({
  href,
  label,
  tooltip,
  isActive,
  children,
}: {
  href: string;
  label: string;
  tooltip: string;
  isActive: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${iconBtn} ${isActive ? "bg-white/[0.1] text-amber-300" : ""}`}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-[calc(100%+6px)] z-50 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#2a2a2c] px-2.5 py-1.5 text-[11px] font-semibold text-zinc-200 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {tooltip}
      </span>
    </Link>
  );
}

export default function BrowserWindowNavControls() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  return (
    <nav className="flex shrink-0 items-center gap-1 sm:gap-1.5" aria-label="바로가기">
      <NavIconLink
        href="/"
        label="홈으로 이동"
        tooltip="인트로 페이지로 이동"
        isActive={isHome}
      >
        <Home className={iconSize} strokeWidth={2.25} aria-hidden />
      </NavIconLink>

      <NavIconLink
        href="/dashboard"
        label="대시보드로 이동"
        tooltip="대시보드로 이동"
        isActive={isDashboard}
      >
        <LayoutDashboard className={iconSize} strokeWidth={2.25} aria-hidden />
      </NavIconLink>
    </nav>
  );
}
