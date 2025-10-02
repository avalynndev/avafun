"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useCoins } from "@/components/coin-context";

const initialLifeChecklist = [
  { label: "👶 Be born", id: "be-born", points: 30 },
  { label: "🚶‍ Take first steps", id: "take-first-steps", points: 5 },
  { label: "📣 Say first words", id: "say-first-words", points: 5 },
  { label: "📖 Learn to read", id: "learn-to-read", points: 10 },
  { label: "🤗 Make a friend", id: "make-a-friend", points: 10 },
  { label: "🚴‍ Learn to ride a bike", id: "learn-to-ride-a-bike", points: 10 },
  { label: "📗 Read a book", id: "read-a-book", points: 5 },
  { label: "🏊‍ Learn to swim", id: "learn-to-swim", points: 10 },
  {
    label: "🏫 Finish elementary school",
    id: "finish-elementary-school",
    points: 10,
  },
  { label: "⚽ Play a sport", id: "play-a-sport", points: 5 },
  { label: "🛫 Fly in a plane", id: "fly-in-a-plane", points: 10 },
  { label: "🛥️ Ride a boat", id: "ride-a-boat", points: 5 },
  { label: "🚆 Ride in a train", id: "ride-in-a-train", points: 5 },
  { label: "🚁 Ride a helicopter", id: "ride-a-helicopter", points: 15 },
  { label: "🌊 See the ocean", id: "see-the-ocean", points: 5 },
  { label: "❄️ See snow", id: "see-snow", points: 5 },
  { label: "☃️ Make a snowman", id: "make-a-snowman", points: 5 },
  { label: "🏫 Finish middle school", id: "finish-middle-school", points: 10 },
  { label: "🎶 Go to a concert", id: "go-to-a-concert", points: 10 },
  { label: "🏕️ Go camping", id: "go-camping", points: 10 },
  {
    label: "🎢 Ride a roller coaster",
    id: "ride-a-roller-coaster",
    points: 10,
  },
  { label: "🎻 Play an instrument", id: "play-an-instrument", points: 15 },
  { label: "💋 Get kissed", id: "get-kissed", points: 15 },
  { label: "💳 Get a credit card", id: "get-a-credit-card", points: 10 },
  { label: "🚘 Start driving", id: "start-driving", points: 20 },
  { label: "🗺️ Go on a roadtrip", id: "go-on-a-roadtrip", points: 15 },
  {
    label: "🗾 Visit another country",
    id: "visit-another-country",
    points: 20,
  },
  { label: "🎤 Give a speech", id: "give-a-speech", points: 10 },
  { label: "🏫 Graduate high school", id: "graduate-high-school", points: 20 },
  {
    label: "🌐 Learn another language",
    id: "learn-another-language",
    points: 20,
  },
  { label: "💸 Invest some money", id: "invest-some-money", points: 15 },
  { label: "📷 Meet an idol", id: "meet-an-idol", points: 15 },
  {
    label: "😩 Make a terrible mistake",
    id: "make-a-terrible-mistake",
    points: 5,
  },
  { label: "🏆 Win a trophy", id: "win-a-trophy", points: 20 },
  { label: "⛰️ Climb a mountain", id: "climb-a-mountain", points: 20 },
  { label: "🎽 Run a marathon", id: "run-a-marathon", points: 25 },
  { label: "🍳 Learn to cook", id: "learn-to-cook", points: 10 },
  { label: "🔦 Explore a cave", id: "explore-a-cave", points: 15 },
  { label: "🌋 See a volcano", id: "see-a-volcano", points: 20 },
  { label: "🎓 Graduate college", id: "graduate-college", points: 30 },
  {
    label: "💕 Have a long relationship",
    id: "have-a-long-relationship",
    points: 20,
  },
  { label: "🗑️ Get dumped", id: "get-dumped", points: 5 },
  { label: "🖊️ Sign a contract", id: "sign-a-contract", points: 10 },
  { label: "🏢 Get a job", id: "get-a-job", points: 20 },
  { label: "☝️ Get promoted", id: "get-promoted", points: 20 },
  { label: "💵 Get a paycheck", id: "get-a-paycheck", points: 10 },
  { label: "🔥 Get fired", id: "get-fired", points: 5 },
  { label: "📰 Get in the news", id: "get-in-the-news", points: 20 },
  { label: "🗳️ Vote in an election", id: "vote-in-an-election", points: 15 },
  { label: "🔀 Switch careers", id: "switch-careers", points: 15 },
  { label: "🏠 Buy a house", id: "buy-a-house", points: 30 },
  { label: "💍 Get engaged", id: "get-engaged", points: 20 },
  { label: "👰 Get married", id: "get-married", points: 30 },
  { label: "👶 Have a kid", id: "have-a-kid", points: 25 },
  {
    label: "🚶‍ Teach your kid to walk",
    id: "teach-your-kid-to-walk",
    points: 10,
  },
  {
    label: "📣 Teach your kid to talk",
    id: "teach-your-kid-to-talk",
    points: 10,
  },
  {
    label: "🎓 Watch your kid graduate",
    id: "watch-your-kid-graduate",
    points: 20,
  },
  {
    label: "👰 Watch your kid marry",
    id: "watch-your-kid-get-married",
    points: 20,
  },
  { label: "👴 Become a grandparent", id: "become-a-grandparent", points: 25 },
  { label: "🏖️ Retire", id: "retire", points: 30 },
  {
    label: "📔 Tell your grandkid a story",
    id: "tell-your-grandkid-a-story",
    points: 10,
  },
  { label: "🌑 See a solar eclipse", id: "see-a-solar-eclipse", points: 15 },
  { label: "🌷 Plant a garden", id: "plant-a-garden", points: 10 },
  { label: "🌎 Travel the world", id: "travel-the-world", points: 30 },
  { label: "🎂 Turn 100", id: "turn-100", points: 30 },
  {
    label: "✔️ Complete Life Checklist",
    id: "complete-life-checklist",
    points: 50,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LifeChecklist() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [valid, setValid] = useState(false);

  const { addCoins, removeCoins } = useCoins();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = (checkedCount / initialLifeChecklist.length) * 100;

  const allButLastChecked = initialLifeChecklist
    .slice(0, -1)
    .every((item) => checkedItems[item.id]);

  useEffect(() => {
    const key = searchParams.get("key");
    const storedKey = sessionStorage.getItem("life-checklist-session");

    if (key && storedKey && key === storedKey) {
      setValid(true);
      sessionStorage.removeItem("life-checklist-session");
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  useEffect(() => {
    if (checkedCount === initialLifeChecklist.length) {
      setShowConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [checkedCount]);

  useEffect(() => {
    if (!valid) return;
    const storedCheckedItems = localStorage.getItem("lifeChecklist");
    if (storedCheckedItems) {
      setCheckedItems(JSON.parse(storedCheckedItems));
    }
  }, [valid]);

  if (!valid) return null;

  const handleCheckboxChange = (id: string, points: number) => {
    const wasChecked = checkedItems[id] || false;

    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev, [id]: !prev[id] };

      if (
        id !== "complete-life-checklist" &&
        wasChecked &&
        prev["complete-life-checklist"]
      ) {
        newCheckedItems["complete-life-checklist"] = false;
      }

      localStorage.setItem("lifeChecklist", JSON.stringify(newCheckedItems));
      return newCheckedItems;
    });

    if (!wasChecked) {
      addCoins(points);
    } else {
      removeCoins(points);
    }
  };

  return (
    <motion.div
      className="min-h-screen px-4 py-8 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <div className="mx-auto max-w-5xl mb-2.5 mt-1.5">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            className="text-balance pb-4 sm:pb-10"
            variants={fadeInUp}
          >
            <Link href="/">
              <Button variant="link">← Back Home</Button>
            </Link>
          </motion.div>
        </div>

        <motion.main
          className="w-full rounded-t-lg border p-4 py-6 shadow-lg sm:py-12"
          variants={fadeInUp}
        >
          <div className="text-center">
            <motion.h2
              className="text-2xl font-bold sm:text-3xl"
              variants={fadeInUp}
            >
              Life Checklist
            </motion.h2>
            <motion.p
              className="mt-2 text-sm text-gray-500"
              variants={fadeInUp}
            >
              Earn points every time you complete one of the items below!
            </motion.p>
          </div>
        </motion.main>

        <motion.div
          className="light:bg-white mb-8 mt-4 rounded-b-lg border p-6 shadow-sm"
          variants={fadeInUp}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-lg font-medium">Progress</span>
            <span className="text-lg font-medium">
              {checkedCount} / {initialLifeChecklist.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
          variants={staggerChildren}
        >
          <AnimatePresence>
            {initialLifeChecklist.map((item, index) => {
              const isLast = index === initialLifeChecklist.length - 1;

              return (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className={`flex cursor-pointer items-center space-x-4 rounded-lg p-4 shadow-sm ${
                    checkedItems[item.id]
                      ? "bg-green-500 text-white"
                      : "light:bg-white dark:border"
                  }`}
                >
                  <Checkbox
                    id={item.id}
                    checked={checkedItems[item.id] || false}
                    className="h-6 w-6 border-2"
                    onClick={() => {
                      if (isLast && !allButLastChecked) return;
                      handleCheckboxChange(item.id, item.points);
                    }}
                  />

                  <label
                    htmlFor={item.id}
                    className="grow cursor-pointer text-lg"
                  >
                    {item.label}
                  </label>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
