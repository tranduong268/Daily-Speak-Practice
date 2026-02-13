import React, { useEffect, useRef, useState, useMemo } from 'react';
import { LanguageContent, UserSettings } from '../types';
import { WordSegment } from './teleprompter/WordSegment';

interface Props {
  data: LanguageContent; 
  settings: UserSettings;
  isPlaying: boolean;
  isAudioMode?: boolean; 
  audioRef?: React.MutableRefObject<HTMLAudioElement | null>;
  onScrollComplete?: () => void;
}

interface SegmentMap {
  index: number;
  weight: number;
  startPct: number;
  endPct: number;
}

// OPTIMIZED WEIGHTS FOR GEMINI TTS
// Previous punctuation weight (12) was too high, causing the cursor to "wait" too long at the end of sentences
// while the audio had already moved on. Reducing this syncs the visual cursor tighter to the audio.
const calculateWeight = (word: string): number => {
  let w = word.length; 
  // Reduced from 12 to 3 to prevent "cursor lag" at sentence ends
  if (word.includes('.') || word.includes('?') || word.includes('!')) w += 3; 
  // Reduced from 5 to 2
  else if (word.includes(',') || word.includes(';') || word.includes('，')) w += 2;
  return w;
};

const Teleprompter: React.FC<Props> = ({ 
  data, 
  settings, 
  isPlaying, 
  isAudioMode = false, 
  audioRef,
  onScrollComplete 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const SCROLL_SPEED = settings.teleprompterSpeed * 0.5; 

  // Reset scroll when content changes
  useEffect(() => {
    setScrollPos(0);
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, [data]);

  // Reset logic when starting playback from bottom
  useEffect(() => {
    if (isPlaying && containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 100) {
         setScrollPos(0);
         if (containerRef.current) containerRef.current.scrollTop = 0;
      }
    }
  }, [isPlaying]);

  // Generate Time Map
  const segmentMap = useMemo<SegmentMap[]>(() => {
    if (!data?.segments) return [];

    let totalWeight = 0;
    const weights = data.segments.map((seg, idx) => {
      const w = calculateWeight(seg.word);
      totalWeight += w;
      return { index: idx, weight: w };
    });

    let currentAccumulator = 0;
    return weights.map(item => {
      const startPct = currentAccumulator / totalWeight;
      currentAccumulator += item.weight;
      const endPct = currentAccumulator / totalWeight;
      return { ...item, startPct, endPct };
    });
  }, [data]);

  const handleManualScroll = () => {
    if (!isPlaying && containerRef.current) {
      setScrollPos(containerRef.current.scrollTop);
    }
  };

  // --- MAIN ANIMATION LOOP ---
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!isPlaying || !containerRef.current) return;

      if (isAudioMode && audioRef?.current) {
        // --- AUDIO SYNC LOGIC ---
        const audio = audioRef.current;
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        
        if (duration > 0) {
          const progress = currentTime / duration;
          
          // Find active segment
          const activeSegment = segmentMap.find(
            seg => progress >= seg.startPct && progress < seg.endPct
          );

          if (activeSegment) {
            const el = document.getElementById(`segment-${activeSegment.index}`);
            if (el) {
              const containerH = containerRef.current.clientHeight;
              const elHeight = el.offsetHeight;
              const elTop = el.offsetTop;
              
              // FORMULA FOR EXACT CENTER
              // Adjusted Math: We want the element to be strictly in the center.
              const targetTop = elTop - (containerH / 2) + (elHeight / 2);
              
              const currentTop = containerRef.current.scrollTop;
              const dist = targetTop - currentTop;
              
              // TRIỆT ĐỂ SOLUTION:
              // 1. Threshold: If distance is < 1px, don't move (saves micro-jitters).
              // 2. Factor: 0.5. 
              //    - 0.9 was too fast (jittery). 
              //    - 0.1 was too slow (laggy).
              //    - 0.5 provides a "magnetic" feel. It closes 50% of the gap every 16ms.
              if (Math.abs(dist) > 0.5) {
                 const nextPos = currentTop + (dist * 0.5); 
                 containerRef.current.scrollTop = nextPos;
                 setScrollPos(nextPos);
              }
            }
          } else if (progress >= 0.99 && audio.ended) {
             if(onScrollComplete) onScrollComplete();
          }
        }
      } else {
        // --- AUTO SCROLL (TEXT MODE) ---
        setScrollPos((prev) => {
          const currentDOMScroll = containerRef.current?.scrollTop || prev;
          const maxScroll = containerRef.current!.scrollHeight - containerRef.current!.clientHeight;
          
          if (currentDOMScroll >= maxScroll - 5) { 
             if(onScrollComplete) onScrollComplete();
             return prev; 
          }
          const next = currentDOMScroll + SCROLL_SPEED;
          containerRef.current!.scrollTop = next;
          return next;
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, SCROLL_SPEED, onScrollComplete, isAudioMode, audioRef, segmentMap]);

  if (!data?.segments) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <p>No content segments available.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden shadow-inner group">
      
      {/* REMOVED ALL GRADIENTS & LINES per user request for clear visibility */}
      
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        onScroll={handleManualScroll}
        // Added `scroll-behavior: auto` to ensure JS scroll overrides any native smooth scrolling
        className="h-full overflow-y-auto no-scrollbar px-3 md:px-8 py-[50vh] text-center touch-pan-y relative z-0 scroll-auto"
      >
        <div className="flex flex-wrap justify-center content-center items-center">
          {data.segments.map((seg, idx) => (
            <WordSegment 
              key={idx} 
              index={idx} 
              segment={seg} 
              settings={settings} 
            />
          ))}
        </div>
      </div>

      {/* Status Badge */}
      {isPlaying && (
        <div className="absolute bottom-4 right-4 text-[10px] md:text-xs text-slate-500 bg-black/60 backdrop-blur px-2 py-1 rounded z-20">
          {isAudioMode ? "Syncing..." : "Auto-scroll"}
        </div>
      )}
    </div>
  );
};

export default Teleprompter;