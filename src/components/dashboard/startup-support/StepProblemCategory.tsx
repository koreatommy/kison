// 2단계: 해결하고 싶은 문제 분야 선택 + 불편 상황 입력
"use client";

import { Check } from "lucide-react";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import { PROBLEM_CATEGORIES } from "@/lib/startup-support/problemCategories";
import { StepHeader, WarningBox } from "./ui";

export default function StepProblemCategory() {
  const problemInput = useStartupSupportStore((s) => s.problemInput);
  const toggleCategory = useStartupSupportStore((s) => s.toggleCategory);
  const setProblemText = useStartupSupportStore((s) => s.setProblemText);

  const selected = problemInput.selectedCategories;

  return (
    <div className="w-full">
      <StepHeader
        title="어떤 문제를 해결하고 싶나요?"
        description="복수 선택 가능합니다. 최소 1개를 선택하세요."
        context="선택한 분야가 AI 아이템 생성에 반영됩니다."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {PROBLEM_CATEGORIES.map((cat) => {
          const active = selected.includes(cat.value);
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => toggleCategory(cat.value)}
              className={`relative rounded-xl border-2 p-4 text-left transition-all active:scale-[0.97] ${
                active
                  ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-200/40"
                  : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
              }`}
            >
              {active && (
                <span className="absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full bg-indigo-500">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
              )}
              <p
                className={`text-sm font-bold ${active ? "text-indigo-700" : "text-zinc-800"}`}
              >
                {cat.label}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-zinc-400">
                {cat.description}
              </p>
            </button>
          );
        })}
      </div>

      {selected.length === 0 && (
        <p className="mt-3 text-xs font-medium text-amber-600">
          문제 분야를 최소 1개 선택하세요.
        </p>
      )}

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <label className="mb-1 block text-sm font-semibold text-zinc-700">
          우리 주변에서 실제로 불편하다고 느낀 상황을 적어주세요
        </label>
        <p className="mb-3 text-xs leading-relaxed text-zinc-500">
          <span className="font-medium text-indigo-600">
            AI 보고서 생성에 가장 중요한 부분
          </span>
          입니다. 언제·어디서·누가·어떤 불편을 느꼈는지 구체적인 사례를
          묘사해 주세요.
          <span className="mt-1.5 block text-zinc-400">
            멘토·지도선생님은 팀 구성원 간 브레인스토밍을 통해 사례를
            작성하도록 지도해 주세요.
          </span>
        </p>
        <textarea
          value={problemInput.problemText}
          onChange={(e) => setProblemText(e.target.value)}
          placeholder="예: 평일 오전 8시, ○○중학교 앞 횡단보도. 우리 팀이 지켜본 결과 스마트폰을 보며 건너는 학생이 하루 10명 이상이었고, 보호자·교사 부재로 사고가 날까 걱정됐습니다."
          rows={4}
          className="w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm placeholder:text-zinc-300 transition-colors focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 resize-none"
        />
        {problemInput.problemText.length > 0 &&
          problemInput.problemText.length < 10 && (
            <p className="mt-1 text-xs text-amber-600">
              10자 이상 입력하는 것을 권장합니다.
            </p>
          )}
      </div>

      <div className="mt-4">
        <WarningBox variant="info">
          선택한 문제 분야와 불편 상황이 AI 아이템 생성의 핵심 입력값으로 사용됩니다.
        </WarningBox>
      </div>
    </div>
  );
}
