// /bonus 랜딩 — 상단 고정 내비
import { bonusMeta } from "@/data/bonusStyles";

export default function BonusLandingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--bonus-ink)]/8 bg-[var(--bonus-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <a
          href="#top"
          className="truncate text-sm font-extrabold tracking-[-0.02em] text-[var(--bonus-ink)] sm:text-base"
        >
          {bonusMeta.brand}
        </a>
        <a
          href="#styles"
          className="rounded-lg bg-[var(--bonus-amber)] px-3 py-1.5 text-xs font-bold tracking-[0.02em] text-white transition-colors duration-150 hover:bg-[var(--bonus-amber-deep)] sm:px-4 sm:py-2 sm:text-sm"
        >
          스타일 보기
        </a>
      </div>
    </header>
  );
}
