"use client";

// 최종사업계획서 열람용 비밀번호 입력 모달
import { FormEvent, useEffect, useRef, useState } from "react";
import { Lock, X } from "lucide-react";

export const FINAL_PLAN_PASSWORD = "1004";

type FinalPlanPasswordModalProps = {
  teamLabel: string;
  onSuccess: () => void;
  onClose: () => void;
};

export default function FinalPlanPasswordModal({
  teamLabel,
  onSuccess,
  onClose,
}: FinalPlanPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.trim() === FINAL_PLAN_PASSWORD) {
      setError("");
      onSuccess();
      return;
    }
    setError("비밀번호가 올바르지 않습니다.");
    setPassword("");
    inputRef.current?.focus();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="final-plan-password-title"
        className="relative mx-4 w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600"
          aria-label="닫기"
        >
          <X className="size-5" strokeWidth={2} />
        </button>

        <div className="flex items-center gap-2 text-zinc-900">
          <Lock className="size-5 text-zinc-500" strokeWidth={2} />
          <h2 id="final-plan-password-title" className="text-lg font-bold">
            최종사업계획서
          </h2>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          {teamLabel} 팀의 최종사업계획서를 열려면 비밀번호를 입력해 주세요.
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          <label
            htmlFor="final-plan-password-input"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500"
          >
            비밀번호
          </label>
          <input
            ref={inputRef}
            id="final-plan-password-input"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            placeholder="비밀번호 입력"
            className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm font-semibold placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-100 transition-all"
          />

          {error ? (
            <p className="mt-2 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-bold text-zinc-600 transition hover:bg-zinc-100"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-zinc-800"
            >
              열기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
