"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import RuleClass from "@/rules/rule";
import ruleList, { sort_rules } from "@/rules/rules";
import RuleBox from "@/components/password/rule-box";
import PasswordBox from "@/components/password/password-box";

export default function Home() {
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
    console.log("regenerate", num);
    num--;
    let rules = [...ruleState];
    if (rules[num].regenerate) {
      rules[num].regenerate!();
      setRuleState(rules);
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative w-[576px] max-w-[calc(100%-20px)] mx-auto px-1.5 py-1.5 min-h-[calc(100vh-50px)]">
        <div className="text-center grid grid-cols-[60px_auto] items-center justify-center mt-5 mb-10">
          <div className="text-[28px] font-bold text-[#533ea5] font-mono">
            QuirkyLock
          </div>
        </div>

        <PasswordBox
          pswd={pswd}
          setPswd={setPswdAndCheckRules}
          ref={pswdBoxRef}
        />
        <div className="mb-4 font-mono">
          level: {max_unlocked_rules.current}
        </div>

        <div ref={aaParent}>
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
  );
}
