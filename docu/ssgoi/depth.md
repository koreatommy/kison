# depth 전환

> Material Design Z축 전환. 설정 → 하위 설정처럼 **같은 표면 안에서 앞뒤로** 들어가는 느낌에 적합합니다.

- **공식 원문:** [ssgoi.dev/llms/depth.txt](https://ssgoi.dev/llms/depth.txt)

## 동작

- **`enter`:** 새 페이지가 약간 커지며(+스케일) 페이드 인, 이전 페이지는 작아지며 페이드 아웃.
- **`exit`:** 새 페이지는 작아지며 페이드 인, 이전 페이지는 커지며 페이드 아웃.

가로 이동이 아니라 깊이(Z축) 이동으로 읽힙니다.

## API

```ts
import { depth } from "@ssgoi/react/view-transitions";

depth({
  direction: "enter" | "exit",
  scaleOffset?: number,     // 스케일 변화량 (기본 0.05 = 5%)
  physics?: PhysicsOptions, // 기본: { spring: { stiffness: 280, damping: 30 } }
});
```

## 페어링 패턴

```ts
const config = {
  transitions: [
    { from: "/settings", to: "/settings/*", transition: depth({ direction: "enter" }) },
    { from: "/settings/*", to: "/settings", transition: depth({ direction: "exit" }) },
  ],
};
```
