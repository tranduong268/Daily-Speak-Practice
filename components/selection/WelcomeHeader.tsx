import React, { useState, useEffect } from 'react';
import { getRandomQuoteObj } from '../../data/themeData';

export const WelcomeHeader: React.FC = () => {
  const [dailyQuote, setDailyQuote] = useState({ en: "", vi: "" });

  useEffect(() => {
    setDailyQuote(getRandomQuoteObj());
  }, []);

  return (
    <>
      {/* Brand */}
      <div className="mb-4 md:mb-6 px-1">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-blue-200 drop-shadow-sm">
          SpeakDaily
        </h1>
        <p className="text-xs md:text-base text-blue-200/80 font-light mt-1">Daily Fluency Practice</p>
      </div>

      {/* Glass Quote Card */}
      <div className="mb-4 md:mb-6 p-4 md:p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl relative overflow-hidden group hover:bg-white/10 transition-all">
        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400/50"></div>
        <p className="text-base md:text-xl font-serif text-slate-100 italic mb-2">"{dailyQuote.en}"</p>
        <p className="text-xs md:text-sm text-cyan-200/80 font-light">{dailyQuote.vi}</p>
      </div>
    </>
  );
};