# pinterest 전환

> 갤러리 카드가 상세 화면으로 **확대**되는 전환. Pinterest·사진 갤러리·이미지 그리드에 적합합니다.

- **공식 원문:** [ssgoi.dev/llms/pinterest.txt](https://ssgoi.dev/llms/pinterest.txt)

## 동작

탭한 카드가 그리드 위치에서 뷰포트를 채우도록 커지고, 나머지 갤러리는 페이드 아웃됩니다. 뒤로 갈 때는 상세가 다시 카드 위치로 **축소**됩니다.

`hero`보다 무겁습니다. 카드 컨테이너 전체가 움직입니다.

## API

```ts
import { pinterest } from "@ssgoi/react/view-transitions";

pinterest({
  physics?: PhysicsOptions,
});
```

## 필수: data 속성

```tsx
// 갤러리 페이지
{items.map((item) => (
  <Link key={item.id} href={`/photos/${item.id}`}>
    <div data-pinterest-gallery-key={item.id}>
      <img src={item.thumbnail} alt="" />
    </div>
  </Link>
))}

// 상세 페이지 (/photos/[id])
<div data-pinterest-detail-key={id}>
  <img src={fullImage} alt="" />
</div>
```

`data-pinterest-gallery-key`(출발)와 `data-pinterest-detail-key`(도착) 값이 같아야 합니다.

## 페어링 패턴

```ts
const config = {
  transitions: [
    { from: "/photos", to: "/photos/*", transition: pinterest(), symmetric: true },
  ],
};
```

## pinterest vs instagram

- **pinterest:** 뒤로 갈 때 갤러리까지 부드럽게 축소·복귀가 필요할 때.
- **instagram:** 항목이 많고 성능을 우선할 때 (갤러리는 뒤로 갈 때 애니메이션 없음).
