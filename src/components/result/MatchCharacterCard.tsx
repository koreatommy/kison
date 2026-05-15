// 잘 맞는 팀원 캐릭터 카드 (궁합 캐릭터 2명 표시)
import Image from "next/image";
import { Handshake } from "lucide-react";
import type { Character } from "@/types/result";
import { getCharacterTheme } from "@/lib/character-theme";

type Props = {
  matches: Character[];
};

export default function MatchCharacterCard({ matches }: Props) {
  return (
    <div className="rounded-3xl border border-white bg-white/90 backdrop-blur-sm p-5 shadow-xl shadow-indigo-100/60">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
          <Handshake className="size-5" strokeWidth={2.25} aria-hidden />
        </span>
        <h4 className="text-base font-black text-zinc-900">잘 맞는 팀원</h4>
      </div>
      <div className="flex flex-col gap-3">
        {matches.map((m) => {
          const theme = getCharacterTheme(m.id);
          return (
            <div
              key={m.id}
              className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-gradient-to-r from-zinc-50 to-white p-3"
            >
              <div
                className={`relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-2xl ${theme.bgClass} shadow-md ${theme.glow}`}
              >
                <Image
                  src={m.imageUrl}
                  alt={m.name}
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-zinc-900">{m.name}</p>
                <p className="text-xs font-bold text-zinc-500">
                  {m.role} · {m.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
