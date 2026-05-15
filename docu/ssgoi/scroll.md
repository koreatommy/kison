# scroll 전환

> 세로 스크롤 느낌. 온보딩 단계, 연속된 폼/페이지처럼 **순서가 있는** 화면 이동에 적합합니다.

- **공식 원문:** [ssgoi.dev/llms/scroll.txt](https://ssgoi.dev/llms/scroll.txt)
- **KISON:** `/profile` ↔ `/survey`

## 동작

- **`direction: "up"`:** 새 페이지가 아래에서 위로 슬라이드 인, 이전 페이지는 위로 밀려 나감.
- **`direction: "down"`:** 새 페이지가 위에서 아래로, 이전 페이지는 아래로 밀려 나감.

세로로 한 장씩 넘기는 느낌입니다.

## API

```ts
import { scroll } from "@ssgoi/react/view-transitions";

scroll({
  direction: "up" | "down",
  physics?: PhysicsOptions, // 기본: { spring: { stiffness: 5, damping: 4 } }
});
```

## 페어링 패턴

```ts
const config = {
  transitions: [
    { from: "/", to: "/about", transition: scroll({ direction: "up" }) },
    { from: "/about", to: "/", transition: scroll({ direction: "down" }) },
  ],
};
```

## KISON 예시

설문 플로우 1단계(프로필) → 2단계(설문)에 맞춰 적용:

```ts
{ from: "/profile", to: "/survey", transition: scroll({ direction: "up" }) },
{ from: "/survey", to: "/profile", transition: scroll({ direction: "down" }) },
```
