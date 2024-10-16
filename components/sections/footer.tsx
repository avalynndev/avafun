"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CoffeeIcon, GithubIcon, TwitterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export function Footer() {
  return (
    <motion.footer
      className="bg-background px-4 py-8 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 flex flex-wrap justify-center gap-4">
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
          >
            <Button variant="outline" asChild>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                Github
              </a>
            </Button>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" asChild>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className="mr-2 h-4 w-4" />
                Twitter
              </a>
            </Button>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            <Button disabled variant="outline">
              <CoffeeIcon className="mr-2 h-4 w-4" />
              Support
            </Button>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <ModeToggle />
          </motion.div>
        </div>
        <motion.nav
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Link href="/">
            <Button variant="linkHover1">Home</Button>
          </Link>
          <Link href="/privacy">
            <Button variant="linkHover1">Privacy policy</Button>
          </Link>
        </motion.nav>
      </div>
    </motion.footer>
  );
}
