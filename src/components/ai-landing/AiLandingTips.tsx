// /ai 랜딩 — 운영 팁 + 참고자료 + 마무리 CTA
import { operatingTips, references, values } from "@/data/aiCareerCurriculum";

export default function AiLandingTips() {
  return (
    <section
      id="tips"
      className="scroll-mt-20 border-t border-[var(--ai-ink)]/8 bg-[var(--ai-bg)]"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-bold tracking-[0.12em] text-[var(--ai-teal)] uppercase">
          운영 팁
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[var(--ai-ink)] sm:text-3xl">
          성공 확률을 높이는 네 가지
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {operatingTips.map((tip) => (
            <div key={tip.title}>
              <h3 className="text-base font-extrabold text-[var(--ai-ink)]">
                {tip.title}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--ai-ink)]/65">
                {tip.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--ai-ink)]/10 pt-12">
          <h3 className="text-lg font-black text-[var(--ai-ink)]">추천 참고자료</h3>
          <ul className="mt-5 space-y-2.5">
            {references.map((ref) => (
              <li
                key={ref}
                className="text-sm font-semibold text-[var(--ai-ink)]/70 before:mr-2 before:text-[var(--ai-teal)] before:content-['—']"
              >
                {ref}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl bg-[var(--ai-teal)] px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <p className="text-[11px] font-bold tracking-[0.14em] text-white/70 uppercase">
            최종 권장안
          </p>
          <h2 className="mx-auto mt-3 max-w-xl text-2xl font-black tracking-[-0.03em] sm:text-3xl">
            예쁜 화면보다, 관찰하는 질문이 쌓이는 구조
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-semibold text-white/80 sm:text-base">
            오늘 만든 것은 완성품이 아니라 시작점입니다. 가정에서 이어지는 기록
            도구를 가져가세요.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {values.map((v) => (
              <li
                key={v}
                className="text-sm font-extrabold tracking-[0.02em] text-white"
              >
                {v}
              </li>
            ))}
          </ul>
          <a
            href="#prompts"
            className="mt-10 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-bold tracking-[0.02em] text-[var(--ai-teal-deep)] transition-transform duration-[90ms] hover:bg-[var(--ai-bg)] active:scale-[0.98]"
          >
            프롬프트로 실습하기
          </a>
        </div>
      </div>
    </section>
  );
}
