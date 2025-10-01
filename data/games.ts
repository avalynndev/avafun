type InteractiveElement = {
  title: string;
  id: string;
  price: number;
  iframe?: string;
  isDisabled: boolean;
  backgroundUrl: string;
};

export const games: InteractiveElement[] = [
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    price: 20,
    isDisabled: false,
    backgroundUrl: "/games/flappy-bird.svg",
  },
  {
    id: "spend",
    title: "Spend Bill Gates' Money",
    price: 25,
    isDisabled: false,
    backgroundUrl: "/games/spend.svg",
  },
  {
    id: "stack-tower",
    title: "Stack Tower",
    price: 30,
    isDisabled: false,
    backgroundUrl: "/games/stack-tower.svg",
  },
  {
    id: "life-checklist",
    title: "Life Checklist",
    price: 40,
    isDisabled: false,
    backgroundUrl: "/games/life-checklist.svg",
  },
  {
    id: "reaction-time",
    title: "Reaction Time",
    price: 15,
    isDisabled: false,
    backgroundUrl: "/games/reaction-time.svg",
  },
  {
    id: "progress",
    title: "Progress",
    price: 30,
    isDisabled: false,
    backgroundUrl: "/games/progress.svg",
  },
  {
    id: "2048",
    title: "2048",
    price: 20,
    isDisabled: false,
    backgroundUrl: "/games/2048.svg",
  },
  {
    id: "spin-the-wheel",
    title: "Spin the Wheel",
    price: 25,
    isDisabled: false,
    backgroundUrl: "/games/spin-the-wheel.svg",
  },
  {
    id: "memory-match",
    title: "Memory Match",
    price: 35,
    isDisabled: false,
    backgroundUrl: "/games/memory-match.svg",
  },
  {
    id: "auction-game",
    title: "The Auction Game",
    price: 50,
    isDisabled: false,
    backgroundUrl: "/games/auction-game.svg",
  },
];
