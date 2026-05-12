// 설문 진행 상태 관리 (Zustand + localStorage persist)
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuestionOption, StudentProfile, StudentResult } from "@/types/result";
import { calculateResult } from "@/lib/scoring";

type SurveyState = {
  studentProfile: StudentProfile | null;
  answers: (QuestionOption | null)[];
  currentIndex: number;
  result: StudentResult | null;
  isCompleted: boolean;
};

type SurveyActions = {
  setProfile: (profile: StudentProfile) => void;
  selectAnswer: (index: number, answer: QuestionOption) => void;
  goNext: () => void;
  goPrev: () => void;
  complete: () => void;
  reset: () => void;
};

const INITIAL_STATE: SurveyState = {
  studentProfile: null,
  answers: Array(10).fill(null),
  currentIndex: 0,
  result: null,
  isCompleted: false,
};

export const useSurveyStore = create<SurveyState & SurveyActions>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setProfile: (profile) => set({ studentProfile: profile }),

      selectAnswer: (index, answer) => {
        const answers = [...get().answers];
        answers[index] = answer;
        set({ answers });
      },

      goNext: () => {
        const { currentIndex } = get();
        if (currentIndex < 9) set({ currentIndex: currentIndex + 1 });
      },

      goPrev: () => {
        const { currentIndex } = get();
        if (currentIndex > 0) set({ currentIndex: currentIndex - 1 });
      },

      complete: () => {
        const { studentProfile, answers } = get();
        if (!studentProfile) return;

        if (
          answers.length !== 10 ||
          !answers.every((a): a is QuestionOption => a !== null)
        ) {
          return;
        }

        const result = calculateResult(studentProfile, answers);
        set({ result, isCompleted: true });
      },

      reset: () => set({ ...INITIAL_STATE, answers: Array(10).fill(null) }),
    }),
    { name: "kison-survey" }
  )
);
