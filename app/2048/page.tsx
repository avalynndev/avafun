import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Board from "@/components/2048/board";
import GameProvider from "@/components/2048/game-context";
import Score from "@/components/2048/score";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <GameProvider>
        <Card className="bg-background/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-4xl font-bold">2048</CardTitle>
            <Score />
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Board />
          </CardContent>
        </Card>

        <footer className="mt-8 text-center font-semibold md:flex md:flex-row-reverse md:items-center md:text-left">
          <div className="mb-4 flex justify-center md:mb-0 md:justify-end">
            <a
              href="https://github.com/hakamraza/nextjs-2048-game"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Image
                src="social-github.svg"
                alt="2048-in-react on GitHub"
                width={32}
                height={32}
                className="m-2 align-middle md:ml-4 md:mr-0"
              />
            </a>
          </div>
          <p className="text-sm text-muted-foreground md:mr-4">
            Created with Next.js and shadcn/ui
          </p>
        </footer>
      </GameProvider>
    </div>
  );
}
