// 개인 결과 리포트 페이지 (Mock 데이터 기반, Phase 2에서 실데이터 연결)
import AppHeader from "@/components/layout/AppHeader";
import PageContainer from "@/components/layout/PageContainer";
import ResultHeader from "@/components/result/ResultHeader";
import CharacterHeroCard from "@/components/result/CharacterHeroCard";
import RadarChartCard from "@/components/result/RadarChartCard";
import AbilityScoreList from "@/components/result/AbilityScoreList";
import ReportCard from "@/components/result/ReportCard";
import MatchCharacterCard from "@/components/result/MatchCharacterCard";
import ResultActionButtons from "@/components/result/ResultActionButtons";
import { mockResult } from "@/data/mockResult";
import { resultTemplates } from "@/data/resultTemplates";
import { getCharacter } from "@/lib/character-map";

export default function ResultPage() {
  const { result } = mockResult;
  const primary = getCharacter(result.primaryCharacter);
  const template = resultTemplates[result.primaryCharacter];
  const matchCharacters = template.bestMatches.map(getCharacter);

  return (
    <>
      <AppHeader />
      <PageContainer>
        <ResultHeader />

        <CharacterHeroCard character={primary} />

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <RadarChartCard scores={result.scores} color={primary.color.primary} />
          <AbilityScoreList
            scores={result.scores}
            color={primary.color.primary}
          />
        </div>

        {result.secondaryCharacter && (
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h4 className="mb-2 text-sm font-semibold text-zinc-700">
              보조 성향
            </h4>
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{
                  backgroundColor: getCharacter(result.secondaryCharacter)
                    .color.primary,
                }}
              />
              <span className="text-sm font-medium text-zinc-800">
                {getCharacter(result.secondaryCharacter).name}
              </span>
              <span className="text-xs text-zinc-500">
                {getCharacter(result.secondaryCharacter).title}
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ReportCard
            title="강점"
            icon="💪"
            items={template.strengths}
            accentColor={primary.color.primary}
          />
          <ReportCard
            title="성장 포인트"
            icon="🌱"
            items={template.growthPoints}
            accentColor={primary.color.secondary}
          />
          <MatchCharacterCard matches={matchCharacters} />
          <ReportCard
            title="추천 활동"
            icon="🎯"
            items={template.recommendedActivities}
            accentColor={primary.color.primary}
          />
        </div>

        <ResultActionButtons />
      </PageContainer>
    </>
  );
}
