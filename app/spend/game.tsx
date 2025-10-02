"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { geistSans } from "@/lib/fonts";
import { useAppSelector } from "@/hooks/spend";
import { Button } from "@/components/ui/button";
import { NumberTicker } from "@/components/ui/number-ticker";
import Products from "@/components/spend/products";
import Receipt from "@/components/spend/receipt";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export default function Spend() {
  const currentMoney = useAppSelector(
    (state: any) => state.product.currentMoney,
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const key = searchParams.get("key");
    const storedKey = sessionStorage.getItem("spend-session");

    if (key && storedKey && key === storedKey) {
      setValid(true);
      sessionStorage.removeItem("spend-session");
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  if (!valid) return null;

  return (
    <motion.main
      className={`${geistSans.className} mx-auto flex max-w-6xl flex-col items-center px-4 pt-10`}
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div className="text-balance pb-4 sm:pb-10" variants={fadeInUp}>
        <Link href="/">
          <Button variant="link">← Back Home</Button>
        </Link>
      </motion.div>

      <motion.main
        className="w-full rounded-t-lg border p-4 py-6 shadow-lg sm:py-12"
        variants={fadeInUp}
      >
        <div className="mb-6 text-center">
          <motion.div variants={fadeIn}>
            <Image
              src="/billgates.jpg"
              alt="Profile picture"
              width={120}
              height={120}
              className="mx-auto mb-4 rounded-full sm:h-[150px] sm:w-[150px]"
            />
          </motion.div>
          <motion.h2
            className="mb-4 text-2xl font-bold sm:text-3xl"
            variants={fadeInUp}
          >
            Spend Bill Gates&apos; Money
          </motion.h2>
        </div>
      </motion.main>

      <motion.div
        className="z-sticky sticky inset-x-0 top-0 z-50 my-2 flex h-16 w-full items-center justify-center rounded-b-md bg-green-400 text-white shadow-md sm:h-20"
        variants={fadeIn}
      >
        <p className="text-3xl font-medium sm:text-4xl">
          $ <NumberTicker className="text-white" value={currentMoney} />
        </p>
      </motion.div>

      <motion.div
        className="flex w-full flex-col justify-center px-2 sm:flex-row sm:px-4"
        variants={fadeInUp}
      >
        <Products />
      </motion.div>

      <motion.div className="w-full py-4 sm:py-8" variants={fadeInUp}>
        <Receipt />
      </motion.div>
    </motion.main>
  );
}
