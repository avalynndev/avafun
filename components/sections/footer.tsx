"use client";

import { TwitterIcon, CoffeeIcon, GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";

export function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <Button variant="outline">
            <GithubIcon className="mr-2 h-4 w-4" /> Github
          </Button>
          <Button variant="outline">
            <TwitterIcon className="mr-2 h-4 w-4" /> Twitter
          </Button>
          <Button disabled variant="outline">
            <CoffeeIcon className="mr-2 h-4 w-4" /> Support
          </Button>
          <ModeToggle/>
        </div>
        <a href="/privacy" className="text-gray-400 hover:underline">
          Privacy policy
        </a>
      </div>
    </footer>
  );
}
