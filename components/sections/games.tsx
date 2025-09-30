"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { games } from "@/config/games";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Games() {
  return (
    <motion.div
      className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {games.map((element, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Link href={element.isDisabled ? "" : element.title} passHref>
            <motion.div
              className={`flex h-32 cursor-pointer items-center justify-center text-center sm:h-36 md:h-40 lg:h-44 ${
                element.isDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "transition-transform duration-300 hover:scale-100 hover:opacity-90"
              }`}
              aria-disabled={element.isDisabled}
              whileHover={element.isDisabled ? {} : { scale: 1.05 }}
              whileTap={element.isDisabled ? {} : { scale: 0.95 }}
            >
              <Image
                src={element.backgroundUrl}
                alt={element.title}
                height={200}
                width={400}
                className="max-h-full max-w-full object-cover"
              />
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
