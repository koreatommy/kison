// 창업 아이템 선정 워크플로우 전체 셸 — 단계 스위치 + 진행률 + 네비
"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import { hasStartupSupportProgress } from "@/lib/startup-support/hasProgress";
import ProgressBar from "./ProgressBar";
import ActionFooter from "./ActionFooter";
import StepIntro from "./StepIntro";
import StepTeamInfo from "./StepTeamInfo";
import StepProblemCategory from "./StepProblemCategory";
import StepProblemDetail from "./StepProblemDetail";
import StepCandidateGen from "./StepCandidateGen";
import StepEvaluation from "./StepEvaluation";
import StepShortlist from "./StepShortlist";
import StepFinalSelection from "./StepFinalSelection";
import StepFinalDocument from "./StepFinalDocument";
import ResumeOrRestartModal from "./ResumeOrRestartModal";
import FloatingMentor from "./FloatingMentor";
import { getStepValidation } from "@/lib/startup-support/stepValidation";

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <StepIntro />;
    case 1:
      return <StepTeamInfo />;
    case 2:
      return <StepProblemCategory />;
    case 3:
      return <StepProblemDetail />;
    case 4:
      return <StepCandidateGen />;
    case 5:
      return <StepEvaluation />;
    case 6:
      return <StepShortlist />;
    case 7:
      return <StepFinalSelection />;
    case 8:
      return <StepFinalDocument />;
    default:
      return null;
  }
}

const scrollVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
  }),
  center: {
    y: 0,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
  }),
};

const scrollTransition = {
  type: "spring" as const,
  stiffness: 95,
  damping: 16,
};

export default function StartupSupportShell() {
  const currentStep = useStartupSupportStore((s) => s.currentStep);
  const teamName = useStartupSupportStore((s) => s.teamInfo.teamName);
  const resumePromptNonce = useStartupSupportStore((s) => s.resumePromptNonce);
  const canProceed = useStartupSupportStore((s) => getStepValidation(s).canProceed);
  const nextDisabledReason = useStartupSupportStore((s) => getStepValidation(s).message);
  const goNext = useStartupSupportStore((s) => s.goNext);
  const goPrev = useStartupSupportStore((s) => s.goPrev);
  const reset = useStartupSupportStore((s) => s.reset);
  const goToStep = useStartupSupportStore((s) => s.goToStep);

  const [showResumeModal, setShowResumeModal] = useState(false);
  const hasCheckedInitialProgress = useRef(false);

  useEffect(() => {
    if (hasCheckedInitialProgress.current) return;
    hasCheckedInitialProgress.current = true;

    const state = useStartupSupportStore.getState();
    if (hasStartupSupportProgress(state)) {
      setShowResumeModal(true);
    }
  }, []);

  useEffect(() => {
    if (resumePromptNonce === 0) return;

    const state = useStartupSupportStore.getState();
    if (hasStartupSupportProgress(state)) {
      setShowResumeModal(true);
    }
  }, [resumePromptNonce]);

  function handleContinue() {
    setShowResumeModal(false);
  }

  function handleRestart() {
    reset();
    goToStep(0);
    setShowResumeModal(false);
  }

  const prevStepRef = useRef(currentStep);
  const direction = currentStep > prevStepRef.current ? 1 : -1;
  prevStepRef.current = currentStep;

  const hideFooterSteps = [0, 8];
  const showFooter = !hideFooterSteps.includes(currentStep);

  const isResultStep = currentStep >= 4;
  const contentMaxW = isResultStep ? "max-w-[1200px]" : "max-w-[960px]";

  return (
    <div className="flex h-full min-h-0 flex-col bg-zinc-50">
      {showResumeModal && (
        <ResumeOrRestartModal
          currentStep={currentStep}
          teamName={teamName}
          onContinue={handleContinue}
          onRestart={handleRestart}
        />
      )}
      {currentStep > 0 && <ProgressBar current={currentStep} />}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={scrollVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={scrollTransition}
            className="absolute inset-0 overflow-y-auto"
          >
            <div className={`mx-auto min-h-full px-3 py-8 sm:px-6 ${contentMaxW}`}>
              {getStepContent(currentStep)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {showFooter && (
        <ActionFooter
          current={currentStep}
          maxStep={8}
          onPrev={goPrev}
          onNext={goNext}
          nextDisabled={!canProceed}
          nextDisabledReason={nextDisabledReason}
        />
      )}
      <FloatingMentor />
    </div>
  );
}
