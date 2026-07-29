// /shortform 랜딩 — 06 / AI CREATOR LAB: 프롬프트 스텝 전환 실습 (인터랙션)
// 향후 확장 자리: generate/(이미지 생성), video/(영상 생성), gallery/(결과물 갤러리)가 이 폴더의 형제로 추가될 예정
"use client";

import { useState } from "react";
import { labSteps } from "@/data/shortformCurriculum";

export default function ShortformLandingLab() {
  const [activeStep, setActiveStep] = useState(0);
  const [improved, setImproved] = useState(false);
  const current = labSteps[activeStep];

  return (
    <section id="lab" className="lab section-pad">
      <div className="lab-intro reveal">
        <div>
          <p className="eyebrow">06 / AI CREATOR LAB</p>
          <h2>
            이제 직접
            <br />
            <em>만들어볼 차례입니다.</em>
          </h2>
        </div>
        <p>
          학생 한 명 한 명이 AI 크리에이터가 됩니다.
          <br />
          <strong>내가 먼저 생각하고, AI가 표현을 도와줍니다.</strong>
        </p>
      </div>
      <div className="lab-grid">
        <div className="step-list">
          {labSteps.map((step, index) => (
            <button
              key={step.step}
              type="button"
              className={`step ${index === activeStep ? "active" : ""}`.trim()}
              onClick={() => {
                setActiveStep(index);
                setImproved(false);
              }}
            >
              <span>{step.step}</span>
              <b>{step.label}</b>
              <i>→</i>
            </button>
          ))}
        </div>
        <div className="lab-preview reveal">
          <div className="lab-image">
            <img src={current.image} alt="AI로 만든 세로형 이미지" />
            <span className="status">● GENERATIVE VISUAL</span>
          </div>
          <div className="prompt-panel">
            <span className="card-label">
              STUDENT PROMPT <small>01 / 04</small>
            </span>
            <h3>{current.title}</h3>
            <div className="prompt-box">{current.prompt}</div>
            <button
              type="button"
              className="button small"
              style={improved ? { background: "var(--sf-blue)", color: "#fff" } : undefined}
              onClick={() => setImproved(true)}
            >
              {improved ? "프롬프트가 더 선명해졌어요 ✓" : "AI가 프롬프트 다듬기 ✨"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
