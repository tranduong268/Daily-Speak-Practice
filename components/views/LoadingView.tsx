import React, { useEffect, useState } from 'react';
import { getThemeForTopic, getRandomQuote } from '../../data/themeData';

interface Props {
  pendingTopic: string;
}

export const LoadingView: React.FC<Props> = ({ pendingTopic }) => {
  const [quote, setQuote] = useState("");
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const theme = getThemeForTopic(pendingTopic);
    setBgImage(theme.backgroundImage);
    setQuote(getRandomQuote(theme));
  }, [pendingTopic]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105 animate-subtle-zoom"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-blue-950/70 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-8 text-center flex flex-col items-center">
        
        {/* Loading Spinner */}
        <div className="relative w-24 h-24 mb-10">
           <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
           <div className="absolute inset-0 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-3xl">✨</span>
           </div>
        </div>

        {/* Quote */}
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-2xl animate-fade-in-up">
          "{quote}"
        </h2>
        
        <p className="text-blue-200 text-lg uppercase tracking-widest font-medium animate-pulse">
          Creating your lesson...
        </p>
      </div>
    </div>
  );
};