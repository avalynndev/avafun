export function Hero() {
  return (
    <div className="mx-auto my-6 max-w-7xl">
      <div className="flex items-center justify-center">
        <section className="space-y-6 sm:py-10 lg:py-12">
          <div className="container flex max-w-screen-md flex-col items-center gap-5 text-center">
            <h1 className="text-balance text-[40px] font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl md:leading-[1.15]">
              ava{""}
              <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text pl-2 text-transparent">
                .
              </span>
              fun
            </h1>
            <p className="max-w-2xl text-balance text-muted-foreground sm:text-lg">
              tiny website made by avalynndev
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
