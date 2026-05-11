// 개인 결과 리포트 페이지 (스토어 우선, 없으면 mock 폴백)
"use client";

import { useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { saveAsImage } from "@/lib/export-image";
import { saveAsPdf } from "@/lib/export-pdf";
import { useSurveyStore } from "@/store/useSurveyStore";
import { useResultsStore } from "@/store/useResultsStore";

export default function ResultPage() {
  const router = useRouter();
  const storeResult = useSurveyStore((s) => s.result);
  const reset = useSurveyStore((s) => s.reset);
  const addResult = useResultsStore((s) => s.addResult);

  const reportRef = useRef<HTMLDivElement>(null);
  const savedRef = useRef(false);

  const data = storeResult ?? mockResult;

  useEffect(() => {
    if (storeResult && !savedRef.current) {
      addResult(storeResult);
      savedRef.current = true;
    }
  }, [storeResult, addResult]);
  const { result } = data;
  const primary = getCharacter(result.primaryCharacter);
  const template = resultTemplates[result.primaryCharacter];
  const matchCharacters = template.bestMatches.map(getCharacter);

  function handleRetake() {
    reset();
    router.push("/profile");
  }

  const handleSaveImage = useCallback(() => {
    if (reportRef.current) saveAsImage(reportRef.current);
  }, []);

  const handleSavePdf = useCallback(() => {
    if (reportRef.current) saveAsPdf(reportRef.current);
  }, []);

  return (
    <>
      <AppHeader />
      <PageContainer>
        <div ref={reportRef}>
        <ResultHeader />

        <CharacterHeroCard character={primary} />

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <RadarChartCard scores={result.scores} color={primary.color.primary} />
          <AbilityScoreList
            scores={result.scores}
            color={primary.color.primary}
          />
        </div>

        {result.resultType === "mixed" && result.mixedCharacters && (
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h4 className="mb-2 text-sm font-semibold text-zinc-700">
              복합 성향
            </h4>
            <div className="flex flex-wrap gap-3">
              {result.mixedCharacters.map((id) => {
                const char = getCharacter(id);
                return (
                  <div key={id} className="flex items-center gap-2">
                    <span
                      className="inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: char.color.primary }}
                    />
                    <span className="text-sm font-medium text-zinc-800">
                      {char.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {result.resultType === "balanced" && (
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
            <h4 className="mb-1 text-sm font-semibold text-blue-700">
              균형형 창업가
            </h4>
            <p className="text-sm text-blue-600">
              모든 영역이 고르게 발달한 균형형 창업가예요! 어떤 역할이든 잘
              해낼 수 있어요.
            </p>
          </div>
        )}

        {result.secondaryCharacter && result.resultType === "single" && (
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

        </div>

        <ResultActionButtons
          onRetake={handleRetake}
          onSaveImage={handleSaveImage}
          onSavePdf={handleSavePdf}
        />
      </PageContainer>
    </>
  );
}
