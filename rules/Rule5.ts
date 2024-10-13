import { generateHighlightString, getAllRegexMatches } from "@/util/functions";
import { GenericRule } from "@/util/genericRule";


export class Rule5 extends GenericRule {
  static instance = new Rule5();
  number: number;
  desc: string;

  constructor() {
    super({});
    this.number = 5;
    this.desc = "The digits in your password must add up to 25.";
  }

  getClass() {
    return Rule5;
  }

  checkRule() {
    const text = this.textController.getClear();
    const digits = getAllRegexMatches(text, /\d/g);
    const sum = digits.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
      0,
    );

    this.getClass().fulfilled = sum === 25;
  }

  getHighlightString() {
    return generateHighlightString(this.textController.getHtml(), /\d/g);
  }
}