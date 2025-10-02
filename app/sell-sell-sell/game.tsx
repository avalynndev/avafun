"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { geistSans } from "@/lib/fonts";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function SellPage() {
  return (
    <main
      className={`${geistSans.className} mx-auto flex max-w-5xl flex-col items-center px-6 py-12`}
    >
      {/* Back Button */}
      <div className="mb-8 self-start">
        <Link href="/">
          <Button variant="link">← Back Home</Button>
        </Link>
      </div>

      {/* Title */}
      <motion.h1
        className="text-5xl font-extrabold text-red-600 mb-8"
        {...fadeInUp}
      >
        SELL!
      </motion.h1>

      {/* Intro */}
      <motion.p
        className="text-center text-lg text-gray-600 mb-12 max-w-2xl"
        {...fadeInUp}
      >
        Capitalism ramped up in the 21st century, and if you&apos;re not
        selling, you&apos;re losing. Here are some products that won capitalism.
      </motion.p>

      {/* Sections */}
      <Section
        title="Toyota is king of the automobile world with 11 million cars sold per year."
        subtitle="20 Toyotas sold/min"
        img="/items/toyota.png"
        count={20}
      />

      <Section
        title="First released in 2009, Minecraft is still one of the best selling video games."
        subtitle="45 Minecraft copies sold/min"
        img="/items/minecraft.png"
        count={45}
      />

      <Section
        title="Samsung sells over 40 million TVs a year."
        subtitle="81 Samsung TVs sold/min"
        img="/items/tv.png"
        count={81}
      />

      <Section
        title="Remember when everyone was making fun of AirPods? Whoops."
        subtitle="114 AirPods sold/min"
        img="/items/airpods.png"
        count={114}
      />

      <Section
        title="Is capitalism giving you a headache?"
        subtitle="Buy some Advil! (2 per second)"
        img="/items/advil.png"
        count={2 * 60}
      />

      <Section
        title="Cheerios is the most popular cereal with over 100 million boxes sold per year."
        subtitle="4 Cheerios boxes sold/sec"
        img="/items/cheerios.png"
        count={4 * 60}
      />

      <Section
        title="Campbell's Soup has owned the soup market since the 1800s."
        subtitle="6 Campbell's Chicken Noodle Soups sold/sec"
        img="/items/soup.png"
        count={6 * 60}
      />

      <Section
        title="Here is Apple printing money again."
        subtitle="7 iPhones sold/sec"
        img="/items/iphone.png"
        count={7 * 60}
      />

      <Section
        title="Adidas produces more than 400 million shoes a year."
        subtitle="14 pairs of Adidas sold/sec"
        img="/items/adidas.png"
        count={14 * 60}
      />

      <Section
        title="The world really loves pizza, and Domino's is happy to oblige."
        subtitle="34 Domino's pizzas sold/sec"
        img="/items/pizza.png"
        count={34 * 60}
      />

      <Section
        title="Wow the pizzas don't look healthy. At least that's the worst thing we consume."
        subtitle="75 McDonald's burgers sold/sec"
        img="/items/burger.png"
        count={75}
      />

      {/* Outro */}
      <motion.div
        className="text-center mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xl font-semibold text-gray-800">
          Oh well, anyway those are some of the products that have won
          capitalism.
        </p>
        <p className="mt-2 text-lg text-gray-600">
          Congratulations to the winners.
        </p>
        <p className="mt-6 text-2xl font-bold text-red-500">
          Wait, what&apos;s that? Oh no...
        </p>
      </motion.div>
    </main>
  );
}

function Section({
  title,
  subtitle,
  img,
  count,
}: {
  title: string;
  subtitle: string;
  img: string;
  count: number;
}) {
  return (
    <motion.section
      className="mb-20 w-full text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <Image
            key={i}
            src={img}
            alt="item"
            width={60}
            height={60}
            className="rounded-md"
          />
        ))}
      </div>
    </motion.section>
  );
}
