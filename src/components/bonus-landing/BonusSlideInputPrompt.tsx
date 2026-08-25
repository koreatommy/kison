// /bonus 랜딩 — 슬라이드 자료 입력용 프롬프트 조합·복사
"use client";

import { useState } from "react";
import BonusCopyButton from "./BonusCopyButton";

const DEFAULT_TOPIC =
  "경기도 인공지능(AI) 관련 사업 및 교육 정책을 홍보";
const DEFAULT_SLIDE_COUNT = "5";

const DEFAULT_STYLE_PROMPT =
  "Hand-drawn notebook journal page, lined paper texture, ballpoint pen sketches and handwritten notes, casual margin doodles, highlighted key points, warm personal study aesthetic, authentic and relatable --ar 16:9";

function buildPrompt(
  topic: string,
  slideCount: string,
  stylePrompt: string,
): string {
  const topicValue = topic.trim() || DEFAULT_TOPIC;
  const countValue = slideCount.trim() || DEFAULT_SLIDE_COUNT;
  const styleValue = stylePrompt.trim() || DEFAULT_STYLE_PROMPT;

  return `[${topicValue}] 이 소스에 정리된 슬라이드 작성 가이드를 엄격히 준수하여 ${countValue} 슬라이드를 생성해

슬라이드 디자인 및 스타일 : ${styleValue}`;
}

export default function BonusSlideInputPrompt() {
  const [topic, setTopic] = useState("");
  const [slideCount, setSlideCount] = useState(DEFAULT_SLIDE_COUNT);
  const [stylePrompt, setStylePrompt] = useState("");
  const prompt = buildPrompt(topic, slideCount, stylePrompt);

  return (
    <section
      aria-labelledby="bonus-slide-input-heading"
      className="border-b border-[var(--bonus-ink)]/8 bg-[var(--bonus-card)]/50"
    >
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
        <p className="mb-2 text-[11px] font-bold tracking-[0.1em] text-[var(--bonus-amber)] uppercase">
          Slide input
        </p>
        <h2
          id="bonus-slide-input-heading"
          className="text-xl font-extrabold tracking-[-0.02em] text-[var(--bonus-ink)] sm:text-2xl"
        >
          슬라이드 자료 입력 프롬프트
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-[var(--bonus-ink)]/60">
          주제, 장수, 스타일 영문 프롬프트를 입력한 뒤 전체 프롬프트를 복사하세요.
        </p>

        <div className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
            <label className="block min-w-0">
              <span className="mb-1.5 block text-[11px] font-bold tracking-[0.06em] text-[var(--bonus-ink)]/50 uppercase">
                주제
              </span>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={`(예) ${DEFAULT_TOPIC}`}
                className="w-full rounded-lg border border-[var(--bonus-ink)]/12 bg-[var(--bonus-bg)] px-3.5 py-2.5 text-sm font-semibold text-[var(--bonus-ink)] outline-none transition-colors placeholder:text-[var(--bonus-ink)]/35 focus:border-[var(--bonus-amber)]/50 focus:ring-2 focus:ring-[var(--bonus-amber)]/15"
              />
            </label>
            <label className="block min-w-0">
              <span className="mb-1.5 block text-[11px] font-bold tracking-[0.06em] text-[var(--bonus-ink)]/50 uppercase">
                슬라이드 장수
              </span>
              <input
                type="number"
                min={1}
                max={30}
                value={slideCount}
                onChange={(e) => setSlideCount(e.target.value)}
                className="w-full rounded-lg border border-[var(--bonus-ink)]/12 bg-[var(--bonus-bg)] px-3.5 py-2.5 text-sm font-semibold text-[var(--bonus-ink)] outline-none transition-colors focus:border-[var(--bonus-amber)]/50 focus:ring-2 focus:ring-[var(--bonus-amber)]/15"
              />
            </label>
          </div>
          <label className="block min-w-0">
            <span className="mb-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-[11px] font-bold tracking-[0.06em] text-[var(--bonus-ink)]/50 uppercase">
                스타일 영문 프롬프트
              </span>
              <span className="text-[11px] font-semibold tracking-normal text-[var(--bonus-amber)] normal-case">
                아래 슬라이드 스타일 49종 중에 선택해서 복사 붙여넣기 하세요
              </span>
            </span>
            <textarea
              value={stylePrompt}
              onChange={(e) => setStylePrompt(e.target.value)}
              placeholder={DEFAULT_STYLE_PROMPT}
              rows={4}
              className="w-full resize-y rounded-lg border border-[var(--bonus-ink)]/12 bg-[var(--bonus-bg)] px-3.5 py-2.5 text-sm font-semibold leading-relaxed text-[var(--bonus-ink)] outline-none transition-colors placeholder:text-[var(--bonus-ink)]/35 focus:border-[var(--bonus-amber)]/50 focus:ring-2 focus:ring-[var(--bonus-amber)]/15"
            />
          </label>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--bonus-ink)]/10 bg-[var(--bonus-card)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--bonus-ink)]/8 px-5 py-3 sm:px-6">
            <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--bonus-ink)]/45 uppercase">
              전체 프롬프트
            </p>
            <BonusCopyButton text={prompt} label="전체 프롬프트 복사" />
          </div>
          <pre className="max-h-80 overflow-auto px-5 py-4 text-xs leading-relaxed font-semibold whitespace-pre-wrap text-[var(--bonus-ink)]/75 sm:px-6 sm:text-[13px]">
            {prompt}
          </pre>
        </div>
      </div>
    </section>
  );
}
