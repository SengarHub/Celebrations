import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Volume1, 
  Music, 
  Sparkles, 
  Cake, 
  Zap, 
  ChevronUp, 
  ChevronDown,
  PartyPopper
} from 'lucide-react';
import { 
  celebrationPlayer, 
  BIRTHDAY_TRACKS, 
  AudioPlayerState 
} from '../utils/audioPlayer';

interface AudioBarProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioBar: React.FC<AudioBarProps> = ({ isPlaying, onToggle }) => {
  const [playerState, setPlayerState] = useState<AudioPlayerState>(celebrationPlayer.getState());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = celebrationPlayer.subscribe((state) => {
      if (typeof state === 'object' && state !== null) {
        setPlayerState(state as AudioPlayerState);
      }
    });
    return unsubscribe;
  }, []);

  const currentTrack = celebrationPlayer.getCurrentTrack();

  const handleCakeCuttingCelebration = () => {
    celebrationPlayer.celebrateCakeCutting();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    celebrationPlayer.setVolume(val);
  };

  const handleToggleBoost = () => {
    celebrationPlayer.toggleBoost();
  };

  return (
    <aside 
      aria-label="Birthday Celebration Music Controller"
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-md transition-all font-sans"
      spellCheck={false}
    >
      <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#F3DFC9] rounded-3xl shadow-2xl overflow-hidden text-[#2D2A26] transition-all">
        
        {/* Expanded Panel: Track Selection & Volume Booster */}
        {isExpanded && (
          <div className="p-4 bg-gradient-to-b from-[#FFF5EA] to-[#FFFDF9] border-b border-[#F5E2CE] space-y-3.5">
            {/* Header with Title & Indian Birthday Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C3A24] uppercase tracking-wider">
                <PartyPopper className="w-4 h-4 text-orange-600" />
                <span>Indian Birthday Celebration Music</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-stone-400 hover:text-stone-700 text-xs p-1 cursor-pointer"
                aria-label="Collapse panel"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Cake Cutting High-Energy Action Banner */}
            <div className="p-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-2xl text-white shadow-md flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <Cake className="w-4 h-4 text-amber-200 animate-bounce" />
                  <span>Cake Cutting Mode 🎂</span>
                </div>
                <div className="text-[11px] text-amber-100/90 mt-0.5">
                  High-volume celebratory music & Pushpa Varsha!
                </div>
              </div>
              <button
                onClick={handleCakeCuttingCelebration}
                className="px-3.5 py-1.5 bg-white hover:bg-amber-50 text-amber-900 font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer shrink-0 no-underline"
              >
                Start Cake Cutting 🎉
              </button>
            </div>

            {/* Track Selector List */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-[#7A6A58] uppercase tracking-wider">
                Select Celebration Track:
              </div>
              {BIRTHDAY_TRACKS.map((t) => {
                const isSelected = t.id === playerState.currentTrackId;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      celebrationPlayer.setTrack(t.id);
                      if (!playerState.playing) {
                        celebrationPlayer.play(t.id);
                      }
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#FFF0DF] border-[#F6D0AD] shadow-xs'
                        : 'bg-white border-[#F0E4D5] hover:bg-[#FAF4ED]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg shrink-0">{t.icon}</span>
                      <div className="truncate">
                        <div className={`text-xs font-bold truncate ${isSelected ? 'text-[#8C3A24]' : 'text-[#4A1D13]'}`}>
                          {t.title}
                        </div>
                        <div className="text-[10px] text-[#8A7969] truncate">
                          {t.hindiTitle}
                        </div>
                      </div>
                    </div>
                    {isSelected && playerState.playing && (
                      <div className="flex items-end gap-0.5 h-4 shrink-0 pr-1">
                        <span className="w-1 bg-[#8C3A24] rounded-full animate-[bounce_0.6s_infinite]" style={{ height: '70%' }} />
                        <span className="w-1 bg-amber-600 rounded-full animate-[bounce_0.8s_infinite]" style={{ height: '100%' }} />
                        <span className="w-1 bg-orange-600 rounded-full animate-[bounce_0.5s_infinite]" style={{ height: '45%' }} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* High Volume & Volume Booster Control */}
            <div className="pt-2 border-t border-[#F2E0CD]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#4A1D13] flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Celebration Volume:</span>
                  <strong className="text-[#8C3A24]">
                    {Math.round(playerState.volume * 100)}%
                  </strong>
                </span>
                <button
                  onClick={handleToggleBoost}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer flex items-center gap-1 ${
                    playerState.isBoosted
                      ? 'bg-amber-600 border-amber-700 text-white shadow-xs'
                      : 'bg-white border-[#E8D4C0] text-amber-900 hover:bg-[#FAF2E8]'
                  }`}
                  title="Boost volume up to 150% for loud cake cutting celebrations"
                >
                  <Zap className={`w-3 h-3 ${playerState.isBoosted ? 'fill-yellow-300 text-yellow-300' : 'text-amber-700'}`} />
                  <span>Boost {playerState.isBoosted ? 'ON (150%)' : 'OFF'}</span>
                </button>
              </div>

              <input
                type="range"
                min="0"
                max="1.5"
                step="0.05"
                value={playerState.volume}
                onChange={handleVolumeChange}
                className="w-full accent-[#8C3A24] cursor-pointer"
                aria-label="Music volume slider"
              />
              <div className="flex justify-between text-[10px] text-[#9A8B7C] mt-0.5">
                <span>Mute</span>
                <span>Normal (100%)</span>
                <span className="text-amber-800 font-semibold">High Boost (150%)</span>
              </div>
            </div>

          </div>
        )}

        {/* Compact Bar Always Visible */}
        <div className="p-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-2.5 sm:gap-3">
          
          {/* Play/Pause Button */}
          <button
            onClick={onToggle}
            aria-label={playerState.playing ? 'Pause birthday music' : 'Play high volume birthday music'}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md transform active:scale-95 ${
              playerState.playing
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                : 'bg-[#FFF0DF] text-[#8C3A24] hover:bg-[#FEE5CD] border border-[#F5DAC0]'
            }`}
          >
            {playerState.playing ? (
              <Volume2 className="w-5 h-5 animate-pulse" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          {/* Song Info & Dancing Equalizer */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 min-w-0 cursor-pointer text-left select-none"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#4A1D13] truncate">
              <span>{currentTrack.icon}</span>
              <span className="truncate">{currentTrack.title}</span>
              {playerState.isBoosted && (
                <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.2 rounded-sm font-extrabold uppercase shrink-0">
                  LOUD
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-[10px] text-[#8A7969] mt-0.5 truncate">
              <span>{playerState.playing ? 'Now Playing · Click for options' : 'High-Volume Celebration Track'}</span>
              {playerState.playing && (
                <div className="flex items-end gap-0.5 h-3 shrink-0">
                  <span className="w-0.5 bg-amber-700 rounded-full animate-[bounce_0.6s_infinite]" style={{ height: '60%' }} />
                  <span className="w-0.5 bg-orange-600 rounded-full animate-[bounce_0.9s_infinite]" style={{ height: '100%' }} />
                  <span className="w-0.5 bg-rose-600 rounded-full animate-[bounce_0.5s_infinite]" style={{ height: '40%' }} />
                </div>
              )}
            </div>
          </div>

          {/* Quick Cake Cutting Celebration Button & Expand Arrow */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCakeCuttingCelebration}
              className="px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1 no-underline"
              title="Cut The Birthday Cake! (High Volume Anthem + Confetti)"
            >
              <span>🎂</span>
              <span className="hidden sm:inline">Cake Cutting</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label={isExpanded ? 'Collapse audio details' : 'Expand audio details'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>
    </aside>
  );
};
