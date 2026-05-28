// 단계별 제목 + 설명 + 맥락 안내 공통 컴포넌트
"use client";

import { typo } from "./design-tokens";

interface StepHeaderProps {
  title: string;
  description?: string;
  context?: string;
}

export default function StepHeader({ title, description, context }: StepHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className={typo.stepTitle}>{title}</h2>
      {description && <p className={typo.stepDesc}>{description}</p>}
      {context && (
        <p className="mt-2 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-600">
          {context}
        </p>
      )}
    </div>
  );
}
