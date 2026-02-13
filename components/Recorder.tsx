import React, { useRef, useState, useEffect } from 'react';

interface Props {
  isRecording: boolean;
  onRecordingComplete: (blobUrl: string) => void;
}

const Recorder: React.FC<Props> = ({ isRecording, onRecordingComplete }) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isRecording) {
      setDuration(0);
      interval = window.setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
      startRecording();
    } else {
      stopRecording();
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        onRecordingComplete(url);
        
        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setError(null);
    } catch (err) {
      console.error("Mic Error:", err);
      setError("Microphone access denied or unavailable.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  if (error) {
    return <div className="text-red-400 text-sm mt-2">{error}</div>;
  }

  if (!isRecording) return null;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-red-900/80 px-4 py-2 rounded-full border border-red-500 z-50">
      <div className="w-3 h-3 bg-red-500 rounded-full recording-pulse"></div>
      <span className="font-mono text-white text-sm font-bold">{formatTime(duration)}</span>
    </div>
  );
};

export default Recorder;
