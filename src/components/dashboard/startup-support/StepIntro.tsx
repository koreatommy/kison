// 시작 안내 화면 — 서비스 소개 + 4단계 흐름 카드 + 시작 버튼 + D-Day 카운트다운 + 포스터 + API Key 설정
"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import {
  Rocket,
  Settings,
  Users,
  Search,
  Sparkles,
  FileText,
  ZoomIn,
  Download,
  FileType,
  FileIcon,
} from "lucide-react";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import ApiKeySettings from "./ApiKeySettings";
import DramaticCountdown from "./DramaticCountdown";
import { WarningBox } from "./ui";

const POSTER_SRC = "/2026poster.jpg";
const POSTER_WIDTH = 1784;
const POSTER_HEIGHT = 2537;

const ATTACHMENTS = [
  {
    name: "2026 대한민국 청소년 창업경진대회 신청서(양식)_최종.hwp",
    href: "/2026+대한민국+청소년+창업경진대회+신청서(양식)_최종.hwp",
    type: "hwp" as const,
  },
  {
    name: "2026년 대한민국 청소년 창업경진대회 신청방법.pdf",
    href: "/2026년+대한민국+청소년+창업경진대회+신청방법.pdf",
    type: "pdf" as const,
  },
] as const;

const FLOW_STEPS = [
  { icon: Users, title: "팀 정보 입력", desc: "팀명과 구성원 정보를 입력합니다." },
  { icon: Search, title: "문제 선택·구체화", desc: "해결하고 싶은 문제를 선택하고 구체화합니다." },
  { icon: Sparkles, title: "AI 아이템 생성·평가", desc: "AI가 창업 아이템 후보를 만들고 평가합니다." },
  { icon: FileText, title: "최종 보고서 저장", desc: "최종 아이템을 선정하고 보고서를 저장합니다." },
] as const;

export default function StepIntro() {
  const goNext = useStartupSupportStore((s) => s.goNext);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);
  const posterCloseRef = useRef<HTMLButtonElement>(null);
  const posterTitleId = useId();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!posterOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPosterOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => posterCloseRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      cancelAnimationFrame(raf);
    };
  }, [posterOpen]);

  const posterModal =
    posterOpen && mounted ? (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        role="presentation"
        onClick={() => setPosterOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={posterTitleId}
          className="relative flex max-h-[92vh] w-[min(94vw,640px)] max-w-[min(94vw,640px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <p id={posterTitleId} className="sr-only">
            2026 프로그램 포스터 확대보기
          </p>
          <button
            ref={posterCloseRef}
            type="button"
            onClick={() => setPosterOpen(false)}
            className="absolute right-3 top-3 z-10 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-bold text-white shadow-md transition hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 sm:right-4 sm:top-4 sm:px-4 sm:text-sm"
          >
            닫기
          </button>
          <div className="relative mx-auto mt-12 w-full max-h-[min(82vh,900px)] overflow-y-auto p-4 pt-2 sm:p-6">
            <div
              className="relative mx-auto w-full max-w-full"
              style={{ aspectRatio: `${POSTER_WIDTH} / ${POSTER_HEIGHT}` }}
            >
              <Image
                src={POSTER_SRC}
                alt="2026 프로그램 포스터"
                fill
                sizes="(max-width: 768px) 94vw, 640px"
                className="object-contain"
                priority={posterOpen}
              />
            </div>
          </div>
        </div>
      </div>
    ) : null;

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
          <WarningBox
            variant="warning"
            action={
              <button
                type="button"
                onClick={() => setShowKeyModal(true)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-100"
              >
                <Settings className="size-3.5" strokeWidth={2} aria-hidden />
                AI Key 입력
              </button>
            }
          >
            본 서비스는 유료 결제 서비스 입니다. 발급 받은 Key를 입력하세요
          </WarningBox>

          <p className="text-center text-xs text-zinc-400">
            입력한 내용은 서버에 저장되지 않습니다. 최종 결과물은 HTML로 확인하고 PDF로 저장할 수 있습니다.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-10 py-4 text-base font-extrabold text-white shadow-lg shadow-amber-200/40 transition-all hover:shadow-xl hover:shadow-amber-200/60 hover:scale-[1.02] active:scale-95"
          >
            시작하기
          </button>
        </div>

        <div className="mt-8 w-full">
          <DramaticCountdown />
        </div>

        <div className="mt-6 w-full">
          <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
            <div
              className="relative w-full"
              style={{ aspectRatio: `${POSTER_WIDTH} / ${POSTER_HEIGHT}` }}
            >
              <Image
                src={POSTER_SRC}
                alt="2026 프로그램 포스터"
                fill
                sizes="(max-width: 640px) 100vw, 672px"
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => setPosterOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={posterOpen}
              aria-label="포스터 확대보기"
              className="absolute right-2 top-2 inline-flex size-9 items-center justify-center rounded-full bg-zinc-900/80 text-white shadow-md backdrop-blur-sm transition hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
            >
              <ZoomIn className="size-4" strokeWidth={2.5} aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-6 w-full">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-700">
              <FileIcon className="size-4 text-zinc-400" strokeWidth={2} aria-hidden />
              첨부파일
            </div>
            <ul className="mt-3 space-y-2">
              {ATTACHMENTS.map((file) => (
                <li key={file.href}>
                  <a
                    href={file.href}
                    download
                    className="group flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2.5 transition hover:border-amber-200 hover:bg-amber-50"
                  >
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-black uppercase ${
                        file.type === "hwp"
                          ? "bg-sky-100 text-sky-600"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {file.type === "hwp" ? (
                        <FileType className="size-4" strokeWidth={2.5} />
                      ) : (
                        <FileText className="size-4" strokeWidth={2.5} />
                      )}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-700 group-hover:text-zinc-900">
                      {file.name}
                    </span>
                    <Download
                      className="size-4 shrink-0 text-zinc-400 transition group-hover:text-amber-600"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showKeyModal && <ApiKeySettings onClose={() => setShowKeyModal(false)} />}
      {posterModal ? createPortal(posterModal, document.body) : null}
    </div>
  );
}
