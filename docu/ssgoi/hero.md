# hero 전환

> 공유 요소 전환. 썸네일·아바타처럼 **양쪽 페이지에 같은 객체**가 있을 때 크기·위치를 보간합니다.

- **공식 원문:** [ssgoi.dev/llms/hero.txt](https://ssgoi.dev/llms/hero.txt)

## 동작

`data-hero-key`가 같은 요소가 출발 페이지 위치/크기에서 도착 페이지 요소로 트윈됩니다. 나머지 영역은 크로스페이드됩니다.

## API

```ts
import { hero } from "@ssgoi/react/view-transitions";

hero({
  maxDistance?: number,     // 요소 간 거리가 멀면 스킵 (기본 700px)
  physics?: PhysicsOptions, // 기본: { spring: { stiffness: 300, damping: 30 } }
});
```

## 필수: data 속성

양쪽 페이지에 **동일한** `data-hero-key` 값이 필요합니다.

```tsx
// 목록 페이지
{items.map((item) => (
  <Link key={item.id} href={`/items/${item.id}`}>
    <img data-hero-key={`item-${item.id}`} src={item.thumbnail} alt="" />
  </Link>
))}

// 상세 페이지 (/items/[id])
<img data-hero-key={`item-${id}`} src={fullImage} alt="" />
```

키는 인덱스가 아니라 **안정적인 id**를 사용하세요.

## 페어링 패턴

```ts
const config = {
  transitions: [
    { from: "/items", to: "/items/*", transition: hero(), symmetric: true },
  ],
};
```

## 참고

- 키가 맞지 않으면 해당 요소 전환 없이 우아하게 폴백됩니다.
- 갤러리 항목이 매우 많으면 `instagram` 전환을 검토하세요.
