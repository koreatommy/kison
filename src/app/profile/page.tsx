// 학생 정보 입력 화면 — 이름/학령/학년/관심분야 → /survey
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/layout/AppHeader";
import PageContainer from "@/components/layout/PageContainer";
import { useSurveyStore } from "@/store/useSurveyStore";

const SCHOOL_LEVELS = [
  { value: "elementary", label: "초등학생" },
  { value: "middle", label: "중학생" },
  { value: "high", label: "고등학생" },
] as const;

export default function ProfilePage() {
  const router = useRouter();
  const setProfile = useSurveyStore((s) => s.setProfile);
  const reset = useSurveyStore((s) => s.reset);

  const [name, setName] = useState("");
  const [schoolLevel, setSchoolLevel] = useState<
    "elementary" | "middle" | "high"
  >("middle");
  const [grade, setGrade] = useState("");
  const [interest, setInterest] = useState("");

  const isValid = name.trim().length > 0 && grade.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    reset();
    setProfile({
      name: name.trim(),
      grade: grade.trim(),
      schoolLevel,
      interest: interest.trim() || undefined,
    });
    router.push("/survey");
  }

  return (
    <>
      <AppHeader />
      <PageContainer>
        <div className="mx-auto max-w-md">
          <h2 className="mb-6 text-center text-2xl font-bold text-zinc-900">
            학생 정보 입력
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                이름 *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                학령 *
              </label>
              <div className="flex gap-2">
                {SCHOOL_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setSchoolLevel(level.value)}
                    className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                      schoolLevel === level.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-zinc-300 text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                학년 *
              </label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="예: 6학년, 2학년"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                관심분야 (선택)
              </label>
              <input
                type="text"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="예: 앱 만들기, 요리, 게임"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="mt-2 rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
            >
              설문 시작하기
            </button>
          </form>
        </div>
      </PageContainer>
    </>
  );
}
