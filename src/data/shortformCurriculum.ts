// AI 숏폼 크리에이터 클래스 교안 콘텐츠 (정적 HTML 랜딩 이식용)

export const curriculumMeta = {
  brand: "AI SHORT-FORM",
  brandSuffix: "CREATOR CLASS",
  title: "AI Short-form Creator Class",
  subtitle: "상상한 장면이 진짜 영상이 되는 시간",
  audience: "초등학교 4~6학년",
  duration: "100분",
  format: "임직원 자녀 참여 캠프 · 학교 AI 영상제작 교육",
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
    value: "임직원 자녀 참여 캠프\n학교 AI 영상제작 교육",
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
  duration: "15초",
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
    label: "이미지 프롬프트",
    title: "어떤 장면을 만들고 싶나요?",
    subtitle: "상상한 장면을 AI가 이해할 수 있게 표현해요",
    prompt: "누가 + 어디에서 + 무엇을 + 어떻게",
    placeholder: `9:16 세로형 유튜브 쇼츠 썸네일. 밝은 초등학교 과학실에서 한국 초등학생 남녀 2명이 투명 보안경을 쓰고 화산 폭발 실험을 하는 모습. 중앙의 화산 모형에서 붉은색 거품이 강하게 솟아오르고, 아이들은 눈을 크게 뜨고 입을 벌리며 놀라고 신나하는 표정. 실사 사진처럼 매우 사실적이고 생동감 있게 표현.

상단에 굵고 입체적인 한글:
“집에서 화산 폭발 실험!”

중앙 작은 카피:
“진짜 터진다?!”

하단 핑크색 배너:
“초간단 과학놀이”

노랑·주황·흰색 중심의 강렬한 유튜브 썸네일 디자인, 별·느낌표·물음표 등 재미있는 그래픽 요소 추가. 아이들의 얼굴과 화산을 크게 강조. 밝고 선명한 조명, 자연스러운 피부와 표정, 실제 촬영한 듯한 초고화질 포토리얼 스타일. 한글은 정확하고 선명하게 표현.`,
    tip: "구체적인 장소, 인물, 동작을 포함하면 더 정확한 이미지가 생성됩니다.",
    image: "/images/shortform/image-cta.png",
    video: null,
  },
  {
    step: "STEP 02",
    label: "영상 프롬프트",
    title: "이미지를 어떻게 움직일까요?",
    subtitle: "생성된 이미지에 모션을 더해요",
    prompt: "동작 + 방향 + 속도",
    placeholder: `제공된 이미지를 시작 프레임으로 사용해 8초 길이의 9:16 세로형 유튜브 쇼츠 영상을 제작한다. 두 한국 초등학생의 얼굴, 의상, 보안경, 화산 모형과 배경을 영상 끝까지 동일하게 유지하며 실제 촬영 영상처럼 사실적으로 표현한다.

[0~2초]
아이들이 화산을 바라보며 기대하는 표정을 짓는다. 눈 깜빡임과 손·고개 움직임을 자연스럽게 표현한다. “집에서 화산 폭발 실험!” 한글에 바운스와 확대 애니메이션 효과를 적용한다.

[2~5초]
화산에서 거품이 생기다가 붉은색과 주황색 거품이 강하게 폭발한다. 액체와 거품은 실제 과학실험처럼 자연스럽게 표현한다. 아이들은 놀라 뒤로 물러났다가 신나게 웃으며 화산을 가리킨다. “진짜 터진다?!” 문구가 흔들리며 강조된다.

[5~8초]
화산이 계속 보글거리며 아이들이 카메라를 향해 웃고 엄지척한다. “초간단 과학놀이” 문구가 아래에서 올라오며 바운스 효과로 등장하고 마지막 장면을 잠시 유지한다.

스타일: 초실사 라이브액션, 밝고 생동감 있는 과학실, 자연스러운 표정과 신체 움직임, 사실적인 거품과 액체, 부드러운 줌인·줌아웃, 9:16 고화질.

기존 한글과 유튜브 쇼츠 UI는 정확하게 유지하고 글자를 새로 생성하거나 변형하지 않는다.

금지: 얼굴 변형, 인물 변경, 손가락 오류, 한글 깨짐, 의상 변경, CGI·애니메이션 느낌, 과도한 카메라 흔들림, 화면 전환.`,
    tip: "카메라 움직임(줌인, 패닝)이나 캐릭터 동작을 구체적으로 적어보세요.",
    image: "/images/shortform/video-cta.png",
    video: null,
  },
  {
    step: "STEP 03",
    label: "결과 확인",
    title: "나만의 AI 숏폼이 완성되었어요!",
    subtitle: "결과물을 확인하고 저장하세요",
    prompt: null,
    placeholder: null,
    tip: "마음에 들지 않으면 프롬프트를 수정해서 다시 생성할 수 있어요.",
    image: "/images/shortform/video-cta.png",
    video: "/images/shortform/result.mp4",
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

// 핵심 메시지 — 왜 숏폼 제작을 배워야 하는가
export const coreMessage = {
  headline: "영상을 보는 사람에서 만드는 사람으로",
  body: "초등학생에게 숏폼 제작을 가르치는 이유는 '조회수 높은 영상 만들기'가 아닙니다. 미디어를 비판적으로 바라보고, 자신의 생각을 효과적으로 표현하며, AI 도구와 협업하는 경험을 통해 디지털 시대의 창작자로 성장하는 것이 핵심입니다.",
  pillars: [
    "미디어를 분석하고 질문하는 힘",
    "짧은 시간 안에 메시지를 구조화하는 힘",
    "AI에게 정확히 전달하는 프롬프트 작성 능력",
    "상상을 실제 결과물로 만드는 창작 경험",
  ],
} as const;

// 학습 목표 — 수업 후 학생이 할 수 있는 것
export const learningGoals = [
  "숏폼 콘텐츠의 구조(훅-메시지-스토리)를 분석하고 설명할 수 있다.",
  "9:16 세로 화면에서 효과적인 시각 구성 원리를 이해한다.",
  "이미지/영상 생성 AI에 적합한 프롬프트를 작성할 수 있다.",
  "AI 도구를 활용해 나만의 숏폼 콘텐츠 초안을 완성한다.",
] as const;

// 상세 일정표 — 100분 수업 흐름
export const schedule = [
  { time: "0~5분", stage: "도입", content: "오늘의 미션 소개, 결과물 미리보기", mode: "설명" },
  { time: "5~15분", stage: "분석", content: "숏폼 사례 3개 시청, 구조 분석 워크시트", mode: "시청+토론" },
  { time: "15~25분", stage: "발견", content: "좋은 숏폼의 3가지 질문(훅/메시지/스토리)", mode: "미니강의" },
  { time: "25~35분", stage: "퀴즈", content: "Kahoot 숏폼 퀴즈 챌린지", mode: "게임형 학습" },
  { time: "35~55분", stage: "프롬프트", content: "이미지 프롬프트 작성, AI 이미지 생성", mode: "실습" },
  { time: "55~75분", stage: "영상화", content: "영상 프롬프트 작성, AI 영상 생성", mode: "실습" },
  { time: "75~90분", stage: "편집", content: "결과물 확인, 수정, 저장", mode: "개별 실습" },
  { time: "90~100분", stage: "공유", content: "완성 작품 발표, 피드백, 마무리", mode: "발표+정리" },
] as const;

// 운영 팁 — 강사/진행자를 위한 안내
export const operatingTips = [
  {
    title: "프롬프트는 충분한 시간 확보",
    body: "AI 이미지/영상 생성보다 프롬프트 작성에 더 많은 시간을 배정하세요. 생각을 글로 옮기는 과정이 핵심 학습입니다.",
  },
  {
    title: "실패도 학습의 일부",
    body: "첫 결과가 마음에 들지 않으면 프롬프트를 수정해 다시 시도하세요. 반복 과정에서 프롬프트 작성 요령을 체득합니다.",
  },
  {
    title: "비교보다 과정 강조",
    body: "학생 간 결과물 비교보다 '어떤 생각으로 이 프롬프트를 썼는지' 과정 공유에 집중하세요.",
  },
  {
    title: "저작권 안내 필수",
    body: "AI 생성 이미지/영상의 사용 범위와 저작권 개념을 간단히 설명하세요.",
  },
] as const;

// 핵심 가치 — 수업이 지향하는 방향
export const values = [
  "보는 눈을 키운다",
  "생각을 표현한다",
  "AI와 협업한다",
  "직접 만들어본다",
] as const;

// 참고자료 — 추가 학습 및 교안 개발 참고
export const references = [
  "한국언론진흥재단 — 미디어 리터러시 교육자료",
  "교육부 — 디지털 미디어 리터러시 교육과정",
  "YouTube Creators — Shorts 제작 가이드",
  "미디어교육 연구센터 — 초등 미디어 교육 사례집",
] as const;

// 향후 확장 모듈 자리 표시 (기능 미구현, 디렉터리 관례만 기록)
// generate: src/components/shortform-landing/generate — 이미지 생성형 AI 연동
// video: src/components/shortform-landing/video — 영상 생성형 AI 연동
// gallery: src/components/shortform-landing/gallery — 학생 결과물 갤러리
export const futureModules = ["generate", "video", "gallery"] as const;
