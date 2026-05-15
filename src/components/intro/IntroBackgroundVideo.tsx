// 인트로 배경 동영상 — 히어로 섹션 방식(음소거 자동재생) + 소리 토글
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function IntroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // React의 muted prop 버그 우회 — 마운트 시 DOM에 즉시 적용
  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    if (!node) return;
    (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = node;
    node.muted = true;
    node.defaultMuted = true;
    node.setAttribute("playsinline", "");
    node.setAttribute("webkit-playsinline", "");
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const next = !video.muted;
    video.muted = next;
    video.volume = next ? 0 : 1;
    setIsMuted(next);

    // 사용자 제스처 시점에 재생 보장 (iOS autoplay 정책 대응)
    if (video.paused) {
      void video.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (!video.paused) return;
      void video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    // 탭 전환 복귀 시 재시도
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // iOS에서 autoplay가 차단된 경우 첫 사용자 인터랙션으로 재생
    const onFirstInteraction = () => {
      if (video.paused) {
        void video.play().catch(() => {});
      }
    };
    document.addEventListener("touchstart", onFirstInteraction, { once: true, passive: true });
    document.addEventListener("click", onFirstInteraction, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={setVideoRef}
        className="absolute inset-0 size-full object-contain object-center md:object-cover [-webkit-touch-callout:none]"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        controls={false}
        disablePictureInPicture
        src="/intro.mp4"
      />

      <button
        type="button"
        onClick={toggleMute}
        className="fixed top-[max(0.75rem,env(safe-area-inset-top,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))] z-[100] inline-flex min-h-11 min-w-11 touch-manipulation items-center gap-2 rounded-full border-2 border-white/70 bg-zinc-950/90 px-3 py-2 text-sm font-bold text-white shadow-[0_4px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition hover:border-white hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={isMuted ? "동영상 소리 켜기" : "동영상 음소거"}
      >
        {isMuted ? (
          <>
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <line x1="23" x2="17" y1="9" y2="15" />
              <line x1="17" x2="23" y1="9" y2="15" />
            </svg>
            <span className="pr-0.5">소리</span>
          </>
        ) : (
          <>
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            <span className="pr-0.5">음소거</span>
          </>
        )}
      </button>
    </>
  );
}
