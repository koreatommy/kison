// KISON 루트 인트로 — 풀스크린 배경 동영상 + 하단 플로팅 마우스 아이콘
import type { Metadata } from "next";
import { SsgoiTransition } from "@ssgoi/react";
import IntroBackgroundVideo from "@/components/intro/IntroBackgroundVideo";
import IntroEnterFlow from "@/components/intro/IntroEnterFlow";
import IntroTypingText from "@/components/intro/IntroTypingText";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

type HomeProps = {
  params: Promise<Record<string, string | string[] | undefined>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ params, searchParams }: HomeProps) {
  await params;
  await searchParams;

  return (
    <SsgoiTransition id="/">
      <main className="relative min-h-dvh w-full min-w-0 overflow-hidden overscroll-none bg-black">
        <IntroBackgroundVideo />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-black/15"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-1/2 bg-gradient-to-l from-black/90 via-black/70 to-transparent sm:w-[45%] md:w-[40%]"
          aria-hidden
        />

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
            <IntroEnterFlow />
          </div>
        </div>
      </main>
    </SsgoiTransition>
  );
}
