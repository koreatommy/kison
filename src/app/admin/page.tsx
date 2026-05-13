// 관리자 대시보드 — 학생 결과 목록/필터/차트/팀구성/CSV
"use client";

import { useState, useMemo } from "react";
import AppHeader from "@/components/layout/AppHeader";
import PageContainer from "@/components/layout/PageContainer";
import AdminStudentTable from "@/components/admin/AdminStudentTable";
import AdminRoleChart from "@/components/admin/AdminRoleChart";
import AdminFilters from "@/components/admin/AdminFilters";
import TeamCard from "@/components/team/TeamCard";
import { useResultsStore } from "@/store/useResultsStore";
import { buildTeams } from "@/lib/team-builder";
import { downloadCsv } from "@/lib/export-csv";


export default function AdminPage() {
  const candidates = useResultsStore((s) => s.candidates);
  const clearAll = useResultsStore((s) => s.clearAll);

  const [schoolFilter, setSchoolFilter] = useState<string>("all");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [charFilter, setCharFilter] = useState<string>("all");
  const [showTeams, setShowTeams] = useState(false);

  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      if (schoolFilter !== "all" && c.schoolLevel !== schoolFilter) return false;
      if (gradeFilter !== "all" && c.grade !== gradeFilter) return false;
      if (charFilter !== "all" && c.primaryCharacter !== charFilter) return false;
      return true;
    });
  }, [candidates, schoolFilter, gradeFilter, charFilter]);

  const teams = useMemo(() => buildTeams(filtered), [filtered]);

  const uniqueGrades = [...new Set(candidates.map((c) => c.grade))];

  return (
    <>
      <AppHeader />
      <PageContainer>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
              관리자 대시보드
            </h2>
            <p className="mt-1 text-sm font-bold text-zinc-500">
              총{" "}
              <span className="text-indigo-600">{candidates.length}명</span>의
              학생 결과
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => downloadCsv(filtered)}
              className="rounded-full border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-extrabold text-zinc-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
            >
              CSV 다운로드
            </button>
            <button
              onClick={() => setShowTeams(!showTeams)}
              className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg shadow-indigo-300/40 transition-all hover:shadow-xl hover:scale-105 active:scale-95"
            >
              {showTeams ? "목록 보기" : "팀 자동 구성"}
            </button>
            <button
              onClick={() => {
                if (confirm("모든 결과를 초기화할까요?")) clearAll();
              }}
              className="rounded-full border-2 border-red-200 bg-white px-4 py-2 text-sm font-extrabold text-red-600 transition-colors hover:bg-red-50"
            >
              초기화
            </button>
          </div>
        </div>

        <AdminFilters
          schoolFilter={schoolFilter}
          gradeFilter={gradeFilter}
          charFilter={charFilter}
          uniqueGrades={uniqueGrades}
          onSchoolChange={setSchoolFilter}
          onGradeChange={setGradeFilter}
          onCharChange={setCharFilter}
        />

        {candidates.length === 0 ? (
          <div className="mt-12 text-center text-zinc-400">
            <p className="text-lg font-medium">아직 저장된 학생 결과가 없어요</p>
            <p className="mt-1 text-sm">
              학생들이 설문을 완료하면 여기에 결과가 쌓여요
            </p>
          </div>
        ) : showTeams ? (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {teams.map((team, i) => (
              <TeamCard key={team.id} team={team} index={i} />
            ))}
          </div>
        ) : (
          <>
            <AdminRoleChart candidates={filtered} />
            <AdminStudentTable candidates={filtered} />
          </>
        )}
      </PageContainer>
    </>
  );
}
