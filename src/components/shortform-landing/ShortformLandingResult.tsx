// /shortform 랜딩 — 08 / MY RESULT: 학생별 AI 이미지·영상 결과물
import { resultCards } from "@/data/shortformCurriculum";

export default function ShortformLandingResult() {
  return (
    <section id="outcome" className="outcome section-pad">
      <div className="section-intro reveal">
        <p className="eyebrow">08 / MY RESULT</p>
        <h2>
          수업이 끝나도
          <br />
          <em>결과물은 남습니다.</em>
        </h2>
        <p>
          학생이 직접 생각하고 만든 결과물을
          <br />
          개별적으로 확인하고 가져갈 수 있도록 구성합니다.
        </p>
      </div>
      <div className="result-cards">
        {resultCards.map((card) => (
          <div key={card.meta} className="result-card reveal">
            <div className="result-meta">
              <span>{card.meta}</span>
              <b>{card.number}</b>
            </div>
            <img src={card.image} alt={`학생이 만든 ${card.highlight}`} />
            <h3>
              {card.title} <em>{card.highlight}</em>
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
