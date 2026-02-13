import React from 'react';

interface Props {
  onRetry: () => void;
}

export const ErrorView: React.FC<Props> = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-400 gap-4">
      <div className="text-5xl">⚠️</div>
      <p className="text-lg">Có lỗi xảy ra khi tạo nội dung.</p>
      <button 
        onClick={onRetry} 
        className="px-6 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white transition-colors border border-slate-700"
      >
        Thử lại
      </button>
    </div>
  );
};
