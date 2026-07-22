// /ai 랜딩 — Lovable 실습 프롬프트 (복사 가능)
import CopyPromptButton from "@/components/ai-landing/CopyPromptButton";
import { prompts } from "@/data/aiCareerCurriculum";

const blocks = [
  {
    step: "01",
    title: "첫 입력 프롬프트",
    desc: "강의 중 그대로 붙여 넣어 기본 대시보드를 생성합니다.",
    text: prompts.first,
  },
  {
    step: "02",
    title: "2차 수정 프롬프트",
    desc: "초안이 나온 뒤 교육용 톤과 관찰 요약을 다듬습니다.",
    text: prompts.revise,
  },
  {
    step: "03",
    title: "실제 데이터 반영",
    desc: "자녀 정보로 샘플을 바꿉니다. 실명 대신 이니셜을 권장합니다.",
    text: prompts.personalize,
  },
] as const;

export default function AiLandingPrompts() {
  return (
    <section
      id="prompts"
      className="scroll-mt-20 border-t border-[var(--ai-ink)]/8 bg-white"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-bold tracking-[0.12em] text-[var(--ai-teal)] uppercase">
          실습 교안
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[var(--ai-ink)] sm:text-3xl">
          Lovable에 그대로 넣을 프롬프트
        </h2>
        <p className="mt-3 max-w-prose text-base font-semibold text-[var(--ai-ink)]/65">
          무엇을 만들지, 누가 쓰는지, 어떤 섹션이 필요한지 구체적으로 지정한
          형태입니다.
        </p>

        <div className="mt-12 space-y-8">
          {blocks.map((block) => (
            <article
              key={block.step}
              className="overflow-hidden rounded-2xl border border-[var(--ai-ink)]/10 bg-[var(--ai-bg)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--ai-ink)]/8 px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.1em] text-[var(--ai-teal)] uppercase">
                    Step {block.step}
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-[var(--ai-ink)]">
                    {block.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--ai-ink)]/55">
                    {block.desc}
                  </p>
                </div>
                <CopyPromptButton text={block.text} />
              </div>
              <pre className="max-h-72 overflow-auto px-5 py-5 text-xs leading-relaxed font-semibold whitespace-pre-wrap text-[var(--ai-ink)]/80 sm:px-6 sm:text-[13px]">
                {block.text}
              </pre>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
