"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { geistSans } from "@/lib/fonts";
import { useCoins } from "@/components/coin-context";
import { StarsScrollingWheel } from "@/components/ui/stars-scrolling-wheel";

const options = [50, 10, 20, 30, 0, 15, 25, 0, 35, 40, 75, 200, 110];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function SpinWheelPage() {
  const { coins, spendCoins, addCoins } = useCoins();
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("Click Spin to try your luck!");
  const [lastWon, setLastWon] = useState<number | null>(null);
  const [targetStars, setTargetStars] = useState(0);
  const [valid, setValid] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const key = searchParams.get("key");
    const storedKey = sessionStorage.getItem(`spin-the-wheel-session`);

    if (key && storedKey && key === storedKey) {
      setValid(true);
      sessionStorage.removeItem(`spin-the-wheel-session`);
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  if (!valid) return null;

  const spinWheel = () => {
    if (spinning) return;
    if (!coins || coins < 70) {
      setMessage("Not enough coins to spin!");
      return;
    }

    spendCoins(70);
    setSpinning(true);
    setMessage("Spinning...");

    const chosenIndex = Math.floor(Math.random() * options.length);
    const won = options[chosenIndex];
    setTargetStars(0);

    const finalStars = won;

    setTimeout(() => {
      setTargetStars(finalStars);
    }, 50);

    setTimeout(() => {
      setSpinning(false);
      setLastWon(won);

      if (won > 0) {
        addCoins(won);
        setMessage(`🎉 You won ${won} coins!`);
      } else {
        setMessage(`😢 You lost! Better luck next time.`);
      }
    }, 1000);
  };

  return (
    <motion.main
      className={`${geistSans.className} mx-auto flex max-w-4xl flex-col items-center px-4 pt-10`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="mb-6">
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
            Spin the Wheel
          </motion.h2>
          <p className="mt-2 text-lg">🪙 Total Coins: {coins}</p>
        </div>
      </motion.main>

      <div className="flex flex-col items-center space-y-6">
        <div className="w-72 h-72 flex items-center justify-center relative">
          <StarsScrollingWheel
            stars={targetStars}
            step={5}
            itemHeight={48}
            sideItemsCount={2}
            transition={{ stiffness: 50, damping: 10 }}
            delay={0}
          />
        </div>

        <Button
          onClick={spinWheel}
          disabled={spinning || (coins ?? 0) < 70}
          className="px-8 py-4 text-lg font-bold"
        >
          {spinning ? "Spinning..." : "Spin (70 🪙)"}
        </Button>

        {lastWon !== null && (
          <p
            className={`text-lg font-bold ${
              lastWon > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {lastWon > 0 ? `+${lastWon} coins! 🎉` : `You lost! 😢`}
          </p>
        )}
      </div>
    </motion.main>
  );
}
