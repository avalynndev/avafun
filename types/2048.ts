export type Cell = {
  id: string;
  value: number;
  x: number;
  y: number;
  isNew?: boolean;
  isMerged?: boolean;
};

export type Grid = (Cell | null)[][];

export type Direction = "up" | "down" | "left" | "right";

export type GameState = {
  grid: Grid;
  score: number;
  bestScore: number;
  isGameOver: boolean;
  hasWon: boolean;
};

export type CloudinaryLoaderProps = {
  src: string;
  width: number;
  quality?: number | string;
};
