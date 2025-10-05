import React from "react";
import Rule from "./rule";

export default class RuleSum extends Rule {
  constructor() {
    super("The digits in your password must add up to 30.");
    this.check = (txt: string): boolean => {
      const digits = txt.match(/-?\d/g)?.map((x) => Number(x)) ?? [];
      const sum = digits.reduce((acc, v) => acc + v, 0);

      console.log("sum:", sum, "target:", 30);
      return sum === 30;
    };
  }
}
