import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types/character";

export function CharacterCard({ character }: { character: Character }) {
  const status = character.status === "Alive" ? "Vivo" : character.status === "Dead" ? "Muerto" : "Desconocido";
  return (
    <Link prefetch={false} href={`/characters/${character.id}`} className="lab-card">
      <div className="lab-card-top"><span>SUJETO / {String(character.id).padStart(4, "0")}</span><span aria-hidden="true">↗</span></div>
      <div className="lab-card-image"><Image src={character.image} alt={character.name} width={300} height={300} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" /><span className={`lab-card-status status-${character.status.toLowerCase()}`}><i />{status}</span><span className="lab-card-scan" aria-hidden="true">EXPEDIENTE DETECTADO</span></div>
      <div className="lab-card-copy"><p>{character.species} <span>/ {character.gender}</span></p><h2>{character.name}</h2><div className="lab-card-location"><span aria-hidden="true">⌖</span><span>{character.location.name}</span></div></div>
    </Link>
  );
}
export function CharacterGrid({ characters }: { characters: Character[] }) {
  return <div className="lab-grid">{characters.map((character) => <CharacterCard key={character.id} character={character} />)}</div>;
}
