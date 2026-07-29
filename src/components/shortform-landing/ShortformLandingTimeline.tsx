// /shortform 랜딩 — 02 / 100 MINUTES: 진행 순서 타임라인
import { timeline } from "@/data/shortformCurriculum";

export default function ShortformLandingTimeline() {
  return (
    <section className="timeline light-blue section-pad">
      <div className="section-intro reveal">
        <p className="eyebrow">02 / 100 MINUTES</p>
        <h2>
          이렇게
          <br />
          <em>진행됩니다.</em>
        </h2>
      </div>
      <div className="timeline-list">
        {timeline.map((item) => (
          <div key={item.tag} className="time-item reveal">
            <span>{item.tag}</span>
            <b>{item.label}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
