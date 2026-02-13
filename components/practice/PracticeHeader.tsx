import React, { useState } from 'react';
import { DailyContent, TargetLanguage } from '../../types';

interface Props {
  content: DailyContent;
  activeLang: TargetLanguage;
  setActiveLang: (lang: TargetLanguage) => void;
  onBack: () => void;
}

export const PracticeHeader: React.FC<Props> = ({ content, activeLang, setActiveLang, onBack }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleCopy = () => {
    const lessonText = `
Topic: ${content.topic}
Translation: ${content.vietnameseTranslation}

--- English ---
${content.en.text}

--- Chinese ---
${content.cn.text}
    `.trim();

    navigator.clipboard.writeText(lessonText).then(() => {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    });
  };

  return (
    <header className="flex-none h-16 px-4 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-sm z-20">
      <button 
        onClick={onBack}
        className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      </button>

      {/* Language Switcher Pill */}
      <div className="flex bg-slate-800/80 rounded-full p-1 border border-slate-700">
        <button
          onClick={() => setActiveLang('en')}
          className={`px-4 py-1 rounded-full text-sm font-bold transition-all duration-300 ${
            activeLang === 'en' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          ENG
        </button>
        <button
          onClick={() => setActiveLang('cn')}
          className={`px-4 py-1 rounded-full text-sm font-bold transition-all duration-300 ${
            activeLang === 'cn' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          CHN
        </button>
      </div>

      {/* Copy Button */}
      <button 
        onClick={handleCopy}
        className={`p-2 rounded-full transition-all flex items-center justify-center ${
          copyStatus === 'copied' ? 'bg-green-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
        }`}
        title="Copy lesson text"
      >
        {copyStatus === 'copied' ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
        )}
      </button>
    </header>
  );
};