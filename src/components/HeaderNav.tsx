import React from 'react';
import { Volume2, VolumeX, Sparkles, FolderHeart } from 'lucide-react';
import { triggerPushpaVarsha } from '../utils/confettiHelper';
import { SHARED_DRIVE_FOLDER_URL } from '../data/keepsakeData';
import { ALL_DRIVE_MEDIA_ITEMS } from '../data/driveCatalog';

interface HeaderNavProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenAddMemory: () => void;
  onOpenDriveGuide: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  isPlayingMusic,
  onToggleMusic,
  onOpenDriveGuide
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F2E8DC] transition-all" spellCheck={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark in display face without any underlines */}
        <a 
          href="#home" 
          className="text-lg sm:text-xl font-royal tracking-wide text-[#7A2E1E] hover:text-[#9A3412] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 no-underline"
          spellCheck={false}
        >
          <span className="text-amber-600 text-lg">🪔</span>
          <span className="no-underline">Baby Varnika Sengar</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links - completely free of spell check underlines */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6B5E51]" spellCheck={false}>
          <a href="#journey" className="hover:text-[#7A2E1E] transition-colors whitespace-nowrap shrink-0 no-underline">
            2-Year Journey
          </a>
          <a href="#traditions" className="hover:text-[#7A2E1E] transition-colors whitespace-nowrap shrink-0 no-underline">
            Rajput Traditions
          </a>
          <a href="#wishes" className="hover:text-[#7A2E1E] transition-colors whitespace-nowrap shrink-0 no-underline">
            Family Wishes
          </a>
          <a href="#capsule" className="hover:text-[#7A2E1E] transition-colors whitespace-nowrap shrink-0 no-underline">
            5-Year Time Capsule
          </a>
          <a
            href={SHARED_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#7A2E1E] transition-colors whitespace-nowrap shrink-0 text-amber-900 text-xs flex items-center gap-1.5 bg-[#FDF4EB] px-3 py-1.5 rounded-lg border border-[#F5E2CE] no-underline font-semibold"
            title={`Open Google Drive Folder with all ${ALL_DRIVE_MEDIA_ITEMS.length} photos & videos`}
          >
            <FolderHeart className="w-3.5 h-3.5 text-amber-700" />
            <span>Drive Folder ({ALL_DRIVE_MEDIA_ITEMS.length}) ↗</span>
          </a>
        </nav>

        {/* Zone 3: 1 primary action cluster (music toggle + pushpa varsha) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Pause birthday music' : 'Play high-volume Indian birthday music'}
            aria-label="Toggle birthday music"
            className={`px-3 py-1.5 rounded-full border transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
              isPlayingMusic 
                ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300 text-amber-950 font-bold' 
                : 'bg-white border-[#EAD9C9] text-[#7A6A58] hover:bg-[#FAF6F0]'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-orange-600 animate-pulse" />
                <span className="hidden sm:inline text-xs font-bold text-orange-900">🎂 Birthday Music</span>
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-orange-600 rounded-full animate-[bounce_0.6s_infinite]" style={{ height: '70%' }} />
                  <span className="w-0.5 bg-amber-600 rounded-full animate-[bounce_0.8s_infinite]" style={{ height: '100%' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-500" />
                <span className="hidden sm:inline text-xs font-semibold text-[#8C3A24]">🎂 Birthday Music</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              triggerPushpaVarsha();
            }}
            className="px-3.5 py-2 text-xs font-medium text-white bg-[#B94726] hover:bg-[#9C3A1E] active:scale-95 rounded-lg shadow-xs transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer no-underline"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pushpa Varsha 🌸</span>
          </button>
        </div>

      </div>
    </header>
  );
};
