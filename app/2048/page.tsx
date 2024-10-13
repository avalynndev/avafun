"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Board from "@/components/2048/board";
import GameProvider from "@/components/2048/game-context";
import Score from "@/components/2048/score";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

const rotateIn = {
  initial: { rotate: -5, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  transition: { duration: 0.5 },
};

export default function Home() {
  return (
    <motion.div
      className="px-4 py-8 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div className="text-balance pb-4 sm:pb-10" variants={fadeInUp}>
          <Link href="/">
            <Button variant="linkHover2">Home</Button>
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 md:py-12 lg:px-8"
        variants={scaleIn}
      >
        <GameProvider>
          <Card className="bg-background/80 shadow-xl backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <motion.div variants={rotateIn}>
                <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
                  2048
                </CardTitle>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Score />
              </motion.div>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-6">
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Board />
              </motion.div>
            </CardContent>
          </Card>
        </GameProvider>
      </motion.div>
    </motion.div>
  );
}
