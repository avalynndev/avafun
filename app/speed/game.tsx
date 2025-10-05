"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { geistSans } from "@/lib/fonts";
import { useSearchParams, useRouter } from "next/navigation";
import { useCoins } from "@/components/coin-context";

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

const SPEEDS = {
  tectonicPlates: 0.00000285,
  earthRotation: 1000,
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
    image: "/speed/cluster.jpeg",
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addCoins } = useCoins();
  const [claimed, setClaimed] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const rewardClaimed = localStorage.getItem("speed-reward-claimed");
    if (rewardClaimed === "true") {
      setClaimed(true);
    }
  }, []);

  useEffect(() => {
    const key = searchParams.get("key");
    const storedKey = sessionStorage.getItem(`speed-session`);

    if (key && storedKey && key === storedKey) {
      setValid(true);
      sessionStorage.removeItem(`speed-session`);
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

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

  function milesToNanometers(miles: number): number {
    return miles * 1.60934e9;
  }

  const handleClaim = () => {
    addCoins(70);
    localStorage.setItem("speed-reward-claimed", "true");
    setClaimed(true);
  };

  if (!valid) return null;

  return (
    <motion.main
      className={`${geistSans.className} mx-auto flex max-w-4xl flex-col items-center px-4 pt-10`}
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
        <div className="text-center">
          <motion.h2
            className="text-2xl font-bold sm:text-3xl"
            variants={fadeInUp}
          >
            How Fast Are You Moving?
          </motion.h2>
        </div>
      </motion.main>

      <motion.div
        className="z-sticky sticky font-bold inset-x-0 top-0 z-50 my-2 flex h-16 w-full items-center justify-center rounded-b-md bg-secondary text-white shadow-md sm:h-20"
        variants={fadeIn}
      >
        It has been {formatElapsed(elapsedSeconds)}
      </motion.div>

      <motion.div
        className="w-full space-y-12"
        variants={{
          animate: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {speedData.map((item, index) => {
          const speed = SPEEDS[item.speedKey];
          const distance = calculateDistance(speed, elapsedSeconds);

          let displayDistance: string;
          let unit: string;

          if (item.speedKey === "tectonicPlates") {
            const nm = milesToNanometers(distance);
            displayDistance = formatNumber(nm);
            unit = "nanometers";
          } else {
            displayDistance = formatNumber(distance);
            unit = "miles";
          }

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
                <p className="text-sm mb-3">{item.title}</p>
                {item.description && (
                  <p className="text-sm">{item.description}</p>
                )}
                <p className="text-lg font-bold mt-1">
                  {displayDistance} {unit}
                </p>
              </div>

              {index < speedData.length - 1 && (
                <p className="mt-8 text-sm">But wait...</p>
              )}
            </motion.section>
          );
        })}

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

          <div className="max-w-lg pb-4">
            <p className="text-sm mb-3">But you . . .</p>
            <p className="text-sm mb-3">
              haven&apos;t a clue that we are going in any particular direction
              or even moving . . .
            </p>
            <p className="text-lg font-bold">It&apos;s only . . . 0 mph</p>
          </div>
          {!claimed ? (
            <Button
              onClick={handleClaim}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg shadow-md"
            >
              Claim +70 Coins 🎉
            </Button>
          ) : (
            <p className="text-sm text-gray-500">Claimed +70 coins!</p>
          )}
        </motion.section>
      </motion.div>
    </motion.main>
  );
}
