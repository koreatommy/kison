// /shortform 랜딩 — MediaLiteracy 섹션 (미디어 리터러시 질문 + 숏폼 포맷 설명)
import { mediaQuestions, formatSpec } from "@/data/shortformCurriculum";

export default function ShortformMediaLiteracy() {
  return (
    <section className="scroll-mt-20 border-t border-[var(--sf-ink)]/8 bg-[var(--sf-ink)] text-white">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        {/* 미디어 리터러시 질문 */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-blue-bright)] uppercase">
              Media Literacy
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] sm:text-3xl">
              <span className="text-[var(--sf-blue-bright)]">영상</span>을 보는 눈
            </h2>
            <p className="mt-5 max-w-prose text-base font-semibold leading-relaxed text-white/70">
              숏폼을 재미있게 보는 데서 한 걸음 더 나아가, 왜 이 영상에 눈길이 가는지,
              어떤 요소가 계속 보게 만드는지, 영상이 어떤 메시지를 전달하는지 살펴봅니다.
            </p>
            <p className="mt-4 max-w-prose text-base font-semibold leading-relaxed text-white/70">
              학생들은 제목, 이미지, 음악, 자막, 편집 방식 등을 직접 분석하며 콘텐츠가
              만들어진 의도와 표현 방법을 이해합니다. 이를 통해 미디어를 단순히 소비하는
              것을 넘어, 정보를 스스로 분석하고 판단하는 미디어 리터러시 역량을 기릅니다.
            </p>
            <p className="mt-6 text-base font-bold leading-relaxed text-[var(--sf-blue-bright)]">
              보고 → 발견하고 → 분석하고 → 판단하는 힘을 키웁니다.
            </p>
          </div>

          <ol className="space-y-0 divide-y divide-white/15 border-y border-white/15">
            {mediaQuestions.map((question, i) => (
              <li key={i} className="flex gap-5 py-5 sm:gap-6 sm:py-6">
                <span className="w-8 shrink-0 text-xl font-black tracking-[-0.04em] text-[var(--sf-blue-bright)]/50 sm:text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="whitespace-pre-line text-base font-bold leading-relaxed sm:text-lg">
                  {question}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* 숏폼 포맷 설명 */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* 9:16 폰 프레임 */}
          <div className="flex justify-center">
            <div className="relative flex aspect-[9/16] w-44 flex-col items-center justify-center rounded-3xl border-4 border-white/20 bg-gradient-to-br from-[var(--sf-blue)] to-[var(--sf-purple)] p-6 shadow-2xl sm:w-52">
              <div className="absolute top-4 left-4 right-4 flex justify-between text-[10px] font-bold tracking-wider text-white/60">
                <span>9:16</span>
                <span>SHORT</span>
              </div>
              <span className="text-6xl font-black tracking-[-0.08em] text-white sm:text-7xl">
                {formatSpec.duration}
              </span>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="mb-3 h-px bg-white/30" />
                <div className="flex flex-wrap justify-center gap-1.5">
                  {formatSpec.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="rounded-full border border-white/40 px-2 py-1 text-[9px] font-bold tracking-wide text-white/80"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 설명 */}
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-cyan)] uppercase">
              Short-form Format
            </p>
            <blockquote className="mt-4 whitespace-pre-line text-2xl font-black leading-snug tracking-[-0.025em] text-white sm:text-3xl">
              {formatSpec.quote}
            </blockquote>
            <p className="mt-6 max-w-prose whitespace-pre-line text-base font-semibold leading-relaxed text-white/70">
              {formatSpec.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
