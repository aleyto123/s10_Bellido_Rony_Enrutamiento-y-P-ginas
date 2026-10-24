"use client";

import { useEffect } from "react";
import Link from "next/link";
import { IoAlertCircleOutline, IoHomeOutline, IoRefresh } from "react-icons/io5";

interface PokemonErrorProps {
  error: unknown;
  retry: () => void;
}

export default function PokemonError({ error, retry }: PokemonErrorProps) {
  useEffect(() => {
    console.error("Error al cargar la Pokédex:", error);
  }, [error]);

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <section
        role="alert"
        aria-labelledby="pokemon-error-title"
        className="w-full max-w-lg rounded-3xl border border-purple-200/20 bg-white p-8 text-center text-gray-700 shadow-2xl sm:p-12"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-700">
          <IoAlertCircleOutline size={48} aria-hidden="true" />
        </div>
        <p className="mb-3 text-sm font-bold tracking-widest text-purple-700">
          POKÉDEX NEXT.JS
        </p>
        <h1 id="pokemon-error-title" className="text-3xl font-bold text-gray-900">
          ¡Ups! No pudimos cargar los Pokémon
        </h1>
        <p className="mt-4 leading-relaxed text-gray-600">
          Ocurrió un problema al cargar la Pokédex. Comprueba tu conexión a
          internet y vuelve a intentarlo en unos momentos.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white transition hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
          >
            <IoRefresh size={20} aria-hidden="true" />
            Intentar de nuevo
          </button>
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
