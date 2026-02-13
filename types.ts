
export enum AppState {
  SELECTION = 'SELECTION',
  LOADING = 'LOADING',
  PRACTICE = 'PRACTICE',
  ERROR = 'ERROR'
}

export type TargetLanguage = 'en' | 'cn';

export interface WordData {
  word: string;
  phonetic: string; // IPA for EN, Pinyin for CN
  isStressed: boolean; // Stress for EN, Tone mark logic for CN
  meaning: string; // Vietnamese meaning
}

export interface LanguageContent {
  text: string;
  segments: WordData[];
}

export interface DailyContent {
  id: string;
  topic: string;
  vietnameseTranslation: string; // Meaning of the whole paragraph
  en: LanguageContent;
  cn: LanguageContent;
}

export type VoiceGender = 'male' | 'female';

export interface UserSettings {
  showPhonetic: boolean;
  showTranslation: boolean;
  teleprompterSpeed: number; // 1-5
  fontSize: number; // REM units
  showStress: boolean;
  voiceGender: VoiceGender;
  audioSpeed: number; // Playback rate for TTS audio
}

export interface DailyProgress {
  streak: number;
  lastPracticeDate: string;
}

export interface SavedLesson extends DailyContent {
  createdAt: number;
  audioEnBlob?: Blob; // Store binary audio in DB
  audioCnBlob?: Blob;
}