import { GenericRule } from "@/util/genericRule";

export class Rule1 extends GenericRule {
  static instance: Rule1 = new Rule1();
  number: number;
  desc: string;

  constructor() {
    super({});
    this.number = 1;
    this.desc = "Your password must be at least 5 characters.";
  }

  getClass(): typeof Rule1 {
    return Rule1;
  }

  checkRule(): void {
    this.getClass().fulfilled = this.textController.getTrueClearLength() >= 5;
  }
}
