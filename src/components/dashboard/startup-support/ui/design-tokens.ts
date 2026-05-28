// 창업 아이템 선정 워크플로우 디자인 토큰 (색상, 타이포, 레이아웃)

export const colors = {
  primary: {
    bg: "bg-amber-400",
    bgLight: "bg-amber-50",
    text: "text-amber-700",
    textDark: "text-amber-900",
    border: "border-amber-300",
    ring: "ring-amber-200",
    gradient: "bg-gradient-to-r from-amber-400 to-yellow-500",
  },
  secondary: {
    bg: "bg-indigo-600",
    bgLight: "bg-indigo-50",
    text: "text-indigo-700",
    textDark: "text-indigo-900",
    border: "border-indigo-200",
    ring: "ring-indigo-200",
    gradient: "bg-gradient-to-r from-indigo-600 to-blue-600",
  },
  accent: {
    bg: "bg-orange-500",
    bgLight: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  surface: {
    page: "bg-zinc-50",
    card: "bg-white",
    cardAlt: "bg-zinc-50",
    divider: "border-zinc-200",
  },
  status: {
    success: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: "text-emerald-500" },
    warning: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "text-amber-500" },
    error: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: "text-red-500" },
    info: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: "text-blue-500" },
  },
} as const;

export const typo = {
  pageTitle: "text-2xl font-extrabold text-zinc-900 sm:text-3xl",
  stepTitle: "text-xl font-bold text-zinc-900 sm:text-2xl",
  stepDesc: "text-sm text-zinc-500 mt-1 leading-relaxed",
  questionTitle: "text-base font-semibold text-zinc-800",
  helpText: "text-xs text-zinc-400 mt-1",
  resultTitle: "text-lg font-bold text-zinc-900",
  body: "text-sm text-zinc-600 leading-relaxed",
  scoreNumber: "text-2xl font-black tabular-nums",
  label: "text-xs font-bold uppercase tracking-wider text-zinc-400",
} as const;

export const layout = {
  inputMaxW: "max-w-[960px]",
  resultMaxW: "max-w-[1200px]",
  cardGap: "gap-4",
  sectionGap: "space-y-6",
} as const;
