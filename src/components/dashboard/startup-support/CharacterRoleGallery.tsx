// 팀 정보 단계용 창업 캐릭터 5종 이미지·역할 참고 갤러리
"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { characters, getCharacterById } from "@/data/characters";
import { getCharacterTheme } from "@/lib/character-theme";
import type { CharacterId } from "@/types/result";

type Props = {
  /** 현재 팀에서 선택된 캐릭터 ID (강조 표시용) */
  selectedCharacterIds?: CharacterId[];
};

export default function CharacterRoleGallery({
  selectedCharacterIds = [],
}: Props) {
  const selectedSet = new Set(selectedCharacterIds);
  const [previewId, setPreviewId] = useState<CharacterId | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalTitleId = useId();
  const previewChar = previewId ? getCharacterById(previewId) : undefined;

  useEffect(() => {
    if (!previewId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewId(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      cancelAnimationFrame(raf);
    };
  }, [previewId]);

  const modal =
    previewChar && mounted ? (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
        role="presentation"
        onClick={() => setPreviewId(null)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="relative box-border flex max-h-[92vh] w-[min(94vw,760px)] max-w-[min(94vw,760px)] shrink-0 flex-col items-stretch gap-3 overflow-y-auto overscroll-contain rounded-3xl bg-white p-4 pb-5 shadow-2xl sm:p-6 sm:pb-6"
          onClick={(e) => e.stopPropagation()}
        >
          <p id={modalTitleId} className="sr-only">
            {previewChar.name} 캐릭터 이미지 크게 보기
          </p>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setPreviewId(null)}
            className="absolute right-3 top-3 z-10 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-black text-white shadow-md transition hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 sm:right-4 sm:top-4 sm:px-4 sm:text-sm"
          >
            닫기
          </button>
          <div
            className={`relative mx-auto mt-10 w-full overflow-hidden rounded-2xl ${getCharacterTheme(previewChar.id).bgClass}`}
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-h-[min(72vh,720px)] max-w-[min(88vw,560px)]">
              <Image
                src={previewChar.imageUrl}
                alt={previewChar.name}
                fill
                sizes="(max-width: 768px) 90vw, 560px"
                className="object-contain p-4 sm:p-6"
                priority
              />
            </div>
          </div>
          <div className="px-2 text-center">
            <p className="text-base font-extrabold text-zinc-900">{previewChar.name}</p>
            <p className="mt-0.5 text-sm font-semibold text-indigo-600">
              {previewChar.title} · {previewChar.role}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {previewChar.shortDescription}
            </p>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <div className="mt-5 border-t border-zinc-100 pt-5">
        <div className="mb-4">
          <p className="text-sm font-semibold text-zinc-700">창업 캐릭터 5종</p>
          <p className="mt-0.5 text-xs text-zinc-400">
            각 구성원에게 맞는 역할을 골라 보세요. 이미지를 누르면 크게 볼 수 있습니다.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {characters.map((char) => {
            const theme = getCharacterTheme(char.id);
            const isSelected = selectedSet.has(char.id);

            return (
              <li
                key={char.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
                  isSelected
                    ? "border-indigo-300 ring-2 ring-indigo-200 ring-offset-1"
                    : "border-zinc-100 hover:border-zinc-200 hover:shadow-md"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setPreviewId(char.id)}
                  className={`relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden ${theme.bgClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`}
                  aria-label={`${char.name} 이미지 크게 보기`}
                >
                  <Image
                    src={char.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
                    aria-hidden
                  />
                  <span className="absolute left-2 top-2 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-700 shadow-sm">
                    {char.code}
                  </span>
                  {isSelected && (
                    <span className="absolute right-2 top-2 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                      선택됨
                    </span>
                  )}
                </button>

                <div className="flex flex-1 flex-col gap-1 p-3">
                  <p className="text-sm font-extrabold text-zinc-900">{char.name}</p>
                  <p className={`text-xs font-bold ${theme.textClass}`}>{char.title}</p>
                  <p className="text-[11px] leading-snug text-zinc-500">{char.role}</p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-zinc-400">
                    {char.shortDescription}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
