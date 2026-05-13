// 개별 팀 결과 카드 - 멤버 목록 + 역할 분포 도넛
import type { Team } from "@/types/result";
import { getTeamRoleDistribution } from "@/lib/team-builder";
import TeamMemberCard from "./TeamMemberCard";
import RoleBalanceChart from "./RoleBalanceChart";

type Props = {
  team: Team;
  index: number;
};

const TEAM_PALETTES = [
  "from-indigo-500 to-violet-500",
  "from-pink-500 to-rose-400",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-blue-500 to-cyan-500",
];

export default function TeamCard({ team, index }: Props) {
  const distribution = getTeamRoleDistribution(team.members);
  const teamNumber = index + 1;
  const palette = TEAM_PALETTES[index % TEAM_PALETTES.length];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white bg-white/90 backdrop-blur-sm p-5 shadow-xl shadow-indigo-100/60">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${palette} text-white text-base font-black shadow-md`}
          >
            {teamNumber}
          </span>
          <div>
            <h3 className="text-lg font-black text-zinc-900">팀 {teamNumber}</h3>
            <p className="text-xs font-bold text-zinc-500">
              {team.members.length}명 구성
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {team.members.map((m) => (
          <TeamMemberCard key={m.id} member={m} />
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-zinc-100 bg-zinc-50/60 p-3">
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
          역할 분포
        </p>
        <RoleBalanceChart distribution={distribution} />
      </div>
    </div>
  );
}
