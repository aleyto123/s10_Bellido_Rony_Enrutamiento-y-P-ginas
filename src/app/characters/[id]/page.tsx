import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllCharacters, getCharacter } from "@/lib/characters";

type Props = { params: Promise<{ id: string }> };
export const revalidate = 864000;

export async function generateStaticParams() {
  const characters = await getAllCharacters();
  return characters.map((character) => ({ id: String(character.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);
  return { title: `${character.name} | The Multiverse`, description: `${character.name}: ${character.species}, ${character.status}. Origen: ${character.origin.name}.`, openGraph: { images: [character.image] } };
}

export default async function CharacterDetail({ params }: Props) {
  const { id } = await params;
  const character = await getCharacter(id);
  const fields = [
    ["Identificador", String(character.id)], ["Estado", character.status],
    ["Especie", character.species], ["Tipo / subespecie", character.type || "No especificado"],
    ["Género", character.gender], ["Fecha de creación en la API", new Date(character.created).toLocaleString("es-PE", { timeZone: "UTC" }) + " UTC"],
  ];
  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <Link href="/characters" className="text-sm font-semibold text-lime-300 hover:underline">← Volver a los personajes</Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[360px_1fr]">
        <aside><div className="overflow-hidden rounded-3xl border border-lime-300/25 bg-slate-900"><Image src={character.image} alt={character.name} width={600} height={600} loading="lazy" sizes="(max-width: 1024px) 100vw, 360px" className="aspect-square w-full object-cover" /><div className="p-6"><p className="text-xs font-bold tracking-[0.25em] text-lime-300">ARCHIVO #{String(character.id).padStart(3, "0")}</p><p className="mt-3 text-slate-400">{character.episode.length} apariciones registradas</p></div></div></aside>
        <article>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">IDENTIDAD INTERDIMENSIONAL</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">{character.name}</h1>
          <p className="mt-4 text-xl text-slate-400">{character.species} <span className="mx-2 text-slate-700">/</span> {character.status}</p>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">{fields.map(([label, value]) => <div key={label} className="bg-slate-900 p-5"><dt className="text-xs uppercase tracking-widest text-slate-400">{label}</dt><dd className="mt-2 break-words text-base font-semibold">{value}</dd></div>)}</dl>
          <section className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Ubicaciones">{[["Origen", character.origin], ["Última ubicación", character.location]].map(([label, place]) => {
            const location = place as { name: string; url: string };
            return <div key={String(label)} className="rounded-2xl border border-white/10 bg-slate-900 p-5"><h2 className="text-xs uppercase tracking-widest text-lime-300">{String(label)}</h2><p className="mt-3 text-lg font-bold">{location.name}</p>{location.url ? <a href={location.url} target="_blank" rel="noreferrer" className="mt-3 block break-all text-xs text-slate-400 underline hover:text-lime-300">{location.url}</a> : <p className="mt-3 text-xs text-slate-500">Sin URL disponible</p>}</div>;
          })}</section>
          <section className="mt-8 rounded-2xl border border-white/10 p-6"><h2 className="text-xl font-bold">Episodios <span className="text-lime-300">/{character.episode.length}</span></h2><ul className="mt-5 flex flex-wrap gap-2">{character.episode.map((episode) => <li key={episode}><a href={episode} target="_blank" rel="noreferrer" title={episode} className="block rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-lime-300 hover:text-slate-950">Episodio {episode.split("/").pop()} ↗</a></li>)}</ul></section>
          <details className="mt-8 rounded-2xl border border-white/10 p-6"><summary className="cursor-pointer font-bold">Datos originales del registro</summary><dl className="mt-4 space-y-4 text-sm"><div><dt className="text-slate-400">URL del personaje</dt><dd><a className="break-all text-lime-300 underline" href={character.url} target="_blank" rel="noreferrer">{character.url}</a></dd></div><div><dt className="text-slate-400">URL de la imagen</dt><dd><a className="break-all text-lime-300 underline" href={character.image} target="_blank" rel="noreferrer">{character.image}</a></dd></div><div><dt className="text-slate-400">Creación (ISO)</dt><dd>{character.created}</dd></div></dl></details>
        </article>
      </div>
    </main>
  );
}
