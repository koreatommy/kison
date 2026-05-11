// 잘 맞는 팀원 캐릭터 카드 (궁합 캐릭터 2명 표시)
import Image from "next/image";
import type { Character } from "@/types/result";

type Props = {
  matches: Character[];
};

export default function MatchCharacterCard({ matches }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-700">
        <span>🤝</span>
        잘 맞는 팀원
      </h4>
      <div className="flex flex-col gap-3">
        {matches.map((m) => (
          <div key={m.id} className="flex items-center gap-3">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
              <Image
                src={m.imageUrl}
                alt={m.name}
                fill
                className="object-contain p-1"
                sizes="48px"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-800">{m.name}</p>
              <p className="text-xs text-zinc-500">
                {m.role} / {m.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
