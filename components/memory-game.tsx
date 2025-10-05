"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useCoins } from "@/components/coin-context";

const generateDeck = () => {
  const memoryCards = [
    "dwarf",
    "orc-connector",
    "elf",
    "orcish-ai-nextjs-framework",
    "orcishcity",
    "orcishlogo",
    "orcishmage",
    "textualgames",
  ];

  const deck = [...memoryCards, ...memoryCards];
  return deck.sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [reward, setReward] = useState<number | null>(null);

  const { addCoins } = useCoins();

  useEffect(() => {
    const storedBest = localStorage.getItem("memory-best-score");
    if (storedBest) setBestScore(parseInt(storedBest, 10));
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      setTimeout(() => {
        if (cards[first] === cards[second]) {
          setSolved((prev) => [...prev, ...flipped]);
        }
        setFlipped([]);
        setMoves((prev) => prev + 1);
      }, 900);
    }
  }, [cards, flipped]);

  const handleClick = (index: number) => {
    if (
      !flipped.includes(index) &&
      flipped.length < 2 &&
      !solved.includes(index)
    ) {
      setFlipped((prev) => [...prev, index]);
    }
  };

  const resetGame = () => {
    setTimeout(() => {
      setCards(generateDeck());
    }, 200);
    setSolved([]);
    setFlipped([]);
    setMoves(0);
    setReward(null);
  };

  const gameOver = solved.length === cards.length;

  useEffect(() => {
    if (gameOver && reward === null) {
      if (bestScore === null || moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem("memory-best-score", moves.toString());
      }

      const earned = Math.max(1, 30 - moves);
      addCoins(earned);
      setReward(earned);
    }
  }, [gameOver, moves, bestScore, reward]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-6 text-sm sm:text-base mb-4">
        <p className="font-medium">
          Flips: <span className="font-bold">{moves}</span>
        </p>
        <p className="font-medium">
          Best:{" "}
          <span className="font-bold">
            {bestScore !== null ? bestScore : "-"}
          </span>
        </p>
      </div>

      {gameOver && (
        <div className="text-green-500 font-semibold mb-4">
          🎉 You Won in {moves} flips!{" "}
          <span className="font-bold">+{reward}</span> coins!
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || solved.includes(index);

          return (
            <div
              key={index}
              className="group relative h-24 w-24 sm:h-32 sm:w-32 [perspective:1000px]"
              onClick={() => handleClick(index)}
            >
              <div
                className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] 
                  ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
              >
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-muted text-3xl font-bold text-muted-foreground [backface-visibility:hidden]">
                  ?
                </div>

                <div className="absolute inset-0 flex items-center justify-center rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="relative h-20 w-20 sm:h-28 sm:w-28">
                    <Image
                      src={`/memory-cards/${card}.webp`}
                      alt="Memory Card"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={resetGame}
        className="mt-6 w-full sm:w-40 flex items-center gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Restart
      </Button>
    </div>
  );
}
