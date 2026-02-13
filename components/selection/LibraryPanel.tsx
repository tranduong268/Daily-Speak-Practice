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
    // Container
    <div className="flex-none w-full lg:w-96 xl:w-[28rem] flex flex-col mt-4 lg:mt-0 lg:pt-4 mb-20 lg:mb-0">
      
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-3 px-1">
         <h3 className="text-lg font-bold text-white tracking-tight">Your Library</h3>
         <div className="flex gap-2">
           <button onClick={onExport} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-200 transition-colors active:scale-95" title="Export">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
           </button>
           <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-200 transition-colors active:scale-95" title="Import">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
           </button>
           <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
         </div>
      </div>

      {/* Scrollable Glass List */}
      {/* CHANGED: Explicit min-height and background color settings to ensure visibility on mobile */}
      <div className="h-auto min-h-[400px] lg:min-h-0 lg:h-auto lg:flex-1 bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl flex flex-col relative">
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar max-h-[500px] lg:max-h-none">
          {savedLessons.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-blue-300/40 text-center p-6 min-h-[300px]">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-sm">No lessons yet.</p>
            </div>
          ) : (
            savedLessons.map(lesson => (
              <div 
                key={lesson.id}
                onClick={() => onLoadLesson(lesson)}
                className="group relative p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800/90 border border-white/5 hover:border-cyan-400/30 cursor-pointer transition-all duration-300 shadow-sm active:scale-[0.99]"
              >
                <div className="pr-6">
                  <h4 className="font-extrabold text-white text-sm mb-1 drop-shadow-md tracking-wide">{lesson.topic}</h4>
                  <p className="text-xs text-blue-100 font-medium line-clamp-2 leading-relaxed drop-shadow-sm opacity-80">{lesson.vietnameseTranslation}</p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className="text-[10px] uppercase tracking-wider text-blue-200/60 font-bold">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </span>
                    {(lesson.audioEnBlob || lesson.audioCnBlob) && (
                       <span className="px-1.5 py-0.5 rounded bg-cyan-900/50 text-cyan-300 text-[9px] font-bold border border-cyan-500/30 shadow-sm">
                         AUDIO
                       </span>
                    )}
                  </div>
                </div>
                
                {/* Hover Delete - Improved Hit Area */}
                <button 
                  onClick={(e) => onDeleteLesson(lesson.id, e)}
                  className="absolute top-1 right-1 p-2 text-slate-500 hover:text-red-400 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))
          )}
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};