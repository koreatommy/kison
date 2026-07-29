// /shortform 랜딩 — 09 / LEARNING OUTCOME: SEE·THINK·PROMPT·CREATE
import { learningOutcomes } from "@/data/shortformCurriculum";

export default function ShortformLandingLearning() {
  return (
    <section className="outcome dark-section section-pad">
      <div className="section-intro reveal">
        <p className="eyebrow">09 / LEARNING OUTCOME</p>
        <h2>
          오늘 배우는 것은
          <br />
          <em>AI 사용법만이 아닙니다.</em>
        </h2>
      </div>
      <div className="outcome-grid">
        {learningOutcomes.map((outcome) => (
          <div key={outcome.tag} className="outcome-item reveal">
            <span>{outcome.tag}</span>
            <h3>{outcome.title}</h3>
            <p>{outcome.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
