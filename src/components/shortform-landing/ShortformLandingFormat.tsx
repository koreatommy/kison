// /shortform 랜딩 — 04 / SHORT-FORM FORMAT: 9:16 세로형 규격 설명
import { formatSpec } from "@/data/shortformCurriculum";

export default function ShortformLandingFormat() {
  return (
    <section className="format section-pad">
      <div className="format-head reveal">
        <p className="eyebrow">04 / SHORT-FORM FORMAT</p>
        <h2>
          숏폼의 화면에는
          <br />
          <em>이유가 있습니다.</em>
        </h2>
      </div>
      <div className="format-layout">
        <div className="spec-card reveal">
          <div className="spec-top">
            <span>VERTICAL VIDEO</span>
            <span>LIVE</span>
          </div>
          <div className="spec-number">{formatSpec.ratio}</div>
          <div className="spec-rule" />
          <p>
            스마트폰 화면에 최적화된
            <br />
            세로형 영상의 구조를 살펴봅니다.
          </p>
          <div className="platforms">
            {formatSpec.platforms.map((platform) => (
              <span key={platform}>{platform}</span>
            ))}
          </div>
        </div>
        <div className="format-copy reveal">
          <p className="big-quote">{formatSpec.quote}</p>
          <p>{formatSpec.body}</p>
        </div>
      </div>
    </section>
  );
}
