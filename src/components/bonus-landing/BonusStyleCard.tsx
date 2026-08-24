// /bonus 랜딩 — 스타일 카드 (예시 이미지 2장 + 프롬프트 + 복사)
import Image from "next/image";
import type { BonusStyle } from "@/data/bonusStyles";
import BonusCopyButton from "./BonusCopyButton";

type BonusStyleCardProps = {
  style: BonusStyle;
};

export default function BonusStyleCard({ style }: BonusStyleCardProps) {
  return (
    <article
      id={`style-${style.id}`}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--bonus-ink)]/10 bg-[var(--bonus-card)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--bonus-ink)]/8 px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="text-[11px] font-bold tracking-[0.1em] text-[var(--bonus-amber)] uppercase">
            Style {String(style.id).padStart(2, "0")}
          </p>
          <h3 className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[var(--bonus-ink)] sm:text-xl">
            {style.id}] {style.title}
          </h3>
        </div>
        <BonusCopyButton text={style.prompt} />
      </div>

      <div className="grid gap-3 bg-[var(--bonus-well)] p-3 sm:grid-cols-2 sm:gap-4 sm:p-4">
        {style.images.map((src, index) => (
          <figure
            key={src}
            className="relative aspect-video overflow-hidden rounded-lg bg-black/40"
          >
            <Image
              src={src}
              alt={`${style.title} 예시 ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 480px"
              className="object-cover"
            />
          </figure>
        ))}
      </div>

      <pre className="max-h-40 overflow-auto px-5 py-4 text-xs leading-relaxed font-semibold whitespace-pre-wrap text-[var(--bonus-ink)]/75 sm:px-6 sm:text-[13px]">
        {style.prompt}
      </pre>
    </article>
  );
}
