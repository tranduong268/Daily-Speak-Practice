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
    // Layout Container
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 animate-fade-in flex flex-col lg:flex-row gap-6 lg:gap-8 min-h-[100dvh] overflow-y-auto">
      
      {/* LEFT COLUMN: Input & Inspiration */}
      <div className="flex-1 flex flex-col justify-start pt-2 md:pt-4">
        
        <WelcomeHeader />
        
        <GeneratorPanel onGenerate={onGenerate} />

      </div>

      {/* RIGHT COLUMN: Library */}
      <LibraryPanel 
        savedLessons={savedLessons}
        onLoadLesson={onLoadLesson}
        onDeleteLesson={onDeleteLesson}
        onExport={onExport}
        onImport={onImport}
      />

    </div>
  );
};