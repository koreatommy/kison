"use client";
// 대시보드 랜딩 히어로 — dash.mp4 (FeatureCards 그리드와 동일 너비)
export default function HeroSection() {
  return (
    <section className="px-5 pt-16 pb-8 sm:px-8 sm:pt-20 sm:pb-10">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-2xl">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="aspect-video w-full object-cover"
          src="/dash.mp4"
        />
      </div>
    </section>
  );
}
