import Link from "next/link";

export default function CharacterShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-lime-300 selection:text-slate-950">
      <header className="border-b border-white/10 bg-slate-950/95">
        <nav aria-label="Navegación principal" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="text-lg font-black tracking-tight"><span className="mr-2 text-lime-300">◉</span> THE MULTIVERSE<span className="ml-2 text-xs text-slate-500">/ ARCHIVE</span></Link>
          <div className="flex gap-5 text-sm font-medium text-slate-300"><Link className="hover:text-lime-300" href="/characters">Personajes</Link><Link className="hover:text-lime-300" href="/characters/search">Buscar</Link><Link className="hover:text-lime-300" href="/pokemon">Pokédex</Link></div>
        </nav>
      </header>
      {children}
      <footer className="mx-auto mt-16 flex max-w-7xl flex-wrap justify-between gap-3 border-t border-white/10 px-6 py-8 text-xs text-slate-500"><span>RICK AND MORTY / EXPLORADOR DE PERSONAJES</span><a href="https://rickandmortyapi.com/documentation/#character" className="hover:text-lime-300">Datos: The Rick and Morty API ↗</a></footer>
    </div>
  );
}
