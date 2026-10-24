import type { Metadata } from "next";
import CharacterSearch from "@/components/character-search";
import { getCharacterPage } from "@/lib/characters";

export const metadata: Metadata = { title: "Buscar personajes | The Multiverse", description: "Busca por nombre, estado, tipo y género en tiempo real." };
export default async function SearchPage() {
  const data = await getCharacterPage();
  return <CharacterSearch initialData={data} />;
}
