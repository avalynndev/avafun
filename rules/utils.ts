const BLANK_CELL_NUM = 8;

function getRandomWord(): string {
  const arr = [
    "act",
    "add",
    "age",
    "ago",
    "aid",
    "aim",
    "air",
    "all",
    "and",
    "any",
    "arm",
    "art",
    "ask",
    "bad",
    "bag",
    "ban",
    "bar",
    "bed",
    "bet",
    "big",
    "bit",
    "box",
    "boy",
    "bus",
    "but",
    "buy",
    "can",
    "cap",
    "car",
    "cat",
    "CEO",
    "cop",
    "cow",
    "cry",
    "cup",
    "cut",
    "dad",
    "day",
    "die",
    "dig",
    "DNA",
    "dog",
    "dry",
    "due",
    "ear",
    "eat",
    "egg",
    "end",
    "era",
    "etc",
    "eye",
    "fan",
    "far",
    "fat",
    "fee",
    "few",
    "fit",
    "fix",
    "fly",
    "for",
    "fun",
    "gap",
    "gas",
    "gay",
    "get",
    "God",
    "gun",
    "guy",
    "hat",
    "her",
    "hey",
    "him",
    "hip",
    "his",
    "hit",
    "hot",
    "how",
    "ice",
    "ill",
    "its",
    "jet",
    "Jew",
    "job",
    "joy",
    "key",
    "kid",
    "lab",
    "lap",
    "law",
    "lay",
    "leg",
    "let",
    "lie",
    "lip",
    "lot",
    "low",
    "mad",
    "man",
    "map",
    "may",
    "mix",
    "mom",
    "Mrs",
    "net",
    "new",
    "nod",
    "nor",
    "not",
    "now",
    "n't",
    "nut",
    "odd",
    "off",
    "oil",
    "old",
    "one",
    "our",
    "out",
    "owe",
    "own",
    "pan",
    "pay",
    "per",
    "pet",
    "pie",
    "pop",
    "pot",
    "put",
    "raw",
    "red",
    "rid",
    "row",
    "rub",
    "run",
    "sad",
    "say",
    "sea",
    "see",
    "set",
    "she",
    "sin",
    "sir",
    "sit",
    "six",
    "ski",
    "sky",
    "son",
    "sue",
    "sun",
    "tap",
    "tax",
    "tea",
    "ten",
    "the",
    "tie",
    "tip",
    "toe",
    "too",
    "top",
    "toy",
    "try",
    "two",
    "use",
    "via",
    "war",
    "way",
    "wet",
    "who",
    "why",
    "win",
    "yes",
    "yet",
    "you",
  ];

  return arr[Math.floor(Math.random() * arr.length)];
}

function getShuffledPuzzle(): number[][] {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const rowOne: number[] = [];
  const rowTwo: number[] = [];
  const rowThree: number[] = [];

  while (values.length) {
    const random = Math.floor(Math.random() * values.length);

    if (rowOne.length < 3) {
      rowOne.push(values.splice(random, 1)[0]);
    } else if (rowTwo.length < 3) {
      rowTwo.push(values.splice(random, 1)[0]);
    } else {
      rowThree.push(values.splice(random, 1)[0]);
    }
  }

  return [rowOne, rowTwo, rowThree];
}

function flattenArray(arr: number[][]): number[] {
  return arr.reduce(
    (flatArr, subArr) => flatArr.concat(subArr),
    [] as number[]
  );
}

function getInversionsCount(arr: number[][]): number {
  const flattened = flattenArray(arr).filter((n) => n !== BLANK_CELL_NUM);

  let inversionsCount = 0;
  for (let i = 0; i < flattened.length - 1; i++) {
    for (let j = i + 1; j < flattened.length; j++) {
      if (flattened[i] > flattened[j]) {
        inversionsCount++;
      }
    }
  }

  return inversionsCount;
}

function isSolvable(puzzle: number[][]): boolean {
  return getInversionsCount(puzzle) % 2 === 0;
}

function getPuzzle(): number[][] {
  let puzzle = getShuffledPuzzle();
  while (!isSolvable(puzzle)) {
    puzzle = getShuffledPuzzle();
  }
  return puzzle;
}

export { getRandomWord, getPuzzle, BLANK_CELL_NUM };
