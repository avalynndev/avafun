"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCoins } from "./coin-context";
import { motion, AnimatePresence } from "motion/react";

type Drop = {
  id: number;
  coins: number;
  x: number;
  y: number;
};

type Collected = {
  id: number;
  coins: number;
  x: number;
  y: number;
};

export function CoinDrop() {
  const { addCoins } = useCoins();
  const [drops, setDrops] = useState<Drop[]>([]);
  const [collected, setCollected] = useState<Collected[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.5) {
        setIdCounter((prev) => prev + 1);

        let coins = Math.floor(Math.random() * 50) + 1;
        if (Math.random() < 0.001) coins = 1011;

        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);

        const newDrop: Drop = { id: idCounter, coins, x, y };

        setDrops((prev) => [...prev, newDrop]);

        setTimeout(() => {
          setDrops((prev) => prev.filter((d) => d.id !== newDrop.id));
        }, 4000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [idCounter]);

  const handleCollect = (drop: Drop) => {
    addCoins(drop.coins);
    setDrops((prev) => prev.filter((d) => d.id !== drop.id));
    setCollected((prev) => [...prev, drop]);
    setTimeout(() => {
      setCollected((prev) => prev.filter((c) => c.id !== drop.id));
    }, 800);
  };

  return (
    <>
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="fixed z-50"
          style={{ top: drop.y, left: drop.x }}
        >
          <Button
            variant="ghost"
            size="icon"
            className={
              drop.coins === 1011
                ? "bg-yellow-500 text-white animate-bounce"
                : ""
            }
            onClick={() => handleCollect(drop)}
          >
            🪙
          </Button>
        </div>
      ))}

      <AnimatePresence>
        {collected.map((drop) => (
          <motion.div
            key={`collected-${drop.id}`}
            initial={{ opacity: 0, y: 0, scale: 0.9 }}
            animate={{ opacity: 1, y: -40, scale: 1.2 }}
            exit={{ opacity: 0, y: -60, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="fixed z-50 text-yellow-500 font-bold text-xs drop-shadow-lg pointer-events-none"
            style={{
              top: drop.y,
              left: drop.x + 40,
            }}
          >
            +{drop.coins}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
