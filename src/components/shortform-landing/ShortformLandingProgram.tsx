// /shortform 랜딩 — 01 / THE CLASS: 대상·시간·형태·결과물 카드
import { infoCards } from "@/data/shortformCurriculum";

export default function ShortformLandingProgram() {
  return (
    <section id="program" className="program section-pad">
      <div className="section-intro reveal">
        <p className="eyebrow">01 / THE CLASS</p>
        <h2>
          100분 동안
          <br />
          <em>보고, 생각하고, 직접</em> 만듭니다.
        </h2>
        <p>
          숏폼을 단순히 소비하는 것에서 벗어나
          <br />
          콘텐츠를 읽고, 질문하고, 창작하는 경험.
        </p>
      </div>
      <div className="info-grid">
        {infoCards.map((card) => (
          <div key={card.label} className={`info-card reveal ${card.tone !== "default" ? card.tone : ""}`.trim()}>
            <span>{card.label}</span>
            <strong>
              {card.value}
              {card.unit ? (
                <>
                  <br />
                  <b>{card.unit}</b>
                </>
              ) : null}
            </strong>
            <small>{card.desc}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
