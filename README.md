This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## AI 창업 아이템 선정하기

`/dashboard/startup-support` 경로에서 AI 기반 창업 아이템 선정 워크플로우를 사용할 수 있습니다.

### 환경변수 설정

`.env.local` 파일을 만들고 아래 값을 입력합니다.

```env
ANTHROPIC_API_KEY=your_api_key_here
CLAUDE_MODEL=your_claude_model_id_here
```

또는 화면에서 세션 전용 API Key를 직접 입력할 수 있습니다.

`.env.example`를 참고해 `.env.local`을 만들 수 있습니다.

### Vercel 배포 시 필수 설정

`.env.local`은 Git에 포함되지 않습니다. Vercel 프로젝트에 아래 환경변수를 **Production·Preview**에 등록한 뒤 **재배포**해야 AI 기능이 동작합니다.

| 변수 | 설명 |
|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API 키 (서버 전용) |
| `CLAUDE_MODEL` | 사용할 모델 ID (예: `claude-sonnet-4-6`) |

환경변수만 추가해도 기존 배포에 자동 반영되지 않으므로, 등록 후 Redeploy 또는 `vercel deploy --prod`가 필요합니다.

### 사용 방법

1. `npm install`
2. `.env.local` 설정
3. `npm run dev`
4. http://localhost:3000/dashboard/startup-support 접속

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
