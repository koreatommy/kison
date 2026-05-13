// 팀 내 개별 멤버 카드 - 캐릭터 아바타 + 이름 + 역할 배지
import Image from "next/image";
import type { TeamCandidate } from "@/types/result";
import { getCharacter } from "@/lib/character-map";
import { getCharacterTheme } from "@/lib/character-theme";

type Props = {
  member: TeamCandidate;
};

export default function TeamMemberCard({ member }: Props) {
  const character = getCharacter(member.primaryCharacter);
  const theme = getCharacterTheme(character.id);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-gradient-to-r from-white to-zinc-50/60 p-3 transition-colors hover:bg-white">
      <div
        className={`relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-2xl ${theme.bgClass} shadow-md ${theme.glow}`}
      >
        <Image
          src={character.imageUrl}
          alt={character.name}
          fill
          sizes="44px"
          className="object-contain p-1"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-black text-zinc-900">{member.name}</p>
        <p className="truncate text-xs font-bold text-zinc-500">
          {character.name} · {member.grade}
        </p>
      </div>

      <span
        className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider"
        style={{
          backgroundColor: `${character.color.primary}1A`,
          color: character.color.primary,
        }}
      >
        {character.title}
      </span>
    </div>
  );
}
