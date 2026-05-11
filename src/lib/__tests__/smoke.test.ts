// 프로젝트 Vitest 러너 정상 동작 확인용 smoke 테스트
import { describe, it, expect } from "vitest";

describe("smoke", () => {
  it("vitest runner works", () => {
    expect(1 + 1).toBe(2);
  });
});
