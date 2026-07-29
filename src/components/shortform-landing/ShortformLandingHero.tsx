// /shortform 랜딩 — 히어로 (세로형 폰 목업 + 궤도 장식)
export default function ShortformLandingHero() {
  return (
    <section id="top" className="hero section-pad">
      <div className="hero-copy reveal">
        <p className="eyebrow">
          <span className="dot" /> 100 MINUTE AI MEDIA LITERACY EXPERIENCE
        </p>
        <h1>
          상상한 장면이
          <br />
          <em>진짜 영상</em>이 되는 시간
        </h1>
        <p className="hero-sub">
          AI와 함께 만드는 나만의 숏폼.
          <br />
          보고, 생각하고, 표현하고, 직접 만들어봅니다.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#program">
            100분 프로그램 살펴보기 <span>↗</span>
          </a>
          <a className="text-link" href="#lab">
            AI 제작 과정 보기 <span>↓</span>
          </a>
        </div>
      </div>

      <div className="hero-visual reveal">
        <div className="orbit orbit-a" />
        <div className="orbit orbit-b" />
        <div className="phone">
          <div className="phone-top">
            <span>9:16 / AI SHORT</span>
            <span>●</span>
          </div>
          <img src="/images/shortform/hero-rabbit.png" alt="우주복을 입은 토끼 캐릭터" />
          <div className="phone-caption">
            <b>MY FIRST AI SHORT</b>
            <span>우주복을 입은 토끼가 손을 흔드는 모습</span>
          </div>
        </div>
        <div className="float-card prompt-float">
          <span className="card-label">PROMPT / 01</span>
          <strong>
            우주복을 입은 토끼가
            <br />
            학교 운동장에서…
          </strong>
          <span className="arrow">↗</span>
        </div>
        <div className="float-card output-float">
          <span className="mini-icon">✦</span>
          <strong>AI IMAGE</strong>
          <small>READY TO CREATE</small>
        </div>
      </div>

      <div className="scroll-cue">
        <span>SCROLL TO EXPLORE</span>
        <i>↓</i>
      </div>
    </section>
  );
}
