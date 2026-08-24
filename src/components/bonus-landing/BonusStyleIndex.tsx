// /bonus 랜딩 — 1~49 점프 인덱스 (전수 표시)
import { bonusStyles } from "@/data/bonusStyles";

export default function BonusStyleIndex() {
  return (
    <nav
      aria-label="스타일 번호 바로가기"
      className="border-y border-[var(--bonus-ink)]/8 bg-[var(--bonus-card)]/80"
    >
      <div className="mx-auto max-w-5xl px-5 py-4 sm:px-8">
        <p className="mb-3 text-[11px] font-bold tracking-[0.1em] text-[var(--bonus-amber)] uppercase">
          Jump to style
        </p>
        <div className="flex flex-wrap gap-1.5">
          {bonusStyles.map((style) => (
            <a
              key={style.id}
              href={`#style-${style.id}`}
              className="flex size-9 items-center justify-center rounded-md border border-[var(--bonus-ink)]/10 bg-white text-xs font-extrabold tracking-[0.02em] text-[var(--bonus-ink)]/75 transition-colors duration-150 hover:border-[var(--bonus-amber)]/40 hover:bg-[var(--bonus-amber)]/10 hover:text-[var(--bonus-amber)]"
            >
              {style.id}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
