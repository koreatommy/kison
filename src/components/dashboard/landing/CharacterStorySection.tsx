"use client";
// 랜딩 — 창업 캐릭터 5종 스토리텔링 수업 소개 섹션
import { motion } from "framer-motion";
import CharacterRoleGallery from "@/components/dashboard/startup-support/CharacterRoleGallery";

export default function CharacterStorySection() {
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
          스토리텔링
        </p>
        <h2 className="mt-2 text-2xl font-black text-zinc-900 sm:text-3xl md:text-4xl">
          창업 캐릭터를 통한 스토리 텔링 수업
        </h2>
        <p className="mt-3 text-base font-semibold text-zinc-700/80 sm:text-lg">
          CEO·CPO·CTO·CMO·COO 역할의 5명 캐릭터와 함께 창업 여정을 재미있게
          배워요. 이미지를 누르면 크게 볼 수 있습니다.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mt-12 max-w-5xl rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-lg backdrop-blur-sm sm:p-6 md:p-8"
      >
        <CharacterRoleGallery showHeader={false} className="" />
      </motion.div>
    </section>
  );
}
