// /shortform 랜딩 — 03 / MEDIA LITERACY: 숏폼을 보는 3가지 질문
import { mediaQuestions } from "@/data/shortformCurriculum";

export default function ShortformLandingQuestions() {
  return (
    <section className="questions dark-section section-pad">
      <div className="reveal">
        <p className="eyebrow">03 / MEDIA LITERACY</p>
        <h2>
          매일 보는 숏폼,
          <br />
          <em>우리는 얼마나 알고</em> 있을까요?
        </h2>
      </div>
      <div className="question-stack">
        {mediaQuestions.map((question, index) => (
          <div key={question} className="question reveal">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{question}</b>
            <i>↗</i>
          </div>
        ))}
      </div>
      <p className="closing-line reveal">
        콘텐츠를 그냥 보는 사람에서
        <br />
        <strong>생각하며 바라보는 사람으로.</strong>
      </p>
    </section>
  );
}
