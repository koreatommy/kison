// macOS 스타일 브라우저 크롬(트래픽 라이트·주소창)으로 콘텐츠를 감싸는 레이아웃
import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import BrowserWindowNavControls, {
  type BrowserWindowNavControlsProps,
} from "@/components/layout/BrowserWindowNavControls";

type BrowserWindowFrameProps = {
  children: ReactNode;
  /** 주소창에 표시할 URL 텍스트 */
  address?: string;
  /** 트래픽 라이트 영역 페이지 내비게이션 (← · →) */
  nav?: BrowserWindowNavControlsProps;
  /** 뷰포트 전체를 채우는 풀스크린 모드(모서리·그림자 제거) */
  fullBleed?: boolean;
  className?: string;
};

export default function BrowserWindowFrame({
  children,
  address = "localhost:3000/dashboard",
  nav,
  fullBleed = false,
  className = "",
}: BrowserWindowFrameProps) {
  const shellClass = fullBleed
    ? "rounded-none border-0 shadow-none"
    : "rounded-xl border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:rounded-2xl";

  const chromeHeaderClass = fullBleed
    ? "sticky top-0 z-50 bg-[#1c1c1e]"
    : "";

  return (
    <div
      className={`flex min-h-0 w-full flex-col overflow-hidden bg-[#1c1c1e] ${fullBleed ? "h-dvh max-h-dvh" : ""} ${shellClass} ${className}`}
    >
      <header
        className={`flex shrink-0 items-center gap-3 border-b border-white/[0.06] px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 ${chromeHeaderClass}`}
      >
        {nav ? (
          <BrowserWindowNavControls {...nav} />
        ) : (
          <div
            className="flex shrink-0 items-center gap-1.5 sm:gap-2"
            aria-hidden
          >
            <span className="size-2.5 rounded-full bg-[#ff5f57] sm:size-3" />
            <span className="size-2.5 rounded-full bg-[#febc2e] sm:size-3" />
            <span className="size-2.5 rounded-full bg-[#28c840] sm:size-3" />
          </div>
        )}

        <div className="flex min-w-0 flex-1 justify-center">
          <div className="flex w-full max-w-md min-w-0 items-center gap-2 rounded-full bg-[#2a2a2c] px-3 py-1.5 sm:px-4 sm:py-2">
            <Lock
              className="size-3 shrink-0 text-zinc-500 sm:size-3.5"
              strokeWidth={2}
              aria-hidden
            />
            <span className="truncate text-[11px] font-medium text-zinc-400 sm:text-xs">
              {address}
            </span>
          </div>
        </div>

        <div className="hidden w-[52px] shrink-0 sm:block" aria-hidden />
      </header>

      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
