"use client";

// macOS 트래픽 라이트 스타일 이전·현재·다음 페이지 내비게이션 버튼
import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type BrowserWindowNavTarget = {
  href: string;
  label: string;
};

export type BrowserWindowNavControlsProps = {
  prev?: BrowserWindowNavTarget | null;
  current: BrowserWindowNavTarget;
  next?: BrowserWindowNavTarget | null;
};

/** macOS 트래픽 라이트 — 가시성 개선 (16px 원) */
const controlBase =
  "flex size-4 sm:size-5 shrink-0 items-center justify-center rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.32)] ring-1 ring-black/18";

const iconActive = "text-[#1f1408]";
const iconDisabled = "text-[#1f1408]/42";

const iconSize = "size-2.5 sm:size-3";

const tones = {
  prev: {
    bg: "bg-[#ff5f57]",
    dim: "brightness-[0.82]",
  },
  current: {
    bg: "bg-[#febc2e]",
  },
  next: {
    bg: "bg-[#28c840]",
    dim: "brightness-[0.82]",
  },
} as const;

function NavControlLink({
  href,
  label,
  tone,
  children,
}: {
  href: string;
  label: string;
  tone: "prev" | "next";
  children: ReactNode;
}) {
  const t = tones[tone];

  return (
    <Link
      href={href}
      className={`${controlBase} ${t.bg} ${iconActive} transition-[filter,transform] duration-150 hover:brightness-110 active:scale-95`}
      aria-label={label}
    >
      {children}
    </Link>
  );
}

function NavControlDisabled({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "prev" | "next";
  children: ReactNode;
}) {
  const t = tones[tone];

  return (
    <span
      className={`${controlBase} cursor-default ${t.bg} ${iconDisabled} ${t.dim}`}
      aria-label={label}
      aria-disabled="true"
    >
      {children}
    </span>
  );
}

export default function BrowserWindowNavControls({
  prev,
  current,
  next,
}: BrowserWindowNavControlsProps) {
  return (
    <nav
      className="flex shrink-0 items-center gap-1.5"
      aria-label="페이지 이동"
    >
      {prev ? (
        <NavControlLink href={prev.href} label={prev.label} tone="prev">
          <ChevronLeft className={iconSize} strokeWidth={3} aria-hidden />
        </NavControlLink>
      ) : (
        <NavControlDisabled label="이전 페이지 없음" tone="prev">
          <ChevronLeft className={iconSize} strokeWidth={3} aria-hidden />
        </NavControlDisabled>
      )}

      <span
        className={`${controlBase} ${tones.current.bg} ${iconActive}`}
        aria-label={current.label}
        aria-current="page"
        title={current.label}
      >
        <span className="block size-1 rounded-full bg-current" aria-hidden />
      </span>

      {next ? (
        <NavControlLink href={next.href} label={next.label} tone="next">
          <ChevronRight className={iconSize} strokeWidth={3} aria-hidden />
        </NavControlLink>
      ) : (
        <NavControlDisabled label="다음 페이지 없음" tone="next">
          <ChevronRight className={iconSize} strokeWidth={3} aria-hidden />
        </NavControlDisabled>
      )}
    </nav>
  );
}
