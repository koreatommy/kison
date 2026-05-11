// 결과 화면 메인 캐릭터 프로필 카드 (이미지 + 이름 + 역할 + 설명 + 배지 + 대사)
import Image from "next/image";
import type { Character } from "@/types/result";

type Props = {
  character: Character;
};

export default function CharacterHeroCard({ character }: Props) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
      style={{
        borderTopColor: character.color.primary,
        borderTopWidth: 4,
      }}
    >
      <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-start sm:gap-6">
        <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100">
          <Image
            src={character.imageUrl}
            alt={character.name}
            fill
            className="object-contain p-2"
            sizes="160px"
          />
        </div>

        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            획득 캐릭터
          </p>
          <h3 className="text-2xl font-extrabold text-zinc-900">
            {character.name}
          </h3>
          <p className="text-sm font-medium text-zinc-600">
            {character.role} / {character.title}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            {character.shortDescription}
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {character.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: `${character.color.primary}20`,
                  color: character.color.primary,
                }}
              >
                #{kw}
              </span>
            ))}
          </div>

          <div
            className="mt-3 rounded-lg px-4 py-2 text-sm font-medium italic"
            style={{
              backgroundColor: `${character.color.secondary}15`,
              color: character.color.secondary,
            }}
          >
            &ldquo;{character.quote}&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}
