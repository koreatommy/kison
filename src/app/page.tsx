// KISON 루트 인트로 — 풀스크린 배경 동영상 + 하단 플로팅 마우스 아이콘
import type { Metadata } from "next";
import Link from "next/link";
import IntroBackgroundVideo from "@/components/intro/IntroBackgroundVideo";
import IntroTypingText from "@/components/intro/IntroTypingText";

/** 나중에 경로를 넣으면 아이콘이 해당 페이지로 이동하는 링크가 됩니다. `null`이면 장식만 표시됩니다. */
const INTRO_ENTER_HREF: string | null = null;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

type HomeProps = {
  params: Promise<Record<string, string | string[] | undefined>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function FloatingMouseIcon() {
  const icon = (
    <svg
      className="h-12 w-8 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:h-14 sm:w-9 md:h-[4.25rem] md:w-[2.75rem]"
      viewBox="0 0 36 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="7"
        y="5"
        width="22"
        height="38"
        rx="11"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="18"
        y1="5"
        x2="18"
        y2="17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="24"
        x2="18"
        y2="32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );

  const tooltipClass =
    "pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/20 bg-zinc-950/95 px-3 py-2 text-sm font-bold text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100";

  if (INTRO_ENTER_HREF) {
    return (
      <Link
        href={INTRO_ENTER_HREF}
        className="group relative inline-flex min-h-12 min-w-12 touch-manipulation animate-float items-center justify-center rounded-xl p-3 outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:min-h-14 sm:min-w-14 md:min-h-[3.5rem] md:min-w-[3.5rem]"
        aria-label="다음으로 이동"
      >
        <span className={tooltipClass} role="tooltip">
          시작합니다
        </span>
        {icon}
      </Link>
    );
  }

  return (
    <div
      tabIndex={0}
      className="group relative inline-flex cursor-default rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <span className={tooltipClass} role="tooltip">
        시작합니다
      </span>
      <span className="inline-block animate-float">{icon}</span>
    </div>
  );
}

export default async function Home({ params, searchParams }: HomeProps) {
  await params;
  await searchParams;

  return (
    <main className="relative min-h-dvh w-full min-w-0 overflow-hidden overscroll-none bg-black">
      <IntroBackgroundVideo />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/15"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-1/2 bg-gradient-to-l from-black/90 via-black/70 to-transparent sm:w-[45%] md:w-[40%]" aria-hidden />

      <div className="relative z-10 flex min-h-dvh w-full min-w-0 flex-col">
        <div className="flex min-h-0 flex-1 items-center justify-end pr-[max(2rem,env(safe-area-inset-right,0px))] sm:pr-[max(3rem,env(safe-area-inset-right,0px))] md:pr-[max(4rem,env(safe-area-inset-right,0px))]">
          <div className="-translate-y-12 flex flex-col items-end text-right sm:-translate-y-14 md:-translate-y-16">
            <IntroTypingText />
            <p className="mt-4 text-lg font-bold leading-snug text-white/90 sm:mt-5 sm:text-xl md:text-2xl md:leading-relaxed lg:text-[1.65rem] lg:leading-relaxed">
              창업은 처음이죠? 용기를 갖고 시작해 보세요~
            </p>
          </div>
        </div>
        <div className="flex justify-center pt-2 pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))] pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:pl-[max(2rem,env(safe-area-inset-left,0px))] sm:pr-[max(2rem,env(safe-area-inset-right,0px))] sm:pb-[max(1.75rem,env(safe-area-inset-bottom,0px))] md:pl-[max(2.5rem,env(safe-area-inset-left,0px))] md:pr-[max(2.5rem,env(safe-area-inset-right,0px))] md:pb-[max(2rem,env(safe-area-inset-bottom,0px))]">
          <FloatingMouseIcon />
        </div>
      </div>
    </main>
  );
}
