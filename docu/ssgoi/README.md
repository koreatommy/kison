# SSGOI 페이지 전환 참고 문서

KISON 프로젝트에서 사용하는 [@ssgoi/react](https://ssgoi.dev/ko) 페이지 전환 라이브러리 정리입니다.

- **공식 설정 가이드:** [ssgoi.dev/llms.txt](https://ssgoi.dev/llms.txt)
- **프로젝트 설정 파일:** `src/lib/ssgoi-config.ts`
- **Provider:** `src/components/layout/SsgoiRoot.tsx`

## 전환 목록

| 전환 | 용도 요약 | KISON 사용 |
|------|-----------|------------|
| [drill](./drill.md) | iOS 스타일 계층 이동 (목록 → 상세) | ✅ 프로필 진입/복귀 |
| [fade](./fade.md) | 부드러운 크로스페이드 (기본값) | ✅ 기본 + 로딩/결과 |
| [scroll](./scroll.md) | 세로 스크롤 느낌 (순차 단계) | ✅ 프로필 ↔ 설문 |
| [slide](./slide.md) | 가로 슬라이드 (탭/스와이프) | — |
| [swap](./swap.md) | 스케일+페이드 (형제 탭) | — |
| [sheet](./sheet.md) | 바텀 시트 (모달형) | — |
| [hero](./hero.md) | 공유 요소 전환 | — |
| [pinterest](./pinterest.md) | 카드 확대 (갤러리 → 상세) | — |
| [instagram](./instagram.md) | 카드 확대 (경량, 갤러리 많을 때) | — |
| [depth](./depth.md) | Z축 깊이 (설정 → 하위) | — |
| [snap](./snap.md) | 빠른 슬라이드+페이드 (~250ms) | — |

## KISON 현재 라우트 전환

```ts
// src/lib/ssgoi-config.ts 요약
transitions: [
  { from: "*", to: "/profile", transition: drill({ direction: "enter" }) },
  { from: "/profile", to: "*", transition: drill({ direction: "exit" }) },
  { from: "/profile", to: "/survey", transition: scroll({ direction: "up" }) },
  { from: "/survey", to: "/profile", transition: scroll({ direction: "down" }) },
  { from: "/survey", to: "/loading-result", transition: fade() },
  { from: "/loading-result", to: "/result", transition: fade() },
],
defaultTransition: fade(),
```

## 공통 설정 체크리스트

레이아웃(`src/app/layout.tsx`)에서 SSGOI 권장 클래스를 적용했는지 확인합니다.

| 클래스 | 이유 |
|--------|------|
| `relative` | OUT 페이지가 `absolute`로 복제될 때 기준점 |
| `z-0` | OUT 페이지가 배경 뒤로 가리지 않도록 스택 컨텍스트 |
| `overflow-y-auto` | 스크롤 위치 보존 대상 |
| `overflow-x-clip` | slide/drill 시 가로 넘침 방지 |

각 페이지는 `<SsgoiTransition id="/경로">`로 감싸고, `id`는 실제 URL 경로와 일치해야 합니다.

## 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| 전환 중 페이지 점프 | `relative` 누락 | SSGOI 래퍼에 `relative` 추가 |
| OUT 페이지가 배경 뒤로 숨음 | `z-0` 누락 | 래퍼에 `z-0` 추가 |
| 가로 스크롤 깜빡임 | `overflow-x-clip` 누락 | slide/drill 사용 시 추가 |
| 전환이 안 됨 | `SsgoiTransition` id 불일치 | id를 실제 경로와 맞춤 |
| hero/pinterest/instagram 미동작 | data 속성 키 불일치 | 양쪽 페이지에서 동일 키 사용 |

원문은 [SSGOI 공식 llms 문서](https://ssgoi.dev/llms.txt)를 기준으로 작성했습니다.
