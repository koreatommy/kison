// 캐릭터별 결과 리포트 문안 (강점/성장/궁합/추천활동)
import type { CharacterId, ResultTemplate } from "@/types/result";

export const resultTemplates: Record<CharacterId, ResultTemplate> = {
  captain_lumi: {
    strengths: [
      "팀의 목표를 빠르게 정할 수 있어요.",
      "친구들의 의견을 모아 방향을 잡는 데 강해요.",
      "발표나 최종 결정 상황에서 적극적이에요.",
    ],
    growthPoints: [
      "혼자 너무 빨리 결정하지 않도록 주의해요.",
      "조용한 팀원의 의견도 끝까지 듣는 연습이 필요해요.",
      "세부 실행은 팀원과 함께 나누면 더 좋아요.",
    ],
    bestMatches: ["planner_dodo", "check_nuri"],
    recommendedActivities: ["팀장", "발표 대표", "최종 의사결정", "역할 분배"],
  },
  planner_dodo: {
    strengths: [
      "아이디어를 정리하고 체계적으로 구성하는 능력이 좋아요.",
      "고객의 문제나 불편을 잘 발견해요.",
      "발표 흐름이나 사업계획 구조를 잘 잡아요.",
    ],
    growthPoints: [
      "생각만 길어지고 실행이 늦어지지 않도록 주의해요.",
      "실제 사용자 반응을 빠르게 확인해보는 연습이 필요해요.",
      "팀원들과 아이디어를 자주 공유하면 더 좋아요.",
    ],
    bestMatches: ["captain_lumi", "maker_theo"],
    recommendedActivities: [
      "사업 아이디어 설계",
      "문제 정의",
      "발표 내용 구성",
      "기획서 작성",
    ],
  },
  maker_theo: {
    strengths: [
      "말보다 직접 만들어 보며 해결하는 데 강해요.",
      "시제품, 앱, 웹, 모형 제작에 적합해요.",
      "문제를 테스트하며 빠르게 개선할 수 있어요.",
    ],
    growthPoints: [
      "기술이나 제작에만 집중하지 않도록 주의해요.",
      "사용자 입장에서 보기 쉽게 설명하는 연습이 필요해요.",
      "일정과 협업 소통을 함께 챙기면 더 강해져요.",
    ],
    bestMatches: ["planner_dodo", "story_moa"],
    recommendedActivities: [
      "프로토타입 제작",
      "코딩",
      "기능 테스트",
      "시제품 개선",
    ],
  },
  story_moa: {
    strengths: [
      "발표, 홍보, 설명, 디자인에 강해요.",
      "사람들의 관심을 끄는 표현 방식을 잘 찾아요.",
      "브랜드 이름, 로고, 소개 문구 구성에 적합해요.",
    ],
    growthPoints: [
      "겉으로 보이는 부분만 강조하지 않도록 주의해요.",
      "내용과 근거를 함께 준비하면 더 설득력 있어져요.",
      "팀원들과 핵심 메시지를 맞추는 연습이 필요해요.",
    ],
    bestMatches: ["captain_lumi", "maker_theo"],
    recommendedActivities: [
      "발표자",
      "홍보물 제작",
      "소개 문구 작성",
      "브랜드 콘셉트 정리",
    ],
  },
  check_nuri: {
    strengths: [
      "준비물, 자료, 시간, 예산 관리를 잘해요.",
      "빠진 부분을 점검하고 완성도를 높이는 데 강해요.",
      "팀 프로젝트의 안정감을 높여줘요.",
    ],
    growthPoints: [
      "완벽하게 하려다 속도가 늦어지지 않도록 주의해요.",
      "변화가 생길 때 유연하게 대응하는 연습이 필요해요.",
      "숫자와 운영뿐 아니라 아이디어에도 관심을 가지면 더 좋아요.",
    ],
    bestMatches: ["captain_lumi", "planner_dodo"],
    recommendedActivities: [
      "일정 관리",
      "예산 정리",
      "준비물 체크",
      "제출 자료 관리",
    ],
  },
};
