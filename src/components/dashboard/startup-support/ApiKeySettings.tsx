// AI Key 세션 전용 입력 모달
"use client";

import { useState } from "react";
import { X, Key } from "lucide-react";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";

interface ApiKeySettingsProps {
  onClose: () => void;
}

export default function ApiKeySettings({ onClose }: ApiKeySettingsProps) {
  const apiKey = useStartupSupportStore((s) => s.apiKey);
  const setApiKey = useStartupSupportStore((s) => s.setApiKey);
  const [draft, setDraft] = useState(apiKey);

  function handleSave() {
    setApiKey(draft.trim());
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600"
          aria-label="닫기"
        >
          <X className="size-5" strokeWidth={2} />
        </button>

        <div className="flex items-center gap-2 text-indigo-600">
          <Key className="size-5" strokeWidth={2} />
          <h2 className="text-lg font-bold">AI Key 설정</h2>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          여기서 입력한 Key는 브라우저 메모리에만 보관되며,
          새로고침 시 사라집니다.
        </p>

        <div className="mt-4">
          <label
            htmlFor="api-key-input"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500"
          >
            AI Key
          </label>
          <input
            id="api-key-input"
            type="password"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm font-semibold placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
          />
        </div>

        <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-700">
          본 서비스는 유료 결제 서비스 입니다. 발급 받은 Key를 입력하세요
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-bold text-zinc-600 transition hover:bg-zinc-100"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
