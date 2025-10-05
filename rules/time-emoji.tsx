import React from "react";
import Rule from "./rule";

function getCurrentNearestHalfHour(): string {
  const d = new Date();
  let h = d.getHours() % 12;
  let m = d.getMinutes();

  if (m >= 45) {
    m = 0;
    h = (h + 1) % 12;
  } else if (m >= 15) {
    m = 30;
  } else {
    m = 0;
  }

  return `${("00" + h).slice(-2)}:${("00" + m).slice(-2)}`;
}

const hourToEmoji: Record<string, string> = {
  "00:00": "\u{1F55B}",
  "00:30": "\u{1F567}",

  "01:00": "\u{1F550}",
  "01:30": "\u{1F55C}",

  "02:00": "\u{1F551}",
  "02:30": "\u{1F55D}",

  "03:00": "\u{1F552}",
  "03:30": "\u{1F55E}",

  "04:00": "\u{1F553}",
  "04:30": "\u{1F55F}",

  "05:00": "\u{1F554}",
  "05:30": "\u{1F560}",

  "06:00": "\u{1F555}",
  "06:30": "\u{1F561}",

  "07:00": "\u{1F556}",
  "07:30": "\u{1F562}",

  "08:00": "\u{1F557}",
  "08:30": "\u{1F563}",

  "09:00": "\u{1F558}",
  "09:30": "\u{1F564}",

  "10:00": "\u{1F559}",
  "10:30": "\u{1F565}",

  "11:00": "\u{1F55A}",
  "11:30": "\u{1F566}",
};

export default class RuleTimeEmoji extends Rule {
  private nearestHalfHour: string;
  private currentTimeEmoji: string;

  constructor() {
    super(
      "Your password must contain the current time as emoji (nearest half hour).",
    );

    this.nearestHalfHour = getCurrentNearestHalfHour();
    this.currentTimeEmoji = hourToEmoji[this.nearestHalfHour];

    console.log("Time Rule:", this.nearestHalfHour, this.currentTimeEmoji);

    this.check = (txt: string): boolean => {
      if (!this.currentTimeEmoji) return false;
      const regex = new RegExp(this.currentTimeEmoji, "u");
      return regex.test(txt);
    };

    this.renderItem = () => (
      <span>
        Must include the clock emoji for <b>{this.nearestHalfHour}</b> →{" "}
        <span className="text-xl">{this.currentTimeEmoji}</span>
      </span>
    );
  }
}
