import React from "react";
import { GenericRule } from "@/util/genericRule";

export class Rule8 extends GenericRule {
  static instance: Rule8 = new Rule8();
  number: number;
  desc: string;
  fulfilled: boolean;

  constructor() {
    super({});
    this.number = 8;
    this.desc = "Your password must include one of our sponsors:";
    this.fulfilled = false;
  }

  getClass(): typeof Rule8 {
    return Rule8;
  }

  checkRule(): void {
    const text = this.textController.getClear();
    const lowercase = text.toLowerCase();

    this.fulfilled =
      lowercase.includes("pepsi") ||
      lowercase.includes("starbucks") ||
      lowercase.includes("shell");
  }

  render(): JSX.Element {
    return (
      <div className="sponsors">
        <img className="sponsor pepsi" src="./sponsors/pepsi.svg" alt="pepsi" />
        <img
          className="sponsor starbucks"
          src="./sponsors/starbucks.svg"
          alt="starbucks"
        />
        <img className="sponsor shell" src="./sponsors/shell.svg" alt="shell" />
      </div>
    );
  }
}
