import Link from "next/link";
import { getAllCharacters, getCharacterPage } from "@/lib/characters";
import { CharacterGrid } from "@/components/character-card";
import PortalJump from "@/components/portal-jump";

export default async function CharacterCatalog() {
  const [data, allCharacters] = await Promise.all([getCharacterPage(), getAllCharacters()]);
  return (
    <main className="mx-auto max-w-7xl px-6 pb-10">
      <section className="lab-hero">
        <div className="lab-hero-copy"><p className="lab-eyebrow"><span className="lab-led" /> EL GARAGE ESTÁ ABIERTO</p><h1>El universo<br />es <em>raro.</em><br /><span className="lab-outline">Explóralo.</span></h1><p className="lab-intro">Genios, parásitos y versiones tuyas que tomaron peores decisiones. Bienvenido a mi archivo interdimensional.</p><div className="lab-hero-actions"><Link href="/characters/search" className="lab-button lab-button-purple">Escanear personajes <span aria-hidden="true">↗</span></Link><PortalJump ids={allCharacters.map((character) => character.id)} /></div><p className="lab-annotation">↳ Sin permisos de la Federación. Obviamente.</p></div>
        <div className="lab-portal-scene" aria-hidden="true"><div className="lab-coordinate">COORDENADAS<br /><strong>35.137 / ∞.042</strong></div><div className="lab-orbit orbit-one" /><div className="lab-orbit orbit-two" /><div className="lab-portal"><div className="lab-portal-core"><span>✳</span></div></div><span className="lab-floating-note note-one">REALIDAD<br />CUESTIONABLE</span><span className="lab-floating-note note-two">100% CIENCIA<br />0% GARANTÍAS</span><span className="lab-portal-label">PORTAL ACTIVO <i /> NO METER LAS MANOS</span></div>
      </section>
      <div className="lab-ticker" aria-hidden="true"><span>INFINITAS REALIDADES ✳ CERO EXPLICACIONES ✳ WUBBA LUBBA DUB DUB ✳ INFINITAS REALIDADES ✳ CERO EXPLICACIONES ✳ WUBBA LUBBA DUB DUB ✳</span></div>
      <section className="lab-metrics"><div><strong>{data.info.count}<span>+</span></strong><p>Formas de vida archivadas</p></div><div><strong>{data.info.pages}<span>↗</span></strong><p>Coordenadas por explorar</p></div><div className="lab-metric-note"><span aria-hidden="true">⚠</span><p>No todos son amistosos.<br /><strong>Haz clic bajo tu propio riesgo.</strong></p></div></section>
      <div className="lab-section-heading"><div><p className="lab-eyebrow">01 / SUJETOS DE INTERÉS</p><h2>Caras de otras dimensiones<span>.</span></h2></div><Link href="/characters/search" className="lab-text-link">Ver todo el archivo ↗</Link></div>
      <CharacterGrid characters={data.results} />
      <div className="lab-bottom-callout"><span aria-hidden="true">↳</span><div><h2>¿Buscas a alguien en particular?</h2><p>Mi escáner encuentra hasta al Rick que no querías conocer.</p></div><Link href="/characters/search" className="lab-button lab-button-dark">Abrir escáner ↗</Link></div>
    </main>
  );
}
