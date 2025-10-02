"use client";

import { Suspense } from "react";
import GamePage from "./game";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div>
          <ReloadIcon className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <GamePage />
    </Suspense>
  );
}
