"use client";

import { useCallback, useContext, useEffect, useRef } from "react";
import { Tile as TileType } from "@/types";

import { Card } from "@/components/ui/card";
import { GameContext } from "@/components/2048/game-context";
import MobileSwiper, { SwipeInput } from "@/components/2048/mobile-swipe";
import Tile from "@/components/2048/tile";

export default function Board() {
  const { getTiles, moveTiles, startGame } = useContext(GameContext);
  const initialized = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.code) {
        case "ArrowUp":
          moveTiles("move_up");
          break;
        case "ArrowDown":
          moveTiles("move_down");
          break;
        case "ArrowLeft":
          moveTiles("move_left");
          break;
        case "ArrowRight":
          moveTiles("move_right");
          break;
      }
    },
    [moveTiles],
  );

  const handleSwipe = useCallback(
    ({ deltaX, deltaY }: SwipeInput) => {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          moveTiles("move_right");
        } else {
          moveTiles("move_left");
        }
      } else {
        if (deltaY > 0) {
          moveTiles("move_down");
        } else {
          moveTiles("move_up");
        }
      }
    },
    [moveTiles],
  );

  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const totalCellsCount = 10;

    for (let index = 0; index < totalCellsCount; index += 1) {
      cells.push(
        <div
          className="m-1 h-16 w-16 rounded-md bg-none md:m-2 md:h-24 md:w-24"
          key={index}
        />,
      );
    }
    return cells;
  };

  const renderTiles = () => {
    return getTiles().map((tile: TileType) => (
      <Tile key={`${tile.id}`} {...tile} />
    ));
  };

  useEffect(() => {
    if (!initialized.current) {
      startGame();
      initialized.current = true;
    }
  }, [startGame]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <MobileSwiper onSwipe={handleSwipe}>
      <Card className="bg-secondary p-2 md:p-4">
        <div className="relative w-[calc(16rem+1.25rem)] md:w-[calc(24rem+2.5rem)]">
          {renderTiles()}
          <div className="flex flex-wrap rounded-lg">{renderGrid()}</div>
        </div>
      </Card>
    </MobileSwiper>
  );
}
