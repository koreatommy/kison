# drill 전환

> iOS 스타일 계층 네비게이션. 목록 → 상세, 부모 → 자식처럼 **더 깊이 들어가는** 느낌일 때 사용합니다.

- **공식 원문:** [ssgoi.dev/llms/drill.txt](https://ssgoi.dev/llms/drill.txt)
- **KISON:** `*` ↔ `/profile` (인트로·기타 → 프로필 진입/복귀)

## 동작

- **`enter`:** 새 페이지가 오른쪽(100% → 0)에서 슬라이드 인. 이전 페이지는 왼쪽으로 약간(-20%) 이동해 아래에 남아 있는 느낌.
- **`exit`:** 현재 페이지가 오른쪽으로 슬라이드 아웃되며 이전 페이지가 드러남.

## API

```ts
import { drill } from "@ssgoi/react/view-transitions";

drill({
  direction: "enter" | "exit",
  opacity?: boolean,        // 슬라이드와 함께 페이드
  physics?: PhysicsOptions, // 기본: { spring: { stiffness: 170, damping: 22 } }
});
```

## 페어링 패턴

```ts
const config = {
  transitions: [
    { from: "*", to: "/post/*", transition: drill({ direction: "enter" }) },
    { from: "/post/*", to: "*", transition: drill({ direction: "exit" }) },
  ],
};
```

`symmetric: true`로 역방향 자동 생성:

```ts
{ from: "*", to: "/post/*", transition: drill({ direction: "enter" }), symmetric: true }
```

## KISON 예시

```ts
{ from: "*", to: "/profile", transition: drill({ direction: "enter" }) },
{ from: "/profile", to: "*", transition: drill({ direction: "exit" }) },
```
