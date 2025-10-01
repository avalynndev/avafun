import React, { useEffect, useState } from "react";
import Image from "next/image";
import { updateCount } from "@/redux/productSlicer";

import { useAppDispatch, useAppSelector } from "@/hooks/spend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function Product({ id }: { id: string }) {
  const items = useAppSelector((state: any) => state.product.items);
  const currentMoney = useAppSelector((state) => state.product.currentMoney);

  const item = items.find((tmp: any) => tmp.id === id);

  const [count, setCount] = useState<number>(item.count);
  const [isBuyable, setIsBuyable] = useState<boolean>(true);
  const [isSellable, setIsSellable] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const maximumBuy = Math.floor(currentMoney / item.productPrice);
  const maximum = Number(count) + Number(maximumBuy);
  const controlSellable = (count: number): boolean => {
    return count > 0;
  };

  useEffect(() => {
    dispatch(updateCount({ id: item.id, count }));

    setIsSellable(controlSellable(count));
  }, [count, dispatch, item]);

  useEffect(() => {
    if (item.productPrice <= currentMoney) {
      setIsBuyable(true);
    } else {
      setIsBuyable(false);
    }
  }, [currentMoney, item]);

  const buy = () => {
    handleChange(Number(count) + 1);
  };

  const sell = () => {
    handleChange(Number(count) - 1);
  };

  const handleChange = (value: number) => {
    if (value > maximum && currentMoney > 0) {
      setCount(maximum);
    } else if (value < 0) {
      setCount(0);
    } else if (currentMoney === 0 && value < count) {
      setCount(value);
    } else {
      setCount(value);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    } else if (num >= 1e6) {
      return (
        (num / 1e6)
          .toFixed(2)
          .replace(/\.00$/, "")
          .replace(/(\.\d)0$/, "$1") + "M"
      );
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toLocaleString();
  };

  return (
    <Card className="flex w-full flex-col items-center border border-gray-200 p-4 text-black dark:bg-blue-50">
      <div className="relative h-32 w-32 sm:h-40 sm:w-40">
        <Image
          src={item.image}
          alt={item.productName}
          fill
          className="m-auto object-contain"
        />
      </div>
      <p className="mt-4 text-lg font-bold sm:text-xl">{item.productName}</p>
      <p className="mt-2 text-lg sm:text-xl">
        ${formatNumber(item.productPrice)}
      </p>
      <div className="mt-4 flex w-full flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0">
        <Button
          className="h-10 w-full bg-red-500 sm:w-24 hover:bg-red-500/70"
          disabled={!isSellable}
          variant="destructive"
          onClick={sell}
        >
          Sell
        </Button>
        <Input
          type="number"
          className="h-10 w-full border border-gray-300 text-center sm:w-20"
          value={count}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
        <Button
          className="h-10 w-full sm:w-24 bg-green-500 hover:bg-green-500/70"
          disabled={!isBuyable}
          variant="default"
          onClick={buy}
        >
          Buy
        </Button>
      </div>
    </Card>
  );
}

export default Product;
