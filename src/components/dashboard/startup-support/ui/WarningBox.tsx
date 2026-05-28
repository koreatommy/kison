// 경고/안내 박스 컴포넌트 (warning, error, info, success)
"use client";

import { AlertTriangle, Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { colors } from "./design-tokens";

type Variant = "warning" | "error" | "info" | "success";

interface WarningBoxProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

const icons: Record<Variant, React.ReactNode> = {
  warning: <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />,
  error: <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-500" />,
  info: <Info className="mt-0.5 size-4 shrink-0 text-blue-500" />,
  success: <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />,
};

export default function WarningBox({ variant = "warning", children, className = "" }: WarningBoxProps) {
  const s = colors.status[variant];
  return (
    <div className={`flex gap-2 rounded-xl border ${s.border} ${s.bg} px-4 py-3 text-sm ${s.text} ${className}`}>
      {icons[variant]}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
