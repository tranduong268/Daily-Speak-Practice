import React from 'react';
import { WordData, UserSettings } from '../../types';

interface Props {
  segment: WordData;
  index: number;
  settings: UserSettings;
}

// React.memo ensures we don't re-render thousands of words unnecessarily
export const WordSegment: React.FC<Props> = React.memo(({ segment, index, settings }) => {
  return (
    <span 
      id={`segment-${index}`} 
      className="inline-block mx-1.5 my-2 md:mx-3 md:my-4 relative group transition-opacity duration-300" 
      style={{ fontSize: `${settings.fontSize}rem` }}
    >
      {/* Phonetic (IPA/Pinyin) - Top */}
      {settings.showPhonetic && (
        <span 
          className="block text-cyan-400/80 font-mono text-center absolute left-1/2 -translate-x-1/2 w-[150%] pointer-events-none"
          style={{ fontSize: '0.35em', top: '-1.4em' }}
        >
          {segment.phonetic}
        </span>
      )}

      {/* Main Word */}
      <span 
        className={`transition-all duration-300 leading-tight ${
          (settings.showStress && segment.isStressed)
            ? 'text-white font-bold drop-shadow-md' 
            : 'text-slate-400 font-light'
        }`}
      >
        {segment.word}
      </span>

      {/* Meaning - Bottom */}
      {settings.showTranslation && (
        <span 
          className="block text-purple-300/90 text-center absolute left-1/2 -translate-x-1/2 w-[200%] pointer-events-none"
          style={{ fontSize: '0.35em', bottom: '-1.4em' }}
        >
          {segment.meaning}
        </span>
      )}
    </span>
  );
});

WordSegment.displayName = 'WordSegment';