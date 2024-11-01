"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export default function GameOver({
  score,
  onRestart,
}: {
  score: number;
  onRestart: () => void;
}) {
  return (
    <Card className="p-6 text-center space-y-6">
      <div className="flex justify-center">
        <Trophy className="h-16 w-16 text-yellow-500" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Game Over!</h2>
        <p className="text-4xl font-bold text-primary">{score} points</p>
      </div>

      <Button onClick={onRestart} className="w-full">
        Play Again
      </Button>
    </Card>
  );
}