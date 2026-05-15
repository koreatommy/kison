"use client";

// 강의 슬라이드쇼 라우트 — Youth_Startup_Quest.pdf를 프레젠테이션 형태로 표시
import dynamic from "next/dynamic";

const LectureSlideshow = dynamic(
  () => import("@/components/dashboard/lecture/LectureSlideshow"),
  { ssr: false },
);

export default function LecturePage() {
  return <LectureSlideshow pdfUrl="/Youth_Startup_Quest.pdf" />;
}
