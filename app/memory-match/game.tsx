"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { geistSans } from "@/lib/fonts";
import MemoryGame from "@/components/memory-game";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function GamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const key = searchParams.get("key");
    const storedKey = sessionStorage.getItem(`memory-match-session`);

    if (key && storedKey && key === storedKey) {
      setValid(true);
      sessionStorage.removeItem(`memory-match-session`);
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  if (!valid) return null;

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
          <div className="text-center">
            <motion.h2
              className="text-2xl font-bold sm:text-3xl"
              variants={fadeInUp}
            >
              Memory Game
            </motion.h2>
            <motion.p
              className="mt-2 text-sm text-gray-500"
              variants={fadeInUp}
            >
              Flip the cards and match all pairs to win! Fewer moves give you
              more coins — up to 30 coins per game.
            </motion.p>
          </div>
        </div>
      </motion.main>
      <div className="py-16">
        <MemoryGame />
      </div>
    </motion.main>
  );
}
