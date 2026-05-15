"use client";

// 대시보드 10단계 미션 사이드 메뉴
// 모바일: 반투명 오버레이 슬라이드인 / 태블릿+: 콘텐츠 밀어내는 푸시 레이아웃
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import Link from "next/link";
import { Lock, Menu, X } from "lucide-react";
import { MISSION_STEPS } from "@/lib/mission-steps";

const AUTO_OPEN_DELAY_MS = 400;
const TABLET_BREAKPOINT = 640;

function MenuIcon({ open }: { open: boolean }) {
  const Icon = open ? X : Menu;
  return (
    <Icon className="size-[1.125rem] sm:size-5" strokeWidth={2.25} aria-hidden />
  );
}

const itemClass =
  "group flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition hover:bg-white/[0.06] active:bg-white/[0.1] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 sm:rounded-xl sm:px-2.5 sm:py-2.5 md:px-3 md:py-3";

function MissionList({
  animateItems,
}: {
  animateItems: boolean;
}) {
  return (
    <ol className="space-y-0.5 sm:space-y-1">
      {MISSION_STEPS.map((step, index) => (
        <li
          key={step.id}
          className={animateItems ? "animate-mission-blind" : "opacity-0"}
          style={
            animateItems
              ? { animationDelay: `${index * 45}ms` }
              : undefined
          }
        >
          {step.id === 1 ? (
            <Link href="/dashboard/profile" className={itemClass}>
              <span
                className="shrink-0 self-start pt-0.5 text-xs font-bold tabular-nums sm:text-sm"
                style={{ color: step.dotColor }}
              >
                {String(step.id).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold leading-[1.5] text-white group-hover:text-amber-50 sm:text-sm md:text-[0.9375rem]">
                  {step.title}
                </span>
                <span className="mt-0.5 hidden font-sans text-[11px] font-normal leading-snug tracking-normal text-zinc-500 sm:block md:text-xs md:line-clamp-2">
                  {step.subtitle}
                </span>
              </span>
            </Link>
          ) : (
            <button type="button" className={itemClass}>
              <span
                className="shrink-0 self-start pt-0.5 text-xs font-bold tabular-nums sm:text-sm"
                style={{ color: step.dotColor }}
              >
                {String(step.id).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold leading-[1.5] text-white group-hover:text-amber-50 sm:text-sm md:text-[0.9375rem]">
                  {step.title}
                </span>
                <span className="mt-0.5 hidden font-sans text-[11px] font-normal leading-snug tracking-normal text-zinc-500 sm:block md:text-xs md:line-clamp-2">
                  {step.subtitle}
                </span>
              </span>
              <Lock
                className="size-3.5 shrink-0 text-zinc-500 sm:size-4"
                strokeWidth={2}
                aria-label="잠김"
              />
            </button>
          )}
        </li>
      ))}
    </ol>
  );
}

type MissionMenuLayoutProps = {
  children: ReactNode;
};

export default function MissionMenuLayout({
  children,
}: MissionMenuLayoutProps) {
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    requestAnimationFrame(() => setAnimateItems(true));
  }, []);

  const closeMenu = useCallback(() => {
    setAnimateItems(false);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`);
    if (!mq.matches) return;
    const timer = window.setTimeout(() => openMenu(), AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [openMenu]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu, isOpen]);

  const panelHeader = (
    <header className="sticky top-0 z-10 shrink-0 border-b border-white/10 bg-[#1c1c1e]/95 px-3 pb-2.5 pt-3 pr-12 backdrop-blur-md sm:px-4 sm:pb-3 sm:pt-4 sm:pr-14">
      <button
        type="button"
        onClick={closeMenu}
        className="absolute top-2.5 right-2.5 flex min-h-10 min-w-10 touch-manipulation items-center justify-center rounded-lg border border-white/15 bg-zinc-800 text-amber-300 transition hover:bg-zinc-700 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:top-3 sm:right-3 sm:min-h-11 sm:min-w-11 sm:rounded-xl"
        aria-label="미션 메뉴 닫기"
      >
        <MenuIcon open />
      </button>
      <p
        id={`${panelId}-title`}
        className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-400 sm:text-[10px] sm:tracking-[0.22em] md:text-xs"
      >
        10단계 창업 여정
      </p>
      <p className="mt-0.5 text-xs font-bold text-zinc-300 sm:mt-1 sm:text-sm md:text-base">
        미션을 선택하세요
      </p>
    </header>
  );

  return (
    <div className="relative flex h-full min-h-0 w-full">
      {/* ── 모바일 오버레이 (< sm) ── */}
      {isOpen ? (
        <div className="sm:hidden">
          {/* 반투명 백드롭 */}
          <button
            type="button"
            className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-[2px] animate-[mission-backdrop-in_0.22s_ease-out_both]"
            aria-label="미션 메뉴 닫기"
            onClick={closeMenu}
          />
          {/* 슬라이드인 패널 */}
          <aside
            id={panelId}
            aria-labelledby={`${panelId}-title`}
            className="font-mission fixed inset-y-0 left-0 z-50 flex w-[min(88vw,18rem)] flex-col border-r border-white/10 bg-[#1c1c1e]/90 shadow-[4px_0_32px_rgba(0,0,0,0.4)] backdrop-blur-md animate-[mission-panel-in_0.35s_cubic-bezier(0.22,1,0.36,1)_both]"
          >
            {panelHeader}
            <nav
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2"
              aria-label="10단계 창업 미션"
            >
              <MissionList animateItems={animateItems} />
            </nav>
          </aside>
        </div>
      ) : null}

      {/* ── 태블릿+ 푸시 레이아웃 (≥ sm) ── */}
      <div
        className={`hidden shrink-0 overflow-hidden transition-[width] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:block ${
          isOpen
            ? "sm:w-56 md:w-60 lg:w-64"
            : "w-0"
        }`}
      >
        <aside
          id={`${panelId}-tablet`}
          aria-labelledby={`${panelId}-title`}
          className="font-mission flex h-full w-56 flex-col border-r border-white/10 bg-[#1c1c1e]/90 backdrop-blur-md md:w-60 lg:w-64"
        >
          {panelHeader}
          <nav
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4"
            aria-label="10단계 창업 미션"
          >
            <MissionList animateItems={animateItems} />
          </nav>
        </aside>
      </div>

      {/* ── 메인 콘텐츠 ── */}
      <div className="relative min-h-0 min-w-0 flex-1">
        {!isOpen ? (
          <button
            type="button"
            onClick={openMenu}
            className="absolute top-2.5 left-2.5 z-10 flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-xl border border-zinc-900/10 bg-zinc-950/90 text-amber-300 shadow-lg transition hover:bg-zinc-900 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#facc15] sm:top-3 sm:left-3 sm:min-h-12 sm:min-w-12 md:top-4 md:left-4"
            aria-expanded={false}
            aria-controls={panelId}
            aria-label="미션 메뉴 열기"
          >
            <MenuIcon open={false} />
          </button>
        ) : null}
        {children}
      </div>
    </div>
  );
}
