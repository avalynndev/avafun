import { GenericRule } from "@/util/genericRule";





export class Rule6 extends GenericRule {
  static instance = new Rule6();
  number: number;
  desc: string;

  constructor() {
    super({});
    this.number = 6;
    this.desc = "Your password must include a month of the year.";
  }

  getClass() {
    return Rule6;
  }

  checkRule() {
    const text = this.textController.getClear();

    this.getClass().fulfilled =
      text.search(
        /january|february|march|april|may|june|july|august|september|october|november|december/i,
      ) !== -1;
  }
}