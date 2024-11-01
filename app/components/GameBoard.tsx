"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GameSettings } from "../types/math";

export default function GameBoard({
  settings,
  onGameEnd,
}: {
  settings: GameSettings;
  onGameEnd: (score: number) => void;
}) {
  const [timeLeft, setTimeLeft] = useState(settings.timeLimit);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [problem, setProblem] = useState({ num1: 0, num2: 0, correct: 0 });

  const generateNumber = useCallback((digits: number) => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  const getDigits = useCallback(() => {
    switch (settings.difficulty) {
      case "single": return 1;
      case "double": return 2;
      case "triple": return 3;
      case "quadruple": return 4;
      default: return 1;
    }
  }, [settings.difficulty]);

  const generateProblem = useCallback(() => {
    const digits = getDigits();
    let num1 = generateNumber(digits);
    let num2 = generateNumber(digits);
    let correct;

    switch (settings.operation) {
      case "addition":
        correct = num1 + num2;
        break;
      case "subtraction":
        if (num1 < num2) [num1, num2] = [num2, num1];
        correct = num1 - num2;
        break;
      case "multiplication":
        correct = num1 * num2;
        break;
      case "division":
        correct = num1;
        num1 = num1 * num2;
        break;
      default:
        correct = num1 + num2;
    }

    setProblem({ num1, num2, correct });
  }, [settings.operation, generateNumber, getDigits]);

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  useEffect(() => {
    if (timeLeft <= 0 || currentQuestion > settings.questionsCount) {
      onGameEnd(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentQuestion, settings.questionsCount, score, onGameEnd]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(answer) === problem.correct) {
      setScore((prev) => prev + 1);
    }

    setAnswer("");
    setCurrentQuestion((prev) => prev + 1);
    generateProblem();
  };

  const getOperationSymbol = () => {
    switch (settings.operation) {
      case "addition": return "+";
      case "subtraction": return "-";
      case "multiplication": return "×";
      case "division": return "÷";
      default: return "+";
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Question</p>
          <p className="text-2xl font-bold">{currentQuestion} / {settings.questionsCount}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Score</p>
          <p className="text-2xl font-bold">{score}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Time Left</p>
          <p className="text-2xl font-bold">{timeLeft}s</p>
        </div>
      </div>

      <Progress value={(timeLeft / settings.timeLimit) * 100} />

      <div className="text-center space-y-4">
        <div className="text-4xl font-bold space-x-4">
          <span>{problem.num1}</span>
          <span>{getOperationSymbol()}</span>
          <span>{problem.num2}</span>
          <span>=</span>
          <span>?</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="text-center text-2xl"
            autoFocus
          />
          <Button type="submit" className="w-full">
            Submit Answer
          </Button>
        </form>
      </div>
    </Card>
  );
}