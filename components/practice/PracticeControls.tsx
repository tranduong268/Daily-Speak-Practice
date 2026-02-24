import React, { useEffect, useState, useRef } from 'react';
import { UserSettings, TargetLanguage } from '../../types';

interface Props {
  settings: UserSettings;
  updateSettings: (s: UserSettings) => void;
  activeLang: TargetLanguage;
  audioUrl: string | null;
  isTeleprompterActive: boolean;
  setIsTeleprompterActive: (active: boolean) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

export const PracticeControls: React.FC<Props> = ({ 
  settings, 
  updateSettings, 
  activeLang, 
  audioUrl, 
  isTeleprompterActive, 
  setIsTeleprompterActive,
  isAudioPlaying,
  setIsAudioPlaying,
  audioRef
}) => {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const themeColor = activeLang === 'en' ? 'cyan' : 'rose';
  const speedMenuRef = useRef<HTMLDivElement>(null);

  // Sync playback rate when settings changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = settings.audioSpeed;
    }
  }, [settings.audioSpeed, audioUrl, audioRef]);

  // Click outside to close speed menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(event.target as Node)) {
        setShowSpeedMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSetting = (key: keyof UserSettings) => {
    if (typeof settings[key] === 'boolean') {
      updateSettings({ ...settings, [key]: !settings[key] });
    }
  };
  
  const toggleGender = () => {
    updateSettings({ 
      ...settings, 
      voiceGender: settings.voiceGender === 'male' ? 'female' : 'male' 
    });
  };

  const setAudioSpeed = (speed: number) => {
    updateSettings({ ...settings, audioSpeed: speed });
    setShowSpeedMenu(false);
  };

  // --- AUDIO TRANSPORT ---
  const toggleAudio = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      if (audioRef.current.ended) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play();
    }
  };

  const onAudioPlay = () => {
    setIsAudioPlaying(true);
    setIsTeleprompterActive(true); 
  };

  const onAudioPause = () => {
    setIsAudioPlaying(false);
    setIsTeleprompterActive(false); 
  };

  const onAudioEnded = () => {
    setIsAudioPlaying(false);
    setIsTeleprompterActive(false);
  };

  // --- MAIN BUTTON LOGIC ---
  const handleMainToggle = () => {
    if (isAudioPlaying) {
        audioRef.current?.pause();
        return; 
    }
    // Toggle manual reading
    setIsTeleprompterActive(!isTeleprompterActive);
  };

  return (
    <div className="flex-none p-3 pb-10 md:p-4 md:pb-6 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-3xl mx-auto flex flex-col gap-3 md:gap-4">
        
        {/* Row 1: Main Transport Controls */}
        <div className="flex items-center gap-2 md:gap-4">
          
          <div className="flex gap-2 relative">
            {/* Audio Play/Pause Button */}
            <button 
              onClick={toggleAudio}
              disabled={!audioUrl}
              className={`flex-none w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-slate-700 transition-all ${
                audioUrl 
                  ? isAudioPlaying 
                    ? 'bg-amber-500 text-white border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                    : 'bg-slate-800 text-cyan-400 hover:bg-slate-700 hover:border-cyan-500/50' 
                  : 'bg-slate-900 text-slate-600 cursor-not-allowed'
              }`}
            >
              {audioUrl ? (
                <>
                  {isAudioPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
                  ) : (
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  )}
                  <audio 
                    ref={audioRef} 
                    src={audioUrl} 
                    onPlay={onAudioPlay}
                    onPause={onAudioPause}
                    onEnded={onAudioEnded}
                  />
                </>
              ) : (
                <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
              )}
            </button>

            {/* AUDIO SPEED DROPDOWN */}
            <div className="relative" ref={speedMenuRef}>
              <button 
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                disabled={!audioUrl}
                className={`flex-none w-11 h-11 md:w-12 md:h-12 rounded-full flex flex-col items-center justify-center border border-slate-700 transition-all ${
                   isAudioPlaying ? 'bg-slate-800 border-amber-500/50' : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title="Audio Speed"
              >
                 <span className="text-[9px] text-slate-400 font-bold uppercase">Voice</span>
                 <span className={`text-xs font-bold font-mono ${isAudioPlaying ? 'text-amber-400' : 'text-slate-200'}`}>
                   {settings.audioSpeed}x
                 </span>
              </button>

              {/* Dropdown Menu */}
              {showSpeedMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-16 bg-slate-800 border border-slate-600 rounded-lg shadow-xl overflow-hidden z-50 animate-fade-in-up">
                  {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].reverse().map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setAudioSpeed(speed)}
                      className={`w-full py-2 text-xs font-bold font-mono hover:bg-slate-700 transition-colors ${
                        settings.audioSpeed === speed ? 'text-cyan-400 bg-slate-700/50' : 'text-slate-300'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Gender Toggle */}
            <button 
              onClick={toggleGender}
              className={`flex-none w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-slate-700 transition-all ${
                settings.voiceGender === 'female' ? 'bg-pink-900/20 text-pink-400 hover:bg-pink-900/30' : 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/30'
              }`}
            >
              {settings.voiceGender === 'female' ? <span className="text-xl">👩</span> : <span className="text-xl">👨</span>}
            </button>
          </div>

          {/* MAIN ACTION BUTTON */}
          <button
            onClick={handleMainToggle}
            className={`flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl font-bold text-base md:text-lg tracking-wider shadow-lg transition-transform transform active:scale-95 flex items-center justify-center gap-2 ${
               (isTeleprompterActive && !isAudioPlaying) 
                ? 'bg-red-500/90 hover:bg-red-500 text-white shadow-red-500/20' 
                : `bg-gradient-to-r ${activeLang === 'en' ? 'from-cyan-600 to-blue-600' : 'from-rose-600 to-orange-600'} text-white shadow-${themeColor}-500/20`
            }`}
          >
            {(isTeleprompterActive && !isAudioPlaying) ? (
                <>
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="hidden sm:inline">PAUSE SCROLL</span>
                </>
            ) : (
                <>
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  <span className="hidden sm:inline">AUTO SCROLL</span>
                  <span className="sm:hidden">SCROLL</span>
                </>
            )}
          </button>
        </div>

        {/* Row 2: Settings Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-[10px] md:text-xs text-slate-400`}>
          
          {/* SCROLL SPEED SLIDER - ALWAYS CONTROLS TEXT SCROLLING */}
          <div className="col-span-1 md:col-span-1 flex items-center gap-1.5 md:gap-3 bg-slate-800/50 rounded-lg px-2 py-2 md:px-3">
              <span className={`w-6 md:w-8 shrink-0 ${isAudioPlaying ? 'text-amber-400' : 'text-cyan-400'} font-bold`}>
                Spd
              </span>
              <input 
                type="range" min="1" max="5" step="0.5" 
                value={settings.teleprompterSpeed} 
                onChange={(e) => updateSettings({ ...settings, teleprompterSpeed: parseFloat(e.target.value) })}
                className={`w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer ${isAudioPlaying ? 'accent-amber-500' : `accent-${themeColor}-500`} touch-none`}
              />
          </div>

          <div className="col-span-1 md:col-span-1 flex items-center gap-1.5 md:gap-3 bg-slate-800/50 rounded-lg px-2 py-2 md:px-3">
              <span className="w-6 md:w-8 shrink-0">Size</span>
              <input 
                type="range" min="1.5" max="5.0" step="0.1" 
                value={settings.fontSize} 
                onChange={(e) => updateSettings({...settings, fontSize: parseFloat(e.target.value)})}
                className={`w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-${themeColor}-500 touch-none`}
              />
          </div>

          {/* Toggles */}
          <button 
            onClick={() => toggleSetting('showPhonetic')} 
            className={`flex items-center justify-center gap-2 rounded-lg py-2 border border-slate-700 transition-colors ${
              settings.showPhonetic ? `bg-${themeColor}-900/30 text-${themeColor}-300 border-${themeColor}-500/30` : 'bg-slate-800/50'
            }`}
          >
              {activeLang === 'en' ? 'IPA' : 'Pinyin'}
          </button>
          
          <button 
            onClick={() => toggleSetting('showTranslation')} 
            className={`flex items-center justify-center gap-2 rounded-lg py-2 border border-slate-700 transition-colors ${
              settings.showTranslation ? 'bg-purple-900/30 text-purple-300 border-purple-500/30' : 'bg-slate-800/50'
            }`}
          >
              Meaning
          </button>

        </div>
      </div>
    </div>
  );
};