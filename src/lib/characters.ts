import "server-only";
import { cache } from "react";
import { notFound } from "next/navigation";
import type { Character, CharacterResponse } from "@/types/character";

const API = "https://rickandmortyapi.com/api/character";
export const TEN_DAYS = 864000;

async function fetchCharacterData(url: string): Promise<Response> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, { cache: "force-cache", next: { revalidate: TEN_DAYS } });
    if (response.ok || response.status === 404) return response;
    if (response.status !== 429 && response.status < 500) return response;
    if (attempt === 3) return response;
    await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
  }
  throw new Error("El servicio de personajes no responde.");
}

export async function getCharacterPage(page = 1): Promise<CharacterResponse> {
  const response = await fetchCharacterData(`${API}?page=${page}`);
  if (!response.ok) throw new Error("No se pudo cargar el catálogo de personajes.");
  return response.json();
}

export const getAllCharacters = cache(async (): Promise<Character[]> => {
  const first = await getCharacterPage();
  const characters = [...first.results];
  // Consultar todas las páginas con concurrencia limitada.
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
  // Compartir la consulta cacheada entre veinte fichas, sin consultar una URL por ficha.
  const start = Math.floor((numericId - 1) / 20) * 20 + 1;
  const ids = Array.from({ length: 20 }, (_, index) => start + index).join(",");
  const response = await fetchCharacterData(`${API}/${ids}`);
  if (response.status === 404) notFound();
  if (!response.ok) throw new Error("No se pudo cargar el personaje.");
  const characters: Character[] = await response.json();
  const character = characters.find((item) => item.id === numericId);
  if (!character) notFound();
  return character;
});




