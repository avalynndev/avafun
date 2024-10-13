"use client";

import { useContext } from "react";

import { GameContext } from "@/components/2048/game-context";

export default function Score() {
  const { score } = useContext(GameContext);

  return (
    <div className="flex flex-col items-center rounded-md bg-secondary px-3 py-1 text-secondary-foreground">
      <span className="text-xs font-semibold uppercase">Score</span>
      <span className="text-2xl font-bold tabular-nums">{score}</span>
    </div>
  );
}
