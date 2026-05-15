"use client";
// 학습자 행동 5단계 수평 플로우 다이어그램
import { motion } from "framer-motion";
import {
  Brain,
  ChevronRight,
  Handshake,
  Mic,
  PenLine,
  ScanEye,
  type LucideIcon,
} from "lucide-react";

const ACTIONS: {
  icon: LucideIcon;
  label: string;
  sub: string;
}[] = [
  { icon: Brain, label: "생각하기", sub: "스스로 질문하고 탐구해요" },
  { icon: PenLine, label: "기록하기", sub: "과정을 워크북에 남겨요" },
  { icon: Handshake, label: "협업하기", sub: "팀원과 아이디어를 발전시켜요" },
  { icon: Mic, label: "발표하기", sub: "생각과 결과를 공유해요" },
  { icon: ScanEye, label: "성찰하기", sub: "경험에서 배움을 얻어요" },
];

export default function ActionFlow() {
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
          학습 방법
        </p>
        <h2 className="mt-2 text-2xl font-black text-zinc-900 sm:text-3xl md:text-4xl">
          이 수업의 주인공은 바로 나!
        </h2>
        <p className="mt-3 text-base font-semibold text-zinc-700/80 sm:text-lg">
          적극적인 참여와 소통이 성공적인 학습의 열쇠예요.
        </p>
      </motion.div>

      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:gap-0">
        {ACTIONS.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-3 sm:flex-1 sm:flex-col sm:gap-2"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 text-amber-800 shadow-md backdrop-blur-sm sm:h-20 sm:w-20">
                <Icon className="size-8 sm:size-9" strokeWidth={2} aria-hidden />
              </div>
              <div className="sm:text-center">
                <p className="text-sm font-extrabold text-zinc-900 sm:text-base">
                  {a.label}
                </p>
                <p className="text-xs font-medium text-zinc-500 sm:text-sm">
                  {a.sub}
                </p>
              </div>

              <ChevronRight
                className="hidden size-6 text-amber-700/40 sm:block sm:mx-1 md:mx-2"
                strokeWidth={2.5}
                aria-hidden
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
