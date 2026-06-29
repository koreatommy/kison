"use client";

// IM 초등부 B 팀 소개 — Idea + Maker = I'm an Idea Maker
import { motion } from "framer-motion";
import PortfolioImage from "./PortfolioImage";
import { PORTFOLIO_IMAGES } from "./portfolio-images";

const COLORS = {
  idea: "#4F46E5",
  maker: "#F97316",
};

const MEMBERS = [
  { name: "윤이준", school: "신장초", grade: "5학년", short: "이준" },
  { name: "이현서", school: "감일초등학교", grade: "5학년", short: "현서" },
  { name: "이로이", school: "위례숲초", grade: "6학년", short: "로이" },
  { name: "이로운", school: "위례숲초", grade: "4학년", short: "로운" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export default function TeamIm() {
  return (
    <div className="min-h-full bg-[#FAFAFC]">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center sm:min-h-[80vh] sm:py-16">
        <div
          className="pointer-events-none absolute -left-[10%] -top-[10%] h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-[5%] -right-[8%] h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-10 mb-6 inline-block rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 sm:mb-8 sm:px-5 sm:py-2 sm:text-sm"
        >
          청소년 창업동아리 · 초등부
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative z-10 mb-2 flex items-baseline gap-1"
        >
          <span
            className="text-7xl font-bold transition-transform hover:-translate-y-2 sm:text-9xl"
            style={{ color: COLORS.idea }}
          >
            I
          </span>
          <span
            className="text-7xl font-bold transition-transform hover:-translate-y-2 sm:text-9xl"
            style={{ color: COLORS.maker }}
          >
            M
          </span>
          <span
            className="text-4xl font-bold sm:text-6xl"
            style={{
              background: `linear-gradient(135deg, ${COLORS.idea}, ${COLORS.maker})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            .
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 mb-4 text-sm font-medium text-zinc-500 sm:text-base"
        >
          <span className="font-bold" style={{ color: COLORS.idea }}>Idea</span>
          {" + "}
          <span className="font-bold" style={{ color: COLORS.maker }}>Maker</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="relative z-10 max-w-md text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-loose"
        >
          나는 아이디어를 만들고,
          <br />
          생각을 실제로 실현하는 아이디어 메이커입니다.
        </motion.p>
      </section>

      {/* Duality */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <motion.p {...fadeUp} className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-3 sm:text-sm">
          What IM Stands For
        </motion.p>
        <motion.h2 {...fadeUp} className="mb-8 text-xl font-bold text-zinc-800 sm:mb-10 sm:text-2xl md:text-3xl">
          IM이 가진 두 가지 의미
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {/* Idea Card */}
          <motion.div
            {...fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50 p-5 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-6"
          >
            <span
              className="pointer-events-none absolute -right-4 -top-6 text-[8rem] font-bold leading-none opacity-5 sm:text-[10rem]"
              style={{ color: COLORS.idea }}
            >
              I
            </span>
            <div
              className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white sm:h-12 sm:w-12"
              style={{ backgroundColor: COLORS.idea }}
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M12 2a7 7 0 0 1 4 12.73V16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1.27A7 7 0 0 1 12 2z" />
                <line x1="9" y1="21" x2="15" y2="21" />
              </svg>
            </div>
            <p className="mb-0.5 text-xl font-bold sm:text-2xl" style={{ color: COLORS.idea }}>Idea</p>
            <p className="mb-3 text-xs font-semibold text-zinc-500 sm:text-sm">아이디어</p>
            <p className="relative z-10 text-sm leading-relaxed text-zinc-700 sm:text-base sm:leading-loose">
              창업은 주변의 문제를 발견하고, 그 문제를 해결할 수 있는 새로운 생각을 떠올리는 것에서 시작됩니다. 우리 팀은 생활 속에서 불편한 점을 그냥 지나치지 않고, 스스로 질문하며 새로운 아이디어를 찾아가는 팀이 되고자 합니다.
            </p>
          </motion.div>

          {/* Maker Card */}
          <motion.div
            {...fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-orange-50 p-5 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-6"
          >
            <span
              className="pointer-events-none absolute -right-4 -top-6 text-[8rem] font-bold leading-none opacity-5 sm:text-[10rem]"
              style={{ color: COLORS.maker }}
            >
              M
            </span>
            <div
              className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white sm:h-12 sm:w-12"
              style={{ backgroundColor: COLORS.maker }}
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <p className="mb-0.5 text-xl font-bold sm:text-2xl" style={{ color: COLORS.maker }}>Maker</p>
            <p className="mb-3 text-xs font-semibold text-zinc-500 sm:text-sm">만드는 사람</p>
            <p className="relative z-10 text-sm leading-relaxed text-zinc-700 sm:text-base sm:leading-loose">
              좋은 아이디어는 생각에만 머무르지 않고, 실제로 만들어 보고 실험하고 개선하는 과정을 통해 더 가치 있는 결과물이 됩니다. 우리 팀은 떠올린 아이디어를 직접 표현하고, 시도하고, 구체적인 결과물로 만들어 가는 팀이 되고자 합니다.
            </p>
          </motion.div>
        </div>

        {/* Members */}
        <motion.div {...fadeUp} className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10 sm:gap-3">
          {MEMBERS.map((m, i) => (
            <div
              key={m.name}
              className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 transition-all hover:-translate-y-0.5 hover:shadow-md sm:gap-2.5 sm:px-4 sm:py-2"
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm"
                style={{ backgroundColor: i % 2 === 0 ? COLORS.idea : COLORS.maker }}
              >
                {m.short}
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-zinc-700 sm:text-base">{m.name}</span>
                <span className="whitespace-nowrap text-[11px] font-medium text-zinc-500 sm:text-xs">
                  {m.school} {m.grade}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* I'm Statement */}
      <section
        className="py-12 text-center sm:py-16"
        style={{
          background: `linear-gradient(135deg, rgba(79,70,229,0.03) 0%, rgba(249,115,22,0.03) 100%)`,
        }}
      >
        <motion.p {...fadeUp} className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-3 sm:text-sm">
          Hidden Meaning
        </motion.p>
        <motion.h2 {...fadeUp} className="mx-auto mb-6 max-w-lg px-4 text-xl font-bold text-zinc-800 sm:mb-8 sm:text-2xl">
          IM에 숨겨진 또 하나의 의미
        </motion.h2>

        <motion.figure
          {...fadeUp}
          className="mx-auto mb-8 max-w-2xl overflow-hidden rounded-2xl border border-zinc-100 bg-white p-3 shadow-md sm:mb-10 sm:p-4"
        >
          <div className="relative overflow-hidden rounded-xl bg-zinc-50">
            <PortfolioImage
              src={PORTFOLIO_IMAGES.im.work}
              alt="IM 팀명·로고 작업 노트 — Idea, Maker, I'm an Idea Maker의 의미와 로고 컬러를 팀원이 직접 정리한 자료"
              width={1200}
              height={900}
              className="h-auto w-full object-cover"
              sizes="(max-width: 672px) 100vw, 640px"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs text-zinc-400 sm:text-sm">
            팀원들이 직접 정리한 IM 네이밍·로고 노트
          </figcaption>
        </motion.figure>

        <motion.div {...fadeUp} className="mb-6 flex flex-wrap items-center justify-center gap-2 px-4 sm:mb-8 sm:gap-3">
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold sm:px-5 sm:py-2 sm:text-base" style={{ color: COLORS.idea }}>
            I — Idea
          </span>
          <span className="text-lg font-medium text-zinc-400">+</span>
          <span className="rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-semibold sm:px-5 sm:py-2 sm:text-base" style={{ color: COLORS.maker }}>
            M — Maker
          </span>
          <span className="text-lg font-medium text-zinc-400">=</span>
          <span
            className="rounded-full px-4 py-1.5 text-sm font-bold text-white sm:px-5 sm:py-2 sm:text-base"
            style={{ background: `linear-gradient(135deg, ${COLORS.idea}, ${COLORS.maker})` }}
          >
            I'm an Idea Maker
          </span>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="relative mx-auto max-w-lg overflow-hidden rounded-2xl bg-white p-5 shadow-md sm:p-6"
        >
          <div
            className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, ${COLORS.idea}, ${COLORS.maker})` }}
          />
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 sm:text-xs">
            Our Identity
          </p>
          <p className="text-sm leading-loose text-zinc-700 sm:text-base sm:leading-loose">
            IM은 영어 표현 <em>I'm</em>과도 연결됩니다.
            <br />
            <span
              className="font-bold"
              style={{
                background: `linear-gradient(135deg, ${COLORS.idea}, ${COLORS.maker})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              "나는 아이디어 메이커입니다."
            </span>
            <br />
            팀원 한 명 한 명이 단순한 참여자가 아니라, 스스로 문제를 찾고 아이디어를 만들어 내는{" "}
            <strong>주체적인 창업가</strong>라는 뜻을 담고 있습니다.
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <motion.p {...fadeUp} className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-3 sm:text-sm">
          Our Story
        </motion.p>
        <motion.h2 {...fadeUp} className="mb-6 text-xl font-bold text-zinc-800 sm:mb-8 sm:text-2xl">
          팀명에 담긴 이야기
        </motion.h2>

        <motion.div {...fadeUp} className="space-y-4 text-sm leading-loose text-zinc-700 sm:text-base sm:leading-loose">
          <p>
            IM은 4명의 초등부 팀원 —{" "}
            {MEMBERS.map((m) => `${m.name} (${m.school} ${m.grade})`).join(", ")} — 이 함께 만든 팀명입니다. 두 글자 안에{" "}
            <span className="font-bold" style={{ color: COLORS.idea }}>Idea(아이디어)</span>와{" "}
            <span className="font-bold" style={{ color: COLORS.maker }}>Maker(만드는 사람)</span>라는 창업의 핵심 가치를 담았습니다.
          </p>
          <p>
            우리는 일상 속 불편함을 그냥 넘기지 않고, 스스로 질문하며{" "}
            <span className="font-bold" style={{ color: COLORS.idea }}>새로운 아이디어</span>를 발견합니다. 그리고 그 아이디어를 생각에만 머무르게 하지 않고, 직접 만들고 실험하며{" "}
            <span className="font-bold" style={{ color: COLORS.maker }}>구체적인 결과물</span>로 실현합니다.
          </p>
          <p>
            따라서 IM은 <strong>"나는 아이디어를 만들고, 생각을 실제로 실현하는 아이디어 메이커다"</strong>라는 의미를 가진 팀명입니다.
          </p>
        </motion.div>
      </section>

      {/* Summary */}
      <section className="py-12 text-center sm:py-16">
        <motion.p {...fadeUp} className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-5 sm:text-sm">
          About Us
        </motion.p>
        <motion.div {...fadeUp} className="mb-4 flex items-baseline justify-center gap-0.5">
          <span className="text-3xl font-bold sm:text-4xl" style={{ color: COLORS.idea }}>I</span>
          <span className="text-3xl font-bold sm:text-4xl" style={{ color: COLORS.maker }}>M</span>
          <span className="mb-1 self-end text-xl text-zinc-400 sm:text-2xl">.</span>
        </motion.div>
        <motion.p {...fadeUp} className="mx-auto max-w-lg px-4 text-sm leading-loose text-zinc-700 sm:text-base sm:leading-loose">
          IM은 Idea와 Maker의 앞 글자를 결합한 이름으로, 'I'm an Idea Maker', 즉 '나는 아이디어 메이커입니다'라는 의미를 담고 있습니다. 우리 팀은 생활 속 문제를 발견하고, 새로운 아이디어를 직접 만들어 실현하는 청소년 창업동아리입니다.
        </motion.p>

        <motion.div {...fadeUp} className="mx-auto mt-10 max-w-3xl px-4 sm:mt-12">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-6 sm:text-sm">
            Our Logo
          </p>

          <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-5">
            <figure className="flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white p-3 shadow-md sm:p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-50">
                <PortfolioImage
                  src={PORTFOLIO_IMAGES.im.hand}
                  alt="IM 로고 초안 — 팀원의 손그림 스케치"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 280px"
                />
              </div>
              <figcaption className="mt-3 text-center">
                <span className="text-xs font-bold text-zinc-500 sm:text-sm">초안 스케치</span>
                <p className="mt-0.5 text-[11px] text-zinc-400 sm:text-xs">손으로 그린 첫 아이디어</p>
              </figcaption>
            </figure>

            <div className="hidden items-center justify-center sm:flex">
              <span className="text-2xl font-light text-zinc-300" aria-hidden="true">
                →
              </span>
            </div>

            <figure className="flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white p-3 shadow-md sm:p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-50">
                <PortfolioImage
                  src={PORTFOLIO_IMAGES.im.logo}
                  alt="IM 완성 로고 — 아이디어 메이커 공식 로고"
                  fill
                  className="object-contain p-3 sm:p-4"
                  sizes="(max-width: 640px) 100vw, 280px"
                />
              </div>
              <figcaption className="mt-3 text-center">
                <span className="text-xs font-bold text-zinc-500 sm:text-sm">완성된 로고</span>
                <p className="mt-0.5 text-[11px] text-zinc-400 sm:text-xs">초안을 다듬어 만든 공식 로고</p>
              </figcaption>
            </figure>
          </div>

          <figure className="mt-6 overflow-hidden rounded-2xl border border-zinc-100 bg-white p-3 shadow-md sm:mt-8 sm:p-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-50 sm:aspect-[16/9]">
              <PortfolioImage
                src={PORTFOLIO_IMAGES.im.presentation}
                alt="IM 로고 설명 발표 장면 — 팀원들이 팀명 의미를 발표하는 모습"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-zinc-400 sm:text-sm">
              팀원들이 직접 로고와 팀명의 의미를 설명하는 발표 장면
            </figcaption>
          </figure>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-zinc-400 sm:py-8 sm:text-sm">
        IM · 청소년 창업동아리 초등부
      </footer>
    </div>
  );
}
