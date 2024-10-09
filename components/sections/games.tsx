import Link from "next/link";

type InteractiveElement = {
  url: string;
  isDisabled: boolean;
  backgroundUrl: string;
};

const elements: InteractiveElement[] = [
  {
    url: "spend",
    isDisabled: false,
    backgroundUrl: "https://neal.fun/link-images/spend.svg",
  },
  {
    url: "auction-game",
    isDisabled: true,
    backgroundUrl: "https://neal.fun/link-images/auction-game.svg",
  },
  {
    url: "sell-sell-sell",
    isDisabled: true,
    backgroundUrl: "https://neal.fun/link-images/sell-sell-sell.svg",
  },
];

export function Games() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {elements.map((element, index) => (
        <Link href={element.isDisabled ? "" : element.url} key={index}>
          <div
            className={`flex h-36 cursor-pointer items-center justify-center text-center ${
              element.isDisabled
                ? "cursor-not-allowed"
                : "transition-transform duration-300 hover:scale-105 hover:opacity-90"
            }`}
            aria-disabled={element.isDisabled}
          >
            <img src={element.backgroundUrl} alt={element.url} />
          </div>
        </Link>
      ))}
    </div>
  );
}
