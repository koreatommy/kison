// label + input + 도움말 + 에러 메시지 통합 컴포넌트
"use client";

interface InputGroupProps {
  label: string;
  required?: boolean;
  helpText?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export default function InputGroup({ label, required, helpText, error, children, className = "" }: InputGroupProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-semibold text-zinc-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {helpText && !error && (
        <p className="text-xs text-zinc-400">{helpText}</p>
      )}
      {error && (
        <p className="text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
