import React from "react";
import Rule from "./rule";

export default class RuleSum extends Rule {
  private target: number;

  constructor() {
    super("The digits in your password must add up to ");

    this.target = Math.ceil(Math.random() * 6) * 5;

    this.renderItem = () => <span>{this.target}.</span>;

    this.check = (txt: string): boolean => {
      const digits = txt.match(/-?\d/g)?.map((x) => Number(x)) ?? [];
      const sum = digits.reduce((acc, v) => acc + v, 0);

      console.log("sum:", sum, "target:", this.target);
      return sum === this.target;
    };
  }
}
