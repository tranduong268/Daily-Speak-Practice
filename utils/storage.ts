import { DailyProgress } from "../types";

const PROGRESS_KEY = "speakdaily_progress";
const COMPLETED_SESSIONS_KEY = "speakdaily_sessions";

export const getProgress = (): DailyProgress => {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { streak: 0, lastPracticeDate: "" };
};

export const saveProgress = (date: string) => {
  const current = getProgress();
  
  // Calculate Streak
  let newStreak = current.streak;
  const lastDate = new Date(current.lastPracticeDate);
  const today = new Date(date);
  
  // Simple check: if last practice was yesterday, increment. If today, same. If older, reset 1.
  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  if (current.lastPracticeDate === date) {
    // Already practiced today, do nothing to streak
  } else if (diffDays <= 2 && current.lastPracticeDate !== "") {
    // Consecutive day (roughly)
    newStreak += 1;
  } else {
    // Reset or first time
    newStreak = 1;
  }

  const updated: DailyProgress = {
    streak: newStreak,
    lastPracticeDate: date
  };

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
  
  // Save session record
  const sessions = JSON.parse(localStorage.getItem(COMPLETED_SESSIONS_KEY) || "[]");
  sessions.push(date);
  localStorage.setItem(COMPLETED_SESSIONS_KEY, JSON.stringify(sessions));
};
