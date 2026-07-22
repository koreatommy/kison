// /ai 랜딩 — 프롬프트 텍스트 원클릭 복사 버튼
"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyPromptButtonProps = {
  text: string;
  label?: string;
};

export default function CopyPromptButton({
  text,
  label = "프롬프트 복사",
}: CopyPromptButtonProps) {
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
      className="inline-flex items-center gap-2 rounded-lg bg-[var(--ai-ink)] px-4 py-2.5 text-sm font-bold tracking-[0.02em] text-white transition-transform duration-[90ms] hover:bg-[var(--ai-ink-soft)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ai-teal)]"
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
