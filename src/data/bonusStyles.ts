// 노트북LM 슬라이드 스타일 가이드북 (노션 보너스 자료 복제)

export type BonusStyle = {
  id: number;
  title: string;
  prompt: string;
  images: readonly [string, string];
};

export const bonusMeta = {
  brand: "노트북LM 스타일 가이드북",
  title: "[보너스 자료] 노트북LM 슬라이드 스타일 가이드북 (50종)",
  shortTitle: "노트북LM 슬라이드 스타일 가이드북",
  count: 49,
  usage: "마음에 드는 스타일의 프롬프트를 복사해 노트북LM에 붙여넣으세요.",
} as const;

export const bonusStyles: readonly BonusStyle[] = [
  {
    id: 1,
    title: "벤토 그리드 스타일(모던 웹UI)",
    prompt: "Bento grid UI layout, tech minimalist design, clean web interface, soft lighting, modern corporate aesthetic, vector flat style, UI/UX --ar 16:9",
    images: ["/images/bonus/1-a.webp", "/images/bonus/1-b.webp"],
  },
  {
    id: 2,
    title: "비즈니스 미니멀 스타일",
    prompt: "Minimalist timeline infographic, simple flat vector art, clean data visualization, geometric shapes, corporate color palette, white background, highly legible --ar 16:9",
    images: ["/images/bonus/2-a.webp", "/images/bonus/2-b.webp"],
  },
  {
    id: 3,
    title: "칠판 스타일 (교육용 슬라이드)",
    prompt: "Chalkboard sketch, educational diagram, white chalk on dark green board, hand-drawn aesthetic, arrows and mind maps, friendly and approachable tone",
    images: ["/images/bonus/3-a.webp", "/images/bonus/3-b.webp"],
  },
  {
    id: 4,
    title: "일본 종이 만화책 스타일",
    prompt: "Manga instructional comic panel, clean line art, monochrome with screentones, informative speech bubbles, office worker character, tutorial style, expressive",
    images: ["/images/bonus/4-a.webp", "/images/bonus/4-b.webp"],
  },
  {
    id: 5,
    title: "뉴 모피즘 스타일 (모던 웹사이트)",
    prompt: "Neumorphic tech schematic, soft UI, drop shadows, subtle gradients, clean tech blueprint, modern app interface, minimalist 3D layout",
    images: ["/images/bonus/5-a.webp", "/images/bonus/5-b.webp"],
  },
  {
    id: 6,
    title: "바우하우스(현대 건축, 현대 미술) 스타일",
    prompt: "Bauhaus aesthetic, geometric abstraction, primary colors (red, blue, yellow), strict grid, modern minimalist poster, clean typography layout",
    images: ["/images/bonus/6-a.webp", "/images/bonus/6-b.webp"],
  },
  {
    id: 7,
    title: "네온/사이버 펑크 스타일",
    prompt: "Neon noir technological scene, cyberpunk aesthetic, dark background with glowing neon accents, glowing data streams, highly detailed, futuristic",
    images: ["/images/bonus/7-a.webp", "/images/bonus/7-b.webp"],
  },
  {
    id: 8,
    title: "도스 스타일(터미널, 녹색 텍스트)",
    prompt: "Retro CRT monitor screen, Matrix green text on black background, glowing phosphor, terminal code, vintage hacker aesthetic, scanlines",
    images: ["/images/bonus/8-a.webp", "/images/bonus/8-b.webp"],
  },
  {
    id: 9,
    title: "복셀(3차원 픽셀) 아트 스타일",
    prompt: "Isometric voxel art, gamified office environment, highly detailed blocks, bright lighting, colorful pixel 3D, cute architectural diagram --ar 16:9",
    images: ["/images/bonus/9-a.webp", "/images/bonus/9-b.webp"],
  },
  {
    id: 10,
    title: "클레이 애니메이션 스타일",
    prompt: "Claymation style, tactile 3D illustration, cute office worker figurine, soft smooth lighting, playful stop-motion aesthetic, vibrant pastel colors",
    images: ["/images/bonus/10-a.webp", "/images/bonus/10-b.webp"],
  },
  {
    id: 11,
    title: "식물학/과학 일러스트 스타일",
    prompt: "Botanical scientific illustration, vintage field guide style, delicate line work, watercolor shading, highly detailed and precise",
    images: ["/images/bonus/11-a.webp", "/images/bonus/11-b.webp"],
  },
  {
    id: 12,
    title: "카와이 스타일 / 파스텔 톤",
    prompt: "Kawaii illustration, girly pastel colors, soft and fluffy aesthetic, cute minimalist characters, warm lighting, dreamlike",
    images: ["/images/bonus/12-a.webp", "/images/bonus/12-b.webp"],
  },
  {
    id: 13,
    title: "레트로 팝 스타일",
    prompt: "Retro pop art, playful aesthetic, 1980s Memphis design, bold outlines, vibrant flat colors, dynamic composition, energetic",
    images: ["/images/bonus/13-a.webp", "/images/bonus/13-b.webp"],
  },
  {
    id: 14,
    title: "빈티지/액션 코믹스 스타일",
    prompt: "Vintage action comic panel, 1960s comic book style, halftone dot textures, dramatic angles, bold typography, retro coloring",
    images: ["/images/bonus/14-a.webp", "/images/bonus/14-b.webp"],
  },
  {
    id: 15,
    title: "레트로 코믹 액션 블루프린트",
    prompt: "Retro-comic action blueprint, technical schematic drawing mixed with vintage comic art, blue and white colors, dynamic mechanical details",
    images: ["/images/bonus/15-a.webp", "/images/bonus/15-b.webp"],
  },
  {
    id: 16,
    title: "역동적(하이 옥탄) 스타일 애니메이션",
    prompt: "High-octane anime style, intense dynamic action, speed lines, high energy, dramatic lighting, vivid colors, epic perspective",
    images: ["/images/bonus/16-a.webp", "/images/bonus/16-b.webp"],
  },
  {
    id: 17,
    title: "로코코(프랑스, 낭만적) 스타일",
    prompt: "Elegant Rococo style, romantic ornate aesthetic, soft pastel oil painting, intricate gold floral details, vintage luxury",
    images: ["/images/bonus/17-a.webp", "/images/bonus/17-b.webp"],
  },
  {
    id: 18,
    title: "플랫 코퍼레이트 일러스트",
    prompt: "Corporate flat illustration, Alegria style, modern tech startup blog art, simplified vector characters working in office, minimal background, bright professional colors --ar 16:9",
    images: ["/images/bonus/18-a.webp", "/images/bonus/18-b.webp"],
  },
  {
    id: 19,
    title: "글래스 모피즘 3D (투명) 스타일",
    prompt: "3D glassmorphism icons, frosted glass UI elements, modern tech aesthetic, soft studio lighting, clean white background, high-end corporate presentation style",
    images: ["/images/bonus/19-a.webp", "/images/bonus/19-b.webp"],
  },
  {
    id: 20,
    title: "페이퍼 컷아웃 아트 스타일",
    prompt: "Layered paper cutout art, conceptual office desk, soft shadows, pastel colored paper, clean and minimal storytelling, tactile texture --ar 16:9",
    images: ["/images/bonus/20-a.webp", "/images/bonus/20-b.webp"],
  },
  {
    id: 21,
    title: "플랫 벡터 모션그래픽 스타일",
    prompt: "Flat vector illustration, science channel aesthetic, vibrant deep space colors, clean minimalist background, educational infographic, highly detailed yet simplified --ar 16:9",
    images: ["/images/bonus/21-a.webp", "/images/bonus/21-b.webp"],
  },
  {
    id: 22,
    title: "시네마틱 우주 SF 다큐멘터리 스타일",
    prompt: "Cinematic 3D render of a space station orbiting a gas giant, hard sci-fi aesthetic, hyper-realistic, dramatic lighting, volumetric scattering, 8k resolution, space documentary style --ar 16:9",
    images: ["/images/bonus/22-a.webp", "/images/bonus/22-b.webp"],
  },
  {
    id: 23,
    title: "뉴스레터 에디토리얼",
    prompt: "Magazine editorial layout, modern business newsletter, elegant serif typography, two-column grid, muted earth tone palette, professional photography style --ar 16:9",
    images: ["/images/bonus/23-a.webp", "/images/bonus/23-b.webp"],
  },
  {
    id: 24,
    title: "스케치노트 스타일",
    prompt: "Sketchnote visual summary, hand-drawn icons and typography, black ink with color highlights, clean white background, educational mind map, conference note style --ar 16:9",
    images: ["/images/bonus/24-a.webp", "/images/bonus/24-b.webp"],
  },
  {
    id: 25,
    title: "그라디언트 모던 커버",
    prompt: "Abstract gradient background, modern corporate cover design, smooth color transitions, geometric light effects, premium minimalist aesthetic, clean title space --ar 16:9",
    images: ["/images/bonus/25-a.webp", "/images/bonus/25-b.webp"],
  },
  {
    id: 26,
    title: "도트 픽셀 아트 2D",
    prompt: "16-bit retro pixel art, 2D side-scrolling game scene, office worker character, bright saturated colors, nostalgic game UI elements, clean pixel grid --ar 16:9",
    images: ["/images/bonus/26-a.webp", "/images/bonus/26-b.webp"],
  },
  {
    id: 27,
    title: "SaaS 대시보드 인포그래픽",
    prompt: "SaaS dashboard infographic, clean enterprise UI, cards and charts, modern workplace software aesthetic, white and blue corporate palette, minimal interface, high clarity, presentation-ready, vector UI illustration --ar 16:9",
    images: ["/images/bonus/27-a.webp", "/images/bonus/27-b.webp"],
  },
  {
    id: 28,
    title: "Before / After 비교 카드형",
    prompt: "Before and after comparison card layout, split screen infographic, clean corporate design, organized workflow transformation, minimal icons, white background, highly legible, business presentation style --ar 16:9",
    images: ["/images/bonus/28-a.webp", "/images/bonus/28-b.webp"],
  },
  {
    id: 29,
    title: "화이트보드 전략 회의형 스타일",
    prompt: "Whiteboard strategy meeting illustration, office team planning around a board, sticky notes and diagrams, modern business environment, clean semi-flat illustration, collaborative and intelligent tone --ar 16:9",
    images: ["/images/bonus/29-a.webp", "/images/bonus/29-b.webp"],
  },
  {
    id: 30,
    title: "카드 뉴스형 정보 요약",
    prompt: "Card news style explainer, modular information blocks, bold headings, clean Korean social media editorial aesthetic, minimal icons, bright background, business-friendly visual summary --ar 16:9",
    images: ["/images/bonus/30-a.webp", "/images/bonus/30-b.webp"],
  },
  {
    id: 31,
    title: "서류 / 리서치 데스크 스타일",
    prompt: "Research desk visualization, laptop with multiple documents and notes, clean analytical workspace, modern office desk, papers, charts and highlights, soft daylight, realistic editorial illustration --ar 16:9",
    images: ["/images/bonus/31-a.webp", "/images/bonus/31-b.webp"],
  },
  {
    id: 32,
    title: "데이터 스토리텔링/광고 포스터",
    prompt: "Data storytelling poster, one key metric highlighted, clean chart-driven composition, modern corporate poster design, bold typography, minimal geometric elements, presentation-friendly --ar 16:9",
    images: ["/images/bonus/32-a.webp", "/images/bonus/32-b.webp"],
  },
  {
    id: 33,
    title: "프리미엄 컨설팅 슬라이드 스타일",
    prompt: "Consulting deck visual, premium business slide aesthetic, clean layouts, subtle corporate color palette, sharp icons, minimal data elements, strategy presentation style, polished and executive-friendly --ar 16:9",
    images: ["/images/bonus/33-a.webp", "/images/bonus/33-b.webp"],
  },
  {
    id: 34,
    title: "협업툴 메시지형 비주얼",
    prompt: "Collaboration app scene, modern team messaging and document sharing interface, office productivity software aesthetic, clean floating windows, minimal UI, bright professional environment --ar 16:9",
    images: ["/images/bonus/34-a.webp", "/images/bonus/34-b.webp"],
  },
  {
    id: 35,
    title: "포스트잇 문제 해결 맵",
    prompt: "Sticky note problem solving map, colorful structured note clusters, clean workshop board, office ideation process, modern facilitation aesthetic, highly legible, visual thinking style --ar 16:9",
    images: ["/images/bonus/35-a.webp", "/images/bonus/35-b.webp"],
  },
  {
    id: 36,
    title: "미니멀 라인 아트 다이어그램",
    prompt: "Minimalist line art diagram, simple continuous black lines on off-white background, step-by-step process, clean UI/UX elements, highly legible, professional and elegant",
    images: ["/images/bonus/36-a.webp", "/images/bonus/36-b.webp"],
  },
  {
    id: 37,
    title: "프리미엄 스톡 사진",
    prompt: "Candid photography of a diverse corporate team reviewing a document together in a bright modern boardroom, authentic expression, shot on 35mm lens, shallow depth of field, soft natural lighting --ar 16:9",
    images: ["/images/bonus/37-a.webp", "/images/bonus/37-b.webp"],
  },
  {
    id: 38,
    title: "핸드드로잉 노트북 필기",
    prompt: "Hand-drawn notebook journal page, lined paper texture, ballpoint pen sketches and handwritten notes, casual margin doodles, highlighted key points, warm personal study aesthetic, authentic and relatable --ar 16:9",
    images: ["/images/bonus/38-a.webp", "/images/bonus/38-b.webp"],
  },
  {
    id: 39,
    title: "아이소메트릭 플랫 인포그래픽",
    prompt: "Isometric flat vector infographic, clean technical illustration, modern office workflow, soft gradient colors, organized layered structure, white background, professional and highly legible --ar 16:9",
    images: ["/images/bonus/39-a.webp", "/images/bonus/39-b.webp"],
  },
  {
    id: 40,
    title: "듀오톤 그래픽 스타일",
    prompt: "Duotone graphic design, two-tone color overlay on photography, bold modern contrast, Spotify cover art aesthetic, striking visual impact, clean composition, contemporary editorial style --ar 16:9",
    images: ["/images/bonus/40-a.webp", "/images/bonus/40-b.webp"],
  },
  {
    id: 41,
    title: "스텝 바이 스텝 매뉴얼",
    prompt: "Step-by-step instruction manual, IKEA assembly guide aesthetic, numbered sequential diagrams, simple line icons with color highlights, clean white background, universal pictogram style, highly functional and legible --ar 16:9",
    images: ["/images/bonus/41-a.webp", "/images/bonus/41-b.webp"],
  },
  {
    id: 42,
    title: "3D 아이소메트릭 비즈니스 스타일",
    prompt: "3D isometric illustration, modern corporate workflow, clean office environment, soft clay render style, pastel and white color palette, highly detailed, soft studio lighting, tech business concept --ar 16:9",
    images: ["/images/bonus/42-a.webp", "/images/bonus/42-b.webp"],
  },
  {
    id: 43,
    title: "모던 다크 모드 디자인",
    prompt: "Sleek dark mode UI presentation background, subtle glowing gradients, deep black and dark gray palette, modern minimalist tech aesthetic, elegant and premium corporate style, clean negative space --ar 16:9",
    images: ["/images/bonus/43-a.webp", "/images/bonus/43-b.webp"],
  },
  {
    id: 44,
    title: "디지털 마인드맵 / 노드 스타일",
    prompt: "Abstract digital node network, glowing connecting lines and dots, clean data visualization concept, mind map aesthetic, modern deep tech background, soft glowing lights --ar 16:9",
    images: ["/images/bonus/44-a.webp", "/images/bonus/44-b.webp"],
  },
  {
    id: 45,
    title: "볼드 타이포그래피",
    prompt: "Bold typography poster design, Swiss style layout, massive clean sans-serif text layout, high contrast minimal colors, modern graphic design aesthetic, strong visual impact --ar 16:9",
    images: ["/images/bonus/45-a.webp", "/images/bonus/45-b.webp"],
  },
  {
    id: 46,
    title: "폴라로이드 무드보드",
    prompt: "Polaroid scrapbook layout on a wooden desk, aesthetic moodboard, sticky notes, scattered paper clips, candid team moments, warm soft lighting, nostalgic yet professional editorial style --ar 16:9",
    images: ["/images/bonus/46-a.webp", "/images/bonus/46-b.webp"],
  },
  {
    id: 47,
    title: "디지털 태블릿 다이어리",
    prompt: "Digital planner interface, iPad GoodNotes aesthetic, pastel highlighters, digital handwriting, habit tracker layout, cozy personal productivity workspace, clean minimal design --ar 16:9",
    images: ["/images/bonus/47-a.webp", "/images/bonus/47-b.webp"],
  },
  {
    id: 48,
    title: "스위스 그리드 인포디자인",
    prompt: "Swiss grid editorial design, ultra-clean modular layout, structured typography, asymmetric grid, modernist corporate poster, restrained color palette, highly legible, presentation-ready --ar 16:9",
    images: ["/images/bonus/48-a.webp", "/images/bonus/48-b.webp"],
  },
  {
    id: 49,
    title: "포털형 카드 매거진",
    prompt: "Portal-style card magazine layout, clean Korean editorial web design, modular content cards, bold headlines, soft neutral palette, user-friendly information hierarchy, modern media aesthetic --ar 16:9",
    images: ["/images/bonus/49-a.webp", "/images/bonus/49-b.webp"],
  },
] as const;
