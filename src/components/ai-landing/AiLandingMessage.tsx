// /ai 랜딩 — 핵심 메시지 + 메타 정보
import { coreMessage, curriculumMeta } from "@/data/aiCareerCurriculum";

export default function AiLandingMessage() {
  return (
    <section
      id="message"
      className="scroll-mt-20 border-t border-[var(--ai-ink)]/8 bg-white"
    >
      <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-[var(--ai-teal)] uppercase">
            강의 핵심
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[var(--ai-ink)] sm:text-3xl md:text-4xl">
            {coreMessage.headline}
          </h2>
          <p className="mt-5 max-w-prose text-base font-semibold leading-relaxed text-[var(--ai-ink)]/70 sm:text-lg">
            {coreMessage.body}
          </p>
          <ul className="mt-8 space-y-3">
            {coreMessage.pillars.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm font-bold text-[var(--ai-ink)]/85 sm:text-base"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--ai-teal)]"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <dl className="flex flex-col justify-center gap-6 border-t border-[var(--ai-ink)]/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          {[
            { label: "대상", value: curriculumMeta.audience },
            { label: "시간", value: curriculumMeta.duration },
            { label: "형태", value: curriculumMeta.format },
            { label: "도구", value: curriculumMeta.tool },
            { label: "결과물", value: curriculumMeta.deliverable },
          ].map((row) => (
            <div key={row.label}>
              <dt className="text-[11px] font-bold tracking-[0.1em] text-[var(--ai-ink)]/45 uppercase">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm font-extrabold leading-snug text-[var(--ai-ink)] sm:text-base">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
