import React from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { triggerPushpaVarsha } from '../utils/confettiHelper';

interface HeaderNavProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenAddMemory: () => void;
  onOpenDriveGuide: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  isPlayingMusic,
  onToggleMusic,
  onOpenAddMemory,
  onOpenDriveGuide
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F2E8DC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <a 
          href="#home" 
          className="text-lg sm:text-xl font-royal tracking-wide text-[#7A2E1E] hover:text-[#9A3412] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-amber-600 text-lg">🪔</span>
          <span>Baby Varnika Sengar</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6B5E51]">
          <a href="#journey" className="hover:text-[#7A2E1E] transition-colors whitespace-nowrap shrink-0">
            2-Year Journey
          </a>
          <a href="#traditions" className="hover:text-[#7A2E1E] transition-colors whitespace-nowrap shrink-0">
            Rajput Traditions
          </a>
          <a href="#wishes" className="hover:text-[#7A2E1E] transition-colors whitespace-nowrap shrink-0">
            Family Wishes
          </a>
          <a href="#capsule" className="hover:text-[#7A2E1E] transition-colors whitespace-nowrap shrink-0">
            5-Year Time Capsule
          </a>
          <button
            onClick={onOpenDriveGuide}
            className="hover:text-[#7A2E1E] transition-colors whitespace-nowrap shrink-0 text-amber-800 text-xs flex items-center gap-1 bg-[#FDF4EB] px-2.5 py-1 rounded-md border border-[#F5E2CE]"
          >
            Drive Links Guide
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster (music toggle + pushpa varsha) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Pause gentle lullaby' : 'Play soft Indian lullaby'}
            aria-label="Toggle lullaby music"
            className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1.5 ${
              isPlayingMusic 
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-sm' 
                : 'bg-white border-[#EAD9C9] text-[#7A6A58] hover:bg-[#FAF6F0]'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-700 animate-pulse" />
                <span className="hidden sm:inline text-xs font-medium pr-1 text-amber-900">Music Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-medium pr-1">Soft Music</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              triggerPushpaVarsha();
            }}
            className="px-3.5 py-2 text-xs font-medium text-white bg-[#B94726] hover:bg-[#9C3A1E] active:scale-95 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pushpa Varsha 🌸</span>
          </button>
        </div>

      </div>
    </header>
  );
};
