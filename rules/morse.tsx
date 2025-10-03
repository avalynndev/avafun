"use client";

import Rule from "./rule";

const morse: Record<string, string> = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
};

export default class RuleMorse extends Rule {
  constructor() {
    super(
      "Your password must contain the Morse code of the first 3 English alphabets in your password. (Use . and -)"
    );
    this.check = (txt: string): boolean => {
      const letters = txt.match(/[A-Za-z]/g)?.slice(0, 3);

      if (letters?.length === 3) {
        const code = `${morse[letters[0].toLowerCase()]} ${
          morse[letters[1].toLowerCase()]
        } ${morse[letters[2].toLowerCase()]}`;

        // escape "." so regex doesn’t interpret as wildcard
        const exp = code.replaceAll(".", "\\.");

        console.log("morse:", exp);

        const r = new RegExp(exp);
        return r.test(txt);
      }
      return false;
    };
  }
}
