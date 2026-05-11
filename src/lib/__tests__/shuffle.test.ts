// 셔플 유틸 단위 테스트
import { describe, it, expect } from "vitest";
import { shuffleArray } from "@/lib/shuffle";

describe("shuffleArray", () => {
  it("길이가 보존된다", () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled).toHaveLength(5);
  });

  it("원소가 보존된다", () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it("원본 배열을 변경하지 않는다", () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    shuffleArray(arr);
    expect(arr).toEqual(original);
  });

  it("빈 배열을 처리한다", () => {
    expect(shuffleArray([])).toEqual([]);
  });

  it("단일 원소 배열을 처리한다", () => {
    expect(shuffleArray([42])).toEqual([42]);
  });
});
