"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { geistSans } from "@/lib/fonts";
import { HomeIcon, Gamepad2Icon, CoinsIcon } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const bounce = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.6,
    type: "spring",
    bounce: 0.6,
  },
};

export default function NotFound() {
  return (
    <motion.main
      className={`${geistSans.className} min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-background to-muted/20`}
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
    >
      <motion.div className="text-center mb-8" variants={bounce}>
        <motion.h1
          className="text-9xl font-bold text-primary mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          404
        </motion.h1>
      </motion.div>
      <motion.div className="text-center max-w-2xl mx-auto" variants={fadeInUp}>
        <h2 className="text-3xl font-bold mb-4">Oops! Game Over!</h2>
        <p className="text-xl text-muted-foreground mb-6">
          Looks like you&apos;ve wandered off the beaten path! This page
          doesn&apos;t exist in our arcade.
        </p>
      </motion.div>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-12"
        variants={fadeInUp}
      >
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="text-lg px-8 py-6"
        >
          <Link href="/">
            <HomeIcon className="mr-2 h-5 w-5" />
            Back to Arcade
          </Link>
        </Button>
      </motion.div>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-500 text-2xl opacity-20"
            initial={{
              x: Math.random() * 1200,
              y: 800,
              rotate: 0,
            }}
            animate={{
              y: -50,
              rotate: 360,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            🪙
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
