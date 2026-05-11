// 5개 창업 캐릭터 기본 정보
import type { Character } from "@/types/result";

export const characters: Character[] = [
  {
    id: "captain_lumi",
    code: "CEO",
    name: "캡틴 루미",
    role: "CEO",
    title: "방향잡이 리더",
    shortDescription: "팀의 목표를 정하고 친구들을 이끄는 리더형 캐릭터",
    keywords: ["리더십", "결단력", "팀조율"],
    imageUrl: "/characters/captain_lumi.svg",
    quote: "우리 팀의 방향은 내가 잡을게. 다 같이 해보자!",
    color: { primary: "#FFD700", secondary: "#87CEEB" },
  },
  {
    id: "planner_dodo",
    code: "CPO",
    name: "플래너 도도",
    role: "CPO / PM",
    title: "아이디어 설계자",
    shortDescription:
      "문제를 찾고 아이디어를 구체적인 계획으로 바꾸는 기획형 캐릭터",
    keywords: ["기획력", "분석력", "구조화"],
    imageUrl: "/characters/planner_dodo.svg",
    quote: "좋은 아이디어는 문제를 제대로 이해하는 것에서 시작돼!",
    color: { primary: "#8B5CF6", secondary: "#6EE7B7" },
  },
  {
    id: "maker_theo",
    code: "CTO",
    name: "메이커 테오",
    role: "CTO",
    title: "기술 제작자",
    shortDescription:
      "직접 만들고 실험하며 아이디어를 현실로 바꾸는 제작형 캐릭터",
    keywords: ["제작력", "실행력", "실험정신"],
    imageUrl: "/characters/maker_theo.svg",
    quote: "직접 만들어 보면 더 좋은 답이 보여!",
    color: { primary: "#F97316", secondary: "#14B8A6" },
  },
  {
    id: "story_moa",
    code: "CMO",
    name: "스토리 모아",
    role: "CMO",
    title: "홍보 전략가",
    shortDescription:
      "아이디어를 매력적으로 알리고 사람들의 관심을 끄는 표현형 캐릭터",
    keywords: ["표현력", "홍보력", "설득력"],
    imageUrl: "/characters/story_moa.svg",
    quote: "좋은 아이디어는 잘 보여줘야 더 빛나!",
    color: { primary: "#EC4899", secondary: "#3B82F6" },
  },
  {
    id: "check_nuri",
    code: "COO",
    name: "체크 누리",
    role: "CFO·COO",
    title: "숫자 운영가",
    shortDescription: "일정, 예산, 자료, 준비를 관리하는 운영형 캐릭터",
    keywords: ["운영력", "책임감", "꼼꼼함"],
    imageUrl: "/characters/check_nuri.svg",
    quote: "작은 준비가 팀의 큰 성공을 만든다!",
    color: { primary: "#22C55E", secondary: "#1E3A5F" },
  },
];

export function getCharacterById(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}

export function getCharacterByCode(code: string): Character | undefined {
  return characters.find((c) => c.code === code);
}
