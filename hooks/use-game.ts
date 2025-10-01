"use client";

import { useCallback, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  type Cell,
  type Grid,
  type Direction,
  type GameState,
} from "@/types/2048";

const GRID_SIZE = 4;
const WINNING_VALUE = 2048;

function createEmptyGrid(): Grid {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));
}

function generateRandomCell(grid: Grid): Cell | null {
  const emptyCells: [number, number][] = [];
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (!cell) emptyCells.push([i, j]);
    });
  });

  if (emptyCells.length === 0) return null;
  const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  return {
    id: uuidv4(),
    value: Math.random() < 0.9 ? 2 : 4,
    x,
    y,
    isNew: true,
  };
}

function transpose(grid: Grid): Grid {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
}

function reverse(grid: Grid): Grid {
  return grid.map((row) => [...row].reverse());
}

function compress(grid: Grid): Grid {
  const newGrid = createEmptyGrid();

  for (let i = 0; i < GRID_SIZE; i++) {
    let colIndex = 0;
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j]) {
        newGrid[i][colIndex] = grid[i][j];
        colIndex++;
      }
    }
  }

  return newGrid;
}

function merge(grid: Grid): { newGrid: Grid; score: number; merged: boolean } {
  const newGrid = createEmptyGrid();
  let score = 0;
  let merged = false;

  for (let i = 0; i < GRID_SIZE; i++) {
    let colIndex = 0;
    for (let j = 0; j < GRID_SIZE - 1; j++) {
      if (!grid[i][j]) continue;

      if (grid[i][j]?.value === grid[i][j + 1]?.value) {
        const mergedValue = grid[i][j]!.value * 2;
        newGrid[i][colIndex] = {
          id: uuidv4(),
          value: mergedValue,
          x: i,
          y: colIndex,
          isMerged: true,
        };
        score += mergedValue;
        merged = true;
        j++; // Skip next cell as it's been merged
      } else {
        newGrid[i][colIndex] = {
          ...grid[i][j]!,
          id: uuidv4(),
          x: i,
          y: colIndex,
          isMerged: false,
        };
      }
      colIndex++;
    }
    // Handle the last cell if it wasn't merged
    if (
      grid[i][GRID_SIZE - 1] &&
      colIndex < GRID_SIZE &&
      !grid[i][GRID_SIZE - 1]?.isMerged
    ) {
      newGrid[i][colIndex] = {
        ...grid[i][GRID_SIZE - 1]!,
        id: uuidv4(),
        x: i,
        y: colIndex,
        isMerged: false,
      };
    }
  }

  return { newGrid, score, merged };
}

function areGridsEqual(grid1: Grid, grid2: Grid): boolean {
  for (let i = 0; i < grid1.length; i++) {
    for (let j = 0; j < grid1[i].length; j++) {
      if (grid1[i][j]?.value !== grid2[i][j]?.value) {
        return false;
      }
    }
  }
  return true;
}

function moveGrid(
  grid: Grid,
  direction: Direction,
): { newGrid: Grid; score: number; moved: boolean } {
  let workingGrid = [...grid.map((row) => [...row])];
  let score = 0;
  let moved = false;

  // First, handle rotations based on direction
  switch (direction) {
    case "up":
      workingGrid = transpose(workingGrid);
      break;
    case "down":
      workingGrid = reverse(transpose(workingGrid));
      break;
    case "right":
      workingGrid = reverse(workingGrid);
      break;
    // 'left' needs no rotation
  }

  // Compress (move all tiles to the left)
  const compressedGrid = compress(workingGrid);
  moved = !areGridsEqual(compressedGrid, workingGrid);

  // Merge
  const {
    newGrid: mergedGrid,
    score: mergeScore,
    merged,
  } = merge(compressedGrid);
  moved = moved || merged;
  score += mergeScore;

  // Compress again after merging
  workingGrid = compress(mergedGrid);

  // Rotate back
  switch (direction) {
    case "up":
      workingGrid = transpose(workingGrid);
      break;
    case "down":
      workingGrid = transpose(reverse(workingGrid));
      break;
    case "right":
      workingGrid = reverse(workingGrid);
      break;
    // 'left' needs no rotation
  }

  return { newGrid: workingGrid, score, moved };
}

type GameAction =
  | { type: "UPDATE_GAME_STATE"; payload: GameState }
  | { type: "RESET_GAME"; payload: GameState };

// Add the initial state
const initialState: GameState = (() => {
  const initialGrid = createEmptyGrid();
  const cell1 = generateRandomCell(initialGrid);
  if (cell1) initialGrid[cell1.x][cell1.y] = cell1;
  const cell2 = generateRandomCell(initialGrid);
  if (cell2) initialGrid[cell2.x][cell2.y] = cell2;

  return {
    grid: initialGrid,
    score: 0,
    bestScore:
      typeof window !== "undefined"
        ? parseInt(localStorage.getItem("bestScore") || "0")
        : 0,
    isGameOver: false,
    hasWon: false,
  };
})();

// Add the reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "UPDATE_GAME_STATE":
    case "RESET_GAME":
      return action.payload;
    default:
      return state;
  }
}

export function useGame() {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const move = useCallback(
    (direction: Direction) => {
      if (gameState.isGameOver) return;

      const { newGrid, score, moved } = moveGrid(gameState.grid, direction);

      if (!moved) return;

      const newCell = generateRandomCell(newGrid);
      if (newCell) {
        newGrid[newCell.x][newCell.y] = newCell;
      }

      const newScore = gameState.score + score;
      const newBestScore = Math.max(newScore, gameState.bestScore);
      if (newBestScore > gameState.bestScore) {
        localStorage.setItem("bestScore", newBestScore.toString());
      }

      const hasWon = newGrid.some((row) =>
        row.some((cell) => cell?.value === WINNING_VALUE),
      );
      const canMove = checkForPossibleMoves(newGrid);

      dispatch({
        type: "UPDATE_GAME_STATE",
        payload: {
          grid: newGrid,
          score: newScore,
          bestScore: newBestScore,
          isGameOver: !canMove,
          hasWon,
        },
      });
    },
    [gameState],
  );

  const checkForPossibleMoves = useCallback((grid: Grid): boolean => {
    // Check for empty cells
    if (grid.some((row) => row.some((cell) => !cell))) return true;

    // Check for possible merges in rows and columns
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE - 1; j++) {
        // Check horizontal merges
        if (grid[i][j]?.value === grid[i][j + 1]?.value) return true;
        // Check vertical merges
        if (grid[j][i]?.value === grid[j + 1][i]?.value) return true;
      }
    }

    return false;
  }, []);

  const resetGame = useCallback(() => {
    const initialGrid = createEmptyGrid();
    const cell1 = generateRandomCell(initialGrid);
    if (cell1) initialGrid[cell1.x][cell1.y] = cell1;
    const cell2 = generateRandomCell(initialGrid);
    if (cell2) initialGrid[cell2.x][cell2.y] = cell2;

    dispatch({
      type: "RESET_GAME",
      payload: {
        grid: initialGrid,
        score: 0,
        bestScore: gameState.bestScore,
        isGameOver: false,
        hasWon: false,
      },
    });
  }, [gameState.bestScore]);

  return {
    gameState,
    move,
    resetGame,
    setGameState: (updater: (prev: GameState) => GameState) => {
      const newState = updater(gameState);
      dispatch({ type: "UPDATE_GAME_STATE", payload: newState });
    },
  };
}

// code copied from public 2048 nextjs github.
