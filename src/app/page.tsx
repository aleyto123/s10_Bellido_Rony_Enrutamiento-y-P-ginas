import { connection } from "next/server";
import CharacterShell from "@/components/character-shell";
import CharacterCatalog from "@/components/character-catalog";

export default async function Home() {
  await connection();
  return <CharacterShell><CharacterCatalog /></CharacterShell>;
}
