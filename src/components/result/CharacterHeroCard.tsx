// 결과 화면 히어로 캐릭터 카드 - 풀스크린, 그라디언트, RPG 프로필 스타일
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Character } from "@/types/result";
import { getCharacterTheme } from "@/lib/character-theme";

type Props = {
  character: Character;
};

export default function CharacterHeroCard({ character }: Props) {
  const theme = getCharacterTheme(character.id);

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-soft opacity-20"
      />

      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/20 blur-2xl"
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-white/15 blur-2xl"
      />

      <div className="relative flex flex-col items-center gap-5 p-6 sm:p-8 text-white">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/25 backdrop-blur-sm px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest">
          <span>✨</span>
          획득 캐릭터
        </div>

        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
          className="relative h-44 w-44 sm:h-52 sm:w-52"
        >
          <div className="absolute inset-0 rounded-full bg-white/30 blur-xl" />
          <div className="relative h-full w-full rounded-3xl bg-white/95 p-4 shadow-2xl shadow-black/20">
            <Image
              src={character.imageUrl}
              alt={character.name}
              fill
              priority
              sizes="(max-width: 640px) 176px, 208px"
              className="object-contain p-3"
            />
          </div>
        </motion.div>

        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight drop-shadow-md">
            {character.name}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base font-bold text-white/90 uppercase tracking-wider">
            {character.role} · {character.title}
          </p>
        </div>

        <p className="max-w-md text-center text-sm sm:text-base font-semibold text-white/95 leading-relaxed">
          {character.shortDescription}
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {character.keywords.map((kw) => (
            <span
              key={kw}
              className="rounded-full bg-white/95 px-3 py-1 text-xs sm:text-sm font-black"
              style={{ color: theme.from }}
            >
              #{kw}
            </span>
          ))}
        </div>

        <div className="relative mt-2 max-w-md rounded-2xl bg-white/95 px-5 py-3 text-center shadow-lg">
          <div
            aria-hidden
            className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 bg-white/95"
          />
          <p
            className="relative text-sm sm:text-base font-extrabold italic"
            style={{ color: theme.from }}
          >
            &ldquo;{character.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
