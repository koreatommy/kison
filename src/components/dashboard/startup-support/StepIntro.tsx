// 시작 안내 화면 — 서비스 소개 + 4단계 흐름 카드 + 시작 버튼 + API Key 설정
"use client";

import { useState } from "react";
import { Rocket, Settings, Users, Search, Sparkles, FileText } from "lucide-react";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import ApiKeySettings from "./ApiKeySettings";
import { WarningBox } from "./ui";

const FLOW_STEPS = [
  { icon: Users, title: "팀 정보 입력", desc: "팀명과 구성원 정보를 입력합니다." },
  { icon: Search, title: "문제 선택·구체화", desc: "해결하고 싶은 문제를 선택하고 구체화합니다." },
  { icon: Sparkles, title: "AI 아이템 생성·평가", desc: "AI가 창업 아이템 후보를 만들고 평가합니다." },
  { icon: FileText, title: "최종 보고서 저장", desc: "최종 아이템을 선정하고 보고서를 저장합니다." },
] as const;

export default function StepIntro() {
  const goNext = useStartupSupportStore((s) => s.goNext);
  const [showKeyModal, setShowKeyModal] = useState(false);

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-200/40">
            <Rocket className="size-8 text-white" strokeWidth={2} />
          </div>

          <h1 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl">
            AI 창업 아이템 선정하기
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
            문제 발견부터 아이템 생성, 평가, 최종 보고서까지 한 번에 정리합니다.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {FLOW_STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm"
            >
              <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-xl bg-indigo-50">
                <step.icon className="size-5 text-indigo-600" strokeWidth={2} />
              </div>
              <p className="text-xs font-bold text-zinc-800">
                <span className="mr-1 text-indigo-500">{i + 1}.</span>{step.title}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-zinc-400">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <WarningBox variant="warning">
            AI 생성을 위해 입력한 내용이 AI API로 전송될 수 있습니다.
            입력한 내용은 본 서비스 서버에 저장되지 않습니다.
          </WarningBox>

          <p className="text-center text-xs text-zinc-400">
            입력한 내용은 서버에 저장되지 않습니다. 최종 결과물은 HTML로 확인하고 PDF로 저장할 수 있습니다.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-10 py-4 text-base font-extrabold text-white shadow-lg shadow-amber-200/40 transition-all hover:shadow-xl hover:shadow-amber-200/60 hover:scale-[1.02] active:scale-95"
          >
            시작하기
          </button>

          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 transition hover:text-indigo-600"
          >
            <Settings className="size-4" strokeWidth={2} aria-hidden />
            AI API Key 설정
          </button>
        </div>
      </div>

      {showKeyModal && <ApiKeySettings onClose={() => setShowKeyModal(false)} />}
    </div>
  );
}
