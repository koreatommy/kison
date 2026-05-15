// 결과 분석 중 로딩 화면 - 3-phase 드라마틱 연출 후 /result로 이동
"use client";

import { SsgoiTransition } from "@ssgoi/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Target, type LucideIcon } from "lucide-react";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";

const PHASES: {
  icon: LucideIcon;
  text: string;
  sub: string;
}[] = [
  { icon: Search, text: "답변을 분석하고 있어요", sub: "10개의 응답을 살펴보는 중..." },
  { icon: Target, text: "캐릭터를 매칭하고 있어요", sub: "너에게 가장 잘 맞는 캐릭터는?" },
  { icon: Sparkles, text: "캐릭터를 발견했어요!", sub: "곧 결과를 보여줄게요" },
];

const PHASE_MS = 900;
const TOTAL_MS = PHASES.length * PHASE_MS;

export default function LoadingResultPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => Math.min(p + 1, PHASES.length - 1));
    }, PHASE_MS);

    const timer = setTimeout(() => {
      router.replace("/result");
    }, TOTAL_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  const current = PHASES[phase];
  const PhaseIcon = current.icon;

  return (
    <SsgoiTransition id="/loading-result">
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-violet-50 to-pink-100 p-6">
      <BackgroundBlobs variant="indigo" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative flex h-44 w-44 items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 blur-2xl"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-violet-500"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border-4 border-transparent border-b-pink-500 border-l-amber-400"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white text-indigo-600 shadow-2xl shadow-indigo-300/50"
            >
              <PhaseIcon className="size-11" strokeWidth={2} aria-hidden />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xl sm:text-2xl font-black text-zinc-900">
                {current.text}
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-500">
                {current.sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          {PHASES.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${
                i <= phase
                  ? "w-8 bg-gradient-to-r from-indigo-500 to-violet-500"
                  : "w-2 bg-zinc-200"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
    </SsgoiTransition>
  );
}
