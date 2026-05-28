// 문제 구체화 고정 6질문 (PRD 6.4)
import type { ProblemQuestion } from "@/types/startup-support";

export const DEFAULT_PROBLEM_QUESTIONS: ProblemQuestion[] = [
  {
    id: "q1",
    question: "이 문제는 주로 어디에서 발생하나요?",
    placeholder: "예: 학교 앞 횡단보도, 통학 버스 안, 교실 등",
  },
  {
    id: "q2",
    question: "이 문제를 가장 많이 겪는 사람은 누구인가요?",
    placeholder: "예: 초등학생, 노인, 장애인, 직장인 등",
  },
  {
    id: "q3",
    question: "그 사람이 가장 불편함을 느끼는 순간은 언제인가요?",
    placeholder: "예: 등하교 시간, 야간, 비 오는 날 등",
  },
  {
    id: "q4",
    question: "현재는 이 문제를 어떻게 해결하고 있나요?",
    placeholder: "예: 선생님이 지도, 보호자가 동행, 앱 사용 등",
  },
  {
    id: "q5",
    question: "기존 해결 방법의 부족한 점은 무엇인가요?",
    placeholder: "예: 인력 부족, 비용 문제, 접근성 부족 등",
  },
  {
    id: "q6",
    question: "이 문제가 해결되면 어떤 변화가 생기나요?",
    placeholder: "예: 안전한 통학, 학습 격차 해소, 지역 활성화 등",
  },
];
