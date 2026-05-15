// 학령 선택 카드 (아이콘 + 라벨)
"use client";

import { Backpack, BookOpen, GraduationCap, type LucideIcon } from "lucide-react";
import type { SchoolLevel } from "@/types/result";

type Option = {
  value: SchoolLevel;
  label: string;
  icon: LucideIcon;
};

const OPTIONS: Option[] = [
  { value: "elementary", label: "초등학생", icon: Backpack },
  { value: "middle", label: "중학생", icon: BookOpen },
  { value: "high", label: "고등학생", icon: GraduationCap },
];

type Props = {
  value: SchoolLevel;
  onChange: (v: SchoolLevel) => void;
};

export default function SchoolLevelPicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {OPTIONS.map((opt) => {
        const selected = value === opt.value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-center gap-1 rounded-2xl border-2 p-3 sm:p-4 transition-all active:scale-95 ${
              selected
                ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-violet-50 shadow-lg shadow-indigo-200/40 scale-[1.02]"
                : "border-zinc-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40"
            }`}
          >
            <Icon
              className={`size-7 sm:size-8 ${selected ? "text-indigo-600" : "text-zinc-500"}`}
              strokeWidth={2}
              aria-hidden
            />
            <span
              className={`text-xs sm:text-sm font-bold ${
                selected ? "text-indigo-700" : "text-zinc-600"
              }`}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
