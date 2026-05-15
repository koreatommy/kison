// 대시보드 내 학생 정보 입력 — 프로필 폼
"use client";

import { SsgoiTransition } from "@ssgoi/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import StepIndicator from "@/components/layout/StepIndicator";
import SchoolLevelPicker from "@/components/profile/SchoolLevelPicker";
import { getGradeLabelsForSchoolLevel } from "@/lib/school-grade-options";
import { useSurveyStore } from "@/store/useSurveyStore";
import type { SchoolLevel } from "@/types/result";

const STEPS = ["기본 정보", "설문", "결과"];

export default function DashboardProfilePage() {
  const router = useRouter();
  const setProfile = useSurveyStore((s) => s.setProfile);
  const reset = useSurveyStore((s) => s.reset);

  const [name, setName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel>("middle");
  const [grade, setGrade] = useState("");
  const [interest, setInterest] = useState("");

  const gradeOptions = getGradeLabelsForSchoolLevel(schoolLevel);

  function handleSchoolLevelChange(level: SchoolLevel) {
    setSchoolLevel(level);
    setGrade((prev) =>
      getGradeLabelsForSchoolLevel(level).includes(prev) ? prev : ""
    );
  }

  const isValid =
    name.trim().length > 0 &&
    schoolName.trim().length > 0 &&
    grade.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    reset();
    setProfile({
      name: name.trim(),
      schoolName: schoolName.trim(),
      grade: grade.trim(),
      schoolLevel,
      interest: interest.trim() || undefined,
    });
    router.push("/dashboard/survey");
  }

  return (
    <SsgoiTransition id="/dashboard/profile" className="h-full">
      <main className="flex h-full flex-col items-center justify-center px-5 py-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <StepIndicator steps={STEPS} current={0} />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">
              안녕! 너는 누구야?
            </h1>
            <p className="mt-2 text-sm font-semibold text-zinc-500">
              너에게 맞는 캐릭터를 찾으려면 조금만 알려줘
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white bg-white/80 backdrop-blur-sm p-6 shadow-xl shadow-indigo-200/40 flex flex-col gap-5"
          >
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-zinc-500">
                이름 <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm font-semibold placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-zinc-500">
                학령 <span className="text-pink-500">*</span>
              </label>
              <SchoolLevelPicker
                value={schoolLevel}
                onChange={handleSchoolLevelChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-zinc-500">
                학교 <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="학교 이름을 입력하세요"
                className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm font-semibold placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="dashboard-profile-grade"
                className="mb-2 block text-xs font-black uppercase tracking-wider text-zinc-500"
              >
                학년 <span className="text-pink-500">*</span>
              </label>
              <select
                id="dashboard-profile-grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              >
                <option value="">학년을 선택하세요</option>
                {gradeOptions.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-zinc-500">
                관심분야 <span className="text-zinc-400 font-bold">(선택)</span>
              </label>
              <input
                type="text"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="예: 앱 만들기, 요리, 게임"
                className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm font-semibold placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-indigo-300/40 transition-all hover:shadow-xl hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:from-zinc-300 disabled:to-zinc-300 disabled:shadow-none disabled:hover:scale-100"
            >
              <span>설문 시작하기</span>
              <ArrowRight className="size-5" strokeWidth={2.5} aria-hidden />
            </button>
          </form>
        </div>
      </main>
    </SsgoiTransition>
  );
}
