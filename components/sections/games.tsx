"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { LockIcon } from "lucide-react";
import { useState } from "react";

import { games } from "@/data/games";
import { useCoins } from "@/components/coin-context";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Games() {
  const { coins, spendCoins } = useCoins();
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const handleConfirm = () => {
    if (selectedGame && spendCoins(selectedGame.price)) {
      const sessionKey = crypto.randomUUID();
      sessionStorage.setItem(`${selectedGame.id}-session`, sessionKey);

      window.location.href = `/${selectedGame.id}?key=${sessionKey}`;
    } else {
      alert("Not enough coins! 🪙");
    }
  };

  return (
    <>
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {games.map((element, index) => (
          <motion.div key={index} variants={itemVariants}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <motion.div
                  onClick={() => setSelectedGame(element)}
                  className={`group relative flex h-36 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 ${
                    element.isDisabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:shadow-md"
                  }`}
                  aria-disabled={element.isDisabled}
                  whileHover={element.isDisabled ? {} : { scale: 1.03 }}
                  whileTap={element.isDisabled ? {} : { scale: 0.97 }}
                >
                  <Image
                    src={element.backgroundUrl}
                    alt={element.title}
                    height={200}
                    width={400}
                    className="max-h-full max-w-full object-contain transition-opacity duration-300 group-hover:opacity-90"
                  />

                  <div className="absolute bottom-3 left-3 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
                    {element.title}
                  </div>

                  {element.isDisabled && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                      <LockIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Play {selectedGame?.title}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This game costs{" "}
                    <span className="font-semibold text-yellow-500">
                      🪙 {selectedGame?.price}
                    </span>
                    .
                  </AlertDialogDescription>
                  <div className="mt-4 space-y-1 text-sm">
                    <p>
                      Current balance:{" "}
                      <span className="font-medium">{coins} 🪙</span>
                    </p>
                    <p>
                      After purchase:{" "}
                      <span
                        className={`font-medium ${
                          coins - (selectedGame?.price ?? 0) < 0
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {coins - (selectedGame?.price ?? 0)} 🪙
                      </span>
                    </p>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleConfirm}
                    disabled={coins < (selectedGame?.price ?? 0)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Confirm & Play
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
