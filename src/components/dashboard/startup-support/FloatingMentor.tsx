// 우측 하단 고정 멘토 아바타 — 호버 시 말풍선 인사말 표시
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingMentor() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-end gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-2 max-w-[220px] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm leading-relaxed text-zinc-700 shadow-lg ring-1 ring-zinc-200"
          >
            <p className="font-semibold text-zinc-900">안녕하세요! 👋</p>
            <p className="mt-1 text-xs text-zinc-500">
              창업 멘토가 함께합니다.
              <br />
              궁금한 점이 있으면 언제든 물어보세요!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-full bg-white shadow-lg ring-2 ring-zinc-200 transition-shadow hover:shadow-xl hover:ring-zinc-400"
      >
        <Image
          src="/me.png"
          alt="멘토"
          fill
          sizes="64px"
          className="object-cover object-top"
          priority
        />
      </motion.div>
    </div>
  );
}
