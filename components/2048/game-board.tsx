"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tile } from "./tile";
import { useGame } from "@/hooks/use-game";
import { type Direction, type Cell } from "@/types/2048";
import { useCoins } from "../coin-context";

const GameBoard = () => {
  const { gameState, move, resetGame, setGameState } = useGame();
  const { addCoins } = useCoins();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [coinsAwarded, setCoinsAwarded] = useState(false);
  const [wonCoinsAwarded, setWonCoinsAwarded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyToDirection: { [key: string]: Direction } = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        KeyW: "up",
        KeyS: "down",
        KeyA: "left",
        KeyD: "right",
      };

      const direction = keyToDirection[e.code];
      if (direction) {
        e.preventDefault();
        move(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  useEffect(() => {
    if (gameState.isGameOver && !coinsAwarded) {
      const coinsEarned = Math.floor(gameState.score / 100);
      addCoins(coinsEarned);
      setCoinsAwarded(true);
    }

    if (!gameState.isGameOver) {
      setCoinsAwarded(false);
    }
  }, [gameState.isGameOver, gameState.score, addCoins, coinsAwarded]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => move("left"),
    onSwipedRight: () => move("right"),
    onSwipedUp: () => move("up"),
    onSwipedDown: () => move("down"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleNewGame = () => {
    if (gameState.score > 0) {
      setShowResetConfirm(true);
    } else {
      resetGame();
    }
  };

  useEffect(() => {
    if (gameState.hasWon && !wonCoinsAwarded) {
      addCoins(500);
      setWonCoinsAwarded(true);
    }

    if (!gameState.hasWon) {
      setWonCoinsAwarded(false);
    }
  }, [gameState.hasWon, addCoins, wonCoinsAwarded]);

  return (
    <div
      role="grid"
      aria-label="2048 Game Board"
      className="flex flex-1 flex-col items-center justify-center mt-8 md:mt-0 transition-colors duration-300 sm:z-50"
      {...swipeHandlers}
    >
      <div className="w-[calc(85vw+28px)] xsm:w-[332px] md:w-[432px] flex justify-between mb-4 sm:mb-3">
        <Button
          variant="outline"
          className="h-full max-h-14 select-none"
          onClick={handleNewGame}
        >
          New Game
        </Button>
        <Card className="flex flex-col items-center justify-center h-14 p-2">
          <CardContent className="flex items-center justify-center gap-2 p-0">
            <div className="flex flex-col items-center justify-center">
              <div className="text-muted-foreground text-sm select-none">
                SCORE
              </div>
              <div className="text-foreground text-xl font-bold select-none">
                {gameState.score}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-muted-foreground text-sm select-none">
                BEST
              </div>
              <div className="text-foreground text-xl font-bold select-none">
                {gameState.bestScore}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-2 mb-2 shadow-xl">
        <CardContent className="p-2 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-2 w-[85vw] h-[85vw+4px] xsm:w-[300px] xsm:h-[300px] md:w-[400px] md:h-[400px] justify-items-center items-center">
            {gameState.grid.map((row: (Cell | null)[], i: number) =>
              row.map((cell: Cell | null, j: number) => (
                <div
                  key={`${i}-${j}`}
                  className="bg-muted-foreground/20 rounded-lg relative w-[calc(80vw/4)] h-[calc(80vw/4)] xsm:w-[65px] xsm:h-[65px] md:w-[85px] md:h-[85px]"
                >
                  {cell && (
                    <Tile
                      value={cell.value}
                      isNew={cell.isNew}
                      isMerged={cell.isMerged}
                    />
                  )}
                </div>
              )),
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={gameState.isGameOver || gameState.hasWon}
        onOpenChange={() => {}}
      >
        <DialogContent className="w-fit">
          <DialogHeader>
            <DialogTitle>
              {gameState.hasWon ? "Congratulations! 🎉" : "Game Over! 😢"}
            </DialogTitle>
            <DialogDescription>
              {gameState.hasWon ? (
                <span>
                  You&apos;ve reached{" "}
                  <span className="font-semibold text-teal-500">2048</span>!
                </span>
              ) : (
                "No more moves available. Try again?"
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={resetGame}>
              New Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
        <DialogContent className="w-fit">
          <DialogHeader>
            <DialogTitle>Start New Game?</DialogTitle>
            <DialogDescription>
              Your current game progress will be lost. Are you sure you want to
              start a new game?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowResetConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                resetGame();
                setShowResetConfirm(false);
              }}
            >
              Start New Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameBoard;
