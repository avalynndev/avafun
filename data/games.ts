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
    isDisabled: true,
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
    id: "type-test",
    title: "Type Test",
    price: 25,
    isDisabled: true,
    backgroundUrl: "/games/type-test.svg",
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
    id: "stimulation-clicker",
    title: "Stimulation Clicker",
    price: 15,
    isDisabled: true,
    backgroundUrl: "/games/stimulation-clicker.svg",
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    price: 20,
    isDisabled: true,
    backgroundUrl: "/games/tic-tac-toe.svg",
  },
  {
    id: "snake-game",
    title: "Snake Game",
    price: 15,
    isDisabled: false,
    backgroundUrl: "/games/snake-game.svg",
  },
  {
    id: "2048",
    title: "2048",
    price: 20,
    isDisabled: false,
    backgroundUrl: "/games/2048.svg",
  },
  {
    id: "password-game",
    title: "Password Game",
    price: 30,
    isDisabled: false,
    backgroundUrl: "/games/password-game.svg",
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
    isDisabled: true,
    backgroundUrl: "/games/memory-match.svg",
  },
  {
    id: "auction-game",
    title: "The Auction Game",
    price: 50,
    isDisabled: true,
    backgroundUrl: "/games/auction-game.svg",
  },
  {
    id: "sell-sell-sell",
    title: "Sell Sell Sell",
    price: 40,
    isDisabled: false,
    backgroundUrl: "/games/sell-sell-sell.svg",
  },
  {
    id: "speed",
    title: "Speed",
    price: 30,
    isDisabled: false,
    backgroundUrl: "/games/speed.svg",
  },
];
