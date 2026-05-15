"use client";
// 핵심 특징 6개 카드 그리드 — 즐거운 톤의 창업교육 특징 소개
import { motion } from "framer-motion";
import {
  FlaskConical,
  Handshake,
  NotebookPen,
  Rocket,
  Sprout,
  Target,
  type LucideIcon,
} from "lucide-react";

const FEATURES: {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}[] = [
  {
    icon: Rocket,
    title: "단계별 프로젝트 학습",
    desc: "10단계 미션을 하나씩 깨면서 창업 역량이 쑥쑥! 게임처럼 재미있게 성장해요.",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: NotebookPen,
    title: "실습 중심 워크북",
    desc: "이론은 짧게, 실습은 길게! 직접 손으로 써보고 만들어 보는 진짜 경험.",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Target,
    title: "청소년 눈높이 사례",
    desc: "또래 친구들의 실제 도전 이야기로 '나도 할 수 있다!'는 자신감을 얻어요.",
    color: "from-orange-400 to-amber-500",
  },
  {
    icon: FlaskConical,
    title: "STEAM 융합 창의교육",
    desc: "과학·기술·예술·수학이 만나면? 세상에 없던 기발한 아이디어가 탄생!",
    color: "from-teal-400 to-emerald-500",
  },
  {
    icon: Handshake,
    title: "협업·소통 중심",
    desc: "혼자보다 함께일 때 더 강해요. 팀워크로 불가능을 가능으로 바꿔봐요.",
    color: "from-sky-400 to-blue-500",
  },
  {
    icon: Sprout,
    title: "성장 중심 평가",
    desc: "결과보다 과정이 중요해요. 도전하고 실패하고 다시 일어서는 모든 순간이 점수!",
    color: "from-lime-400 to-green-500",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function FeatureCards() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="text-sm font-bold tracking-widest text-amber-800/60 uppercase">
          핵심 특징
        </p>
        <h2 className="mt-2 text-2xl font-black text-zinc-900 sm:text-3xl md:text-4xl">
          왜 이 프로그램이 특별할까요?
        </h2>
        <p className="mt-3 text-base font-semibold text-zinc-700/80 sm:text-lg">
          6가지 핵심 시스템으로 누구나 창업가처럼 생각할 수 있어요.
        </p>
      </motion.div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition group-hover:opacity-30 ${f.color}`}
              />
              <Icon
                className="size-8 text-zinc-800"
                strokeWidth={2}
                aria-hidden
              />
              <h3 className="mt-3 text-lg font-extrabold text-zinc-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-600">
                {f.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
