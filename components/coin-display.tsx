"use client";
import { useCoins } from "@/components/coin-context";
import { ReloadIcon } from "@radix-ui/react-icons";

export function CoinDisplay() {
  const { coins, loading } = useCoins();

  return (
    <div className="fixed top-4 z-1000 lg:bg-transparent sm:bg-background right-4 flex items-center gap-2 rounded-full px-4 py-2 font-semibold border shadow-lg">
      {loading ? (
        <>
          🪙{" "}
          <ReloadIcon className="h-4 w-4 animate-spin text-muted-foreground" />
        </>
      ) : (
        <>
          🪙
          <span>{coins}</span>
        </>
      )}
    </div>
  );
}
