"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Rule from "./rule";
import { getRandomWord, getPuzzle, BLANK_CELL_NUM } from "./utils";

export default class RuleSlidingPuzzle extends Rule {
  word: string;

  constructor() {
    super("Your password must contain the solution of this sliding puzzle.");
    this.word = getRandomWord();

    this.renderItem = () => <SlidingPuzzle word={this.word} />;

    this.check = (txt: string): boolean => {
      const r = new RegExp(`${this.word}`, "i");
      return r.test(txt);
    };
  }
}

function SlidingPuzzle({ word }: { word: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const smallCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cropedImages = useRef<string[]>([]);

  const [puzzleGrid, setPuzzleGrid] = useState<number[][] | null>(null);

  function createWordImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 200px sans-serif";
    ctx.fillStyle = "#4e4e4e";
    ctx.fillText(word.toUpperCase(), 5, canvas.height - 20, canvas.width - 10);
  }

  function getCroppedImages() {
    const canvas = canvasRef.current;
    const smallCanvas = smallCanvasRef.current;
    if (!canvas || !smallCanvas) return [];

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const ctx_small = smallCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    if (!ctx || !ctx_small) return [];

    const cropped_imgs: string[] = Array(9).fill("");

    for (let i = 0; i < cropped_imgs.length; i++) {
      const x = (i % 3) * 60;
      const y = Math.floor(i / 3) * 60;
      const imgData = ctx.getImageData(x, y, 60, 60);
      ctx_small.putImageData(imgData, 0, 0);

      const data = smallCanvas.toDataURL();
      cropped_imgs[i] = data;
    }

    return cropped_imgs;
  }

  useEffect(() => {
    createWordImage();
    cropedImages.current = getCroppedImages();

    const puzzle = getPuzzle();
    setPuzzleGrid(puzzle);
  }, [word]);

  function onClick(i: number, j: number) {
    if (!puzzleGrid) return;

    const puzzleGridCopy = puzzleGrid.map((item) => item.slice());

    const neighbour_indices = [
      [i - 1, j],
      [i, j + 1],
      [i + 1, j],
      [i, j - 1],
    ];
    let update_made = false;

    for (let k = 0; k < neighbour_indices.length; k++) {
      const p = neighbour_indices[k][0];
      const q = neighbour_indices[k][1];

      if (
        p >= 0 &&
        p <= 2 &&
        q >= 0 &&
        q <= 2 &&
        puzzleGridCopy[p][q] === BLANK_CELL_NUM
      ) {
        puzzleGridCopy[p][q] = puzzleGridCopy[i][j];
        puzzleGridCopy[i][j] = BLANK_CELL_NUM;
        update_made = true;
        break;
      }
    }
    if (update_made) {
      setPuzzleGrid(puzzleGridCopy);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-2 justify-center pt-2">
      <canvas key="c1" ref={canvasRef} width={180} height={180} hidden={true} />
      <canvas
        key="c2"
        ref={smallCanvasRef}
        width={60}
        height={60}
        hidden={true}
      />

      {puzzleGrid?.map((row, i) =>
        row.map((piece, j) =>
          piece === BLANK_CELL_NUM ? (
            <div
              key={`${i},${j}`}
              className="relative box-border w-[62px] h-[62px]"
            >
              <div className="w-[62px] h-[62px]" />
            </div>
          ) : (
            <div
              key={`${i},${j}`}
              className="relative box-border w-[62px] h-[62px]"
            >
              <span className="absolute top-[1px] left-[1px] text-xs bg-yellow-200 px-1">
                {piece + 1}
              </span>
              <Image
                className="border-2 border-gray-500 w-[62px] h-[62px] hover:shadow-md hover:cursor-pointer"
                src={cropedImages.current[piece]}
                width={60}
                height={60}
                alt={`${piece}`}
                onClick={() => onClick(i, j)}
              />
            </div>
          ),
        ),
      )}
    </div>
  );
}

export { SlidingPuzzle, getRandomWord, getPuzzle };
