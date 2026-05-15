"use client";
// 5대 핵심 역량 카드 섹션
import { motion } from "framer-motion";
import {
  Flame,
  Globe,
  Lightbulb,
  MessagesSquare,
  Puzzle,
  type LucideIcon,
} from "lucide-react";

const COMPETENCIES: {
  icon: LucideIcon;
  title: string;
  desc: string;
  bg: string;
  border: string;
}[] = [
  {
    icon: Puzzle,
    title: "문제해결력",
    desc: "복잡한 문제도 쪼개면 쉬워져요. 체계적 분석으로 해결!",
    bg: "bg-violet-100",
    border: "border-violet-300",
  },
  {
    icon: Lightbulb,
    title: "창의적 사고력",
    desc: "남들과 다르게 생각하는 힘. 새로운 관점에서 아이디어 뿜뿜!",
    bg: "bg-pink-100",
    border: "border-pink-300",
  },
  {
    icon: MessagesSquare,
    title: "협업·의사소통",
    desc: "내 생각을 전달하고, 상대방의 아이디어를 받아들이는 능력.",
    bg: "bg-sky-100",
    border: "border-sky-300",
  },
  {
    icon: Flame,
    title: "자기주도성",
    desc: "누가 시키지 않아도 스스로 목표를 세우고 달려가요!",
    bg: "bg-amber-100",
    border: "border-amber-300",
  },
  {
    icon: Globe,
    title: "사회적 책임 의식",
    desc: "더 나은 세상을 위한 한 걸음. 작은 도전이 큰 변화를 만들어요.",
    bg: "bg-emerald-100",
    border: "border-emerald-300",
  },
];

export default function CompetencyCards() {
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
          교육 효과
        </p>
        <h2 className="mt-2 text-2xl font-black text-zinc-900 sm:text-3xl md:text-4xl">
          이 여정이 키워주는 5가지 힘
        </h2>
        <p className="mt-3 text-base font-semibold text-zinc-700/80 sm:text-lg">
          경험 속에서 자연스럽게 자라나는 핵심 역량들이에요.
        </p>
      </motion.div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {COMPETENCIES.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`flex flex-col items-center rounded-2xl border-2 p-5 text-center shadow-sm ${c.bg} ${c.border}`}
            >
              <Icon
                className="size-9 text-zinc-800 sm:size-10"
                strokeWidth={2}
                aria-hidden
              />
              <h3 className="mt-3 text-sm font-extrabold text-zinc-900 sm:text-base">
                {c.title}
              </h3>
              <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-600 sm:text-sm">
                {c.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
