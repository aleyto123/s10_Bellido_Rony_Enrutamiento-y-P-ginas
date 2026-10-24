import type { Metadata } from "next";
import Link from "next/link";
import { IoCompassOutline, IoGameController, IoHomeOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "404 - Página no encontrada | Pokédex",
  description: "La página que buscas no existe. Vuelve a explorar la Pokédex.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-black to-purple-900 px-4 py-12">
      <section
        aria-labelledby="not-found-title"
        className="w-full max-w-lg rounded-3xl border border-purple-200/20 bg-white p-8 text-center text-gray-700 shadow-2xl sm:p-12"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-700">
          <IoCompassOutline size={48} aria-hidden="true" />
        </div>
        <p className="text-7xl font-black tracking-tight text-purple-700">404</p>
        <p className="mb-3 mt-4 text-sm font-bold tracking-widest text-purple-700">
          POKÉDEX NEXT.JS
        </p>
        <h1 id="not-found-title" className="text-3xl font-bold text-gray-900">
          ¡Esta página se ha escapado!
        </h1>
        <p className="mt-4 leading-relaxed text-gray-600">
          No encontramos la página que buscas. Puede que la dirección sea
          incorrecta o que la página ya no exista. ¡Vuelve a explorar el mundo Pokémon!
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/pokemon"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white transition hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
          >
            <IoGameController size={20} aria-hidden="true" />
            Volver a la Pokédex
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
          >
            <IoHomeOutline size={20} aria-hidden="true" />
            Ir al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
