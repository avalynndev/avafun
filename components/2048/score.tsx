"use client";

import { useContext } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameContext } from "@/components/2048/game-context";

export default function Score() {
  const { score } = useContext(GameContext);

  return (
    <Card className="w-full max-w-xs bg-secondary text-secondary-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg font-bold uppercase">
          Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-4xl font-bold tabular-nums">{score}</p>
      </CardContent>
    </Card>
  );
}
