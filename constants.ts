import { UserSettings } from "./types";

export const INITIAL_SETTINGS: UserSettings = {
  showPhonetic: false,
  showTranslation: false,
  teleprompterSpeed: 2,
  fontSize: 2.0, // Optimized for mobile (approx 32px), down from 2.2
  showStress: true,
  voiceGender: 'female',
  audioSpeed: 1.0
};

export const TOPICS = [
  { id: 'daily_life', label: 'Đời sống', icon: '🌱' },
  { id: 'work', label: 'Công việc', icon: '💼' },
  { id: 'health', label: 'Sức khỏe', icon: '💪' },
  { id: 'travel', label: 'Du lịch', icon: '✈️' },
  { id: 'motivation', label: 'Động lực', icon: '🔥' },
  { id: 'communication', label: 'Giao tiếp', icon: '🗣️' },
  { id: 'tradition', label: 'Truyền thống', icon: '🏮' },
  { id: 'entertainment', label: 'Giải trí', icon: '🎬' }
];