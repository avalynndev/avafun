"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CoinContext = createContext<any>(null);

export function CoinProvider({ children }: { children: React.ReactNode }) {
  const [coins, setCoins] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCoins = localStorage.getItem("coins");
    if (savedCoins) {
      setCoins(Number(savedCoins));
    } else {
      setCoins(200);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (coins !== null) {
      localStorage.setItem("coins", coins.toString());
    }
  }, [coins]);

  const spendCoins = (amount: number) => {
    if (coins !== null && coins >= amount) {
      setCoins((prev) => (prev ?? 0) - amount);
      return true;
    }
    return false;
  };

  const addCoins = (amount: number) => setCoins((prev) => (prev ?? 0) + amount);

  const removeCoins = (amount: number) =>
    setCoins((prev) => (prev ?? 0) - amount);

  return (
    <CoinContext.Provider
      value={{ coins, spendCoins, removeCoins, addCoins, loading }}
    >
      {children}
    </CoinContext.Provider>
  );
}

export function useCoins() {
  return useContext(CoinContext);
}
