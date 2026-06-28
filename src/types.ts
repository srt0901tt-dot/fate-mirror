export interface TarotCard {
  id: string;
  name: string;
  nameZh: string;
  type: 'major' | 'minor';
  suit: 'wands' | 'cups' | 'swords' | 'pentacles' | 'none';
  value: number; // 0-21 for major, 1-14 for minor (11=Page, 12=Knight, 13=Queen, 14=King)
  keywords: string[];
  keywordsZh: string[];
  upright: string;
  uprightZh: string;
  reversed: string;
  reversedZh: string;
  emotionalMeaning: string;
  emotionalMeaningZh: string;
  actionAdvice: string;
  actionAdviceZh: string;
}

export type SpreadModeId = 'daily' | 'problem' | 'timeline' | 'relationship' | 'celtic';

export interface SpreadMode {
  id: SpreadModeId;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  cardCount: number;
  positions: {
    name: string;
    nameZh: string;
    meaning: string;
    meaningZh: string;
  }[];
}

export interface QuestionAnalysis {
  questionType: string;
  questionTypeZh: string;
  emotionalSignal: string;
  emotionalSignalZh: string;
  recommendedMode: SpreadModeId;
  interpretationTone: string;
  interpretationToneZh: string;
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  positionName: string;
  positionNameZh: string;
  positionMeaning: string;
  positionMeaningZh: string;
}

export interface DeepInterpretation {
  summary: string;
  summaryZh: string;
  cardReadings: {
    cardId: string;
    interpretation: string;
    interpretationZh: string;
  }[];
  emotionalPattern: string;
  emotionalPatternZh: string;
  actionGuidance: string;
  actionGuidanceZh: string;
  reflectionPrompt: string;
  reflectionPromptZh: string;
}

export interface ReadingSession {
  id: string;
  timestamp: string;
  question: string;
  analysis: QuestionAnalysis;
  mode: SpreadMode;
  drawnCards: DrawnCard[];
  interpretation: DeepInterpretation;
}
