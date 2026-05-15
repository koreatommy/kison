# fade 전환

> 범용 크로스페이드. 관계 없는 페이지 간 이동, 차분한 기본 전환에 적합합니다.

- **공식 원문:** [ssgoi.dev/llms/fade.txt](https://ssgoi.dev/llms/fade.txt)
- **KISON:** `defaultTransition` + `/survey` → `/loading-result`, `/loading-result` → `/result`

## 동작

OUT 페이지는 페이드 아웃, IN 페이지는 페이드 인 — **동시에** opacity만 변화하고 위치 이동은 없습니다.

## API

```ts
import { fade } from "@ssgoi/react/view-transitions";

fade({
  transitionDelay?: number, // IN 시작 전 지연(ms), 기본 0
  physics?: PhysicsOptions, // 기본: { spring: { stiffness: 170, damping: 20, doubleSpring: true } }
});
```

## 사용 예

```ts
const config = {
  defaultTransition: fade(),
};
```

지정되지 않은 모든 라우트 쌍에 `defaultTransition`으로 적용하는 패턴이 일반적입니다.

## KISON 예시

```ts
defaultTransition: fade(),
{ from: "/survey", to: "/loading-result", transition: fade() },
{ from: "/loading-result", to: "/result", transition: fade() },
```
