"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import RuleClass from "@/rules/rule";
import ruleList, { sort_rules } from "@/rules/rules";
import RuleBox from "@/components/password/rule-box";
import PasswordBox from "@/components/password/password-box";
import { motion } from "motion/react";
import { geistSans } from "@/lib/fonts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCoins } from "@/components/coin-context";
import { useSearchParams, useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Home() {
  const { addCoins } = useCoins();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [valid, setValid] = useState(false);

  const [rewardGiven, setRewardGiven] = useState<boolean>(false);
  const [pswd, setPswd] = useState<string>("");
  const [ruleState, setRuleState] = useState<RuleClass[]>([]);
  const max_unlocked_rules = useRef<number>(0);
  const pswdBoxRef = useRef<HTMLTextAreaElement>(null);
  const [aaParent] = useAutoAnimate();
  const [allSolved, setAllSolved] = useState<boolean>(false);

  useEffect(() => {
    for (let i = 0; i < ruleList.length; i++) {
      ruleList[i].num = i + 1;
    }
    max_unlocked_rules.current = 0;
    setRuleState(ruleList);
  }, []);

  useEffect(() => {
    if (allSolved && !rewardGiven) {
      addCoins(100);
      setRewardGiven(true);
    }
  }, [allSolved, rewardGiven, addCoins]);

  useEffect(() => {
    const key = searchParams.get("key");
    const storedKey = sessionStorage.getItem(`password-game-session`);

    if (key && storedKey && key === storedKey) {
      setValid(true);
      sessionStorage.removeItem(`password-game-session`);
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  function setPswdAndCheckRules(txt: string): void {
    setPswd(txt);
    checkRules(txt);
  }

  function checkRules(txt: string): void {
    if (ruleState.length === 0) return;

    let rules = [...ruleState];

    if (!rules[0].unlocked && txt.length > 0) {
      rules[0].unlocked = true;
      max_unlocked_rules.current++;
    }

    let solved_count = 0;
    for (let i = 0; i < rules.length; i++) {
      if (i === max_unlocked_rules.current) {
        if (solved_count === max_unlocked_rules.current) {
          rules[i].unlocked = true;
          max_unlocked_rules.current++;
        } else {
          break;
        }
      }

      rules[i].correct = rules[i].correct = rules[i].check?.(txt) ?? false;
      if (rules[i].correct) {
        solved_count++;
      }
    }

    setRuleState(rules);
    if (solved_count === rules.length) {
      setAllSolved(true);
    } else {
      setAllSolved(false);
    }
  }

  function shakePasswordBox(boolean: boolean): void {
    if (boolean) {
      pswdBoxRef.current?.classList.add("animate-shake");
    } else {
      pswdBoxRef.current?.classList.remove("animate-shake");
    }
  }

  function regenerateRule(num: number): void {
    num--;
    let rules = [...ruleState];
    if (rules[num].regenerate) {
      rules[num].regenerate!();
      setRuleState(rules);
    }
  }
  if (!valid) return null;

  return (
    <motion.main
      className={`${geistSans.className} mx-auto max-w-4xl flex w-full flex-col items-center px-4 pt-10`}
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
            Password Game
          </motion.h2>
          <motion.p className="mt-2 text-sm text-gray-500" variants={fadeInUp}>
            Solve all the rules to craft the perfect password. Complete the game
            and earn +100 coins! 🪙
          </motion.p>
        </div>
      </motion.main>{" "}
      <div className="min-h-screen relative py-16">
        <div className="relative w-[576px] max-w-[calc(100%-20px)] mx-auto px-1.5 py-1.5 min-h-[calc(100vh-50px)]">
          <PasswordBox
            pswd={pswd}
            setPswd={setPswdAndCheckRules}
            ref={pswdBoxRef}
          />
          <div className="mb-6 font-mono">
            level: {max_unlocked_rules.current}
          </div>

          <div ref={aaParent} className="space-y-2">
            {allSolved && (
              <RuleBox
                heading={"Congratulations!"}
                msg={"You have successfully created a password. 🎉🎉"}
                correct={true}
              />
            )}
            {ruleState
              .filter((r) => r.unlocked)
              .sort(sort_rules)
              .map((r) => {
                return (
                  <RuleBox
                    key={r.num}
                    heading={`Rule ${r.num}`}
                    msg={r.msg}
                    correct={r.correct}
                    renderItem={r.renderItem}
                    propsToChild={{
                      pswd,
                      setPswd: setPswdAndCheckRules,
                      shakePasswordBox,
                      regenerateRule,
                      correct: r.correct,
                    }}
                  />
                );
              })}
          </div>
        </div>

        <style jsx>{`
          :global(.animate-shake) {
            animation: shake 1s infinite;
          }
        `}</style>
      </div>
    </motion.main>
  );
}
