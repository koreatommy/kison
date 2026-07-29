// /shortform 랜딩 — Create 섹션 (제작 흐름 + 결과물 통합)
"use client";

import { motion } from "framer-motion";
import { createFlow } from "@/data/shortformCurriculum";

const resultThumbnails = [
  {
    src: "/images/shortform/thumbnail-school.png",
    alt: "우리 학교 최고예요! AI 숏폼 썸네일",
    label: "학교 홍보",
  },
  {
    src: "/images/shortform/thumbnail-lunch.png",
    alt: "맛있는 급식! AI 숏폼 썸네일",
    label: "급식 맛집",
  },
  {
    src: "/images/shortform/thumbnail-volcano.png",
    alt: "집에서 화산 폭발 실험! AI 숏폼 썸네일",
    label: "화산 실험",
  },
] as const;

const resultVideos = [
  {
    src: "/images/shortform/result-school.mp4",
    poster: "/images/shortform/thumbnail-school.png",
    label: "학교 홍보",
  },
  {
    src: "/images/shortform/result-lunch.mp4",
    poster: "/images/shortform/thumbnail-lunch.png",
    label: "급식 맛집",
  },
  {
    src: "/images/shortform/result-volcano.mp4",
    poster: "/images/shortform/thumbnail-volcano.png",
    label: "화산 실험",
  },
] as const;

type IOSVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

export default function ShortformCreate() {
  const openFullscreenOnMobile = (video: HTMLVideoElement) => {
    if (typeof window === "undefined") return;

    const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
    if (!isMobileOrTablet) return;

    if (document.fullscreenElement) return;

    if (typeof video.requestFullscreen === "function") {
      void video.requestFullscreen().catch(() => {});
      return;
    }

    const iosVideo = video as IOSVideoElement;
    if (typeof iosVideo.webkitEnterFullscreen === "function") {
      iosVideo.webkitEnterFullscreen();
    }
  };

  return (
    <section className="scroll-mt-20 border-t border-[var(--sf-ink)]/8 bg-[var(--sf-bg)]">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        {/* 제작 흐름 */}
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-blue)] uppercase">
            Creation Flow
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[var(--sf-ink)] sm:text-3xl">
            상상에서 <span className="text-[var(--sf-blue)]">영상</span>까지
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base font-semibold text-[var(--sf-ink)]/65">
            학생들은 이 네 단계를 거쳐 나만의 AI 숏폼을 완성합니다.
          </p>
        </div>

        {/* 플로우 스텝 */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {createFlow.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <div
                className={`flex flex-col items-center gap-2 rounded-2xl px-6 py-4 ${
                  step.done
                    ? "bg-[var(--sf-blue)] text-white"
                    : "bg-white text-[var(--sf-ink)] shadow-sm"
                }`}
              >
                <span
                  className={`text-2xl font-black ${
                    step.done ? "text-white/80" : "text-[var(--sf-blue)]"
                  }`}
                >
                  {step.step}
                </span>
                <span className="text-sm font-bold">{step.label}</span>
              </div>
              {index < createFlow.length - 1 && (
                <span className="mx-2 text-2xl text-[var(--sf-ink)]/20">→</span>
              )}
            </div>
          ))}
        </div>

        {/* 학생별 결과물 갤러리 */}
        <div className="mt-20">
          <p className="text-center text-xs font-bold tracking-[0.12em] text-[var(--sf-blue)] uppercase">
            My Result
          </p>
          <h3 className="mt-3 text-center text-xl font-black tracking-[-0.025em] text-[var(--sf-ink)] sm:text-2xl">
            학생별 개별 결과물
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-center text-base font-semibold text-[var(--sf-ink)]/65">
            각자 상상한 장면을 AI로 만들어 나만의 숏폼 썸네일을 완성합니다.
          </p>

          <div className="mt-10 flex flex-wrap items-end justify-center gap-6 sm:gap-10">
            {resultThumbnails.map((thumb, index) => (
              <motion.figure
                key={thumb.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.1 }}
                className="flex w-[min(42vw,220px)] flex-col items-center gap-3 sm:w-[240px]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="overflow-hidden rounded-[1.75rem] border-[3px] border-[var(--sf-ink)]/10 bg-[var(--sf-ink)] shadow-xl shadow-[var(--sf-ink)]/10"
                >
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    className="aspect-[9/16] w-full object-cover"
                  />
                </motion.div>
                <figcaption className="text-sm font-bold text-[var(--sf-ink)]/55">
                  {thumb.label}
                </figcaption>
              </motion.figure>
            ))}
          </div>

          {/* 숏폼 완성본 플레이어 */}
          <div className="mt-16">
            <p className="text-center text-xs font-bold tracking-[0.12em] text-[var(--sf-blue)] uppercase">
              Final Shorts
            </p>
            <h4 className="mt-3 text-center text-lg font-black tracking-[-0.025em] text-[var(--sf-ink)] sm:text-xl">
              숏폼 완성본
            </h4>
            <p className="mx-auto mt-2 max-w-md text-center text-sm font-semibold text-[var(--sf-ink)]/55">
              재생 버튼을 눌러 완성된 AI 숏폼을 확인해보세요.
            </p>

            <div className="mt-8 flex flex-wrap items-end justify-center gap-6 sm:gap-10">
              {resultVideos.map((video, index) => (
                <motion.figure
                  key={video.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.1 }}
                  className="flex w-[min(42vw,220px)] flex-col items-center gap-3 sm:w-[240px]"
                >
                  <div className="overflow-hidden rounded-[1.75rem] border-[3px] border-[var(--sf-ink)]/10 bg-[var(--sf-ink)] shadow-xl shadow-[var(--sf-ink)]/10">
                    <video
                      src={video.src}
                      poster={video.poster}
                      controls
                      playsInline
                      preload="metadata"
                      className="aspect-[9/16] w-full object-cover"
                      onPlay={(e) => {
                        openFullscreenOnMobile(e.currentTarget);
                      }}
                    />
                  </div>
                  <figcaption className="text-sm font-bold text-[var(--sf-ink)]/55">
                    {video.label}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
