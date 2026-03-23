export interface Stimulus {
  id: string;
  sourceType: 'text' | 'image' | 'chart' | 'map';
  sourceTitle: string;
  sourceAuthor?: string;
  sourceDate?: string;
  content: string; 
  attribution?: string;
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Question {
  id: string;
  stimulus: Stimulus;
  questionText: string;
  choices: Choice[];
  period: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  historicalThinkingSkill: string;
}
