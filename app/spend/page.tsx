import Link from "next/link";

import Products from "@/components/spend/products";
import Receipt from "@/components/spend/receipt";

export default function Spend() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center pt-10">
      <Link href="/">
        <h1 className="text-balance pb-10 text-[40px] font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl md:leading-[1.15]">
          ava{""}
          <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text pl-2 text-transparent">
            .
          </span>
          fun
        </h1>
      </Link>
      <main className="w-full rounded-lg border p-4 py-12 shadow-lg">
        <div className="mb-6 text-center">
          <img
            src="https://neal.fun/spend/billgates.jpg"
            alt="Profile picture"
            width={100}
            height={100}
            className="mx-auto mb-4 rounded-full"
          />
          <h2 className="mb-4 text-4xl font-bold">
            Spend Bill Gates&apos; Money
          </h2>
        </div>
      </main>
      <div className="flex justify-center">
        <Products />
      </div>
      <div className="py-8">
        <Receipt />
      </div>
    </main>
  );
}
