// 개인 결과 리포트 페이지 - 컨페티 + 히어로 + 차트 + 카드 그리드
"use client";

import { SsgoiTransition } from "@ssgoi/react";
import { useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AppHeader from "@/components/layout/AppHeader";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";
import Confetti from "@/components/effects/Confetti";
import ResultHeader from "@/components/result/ResultHeader";
import CharacterHeroCard from "@/components/result/CharacterHeroCard";
import RadarChartCard from "@/components/result/RadarChartCard";
import AbilityScoreList from "@/components/result/AbilityScoreList";
import ReportCard from "@/components/result/ReportCard";
import { Dumbbell, Sprout, Target } from "lucide-react";
import MatchCharacterCard from "@/components/result/MatchCharacterCard";
import ResultActionButtons from "@/components/result/ResultActionButtons";
import { mockResult } from "@/data/mockResult";
import { resultTemplates } from "@/data/resultTemplates";
import { getCharacter } from "@/lib/character-map";
import { getCharacterTheme } from "@/lib/character-theme";
import { saveAsImage } from "@/lib/export-image";
import { saveAsPdf } from "@/lib/export-pdf";
import { useSurveyStore } from "@/store/useSurveyStore";
import { useResultsStore } from "@/store/useResultsStore";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

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

  const { result, student } = data;
  const primary = getCharacter(result.primaryCharacter);
  const template = resultTemplates[result.primaryCharacter];
  const matchCharacters = template.bestMatches.map(getCharacter);
  const theme = getCharacterTheme(result.primaryCharacter);

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
    <SsgoiTransition id="/result">
    <>
      <Confetti colors={[theme.from, theme.to, "#FFFFFF"]} trigger={primary.id} />
      <AppHeader />
      <main className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-pink-50">
        <BackgroundBlobs variant="indigo" />

        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
          <div ref={reportRef}>
            <ResultHeader studentName={student.name} />

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <CharacterHeroCard character={primary} />
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <RadarChartCard
                scores={result.scores}
                color={primary.color.primary}
              />
              <AbilityScoreList
                scores={result.scores}
                color={primary.color.primary}
                secondaryColor={primary.color.secondary}
              />
            </motion.div>

            {result.resultType === "mixed" && result.mixedCharacters && (
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-5 shadow-lg shadow-violet-100"
              >
                <h4 className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-violet-700">
                  <span>🌈</span>
                  복합 성향
                </h4>
                <div className="flex flex-wrap gap-3">
                  {result.mixedCharacters.map((id) => {
                    const char = getCharacter(id);
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm"
                      >
                        <span
                          className="inline-block h-3 w-3 rounded-full"
                          style={{ backgroundColor: char.color.primary }}
                        />
                        <span className="text-sm font-black text-zinc-800">
                          {char.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {result.resultType === "balanced" && (
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="mt-6 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 shadow-lg shadow-blue-100"
              >
                <h4 className="mb-1 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-700">
                  <span>⚖️</span>
                  균형형 창업가
                </h4>
                <p className="text-sm font-semibold text-blue-700/80">
                  모든 영역이 고르게 발달한 균형형 창업가예요! 어떤 역할이든 잘
                  해낼 수 있어요.
                </p>
              </motion.div>
            )}

            {result.secondaryCharacter && result.resultType === "single" && (
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="mt-6 rounded-3xl border border-white bg-white/90 backdrop-blur-sm p-5 shadow-xl shadow-indigo-100/60"
              >
                <h4 className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-600">
                  <span>🪄</span>
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
                  <span className="text-sm font-black text-zinc-900">
                    {getCharacter(result.secondaryCharacter).name}
                  </span>
                  <span className="text-xs font-bold text-zinc-500">
                    {getCharacter(result.secondaryCharacter).title}
                  </span>
                </div>
              </motion.div>
            )}

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <ReportCard
                title="강점"
                icon={Dumbbell}
                items={template.strengths}
                accentColor={primary.color.primary}
              />
              <ReportCard
                title="성장 포인트"
                icon={Sprout}
                items={template.growthPoints}
                accentColor={primary.color.secondary}
              />
              <MatchCharacterCard matches={matchCharacters} />
              <ReportCard
                title="추천 활동"
                icon={Target}
                items={template.recommendedActivities}
                accentColor={primary.color.primary}
              />
            </motion.div>
          </div>

          <ResultActionButtons
            onRetake={handleRetake}
            onSaveImage={handleSaveImage}
            onSavePdf={handleSavePdf}
          />
        </div>
      </main>
    </>
    </SsgoiTransition>
  );
}
