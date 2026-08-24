// /bonus 랜딩 — 슬라이드 생성 기본 프롬프트 안내·복사
"use client";

import { useState } from "react";
import BonusCopyButton from "./BonusCopyButton";

const DEFAULT_TOPIC =
  "경기도 인공지능(AI) 관련 사업 및 교육 정책을 홍보";
const DEFAULT_SLIDE_COUNT = "5";

function buildPrompt(topic: string, slideCount: string): string {
  const topicValue = topic.trim() || DEFAULT_TOPIC;
  const countValue = slideCount.trim() || DEFAULT_SLIDE_COUNT;

  return `아래 조건에 맞는 슬라이드 제작 가이드를 작성해주세요.

###슬라이드 주제

[주제] : ${topicValue}

[슬라이드 장수] : ${countValue}장

###작성 규칙
1. 
2. 첫 번째 슬라이드는 표지(타이틀), 마지막은 마무리(요약 또는 CTA)로 구성합니다.
3. 나머지 슬라이드는 논리적 흐름(문제 → 원인 → 해결 → 결론)에 따라 구성합니다.
4. 슬라이드 1장당 항목은 최대 3개를 초과하지 않습니다.
5. 항목이 많을 경우 슬라이드를 분리합니다.

###출력 형식 (반드시 준수)

[슬라이드 N] 대주제 제목
* 
* 항목 1
* 항목 2
* 항목 3`;
}

export default function BonusSlidePromptGuide() {
  const [topic, setTopic] = useState("");
  const [slideCount, setSlideCount] = useState(DEFAULT_SLIDE_COUNT);
  const prompt = buildPrompt(topic, slideCount);

  return (
    <section
      aria-labelledby="bonus-slide-prompt-heading"
      className="border-b border-[var(--bonus-ink)]/8 bg-[var(--bonus-bg)]"
    >
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
        <p className="mb-2 text-[11px] font-bold tracking-[0.1em] text-[var(--bonus-amber)] uppercase">
          Prompt guide
        </p>
        <h2
          id="bonus-slide-prompt-heading"
          className="text-xl font-extrabold tracking-[-0.02em] text-[var(--bonus-ink)] sm:text-2xl"
        >
          슬라이드 가이드 생성 기본 프롬프트 안내
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-[var(--bonus-ink)]/60">
          주제와 슬라이드 장수를 입력한 뒤, 완성된 프롬프트를 복사해
          사용하세요.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_8rem]">
          <label className="block min-w-0">
            <span className="mb-1.5 block text-[11px] font-bold tracking-[0.06em] text-[var(--bonus-ink)]/50 uppercase">
              주제
            </span>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={`(예) ${DEFAULT_TOPIC}`}
              className="w-full rounded-lg border border-[var(--bonus-ink)]/12 bg-[var(--bonus-card)] px-3.5 py-2.5 text-sm font-semibold text-[var(--bonus-ink)] outline-none transition-colors placeholder:text-[var(--bonus-ink)]/35 focus:border-[var(--bonus-amber)]/50 focus:ring-2 focus:ring-[var(--bonus-amber)]/15"
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
              className="w-full rounded-lg border border-[var(--bonus-ink)]/12 bg-[var(--bonus-card)] px-3.5 py-2.5 text-sm font-semibold text-[var(--bonus-ink)] outline-none transition-colors focus:border-[var(--bonus-amber)]/50 focus:ring-2 focus:ring-[var(--bonus-amber)]/15"
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
