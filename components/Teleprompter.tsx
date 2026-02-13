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

// OPTIMIZED WEIGHTS
const calculateWeight = (word: string): number => {
  let w = word.length; 
  if (word.includes('.') || word.includes('?') || word.includes('!')) w += 3; 
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
              // We want the MIDDLE of the element to be at the MIDDLE of the container.
              const targetTop = elTop - (containerH / 2) + (elHeight / 2);
              
              const currentTop = containerRef.current.scrollTop;
              const dist = targetTop - currentTop;
              
              // Smooth Lock: 0.5 lerp factor
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
    <div className="relative w-full h-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl group">
      
      {/* --- FOCUS GRADIENTS (The "Active Line" Effect) --- */}
      {/* Top Gradient: Blocks top 42%, fades to transparent */}
      <div className="absolute top-0 left-0 right-0 h-[42%] bg-gradient-to-b from-slate-950 via-slate-900/95 to-transparent z-10 pointer-events-none"></div>
      
      {/* Bottom Gradient: Blocks bottom 42%, fades to transparent */}
      <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-gradient-to-t from-slate-950 via-slate-900/95 to-transparent z-10 pointer-events-none"></div>

      {/* Optional: Subtle Center Line Indicator (Horizontal Bar) */}
      {/* <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-cyan-500/10 -translate-y-1/2 z-0 pointer-events-none"></div> */}

      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        onScroll={handleManualScroll}
        // 'scroll-behavior: auto' is crucial here so JS can force the scroll position without CSS fighting back
        className="h-full overflow-y-auto no-scrollbar px-4 md:px-8 py-[50vh] text-center touch-pan-y relative z-0"
        style={{ scrollBehavior: 'auto' }}
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
        <div className="absolute bottom-4 right-4 text-[10px] md:text-xs text-slate-500 bg-black/80 backdrop-blur px-2 py-1 rounded z-20 border border-slate-800">
          {isAudioMode ? "Syncing..." : "Auto-scroll"}
        </div>
      )}
    </div>
  );
};

export default Teleprompter;