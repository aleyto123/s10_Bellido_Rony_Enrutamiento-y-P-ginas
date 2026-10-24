import Link from "next/link";
export default function CharacterShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="multiverse min-h-screen">
      <div className="lab-status"><span className="lab-led" /> SEÑAL ESTABLE <span className="hidden sm:inline">/ NO TOQUES NADA, MORTY.</span><span className="ml-auto">TIERRA C-137 ↗</span></div>
      <header className="lab-header"><nav aria-label="Navegación principal" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5">
        <Link href="/" className="lab-brand"><span className="lab-brand-mark" aria-hidden="true">✳</span><span>RICK&apos;S<span className="lab-brand-small">MULTIVERSE DATABASE</span></span><span className="lab-version">V.137</span></Link>
        <div className="lab-nav"><Link href="/characters">01 / Archivo</Link><Link href="/characters/search">02 / Escáner</Link><Link href="/pokemon">03 / Pokédex ↗</Link></div>
      </nav></header>
      {children}
      <footer className="lab-footer"><div><strong>CIENCIA. CAOS. REPETIR.</strong><p>Un archivo para un universo que no tiene mucho sentido.</p></div><a href="https://rickandmortyapi.com/documentation/#character">The Rick and Morty API ↗</a><span className="lab-stamp">C-137<br />APROBADO*</span></footer>
    </div>
  );
}
