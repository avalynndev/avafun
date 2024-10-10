"use client";

import Image from "next/image";

import { geistSans } from "@/lib/fonts";
import { useAppSelector } from "@/lib/hooks";
import NumberTicker from "@/components/ui/number-ticker";
import Products from "@/components/spend/products";
import Receipt from "@/components/spend/receipt";

export default function Spend() {
  const currentMoney = useAppSelector(
    (state: any) => state.product.currentMoney,
  );

  return (
    <main
      className={`${geistSans.className} mx-auto flex max-w-6xl flex-col items-center pt-10`}
    >
      <div className="text-balance pb-10">
        <a href="/" className="text-gray-400 hover:underline">
          Home
        </a>
      </div>
      <main className="w-full rounded-t-lg border p-4 py-12 shadow-lg">
        <div className="mb-6 text-center">
          <Image
            src="https://neal.fun/spend/billgates.jpg"
            alt="Profile picture"
            width={150}
            height={150}
            className="mx-auto mb-4 rounded-full"
          />
          <h2 className="mb-4 text-3xl font-bold">
            Spend Bill Gates&apos; Money
          </h2>
        </div>
      </main>
      <div className="z-sticky fixed sticky inset-x-0 top-0 z-50 my-2 flex h-20 w-full items-center justify-center rounded-b-md bg-green-400 text-white shadow-md">
        <p className="text-4xl font-medium">
          $ <NumberTicker className="text-white" value={currentMoney} />
        </p>
      </div>
      <div className="flex justify-center">
        <Products />
      </div>
      <div className="w-full py-8">
        <Receipt />
      </div>
    </main>
  );
}
