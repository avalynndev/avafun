import { GenericRule } from "@/util/genericRule";

export class Rule2 extends GenericRule {
  static instance = new Rule2();
  number: number;
  desc: string;

  constructor() {
    super({});
    this.number = 2;
    this.desc = "Your password must include a number.";
  }

  getClass() {
    return Rule2;
  }

  checkRule() {
    const text = this.textController.getClear();

    this.getClass().fulfilled = /\d/.test(text);
  }
}
