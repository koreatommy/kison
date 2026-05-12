// 설문 진행 상태 관리 (Zustand + localStorage persist)
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuestionOption, StudentProfile, StudentResult } from "@/types/result";
import { QUESTION_COUNT } from "@/data/questions";
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
  goToIndex: (index: number) => void;
  /** 답변을 정규화한 뒤 결과를 저장하고 성공 여부를 반환 (클릭 시점 스토어 스냅샷 사용) */
  finishSurvey: () => boolean;
  reset: () => void;
};

const INITIAL_STATE: SurveyState = {
  studentProfile: null,
  answers: Array(QUESTION_COUNT).fill(null),
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
        let next = [...get().answers];
        if (next.length < QUESTION_COUNT) {
          next = [
            ...next,
            ...Array(QUESTION_COUNT - next.length).fill(null),
          ] as (QuestionOption | null)[];
        }
        next[index] = answer;
        set({ answers: next });
      },

      goNext: () => {
        const { currentIndex } = get();
        if (currentIndex < QUESTION_COUNT - 1)
          set({ currentIndex: currentIndex + 1 });
      },

      goPrev: () => {
        const { currentIndex } = get();
        if (currentIndex > 0) set({ currentIndex: currentIndex - 1 });
      },

      goToIndex: (index) => {
        if (index >= 0 && index < QUESTION_COUNT) set({ currentIndex: index });
      },

      finishSurvey: () => {
        const { studentProfile, answers } = get();
        if (!studentProfile) return false;

        const filled: QuestionOption[] = [];
        for (let i = 0; i < QUESTION_COUNT; i++) {
          const a = answers[i];
          if (a === null || a === undefined) return false;
          filled.push(a);
        }

        const result = calculateResult(studentProfile, filled);
        set({
          result,
          isCompleted: true,
          answers: [...filled],
        });
        return true;
      },

      reset: () =>
        set({ ...INITIAL_STATE, answers: Array(QUESTION_COUNT).fill(null) }),
    }),
    { name: "kison-survey" }
  )
);
