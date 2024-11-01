"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Operation, Difficulty, GameSettings } from "../types/math";
import { Plus, Minus, X, Divide } from "lucide-react";

export default function GameSettings({ onStart }: { onStart: (settings: GameSettings) => void }) {
  const [operation, setOperation] = useState<Operation>("addition");
  const [difficulty, setDifficulty] = useState<Difficulty>("single");
  const [timeLimit, setTimeLimit] = useState(30);
  const [questionsCount, setQuestionsCount] = useState(10);

  const handleStart = () => {
    onStart({
      operation,
      difficulty,
      timeLimit,
      questionsCount,
    });
  };

  return (
    <Card className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Game Settings</h2>
        
        <div className="space-y-2">
          <Label>Operation</Label>
          <RadioGroup
            defaultValue={operation}
            onValueChange={(value) => setOperation(value as Operation)}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { value: "addition", icon: <Plus className="h-4 w-4" />, label: "Addition" },
              { value: "subtraction", icon: <Minus className="h-4 w-4" />, label: "Subtraction" },
              { value: "multiplication", icon: <X className="h-4 w-4" />, label: "Multiplication" },
              { value: "division", icon: <Divide className="h-4 w-4" />, label: "Division" },
            ].map(({ value, icon, label }) => (
              <Label
                key={value}
                className={`flex items-center justify-center gap-2 rounded-lg border-2 p-4 hover:bg-accent cursor-pointer ${
                  operation === value ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem value={value} className="sr-only" />
                {icon}
                <span>{label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Difficulty (Digits)</Label>
          <RadioGroup
            defaultValue={difficulty}
            onValueChange={(value) => setDifficulty(value as Difficulty)}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { value: "single", label: "Single" },
              { value: "double", label: "Double" },
              { value: "triple", label: "Triple" },
              { value: "quadruple", label: "Quadruple" },
            ].map(({ value, label }) => (
              <Label
                key={value}
                className={`flex items-center justify-center gap-2 rounded-lg border-2 p-4 hover:bg-accent cursor-pointer ${
                  difficulty === value ? "border-primary" : "border-muted"
                }`}
              >
                <RadioGroupItem value={value} className="sr-only" />
                <span>{label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Time Limit (seconds): {timeLimit}</Label>
          <Slider
            min={10}
            max={120}
            step={5}
            value={[timeLimit]}
            onValueChange={([value]) => setTimeLimit(value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Number of Questions: {questionsCount}</Label>
          <Slider
            min={5}
            max={50}
            step={5}
            value={[questionsCount]}
            onValueChange={([value]) => setQuestionsCount(value)}
            className="w-full"
          />
        </div>
      </div>

      <Button onClick={handleStart} className="w-full">
        Start Game
      </Button>
    </Card>
  );
}