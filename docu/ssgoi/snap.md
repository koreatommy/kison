# snap 전환

> 빠른 슬라이드 + 페이드 (~250ms). 가벼운 “바뀜” 피드백이 필요할 때 사용합니다.

- **공식 원문:** [ssgoi.dev/llms/snap.txt](https://ssgoi.dev/llms/snap.txt)

## 동작

- **OUT:** 페이드 아웃 + 같은 방향으로 약간(기본 8px) 슬라이드. 완료 후 IN 시작.
- **IN:** 반대 방향에서 페이드 인 + 슬라이드.

짧고 단정하며, 바운스가 거의 없습니다.

## API

```ts
import { snap } from "@ssgoi/react/view-transitions";

snap({
  direction?: "left" | "right", // 기본 "left"
  translateOffset?: number,   // 슬라이드 픽셀 (기본 8)
  physics?: PhysicsOptions,     // 기본: { spring: { stiffness: 400, damping: 30 } }
});
```

## 페어링 패턴

```ts
const config = {
  transitions: [
    { from: "/feed", to: "/explore", transition: snap({ direction: "left" }), symmetric: true },
  ],
};
```

## 언제 쓸지

- “뭔가 바뀌었다”는 신호만 주고 싶을 때 (긴 drill/slide는 과함).
- 짧은 연속 네비게이션 체인에서 긴 전환이 느리게 느껴질 때.
- 방향 슬라이드 없이 스케일+페이드만 원하면 `swap`을 검토하세요.
