"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const initialLifeChecklist = [
  { label: "👶 Be born", id: "be-born" },
  { label: "🚶‍ Take first steps", id: "take-first-steps" },
  { label: "📣 Say first words", id: "say-first-words" },
  { label: "📖 Learn to read", id: "learn-to-read" },
  { label: "🤗 Make a friend", id: "make-a-friend" },
  { label: "🚴‍ Learn to ride a bike", id: "learn-to-ride-a-bike" },
  { label: "📗 Read a book", id: "read-a-book" },
  { label: "🏊‍ Learn to swim", id: "learn-to-swim" },
  { label: "🏫 Finish elementary school", id: "finish-elementary-school" },
  { label: "⚽ Play a sport", id: "play-a-sport" },
  { label: "🛫 Fly in a plane", id: "fly-in-a-plane" },
  { label: "🛥️ Ride a boat", id: "ride-a-boat" },
  { label: "🚆 Ride in a train", id: "ride-in-a-train" },
  { label: "🚁 Ride a helicopter", id: "ride-a-helicopter" },
  { label: "🌊 See the ocean", id: "see-the-ocean" },
  { label: "❄️ See snow", id: "see-snow" },
  { label: "☃️ Make a snowman", id: "make-a-snowman" },
  { label: "🏫 Finish middle school", id: "finish-middle-school" },
  { label: "🎶 Go to a concert", id: "go-to-a-concert" },
  { label: "🏕️ Go camping", id: "go-camping" },
  { label: "🎢 Ride a roller coaster", id: "ride-a-roller-coaster" },
  { label: "🎻 Play an instrument", id: "play-an-instrument" },
  { label: "💋 Get kissed", id: "get-kissed" },
  { label: "💳 Get a credit card", id: "get-a-credit-card" },
  { label: "🚘 Start driving", id: "start-driving" },
  { label: "🗺️ Go on a roadtrip", id: "go-on-a-roadtrip" },
  { label: "🗾 Visit another country", id: "visit-another-country" },
  { label: "🎤 Give a speech", id: "give-a-speech" },
  { label: "🏫 Graduate high school", id: "graduate-high-school" },
  { label: "🌐 Learn another language", id: "learn-another-language" },
  { label: "💸 Invest some money", id: "invest-some-money" },
  { label: "📷 Meet an idol", id: "meet-an-idol" },
  { label: "😩 Make a terrible mistake", id: "make-a-terrible-mistake" },
  { label: "🏆 Win a trophy", id: "win-a-trophy" },
  { label: "⛰️ Climb a mountain", id: "climb-a-mountain" },
  { label: "🎽 Run a marathon", id: "run-a-marathon" },
  { label: "🍳 Learn to cook", id: "learn-to-cook" },
  { label: "🔦 Explore a cave", id: "explore-a-cave" },
  { label: "🌋 See a volcano", id: "see-a-volcano" },
  { label: "🎓 Graduate college", id: "graduate-college" },
  { label: "💕 Have a long relationship", id: "have-a-long-relationship" },
  { label: "🗑️ Get dumped", id: "get-dumped" },
  { label: "🖊️ Sign a contract", id: "sign-a-contract" },
  { label: "🏢 Get a job", id: "get-a-job" },
  { label: "☝️ Get promoted", id: "get-promoted" },
  { label: "💵 Get a paycheck", id: "get-a-paycheck" },
  { label: "🔥 Get fired", id: "get-fired" },
  { label: "📰 Get in the news", id: "get-in-the-news" },
  { label: "🗳️ Vote in an election", id: "vote-in-an-election" },
  { label: "🔀 Switch careers", id: "switch-careers" },
  { label: "🏠 Buy a house", id: "buy-a-house" },
  { label: "💍 Get engaged", id: "get-engaged" },
  { label: "👰 Get married", id: "get-married" },
  { label: "👶 Have a kid", id: "have-a-kid" },
  { label: "🚶‍ Teach your kid to walk", id: "teach-your-kid-to-walk" },
  { label: "📣 Teach your kid to talk", id: "teach-your-kid-to-talk" },
  { label: "🎓 Watch your kid graduate", id: "watch-your-kid-graduate" },
  { label: "👰 Watch your kid marry", id: "watch-your-kid-get-married" },
  { label: "👴 Become a grandparent", id: "become-a-grandparent" },
  { label: "🏖️ Retire", id: "retire" },
  { label: "📔 Tell your grandkid a story", id: "tell-your-grandkid-a-story" },
  { label: "🌑 See a solar eclipse", id: "see-a-solar-eclipse" },
  { label: "🌷 Plant a garden", id: "plant-a-garden" },
  { label: "🌎 Travel the world", id: "travel-the-world" },
  { label: "🎂 Turn 100", id: "turn-100" },
  { label: "✔️ Complete Life Checklist", id: "complete-life-checklist" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 10 },
};

export default function LifeChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const storedCheckedItems = localStorage.getItem("lifeChecklist");
    if (storedCheckedItems) {
      setCheckedItems(JSON.parse(storedCheckedItems));
    }
  }, []);

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev, [id]: !prev[id] };
      localStorage.setItem("lifeChecklist", JSON.stringify(newCheckedItems));
      return newCheckedItems;
    });
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = (checkedCount / (initialLifeChecklist.length - 1)) * 100;
  const allOtherChecked = checkedCount === initialLifeChecklist.length - 1;

  useEffect(() => {
    if (allOtherChecked && checkedItems["complete-life-checklist"]) {
      setShowConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [allOtherChecked, checkedItems]);

  return (
    <motion.div
      className="min-h-screen px-4 py-8 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div className="text-balance pb-4 sm:pb-10" variants={fadeInUp}>
          <Link href="/">
            <Button variant="linkHover2">Home</Button>
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
              Life Checklist
            </motion.h2>
          </div>
        </motion.main>

        <motion.div
          className="light:bg-white mt-4 mb-8 rounded-b-lg border p-6 shadow-sm"
          variants={fadeInUp}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-lg font-medium">Progress</span>
            <span className="text-lg font-medium">
              {checkedCount} / {initialLifeChecklist.length - 1}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
          variants={staggerChildren}
        >
          <AnimatePresence>
            {initialLifeChecklist.map((item) => {
              const isCompleteItem = item.id === "complete-life-checklist";

              return (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  whileHover={itemHover}
                  className={`flex cursor-pointer items-center space-x-4 rounded-lg p-4 shadow-sm ${
                    checkedItems[item.id]
                      ? "bg-green-500 text-white"
                      : "light:bg-white dark:border"
                  }`}
                  onClick={() => {
                    if (!isCompleteItem || allOtherChecked) {
                      handleCheckboxChange(item.id);
                    }
                  }}
                >
                  <Checkbox
                    id={item.id}
                    checked={checkedItems[item.id] || false}
                    onCheckedChange={() => {
                      if (!isCompleteItem || allOtherChecked) {
                        handleCheckboxChange(item.id);
                      }
                    }}
                    className="h-6 w-6 border-2"
                    disabled={isCompleteItem && !allOtherChecked}
                  />
                  <label
                    htmlFor={item.id}
                    className="flex-grow cursor-pointer text-lg"
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
