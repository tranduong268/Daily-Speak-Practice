import { useState, useEffect } from 'react';
import { DailyContent, SavedLesson, TargetLanguage, UserSettings, AppState } from '../types';
import { generateReferenceAudio } from '../services/ttsService';

interface Props {
  content: DailyContent | null;
  activeLang: TargetLanguage;
  settings: UserSettings;
  state: AppState;
  savedLessons: SavedLesson[];
  onAudioGenerated: (blob: Blob, lang: TargetLanguage) => void;
}

export const useAudio = ({ content, activeLang, settings, state, savedLessons, onAudioGenerated }: Props) => {
  // Audio Cache Key Format: "en-male", "en-female", "cn-male", etc.
  const [audioCache, setAudioCache] = useState<Record<string, string>>({});

  // Cleanup Blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      Object.values(audioCache).forEach(url => URL.revokeObjectURL(url as string));
    };
  }, [audioCache]);

  const clearCache = () => setAudioCache({});

  // Reset cache when the Content ID changes (new lesson loaded)
  // We perform an optimistic load from DB here, assuming the DB blob matches the current settings.
  // If the user switches gender later, the cache key will mismatch and force a re-generation.
  useEffect(() => {
    setAudioCache({}); // Clear previous lesson's audio
    
    if (!content) return;

    const lesson = savedLessons.find(l => l.id === content.id);
    if (lesson) {
      const initialCache: Record<string, string> = {};
      
      // We assume the saved blob corresponds to the current settings at load time.
      // This is a "best guess" to enable offline playback immediately.
      // If the user explicitly toggles gender later, a new key is generated, bypassing this.
      if (lesson.audioEnBlob) {
        initialCache[`en-${settings.voiceGender}`] = URL.createObjectURL(lesson.audioEnBlob);
      }
      if (lesson.audioCnBlob) {
        initialCache[`cn-${settings.voiceGender}`] = URL.createObjectURL(lesson.audioCnBlob);
      }
      
      if (Object.keys(initialCache).length > 0) {
        setAudioCache(initialCache);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.id]); 

  // Main Effect: Check Cache -> If missing, Generate
  useEffect(() => {
    if (!content || state !== AppState.PRACTICE) return;

    // CRITICAL FIX: The cache key now includes gender.
    // This ensures 'en-male' and 'en-female' are treated as different audio files.
    const cacheKey = `${activeLang}-${settings.voiceGender}`;

    if (audioCache[cacheKey]) return; // Audio exists for this specific gender/lang combination

    // If not in cache, we must generate it.
    // Note: We intentionally DO NOT fallback to the DB blob here because 
    // if the user toggled the gender switch, they want the *correct* gender, 
    // and we can't guarantee the DB blob (which has no metadata) is that gender.
    const generate = async () => {
      try {
        const textToSpeak = activeLang === 'en' ? content.en.text : content.cn.text;
        
        // Call API
        const url = await generateReferenceAudio(textToSpeak, activeLang, settings.voiceGender);
        
        // Update Cache
        setAudioCache(prev => ({ ...prev, [cacheKey]: url }));

        // Notify parent to save this new blob to DB (overwriting the old one is fine for daily practice)
        const response = await fetch(url);
        const newBlob = await response.blob();
        onAudioGenerated(newBlob, activeLang);

      } catch (e) {
        console.warn("TTS generation failed", e);
      }
    };

    generate();

  }, [activeLang, settings.voiceGender, content, state, audioCache, onAudioGenerated]);

  return {
    // Return the URL matching the specific requested gender
    audioUrl: audioCache[`${activeLang}-${settings.voiceGender}`] || null,
    clearCache
  };
};