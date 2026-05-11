// 팀 구성 알고리즘 단위 테스트
import { describe, it, expect } from "vitest";
import { buildTeams } from "@/lib/team-builder";
import type { TeamCandidate, CharacterId } from "@/types/result";

function makeCandidate(
  id: string,
  primary: CharacterId,
  secondary: CharacterId = "captain_lumi",
  schoolLevel: "elementary" | "middle" | "high" = "middle",
  grade = "2학년"
): TeamCandidate {
  return {
    id,
    name: `학생${id}`,
    grade,
    schoolLevel,
    primaryCharacter: primary,
    secondaryCharacter: secondary,
    scores: { leadership: 40, planning: 40, making: 40, expression: 40, operation: 40 },
  };
}

describe("buildTeams", () => {
  it("4명이면 1팀으로 구성한다", () => {
    const candidates = [
      makeCandidate("1", "captain_lumi"),
      makeCandidate("2", "planner_dodo"),
      makeCandidate("3", "maker_theo"),
      makeCandidate("4", "story_moa"),
    ];
    const teams = buildTeams(candidates);
    expect(teams).toHaveLength(1);
    expect(teams[0].members).toHaveLength(4);
  });

  it("8명이면 4+4 두 팀으로 구성한다", () => {
    const candidates = Array.from({ length: 8 }, (_, i) =>
      makeCandidate(String(i), ["captain_lumi", "planner_dodo", "maker_theo", "story_moa", "check_nuri"][i % 5] as CharacterId)
    );
    const teams = buildTeams(candidates);
    expect(teams).toHaveLength(2);
    teams.forEach((t) => expect(t.members).toHaveLength(4));
  });

  it("7명이면 4+3 두 팀으로 구성한다", () => {
    const candidates = Array.from({ length: 7 }, (_, i) =>
      makeCandidate(String(i), ["captain_lumi", "planner_dodo", "maker_theo", "story_moa", "check_nuri"][i % 5] as CharacterId)
    );
    const teams = buildTeams(candidates);
    expect(teams).toHaveLength(2);
    const sizes = teams.map((t) => t.members.length).sort();
    expect(sizes).toEqual([3, 4]);
  });

  it("팀 간 인원 격차는 최대 2 이내이다", () => {
    const candidates = Array.from({ length: 13 }, (_, i) =>
      makeCandidate(String(i), "captain_lumi")
    );
    const teams = buildTeams(candidates);
    const sizes = teams.map((t) => t.members.length);
    const diff = Math.max(...sizes) - Math.min(...sizes);
    expect(diff).toBeLessThanOrEqual(2);
  });

  it("모든 학생이 반드시 한 팀에 배정된다", () => {
    const candidates = Array.from({ length: 11 }, (_, i) =>
      makeCandidate(String(i), ["captain_lumi", "planner_dodo", "maker_theo", "story_moa", "check_nuri"][i % 5] as CharacterId)
    );
    const teams = buildTeams(candidates);
    const assignedIds = teams.flatMap((t) => t.members.map((m) => m.id));
    expect(assignedIds.sort()).toEqual(candidates.map((c) => c.id).sort());
  });

  it("같은 캐릭터만 있어도 팀이 정상 구성된다", () => {
    const candidates = Array.from({ length: 8 }, (_, i) =>
      makeCandidate(String(i), "captain_lumi")
    );
    const teams = buildTeams(candidates);
    expect(teams).toHaveLength(2);
    const total = teams.reduce((sum, t) => sum + t.members.length, 0);
    expect(total).toBe(8);
  });

  it("3명 미만이면 1팀으로 구성한다", () => {
    const candidates = [
      makeCandidate("1", "captain_lumi"),
      makeCandidate("2", "planner_dodo"),
    ];
    const teams = buildTeams(candidates);
    expect(teams).toHaveLength(1);
    expect(teams[0].members).toHaveLength(2);
  });
});
