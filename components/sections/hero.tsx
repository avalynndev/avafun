import Image from "next/image";

export function Hero() {
  return (
    <div className="mx-auto my-4 max-w-7xl items-center justify-center text-center">
      <section className="py-10">
        <div className="mx-auto max-w-3xl">
          <Image
            src="/logo.svg"
            alt="logo"
            height={82}
            width={200}
            className="mx-auto"
          />
        </div>
        <p className="mx-auto max-w-3xl text-balance text-muted-foreground sm:text-lg">
          a tiny website by avalynndev
        </p>
      </section>
    </div>
  );
}
