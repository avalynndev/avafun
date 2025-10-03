export default class Rule {
  msg: string;
  correct: boolean;
  unlocked: boolean;
  check?: (t: string) => boolean;
  num?: number;
  renderItem?: (props?: any) => React.ReactNode;
  regenerate?(): void;

  constructor(msg: string, check?: (t: string) => boolean) {
    this.msg = msg;
    this.correct = false;
    this.unlocked = false;

    if (check) {
      this.check = check;
    }
  }

  setRuleNumber(num: number): void {
    this.num = num;
  }
}
