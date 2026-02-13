import { useState, useEffect } from 'react';
import { SavedLesson, DailyContent } from '../types';
import { getAllLessons, deleteLessonFromDB, exportAllData, importData, saveLessonToDB } from '../services/dbService';

export const useLibrary = () => {
  const [savedLessons, setSavedLessons] = useState<SavedLesson[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    getAllLessons().then(setSavedLessons).catch(console.error);
  }, [refreshTrigger]);

  const refreshLibrary = () => setRefreshTrigger(prev => prev + 1);

  const saveLesson = async (data: DailyContent, audioEn?: Blob, audioCn?: Blob) => {
    await saveLessonToDB(data, audioEn, audioCn);
    refreshLibrary();
  };

  const deleteLesson = async (id: string) => {
    await deleteLessonFromDB(id);
    refreshLibrary();
  };

  const handleExport = async () => {
    const json = await exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speakdaily_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        try {
          await importData(text);
          refreshLibrary();
          alert("Nhập dữ liệu thành công!");
        } catch (err) {
          alert("File JSON không hợp lệ.");
        }
      }
    };
    reader.readAsText(file);
  };

  return {
    savedLessons,
    refreshLibrary,
    saveLesson,
    deleteLesson,
    handleExport,
    handleImport
  };
};