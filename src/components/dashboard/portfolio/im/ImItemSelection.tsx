"use client";

// IM 초등부 B 창업아이템 선정 결과 페이지 — 보고서 뷰어
import { useEffect, useRef, useState } from "react";
import { Printer } from "lucide-react";
import { IM_ITEM_SELECTION_BODY_HTML } from "@/content/portfolio/im/item-selection-body";
import styles from "./im-item-selection.module.css";

const PRINT_HTML_URL = "/portfolio/im/startup-item-selection.html";

/** 테이블을 가로 스크롤 가능한 wrapper로 감쌉니다 */
function wrapTablesForMobile(html: string): string {
  return html.replace(
    /<table>/g,
    `<div class="tableScrollWrap"><table>`
  ).replace(
    /<\/table>/g,
    `</table></div>`
  );
}

const PROCESSED_HTML = wrapTablesForMobile(IM_ITEM_SELECTION_BODY_HTML);

export default function ImItemSelection() {
  const [scrollPct, setScrollPct] = useState(0);
  const [showGuide, setShowGuide] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let container: HTMLElement | null = el.parentElement;
    while (container) {
      const style = getComputedStyle(container);
      if (style.overflowY === "auto" || style.overflowY === "scroll") break;
      container = container.parentElement;
    }
    const scroller = container ?? el;

    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = scroller as HTMLElement;
      const max = scrollHeight - clientHeight;
      setScrollPct(max <= 0 ? 0 : Math.min(100, (scrollTop / max) * 100));
    }

    handleScroll();
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  function handlePrint() {
    setShowGuide(true);
    const win = window.open(PRINT_HTML_URL, "_blank");
    if (!win) return;
    win.addEventListener("load", () => {
      win.focus();
      win.print();
    });
  }

  return (
    <div ref={scrollRef} className="min-h-full bg-[#eef2ff]/40">
      <div className="sticky top-0 z-10 border-b border-indigo-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-zinc-900">
              창업 아이템 선정 결과
            </p>
            <p className="truncate text-xs text-indigo-600">
              IM · 잔반 예보판 프로젝트
            </p>
          </div>

          <span className="hidden text-xs font-semibold tabular-nums text-zinc-400 sm:block">
            {Math.round(scrollPct)}%
          </span>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-300/40 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
          >
            <Printer className="size-4" strokeWidth={2} />
            PDF 저장
          </button>
        </div>

        <div className="h-0.5 w-full bg-indigo-50">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-150"
            style={{ width: `${scrollPct}%` }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-3 py-5 sm:px-6 sm:py-8">
        <article className="rounded-2xl bg-white px-5 py-7 shadow-lg shadow-indigo-100/60 sm:px-10 sm:py-10">
          <style>{`
            .tableScrollWrap {
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
              border-radius: 0.75rem;
            }
          `}</style>
          <div
            className={styles.report}
            dangerouslySetInnerHTML={{ __html: PROCESSED_HTML }}
          />
        </article>

        <div className="h-12" />
      </div>

      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <p className="text-sm font-bold text-zinc-800">PDF 저장 안내</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              인쇄 창이 열리면 프린터 대상을{" "}
              <strong className="text-zinc-800">&quot;PDF로 저장&quot;</strong>으로 선택해 주세요.
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
    </div>
  );
}
