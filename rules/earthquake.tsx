"use client";

import { useEffect, useRef } from "react";
import Rule from "./rule";

interface EarthquakeProps {
  pswd: string;
  setPswd: (val: string) => void;
  shakePasswordBox: (shake: boolean) => void;
  correct: boolean;
}

export default class RuleEarthquake extends Rule {
  constructor() {
    super(
      "Oh no! There is an earthquake! Get your password to safety! Add this chair to your password and put the rest of your password below it."
    );

    this.renderItem = ({ pswd, setPswd, shakePasswordBox, correct }) => (
      <Earthquake
        pswd={pswd}
        setPswd={setPswd}
        shakePasswordBox={shakePasswordBox}
        correct={correct}
      />
    );

    this.check = (txt: string): boolean => {
      return /^[\u{1FA91}]+\n/u.test(txt);
    };
  }
}

function Earthquake({
  pswd,
  setPswd,
  shakePasswordBox,
  correct,
}: EarthquakeProps) {
  const solvedOnce = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const replaceCount = useRef(0);

  // start earthquake
  useEffect(() => {
    timerRef.current = setTimeout(shuffleCharacters, 1000);

    shakePasswordBox(true);
    solvedOnce.current = false;

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // continue earthquake
  useEffect(() => {
    if (!solvedOnce.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(
        shuffleCharacters,
        replaceCount.current < 8 ? 1000 : 3000
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pswd]);

  // stop earthquake
  useEffect(() => {
    if (!solvedOnce.current && correct) {
      solvedOnce.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      shakePasswordBox(false);
    }
  }, [correct, shakePasswordBox]);

  function shuffleCharacters() {
    const matches = [...pswd.matchAll(/[!-~]/g)];
    if (matches.length > 0) {
      const indices = matches.map((m) => m.index as number);
      let i = indices[Math.floor(Math.random() * indices.length)];

      const arr = ["\u{1FAA8}", "\u{1FAA8}", "\u{1F342}", "\u{1F343}"];
      const x = arr[Math.floor(Math.random() * arr.length)];

      setPswd(pswd.substring(0, i) + x + pswd.substring(i + 1));
      replaceCount.current += 1;
    }
  }

  return <div className="font-bold text-5xl text-center">{"\u{1FA91}"}</div>;
}
