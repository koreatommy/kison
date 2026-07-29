// /shortform 랜딩 — 하단 푸터
import { curriculumMeta } from "@/data/shortformCurriculum";

export default function ShortformLandingFooter() {
  return (
    <footer>
      <span>
        {curriculumMeta.brand} {curriculumMeta.brandSuffix}
      </span>
      <span>FOR 4–6 GRADE / {curriculumMeta.duration}</span>
    </footer>
  );
}
