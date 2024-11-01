"use client";

import { useState } from "react";
import GameSettings from "./components/GameSettings";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import { GameSettings as GameSettingsType } from "./types/math";

export default function Home() {
  const [gameState, setGameState] = useState<'settings' | 'playing' | 'gameOver'>('settings');
  const [settings, setSettings] = useState<GameSettingsType | null>(null);
  const [finalScore, setFinalScore] = useState(0);

  const handleStart = (newSettings: GameSettingsType) => {
    setSettings(newSettings);
    setGameState('playing');
  };

  const handleGameEnd = (score: number) => {
    setFinalScore(score);
    setGameState('gameOver');
  };

  const handleRestart = () => {
    setGameState('settings');
    setSettings(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Math Trainer</h1>
          <p className="text-muted-foreground">Challenge yourself with math problems!</p>
        </div>

        {gameState === 'settings' && <GameSettings onStart={handleStart} />}
        {gameState === 'playing' && settings && (
          <GameBoard settings={settings} onGameEnd={handleGameEnd} />
        )}
        {gameState === 'gameOver' && (
          <GameOver score={finalScore} onRestart={handleRestart} />
        )}
      </div>
    </main>
  );
}