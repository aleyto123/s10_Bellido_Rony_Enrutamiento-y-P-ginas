import Link from "next/link";
export default function CharacterNotFound() {
  return <main className="mx-auto max-w-2xl px-6 py-24 text-center"><p className="text-8xl font-black text-lime-300">404</p><h1 className="mt-5 text-3xl font-bold">Este personaje no existe en el archivo.</h1><p className="mt-4 text-slate-400">Revisa el identificador o busca en otra dimensión.</p><Link href="/characters/search" className="mt-8 inline-block rounded-full bg-lime-300 px-6 py-3 font-bold text-slate-950">Buscar personajes →</Link></main>;
}
