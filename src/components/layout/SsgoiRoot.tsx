"use client";

// SSGOI 페이지 전환 Provider — 레이아웃에서 children을 감쌉니다
import { Ssgoi } from "@ssgoi/react";
import { ssgoiConfig } from "@/lib/ssgoi-config";

export default function SsgoiRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Ssgoi config={ssgoiConfig}>{children}</Ssgoi>;
}
