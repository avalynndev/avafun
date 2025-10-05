"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { geistSans } from "@/lib/fonts";
import { useRef, useCallback } from "react";
import { Bird, Trophy, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCoins } from "@/components/coin-context";

interface Pipe {
  x: number;
  topHeight: number;
  gap: number;
  passed: boolean;
}
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function GamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addCoins } = useCoins();
  const [rewarded, setRewarded] = useState(false);
  const [valid, setValid] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const birdY = useRef(250);
  const birdVelocity = useRef(0);
  const pipes = useRef<Pipe[]>([]);
  const animationFrameId = useRef<number>(0);
  const lastPipeTime = useRef(0);

  const GRAVITY = 0.5;
  const JUMP_STRENGTH = -9;
  const BIRD_SIZE = 40;
  const PIPE_WIDTH = 80;
  const PIPE_GAP = 220;
  const PIPE_SPEED = 3;
  const PIPE_INTERVAL_MIN = 1800;
  const PIPE_INTERVAL_MAX = 2400;

  useEffect(() => {
    const stored = localStorage.getItem("flappyBirdHighScore");
    if (stored) setHighScore(parseInt(stored));
  }, []);

  const resetGame = useCallback(() => {
    birdY.current = 250;
    birdVelocity.current = 0;
    pipes.current = [];
    lastPipeTime.current = 0;
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setRewarded(false);
  }, []);

  const jump = useCallback(() => {
    if (gameOver) return;

    if (!gameStarted) {
      setGameStarted(true);
    }

    birdVelocity.current = JUMP_STRENGTH;
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameOver && !rewarded && score > 0) {
      addCoins(score);
      setRewarded(true);
    }
  }, [gameOver, rewarded, score, addCoins]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    const handleClick = () => {
      jump();
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleClick);
    };
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateGame = (timestamp: number) => {
      if (!gameStarted || gameOver) {
        animationFrameId.current = requestAnimationFrame(updateGame);
        return;
      }

      birdVelocity.current += GRAVITY;
      birdY.current += birdVelocity.current;

      if (birdY.current < 0) birdY.current = 0;
      if (birdY.current > canvas.height - BIRD_SIZE) {
        setGameOver(true);
        const newHighScore = Math.max(score, highScore);
        setHighScore(newHighScore);
        localStorage.setItem("flappyBirdHighScore", newHighScore.toString());
        return;
      }

      const currentInterval =
        PIPE_INTERVAL_MIN +
        Math.random() * (PIPE_INTERVAL_MAX - PIPE_INTERVAL_MIN);

      if (timestamp - lastPipeTime.current > currentInterval) {
        const minHeight = 50;
        const maxHeight = canvas.height - PIPE_GAP - 50;
        const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;

        pipes.current.push({
          x: canvas.width,
          topHeight,
          gap: PIPE_GAP,
          passed: false,
        });
        lastPipeTime.current = timestamp;
      }

      pipes.current = pipes.current.filter((pipe) => pipe.x > -PIPE_WIDTH);

      pipes.current.forEach((pipe) => {
        pipe.x -= PIPE_SPEED;

        if (
          !pipe.passed &&
          pipe.x + PIPE_WIDTH < canvas.width / 2 - BIRD_SIZE / 2
        ) {
          pipe.passed = true;
          setScore((s) => s + 1);
        }

        const birdX = canvas.width / 2 - BIRD_SIZE / 2;
        const birdLeft = birdX;
        const birdRight = birdX + BIRD_SIZE;
        const birdTop = birdY.current;
        const birdBottom = birdY.current + BIRD_SIZE;

        if (
          birdRight > pipe.x &&
          birdLeft < pipe.x + PIPE_WIDTH &&
          (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + pipe.gap)
        ) {
          setGameOver(true);
          const newHighScore = Math.max(score, highScore);
          setHighScore(newHighScore);
          localStorage.setItem("flappyBirdHighScore", newHighScore.toString());
        }
      });

      ctx.fillStyle = "#87CEEB";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#90EE90";
      ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

      pipes.current.forEach((pipe) => {
        ctx.fillStyle = "#228B22";
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        ctx.fillRect(
          pipe.x,
          pipe.topHeight + pipe.gap,
          PIPE_WIDTH,
          canvas.height - pipe.topHeight - pipe.gap,
        );

        ctx.strokeStyle = "#1a6b1a";
        ctx.lineWidth = 3;
        ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        ctx.strokeRect(
          pipe.x,
          pipe.topHeight + pipe.gap,
          PIPE_WIDTH,
          canvas.height - pipe.topHeight - pipe.gap,
        );

        ctx.fillStyle = "#2d9b2d";
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 30, PIPE_WIDTH + 10, 30);
        ctx.fillRect(
          pipe.x - 5,
          pipe.topHeight + pipe.gap,
          PIPE_WIDTH + 10,
          30,
        );
      });

      const birdX = canvas.width / 2 - BIRD_SIZE / 2;

      ctx.save();
      ctx.translate(birdX + BIRD_SIZE / 2, birdY.current + BIRD_SIZE / 2);
      ctx.rotate(Math.min(Math.max(birdVelocity.current * 0.05, -0.5), 0.5));
      ctx.translate(-(birdX + BIRD_SIZE / 2), -(birdY.current + BIRD_SIZE / 2));

      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.ellipse(
        birdX + BIRD_SIZE / 2,
        birdY.current + BIRD_SIZE / 2,
        BIRD_SIZE / 2,
        BIRD_SIZE / 2.5,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      ctx.fillStyle = "#FFA500";
      ctx.beginPath();
      ctx.moveTo(birdX + BIRD_SIZE * 0.7, birdY.current + BIRD_SIZE / 2);
      ctx.lineTo(birdX + BIRD_SIZE, birdY.current + BIRD_SIZE / 2 - 5);
      ctx.lineTo(birdX + BIRD_SIZE, birdY.current + BIRD_SIZE / 2 + 5);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(
        birdX + BIRD_SIZE * 0.6,
        birdY.current + BIRD_SIZE * 0.4,
        4,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(
        birdX + BIRD_SIZE * 0.62,
        birdY.current + BIRD_SIZE * 0.38,
        2,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      ctx.restore();

      animationFrameId.current = requestAnimationFrame(updateGame);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    animationFrameId.current = requestAnimationFrame(updateGame);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameStarted, gameOver, score, highScore]);

  useEffect(() => {
    const key = searchParams.get("key");
    const storedKey = sessionStorage.getItem(`flappy-bird-session`);

    if (key && storedKey && key === storedKey) {
      setValid(true);
      sessionStorage.removeItem(`flappy-bird-session`);
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  if (!valid) return null;

  return (
    <motion.main
      className={`${geistSans.className} mx-auto max-w-4xl flex w-full flex-col items-center px-4 pt-10`}
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
      <motion.main
        className="w-full rounded-t-lg border p-4 py-6 shadow-lg sm:py-12"
        variants={fadeInUp}
      >
        <div className="text-center">
          <motion.h2
            className="text-2xl font-bold sm:text-3xl"
            variants={fadeInUp}
          >
            Flappy Bird
          </motion.h2>
          <motion.p className="mt-2 text-sm text-gray-500" variants={fadeInUp}>
            Fly between the pipes and aim for the highest score! Every point you
            earn gives you 1 coin.
          </motion.p>
        </div>
      </motion.main>
      <motion.main
        className="w-full rounded-lg border p-4 py-6 shadow-lg mt-6"
        variants={fadeInUp}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Bird className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm">Current Score</p>
              <p className="text-3xl font-bold">{score}</p>
            </div>
          </div>
          {highScore > 0 && (
            <div className="text-right">
              <p className="text-sm flex items-center justify-end gap-1">
                <Trophy className="w-4 h-4" />
                High Score
              </p>
              <p className="text-2xl font-bold text-yellow-600">{highScore}</p>
            </div>
          )}
        </div>

        <div
          ref={containerRef}
          className="relative bg-sky-400 rounded-lg overflow-hidden shadow-inner"
        >
          <canvas ref={canvasRef} className="w-full h-auto block" />

          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <Card className="p-8 max-w-sm mx-4 text-center space-y-4 bg-white/95">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <Bird className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black mb-2">
                    Ready to Play?
                  </h2>
                  <p className="text-black">Click or tap to start</p>
                </div>
                <Button
                  size="lg"
                  className="w-full text-lg font-semibold"
                  onClick={jump}
                >
                  Start Game
                </Button>
              </Card>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <Card className="p-8 max-w-sm mx-4 text-center space-y-4 bg-white/95">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Game Over!
                  </h2>
                  <div className="space-y-2 text-black">
                    <p className="text-5xl font-bold text-primary">{score}</p>
                    <p>Final Score</p>
                  </div>
                  {score === highScore && score > 0 && (
                    <div className="text-black mt-4 flex items-center justify-center gap-2 text-yellow-600 font-semibold">
                      <Trophy className="w-5 h-5" />
                      <span>New High Score!</span>
                    </div>
                  )}
                  {highScore > 0 && score !== highScore && (
                    <p className="text-black mt-2">Best: {highScore}</p>
                  )}
                </div>
                <Button
                  size="lg"
                  className="w-full text-lg font-semibold"
                  onClick={resetGame}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Play Again
                </Button>
              </Card>
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-sm">
          <p>Use Space or click/tap the game to flap</p>
        </div>
      </motion.main>
    </motion.main>
  );
}
