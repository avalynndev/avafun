"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { geistSans } from "@/lib/fonts";
import { Badge } from "@/components/ui/badge";
import { useCoins } from "@/components/coin-context";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function GamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [valid, setValid] = useState(false);
  const { addCoins } = useCoins();
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const rewardClaimed = localStorage.getItem("sell-sell-sell-reward-claimed");
    if (rewardClaimed === "true") {
      setClaimed(true);
    }
  }, []);

  useEffect(() => {
    const key = searchParams.get("key");
    const storedKey = sessionStorage.getItem(`sell-sell-sell-session`);

    if (key && storedKey && key === storedKey) {
      setValid(true);
      sessionStorage.removeItem(`sell-sell-sell-session`);
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  const handleClaim = () => {
    addCoins(70);
    localStorage.setItem("sell-sell-sell-reward-claimed", "true");
    setClaimed(true);
  };

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
            SELL! SELL! SELL!
          </motion.h2>
          <motion.p className="mt-2 text-sm text-gray-500" variants={fadeInUp}>
            Capitalism ramped up in the 21st century, and if you're not selling,
            you're <em>losing</em>. Here are some products that won capitalism.
          </motion.p>
        </div>
      </motion.main>
      <div className="pt-16 pb-4 max-w-6xl">
        <Section
          title="Toyota is king of the automobile world with 11 million cars sold per year."
          subtitle="20 Toyotas sold/min"
          img="/sell-sell-sell/toyota.png"
          lines={1}
        />

        <Section
          title="First released in 2009, Minecraft is still one of the best selling video games."
          subtitle="45 Minecraft copies sold/min"
          img="/sell-sell-sell/minecraft.png"
          lines={1}
        />

        <Section
          title="Samsung sells over 40 million TVs a year."
          subtitle="81 Samsung TVs sold/min"
          img="/sell-sell-sell/samsung-tv.png"
          lines={1}
        />

        <Section
          title="Remember when everyone was making fun of AirPods? Whoops."
          subtitle="114 AirPods sold/min"
          img="/sell-sell-sell/airpods.png"
          lines={1}
        />

        <Section
          title="Is capitalism giving you a headache?"
          subtitle="Buy some Advil! (2 per second)"
          img="/sell-sell-sell/advil.png"
          lines={1}
        />

        <Section
          title="Cheerios is the most popular cereal with over 100 million boxes sold per year."
          subtitle="4 Cheerios boxes sold/sec"
          img="/sell-sell-sell/cheerios.png"
          lines={4}
        />

        <Section
          title="Campbell's Soup has owned the soup market since the 1800s."
          subtitle="6 Campbell's Chicken Noodle Soups sold/sec"
          img="/sell-sell-sell/cambell.png"
          lines={4}
        />

        <Section
          title="Here is Apple printing money again."
          subtitle="7 iPhones sold/sec"
          img="/sell-sell-sell/iphone.png"
          lines={4}
        />

        <Section
          title="Adidas produces more than 400 million shoes a year."
          subtitle="14 pairs of Adidas sold/sec"
          img="/sell-sell-sell/shoes.png"
          lines={5}
        />

        <Section
          title="The world really loves pizza, and Domino's is happy to oblige."
          subtitle="34 Domino's pizzas sold/sec"
          img="/sell-sell-sell/pizza.png"
          lines={10}
        />

        <Section
          title="Wow the pizzas don't look healthy. At least that's the worst thing we consume."
          subtitle="75 McDonald's burgers sold/sec"
          img="/sell-sell-sell/big-mac.png"
          lines={20}
        />

        <motion.div
          className="text-center mt-24 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-2xl font-semibold mb-2">
            Oh well, anyway those are some of the products that have won
            capitalism.
          </p>
          <p className="mt-2 text-xl mb-8">Congratulations to the winners.</p>
          <p className="mt-6 text-3xl font-bold">Wait, what's that? Oh no...</p>
        </motion.div>

        <ShakingBezos />

        <Section
          title=""
          subtitle="222 Amazon packages delivered/sec"
          img="/sell-sell-sell/amazon.png"
          lines={40}
        />
      </div>
      {!claimed ? (
        <Button
          onClick={handleClaim}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg shadow-md"
        >
          Claim +70 Coins 🎉
        </Button>
      ) : (
        <p className="text-sm text-gray-500">
          Claimed +70 coins!
        </p>
      )}
    </motion.main>
  );
}

function ShakingBezos() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) =>
        prev === 0 ? (Math.random() > 0.5 ? 10 : -10) : 0
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center my-12">
      <motion.img
        src="/sell-sell-sell/jeff.png"
        alt="Jeff Bezos"
        className="w-48 rounded-full"
        animate={{ rotate: rotation }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

function Section({
  title,
  subtitle,
  img,
  lines,
}: {
  title: string;
  subtitle: string;
  img: string;
  lines: number;
}) {
  return (
    <section className="mb-20 w-full justify-center text-center">
      {title && (
        <h2 className="text-2xl font-semibold mb-2 text-center">{title}</h2>
      )}
      {subtitle && (
        <Badge className="mb-8 p-2 rounded-md bg-muted text-foreground">
          {subtitle}
        </Badge>
      )}

      <div className="space-y-4 overflow-hidden">
        {Array.from({ length: lines }).map((_, lineIndex) => (
          <MarqueeLine
            key={lineIndex}
            img={img}
            reverse={lineIndex % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}

function MarqueeLine({ img, reverse }: { img: string; reverse: boolean }) {
  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{
          x: reverse ? [0, -1920] : [-1920, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <img
            key={i}
            src={img}
            alt="item"
            className="w-16 h-16 object-contain flex-shrink-0"
          />
        ))}
      </motion.div>
      <motion.div
        className="flex gap-4 whitespace-nowrap absolute"
        animate={{
          x: reverse ? [0, -1920] : [-1920, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ left: reverse ? "1920px" : "-1920px" }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <img
            key={i}
            src={img}
            alt="item"
            className="w-16 h-16 object-contain flex-shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
}
