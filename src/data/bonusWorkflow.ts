// /bonus 슬라이드 제작 6단계 워크플로우 데이터
export type BonusWorkflowStep = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export const bonusWorkflowSteps: BonusWorkflowStep[] = [
  {
    id: 1,
    title: "소스추가",
    description:
      "웹 검색·파일·웹사이트·Drive·복사 텍스트로 노트북에 자료를 추가합니다.",
    image: "/images/bonus/workflow/01-source.png",
  },
  {
    id: 2,
    title: "프롬프트창에 슬라이드 디자인 가이드 작성 요청",
    description:
      "채팅에 슬라이드 제작 가이드 프롬프트를 붙여 넣고, 구성안을 받아옵니다.",
    image: "/images/bonus/workflow/02-guide-prompt.png",
  },
  {
    id: 3,
    title: "메모에 저장",
    description:
      "생성된 가이드 메시지에서 ‘메모에 저장’을 눌러 노트에 고정합니다.",
    image: "/images/bonus/workflow/03-save-memo.png",
  },
  {
    id: 4,
    title: "소스로 변환",
    description:
      "저장된 메모 메뉴에서 ‘소스로 변환’을 선택해 슬라이드 생성용 소스로 만듭니다.",
    image: "/images/bonus/workflow/04-convert-source.png",
  },
  {
    id: 5,
    title: "슬라이드 자료 입력",
    description:
      "형식·언어·소스를 고른 뒤, 주제와 스타일 프롬프트를 넣고 ‘생성’합니다.",
    image: "/images/bonus/workflow/05-slide-input.png",
  },
  {
    id: 6,
    title: "슬라이드 확인 및 편집",
    description:
      "생성된 슬라이드를 확인한 뒤, 하단 프롬프트로 개별 슬라이드를 수정합니다.",
    image: "/images/bonus/workflow/06-edit.jpg",
  },
];
