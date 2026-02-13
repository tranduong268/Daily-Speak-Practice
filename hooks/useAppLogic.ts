import React, { useState } from 'react';
import { AppState, DailyContent, TargetLanguage, UserSettings, SavedLesson } from '../types';
import { generateDailyContent } from '../services/contentService'; 
import { INITIAL_SETTINGS } from '../constants';
import { useLibrary } from './useLibrary';
import { useAudio } from './useAudio';

export const useAppLogic = () => {
  const [state, setState] = useState<AppState>(AppState.SELECTION);
  const [activeLang, setActiveLang] = useState<TargetLanguage>('en');
  const [content, setContent] = useState<DailyContent | null>(null);
  const [settings, setSettings] = useState<UserSettings>(INITIAL_SETTINGS);
  
  // Track what topic is currently being generated to show relevant UI
  const [pendingTopic, setPendingTopic] = useState<string>("");

  // 1. Use Library Hook
  const { 
    savedLessons, 
    saveLesson, 
    deleteLesson, 
    handleExport, 
    handleImport 
  } = useLibrary();

  // 2. Use Audio Hook
  const { audioUrl, clearCache } = useAudio({
    content,
    activeLang,
    settings,
    state,
    savedLessons,
    onAudioGenerated: async (blob, lang) => {
        if (content) {
            await saveLesson(
                content, 
                lang === 'en' ? blob : undefined, 
                lang === 'cn' ? blob : undefined
            );
        }
    }
  });

  const handleGenerate = async (topicOrText: string, isCustom: boolean) => {
    setPendingTopic(topicOrText);
    setState(AppState.LOADING);
    clearCache();
    try {
      const data = await generateDailyContent(topicOrText, isCustom);
      
      // Auto-save the text content immediately
      await saveLesson(data);

      setContent(data);
      setActiveLang('en');
      setState(AppState.PRACTICE);
    } catch (e) {
      console.error(e);
      setState(AppState.ERROR);
    }
  };

  const loadSavedLesson = (lesson: SavedLesson) => {
    setContent(lesson);
    clearCache(); 
    setActiveLang('en');
    setState(AppState.PRACTICE);
  };

  const deleteSavedLesson = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Bạn có chắc muốn xóa bài học này không?")) {
      await deleteLesson(id);
    }
  };

  const resetSession = () => {
    setState(AppState.SELECTION);
    setContent(null);
    clearCache();
    setPendingTopic("");
  };

  const updateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
  };

  return {
    state,
    activeLang,
    setActiveLang,
    content,
    audioUrl,
    settings,
    updateSettings,
    handleGenerate,
    resetSession,
    retry: () => setState(AppState.SELECTION),
    // Pending topic for loading screen
    pendingTopic,
    // Library props
    savedLessons,
    loadSavedLesson,
    deleteSavedLesson,
    handleExport,
    handleImport
  };
};