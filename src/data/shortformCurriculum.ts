// AI 숏폼 크리에이터 클래스 교안 콘텐츠 (정적 HTML 랜딩 이식용)

export const curriculumMeta = {
  brand: "AI SHORT-FORM",
  brandSuffix: "CREATOR CLASS",
  title: "AI Short-form Creator Class",
  subtitle: "상상한 장면이 진짜 영상이 되는 시간",
  audience: "초등학교 4~6학년",
  duration: "100분",
  format: "임직원 자녀 참여 캠프",
  deliverable: "AI IMAGE + AI SHORT (학생별 개별 결과물)",
} as const;

export const navLinks = [
  { href: "#program", label: "PROGRAM" },
  { href: "#lab", label: "AI LAB" },
  { href: "#outcome", label: "OUTCOME" },
] as const;

export const heroContent = {
  eyebrow: "100 MINUTE AI MEDIA LITERACY EXPERIENCE",
  headline: ["상상한 장면이", "진짜 영상이 되는 시간"],
  sub: [
    "AI와 함께 만드는 나만의 숏폼.",
    "보고, 생각하고, 표현하고, 직접 만들어봅니다.",
  ],
  primaryCta: { href: "#program", label: "100분 프로그램 살펴보기" },
  secondaryCta: { href: "#lab", label: "AI 제작 과정 보기" },
  phoneCaption: {
    title: "MY FIRST AI SHORT",
    desc: "우주복을 입은 토끼가 손을 흔드는 모습",
  },
  promptFloat: "우주복을 입은 토끼가\n학교 운동장에서…",
} as const;

export const infoCards = [
  {
    label: "TARGET",
    value: "초등학교\n4–6학년",
    unit: null,
    desc: "호기심이 가장 크게 자라는 시기",
    tone: "default",
  },
  {
    label: "TIME",
    value: "100",
    unit: "MIN",
    desc: "집중해서 완성하는 체험형 특강",
    tone: "blue",
  },
  {
    label: "TYPE",
    value: "임직원 자녀\n참여 캠프",
    unit: null,
    desc: "함께 배우고 함께 만드는 시간",
    tone: "default",
  },
  {
    label: "RESULT",
    value: "AI IMAGE\n+ AI SHORT",
    unit: null,
    desc: "학생별 개별 결과물",
    tone: "dark",
  },
] as const;

export const mediaQuestions = [
  "왜 어떤 영상은\n끝까지 보게 될까요?",
  "왜 첫 장면이\n중요할까요?",
  "짧은 영상은 어떻게\n이야기를 전달할까요?",
] as const;

export const formatSpec = {
  ratio: "9:16",
  platforms: ["YouTube Shorts", "Instagram Reels", "TikTok"],
  quote: "“짧기 때문에\n더 치밀하게 만들어야 합니다.”",
  body: "첫 장면, 화면 비율, 메시지의 위치까지.\n학생들은 실제 사례 속에서 전달의 원리를 발견합니다.",
} as const;

export const goodShortQuestions = [
  { tag: "01 / HOOK", title: "첫 장면에서\n시선을 끌 수 있을까?", symbol: "↗", tone: "default" },
  { tag: "02 / MESSAGE", title: "무엇을 보여주려는지\n쉽게 알 수 있을까?", symbol: "✦", tone: "purple" },
  { tag: "03 / STORY", title: "짧은 시간 안에\n이야기가 전달될까?", symbol: "◒", tone: "yellow" },
] as const;

export const labSteps = [
  {
    step: "STEP 01",
    label: "상상하기",
    title: "어떤 장면을 만들고 싶나요?",
    prompt: "누가 + 어디에서 + 무엇을 + 어떻게",
    image: "/images/shortform/image-cta.png",
  },
  {
    step: "STEP 02",
    label: "이미지 프롬프트 만들기",
    title: "상상을 AI가 이해할 수 있게 표현해요",
    prompt: "우주복을 입은 토끼가 학교 운동장에서 친구들에게 손을 흔드는 모습",
    image: "/images/shortform/image-cta.png",
  },
  {
    step: "STEP 03",
    label: "내 생각이 이미지가 됩니다",
    title: "내 생각이 이미지가 됩니다",
    prompt: "AI가 프롬프트를 바탕으로 여러 장면을 만들어요. 내가 원하는 결과를 직접 선택합니다.",
    image: "/images/shortform/image-cta.png",
  },
  {
    step: "STEP 04",
    label: "사진 속 세상을 움직이기",
    title: "사진 속 세상을 움직여볼까요?",
    prompt: "토끼가 친구들에게 손을 흔들며 천천히 앞으로 걸어온다.",
    image: "/images/shortform/video-cta.png",
  },
] as const;

export const createFlow = [
  { step: "01", label: "상상", done: false },
  { step: "02", label: "프롬프트", done: false },
  { step: "03", label: "AI", done: false },
  { step: "04", label: "나만의 영상", done: true },
] as const;

export const resultCards = [
  {
    meta: "MY IMAGE",
    number: "01",
    image: "/images/shortform/image-cta.png",
    title: "내 프롬프트로 만든",
    highlight: "AI IMAGE",
  },
  {
    meta: "MY VIDEO",
    number: "02",
    image: "/images/shortform/video-cta.png",
    title: "이미지를 움직여 만든",
    highlight: "AI SHORT-FORM",
  },
] as const;

export const timeline = [
  { tag: "01 / OPENING", label: "수업 소개 · 오늘의 미션 확인" },
  { tag: "02 / WATCH", label: "숏폼 사례 분석" },
  { tag: "03 / DISCOVER", label: "좋은 숏폼의 특징" },
  { tag: "04 / QUIZ", label: "Kahoot 숏폼 퀴즈 챌린지" },
  { tag: "05 / CREATE", label: "프롬프트 작성 · AI 이미지 생성" },
  { tag: "06 / SHOW & SHARE", label: "완성 작품 감상 · 결과물 확인" },
] as const;

export const learningOutcomes = [
  { tag: "01", title: "SEE", desc: "미디어를 바라보는 힘" },
  { tag: "02", title: "THINK", desc: "생각하고 질문하는 힘" },
  { tag: "03", title: "PROMPT", desc: "생각을 표현하는 힘" },
  { tag: "04", title: "CREATE", desc: "AI와 협업하는 창작의 힘" },
] as const;

export const finalSection = {
  eyebrow: "TODAY'S MISSION COMPLETE",
  headline: ["100분 후,", "나는 AI 숏폼 크리에이터!"],
  flow: ["SEE", "THINK", "PROMPT", "CREATE"],
  copy: [
    "AI는 대신 생각해주는 도구가 아니라",
    "내 생각을 표현하도록 도와주는 도구입니다.",
  ],
  cta: { href: "mailto:hello@shortformclass.kr", label: "프로그램 문의하기" },
} as const;

// 향후 확장 모듈 자리 표시 (기능 미구현, 디렉터리 관례만 기록)
// generate: src/components/shortform-landing/generate — 이미지 생성형 AI 연동
// video: src/components/shortform-landing/video — 영상 생성형 AI 연동
// gallery: src/components/shortform-landing/gallery — 학생 결과물 갤러리
export const futureModules = ["generate", "video", "gallery"] as const;
