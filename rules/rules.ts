import Rule from "./rule";
import RuleWordle from "./wordle";
import RuleSlidingPuzzle from "./slidingpuzzle";
import RuleRiddle from "./riddle";
import RuleLocation from "./location";
import RuleTimeEmoji from "./time-emoji";
import RuleQR from "./qrcode";
import RuleSum from "./sum";
import RuleEarthquake from "./earthquake";

const rules: Rule[] = [
  new Rule(
    "Your password must be at least 6 characters.",
    (t) => t?.length >= 6,
  ),
  new Rule(
    "Your password must include an uppercase and a lowercase letter.",
    (t) => /[A-Z]/.test(t) && /[a-z]/.test(t),
  ),
  new Rule("Your password must include a special character.", (t) =>
    /\W/.test(t),
  ),
  new Rule("Your password must include a negative number.", (t) =>
    /-\d/.test(t),
  ),
  new Rule(
    "Your password must contain all the english vowels.",
    (t) =>
      /a/i.test(t) &&
      /e/i.test(t) &&
      /i/i.test(t) &&
      /o/i.test(t) &&
      /u/i.test(t),
  ),
  new Rule("Your password must include 2-digit prime number.", (t) =>
    /(?:11)|(?:13)|(?:17)|(?:19)|(?:23)|(?:29)|(?:31)|(?:37)|(?:41)|(?:43)|(?:47)|(?:53)|(?:59)|(?:61)|(?:67)|(?:71)|(?:73)|(?:79)|(?:83)|(?:89)|(?:97)/.test(
      t,
    ),
  ),
  new RuleSum(),
  new Rule(
    'Your password must include the name of "The power house of the cell". 🦠',
    (t) => /(?:mitochondria)|(?:mitochondrion)/i.test(t),
  ),
  new Rule("Your password must include the name of a continent.", (t) =>
    /asia|europe|africa|australia|oceania|north america|south america|antarctica/i.test(
      t,
    ),
  ),
  new Rule(
    "Your password must contain the value of pi up to first 5 decimal places.",
    (t) => /3\.14159/.test(t),
  ),

  new RuleTimeEmoji(),
  new RuleWordle(),
  new RuleEarthquake(),
  new RuleQR(),
  new RuleLocation(),
  new RuleRiddle(),
  new Rule(
    "Your password must have as many vowels as consonants.",
    (t) =>
      (t.match(/[aeiou]/gi) || []).length ===
      (t.match(/[bcdfghjklmnpqrstvwxys]/gi) || []).length,
  ),
  new RuleSlidingPuzzle(),
  new Rule("Your password must include the length of your password.", (t) => {
    const l = t.length;
    const r = new RegExp(`${l}`);
    return r.test(t);
  }),
];

function sort_rules(a: Rule, b: Rule): number {
  if (a.correct === b.correct) {
    return (b.num ?? 0) - (a.num ?? 0);
  } else if (!a.correct && b.correct) {
    return -1;
  } else {
    return 1;
  }
}

export default rules;
export { sort_rules };
