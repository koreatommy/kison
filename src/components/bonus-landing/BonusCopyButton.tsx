// /bonus 랜딩 — 스타일 프롬프트 원클릭 복사 버튼
"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type BonusCopyButtonProps = {
  text: string;
  label?: string;
};

export default function BonusCopyButton({
  text,
  label = "프롬프트 복사",
}: BonusCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-lg bg-[var(--bonus-ink)] px-4 py-2.5 text-sm font-bold tracking-[0.02em] text-[var(--bonus-bg)] transition-transform duration-[90ms] hover:bg-[var(--bonus-ink-soft)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bonus-amber)]"
    >
      {copied ? (
        <Check className="size-4" strokeWidth={2.5} aria-hidden />
      ) : (
        <Copy className="size-4" strokeWidth={2.5} aria-hidden />
      )}
      {copied ? "복사됨" : label}
    </button>
  );
}
