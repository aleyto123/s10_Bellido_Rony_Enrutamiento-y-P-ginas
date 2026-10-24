import Link from "next/link";
import { getCharacterPage } from "@/lib/characters";
import { CharacterGrid } from "@/components/character-card";

export default async function CharacterCatalog() {
  const data = await getCharacterPage();
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 md:py-20">
      <section className="relative mb-14 overflow-hidden rounded-3xl border border-lime-300/20 bg-linear-to-br from-emerald-950 via-slate-900 to-slate-950 p-8 md:p-14">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-96 w-96 rounded-full border-[35px] border-lime-300/10 shadow-[0_0_90px_#a3e63522]" />
        <p className="relative mb-5 text-xs font-bold tracking-[0.3em] text-lime-300">UN ARCHIVO. INFINITAS DIMENSIONES.</p>
        <h1 className="relative max-w-2xl text-5xl font-black leading-tight tracking-tight md:text-7xl">Conoce el otro<br /><span className="text-lime-300">lado del portal.</span></h1>
        <p className="relative mt-6 max-w-xl text-lg leading-relaxed text-slate-300">Ricks, Mortys y todo lo que existe entre universos. Explora sus historias, orígenes y apariciones.</p>
        <Link href="/characters/search" className="relative mt-8 inline-flex rounded-full bg-lime-300 px-6 py-3 font-bold text-slate-950 transition hover:bg-lime-200">Buscar en el multiverso ↗</Link>
        <div className="relative mt-10 flex gap-10 border-t border-white/10 pt-6"><div><strong className="text-3xl text-white">{data.info.count}</strong><p className="mt-1 text-xs uppercase tracking-widest text-slate-400">Personajes</p></div><div><strong className="text-3xl text-white">{data.info.pages}</strong><p className="mt-1 text-xs uppercase tracking-widest text-slate-400">Páginas para explorar</p></div></div>
      </section>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs tracking-widest text-lime-300">EL ARCHIVO</p><h2 className="text-3xl font-bold">Personajes destacados</h2></div><span className="text-sm text-slate-400">Mostrando {data.results.length} de {data.info.count}</span></div>
      <CharacterGrid characters={data.results} />
      <div className="mt-10 text-center"><Link href="/characters/search" className="inline-block rounded-full border border-lime-300/40 px-6 py-3 font-semibold text-lime-300 hover:bg-lime-300/10">Explorar todos los personajes →</Link></div>
    </main>
  );
}
