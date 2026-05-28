// 연한 도움말 텍스트 컴포넌트
"use client";

import { typo } from "./design-tokens";

interface HelpTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function HelpText({ children, className = "" }: HelpTextProps) {
  return <p className={`${typo.helpText} ${className}`}>{children}</p>;
}
