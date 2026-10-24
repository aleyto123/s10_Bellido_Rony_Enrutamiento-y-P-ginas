export default function Loading() {
  return <main role="status" className="mx-auto w-full max-w-7xl px-6 py-16"><p className="mb-8 text-lime-300">Abriendo portal…</p><div className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <div key={index} className="h-96 rounded-2xl bg-slate-800" />)}</div></main>;
}
