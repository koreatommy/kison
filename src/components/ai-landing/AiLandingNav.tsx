// /ai 랜딩 — 상단 고정 내비 (앵커 이동)
import { curriculumMeta } from "@/data/aiCareerCurriculum";

const links = [
  { href: "#message", label: "핵심" },
  { href: "#goals", label: "목표" },
  { href: "#schedule", label: "일정" },
  { href: "#prompts", label: "프롬프트" },
] as const;

export default function AiLandingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--ai-ink)]/8 bg-[var(--ai-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <a
          href="#top"
          className="truncate text-sm font-extrabold tracking-[-0.02em] text-[var(--ai-ink)] sm:text-base"
        >
          {curriculumMeta.brand}
        </a>
        <nav aria-label="교안 섹션" className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-xs font-bold tracking-[0.04em] text-[var(--ai-ink)]/65 transition-colors duration-150 hover:bg-[var(--ai-teal)]/10 hover:text-[var(--ai-teal)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#prompts"
          className="rounded-lg bg-[var(--ai-teal)] px-3 py-1.5 text-xs font-bold tracking-[0.02em] text-white transition-colors duration-150 hover:bg-[var(--ai-teal-deep)] sm:px-4 sm:py-2 sm:text-sm"
        >
          실습 시작
        </a>
      </div>
    </header>
  );
}
