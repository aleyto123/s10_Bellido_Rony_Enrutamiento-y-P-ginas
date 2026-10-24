import type { ReactNode } from "react";
import type { Metadata } from "next";
import { IoGameController } from "react-icons/io5";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pokédex - Next.js",
  description: "Explora el mundo Pokémon",
};

interface PokemonLayoutProps {
  children: ReactNode;
}

export default function PokemonLayout({ children }: PokemonLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-black to-purple-900">
      <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link
            href="/pokemon"
            className="text-2xl font-bold text-white transition hover:text-purple-500"
          >
            <IoGameController size={30} className="inline-block" aria-hidden="true" />{" "}
            Pokédex Next.js
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
