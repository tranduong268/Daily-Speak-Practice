import React, { useState, useRef } from 'react';
import { DailyContent, UserSettings, TargetLanguage } from '../../types';
import Teleprompter from '../Teleprompter';
import { PracticeHeader } from '../practice/PracticeHeader';
import { PracticeControls } from '../practice/PracticeControls';

interface Props {
  content: DailyContent;
  audioUrl: string | null;
  settings: UserSettings;
  updateSettings: (s: UserSettings) => void;
  onBack: () => void;
  activeLang: TargetLanguage;
  setActiveLang: (lang: TargetLanguage) => void;
}

export const PracticeView: React.FC<Props> = ({ 
  content, 
  audioUrl, 
  settings, 
  updateSettings, 
  onBack,
  activeLang,
  setActiveLang
}) => {
  const [isTeleprompterActive, setIsTeleprompterActive] = useState(false);
  const [isTranslationExpanded, setIsTranslationExpanded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Lift the audio ref here so both Controls and Teleprompter can access it
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Theme logic
  const themeColor = activeLang === 'en' ? 'cyan' : 'rose';
  const gradientText = activeLang === 'en' 
    ? 'from-cyan-400 to-blue-400' 
    : 'from-rose-400 to-orange-400';

  // Override settings when Audio is playing (Sample Reading Mode)
  // We allow Teleprompter to handle the sync logic internally now using the audioRef
  const effectiveSettings = isAudioPlaying 
    ? { ...settings, fontSize: 2.5 } // Keep font small for better tracking, speed is now ignored in audio mode
    : settings;

  return (
    // Changed h-screen to h-[100dvh]
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-slate-950 animate-fade-in relative">
      
      {/* Background Ambience */}
      <div className={`absolute top-0 left-0 w-full h-1/2 bg-${themeColor}-900/10 blur-[100px] pointer-events-none transition-colors duration-1000`}></div>

      {/* --- HEADER COMPONENT --- */}
      <PracticeHeader 
        content={content}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        onBack={onBack}
      />

      {/* --- SUB-HEADER: Topic & Full Translation (Expandable) --- */}
      {/* Removed z-index layering issues by keeping it in standard flex flow */}
      <div className="flex-none px-4 pt-3 md:pt-4 pb-2 text-center relative z-10 transition-all duration-300">
         <h2 className={`text-lg md:text-xl font-bold bg-gradient-to-r ${gradientText} bg-clip-text text-transparent mb-1 md:mb-2 truncate px-2`}>
           {content.topic}
         </h2>
         
         <div 
           onClick={() => setIsTranslationExpanded(!isTranslationExpanded)}
           // FIX: Removed 'absolute', 'top-28', 'z-50'. 
           // Now behaves as a block element in the flex column.
           className={`mx-auto max-w-2xl bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 cursor-pointer hover:bg-slate-800/60 transition-all group ${isTranslationExpanded ? 'bg-slate-800/90 border-slate-500 shadow-lg mb-2' : ''}`}
         >
            <div className="flex items-start justify-center gap-2">
              {/* FIX: Reduced max-height from 60vh to 30vh so it doesn't push the teleprompter off screen completely on mobile */}
              <p className={`text-slate-300 text-xs md:text-sm leading-relaxed transition-all duration-300 ${isTranslationExpanded ? 'text-left max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar' : 'line-clamp-1 text-slate-500'}`}>
                {content.vietnameseTranslation}
              </p>
              <span className="text-slate-600 group-hover:text-slate-400 flex-none mt-0.5 transition-transform duration-300" style={{ transform: isTranslationExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </div>
         </div>
      </div>

      {/* --- MAIN AREA: Teleprompter --- */}
      {/* flex-1 allows this area to shrink automatically when the translation above expands */}
      <main className="flex-1 relative overflow-hidden px-0 md:px-0 min-h-0">
        <div className="h-full max-w-4xl mx-auto">
          <Teleprompter 
            data={activeLang === 'en' ? content.en : content.cn}
            settings={effectiveSettings} 
            isPlaying={isTeleprompterActive}
            isAudioMode={isAudioPlaying} // Tell Teleprompter we are in Audio Sync mode
            audioRef={audioRef} // Pass the ref for sync
            onScrollComplete={() => setIsTeleprompterActive(false)}
          />
        </div>
      </main>

      {/* --- BOTTOM DECK: Controls Component --- */}
      <PracticeControls 
        settings={settings}
        updateSettings={updateSettings}
        activeLang={activeLang}
        audioUrl={audioUrl}
        isTeleprompterActive={isTeleprompterActive}
        setIsTeleprompterActive={setIsTeleprompterActive}
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
        audioRef={audioRef} // Pass the ref to bind the <audio> element
      />

    </div>
  );
};