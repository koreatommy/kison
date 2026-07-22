// /ai 랜딩 — 결과물 대시보드 구성 + 사전 작성지
import { dashboardSections, prepWorksheet } from "@/data/aiCareerCurriculum";

export default function AiLandingDashboard() {
  return (
    <section
      id="dashboard"
      className="scroll-mt-20 border-t border-[var(--ai-ink)]/8 bg-[var(--ai-bg)]"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-[var(--ai-teal)] uppercase">
              오늘 만드는 것
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[var(--ai-ink)] sm:text-3xl">
              한 화면 대시보드 초안
            </h2>
            <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--ai-ink)]/65">
              로그인 없음 · 자녀 1명 · 입력·수정 가능한 구조. 완성 서비스가 아니라
              작동하는 초안이 목표입니다.
            </p>

            <ul className="mt-8 columns-1 gap-x-8 space-y-2.5 sm:columns-2">
              {dashboardSections.map((section) => (
                <li
                  key={section}
                  className="break-inside-avoid text-sm font-bold text-[var(--ai-ink)] before:mr-2 before:text-[var(--ai-teal)] before:content-['◆']"
                >
                  {section}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[var(--ai-ink)] px-6 py-8 text-white sm:px-8 sm:py-10">
            <p className="text-[11px] font-bold tracking-[0.12em] text-[var(--ai-teal-bright)] uppercase">
              실습 전 작성지
            </p>
            <h3 className="mt-2 text-xl font-black tracking-[-0.02em]">
              AI에게 맡기기 전에
            </h3>
            <p className="mt-2 text-sm font-semibold text-white/65">
              종이나 메모장에 먼저 꺼내 적습니다. 부모가 아는 아이의 모습이
              출발점입니다.
            </p>
            <ol className="mt-6 space-y-3">
              {prepWorksheet.map((item, i) => (
                <li key={item} className="flex gap-3 text-sm font-bold">
                  <span className="w-5 shrink-0 text-[var(--ai-teal-bright)]">
                    {i + 1}.
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
