// 팀 구성 알고리즘 — 학생을 3~5명 팀으로 균등 배분
import type { Team, TeamCandidate, CharacterId } from "@/types/result";

const ALL_CHARACTERS: CharacterId[] = [
  "captain_lumi",
  "planner_dodo",
  "maker_theo",
  "story_moa",
  "check_nuri",
];

function computeTeamSizes(total: number): number[] {
  if (total <= 5) return [total];

  const numTeamsOf4 = Math.floor(total / 4);
  const remainder = total - numTeamsOf4 * 4;

  if (remainder === 0) return Array(numTeamsOf4).fill(4);
  if (remainder === 1) {
    return [...Array(numTeamsOf4 - 1).fill(4), 5];
  }
  if (remainder === 2) {
    return [...Array(numTeamsOf4 - 1).fill(4), 3, 3];
  }
  return [...Array(numTeamsOf4).fill(4), 3];
}

export function buildTeams(candidates: TeamCandidate[]): Team[] {
  if (candidates.length === 0) return [];

  const sizes = computeTeamSizes(candidates.length);
  const numTeams = sizes.length;

  const teams: TeamCandidate[][] = Array.from({ length: numTeams }, () => []);

  const sorted = [...candidates].sort((a, b) => {
    const aIdx = ALL_CHARACTERS.indexOf(a.primaryCharacter);
    const bIdx = ALL_CHARACTERS.indexOf(b.primaryCharacter);
    return aIdx - bIdx;
  });

  const characterGroups = new Map<CharacterId, TeamCandidate[]>();
  for (const c of sorted) {
    const group = characterGroups.get(c.primaryCharacter) ?? [];
    group.push(c);
    characterGroups.set(c.primaryCharacter, group);
  }

  for (const charId of ALL_CHARACTERS) {
    const group = characterGroups.get(charId) ?? [];
    for (const candidate of group) {
      let bestTeamIdx = 0;
      let bestScore = -Infinity;

      for (let i = 0; i < numTeams; i++) {
        if (teams[i].length >= sizes[i]) continue;

        const hasChar = teams[i].some(
          (m) => m.primaryCharacter === candidate.primaryCharacter
        );
        const diversityBonus = hasChar ? 0 : 10;
        const sizeScore = sizes[i] - teams[i].length;
        const score = diversityBonus + sizeScore;

        if (score > bestScore) {
          bestScore = score;
          bestTeamIdx = i;
        }
      }

      teams[bestTeamIdx].push(candidate);
    }
  }

  return teams.map((members, i) => ({
    id: `team-${i + 1}`,
    members,
  }));
}

export function getTeamRoleDistribution(
  team: TeamCandidate[]
): Record<CharacterId, number> {
  const dist: Record<string, number> = {};
  for (const c of ALL_CHARACTERS) dist[c] = 0;
  for (const m of team) dist[m.primaryCharacter]++;
  return dist as Record<CharacterId, number>;
}
