"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }, // same as GamePage
};

// Speeds in mph
const SPEEDS = {
  tectonicPlates: 0.00000285, // ~2.5 cm/year in mph
  earthRotation: 1000, // at equator
  earthOrbit: 67000,
  barnardsStar: 241500,
  milkyWayOrbit: 483000,
  towardAndromeda: 900000,
  milkyWayMovement: 1300000,
  superCluster: 1342161,
  universe: 1342162304,
};

interface SpeedData {
  title: string;
  description?: string;
  speedKey: keyof typeof SPEEDS;
  image: string;
  alt: string;
}

const speedData: SpeedData[] = [
  {
    title:
      "On the African continent, we find evidence of Humankind's first location (where the African Plate is diverging from the Arabian plate).",
    speedKey: "tectonicPlates",
    image: "/speed/tectonic-plates.jpg",
    alt: "Tectonic plates map",
  },
  {
    title: "But, you . . .",
    description:
      "are sitting (assume 1000/hr) on a planet traveling 1000 mph (at the equator). Humans have been around for about 200,000 years, and we've always moved at 1000 mph just standing still.",
    speedKey: "earthRotation",
    image: "/speed/earth-spinning.jpg",
    alt: "Earth from space",
  },
  {
    title: "But still . . .",
    description:
      "the planet you (and everyone else in all of human history) sit/stood/stand on travels around the sun at 67,000 mph (100,000 mph if you include orbital parameters).",
    speedKey: "earthOrbit",
    image: "/speed/earth-orbit.jpg",
    alt: "The Earth",
  },
  {
    title: "And yet . . .",
    description:
      "compared to neighboring stars like very nearby Barnard's Star that is receding from us at 67 mi/sec (241,500 mph), we're not even close to sitting still.",
    speedKey: "barnardsStar",
    image: "/speed/local-group.jpg",
    alt: "Starfield",
  },
  {
    title: "But wait . . .",
    description:
      "the sun is orbiting (we're all orbiting) at 483,000 mph all the way around the center of the Milky Way.",
    speedKey: "milkyWayOrbit",
    image: "/speed/milky-way-orbit.jpg",
    alt: "Milky Way galaxy",
  },
  {
    title: "And the plot thickens . . .",
    description:
      "the Milky Way (and us with it) is moving toward Andromeda at around 250 miles/second (900,000 mph).",
    speedKey: "towardAndromeda",
    image: "/speed/andromeda.jpg",
    alt: "Andromeda galaxy",
  },
  {
    title: "And we're not done yet . . .",
    description:
      "the sun, us, the Milky Way and all of the stars you can see at night (and all of the galaxies) are ALL moving toward something.",
    speedKey: "milkyWayMovement",
    image: "/speed/universe.jpg",
    alt: "Spiral galaxy",
  },
  {
    title: "And even . . .",
    description:
      "it is a massive cluster 150,000 light years away. Getting to the center of the super cluster would be very inconvenient.",
    speedKey: "superCluster",
    image: "/speed/cluster.jpg",
    alt: "Star cluster",
  },
  {
    title: "And faster . . .",
    description:
      "the Milky Way (which we are on) is being pulled toward the largest structure known in the observable Universe.",
    speedKey: "universe",
    image: "/speed/multiverse.jpg",
    alt: "Multiple galaxies",
  },
];

function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(num));
}

function formatElapsed(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  if (mins > 0) {
    return `${mins} minute${mins > 1 ? "s" : ""} and ${secs} second${
      secs !== 1 ? "s" : ""
    }`;
  }
  return `${secs} second${secs !== 1 ? "s" : ""}`;
}

export default function SpeedPage() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const seconds = (now - startTime) / 1000;
      setElapsedSeconds(seconds);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const calculateDistance = (speedMph: number, seconds: number): number => {
    const hours = seconds / 3600;
    return speedMph * hours;
  };

  return (
    <motion.main
      className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-10 pb-20"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div className="mb-6 w-full" variants={fadeInUp}>
        <Link href="/">
          <Button variant="link" className="px-0">
            ← Back Home
          </Button>
        </Link>
      </motion.div>

      <motion.header className="w-full mb-8 text-center" variants={fadeInUp}>
        <h1 className="text-3xl font-bold mb-2">NEAL.FUN</h1>
        <div className="bg-emerald-500 text-white py-3 px-4 rounded mt-4">
          <h2 className="text-xl font-semibold">How Fast Are You Moving?</h2>
        </div>
      </motion.header>

      <motion.div
        className="w-full mb-8 text-center text-gray-600"
        variants={fadeInUp}
      >
        <p className="text-lg">
          It has been{" "}
          <span className="font-bold text-gray-900">
            {formatElapsed(elapsedSeconds)}
          </span>
        </p>
      </motion.div>

      <motion.div
        className="w-full space-y-12"
        variants={{
          animate: { transition: { staggerChildren: 0.1 } }, // same stagger as GamePage
        }}
      >
        {speedData.map((item, index) => {
          const speed = SPEEDS[item.speedKey];
          const distance = calculateDistance(speed, elapsedSeconds);

          return (
            <motion.section
              key={index}
              className="flex flex-col items-center text-center"
              variants={fadeInUp}
            >
              <div className="mb-4 max-w-xl">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="max-w-lg">
                <p className="text-sm text-gray-700 mb-3">{item.title}</p>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-3">
                    {item.description}
                  </p>
                )}
                <p className="text-lg font-bold text-gray-900">
                  {formatNumber(distance)} miles
                </p>
              </div>

              {index < speedData.length - 1 && (
                <p className="mt-8 text-sm text-gray-500">But wait...</p>
              )}
            </motion.section>
          );
        })}

        {/* Final section */}
        <motion.section
          className="flex flex-col items-center text-center"
          variants={fadeInUp}
        >
          <div className="mb-4 max-w-xl">
            <img
              src="/speed/still.jpg"
              alt="Person standing on beach"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div className="max-w-lg">
            <p className="text-sm text-gray-700 mb-3">But you . . .</p>
            <p className="text-sm text-gray-600 mb-3">
              haven&apos;t a clue that we are going in any particular direction or
              even moving . . .
            </p>
            <p className="text-lg font-bold text-gray-900">
              It&apos;s only . . . 0 mph
            </p>
          </div>
        </motion.section>
      </motion.div>
    </motion.main>
  );
}
