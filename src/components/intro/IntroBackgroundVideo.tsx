// 인트로 배경 동영상 — 소리 재생 및 모바일 자동재생 정책 대응
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function IntroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const needsUserUnmuteRef = useRef(false);
  const autoplayMutedOnlyRef = useRef(false);
  const hasTriedUnmutedRef = useRef(false);

  const applyUnmute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    setIsMuted(false);
    needsUserUnmuteRef.current = false;
    autoplayMutedOnlyRef.current = false;

    void video.play().catch(() => {
      video.muted = true;
      setIsMuted(true);
      needsUserUnmuteRef.current = true;
    });
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      applyUnmute();
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [applyUnmute]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      if (!needsUserUnmuteRef.current && !autoplayMutedOnlyRef.current) {
        if (!hasTriedUnmutedRef.current) {
          hasTriedUnmutedRef.current = true;
          video.muted = false;
          video.volume = 1;

          try {
            await video.play();
            setIsMuted(false);
            return;
          } catch {
            autoplayMutedOnlyRef.current = true;
          }
        }
      }

      if (autoplayMutedOnlyRef.current || needsUserUnmuteRef.current) {
        video.muted = true;
        setIsMuted(true);
        needsUserUnmuteRef.current = true;

        try {
          await video.play();
        } catch {
          // loadeddata/canplay에서 재시도
        }
      }
    };

    void tryPlay();

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void tryPlay();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const unmuteOnFirstInteraction = () => {
      if (!needsUserUnmuteRef.current) return;
      applyUnmute();
    };
    document.addEventListener("touchstart", unmuteOnFirstInteraction, {
      passive: true,
    });
    document.addEventListener("click", unmuteOnFirstInteraction);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("touchstart", unmuteOnFirstInteraction);
      document.removeEventListener("click", unmuteOnFirstInteraction);
    };
  }, [applyUnmute]);

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-contain object-center md:object-cover [-webkit-touch-callout:none]"
        autoPlay
        muted={isMuted}
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
