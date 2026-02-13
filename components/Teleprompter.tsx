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

// Helper to calculate word weight for auto-scroll timing
const calculateWeight = (word: string): number => {
  let w = word.length; 
  if (word.includes('.') || word.includes('?') || word.includes('!')) w += 12;
  else if (word.includes(',') || word.includes(';') || word.includes('，')) w += 5;
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
      // If we are very close to the bottom, reset to top to restart
      if (scrollHeight - scrollTop <= clientHeight + 100) {
         setScrollPos(0);
         if (containerRef.current) containerRef.current.scrollTop = 0;
      }
    }
  }, [isPlaying]);

  // Generate Time Map for Audio Sync
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

  // Handle Manual Scroll interaction
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
        // --- AUDIO SYNC LOGIC (CENTERING FIX) ---
        const audio = audioRef.current;
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        
        if (duration > 0) {
          const progress = currentTime / duration;
          const activeSegment = segmentMap.find(
            seg => progress >= seg.startPct && progress < seg.endPct
          );

          if (activeSegment) {
            const el = document.getElementById(`segment-${activeSegment.index}`);
            if (el) {
              const containerH = containerRef.current.clientHeight;
              const elHeight = el.offsetHeight;
              const elTop = el.offsetTop;
              
              // FORMULA FOR EXACT CENTER:
              // TargetScroll = ElementPosition - (Half of Viewport) + (Half of Element Height)
              // This aligns the center of the element with the center of the viewport.
              const targetTop = elTop - (containerH / 2) + (elHeight / 2);
              
              const currentTop = containerRef.current.scrollTop;
              const dist = targetTop - currentTop;
              
              // IMPROVEMENT: Increased "Lerp" factor from 0.15 to 0.3
              // This makes the text "snap" to the center faster, avoiding the "lagging at bottom" feel.
              if (Math.abs(dist) > 500) {
                 // If distance is huge (e.g. skip forward), snap instantly
                 containerRef.current.scrollTop = targetTop;
                 setScrollPos(targetTop);
              } else {
                 // Smoothly slide to center (Active Line Centering)
                 const nextPos = currentTop + (dist * 0.3);
                 containerRef.current.scrollTop = nextPos;
                 setScrollPos(nextPos);
              }
            }
          } else if (progress >= 0.99 && audio.ended) {
             if(onScrollComplete) onScrollComplete();
          }
        }
      } else {
        // --- AUTO SCROLL LOGIC (Text only mode) ---
        setScrollPos((prev) => {
          const currentDOMScroll = containerRef.current?.scrollTop || prev;
          const maxScroll = containerRef.current!.scrollHeight - containerRef.current!.clientHeight;
          
          if (currentDOMScroll >= maxScroll - 5) { 
             if(onScrollComplete) onScrollComplete();
             return prev; 
          }
          // Sync state with DOM for smoothness
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
      {/* Visual Gradients - Keep center clear for reading */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>

      {/* Center Line Indicator (Subtle guide for user eyes) */}
      {isAudioMode && isPlaying && (
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/10 z-0 pointer-events-none transform -translate-y-1/2"></div>
      )}

      {/* Scrollable Container */}
      {/* py-[50vh] ensures the very first line starts in the MIDDLE and the very last line ends in the MIDDLE */}
      <div 
        ref={containerRef}
        onScroll={handleManualScroll}
        className="h-full overflow-y-auto no-scrollbar px-3 md:px-8 py-[50vh] text-center touch-pan-y relative z-0"
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