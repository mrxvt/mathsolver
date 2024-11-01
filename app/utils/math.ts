import { Operation, Difficulty, Problem } from '../types/math';

export const DIFFICULTY_RANGES = {
  single: { min: 1, max: 9 },
  double: { min: 10, max: 99 },
  triple: { min: 100, max: 999 },
  quadruple: { min: 1000, max: 9999 },
};

export const OPERATION_SYMBOLS = {
  addition: '+',
  subtraction: '-',
  multiplication: '×',
  division: '÷',
};

export function generateNumbers(difficulty: Difficulty): [number, number] {
  const range = DIFFICULTY_RANGES[difficulty];
  const num1 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  const num2 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  return [num1, num2];
}

export function calculateAnswer(num1: number, num2: number, operation: Operation): number {
  switch (operation) {
    case 'addition':
      return num1 + num2;
    case 'subtraction':
      return num1 - num2;
    case 'multiplication':
      return num1 * num2;
    case 'division':
      // Ensure clean division
      return num1;
    default:
      return 0;
  }
}

export function generateProblem(operation: Operation, difficulty: Difficulty): Problem {
  let [firstNumber, secondNumber] = generateNumbers(difficulty);
  
  // For division, ensure clean division and positive results
  if (operation === 'division') {
    secondNumber = Math.max(1, Math.min(secondNumber, 12)); // Limit divisor for reasonable difficulty
    firstNumber = secondNumber * Math.floor(firstNumber / secondNumber);
  }

  const correctAnswer = calculateAnswer(firstNumber, secondNumber, operation);
  
  // Generate wrong options
  const options: number[] = [correctAnswer];
  const variance = Math.max(Math.floor(correctAnswer * 0.15), 1); // 15% variance or at least 1

  while (options.length < 4) {
    const wrongAnswer = correctAnswer + (Math.floor(Math.random() * variance * 2) - variance);
    if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
      options.push(wrongAnswer);
    }
  }

  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  return {
    firstNumber,
    secondNumber,
    correctAnswer,
    options,
  };
}