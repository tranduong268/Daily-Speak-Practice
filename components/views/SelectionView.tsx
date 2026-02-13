import React from 'react';
import { SavedLesson } from '../../types';
import { WelcomeHeader } from '../selection/WelcomeHeader';
import { GeneratorPanel } from '../selection/GeneratorPanel';
import { LibraryPanel } from '../selection/LibraryPanel';

interface Props {
  onGenerate: (topic: string, isCustom: boolean) => void;
  savedLessons: SavedLesson[];
  onLoadLesson: (lesson: SavedLesson) => void;
  onDeleteLesson: (id: string, e: React.MouseEvent) => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export const SelectionView: React.FC<Props> = ({ 
  onGenerate, 
  savedLessons, 
  onLoadLesson, 
  onDeleteLesson,
  onExport,
  onImport
}) => {
  return (
    // ROOT CONTAINER
    // Mobile (< lg): h-[100dvh] + overflow-y-auto => Entire page scrolls vertically.
    // Desktop (>= lg): h-[100dvh] + overflow-hidden => Page is fixed, inner columns scroll independently.
    <div className="w-full h-[100dvh] bg-slate-900 overflow-y-auto lg:overflow-hidden transition-all">
      
      {/* MAX WIDTH WRAPPER */}
      {/* Mobile: flex-col (Stack). Desktop: flex-row (Side-by-side), h-full (to fill viewport) */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-auto lg:h-full">
        
        {/* LEFT COLUMN (Generator) */}
        {/* Mobile: Standard block. Desktop: Flex-1, scrollable, padded. */}
        <div className="w-full lg:flex-1 p-4 md:p-6 lg:h-full lg:overflow-y-auto no-scrollbar pt-4 md:pt-8 lg:pt-10">
          <div className="max-w-2xl mx-auto lg:mx-0">
             <WelcomeHeader />
             <GeneratorPanel onGenerate={onGenerate} />
             {/* Spacer for mobile to separate from Library */}
             <div className="h-6 lg:hidden"></div>
          </div>
        </div>

        {/* RIGHT COLUMN (Library) */}
        {/* Mobile: Standard block. Desktop: Fixed width, full height, contained. */}
        {/* We pass specific styling to LibraryPanel via props or wrap it here. 
            Wrapping it ensures layout control. */}
        <div className="w-full lg:w-[28rem] xl:w-[30rem] lg:h-full lg:border-l lg:border-white/5 bg-slate-900/30 lg:bg-transparent">
           <LibraryPanel 
             savedLessons={savedLessons}
             onLoadLesson={onLoadLesson}
             onDeleteLesson={onDeleteLesson}
             onExport={onExport}
             onImport={onImport}
             // Helper prop to adjust internal sizing if needed, though CSS classes usually suffice
           />
        </div>

      </div>
    </div>
  );
};