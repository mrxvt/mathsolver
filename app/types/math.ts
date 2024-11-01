export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division';
export type Difficulty = 'single' | 'double' | 'triple' | 'quadruple';

export interface GameSettings {
  operation: Operation;
  difficulty: Difficulty;
  timeLimit: number;
  questionsCount: number;
}