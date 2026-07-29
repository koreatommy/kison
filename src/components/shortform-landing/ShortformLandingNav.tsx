// /shortform 랜딩 — 상단 고정 내비 (sticky, backdrop-blur)
import { curriculumMeta, navLinks } from "@/data/shortformCurriculum";

export default function ShortformLandingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--sf-ink)]/8 bg-[var(--sf-bg)]/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2 truncate text-sm font-extrabold tracking-[-0.02em] text-[var(--sf-ink)] sm:text-base"
        >
          <span className="text-[var(--sf-blue)]">✦</span>
          {curriculumMeta.brand}
        </a>
        <nav aria-label="프로그램 섹션" className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-xs font-bold tracking-[0.04em] text-[var(--sf-ink)]/65 transition-colors duration-150 hover:bg-[var(--sf-blue)]/10 hover:text-[var(--sf-blue)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#lab"
          className="rounded-lg bg-[var(--sf-blue)] px-3 py-1.5 text-xs font-bold tracking-[0.02em] text-white transition-colors duration-150 hover:bg-[var(--sf-blue-soft)] sm:px-4 sm:py-2 sm:text-sm"
        >
          AI 실습 보기
        </a>
      </div>
    </header>
  );
}
