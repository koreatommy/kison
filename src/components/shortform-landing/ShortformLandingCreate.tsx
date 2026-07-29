// /shortform 랜딩 — 07 / CREATE: 상상 → 프롬프트 → AI → 영상 흐름
import { createFlow } from "@/data/shortformCurriculum";

export default function ShortformLandingCreate() {
  return (
    <section className="create-section dark-section section-pad">
      <div className="create-heading reveal">
        <p className="eyebrow">07 / CREATE</p>
        <h2>
          그리고,
          <br />
          <em>상상이 움직이기 시작합니다.</em>
        </h2>
      </div>
      <div className="create-flow reveal">
        <div className="video-mock">
          <img src="/images/shortform/video-cta.png" alt="AI 숏폼 영상 결과물" />
          <div className="play">▶</div>
          <span>AI GENERATED / 05.8 SEC</span>
        </div>
        <div className="flow-copy">
          {createFlow.map((flow) => (
            <div key={flow.step} className={`flow-step ${flow.done ? "done" : ""}`.trim()}>
              <span>{flow.step}</span>
              <b>{flow.label}</b>
              <i>{flow.done ? "✦" : "↓"}</i>
            </div>
          ))}
        </div>
      </div>
      <p className="create-note reveal">
        중요한 것은 AI의 생각이 아니라
        <br />
        <strong>나의 생각을 AI에게 전달하는 것.</strong>
      </p>
    </section>
  );
}
