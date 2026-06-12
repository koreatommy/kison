"use client";

// ACE 중등부 팀 소개 — Achieving, Creative, Excellence
import { motion } from "framer-motion";
import PortfolioImage from "./PortfolioImage";
import { PORTFOLIO_IMAGES } from "./portfolio-images";

const COLORS = {
  achieving: "#D97706",
  creative: "#0891B2",
  excellence: "#7C3AED",
};

const MEMBERS = [
  { name: "이상윤", initial: "A", eng: "Achieving", kor: "달성하는", color: "achieving" as const },
  { name: "한은빈", initial: "C", eng: "Creative", kor: "창의적인", color: "creative" as const },
  { name: "김민찬", initial: "E", eng: "Excellence", kor: "탁월함", color: "excellence" as const },
];

const VALUES = [
  {
    letter: "A",
    eng: "Achieving",
    kor: "달성하는",
    color: "achieving" as const,
    desc: "목표를 세우고 끝까지 실현해 나가는 태도를 의미합니다. 창업 활동은 단순히 아이디어를 떠올리는 데서 끝나는 것이 아니라, 문제를 발견하고 해결 방법을 구체화하며 실제 결과물로 만들어 가는 과정입니다. 우리 팀은 계획한 목표를 책임감 있게 완성해 나가는 팀이 되고자 합니다.",
  },
  {
    letter: "C",
    eng: "Creative",
    kor: "창의적인",
    color: "creative" as const,
    desc: "새로운 관점으로 문제를 바라보고, 남들과 다른 해결 방법을 찾아내는 창의성을 의미합니다. 생활 속 불편함이나 사회 문제를 그냥 지나치지 않고, 우리만의 생각과 방식으로 해결책을 제안하는 것이 우리 팀의 중요한 가치입니다.",
  },
  {
    letter: "E",
    eng: "Excellence",
    kor: "탁월함",
    color: "excellence" as const,
    desc: "더 나은 결과를 만들기 위해 노력하는 탁월함을 의미합니다. 처음부터 완벽한 결과를 내기보다, 아이디어를 계속 다듬고 개선하면서 완성도를 높여 가는 태도를 담고 있습니다.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export default function TeamAce() {
  return (
    <div className="min-h-full bg-[#FAFAFC]">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center sm:min-h-[80vh] sm:py-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 15% 75%, rgba(217,119,6,0.06) 0%, transparent 70%), radial-gradient(ellipse 45% 40% at 85% 25%, rgba(8,145,178,0.05) 0%, transparent 70%), radial-gradient(ellipse 40% 35% at 50% 90%, rgba(124,58,237,0.04) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-10 mb-6 inline-block rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 sm:mb-8 sm:px-5 sm:py-2 sm:text-sm"
        >
          청소년 창업동아리 · 중등부
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative z-10 mb-3 flex items-baseline gap-1 sm:gap-2"
        >
          <span
            className="text-6xl font-extrabold transition-transform hover:-translate-y-2 hover:scale-105 sm:text-8xl md:text-9xl"
            style={{ color: COLORS.achieving }}
          >
            A
          </span>
          <span
            className="text-6xl font-extrabold transition-transform hover:-translate-y-2 hover:scale-105 sm:text-8xl md:text-9xl"
            style={{ color: COLORS.creative }}
          >
            C
          </span>
          <span
            className="text-6xl font-extrabold transition-transform hover:-translate-y-2 hover:scale-105 sm:text-8xl md:text-9xl"
            style={{ color: COLORS.excellence }}
          >
            E
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 mb-2 text-xs font-semibold tracking-wider text-zinc-500 sm:text-sm"
        >
          최고의 팀, 탁월한 도전
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative z-10 mb-4 text-sm font-bold sm:text-base"
        >
          <span style={{ color: COLORS.achieving }}>Achieving</span>
          <span className="mx-1.5 text-zinc-300 sm:mx-2">·</span>
          <span style={{ color: COLORS.creative }}>Creative</span>
          <span className="mx-1.5 text-zinc-300 sm:mx-2">·</span>
          <span style={{ color: COLORS.excellence }}>Excellence</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="relative z-10 max-w-md text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-loose"
        >
          창의적인 아이디어로 목표를 달성하고,
          <br />
          탁월한 결과를 만들어 가는 팀
        </motion.p>
      </section>

      {/* Members */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <motion.p {...fadeUp} className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-3 sm:text-sm">
          Our Team
        </motion.p>
        <motion.h2 {...fadeUp} className="mb-8 text-xl font-bold text-zinc-800 sm:mb-10 sm:text-2xl md:text-3xl">
          ACE를 만든 세 사람
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {MEMBERS.map((m, i) => (
            <motion.div
              key={m.initial}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: COLORS[m.color] }}
              />
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-extrabold text-white sm:h-18 sm:w-18 sm:text-3xl"
                style={{ backgroundColor: COLORS[m.color] }}
              >
                {m.initial}
              </div>
              <p className="text-lg font-bold text-zinc-800 sm:text-xl">{m.name}</p>
              <p className="mt-1 text-sm font-bold sm:text-base" style={{ color: COLORS[m.color] }}>
                {m.eng}
              </p>
              <p className="text-xs text-zinc-400 sm:text-sm">{m.kor}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section
        className="py-12 sm:py-16"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 60% 80%, rgba(124,58,237,0.04) 0%, transparent 60%), #FAFAFC",
        }}
      >
        <div className="mx-auto max-w-3xl px-4">
          <motion.p {...fadeUp} className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-3 sm:text-sm">
            Our Values
          </motion.p>
          <motion.h2 {...fadeUp} className="mb-8 text-xl font-bold text-zinc-800 sm:mb-10 sm:text-2xl md:text-3xl">
            ACE에 담긴 세 가지 가치
          </motion.h2>

          <div className="space-y-4 sm:space-y-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.letter}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:gap-5 sm:p-5"
              >
                <div
                  className="absolute bottom-0 left-0 top-0 w-1"
                  style={{ backgroundColor: COLORS[v.color] }}
                />
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl font-extrabold text-white sm:h-14 sm:w-14 sm:text-2xl"
                  style={{ backgroundColor: COLORS[v.color] }}
                >
                  {v.letter}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-bold sm:text-lg" style={{ color: COLORS[v.color] }}>
                    {v.eng}
                  </p>
                  <p className="mb-2 text-xs font-medium text-zinc-500 sm:text-sm">{v.kor}</p>
                  <p className="text-sm leading-relaxed text-zinc-700 sm:text-base sm:leading-loose">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACE Dictionary */}
      <section className="relative py-12 text-center sm:py-16">
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[10rem] font-extrabold opacity-[0.02] sm:text-[16rem] md:text-[20rem]"
        >
          ACE
        </span>
        <motion.div
          {...fadeUp}
          className="relative z-10 mx-auto max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-md sm:p-6"
        >
          <p className="mb-0.5 text-2xl font-extrabold sm:text-3xl">
            <span style={{ color: COLORS.achieving }}>A</span>
            <span style={{ color: COLORS.creative }}>C</span>
            <span style={{ color: COLORS.excellence }}>E</span>
          </p>
          <p className="mb-1 text-sm text-zinc-500">/eɪs/</p>
          <p className="mb-3 border-b border-zinc-100 pb-3 text-xs font-semibold italic text-zinc-400 sm:text-sm">
            noun
          </p>
          <p className="text-sm leading-loose text-zinc-700 sm:text-base sm:leading-loose">
            최고, 뛰어난 사람, 탁월한 팀.
            <br />
            ACE는 영어로 '최고'를 뜻하는 단어이기도 합니다. Achieving, Creative, Excellence — 세 가지 가치를 품은 이 이름에는 우리 팀이 창업동아리 활동을 통해 이루고자 하는{" "}
            <strong>목표와 태도</strong>가 함께 담겨 있습니다.
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

        <motion.figure
          {...fadeUp}
          className="mb-8 overflow-hidden rounded-2xl border border-zinc-100 bg-white p-3 shadow-md sm:mb-10 sm:p-4"
        >
          <div className="relative overflow-hidden rounded-xl bg-zinc-50">
            <PortfolioImage
              src={PORTFOLIO_IMAGES.ace.work}
              alt="ACE 팀명 작업 노트 — Achieving, Creative, Excellence의 의미를 팀원이 직접 정리한 자료"
              width={1200}
              height={900}
              className="h-auto w-full object-cover"
              sizes="(max-width: 672px) 100vw, 640px"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs text-zinc-400 sm:text-sm">
            팀원들이 직접 정리한 ACE 네이밍 노트
          </figcaption>
        </motion.figure>

        <motion.div {...fadeUp} className="space-y-4 text-sm leading-loose text-zinc-700 sm:text-base sm:leading-loose">
          <p>
            ACE는 3명의 중등부 팀원 — 이상윤, 한은빈, 김민찬 — 이 함께 만든 팀명입니다. 각 알파벳에는 우리 팀이 창업 활동을 통해 추구하고 싶은{" "}
            <span className="font-bold" style={{ color: COLORS.achieving }}>목표 달성의 태도</span>,{" "}
            <span className="font-bold" style={{ color: COLORS.creative }}>창의적 사고</span>,{" "}
            <span className="font-bold" style={{ color: COLORS.excellence }}>탁월함을 향한 노력</span>이 담겨 있습니다.
          </p>
          <p>
            우리는 문제를 발견하고 해결 방법을 구체화하며 실제 결과물로 만들어 가는 과정에서{" "}
            <span className="font-bold" style={{ color: COLORS.achieving }}>끝까지 책임감 있게 완성</span>하고, 생활 속 불편함이나 사회 문제를{" "}
            <span className="font-bold" style={{ color: COLORS.creative }}>우리만의 관점과 방식</span>으로 해결하며, 아이디어를 계속 다듬고 개선하면서{" "}
            <span className="font-bold" style={{ color: COLORS.excellence }}>완성도를 높여 가는</span> 팀이 되고자 합니다.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="relative mt-8 overflow-hidden rounded-2xl bg-white p-5 shadow-md sm:mt-10 sm:p-6"
        >
          <div
            className="absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl"
            style={{
              background: `linear-gradient(to bottom, ${COLORS.achieving}, ${COLORS.creative}, ${COLORS.excellence})`,
            }}
          />
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 sm:text-xs">
            Mission Statement
          </p>
          <p className="text-base font-semibold leading-relaxed text-zinc-800 sm:text-lg sm:leading-relaxed">
            "창의적인 아이디어를 바탕으로 목표를 달성하고,
            <br />
            탁월한 결과를 만들어 가는 최고의 팀"
          </p>
        </motion.div>
      </section>

      {/* Summary */}
      <section
        className="py-12 text-center sm:py-16"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(8,145,178,0.04) 0%, transparent 70%), #FAFAFC",
        }}
      >
        <motion.p {...fadeUp} className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-5 sm:text-sm">
          About Us
        </motion.p>
        <motion.div {...fadeUp} className="mb-4 flex justify-center gap-0.5">
          <span className="text-3xl font-extrabold sm:text-4xl" style={{ color: COLORS.achieving }}>A</span>
          <span className="text-3xl font-extrabold sm:text-4xl" style={{ color: COLORS.creative }}>C</span>
          <span className="text-3xl font-extrabold sm:text-4xl" style={{ color: COLORS.excellence }}>E</span>
        </motion.div>
        <motion.p {...fadeUp} className="mx-auto max-w-lg px-4 text-sm leading-loose text-zinc-700 sm:text-base sm:leading-loose">
          ACE는 Achieving, Creative, Excellence의 의미를 담은 팀명으로, 창의적인 생각을 실제 결과로 만들어 내고 탁월함을 향해 도전하는 중등부 청소년 창업동아리입니다.
        </motion.p>

        <motion.div {...fadeUp} className="mx-auto mt-10 max-w-3xl px-4 sm:mt-12">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-zinc-400 sm:mb-6 sm:text-sm">
            Our Logo
          </p>

          <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-5">
            <figure className="flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white p-3 shadow-md sm:p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-50">
                <PortfolioImage
                  src={PORTFOLIO_IMAGES.ace.hand}
                  alt="ACE 로고 초안 — 팀원의 손그림 스케치"
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
                  src={PORTFOLIO_IMAGES.ace.logo}
                  alt="ACE 완성 로고 — ACE Team 공식 로고"
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
                src={PORTFOLIO_IMAGES.ace.presentation}
                alt="ACE 로고 설명 발표 장면 — 팀원들이 팀명 의미를 발표하는 모습"
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
        ACE · 청소년 창업동아리 중등부
      </footer>
    </div>
  );
}
