// 시작 화면 히어로: 5개 캐릭터가 원형 궤도에 배치된 일러스트
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { characters } from "@/data/characters";
import { getCharacterTheme } from "@/lib/character-theme";

export default function CharacterOrbit() {
  return (
    <div className="relative mx-auto h-[280px] w-[280px] sm:h-[360px] sm:w-[360px]">
      <div className="absolute inset-8 rounded-full border-2 border-dashed border-indigo-200" />

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 flex h-32 w-32 sm:h-40 sm:w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 shadow-2xl shadow-violet-400/40"
      >
        <div className="flex flex-col items-center text-white">
          <span className="text-3xl sm:text-4xl">✨</span>
          <span className="text-xs sm:text-sm font-black mt-1">KISON</span>
        </div>
      </motion.div>

      {characters.map((char, i) => {
        const angle = (i / characters.length) * 2 * Math.PI - Math.PI / 2;
        /* 280px 컨테이너 반지름 140 — 아이콘 반폭(~32) 포함 시 궤도 반지름 100 이하여야 가로 넘침 방지 */
        const radius = 100;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const theme = getCharacterTheme(char.id);

        return (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.15 * i + 0.2,
              type: "spring",
              stiffness: 200,
              damping: 14,
            }}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl ${theme.bgClass} shadow-lg ${theme.glow}`}
            >
              <Image
                src={char.imageUrl}
                alt={char.name}
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
