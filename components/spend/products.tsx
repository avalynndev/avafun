"use client";
import Product from "@/components/spend/product";
import { useAppSelector } from "@/lib/hooks";
import NumberTicker from "@/components/ui/number-ticker";

function Products() {
  const items = useAppSelector((state: any) => state.product.items);
  const currentMoney = useAppSelector(
    (state: any) => state.product.currentMoney
  );

  return (
    <div>
      <div className="z-sticky sticky top-0 mb-4 mt-2 flex h-20 items-center justify-center bg-green-400 text-white opacity-100">
        <p className="text-4xl font-medium">
          $ <NumberTicker className="text-white" value={currentMoney} />
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {items.map((item: any) => (
          <Product key={item.id} id={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Products;
