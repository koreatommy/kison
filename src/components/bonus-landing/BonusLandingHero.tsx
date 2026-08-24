// /bonus 랜딩 — 히어로 (가이드북 제목·사용법)
import { ArrowDown } from "lucide-react";
import { bonusMeta } from "@/data/bonusStyles";

export default function BonusLandingHero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      aria-labelledby="bonus-hero-title"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 75% 15%, rgba(245,158,11,0.22), transparent 55%), radial-gradient(ellipse 60% 50% at 10% 85%, rgba(180,83,9,0.12), transparent 50%), linear-gradient(165deg, #efe8dc 0%, #f3eee6 45%, #ebe4d8 100%)",
        }}
        aria-hidden
      />

      <div className="bonus-hero-copy mx-auto flex max-w-5xl flex-col justify-center px-5 pt-20 pb-14 sm:px-8 sm:pt-24 sm:pb-20">
        <p className="text-xs font-bold tracking-[0.14em] text-[var(--bonus-amber)] uppercase sm:text-sm">
          보너스 자료 · {bonusMeta.count}종
        </p>

        <h1
          id="bonus-hero-title"
          className="mt-4 text-[clamp(2rem,7vw,3.75rem)] font-black leading-[1.08] tracking-[-0.03em] text-[var(--bonus-ink)]"
        >
          노트북LM 슬라이드
          <br />
          스타일 가이드북 활용실습
        </h1>

        <p className="mt-5 max-w-prose text-base font-bold leading-relaxed text-[var(--bonus-ink)] sm:text-lg">
          안성교육지원청 선생님 여러분 오늘 수고 많으셨습니다.
        </p>

        <p className="mt-2 max-w-prose text-base font-semibold leading-relaxed text-[var(--bonus-ink)]/65 sm:text-lg">
          강의중 궁금한 사항이나 AI 활용방안과 관련하여
          <br />
          궁금한 사항은{" "}
          <a
            href="mailto:hieugenelee@gmail.com"
            className="font-bold text-[var(--bonus-amber)] underline decoration-[var(--bonus-amber)]/40 underline-offset-2 transition-colors hover:text-[var(--bonus-amber-deep)]"
          >
            hieugenelee@gmail.com
          </a>
          으로 메일 주시면 답변 드리도록 하겠습니다.
        </p>

        <p className="mt-2 max-w-prose text-base font-semibold leading-relaxed text-[var(--bonus-ink)]/65 sm:text-lg">
          {bonusMeta.usage}
        </p>

        <a
          href="#styles"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-[var(--bonus-amber)] px-5 py-3 text-sm font-bold tracking-[0.02em] text-white transition-transform duration-[90ms] hover:bg-[var(--bonus-amber-deep)] active:scale-[0.98]"
        >
          {bonusMeta.count}개 스타일 둘러보기
          <ArrowDown className="size-4" strokeWidth={2.5} aria-hidden />
        </a>
      </div>
    </section>
  );
}
