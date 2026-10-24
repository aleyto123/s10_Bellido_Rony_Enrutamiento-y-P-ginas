"use client";

import { useEffect, useState } from "react";
import type { CharacterResponse } from "@/types/character";
import { CharacterGrid } from "@/components/character-card";

type Filters = { name: string; status: string; type: string; gender: string };
const emptyFilters: Filters = { name: "", status: "", type: "", gender: "" };

export default function CharacterSearch({ initialData }: { initialData: CharacterResponse }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const query = new URLSearchParams({ page: String(page) });
        for (const [key, value] of Object.entries(filters)) {
          if (value.trim()) query.set(key, value.trim());
        }
        const response = await fetch(`https://rickandmortyapi.com/api/character/?${query}`, { signal: controller.signal, cache: "no-store" });
        if (response.status === 404) {
          if (!controller.signal.aborted) setData({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
        } else {
          if (!response.ok) throw new Error("No pudimos completar la búsqueda. Intenta de nuevo.");
          const result: CharacterResponse = await response.json();
          if (!controller.signal.aborted) setData(result);
        }
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "No se pudo conectar con el servicio.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 350);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [filters, page, attempt]);

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((previous) => ({ ...previous, [key]: value }));
    setPage(1);
    setLoading(true);
  }

  const control = "mt-2 w-full rounded-xl border border-white/15 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20";
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <p className="mb-3 text-xs font-bold tracking-[0.3em] text-lime-300">LOCALIZADOR INTERDIMENSIONAL</p>
      <h1 className="text-4xl font-black tracking-tight md:text-5xl">Encuentra a tu personaje.</h1>
      <p className="mt-4 text-slate-400">Combina los filtros. Los resultados se actualizan mientras escribes.</p>
      <section aria-label="Filtros de personajes" className="my-8 grid gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-semibold text-slate-300">Nombre<input value={filters.name} onChange={(event) => updateFilter("name", event.target.value)} placeholder="Ej. Rick" className={control} /></label>
        <label className="text-sm font-semibold text-slate-300">Estado<select value={filters.status} onChange={(event) => updateFilter("status", event.target.value)} className={control}><option value="">Todos los estados</option><option value="alive">Vivo</option><option value="dead">Muerto</option><option value="unknown">Desconocido</option></select></label>
        <label className="text-sm font-semibold text-slate-300">Tipo<input value={filters.type} onChange={(event) => updateFilter("type", event.target.value)} placeholder="Ej. Parasite" className={control} /></label>
        <label className="text-sm font-semibold text-slate-300">Género<select value={filters.gender} onChange={(event) => updateFilter("gender", event.target.value)} className={control}><option value="">Todos los géneros</option><option value="female">Femenino</option><option value="male">Masculino</option><option value="genderless">Sin género</option><option value="unknown">Desconocido</option></select></label>
      </section>
      <div className="mb-6 flex flex-wrap justify-between gap-4"><p role="status" aria-live="polite" className="text-sm text-slate-400">{loading ? "Buscando personajes…" : `${data.info.count} personajes encontrados`}</p><button type="button" onClick={() => { setFilters(emptyFilters); setPage(1); setLoading(true); setAttempt((value) => value + 1); }} className="cursor-pointer text-sm font-semibold text-lime-300 hover:underline">Limpiar filtros</button></div>
      {error ? <div role="alert" className="rounded-2xl border border-red-400/30 bg-red-950/30 p-8"><p>{error}</p><button onClick={() => { setLoading(true); setAttempt((value) => value + 1); }} className="mt-4 cursor-pointer font-bold text-lime-300">Reintentar →</button></div> : <div aria-busy={loading} className={loading ? "opacity-50 transition" : "transition"}>{data.results.length ? <CharacterGrid characters={data.results} /> : <div className="rounded-2xl border border-dashed border-white/20 p-16 text-center"><h2 className="text-2xl font-bold">Ningún personaje en esta dimensión</h2><p className="mt-3 text-slate-400">Prueba otro nombre o elimina alguno de los filtros.</p></div>}</div>}
      {!error && data.info.pages > 0 && <nav aria-label="Paginación" className="mt-10 flex items-center justify-center gap-5"><button disabled={page <= 1 || loading} onClick={() => { setPage((value) => value - 1); setLoading(true); }} className="cursor-pointer rounded-full border border-white/20 px-5 py-2 disabled:cursor-not-allowed disabled:opacity-30">← Anterior</button><span className="text-sm text-slate-400">{page} / {data.info.pages}</span><button disabled={!data.info.next || loading} onClick={() => { setPage((value) => value + 1); setLoading(true); }} className="cursor-pointer rounded-full border border-white/20 px-5 py-2 disabled:cursor-not-allowed disabled:opacity-30">Siguiente →</button></nav>}
    </main>
  );
}
