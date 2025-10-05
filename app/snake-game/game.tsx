"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";

import useInterval from "@use-it/interval";
import { useCoins } from "@/components/coin-context";

import { Button } from "@/components/ui/button";
import { geistSans } from "@/lib/fonts";

type Apple = { x: number; y: number };
type Velocity = { dx: number; dy: number };

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function GamePage() {
  const { addCoins } = useCoins();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [valid, setValid] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWidth = 500;
  const canvasHeight = 380;
  const canvasGridSize = 20;

  const minGameSpeed = 10;
  const maxGameSpeed = 15;

  const [gameDelay, setGameDelay] = useState<number>(1000 / minGameSpeed);
  const [countDown, setCountDown] = useState<number>(4);
  const [running, setRunning] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const [newHighscore, setNewHighscore] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState<{
    head: { x: number; y: number };
    trail: Array<any>;
  }>({
    head: { x: 12, y: 9 },
    trail: [],
  });
  const [apple, setApple] = useState<Apple>({ x: -1, y: -1 });
  const [velocity, setVelocity] = useState<Velocity>({ dx: 0, dy: 0 });
  const [previousVelocity, setPreviousVelocity] = useState<Velocity>({
    dx: 0,
    dy: 0,
  });

  useEffect(() => {
    const key = searchParams.get("key");
    const storedKey = sessionStorage.getItem(`snake-game-session`);
    if (key && storedKey && key === storedKey) {
      setValid(true);
      sessionStorage.removeItem(`snake-game-session`);
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  const clearCanvas = (ctx: CanvasRenderingContext2D) =>
    ctx.clearRect(-1, -1, canvasWidth + 2, canvasHeight + 2);

  const generateApplePosition = (): Apple => {
    const x = Math.floor(Math.random() * (canvasWidth / canvasGridSize));
    const y = Math.floor(Math.random() * (canvasHeight / canvasGridSize));
    if (
      (snake.head.x === x && snake.head.y === y) ||
      snake.trail.some((part) => part.x === x && part.y === y)
    ) {
      return generateApplePosition();
    }
    return { x, y };
  };

  const startGame = () => {
    setGameDelay(1000 / minGameSpeed);
    setIsLost(false);
    setScore(0);
    setSnake({ head: { x: 12, y: 9 }, trail: [] });
    setApple(generateApplePosition());
    setVelocity({ dx: 0, dy: -1 });
    setRunning(true);
    setNewHighscore(false);
    setCountDown(3);
  };

  const gameOver = () => {
    if (score > highscore) {
      setHighscore(score);
      localStorage.setItem("highscore", score.toString());
      setNewHighscore(true);
    }
    addCoins(score);
    setIsLost(true);
    setRunning(false);
    setVelocity({ dx: 0, dy: 0 });
    setCountDown(4);
  };

  const fillRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
  ) => ctx.fillRect(x, y, w, h);

  const strokeRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
  ) => ctx.strokeRect(x + 0.5, y + 0.5, w, h);

  const drawSnake = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#22c55e";
    ctx.strokeStyle = "#166534";

    ctx.beginPath();
    ctx.roundRect(
      snake.head.x * canvasGridSize,
      snake.head.y * canvasGridSize,
      canvasGridSize,
      canvasGridSize,
      6,
    );
    ctx.fill();
    ctx.stroke();

    snake.trail.forEach((part, i) => {
      ctx.beginPath();
      ctx.roundRect(
        part.x * canvasGridSize,
        part.y * canvasGridSize,
        canvasGridSize,
        canvasGridSize,
        i === 0 ? 6 : 3,
      );
      ctx.fill();
      ctx.stroke();
    });
  };

  const drawApple = (ctx: CanvasRenderingContext2D) => {
    if (apple) {
      ctx.font = `${canvasGridSize}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "🍎",
        apple.x * canvasGridSize + canvasGridSize / 2,
        apple.y * canvasGridSize + canvasGridSize / 2,
      );
    }
  };

  const updateSnake = () => {
    const nextHead = {
      x: snake.head.x + velocity.dx,
      y: snake.head.y + velocity.dy,
    };
    if (
      nextHead.x < 0 ||
      nextHead.y < 0 ||
      nextHead.x >= canvasWidth / canvasGridSize ||
      nextHead.y >= canvasHeight / canvasGridSize
    ) {
      gameOver();
    }
    if (nextHead.x === apple.x && nextHead.y === apple.y) {
      setScore((s) => s + 1);
      setApple(generateApplePosition());
    }
    const newTrail = [...snake.trail, { ...snake.head }];
    while (newTrail.length > score + 2) newTrail.shift();
    if (newTrail.some((part) => part.x === nextHead.x && part.y === nextHead.y))
      gameOver();
    setPreviousVelocity({ ...velocity });
    setSnake({ head: nextHead, trail: newTrail });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && !isLost) {
      clearCanvas(ctx);
      drawApple(ctx);
      drawSnake(ctx);
    }
  }, [snake]);

  useInterval(
    () => !isLost && updateSnake(),
    running && countDown === 0 ? gameDelay : null,
  );
  useInterval(
    () => setCountDown((c) => c - 1),
    countDown > 0 && countDown < 4 ? 800 : null,
  );

  useEffect(() => {
    setHighscore(
      localStorage.getItem("highscore")
        ? parseInt(localStorage.getItem("highscore")!)
        : 0,
    );
  }, []);

  useEffect(() => {
    if (score > minGameSpeed && score <= maxGameSpeed)
      setGameDelay(1000 / score);
  }, [score]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dirs: Record<string, Velocity> = {
        ArrowRight: { dx: 1, dy: 0 },
        d: { dx: 1, dy: 0 },
        ArrowLeft: { dx: -1, dy: 0 },
        a: { dx: -1, dy: 0 },
        ArrowDown: { dx: 0, dy: 1 },
        s: { dx: 0, dy: 1 },
        ArrowUp: { dx: 0, dy: -1 },
        w: { dx: 0, dy: -1 },
      };
      if (dirs[e.key]) {
        const vel = dirs[e.key];
        if (
          !(
            previousVelocity.dx + vel.dx === 0 &&
            previousVelocity.dy + vel.dy === 0
          )
        ) {
          setVelocity(vel);
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [previousVelocity]);
  if (!valid) return null;

  return (
    <motion.main
      className={`${geistSans.className} mx-auto flex max-w-4xl flex-col items-center px-4 pt-10`}
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div className="mb-6" variants={fadeInUp}>
        <Link href="/">
          <Button variant="link">← Back Home</Button>
        </Link>
      </motion.div>

      <motion.div
        className="w-full rounded-t-lg border p-4 py-6 shadow-lg sm:py-12"
        variants={fadeInUp}
      >
        <div className="text-center">
          <motion.h2
            className="text-2xl font-bold sm:text-3xl"
            variants={fadeInUp}
          >
            Snake Game
          </motion.h2>
          <motion.p className="mt-2 text-sm text-gray-500" variants={fadeInUp}>
            Eat apples to grow longer and earn{" "}
            <span className="font-semibold">1 coin</span> per apple. Don’t crash
            into walls or yourself!
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="py-8 flex flex-col items-center w-full"
        variants={fadeInUp}
      >
        <div className="relative rounded-lg overflow-hidden shadow-xl border-2">
          <canvas
            ref={canvasRef}
            width={canvasWidth + 1}
            height={canvasHeight + 1}
            className="block"
            style={{
              background: `
                linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                 var(--color-muted)
              `,
              backgroundSize: `${canvasGridSize}px ${canvasGridSize}px`,
            }}
          />

          {countDown > 0 && countDown < 4 && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <motion.div
                key={countDown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="text-8xl font-bold"
              >
                {countDown}
              </motion.div>
            </div>
          )}

          {isLost && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-4 p-6"
              >
                <h3 className="text-4xl font-bold">Game Over!</h3>
                <div className="text-xl">
                  {newHighscore ? (
                    <p className="text-2xl font-semibold">
                      🎉 New Highscore: {score} 🎉
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      Final Score:{" "}
                      <span className="font-bold text-foreground text-2xl">
                        {score}
                      </span>
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {isLost && (
          <motion.div
            className="mt-6 text-center w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button onClick={startGame} size="lg" className="w-full">
              Play Again
            </Button>
          </motion.div>
        )}

        {!isLost && countDown === 4 ? (
          <motion.div
            className="mt-6 text-center w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button onClick={startGame} size="lg" className="w-full">
              Start Game
            </Button>
          </motion.div>
        ) : !isLost && countDown === 0 ? (
          <></>
        ) : null}

        <motion.section
          className="mt-6 text-center w-full max-w-md"
          variants={fadeInUp}
        >
          <div className="flex justify-center gap-8 mb-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              <span className="text-muted-foreground">Score:</span>
              <span>{score}</span>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FontAwesomeIcon icon={faTrophy} className="text-amber-600" />
              <span className="text-muted-foreground">Best:</span>
              <span>{highscore > score ? highscore : score}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground pb-4">
            Use Arrow Keys or WASD to move
          </p>
        </motion.section>
      </motion.div>
    </motion.main>
  );
}
