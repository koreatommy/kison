// /shortform 랜딩 — 05 / GOOD SHORT-FORM: 좋은 숏폼의 3가지 질문
import { goodShortQuestions } from "@/data/shortformCurriculum";

const toneClass: Record<string, string> = {
  purple: "purple-card",
  yellow: "yellow-card",
};

export default function ShortformLandingGoodShort() {
  return (
    <section className="three-questions light-blue section-pad">
      <div className="section-intro reveal">
        <p className="eyebrow">05 / GOOD SHORT-FORM</p>
        <h2>
          좋은 숏폼을 만드는
          <br />
          <em>3가지 질문</em>
        </h2>
      </div>
      <div className="question-cards">
        {goodShortQuestions.map((question) => (
          <article
            key={question.tag}
            className={`big-card reveal ${toneClass[question.tone] ?? ""}`.trim()}
          >
            <span>{question.tag}</span>
            <h3>{question.title}</h3>
            <div className="card-symbol">{question.symbol}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
