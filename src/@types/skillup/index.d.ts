export interface Question {
  id: string;
  category: string;
  sentence: string;
  question: string;
  choices: Choice[];
  correct: string;
}

export interface Choice {
  value: string;
  label: string;
}
