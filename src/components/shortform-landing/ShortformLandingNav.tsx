// /shortform 랜딩 — 상단 오버레이 내비 (히어로 위에 겹쳐짐)
import { curriculumMeta, navLinks } from "@/data/shortformCurriculum";

export default function ShortformLandingNav() {
  return (
    <header className="nav">
      <a className="brand" href="#top">
        <span className="brand-mark">✦</span> {curriculumMeta.brand}{" "}
        <span className="muted">/ {curriculumMeta.brandSuffix}</span>
      </a>
      <nav>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="#apply">
        참여 문의 <span>↗</span>
      </a>
    </header>
  );
}
