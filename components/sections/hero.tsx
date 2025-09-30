"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function Hero() {
  return (
    <div className="mx-auto my-2 max-w-7xl items-center justify-center text-center">
      <section className="py-10">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/logo.svg"
            alt="logo"
            height={82}
            width={200}
            className="mx-auto dark:invert"
          />
        </motion.div>
        <motion.p
          className="mx-auto max-w-3xl text-balance text-muted-foreground sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          a tiny website by avalynndev
        </motion.p>
      </section>
    </div>
  );
}
