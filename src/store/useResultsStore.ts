// 학생 결과 누적 저장 스토어 (관리자 화면에서 사용)
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TeamCandidate, StudentResult } from "@/types/result";

type ResultsState = {
  candidates: TeamCandidate[];
};

type ResultsActions = {
  addResult: (result: StudentResult) => void;
  removeResult: (id: string) => void;
  clearAll: () => void;
};

let idCounter = 0;

export const useResultsStore = create<ResultsState & ResultsActions>()(
  persist(
    (set, get) => ({
      candidates: [],

      addResult: (result: StudentResult) => {
        const candidate: TeamCandidate = {
          id: `r-${Date.now()}-${idCounter++}`,
          name: result.student.name,
          grade: result.student.grade,
          schoolLevel: result.student.schoolLevel,
          primaryCharacter: result.result.primaryCharacter,
          secondaryCharacter: result.result.secondaryCharacter,
          scores: result.result.scores,
        };
        set({ candidates: [...get().candidates, candidate] });
      },

      removeResult: (id: string) => {
        set({ candidates: get().candidates.filter((c) => c.id !== id) });
      },

      clearAll: () => set({ candidates: [] }),
    }),
    { name: "kison-results" }
  )
);
