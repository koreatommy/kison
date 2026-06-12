// public 폴더 이미지를 교체해도 Next.js 이미지 캐시 없이 바로 반영
import Image, { type ImageProps } from "next/image";

export default function PortfolioImage(props: ImageProps) {
  return <Image {...props} unoptimized />;
}
