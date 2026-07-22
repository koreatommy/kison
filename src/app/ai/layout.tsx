// /ai 라우트 — 교안 랜딩 전용 레이아웃 (라이트 배경)
import type { Metadata } from "next";
import "./ai-route.css";

export const metadata: Metadata = {
  title: "우리 아이 진로 로드맵 | AI 학부모 실습 교안",
  description:
    "AI를 활용한 우리 아이 진로 로드맵 만들기 — Lovable로 만드는 초등 5~6학년·중학 1~3학년 진로·진학 관리 대시보드 학부모 실습 교안",
  alternates: {
    canonical: "/ai",
  },
};

type AiLayoutProps = {
  children: React.ReactNode;
  params: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AiLayout({ children, params }: AiLayoutProps) {
  await params;
  return children;
}
