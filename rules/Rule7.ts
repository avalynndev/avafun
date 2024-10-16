import { GenericRule } from "@/util/genericRule";

export class Rule7 extends GenericRule {
  static instance = new Rule7();
  number: number;
  desc: string;

  constructor() {
    super({});
    this.number = 7;
    this.desc = "Your password must include a roman numeral.";
  }

  getClass() {
    return Rule7;
  }

  checkRule() {
    const text = this.textController.getClear();

    this.getClass().fulfilled = text.search(/I|V|X|L|C|D|M/) !== -1;
  }
}
