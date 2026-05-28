// 결과물 HTML 인쇄(PDF 저장) 버튼 — 새 창으로 열어 window.print()
"use client";

import { useState } from "react";
import { Printer } from "lucide-react";

interface ResultHtmlPreviewProps {
  html: string;
  renderPrintButton?: boolean;
}

export default function ResultHtmlPreview({
  html,
  renderPrintButton,
}: ResultHtmlPreviewProps) {
  const [showGuide, setShowGuide] = useState(false);

  function handlePrint() {
    setShowGuide(true);
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.addEventListener("load", () => {
      win.focus();
      win.print();
    });
  }

  if (!renderPrintButton) return null;

  return (
    <>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-300/40 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95"
      >
        <Printer className="size-4" strokeWidth={2} />
        PDF 저장
      </button>

      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <p className="text-sm font-bold text-zinc-800">PDF 저장 안내</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              인쇄 창이 열리면 프린터 대상을 &quot;PDF로 저장&quot;으로 선택해 주세요.
            </p>
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-4 w-full rounded-full bg-indigo-600 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
