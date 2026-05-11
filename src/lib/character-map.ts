// CharacterId → Character 객체를 빠르게 조회하는 유틸
import { characters } from "@/data/characters";
import type { Character, CharacterId } from "@/types/result";

const characterMap = new Map<CharacterId, Character>(
  characters.map((c) => [c.id, c])
);

export function getCharacter(id: CharacterId): Character {
  const character = characterMap.get(id);
  if (!character) throw new Error(`Unknown character id: ${id}`);
  return character;
}
