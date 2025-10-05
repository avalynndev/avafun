"use client";

import { useRef } from "react";
import Rule from "./rule";
import ReloadButton from "@/components/password/reload-button";

const riddles: [string, string][] = [
  [
    "It's shorter than all the rest, when you're happy you raise it like it's the best.",
    "thumb",
  ],
  [
    "I look very sorry when you feel sad, and I love to look happy if you're feeling glad.",
    "mirror",
  ],
  [
    "I stand up tall and can be very grand. My secret isn't hidden, it's right at hand.",
    "piano",
  ],
  [
    "I can be all colours or no colour at all, sometimes I'm empty, and others I'm full.",
    "glass",
  ],
  [
    "You use me from your head to toe, the more I work, the smaller I grow.",
    "soap",
  ],
  [
    "I'm found on people's faces, I'm something you wear, I help correct your eyesight and I come in a pair",
    "spectacles",
  ],
  [
    "In the heat, you see me wrong. I bring you hope but am soon gone.",
    "mirage",
  ],
  [
    "Stare at me, and you may go blind. Yet, you cannot see if I don't shine.",
    "sun",
  ],
  [
    "I am sometimes round, but not so often. I'm here every night, so I'm easily forgotten.",
    "moon",
  ],
  [
    "I'm taken from a mine, and shut up in a wooden case, from which I'm never released, and yet I am used by almost every person. What am I?",
    "pencil",
  ],
  [
    "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    "echo",
  ],
  [
    "I'm not alive, but I can grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
    "fire",
  ],
  [
    "I'm always hungry, I must always be fed. The finger I touch will soon turn red. What am I?",
    "fire",
  ],
  [
    "I have keys but open no locks. I have space but no room. You can enter, but you can't go outside. What am I?",
    "keyboard",
  ],
  ["I'm tall when I'm young and short when I'm old. What am I?", "candle"],
  ["The more you take, the more you leave behind. What am I?", "footsteps"],
  [
    "I have cities but no houses. I have forests but no trees. I have water but no fish. What am I?",
    "map",
  ],
  [
    "I'm a word of letters three, add two and fewer there will be. What am I?",
    "few",
  ],
  [
    "I'm light as a feather, yet the strongest person can't hold me for much longer than a minute. What am I?",
    "breath",
  ],
  ["I can travel the world without leaving my corner. What am I?", "stamp"],
  [
    "I can fly without wings. I can cry without eyes. Wherever I go, darkness follows me. What am I?",
    "cloud",
  ],
  ["I can be cracked, made, told, and played. What am I?", "joke"],
  ["I'm full of holes, yet still holds water. What am I?", "sponge"],
  ["I have a head, a tail, but no body. What am I?", "coin"],
  ["Where does today come before yesterday?", "dictionary"],
  [
    "I am an odd number. Take away a letter and I become even. What number am I?",
    "seven",
  ],
  ["If two’s company, and three’s a crowd, what are four and five?", "nine"],
  ["People make me, save me, change me, raise me. What am I?", "money"],
];

export default class RuleRiddle extends Rule {
  riddleNum: number;

  constructor() {
    super("Your password must contain the solution to the following riddle:");
    this.riddleNum = Math.floor(Math.random() * riddles.length);

    this.renderItem = ({ regenerateRule, correct }) => (
      <Riddle
        riddleNum={this.riddleNum}
        regenerate={() => regenerateRule(this.num)}
        correct={correct}
      />
    );
  }

  regenerate() {
    this.riddleNum = Math.floor(Math.random() * riddles.length);
  }

  check = (txt: string) => {
    const ans = riddles[this.riddleNum][1];
    const r = new RegExp(`(?:${ans})`, "i");
    return r.test(txt);
  };
}

function Riddle({
  riddleNum,
  regenerate,
  correct,
}: {
  riddleNum: number;
  regenerate: () => void;
  correct: boolean;
}) {
  const riddle = riddles[riddleNum][0];
  const reloadsLeft = useRef(3);

  return (
    <div className="grid grid-cols-[1fr_50px] items-center justify-between gap-2 p-2 pl-4 mt-2">
      <div className="text-sm text-gray-800 dark:text-gray-200">{riddle}</div>
      <ReloadButton
        onClick={() => {
          if (reloadsLeft.current > 0) {
            regenerate();
            reloadsLeft.current--;
          }
        }}
        hidden={correct}
        reloadsLeft={reloadsLeft.current}
      />
    </div>
  );
}
