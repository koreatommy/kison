# swap 전환

> 형제 페이지 간 교체. 하단 탭처럼 **방향 관계가 없는** 동급 화면 전환에 적합합니다.

- **공식 원문:** [ssgoi.dev/llms/swap.txt](https://ssgoi.dev/llms/swap.txt)

## 동작

- **OUT:** 페이드 아웃만 (이동 없음).
- **IN:** 0.95 → 1 스케일 업 + 페이드 인. OUT이 끝난 뒤 IN이 시작해 두 단계가 겹치지 않음.

slide보다 차분하고, fade보다 확실한 “바뀜” 피드백을 줍니다.

## API

```ts
import { swap } from "@ssgoi/react/view-transitions";

swap({
  scaleOffset?: number,     // 스케일 시작 오프셋 (기본 0.05 → 0.95에서 시작)
  physics?: PhysicsOptions, // 기본: { spring: { stiffness: 600, damping: 40 } }
});
```

## 사용 예

방향이 없으므로 `symmetric: true`와 함께 쓰는 경우가 많습니다.

```ts
const config = {
  transitions: [
    { from: "/home", to: "/search", transition: swap(), symmetric: true },
    { from: "/home", to: "/profile", transition: swap(), symmetric: true },
  ],
};
```
