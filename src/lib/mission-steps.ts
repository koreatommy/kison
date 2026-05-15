// 대시보드 10단계 창업 여정 미션 목록 데이터
export type MissionStep = {
  id: number;
  title: string;
  subtitle: string;
  dotColor: string;
};

export type MissionSubItem = {
  id: string;
  label: string;
  href?: string;
};

/** 1단계 미션 펼침 서브 메뉴 */
export const MISSION_1_SUBMENU: MissionSubItem[] = [
  { id: "lecture", label: "강의", href: "/dashboard/lecture" },
  { id: "participate", label: "참여하기", href: "/dashboard/profile" },
  { id: "evaluate", label: "평가", href: "/dashboard/quiz" },
];

export const MISSION_STEPS: MissionStep[] = [
  {
    id: 1,
    title: "창업 이해와 팀 기반 활동",
    subtitle: "Entrepreneurship and Team Activities",
    dotColor: "#8b5cf6",
  },
  {
    id: 2,
    title: "창업의 기초 및 개념 이해하기",
    subtitle: "Basics & Concepts of Entrepreneurship",
    dotColor: "#ec4899",
  },
  {
    id: 3,
    title: "시장조사 및 분석",
    subtitle: "Market Research & Analysis",
    dotColor: "#f97316",
  },
  {
    id: 4,
    title: "고객 문제와 해결 방안",
    subtitle: "Customer Pain & Solution",
    dotColor: "#eab308",
  },
  {
    id: 5,
    title: "제품 서비스 설계",
    subtitle: "Product / Service Design",
    dotColor: "#84cc16",
  },
  {
    id: 6,
    title: "비즈니스 모델 설계",
    subtitle: "Business Model Design",
    dotColor: "#06b6d4",
  },
  {
    id: 7,
    title: "마케팅 홍보 전략",
    subtitle: "Marketing & Promotion Strategy",
    dotColor: "#38bdf8",
  },
  {
    id: 8,
    title: "운영 계획 및 실행 전략",
    subtitle: "Operating & Execution Plan",
    dotColor: "#3b82f6",
  },
  {
    id: 9,
    title: "재무 계획",
    subtitle: "Financial Plan",
    dotColor: "#1d4ed8",
  },
  {
    id: 10,
    title: "발표 및 피칭 전략",
    subtitle: "Presentation & Pitching Strategy",
    dotColor: "#4338ca",
  },
];
