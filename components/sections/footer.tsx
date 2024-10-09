"use client";

import { CoffeeIcon, GithubIcon, TwitterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Footer() {
  return (
    <footer className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button variant="outline">
            <GithubIcon className="mr-2 size-4" /> Github
          </Button>
          <Button variant="outline">
            <TwitterIcon className="mr-2 size-4" /> Twitter
          </Button>
          <Button disabled variant="outline">
            <CoffeeIcon className="mr-2 size-4" /> Support
          </Button>
          <ModeToggle />
        </div>
        <a href="/privacy" className="text-gray-400 hover:underline">
          Privacy policy
        </a>
      </div>
    </footer>
  );
}
