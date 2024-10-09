"use client";

import { useAppSelector } from "@/lib/hooks";
import { Card } from "@/components/ui/card";

function Receipt() {
  const items = useAppSelector((state) => state.product.items);
  const filtered = items.filter((item) => Number(item.count) > 0);
  let spendMoney = 0;

  filtered.forEach((item) => {
    spendMoney += Number(item.productPrice) * Number(item.count);
  });

  if (filtered.length === 0) {
    return null;
  }
  const formatNumber = (num: number): string => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + "B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + "M";
    }
    return num.toString();
  };

  return (
    <Card className="gap-4 p-4">
      <h2 className="pb-4 text-2xl font-bold">Your Receipt</h2>
      <div className="space-y-2">
        {filtered.map((item) => (
          <Card key={item.id} className="grid grid-cols-3 gap-4 p-2">
            <div className="col-span-1">
              <p className="text-sm">{item.productName}</p>
            </div>
            <div className="col-span-1">
              <p>x {item.count}</p>
            </div>
            <div className="col-span-1">
              <p className="text-green-600">
                $ {formatNumber(Number(item.productPrice) * Number(item.count))}
              </p>
            </div>
          </Card>
        ))}
      </div>
      <div className="col-span-3 my-4 border-t"></div>
      <div className="col-span-2 text-lg font-bold">TOTAL</div>
      <div className="col-span-1 text-right text-lg font-bold text-green-500">
        $ {spendMoney}
      </div>
    </Card>
  );
}

export default Receipt;
