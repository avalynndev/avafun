"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface ReloadButtonProps {
  onClick: () => void;
  reloadsLeft?: number;
  hidden?: boolean;
}

export default function ReloadButton({
  onClick,
  reloadsLeft,
  hidden,
}: ReloadButtonProps) {
  if (!hidden && (reloadsLeft === undefined || reloadsLeft > 0)) {
    return (
      <div
        onClick={onClick}
        className="ml-auto grid grid-cols-[auto_14px] items-center p-[3px] hover:cursor-pointer hover:scale-110 transition-transform duration-150"
      >
        <ReloadIcon className="h-4 w-4" />
        <span className="text-sm font-bold self-end">x{reloadsLeft}</span>
      </div>
    );
  }
  return null;
}
