// /bonus 랜딩 — 49종 스타일 카드 갤러리
import { bonusStyles } from "@/data/bonusStyles";
import BonusStyleCard from "./BonusStyleCard";

export default function BonusStyleGallery() {
  return (
    <section id="styles" className="scroll-mt-20">
      <div className="mx-auto max-w-5xl space-y-8 px-5 py-12 sm:px-8 sm:py-16">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-[var(--bonus-amber)] uppercase">
            Style catalog
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.025em] text-[var(--bonus-ink)] sm:text-3xl">
            슬라이드 스타일 {bonusStyles.length}종
          </h2>
        </div>

        <div className="space-y-8">
          {bonusStyles.map((style) => (
            <BonusStyleCard key={style.id} style={style} />
          ))}
        </div>
      </div>
    </section>
  );
}
