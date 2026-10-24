import type { Metadata } from "next";
import CharacterCatalog from "@/components/character-catalog";

export const metadata: Metadata = { title: "Personajes | The Multiverse", description: "Explora los personajes de Rick and Morty y sus universos." };
export const revalidate = 864000;

export default function CharactersPage() {
  return <CharacterCatalog />;
}
