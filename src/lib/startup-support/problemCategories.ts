// 11개 문제 분야 선택 카드 데이터
import type { ProblemCategory } from "@/types/startup-support";

export interface ProblemCategoryItem {
  value: ProblemCategory;
  label: string;
  description: string;
}

export const PROBLEM_CATEGORIES: ProblemCategoryItem[] = [
  { value: "환경 문제", label: "환경 문제", description: "쓰레기, 일회용품, 재활용, 에너지 낭비" },
  { value: "교육 문제", label: "교육 문제", description: "학습 격차, 진로 정보 부족, 공부 습관" },
  { value: "교통 문제", label: "교통 문제", description: "통학 안전, 교통약자 이동, 교통 불편" },
  { value: "보건·의료 문제", label: "보건·의료 문제", description: "마음 건강, 건강관리, 응급상황" },
  { value: "주거 문제", label: "주거 문제", description: "청소년 공간, 안전한 생활환경" },
  { value: "안전·치안 문제", label: "안전·치안 문제", description: "학교 주변 위험, 야간 귀가, 재난 대응" },
  { value: "경제 문제", label: "경제 문제", description: "지역상권, 용돈관리, 청소년 금융" },
  { value: "문화·여가 문제", label: "문화·여가 문제", description: "청소년 활동공간, 지역문화 접근성" },
  { value: "사회복지 문제", label: "사회복지 문제", description: "돌봄 공백, 노인·장애인 지원" },
  { value: "인구감소 문제", label: "인구감소 문제", description: "지역 활력 저하, 청년 유출" },
  { value: "기타", label: "기타", description: "직접 입력" },
];
