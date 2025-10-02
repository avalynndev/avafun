"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { geistSans } from "@/lib/fonts";
import { useCoins } from "@/components/coin-context";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function ReactionTimePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [valid, setValid] = useState(false);

  const [gameState, setGameState] = useState<
    "idle" | "waiting" | "ready" | "clicked"
  >("idle");
  const [message, setMessage] = useState("Click to start!");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [lastEarned, setLastEarned] = useState<number | null>(null);

  const { coins, addCoins, loading } = useCoins();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const key = searchParams.get("key");
    const storedKey = sessionStorage.getItem(`reaction-time-session`);

    if (key && storedKey && key === storedKey) {
      setValid(true);
      sessionStorage.removeItem(`reaction-time-session`);
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  if (!valid || loading) return null;

  const startGame = () => {
    setGameState("waiting");
    setMessage("Wait for green...");
    setReactionTime(null);
    setLastEarned(null);

    const delay = Math.floor(Math.random() * 3000) + 2000;
    timeoutRef.current = setTimeout(() => {
      setGameState("ready");
      setMessage("CLICK NOW!");
      startTimeRef.current = Date.now();
    }, delay);
  };

  const calculateCoins = (time: number): number => {
    if (time < 200) return 50;
    if (time < 300) return 30;
    if (time < 400) return 20;
    if (time < 500) return 10;
    return 5;
  };

  const handleClick = () => {
    if (gameState === "idle") {
      startGame();
    } else if (gameState === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setMessage("Too early! Try again.");
      setGameState("idle");
    } else if (gameState === "ready") {
      const endTime = Date.now();
      if (startTimeRef.current) {
        const diff = endTime - startTimeRef.current;
        setReactionTime(diff);
        setMessage(`Your reaction time: ${diff} ms`);

        const earned = calculateCoins(diff);
        addCoins(earned);
        setLastEarned(earned);
      }
      setGameState("clicked");
    } else if (gameState === "clicked") {
      startGame();
    }
  };

  return (
    <motion.main
      className={`${geistSans.className} mx-auto flex max-w-4xl flex-col items-center px-4 pt-10`}
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div className="mb-6" variants={fadeInUp}>
        <Link href="/">
          <Button variant="link">← Back Home</Button>
        </Link>
      </motion.div>
      <motion.main
        className="w-full rounded-t-lg border p-4 py-6 shadow-lg sm:py-12"
        variants={fadeInUp}
      >
        <div className="text-center">
          <motion.h2
            className="text-2xl font-bold sm:text-3xl"
            variants={fadeInUp}
          >
            Reaction Time
          </motion.h2>
          <motion.p className="mt-2 text-sm text-gray-500" variants={fadeInUp}>
            Click as fast as you can when it turns green! The quicker your
            reaction, the more coins you earn (up to 50 coins).
          </motion.p>
        </div>
      </motion.main>

      <motion.main className="w-full sm:py-12" variants={fadeInUp}>
        <div className="flex flex-col items-center text-center">
          <div
            onClick={handleClick}
            className={`flex h-64 w-full cursor-pointer items-center justify-center rounded-lg text-2xl font-bold text-white sm:h-96
              ${
                gameState === "idle"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : gameState === "waiting"
                    ? "bg-yellow-500"
                    : gameState === "ready"
                      ? "bg-green-500"
                      : "bg-purple-500"
              }`}
          >
            {message}
          </div>

          {reactionTime !== null && (
            <motion.div className="mt-6 space-y-2" variants={fadeInUp}>
              <p className="text-xl font-semibold">⏱ {reactionTime} ms</p>
              {lastEarned !== null && (
                <p className="text-lg text-green-600 font-bold">
                  +{lastEarned} coins
                </p>
              )}
            </motion.div>
          )}
        </div>
      </motion.main>
    </motion.main>
  );
}
