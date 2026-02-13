import React from 'react';
import { UserSettings } from '../types';

interface Props {
  settings: UserSettings;
  onUpdate: (newSettings: UserSettings) => void;
}

const SettingsPanel: React.FC<Props> = ({ settings, onUpdate }) => {
  const toggle = (key: keyof UserSettings) => {
    if (typeof settings[key] === 'boolean') {
      onUpdate({ ...settings, [key]: !settings[key] });
    }
  };

  const toggleGender = () => {
    onUpdate({ 
      ...settings, 
      voiceGender: settings.voiceGender === 'male' ? 'female' : 'male' 
    });
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center py-4 bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700">
      <button
        onClick={() => toggle('showPhonetic')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          settings.showPhonetic 
            ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20' 
            : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
        }`}
      >
        IPA {settings.showPhonetic ? 'ON' : 'OFF'}
      </button>

      <button
        onClick={() => toggle('showStress')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          settings.showStress
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
            : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
        }`}
      >
        Stress {settings.showStress ? 'ON' : 'OFF'}
      </button>

      <button
        onClick={() => toggle('showTranslation')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          settings.showTranslation
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
            : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
        }`}
      >
        Meaning {settings.showTranslation ? 'ON' : 'OFF'}
      </button>

      <button
        onClick={toggleGender}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
          settings.voiceGender === 'female'
            ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/20'
            : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
        }`}
      >
        {settings.voiceGender === 'female' ? (
          <><span>👩</span> Female Voice</>
        ) : (
          <><span>👨</span> Male Voice</>
        )}
      </button>
    </div>
  );
};

export default SettingsPanel;