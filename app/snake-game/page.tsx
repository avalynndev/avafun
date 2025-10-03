"use client";

import { Suspense } from "react";
import GamePage from "./game";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <ReloadIcon className="h-12 w-12 animate-spin text-foreground" />
        </div>
      }
    >
      <GamePage />
    </Suspense>
  );
}
