# instagram 전환

> `pinterest`와 유사하지만 **IN 페이지만** 애니메이션. 갤러리 항목이 많을 때 성능에 유리합니다.

- **공식 원문:** [ssgoi.dev/llms/instagram.txt](https://ssgoi.dev/llms/instagram.txt)

## 동작

- **IN:** 탭한 카드 위치에서 상세가 뷰포트를 채우도록 확대.
- **OUT:** 갤러리는 애니메이션 없이 언마운트만 (`pinterest` 대비 성능 트레이드오프).

## API

```ts
import { instagram } from "@ssgoi/react/view-transitions";

instagram({
  physics?: PhysicsOptions,
});
```

## 필수: data 속성

```tsx
// 갤러리 페이지
{items.map((item) => (
  <Link key={item.id} href={`/posts/${item.id}`}>
    <div data-instagram-gallery-key={item.id}>
      <img src={item.thumbnail} alt="" />
    </div>
  </Link>
))}

// 상세 페이지 (/posts/[id])
<div data-instagram-detail-key={id}>
  <img src={fullImage} alt="" />
</div>
```

`data-instagram-gallery-key`와 `data-instagram-detail-key` 값이 같아야 합니다.

## 페어링 패턴

```ts
const config = {
  transitions: [
    { from: "/posts", to: "/posts/*", transition: instagram(), symmetric: true },
  ],
};
```

## instagram vs pinterest

| | instagram | pinterest |
|---|-----------|-----------|
| 갤러리 뒤로가기 | 스냅 (애니 없음) | 카드로 축소 |
| 적합 | 항목 수십 개 이상 | 양방향 확대/축소 UX 중요 |

양방향 확대·축소가 필요하면 `pinterest`를 사용하세요.
