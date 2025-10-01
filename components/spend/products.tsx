"use client";

import { useAppSelector } from "@/hooks/spend";
import Product from "@/components/spend/product";

function Products() {
  const items = useAppSelector((state: any) => state.product.items);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item: any) => (
        <Product key={item.id} id={item.id} />
      ))}
    </div>
  );
}

export default Products;
