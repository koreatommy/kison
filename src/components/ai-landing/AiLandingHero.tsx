// /ai 랜딩 — 풀블리드 히어로 (브랜드 우선)
import { ArrowDown } from "lucide-react";
import { curriculumMeta } from "@/data/aiCareerCurriculum";

export default function AiLandingHero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100dvh] overflow-hidden"
      aria-labelledby="ai-hero-brand"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 70% 20%, rgba(20,184,166,0.28), transparent 55%), radial-gradient(ellipse 70% 60% at 15% 80%, rgba(251,191,36,0.18), transparent 50%), linear-gradient(165deg, #e8f4f0 0%, #f3f7f5 42%, #eef2f0 100%)",
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
          stroke="#0f766e"
          strokeWidth="2.5"
          strokeDasharray="6 10"
          opacity="0.45"
        />
        <circle cx="520" cy="480" r="10" fill="#0f766e" opacity="0.55" />
        <circle cx="780" cy="280" r="8" fill="#d97706" opacity="0.7" />
        <circle cx="980" cy="360" r="12" fill="#0f766e" opacity="0.4" />
      </svg>

      <div className="ai-hero-copy mx-auto flex min-h-[100dvh] max-w-5xl flex-col justify-center px-5 pt-20 pb-12 sm:px-8 sm:pt-24 sm:pb-16">
        <p className="text-xs font-bold tracking-[0.14em] text-[#0f766e] uppercase sm:text-sm">
          학부모 대상 실습형 교안 · {curriculumMeta.duration}
        </p>

        <h1
          id="ai-hero-brand"
          className="mt-4 text-[clamp(2.75rem,10vw,5.5rem)] font-black leading-[1.02] tracking-[-0.035em] text-[#14241f]"
        >
          우리 아이 진로
          <br />
          로드맵
        </h1>

        <p className="mt-5 max-w-md text-base font-semibold leading-relaxed text-[#14241f]/b0 sm:text-lg">
          AI로 미래를 점치는 게 아니라, 관심·강점·활동을 한눈에 기록하는 가정용
          대시보드를 직접 만듭니다.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#schedule"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0f766e] px-5 py-3 text-sm font-bold tracking-[0.02em] text-white transition-transform duration-[90ms] hover:bg-[#0d5f59] active:scale-[0.98]"
          >
            60분 운영안 보기
            <ArrowDown className="size-4" strokeWidth={2.5} aria-hidden />
          </a>
          <a
            href="#prompts"
            className="inline-flex items-center rounded-lg border border-[#14241f]/15 bg-white/70 px-5 py-3 text-sm font-bold tracking-[0.02em] text-[#14241f] backdrop-blur-sm transition-colors duration-150 hover:border-[#0f766e]/40 hover:bg-white"
          >
            Lovable 프롬프트
          </a>
        </div>
      </div>
    </section>
  );
}
