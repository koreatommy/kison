// /shortform 랜딩 — 마무리 CTA: 100분 후 AI 숏폼 크리에이터
import { Fragment } from "react";
import { finalSection } from "@/data/shortformCurriculum";

export default function ShortformLandingFinal() {
  return (
    <section id="apply" className="final section-pad">
      <p className="eyebrow reveal">{finalSection.eyebrow}</p>
      <h2 className="reveal">
        {finalSection.headline[0]}
        <br />
        <em>{finalSection.headline[1]}</em>
      </h2>
      <div className="final-flow reveal">
        {finalSection.flow.map((step, index) => (
          <Fragment key={step}>
            {step} {index < finalSection.flow.length - 1 ? <i>→</i> : null}
          </Fragment>
        ))}
      </div>
      <p className="final-copy reveal">
        {finalSection.copy[0]}
        <br />
        <strong>{finalSection.copy[1]}</strong>
      </p>
      <a className="button primary reveal" href={finalSection.cta.href}>
        {finalSection.cta.label} <span>↗</span>
      </a>
    </section>
  );
}
