// 1단계 평가 퀴즈 데이터 (OX 5문항 + 4지선다형 5문항)

export type OXQuestion = {
  type: "ox";
  question: string;
  answer: boolean;
  explanation: string;
};

export type MCQuestion = {
  type: "mc";
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type QuizQuestion = OXQuestion | MCQuestion;

/** Fisher-Yates 셔플로 문항 순서를 무작위로 섞음 */
export function shuffleQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function formatOXAnswer(value: boolean) {
  return value ? "O" : "X";
}

export function formatMCAnswer(question: MCQuestion, index: number) {
  const labels = ["①", "②", "③", "④"];
  return `${labels[index]} ${question.options[index]}`;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    type: "ox",
    question: "창업은 반드시 거창한 회사를 설립하는 것만을 의미한다.",
    answer: false,
    explanation:
      "창업은 문제를 발견하고 이를 해결하기 위해 새로운 방법을 만들어내는 모든 창의적인 활동을 포함합니다.",
  },
  {
    type: "ox",
    question:
      "이 프로그램에서 기르고자 하는 핵심 가치 3가지는 창의성, 도전정신, 협업 능력이다.",
    answer: true,
    explanation:
      "창업을 기업 설립이 아닌 창의성, 도전정신, 협업 능력을 기르는 과정으로 정의하고 있습니다.",
  },
  {
    type: "ox",
    question: "팀워크는 창업의 여정에서 가장 마지막 단계에 필요한 요소이다.",
    answer: false,
    explanation:
      "팀워크는 창업의 첫걸음이며, 서로 다른 개성과 아이디어를 모으는 시작점입니다.",
  },
  {
    type: "ox",
    question:
      "CFO(최고재무책임자)는 팀의 기술적 구현과 제품 개발을 주도하는 역할을 한다.",
    answer: false,
    explanation:
      "예산과 돈의 흐름을 관리하는 것은 CFO의 역할이며, 기술 개발을 주도하는 것은 CTO의 역할입니다.",
  },
  {
    type: "ox",
    question:
      "팀 빌딩 활동에서 서로의 강점을 파악하기 위해 '3가지 키워드'를 활용한다.",
    answer: true,
    explanation:
      "일상 속에서 나를 표현할 수 있는 3가지 키워드를 통해 팀원들의 개성과 강점을 빠르게 파악할 수 있습니다.",
  },
  {
    type: "mc",
    question:
      "스타트업의 직책 중 '에너지 넘치는 소통으로 고객의 마음을 사로잡는 마케팅 전문가'는 누구인가요?",
    options: [
      "CEO (최고경영책임자)",
      "CMO (최고마케팅책임자)",
      "CTO (최고기술책임자)",
      "CFO (최고재무책임자)",
    ],
    answerIndex: 1,
    explanation:
      "CMO는 에너지 넘치는 캐릭터로, 마케팅과 홍보의 생동감을 표현하고 고객의 마음을 사로잡는 전문가입니다.",
  },
  {
    type: "mc",
    question:
      "이 창업 교육 프로그램의 궁극적인 목적으로 가장 적절한 것은 무엇인가요?",
    options: [
      "실제 회사를 설립하는 것",
      "투자금을 유치하는 방법을 배우는 것",
      '"나도 세상을 바꿀 수 있다"는 자신감을 얻는 것',
      "가장 많은 수익을 내는 사업 모델을 만드는 것",
    ],
    answerIndex: 2,
    explanation:
      "이 프로그램의 목적은 청소년이 자신의 가능성을 발견하고 \"나도 세상을 바꿀 수 있다\"는 자신감을 갖도록 돕는 것입니다.",
  },
  {
    type: "mc",
    question:
      "스타트업 직책 중 '분석적인 사고로 기술적 문제 해결과 개발을 주도하는 캐릭터'는 누구인가요?",
    options: [
      "CEO (최고경영책임자)",
      "CMO (최고마케팅책임자)",
      "CTO (최고기술책임자)",
      "CPO (최고제품책임자)",
    ],
    answerIndex: 2,
    explanation:
      "CTO는 분석적인 캐릭터로, 기술 구현과 제품 개발을 주도하는 역할을 담당합니다.",
  },
  {
    type: "mc",
    question:
      "좋은 팀 이름(브랜드명)을 정할 때 고려해야 할 요소로 강조하는 것이 아닌 것은?",
    options: [
      "팀의 목표를 잘 나타낼 것",
      "팀의 성격과 가치를 담을 것",
      "반드시 영어로만 구성된 화려한 단어",
      "팀만의 개성과 분위기를 담을 것",
    ],
    answerIndex: 2,
    explanation:
      "좋은 팀 이름은 팀의 목표, 성격, 가치를 잘 나타내야 하며 팀만의 개성과 분위기를 담아야 합니다. 반드시 영어를 사용해야 한다는 조건은 없습니다.",
  },
  {
    type: "mc",
    question:
      "스타트업 직책 중 '창의적인 감각으로 서비스 기획과 제품 디자인 및 아이디어를 담당하는 역할'은?",
    options: [
      "CEO (최고경영책임자)",
      "CTO (최고기술책임자)",
      "CFO (최고재무책임자)",
      "CPO (최고제품책임자)",
    ],
    answerIndex: 3,
    explanation:
      "CPO는 창의적인 감각을 바탕으로 서비스 기획과 제품 디자인 및 아이디어 개발을 주도합니다.",
  },
];
