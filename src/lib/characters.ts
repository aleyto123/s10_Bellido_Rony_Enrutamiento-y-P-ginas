import "server-only";
import { cache } from "react";
import { notFound } from "next/navigation";
import snapshot from "@/data/characters.json";
import type { Character, CharacterResponse } from "@/types/character";

const API = "https://rickandmortyapi.com/api/character";
const savedCharacters = snapshot as Character[];
export const TEN_DAYS = 864000;

async function fetchCharacterData(url: string): Promise<Response | null> {
  // El build usa los datos oficiales incluidos para no depender de limites externos.
  if (process.env.NEXT_PHASE === "phase-production-build") return null;
  try {
    const response = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: TEN_DAYS },
      signal: AbortSignal.timeout(8000),
    });
    return response.ok || response.status === 404 ? response : null;
  } catch {
    return null;
  }
}

function savedPage(page: number): CharacterResponse {
  const pages = Math.ceil(savedCharacters.length / 20);
  return {
    info: {
      count: savedCharacters.length,
      pages,
      next: page < pages ? `${API}?page=${page + 1}` : null,
      prev: page > 1 ? `${API}?page=${page - 1}` : null,
    },
    results: savedCharacters.slice((page - 1) * 20, page * 20),
  };
}

export async function getCharacterPage(page = 1): Promise<CharacterResponse> {
  const response = await fetchCharacterData(`${API}?page=${page}`);
  if (!response) return savedPage(page);
  if (response.status === 404) return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  return response.json();
}

export const getAllCharacters = cache(async (): Promise<Character[]> => {
  if (process.env.NEXT_PHASE === "phase-production-build") return savedCharacters;
  const first = await getCharacterPage();
  const characters = [...first.results];
  for (let page = 2; page <= first.info.pages; page += 4) {
    const pages = await Promise.all(
      Array.from({ length: Math.min(4, first.info.pages - page + 1) }, (_, index) => getCharacterPage(page + index)),
    );
    characters.push(...pages.flatMap((result) => result.results));
  }
  return characters;
});

export const getCharacter = cache(async (id: string): Promise<Character> => {
  if (!/^[1-9]\d*$/.test(id)) notFound();
  const numericId = Number(id);
  if (!Number.isSafeInteger(numericId)) notFound();
  const start = Math.floor((numericId - 1) / 20) * 20 + 1;
  const ids = Array.from({ length: 20 }, (_, index) => start + index).join(",");
  const response = await fetchCharacterData(`${API}/${ids}`);
  if (response?.status === 404) notFound();
  const characters: Character[] = response ? await response.json() : savedCharacters;
  const character = characters.find((item) => item.id === numericId);
  if (!character) {
    if (!response && process.env.NEXT_PHASE !== "phase-production-build") {
      throw new Error("El servicio no está disponible para consultar este personaje. Intenta nuevamente.");
    }
    notFound();
  }
  return character;
});
