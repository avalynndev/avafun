import { generateHighlightString } from "@/util/functions";
import { GenericRule } from "@/util/genericRule";

const romanNumerals: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

export class Rule9 extends GenericRule {
  static instance: Rule9 = new Rule9();
  number: number;
  desc: string;

  constructor() {
    super({});
    this.number = 9;
    this.desc = "The roman numerals in your password should multiply to 35.";
  }

  getClass(): typeof Rule9 {
    return Rule9;
  }

  getHighlightString(): string {
    return generateHighlightString(this.textController.getHtml(), /[IVXLCDM]/g);
  }

  checkRule(): void {
    const numeralList = this.findNumeralsInText();
    this.getClass().fulfilled = multiplyArrayContent(numeralList) === 35;
  }

  findNumeralsInText(): number[] {
    const text = this.textController.getClear();
    let foundNumeral = "";
    const numeralList: number[] = [];
    let i = 0;

    while (i < text.length || foundNumeral.length > 0) {
      const c = text.charAt(i);

      if (checkValidNumeral(c)) {
        if (
          consecutiveRomanNumeralsAreInvalid(foundNumeral, c) ||
          substractionCaseIsInvalid(foundNumeral, c) ||
          alreadyHasSubstractionCase(foundNumeral)
        ) {
          numeralList.push(calculateRomanNumeralValue(foundNumeral) ?? 0);
          foundNumeral = "";
        }
        foundNumeral += c;
      } else if (foundNumeral.length > 0) {
        numeralList.push(calculateRomanNumeralValue(foundNumeral) ?? 0);
        foundNumeral = "";
      }
      i++;
    }

    return numeralList;
  }
}

function checkValidNumeral(num: string): boolean {
  const regex = new RegExp(
    /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,
  );
  return regex.test(num) && num.length > 0;
}

function consecutiveRomanNumeralsAreInvalid(
  fullNumeral: string,
  newChar: string,
): boolean {
  return (
    fullNumeral.at(-1) === newChar &&
    (newChar === "V" ||
      newChar === "L" ||
      newChar === "D" ||
      fullNumeral.endsWith(newChar + newChar + newChar))
  );
}

function substractionCaseIsInvalid(
  fullNumeral: string,
  newChar: string,
): boolean {
  const lastChar = fullNumeral.at(-1) ?? "";

  return (
    weAreOnSubstractionCase(lastChar, newChar) &&
    !substractionCaseIsValid(lastChar, newChar)
  );
}

function alreadyHasSubstractionCase(fullNumeral: string): boolean {
  const lastChar = fullNumeral.at(-1) ?? "";
  const secondToLastChar = fullNumeral.at(-2) ?? "";

  return (
    weAreOnSubstractionCase(secondToLastChar, lastChar) &&
    substractionCaseIsValid(secondToLastChar, lastChar)
  );
}

function weAreOnSubstractionCase(
  secondToLastChar: string,
  lastChar: string,
): boolean {
  return romanNumerals[secondToLastChar] < romanNumerals[lastChar];
}

function substractionCaseIsValid(
  secondToLastChar: string,
  lastChar: string,
): boolean {
  return (
    !(lastChar === "V" || lastChar === "L" || lastChar === "D") &&
    romanNumerals[lastChar] / 10 >= romanNumerals[secondToLastChar]
  );
}

function calculateRomanNumeralValue(str: string): number | null {
  let num = 0;
  let current = "";

  for (const c of str) {
    const lastCharValue = romanNumerals[current.at(-1) ?? ""] ?? 0;

    if (lastCharValue < romanNumerals[c]) {
      num -= lastCharValue * 2;
    }

    num += romanNumerals[c];
    current += c;
  }

  return num === 0 ? null : num;
}

function multiplyArrayContent(arr: number[]): number {
  let multi = 1;

  for (const num of arr) {
    multi *= num;
  }

  return multi;
}
