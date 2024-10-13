"use client";

import { useEffect, useRef, useState } from "react";
import {
  containerWidthDesktop,
  containerWidthMobile,
  mergeAnimationDuration,
  tileCountPerDimension,
} from "@/constant";
import { Tile as TileType } from "@/types";
import { useMediaQuery } from "react-responsive";

import { Card } from "@/components/ui/card";

export default function Tile({ position, value }: TileType) {
  const isWideScreen = useMediaQuery({ minWidth: 512 });
  const containerWidth = isWideScreen
    ? containerWidthDesktop
    : containerWidthMobile;

  const [scale, setScale] = useState(1);
  const previousValue = useRef<number>(value);
  const hasChanged = previousValue.current !== value;

  const positionToPixels = (position: number) =>
    (position / tileCountPerDimension) * containerWidth;

  useEffect(() => {
    if (hasChanged) {
      setScale(1.1);
      setTimeout(() => setScale(1), mergeAnimationDuration);
    }
  }, [hasChanged]);

  const style = {
    left: positionToPixels(position[0]),
    top: positionToPixels(position[1]),
    transform: `scale(${scale})`,
    zIndex: value,
  };

  return (
    <Card
      className={`absolute flex items-center justify-center text-4xl font-bold transition-all duration-200 ${getTileStyle(
        value,
      )} h-20 w-20`}
      style={style}
    >
      {value}
    </Card>
  );
}

const getTileStyle = (value: number) => {
  const baseStyle = "text-primary-foreground";
  switch (value) {
    case 2:
      return `${baseStyle} bg-primary/20`;
    case 4:
      return `${baseStyle} bg-primary/40`;
    case 8:
      return `${baseStyle} bg-primary/60`;
    case 16:
      return `${baseStyle} bg-primary/80`;
    case 32:
      return `${baseStyle} bg-primary`;
    case 64:
      return `${baseStyle} bg-yellow-500`; // Updated color for 64
    case 128:
      return `${baseStyle} bg-orange-500 text-3xl md:text-5xl`; // Updated color for 128
    case 256:
      return `${baseStyle} bg-red-500 text-3xl md:text-5xl`; // Updated color for 256
    case 512:
      return `${baseStyle} bg-pink-500 text-3xl md:text-5xl`; // Updated color for 512
    case 1024:
      return `${baseStyle} bg-purple-500 text-2xl md:text-4xl`; // Updated color for 1024
    case 2048:
      return `${baseStyle} bg-indigo-500 text-2xl md:text-4xl`; // Updated color for 2048
    case 4096:
      return `${baseStyle} bg-blue-500 text-2xl md:text-4xl`; // Updated color for 4096
    case 8192:
      return `${baseStyle} bg-green-500 text-2xl md:text-4xl`; // Updated color for 8192
    default:
      return baseStyle;
  }
};
