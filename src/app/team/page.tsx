// 팀 구성 결과 화면 (mock 데이터 기반)
import AppHeader from "@/components/layout/AppHeader";
import PageContainer from "@/components/layout/PageContainer";
import TeamCard from "@/components/team/TeamCard";
import { mockTeamCandidates } from "@/data/mockTeamCandidates";
import { buildTeams } from "@/lib/team-builder";

export default function TeamPage() {
  const teams = buildTeams(mockTeamCandidates);

  return (
    <>
      <AppHeader />
      <PageContainer>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-zinc-900">팀 구성 결과</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {mockTeamCandidates.length}명의 학생을 {teams.length}개 팀으로
            구성했어요
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </PageContainer>
    </>
  );
}
