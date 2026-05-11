// 팀 내 개별 멤버 카드
import Image from "next/image";
import type { TeamCandidate } from "@/types/result";
import { getCharacter } from "@/lib/character-map";

type Props = {
  member: TeamCandidate;
};

export default function TeamMemberCard({ member }: Props) {
  const character = getCharacter(member.primaryCharacter);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 p-3">
      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={character.imageUrl}
          alt={character.name}
          fill
          className="object-contain"
          sizes="40px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-zinc-800">{member.name}</p>
        <p className="truncate text-xs text-zinc-500">
          {character.name} · {member.grade}
        </p>
      </div>
      <span
        className="rounded-full px-2 py-0.5 text-xs font-medium"
        style={{
          backgroundColor: `${character.color.primary}20`,
          color: character.color.primary,
        }}
      >
        {character.title}
      </span>
    </div>
  );
}
