"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PortalJump({ ids }: { ids: number[] }) {
  const [jumping, setJumping] = useState(false);
  const router = useRouter();
  function jump() {
    if (jumping || !ids.length) return;
    setJumping(true);
    const id = ids[Math.floor(Math.random() * ids.length)];
    router.push(`/characters/${id}`);
  }
  return <button type="button" onClick={jump} disabled={jumping} className="lab-button lab-button-dark"><span aria-hidden="true">✳</span> {jumping ? "Abriendo coordenadas…" : "Llévame a otra dimensión"}<span aria-hidden="true">↗</span></button>;
}
