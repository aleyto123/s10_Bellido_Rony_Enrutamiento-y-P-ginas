import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types/character";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <Link prefetch={false} href={`/characters/${character.id}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition hover:-translate-y-1 hover:border-lime-300/60 focus-visible:outline-2 focus-visible:outline-lime-300">
      <div className="relative aspect-square overflow-hidden bg-slate-800">
        <Image src={character.image} alt={character.name} width={300} height={300} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-bold text-lime-300">#{String(character.id).padStart(3, "0")}</span>
      </div>
      <div className="p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-lime-300">{character.status === "Alive" ? "● Vivo" : character.status === "Dead" ? "● Muerto" : "○ Estado desconocido"} · {character.species}</p>
        <h2 className="text-xl font-bold text-white">{character.name}</h2>
        <p className="mt-3 truncate text-sm text-slate-400">{character.location.name}</p>
        <p className="mt-4 text-sm font-semibold text-lime-300">Explorar personaje ↗</p>
      </div>
    </Link>
  );
}

export function CharacterGrid({ characters }: { characters: Character[] }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{characters.map((character) => <CharacterCard key={character.id} character={character} />)}</div>;
}
