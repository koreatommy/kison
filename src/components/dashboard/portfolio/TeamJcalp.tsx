"use client";

// JCALP 초등부 A 팀 소개 — Joy, Courage, Adventure, Light, Peace
import { motion } from "framer-motion";
import PortfolioImage from "./PortfolioImage";
import { PORTFOLIO_IMAGES } from "./portfolio-images";

const COLORS = {
  joy: "#F5A623",
  courage: "#E8554E",
  adventure: "#2BAE8E",
  light: "#F0C040",
  peace: "#5B8DEF",
};

const MEMBERS = [
  { name: "조하린", initial: "J", eng: "Joy", kor: "기쁨", color: "joy" as const },
  { name: "추서현", initial: "C", eng: "Courage", kor: "용기", color: "courage" as const },
  { name: "안정우", initial: "A", eng: "Adventure", kor: "모험", color: "adventure" as const },
  { name: "이예준", initial: "L", eng: "Light", kor: "빛", color: "light" as const },
  { name: "박윤슬", initial: "P", eng: "Peace", kor: "평화", color: "peace" as const },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export default function TeamJcalp() {
  return (
    <div className="min-h-full bg-[#FAFAF8]">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center sm:min-h-[80vh] sm:py-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 20% 80%, rgba(245,166,35,0.10) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(91,141,239,0.10) 0%, transparent 70%)",
          }}
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
          className="relative z-10 mb-4 flex flex-wrap justify-center gap-2 sm:gap-4"
        >
          {MEMBERS.map((m, i) => (
            <motion.div
              key={m.initial}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex flex-col items-center"
            >
              <span
                className="text-5xl font-black transition-transform hover:scale-110 sm:text-7xl md:text-8xl"
                style={{ color: COLORS[m.color] }}
              >
                {m.initial}
              </span>
              <span className="mt-1 text-xs font-semibold text-zinc-500 sm:text-sm">
                {m.eng}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 mb-2 text-base font-bold text-zinc-500 sm:text-lg"
        >
          / 제이켈프 /
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="relative z-10 max-w-md text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-loose"
        >
          기쁨과 용기로 새로운 모험에 도전하며,
          <br />
          세상에 빛과 평화를 전하는 팀
        </motion.p>
      </section>

      {/* Members */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <motion.p {...fadeUp} className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-3 sm:text-sm">
          Our Team
        </motion.p>
        <motion.h2 {...fadeUp} className="mb-8 text-xl font-bold text-zinc-800 sm:mb-10 sm:text-2xl md:text-3xl">
          5명의 이니셜이 모여
          <br className="sm:hidden" /> 하나의 팀이 되었습니다
        </motion.h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
          {MEMBERS.map((m, i) => (
            <motion.div
              key={m.initial}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:p-5"
            >
              <div
                className="absolute left-0 right-0 top-0 h-1"
                style={{ backgroundColor: COLORS[m.color] }}
              />
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-xl font-black text-white sm:h-14 sm:w-14 sm:text-2xl"
                style={{ backgroundColor: COLORS[m.color] }}
              >
                {m.initial}
              </div>
              <p className="text-sm font-bold text-zinc-800 sm:text-base">{m.name}</p>
              <p className="mt-0.5 text-xs font-semibold sm:text-sm" style={{ color: COLORS[m.color] }}>
                {m.eng}
              </p>
              <p className="text-[11px] text-zinc-400 sm:text-xs">{m.kor}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section
        className="py-12 sm:py-16"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 70% 90%, rgba(43,174,142,0.06) 0%, transparent 60%), #FAFAF8",
        }}
      >
        <div className="mx-auto max-w-2xl px-4">
          <motion.p {...fadeUp} className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-3 sm:text-sm">
            Our Story
          </motion.p>
          <motion.h2 {...fadeUp} className="mb-6 text-xl font-bold text-zinc-800 sm:mb-8 sm:text-2xl">
            팀명에 담긴 의미
          </motion.h2>

          <motion.figure
            {...fadeUp}
            className="mb-8 overflow-hidden rounded-2xl border border-zinc-100 bg-white p-3 shadow-md sm:mb-10 sm:p-4"
          >
            <div className="relative overflow-hidden rounded-xl bg-zinc-50">
              <PortfolioImage
                src={PORTFOLIO_IMAGES.jcalp.work}
                alt="JCALP 팀명 네이밍 노트 — 각 이니셜과 Joy, Courage, Adventure, Light, Peace의 의미를 팀원이 직접 정리한 자료"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
                sizes="(max-width: 672px) 100vw, 640px"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-zinc-400 sm:text-sm">
              팀원들이 직접 정리한 JCALP 네이밍 노트
            </figcaption>
          </motion.figure>

          <motion.div {...fadeUp} className="space-y-4 text-sm leading-loose text-zinc-700 sm:text-base sm:leading-loose">
            <p>
              JCALP는 단순히 이름의 앞 글자를 조합한 것이 아니라, 우리 팀이 창업 활동을 통해 추구하고 싶은{" "}
              <strong>가치와 태도</strong>를 담은 이름입니다.
            </p>
            <p>
              우리는 새로운 아이디어를 발견하는 과정에서{" "}
              <span className="font-bold" style={{ color: COLORS.joy }}>기쁨(Joy)</span>을 느끼고, 어려운 문제에도 포기하지 않는{" "}
              <span className="font-bold" style={{ color: COLORS.courage }}>용기(Courage)</span>를 가지며, 익숙하지 않은 길에도 도전하는{" "}
              <span className="font-bold" style={{ color: COLORS.adventure }}>모험심(Adventure)</span>으로 창업 활동에 참여하고자 합니다.
            </p>
            <p>
              또한 우리의 아이디어가 주변 사람들에게 작은{" "}
              <span className="font-bold" style={{ color: COLORS.light }}>빛(Light)</span>이 되어 도움이 되고, 더 나아가 서로를 배려하고 함께 성장하는{" "}
              <span className="font-bold" style={{ color: COLORS.peace }}>평화(Peace)</span>로운 가치를 전하는 팀이 되고자 합니다.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="relative mt-8 overflow-hidden rounded-2xl bg-white p-5 shadow-md sm:mt-10 sm:p-6"
          >
            <div
              className="absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl"
              style={{
                background: `linear-gradient(to bottom, ${COLORS.joy}, ${COLORS.courage}, ${COLORS.adventure}, ${COLORS.light}, ${COLORS.peace})`,
              }}
            />
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 sm:text-xs">
              Mission Statement
            </p>
            <p className="text-base font-semibold leading-relaxed text-zinc-800 sm:text-lg sm:leading-relaxed">
              "기쁨과 용기를 바탕으로 새로운 모험에 도전하고,
              <br />
              세상에 빛과 평화를 전하는 팀"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Summary */}
      <section
        className="py-12 text-center sm:py-16"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(91,141,239,0.06) 0%, transparent 70%), #FAFAF8",
        }}
      >
        <motion.p {...fadeUp} className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-5 sm:text-sm">
          About Us
        </motion.p>
        <motion.div {...fadeUp} className="mb-4 flex justify-center gap-1">
          {MEMBERS.map((m) => (
            <span
              key={m.initial}
              className="text-3xl font-black sm:text-4xl"
              style={{ color: COLORS[m.color] }}
            >
              {m.initial}
            </span>
          ))}
        </motion.div>
        <motion.p {...fadeUp} className="mx-auto max-w-lg px-4 text-sm leading-loose text-zinc-700 sm:text-base sm:leading-loose">
          JCALP(제이켈프)는 5명의 팀원이 각자의 개성과 가치를 모아 만든 이름으로, 기쁨과 용기로 새로운 모험에 도전하며 세상에 빛과 평화를 전하는 청소년 창업동아리입니다.
        </motion.p>

        <motion.div {...fadeUp} className="mx-auto mt-10 max-w-3xl px-4 sm:mt-12">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-6 sm:text-sm">
            Our Logo
          </p>

          <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-5">
            <figure className="flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white p-3 shadow-md sm:p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-50">
                <PortfolioImage
                  src={PORTFOLIO_IMAGES.jcalp.hand}
                  alt="JCALP 로고 초안 — 안정우 팀원의 손그림 스케치"
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
                  src={PORTFOLIO_IMAGES.jcalp.logo}
                  alt="JCALP 완성 로고 — 제이켈프 공식 로고"
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
                src={PORTFOLIO_IMAGES.jcalp.presentation}
                alt="JCALP 로고 설명 발표 장면 — 팀원들이 팀명 의미를 발표하는 모습"
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
        JCALP · 청소년 창업동아리 초등부
      </footer>
    </div>
  );
}
