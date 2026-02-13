import React, { useEffect, useState } from 'react';
import { AppState } from './types';
import { useAppLogic } from './hooks/useAppLogic';
import { SelectionView } from './components/views/SelectionView';
import { LoadingView } from './components/views/LoadingView';
import { PracticeView } from './components/views/PracticeView';
import { ErrorView } from './components/views/ErrorView';
import { BACKGROUND_IMAGES } from './data/themeData';

export default function App() {
  const { 
    state, 
    activeLang, 
    setActiveLang, 
    content, 
    audioUrl, 
    settings, 
    updateSettings, 
    handleGenerate, 
    resetSession,
    retry,
    pendingTopic,
    savedLessons,
    loadSavedLesson,
    deleteSavedLesson,
    handleExport,
    handleImport
  } = useAppLogic();

  // Initialize background image state
  const [bgImage, setBgImage] = useState("");

  // Set random background once on mount
  useEffect(() => {
    if (BACKGROUND_IMAGES && BACKGROUND_IMAGES.length > 0) {
      const randomImg = BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
      setBgImage(randomImg);
    }
  }, []);

  return (
    // Base: Dark container
    // min-h-[100dvh] ensures full height on mobile browsers
    <div className="relative min-h-[100dvh] bg-slate-900 text-slate-100 font-sans selection:bg-cyan-400/30 overflow-hidden">
      
      {/* --- GLOBAL BACKGROUND IMAGE LAYER --- */}
      {/* Fixed position ensures it stays perfect when scrolling */}
      {bgImage && (
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            opacity: 0.5 // Visibility set to 0.5 for a good balance
          }}
        />
      )}
      
      {/* Dark Overlay - To ensure text readability on top of any image */}
      <div className="fixed inset-0 z-0 bg-slate-900/60 backdrop-blur-[1px]"></div>

      {/* --- LIQUID BACKGROUND (Only visible in Selection to add extra flair) --- */}
      {state === AppState.SELECTION && (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {/* Blob 1: Blue/Cyan */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
          {/* Blob 2: Purple/Violet */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
          {/* Blob 3: Pink/Rose */}
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      )}

      {/* Main Content Layer - z-10 puts it above background */}
      <div className="relative z-10 h-full">
        {state === AppState.SELECTION && (
          <SelectionView 
            onGenerate={handleGenerate}
            savedLessons={savedLessons}
            onLoadLesson={loadSavedLesson}
            onDeleteLesson={deleteSavedLesson}
            onExport={handleExport}
            onImport={handleImport}
          />
        )}

        {state === AppState.LOADING && (
          <LoadingView pendingTopic={pendingTopic} />
        )}

        {state === AppState.PRACTICE && content && (
          <PracticeView 
            content={content}
            audioUrl={audioUrl}
            settings={settings}
            updateSettings={updateSettings}
            onBack={resetSession}
            activeLang={activeLang}
            setActiveLang={setActiveLang}
          />
        )}

        {state === AppState.ERROR && (
          <ErrorView onRetry={retry} />
        )}
      </div>
    </div>
  );
}