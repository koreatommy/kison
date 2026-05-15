# sheet 전환

> 바텀 시트 스타일. FAB → 작성, “새 항목”처럼 **임시·모달형** 화면에 적합합니다.

- **공식 원문:** [ssgoi.dev/llms/sheet.txt](https://ssgoi.dev/llms/sheet.txt)

## 동작

- **`enter`:** 시트가 아래에서 올라옴. 배경 페이지는 1 → 0.8 스케일 다운 + 페이드로 뒤로 밀린 느낌.
- **`exit`:** 시트가 아래로 내려감. 배경은 0.8 → 1로 복귀하며 페이드 인.

## API

```ts
import { sheet } from "@ssgoi/react/view-transitions";

sheet({
  direction: "enter" | "exit",
  physics?: PhysicsOptions, // enter 기본: { inertia: { acceleration: 20, resistance: 1.5 } }
});
```

## 페어링 패턴

```ts
const config = {
  transitions: [
    { from: "*", to: "/compose", transition: sheet({ direction: "enter" }) },
    { from: "/compose", to: "*", transition: sheet({ direction: "exit" }) },
  ],
};
```
