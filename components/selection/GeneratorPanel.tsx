import React, { useState } from 'react';
import { TOPICS } from '../../constants';

interface Props {
  onGenerate: (topic: string, isCustom: boolean) => void;
}

export const GeneratorPanel: React.FC<Props> = ({ onGenerate }) => {
  const [customInput, setCustomInput] = useState("");

  return (
    <>
      {/* Glass Input Card */}
      <div className="bg-white/10 p-4 md:p-6 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl relative z-10">
        <label className="block text-[10px] md:text-xs font-bold text-blue-100 mb-2 uppercase tracking-wider">Create New Lesson</label>
        <textarea
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="What do you want to talk about today?"
          className="w-full bg-black/20 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder-blue-200/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 h-20 md:h-24 mb-3 transition-all resize-none text-sm md:text-base"
        />
        <button
          disabled={!customInput.trim()}
          onClick={() => onGenerate(customInput, true)}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 md:py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-base"
        >
          {customInput.includes('--- English ---') ? 'Restore Lesson' : 'Generate Lesson'}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </button>
      </div>

      {/* Quick Topics */}
      <div className="mt-6 md:mt-8 pb-2">
        <h3 className="text-blue-200/60 text-[10px] font-bold uppercase tracking-widest mb-3 px-1">Quick Start Topics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3">
          {TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => onGenerate(topic.label, false)}
              className="px-3 py-3 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/30 rounded-xl transition-all text-sm text-blue-100 flex items-center justify-center gap-2 backdrop-blur-sm active:scale-95 shadow-sm"
            >
              <span>{topic.icon}</span>
              <span className="truncate">{topic.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};