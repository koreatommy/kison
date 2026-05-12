// 결과 화면 히어로 캐릭터 카드 - 풀스크린, 그라디언트, RPG 프로필 스타일
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Character } from "@/types/result";
import { getCharacterTheme } from "@/lib/character-theme";

type Props = {
  character: Character;
};

export default function CharacterHeroCard({ character }: Props) {
  const theme = getCharacterTheme(character.id);
  const reduceMotion = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalTitleId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      cancelAnimationFrame(raf);
    };
  }, [modalOpen]);

  const modal =
    modalOpen && mounted ? (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
        role="presentation"
        onClick={() => setModalOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="relative flex max-h-[92vh] max-w-[min(94vw,760px)] flex-col items-center gap-3 overflow-y-auto overscroll-contain rounded-3xl bg-white p-4 pb-5 shadow-2xl sm:p-6 sm:pb-6"
          onClick={(e) => e.stopPropagation()}
        >
          <p id={modalTitleId} className="sr-only">
            {character.name} 캐릭터 이미지 크게 보기
          </p>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setModalOpen(false)}
            className="absolute right-3 top-3 z-10 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-black text-white shadow-md transition hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 sm:right-4 sm:top-4 sm:px-4 sm:text-sm"
          >
            닫기
          </button>
          <div className="relative mx-auto mt-10 aspect-[1086/1448] h-[min(78vh,860px)] max-w-full w-auto">
            <Image
              src={character.imageUrl}
              alt={character.name}
              fill
              sizes="(max-width: 768px) 90vw, 760px"
              className="rounded-2xl object-contain"
            />
          </div>
          <p className="text-center text-sm font-black text-zinc-800">
            {character.name}
          </p>
        </div>
      </div>
    ) : null;

  const frameVariants = reduceMotion
    ? { rest: {}, hover: {}, tap: {} }
    : {
        rest: {
          scale: 1,
          y: 0,
          rotate: 0,
          boxShadow: "0 22px 44px -14px rgba(0, 0, 0, 0.35)",
        },
        hover: {
          scale: 1.07,
          y: -14,
          rotate: -7,
          boxShadow: `0 38px 76px -20px rgba(0, 0, 0, 0.45), 0 0 0 5px ${character.color.primary}59`,
          transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 18,
          },
        },
        tap: {
          scale: 0.94,
          rotate: 0,
          y: -4,
          transition: { type: "spring" as const, stiffness: 520, damping: 24 },
        },
      };

  const imgVariants = reduceMotion
    ? { rest: {}, hover: {} }
    : {
        rest: { scale: 1, rotate: 0 },
        hover: {
          scale: 1.18,
          rotate: 9,
          transition: {
            type: "spring" as const,
            stiffness: 420,
            damping: 16,
          },
        },
      };

  return (
    <>
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
          className="relative h-44 w-44 sm:h-52 sm:w-52 [perspective:520px]"
        >
          <div className="absolute inset-0 rounded-full bg-white/30 blur-xl" />
          <motion.button
            type="button"
            onClick={() => setModalOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={modalOpen}
            aria-label={`${character.name} 이미지 크게 보기`}
            variants={frameVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            style={{ transformOrigin: "50% 85%" }}
            className="relative h-full w-full overflow-hidden rounded-3xl bg-white/95 outline-none ring-offset-2 ring-offset-transparent focus-visible:ring-2 focus-visible:ring-white/90"
          >
            <motion.div
              variants={imgVariants}
              className="relative h-full w-full"
              style={{ transformOrigin: "50% 85%" }}
            >
              <Image
                src={character.imageUrl}
                alt={character.name}
                fill
                priority
                sizes="(max-width: 640px) 176px, 208px"
                className="pointer-events-none object-cover object-center"
              />
            </motion.div>
          </motion.button>
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
    {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
