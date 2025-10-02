"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  daysInYearToDate,
  getDaysUntilNextDate,
  getDaysUntilNextEaster,
  getDaysUntilNextFathersDay,
  getDaysUntilNextMothersDay,
  getDaysUntilNextThanksgiving,
  getNumDaysInCurrentMonth,
  getNumDaysInCurrentYear,
} from "@/util/date";
import { getPageHeight, getPixelsScrolled } from "@/util/height";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Progress() {
  const [time, setTime] = useState(new Date());
  const [scrollHeight, setScrollHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const key = searchParams.get("key");
    const storedKey = sessionStorage.getItem("progress-session");

    if (key && storedKey && key === storedKey) {
      setValid(true);
      sessionStorage.removeItem("progress-session");
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  useEffect(() => {
    if (!valid) return;

    const interval = setInterval(() => setTime(new Date()), 10);

    setWindowHeight(getPageHeight());

    window.addEventListener("scroll", () =>
      setScrollHeight(getPixelsScrolled()),
    );
    window.addEventListener("resize", () => setWindowHeight(getPageHeight()));

    return () => {
      clearInterval(interval);
    };
  }, [valid]);

  if (!valid) return null;

  return (
    <div className="mx-auto flex max-w-5xl flex-col">
      <div className="mb-2.5 mt-7 flex flex-col items-center justify-center p-2.5">
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
              Progress
            </motion.h2>
          </div>
        </motion.main>
      </div>
      <div className="p-7">
        <ProgressBar
          title={"🕑 Next minute"}
          time={time}
          getPercentage={(time: Date) => (time.getSeconds() / 60) * 100}
          getTimeLeft={(time: Date) => 60 - time.getSeconds()}
          singularSuffix={"second"}
        />
        <ProgressBar
          title={"🕑 Next hour"}
          time={time}
          getPercentage={(time: Date) => (time.getMinutes() / 60) * 100}
          getTimeLeft={(time: Date) => 60 - time.getMinutes()}
          singularSuffix={"minute"}
        />
        <ProgressBar
          title={"🌅 Next day"}
          time={time}
          getPercentage={(time: Date) => (time.getHours() / 24) * 100}
          getTimeLeft={(time: Date) => 24 - time.getHours()}
          singularSuffix={"hour"}
        />
        <ProgressBar
          title={"📅 Next month"}
          time={time}
          getPercentage={(time: Date) =>
            (time.getDate() / getNumDaysInCurrentMonth()) * 100
          }
          getTimeLeft={(time: Date) =>
            getNumDaysInCurrentMonth() - time.getDate()
          }
          singularSuffix={"day"}
        />
        <ProgressBar
          title={"🎆 Next year"}
          time={time}
          getPercentage={(time: Date) =>
            (daysInYearToDate() / getNumDaysInCurrentYear()) * 100
          }
          getTimeLeft={(time: Date) =>
            getNumDaysInCurrentYear() - daysInYearToDate()
          }
          singularSuffix={"day"}
        />
        <ProgressBar
          title={"🦃 Next Thanksgiving"}
          time={time}
          getPercentage={(time: Date) =>
            (getDaysUntilNextThanksgiving() / getNumDaysInCurrentYear()) * 100
          }
          getTimeLeft={(time: Date) => getDaysUntilNextThanksgiving()}
          singularSuffix={"day"}
        />
        <ProgressBar
          title={"💻 End of this page"}
          time={time}
          getPercentage={() => (scrollHeight / windowHeight) * 100}
          getTimeLeft={() => Math.round(windowHeight - scrollHeight)}
          singularSuffix={"px to go"}
          allSingular
          noDelay
        />
        <ProgressBar
          title={"❤️ Next Valentine's Day"}
          time={time}
          getPercentage={(time: Date) =>
            (getDaysUntilNextDate(2, 14) / getNumDaysInCurrentYear()) * 100
          }
          getTimeLeft={(time: Date) => getDaysUntilNextDate(2, 14)}
          singularSuffix={"day"}
        />
        <ProgressBar
          title={"🍀 Next Saint Patrick's Day"}
          time={time}
          getPercentage={(time: Date) =>
            (getDaysUntilNextDate(3, 17) / getNumDaysInCurrentYear()) * 100
          }
          getTimeLeft={(time: Date) => getDaysUntilNextDate(3, 17)}
          singularSuffix={"day"}
        />
        <ProgressBar
          title={"🐰 Next Easter"}
          time={time}
          getPercentage={(time: Date) =>
            (getDaysUntilNextEaster() / getNumDaysInCurrentYear()) * 100
          }
          getTimeLeft={(time: Date) => getDaysUntilNextEaster()}
          singularSuffix={"day"}
        />
        <ProgressBar
          title={"👩 Next Mother's Day"}
          time={time}
          getPercentage={(time: Date) =>
            (getDaysUntilNextMothersDay() / getNumDaysInCurrentYear()) * 100
          }
          getTimeLeft={(time: Date) => getDaysUntilNextMothersDay()}
          singularSuffix={"day"}
        />
        <ProgressBar
          title={"👨 Next Father's Day"}
          time={time}
          getPercentage={(time: Date) =>
            (getDaysUntilNextFathersDay() / getNumDaysInCurrentYear()) * 100
          }
          getTimeLeft={(time: Date) => getDaysUntilNextFathersDay()}
          singularSuffix={"day"}
        />
        <ProgressBar
          title={"🎃 Next Halloween"}
          time={time}
          getPercentage={(time: Date) =>
            (getDaysUntilNextDate(10, 31) / getNumDaysInCurrentYear()) * 100
          }
          getTimeLeft={(time: Date) => getDaysUntilNextDate(10, 31)}
          singularSuffix={"day"}
        />
        <ProgressBar
          title={"🎄 Next Christmas"}
          time={time}
          getPercentage={(time: Date) =>
            (getDaysUntilNextDate(12, 25) / getNumDaysInCurrentYear()) * 100
          }
          getTimeLeft={(time: Date) => getDaysUntilNextDate(12, 25)}
          singularSuffix={"day"}
        />
      </div>
    </div>
  );
}
