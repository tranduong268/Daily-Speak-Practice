import React, { useRef } from 'react';
import { SavedLesson } from '../../types';

interface Props {
  savedLessons: SavedLesson[];
  onLoadLesson: (lesson: SavedLesson) => void;
  onDeleteLesson: (id: string, e: React.MouseEvent) => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export const LibraryPanel: React.FC<Props> = ({ 
  savedLessons, 
  onLoadLesson, 
  onDeleteLesson, 
  onExport, 
  onImport 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImport(e.target.files[0]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    // Main Panel Container
    // Mobile: w-full, padding. 
    // Desktop: h-full (fills the right column), flex-col to manage header vs list.
    <div className="flex flex-col w-full h-auto lg:h-full p-4 md:p-6 lg:py-10">
      
      {/* Header Actions */}
      <div className="flex-none flex justify-between items-center mb-4">
         <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>📚</span> Your Library
         </h3>
         <div className="flex gap-2">
           <button onClick={onExport} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-200 transition-colors active:scale-95" title="Export Backup">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
           </button>
           <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-200 transition-colors active:scale-95" title="Import Backup">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
           </button>
           <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
         </div>
      </div>

      {/* List Container - Glass Effect */}
      {/* Mobile: Fixed min-height or auto. 
          Desktop: flex-1 (fills remaining vertical space), overflow-hidden (contains the scrollable list). 
      */}
      <div className="flex-1 bg-slate-900/40 lg:bg-slate-800/30 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl flex flex-col relative min-h-[400px] lg:min-h-0">
        
        {/* Scrollable List */}
        {/* Mobile: max-h-[500px] (optional constraint). Desktop: h-full, overflow-y-auto. */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {savedLessons.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-blue-300/40 text-center p-6">
              <div className="text-5xl mb-3 opacity-50">📭</div>
              <p className="text-base font-medium">No lessons saved yet.</p>
              <p className="text-xs mt-1 opacity-70">Generate one to get started!</p>
            </div>
          ) : (
            savedLessons.map(lesson => (
              <div 
                key={lesson.id}
                onClick={() => onLoadLesson(lesson)}
                className="group relative p-4 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-white/5 hover:border-cyan-400/30 cursor-pointer transition-all duration-200 shadow-sm active:scale-[0.99]"
              >
                <div className="pr-8">
                  <h4 className="font-extrabold text-white text-sm mb-1.5 drop-shadow-md tracking-wide leading-tight">
                    {lesson.topic}
                  </h4>
                  <p className="text-xs text-blue-200/70 font-medium line-clamp-2 leading-relaxed">
                    {lesson.vietnameseTranslation}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold bg-black/20 px-1.5 py-0.5 rounded">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </span>
                    {(lesson.audioEnBlob || lesson.audioCnBlob) && (
                       <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-900/30 text-cyan-300 text-[9px] font-bold border border-cyan-500/20">
                         <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                         AUDIO
                       </span>
                    )}
                  </div>
                </div>
                
                {/* Delete Button - Always visible on mobile for easier access, hover on desktop */}
                <button 
                  onClick={(e) => onDeleteLesson(lesson.id, e)}
                  className="absolute top-2 right-2 p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-100 lg:opacity-0 group-hover:opacity-100"
                  title="Delete Lesson"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))
          )}
        </div>
        
        {/* Visual Fade at Bottom for aesthetic depth */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};