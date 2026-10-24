"use client";
import { useEffect } from "react";
import Link from "next/link";
export default function CharacterError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="mx-auto max-w-2xl px-6 py-24 text-center"><p className="text-sm tracking-widest text-lime-300">SEÑAL INTERRUMPIDA</p><h1 className="mt-4 text-4xl font-bold">No pudimos abrir este portal.</h1><p className="mt-5 text-slate-400">El servicio de personajes no está disponible en este momento. Intenta nuevamente.</p><button onClick={() => retry()} className="mt-8 cursor-pointer rounded-full bg-lime-300 px-6 py-3 font-bold text-slate-950">Reintentar</button><Link className="ml-5 text-lime-300 underline" href="/">Ir al inicio</Link></main>;
}
