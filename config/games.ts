type InteractiveElement = {
  title: string;
  iframe?: string;
  isDisabled: boolean;
  backgroundUrl: string;
};

export const games: InteractiveElement[] = [
  {
    title: "spend",
    isDisabled: false,
    backgroundUrl: "https://neal.fun/link-images/spend.svg",
  },
  {
    title: "password-game",
    isDisabled: false,
    backgroundUrl: "https://neal.fun/link-images/password-game.svg",
  },
  {
    title: "life-checklist",
    isDisabled: false,
    backgroundUrl: "https://neal.fun/link-images/life-checklist.svg",
  },
  {
    title: "progress",
    isDisabled: false,
    backgroundUrl: "https://neal.fun/link-images/progress.svg",
  },
  {
    title: "infinite-craft",
    isDisabled: true,
    backgroundUrl: "https://neal.fun/link-images/infinite-craft.svg",
  },
  {
    title: "auction-game",
    isDisabled: true,
    backgroundUrl: "https://neal.fun/link-images/auction-game.svg",
  },
  {
    title: "sell-sell-sell",
    isDisabled: true,
    backgroundUrl: "https://neal.fun/link-images/sell-sell-sell.svg",
  },
  /**  {
    title: "2048",
    iframe: "",
    isDisabled: false,
    backgroundUrl: "",
  },
  {
    title: "8-ball-pool",
    iframe: "https://prod-web-pool.miniclip.com/mc?localmc",
    isDisabled: false,
    backgroundUrl: "",
  },*/
];
