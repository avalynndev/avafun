"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CoffeeIcon, GithubIcon, TwitterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const buttonVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export function Footer() {
  return (
    <motion.footer
      className="bg-background px-4 py-10 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
          >
            <Button variant="secondary" asChild>
              <a
                href="https://github.com/avalynndev/avafun"
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
            <Button variant="secondary" asChild>
              <a
                href="https://x.com/avalynndev"
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
          className="mb-4 flex flex-wrap justify-center gap-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Link href="/">
            <Button variant="link" effect="underline">
              Home
            </Button>
          </Link>
          <Link href="/privacy">
            <Button variant="link" effect="underline">
              Privacy Policy
            </Button>
          </Link>
        </motion.nav>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Avafun. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
