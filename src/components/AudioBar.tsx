import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioBarProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioBar: React.FC<AudioBarProps> = ({ isPlaying, onToggle }) => {
  return (
    <aside 
      aria-label="Ambient Lullaby Controller"
      className="fixed bottom-4 right-4 z-30 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md border border-[#EDDCBA] rounded-2xl shadow-lg p-2.5 sm:px-4 sm:py-3 flex items-center gap-3 transition-all"
    >
      <button
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause peaceful lullaby' : 'Play peaceful lullaby'}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
          isPlaying
            ? 'bg-[#8C3A24] text-white shadow-xs'
            : 'bg-[#FFF3E8] text-[#8C3A24] hover:bg-[#FEE5CD]'
        }`}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </button>

      <div className="hidden sm:block text-left pr-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4A1D13]">
          <Music className="w-3 h-3 text-amber-700" />
          <span>{isPlaying ? 'Lullaby Playing (राग भूपाली)' : 'Soft Indian Lullaby'}</span>
        </div>
        <div className="text-[10px] text-[#8A7B6D]">
          {isPlaying ? 'Gentle acoustic chimes & tanpura drone' : 'Click to hear soothing chimes'}
        </div>
      </div>
    </aside>
  );
};
