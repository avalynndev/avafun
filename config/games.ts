type InteractiveElement = {
  title: string;
  iframe?: string;
  isDisabled: boolean;
  backgroundUrl: string;
};

export const games: InteractiveElement[] = [
  {
    title: "2048",
    isDisabled: false,
    backgroundUrl: "/2048.svg",
  },
];
