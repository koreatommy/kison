// /shortform 랜딩 — 히어로 (그라데이션 배경, 간결한 구조)
import { ArrowDown, Sparkles } from "lucide-react";
import { curriculumMeta, heroContent } from "@/data/shortformCurriculum";

export default function ShortformLandingHero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100dvh] overflow-hidden"
      aria-labelledby="sf-hero-brand"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 70% 20%, rgba(21,92,255,0.18), transparent 55%), radial-gradient(ellipse 70% 60% at 15% 80%, rgba(156,236,255,0.22), transparent 50%), linear-gradient(165deg, #edf4ff 0%, #f8f9fb 42%, #f5f0ff 100%)",
        }}
        aria-hidden
      />
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.35]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path
          d="M80 620 C 280 520, 360 680, 520 480 S 780 280, 980 360 S 1120 220, 1180 180"
          fill="none"
          stroke="#155cff"
          strokeWidth="2.5"
          strokeDasharray="6 10"
          opacity="0.45"
        />
        <circle cx="520" cy="480" r="10" fill="#155cff" opacity="0.55" />
        <circle cx="780" cy="280" r="8" fill="#8b5cf6" opacity="0.7" />
        <circle cx="980" cy="360" r="12" fill="#0ea5e9" opacity="0.4" />
      </svg>

      <div className="sf-hero-copy mx-auto flex min-h-[100dvh] max-w-5xl flex-col justify-center px-5 pt-20 pb-12 sm:px-8 sm:pt-24 sm:pb-16">
        <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-[var(--sf-blue)] uppercase sm:text-sm">
          <Sparkles className="size-4" strokeWidth={2.5} aria-hidden />
          {heroContent.eyebrow}
        </p>

        <h1
          id="sf-hero-brand"
          className="mt-4 text-[clamp(2.75rem,10vw,5.5rem)] font-black leading-[1.02] tracking-[-0.035em] text-[var(--sf-ink)]"
        >
          {heroContent.headline[0]}
          <br />
          <span className="text-[var(--sf-blue)]">{heroContent.headline[1]}</span>
        </h1>

        <p className="mt-5 max-w-md text-base font-semibold leading-relaxed text-[var(--sf-ink)]/70 sm:text-lg">
          {heroContent.sub[0]}
          <br />
          {heroContent.sub[1]}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={heroContent.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--sf-ink)] px-5 py-3 text-sm font-bold tracking-[0.02em] text-white transition-transform duration-[90ms] hover:bg-[var(--sf-ink-soft)] active:scale-[0.98]"
          >
            {heroContent.primaryCta.label}
            <ArrowDown className="size-4" strokeWidth={2.5} aria-hidden />
          </a>
          <a
            href={heroContent.secondaryCta.href}
            className="inline-flex items-center rounded-lg border border-[var(--sf-ink)]/15 bg-white/70 px-5 py-3 text-sm font-bold tracking-[0.02em] text-[var(--sf-ink)] backdrop-blur-sm transition-colors duration-150 hover:border-[var(--sf-blue)]/40 hover:bg-white"
          >
            {heroContent.secondaryCta.label}
          </a>
        </div>

        <dl className="mt-12 flex flex-wrap gap-6 border-t border-[var(--sf-ink)]/8 pt-6 text-sm sm:gap-10">
          <div>
            <dt className="text-xs font-bold tracking-[0.1em] text-[var(--sf-ink)]/50 uppercase">대상</dt>
            <dd className="mt-1 font-bold text-[var(--sf-ink)]">{curriculumMeta.audience}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold tracking-[0.1em] text-[var(--sf-ink)]/50 uppercase">시간</dt>
            <dd className="mt-1 font-bold text-[var(--sf-ink)]">{curriculumMeta.duration}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold tracking-[0.1em] text-[var(--sf-ink)]/50 uppercase">결과물</dt>
            <dd className="mt-1 font-bold text-[var(--sf-blue)]">{curriculumMeta.deliverable}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
