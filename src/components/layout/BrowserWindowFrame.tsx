// macOS 스타일 브라우저 크롬(트래픽 라이트·주소창)으로 콘텐츠를 감싸는 레이아웃
import type { ReactNode } from "react";
import { Megaphone } from "lucide-react";
import BrowserWindowAddressQuotes from "@/components/layout/BrowserWindowAddressQuotes";
import BrowserWindowClock from "@/components/layout/BrowserWindowClock";
import BrowserWindowNavControls from "@/components/layout/BrowserWindowNavControls";

type BrowserWindowFrameProps = {
  children: ReactNode;
  /** 주소창에 URL 대신 명언 로테이션 표시 */
  showQuotes?: boolean;
  /** showQuotes가 false일 때 주소창 URL 텍스트 */
  address?: string;
  /** 좌측 홈·대시보드 바로가기 표시 */
  showNav?: boolean;
  /** 뷰포트 전체를 채우는 풀스크린 모드(모서리·그림자 제거) */
  fullBleed?: boolean;
  className?: string;
};

export default function BrowserWindowFrame({
  children,
  showQuotes = true,
  address = "localhost:3000/dashboard",
  showNav = true,
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
        {showNav ? <BrowserWindowNavControls /> : null}

        <div className="flex min-w-0 flex-1 justify-center">
          <div className="flex w-full max-w-2xl min-w-0 items-center gap-2.5 rounded-full bg-[#2a2a2c] px-3.5 py-2 sm:gap-3 sm:px-5 sm:py-2.5">
            <Megaphone
              className="size-3.5 shrink-0 text-amber-500/70 sm:size-4"
              strokeWidth={2}
              aria-hidden
            />
            {showQuotes ? (
              <BrowserWindowAddressQuotes />
            ) : (
              <span className="truncate text-[11px] font-medium text-zinc-400 sm:text-xs">
                {address}
              </span>
            )}
          </div>
        </div>

        <BrowserWindowClock />
      </header>

      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
