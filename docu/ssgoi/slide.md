# slide 전환

> 가로 슬라이드. 탭 네비게이션, 스와이프 가능한 섹션, **같은 레벨**의 좌우 이동에 적합합니다.

- **공식 원문:** [ssgoi.dev/llms/slide.txt](https://ssgoi.dev/llms/slide.txt)

## 동작

- **`direction: "left"`:** IN은 오른쪽에서, OUT은 왼쪽으로 — 전체가 왼쪽으로 이동.
- **`direction: "right"`:** IN은 왼쪽에서, OUT은 오른쪽으로.

두 페이지가 동시에 가로 이동하며 탭을 스와이프하는 느낌입니다.

## API

```ts
import { slide } from "@ssgoi/react/view-transitions";

slide({
  direction: "left" | "right",
  physics?: PhysicsOptions, // 기본: { spring: { stiffness: 140, damping: 19, doubleSpring: 0.8 } }
});
```

## 페어링 패턴

```ts
const config = {
  transitions: [
    { from: "/tab1", to: "/tab2", transition: slide({ direction: "left" }) },
    { from: "/tab2", to: "/tab1", transition: slide({ direction: "right" }) },
  ],
};
```

## 레이아웃 주의

애니메이션 중 가로 overflow가 생길 수 있습니다. SSGOI 래퍼에 `overflow-x-clip`을 추가하세요. ([레이아웃 가이드](https://ssgoi.dev/llms.txt))
