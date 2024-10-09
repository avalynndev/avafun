import React, { useEffect, useState } from "react";
import { updateCount } from "@/redux/productSlicer";



import { useAppDispatch, useAppSelector } from "@/lib/hooks";
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

  return (
    <Card className="flex size-full flex-col items-center border border-gray-200 p-4 text-black dark:bg-blue-50">
      <img src={item.image} alt={item.productName} className="m-auto" />
      <p className="text-xl font-bold">{item.productName}</p>
      <p>${item.productPrice}</p>
      <div className="mt-4 flex items-center space-x-4">
        <Button
          className="h-10 w-24 bg-red-500"
          disabled={!isSellable}
          variant="destructive"
          onClick={sell}
        >
          Sell
        </Button>
        <Input
          type="number"
          className="h-10 w-20 border border-gray-300 text-center"
          value={count}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
        <Button
          className="h-10 w-24"
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