// 문제 구체화 고정 6질문 (PRD 6.4)
import type { ProblemQuestion } from "@/types/startup-support";

export const DEFAULT_PROBLEM_QUESTIONS: ProblemQuestion[] = [
  {
    id: "q1",
    question: "이 문제는 주로 어디에서 발생하나요?",
    placeholder:
      "예: ○○중학교 정문 앞 횡단보도, 등하교 버스 정류장, 교실 복도 끝 계단 — 실제 관찰한 장소를 적어주세요",
  },
  {
    id: "q2",
    question: "이 문제를 가장 많이 겪는 사람은 누구인가요?",
    placeholder:
      "예: 1~3학년 중학생, 특히 혼자 등하교하며 스마트폰을 자주 보는 또래 — 누가 가장 힘들어하는지 구체적으로",
  },
  {
    id: "q3",
    question: "그 사람이 가장 불편함을 느끼는 순간은 언제인가요?",
    placeholder:
      "예: 등하교 피크(7:30~8:30), 비·어두운 날, 신호 대기 중 스마트폰을 볼 때 — 시간·상황을 함께 적어주세요",
  },
  {
    id: "q4",
    question: "현재는 이 문제를 어떻게 해결하고 있나요?",
    placeholder:
      "예: 교사·교통안전 봉사 학생이 수시로 지도, 보호자 동행, 신호 알림 앱 사용 — 지금 쓰는 방법을 사례처럼",
  },
  {
    id: "q5",
    question: "기존 해결 방법의 부족한 점은 무엇인가요?",
    placeholder:
      "예: 모든 시간대를 막기 어렵고 지도가 일시적이라 습관이 바뀌지 않음 — 왜 부족한지 한두 문장으로",
  },
  {
    id: "q6",
    question: "이 문제가 해결되면 어떤 변화가 생기나요?",
    placeholder:
      "예: 횡단보도 사고 걱정이 줄고, 학생이 안전 습관을 스스로 지키는 학교 문화 — 해결 후 변화를 구체적으로",
  },
];
