"use client";

import Rule from "./rule";
import React from "react";

async function getTodaysWordle(): Promise<string | null> {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let url = `https://www.nytimes.com/svc/wordle/v2/${year}-${(
      "0" + month
    ).slice(-2)}-${("0" + day).slice(-2)}.json`;

    url = "https://api.allorigins.win/get?url=" + encodeURIComponent(url);

    const response = await fetch(url, { method: "GET" });
    const json = await response.json();
    const parsed = JSON.parse(json.contents);

    console.log("WORDLE:", parsed);
    return parsed.solution;
  } catch (error) {
    console.error("Failed to fetch Wordle:", error);
    return null;
  }
}

export default class RuleWordle extends Rule {
  solution: string | null = null;

  constructor() {
    super("Your password must contain today’s Wordle answer.");

    getTodaysWordle().then((solution) => {
      if (solution) this.solution = solution;
    });

    this.renderItem = () => (
      <span className="text-blue-600 underline hover:text-blue-800">
        <a
          href="https://www.nytimes.com/games/wordle/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wordle
        </a>{" "}
        answer.
      </span>
    );

    this.check = (txt: string): boolean => {
      if (!this.solution) return false;
      const regex = new RegExp(`(${this.solution})`, "i");
      return regex.test(txt);
    };
  }
}
