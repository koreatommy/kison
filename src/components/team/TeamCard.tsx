// 개별 팀 결과 카드 (멤버 목록 + 역할 분포 차트)
import type { Team } from "@/types/result";
import { getTeamRoleDistribution } from "@/lib/team-builder";
import TeamMemberCard from "./TeamMemberCard";
import RoleBalanceChart from "./RoleBalanceChart";

type Props = {
  team: Team;
};

export default function TeamCard({ team }: Props) {
  const distribution = getTeamRoleDistribution(team.members);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-zinc-800">
        {team.id.replace("team-", "팀 ")} ({team.members.length}명)
      </h3>

      <div className="flex flex-col gap-2">
        {team.members.map((m) => (
          <TeamMemberCard key={m.id} member={m} />
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold text-zinc-500">역할 분포</p>
        <RoleBalanceChart distribution={distribution} />
      </div>
    </div>
  );
}
