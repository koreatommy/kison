// 창업 아이템 선정 워크플로우 전역 상태 (zustand, persist 미사용)
"use client";

import { create } from "zustand";
import type {
  TeamInfo,
  TeamMember,
  ProblemCategory,
  ProblemAnswer,
  StartupItemCandidate,
  StartupItemEvaluation,
  ShortlistedItem,
  FinalSelection,
  FinalDocument,
  StartupSupportState,
  TokenUsage,
  ClaudeTask,
} from "@/types/startup-support";

const INITIAL_TEAM_INFO: TeamInfo = {
  teamName: "",
  members: [
    { id: crypto.randomUUID(), school: "", grade: "", name: "", characterId: "" },
    { id: crypto.randomUUID(), school: "", grade: "", name: "", characterId: "" },
    { id: crypto.randomUUID(), school: "", grade: "", name: "", characterId: "" },
  ],
};

const INITIAL_STATE: StartupSupportState = {
  currentStep: 0,
  teamInfo: INITIAL_TEAM_INFO,
  problemInput: { selectedCategories: [], problemText: "" },
  problemAnswers: [],
  candidates: [],
  evaluations: [],
  evaluationSummary: "",
  evaluationKeyRisks: [],
  recommendedCandidateId: "",
  shortlistedItems: [],
  finalSelection: null,
  finalDocument: null,
  apiKey: "",
  tokenUsageTotal: {
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
  },
  tokenUsageLast: null,
  tokenUsageRequestCount: 0,
  resumePromptNonce: 0,
};

type Actions = {
  goNext: () => void;
  goPrev: () => void;
  goToStep: (step: number) => void;
  reset: () => void;

  setTeamName: (name: string) => void;
  addMember: () => void;
  removeMember: (id: string) => void;
  updateMember: (id: string, field: keyof Omit<TeamMember, "id">, value: string) => void;

  toggleCategory: (cat: ProblemCategory) => void;
  setProblemText: (text: string) => void;

  setProblemAnswers: (answers: ProblemAnswer[]) => void;
  updateProblemAnswer: (questionId: string, answer: string) => void;

  setCandidates: (candidates: StartupItemCandidate[]) => void;
  setEvaluations: (
    evaluations: StartupItemEvaluation[],
    summary: string,
    keyRisks: string[],
    recommendedId: string,
  ) => void;

  setShortlistedItems: (items: ShortlistedItem[]) => void;
  setFinalSelection: (selection: FinalSelection) => void;
  setFinalDocument: (doc: FinalDocument) => void;

  setApiKey: (key: string) => void;
  addTokenUsage: (task: ClaudeTask, usage: TokenUsage) => void;
  resetTokenUsage: () => void;
  requestResumePrompt: () => void;
};

export const useStartupSupportStore = create<StartupSupportState & Actions>()(
  (set, get) => ({
    ...INITIAL_STATE,

    goNext: () => {
      const { currentStep } = get();
      if (currentStep < 8) set({ currentStep: currentStep + 1 });
    },
    goPrev: () => {
      const { currentStep } = get();
      if (currentStep > 0) set({ currentStep: currentStep - 1 });
    },
    goToStep: (step) => {
      if (step >= 0 && step <= 8) set({ currentStep: step });
    },
    reset: () =>
      set({
        ...INITIAL_STATE,
        teamInfo: {
          teamName: "",
          members: [
            { id: crypto.randomUUID(), school: "", grade: "", name: "", characterId: "" },
            { id: crypto.randomUUID(), school: "", grade: "", name: "", characterId: "" },
            { id: crypto.randomUUID(), school: "", grade: "", name: "", characterId: "" },
          ],
        },
      }),

    setTeamName: (name) =>
      set((s) => ({ teamInfo: { ...s.teamInfo, teamName: name } })),
    addMember: () =>
      set((s) => ({
        teamInfo: {
          ...s.teamInfo,
          members: [
            ...s.teamInfo.members,
            { id: crypto.randomUUID(), school: "", grade: "", name: "", characterId: "" },
          ],
        },
      })),
    removeMember: (id) =>
      set((s) => ({
        teamInfo: {
          ...s.teamInfo,
          members: s.teamInfo.members.filter((m) => m.id !== id),
        },
      })),
    updateMember: (id, field, value) =>
      set((s) => ({
        teamInfo: {
          ...s.teamInfo,
          members: s.teamInfo.members.map((m) =>
            m.id === id ? { ...m, [field]: value } : m,
          ),
        },
      })),

    toggleCategory: (cat) =>
      set((s) => {
        const cats = s.problemInput.selectedCategories;
        const next = cats.includes(cat)
          ? cats.filter((c) => c !== cat)
          : [...cats, cat];
        return { problemInput: { ...s.problemInput, selectedCategories: next } };
      }),
    setProblemText: (text) =>
      set((s) => ({ problemInput: { ...s.problemInput, problemText: text } })),

    setProblemAnswers: (answers) => set({ problemAnswers: answers }),
    updateProblemAnswer: (questionId, answer) =>
      set((s) => ({
        problemAnswers: s.problemAnswers.map((a) =>
          a.questionId === questionId ? { ...a, answer } : a,
        ),
      })),

    setCandidates: (candidates) => set({ candidates }),
    setEvaluations: (evaluations, summary, keyRisks, recommendedId) =>
      set({
        evaluations,
        evaluationSummary: summary,
        evaluationKeyRisks: keyRisks,
        recommendedCandidateId: recommendedId,
      }),

    setShortlistedItems: (items) => set({ shortlistedItems: items }),
    setFinalSelection: (selection) => set({ finalSelection: selection }),
    setFinalDocument: (doc) => set({ finalDocument: doc }),

    setApiKey: (key) => set({ apiKey: key }),
    addTokenUsage: (task, usage) =>
      set((s) => ({
        tokenUsageLast: { ...usage, task },
        tokenUsageRequestCount: s.tokenUsageRequestCount + 1,
        tokenUsageTotal: {
          inputTokens: s.tokenUsageTotal.inputTokens + usage.inputTokens,
          outputTokens: s.tokenUsageTotal.outputTokens + usage.outputTokens,
          totalTokens: s.tokenUsageTotal.totalTokens + usage.totalTokens,
        },
      })),
    resetTokenUsage: () =>
      set({
        tokenUsageTotal: {
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
        },
        tokenUsageLast: null,
        tokenUsageRequestCount: 0,
      }),
    requestResumePrompt: () =>
      set((s) => ({ resumePromptNonce: s.resumePromptNonce + 1 })),
  }),
);
