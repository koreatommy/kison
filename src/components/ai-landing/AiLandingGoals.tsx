// /ai 랜딩 — 학습 목표 + 관리 축 5가지
import { learningGoals, manageAxes } from "@/data/aiCareerCurriculum";

export default function AiLandingGoals() {
  return (
    <section
      id="goals"
      className="scroll-mt-20 border-t border-[var(--ai-ink)]/8 bg-[var(--ai-bg)]"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-bold tracking-[0.12em] text-[var(--ai-teal)] uppercase">
          강의 목표
        </p>
        <h2 className="mt-3 max-w-[18ch] text-2xl font-black tracking-[-0.025em] text-[var(--ai-ink)] sm:text-3xl">
          수업이 끝나면 할 수 있는 일
        </h2>

        <ol className="mt-10 space-y-0 divide-y divide-[var(--ai-ink)]/10 border-y border-[var(--ai-ink)]/10">
          {learningGoals.map((goal, i) => (
            <li
              key={goal}
              className="flex gap-5 py-5 sm:gap-8 sm:py-6"
            >
              <span className="w-8 shrink-0 text-2xl font-black tracking-[-0.04em] text-[var(--ai-teal)]/50 sm:w-10 sm:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-base font-bold leading-relaxed text-[var(--ai-ink)] sm:text-lg">
                {goal}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16">
          <h3 className="text-lg font-black tracking-[-0.02em] text-[var(--ai-ink)] sm:text-xl">
            초등 4~6학년, 이 다섯 가지만 관리하면 충분합니다
          </h3>
          <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            {manageAxes.map((axis) => (
              <div key={axis.title} className="border-t-2 border-[var(--ai-teal)] pt-4">
                <h4 className="text-base font-extrabold text-[var(--ai-ink)]">
                  {axis.title}
                </h4>
                <p className="mt-2 text-sm font-semibold leading-snug text-[var(--ai-ink)]/60">
                  {axis.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
