import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Sparkles, MapPin, ChevronDown, FolderHeart, Music, Volume2, Dices } from 'lucide-react';
import { triggerPushpaVarsha } from '../utils/confettiHelper';
import { SHARED_DRIVE_FOLDER_URL } from '../data/keepsakeData';
import { ALL_DRIVE_MEDIA_ITEMS } from '../data/driveCatalog';
import { celebrationPlayer } from '../utils/audioPlayer';

interface HeroSectionProps {
  onExploreJourney: () => void;
  onExploreWishes: () => void;
  onSurpriseMemory?: () => void;
}

const HERO_PORTRAITS = [
  {
    id: 'two-fingers',
    label: "Turning 2! ✌️",
    src: '/assets/drive/20261019_154720.jpg',
    caption: '"Look, I am Turning Two!" — Two little fingers raised with pure joy',
    date: 'Oct 19, 2026'
  },
  {
    id: 'royal-poise',
    label: 'Rajput Princess 👑',
    src: '/assets/drive/20261019_154804.jpg',
    caption: 'Poised gracefully in traditional festive dress — The pride of Sengar lineage',
    date: 'Oct 19, 2026'
  },
  {
    id: 'mumma-embrace',
    label: "Mumma's Embrace ❤️",
    src: '/assets/drive/20261019_154813.jpg',
    caption: 'Wrapped in Mumma’s warm dupatta — Unconditional maternal love & shelter',
    date: 'Oct 19, 2026'
  },
  {
    id: 'radiant-smile',
    label: 'Pure Joy 🌸',
    src: '/assets/drive/20261019_154828.jpg',
    caption: 'A smile that lights up the whole room — Two glorious years of sunshine',
    date: 'Oct 19, 2026'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreJourney,
  onExploreWishes,
  onSurpriseMemory
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const activePortrait = HERO_PORTRAITS[activePhotoIdx];

  // Target milestone: 2nd birthday on October 27, 2026
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    isPassed: boolean;
  }>({ days: 0, hours: 0, minutes: 0, isPassed: false });

  useEffect(() => {
    const targetDate = new Date('2026-10-27T00:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, isPassed: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        setTimeLeft({ days, hours, minutes, isPassed: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="relative pt-4 pb-16 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F3] to-[#FFFDF9] select-text" 
      spellCheck={false}
    >
      
      {/* Decorative Traditional Toran Ribbon - completely clean and unlined */}
      <div className="w-full flex justify-center items-center py-2.5 text-xs tracking-wider text-[#9A3412] uppercase font-medium bg-[#FFF3E8] border-b border-[#FBE6D3]">
        <div className="flex items-center gap-2 max-w-5xl mx-auto px-4 overflow-hidden whitespace-nowrap text-ellipsis no-underline" spellCheck={false}>
          <span className="text-amber-600">🪔</span>
          <span className="font-semibold no-underline">शौर्य · संस्कार · अपार स्नेह · कुलदेवी माँ का आशीर्वाद</span>
          <span className="text-amber-600">🪔</span>
          <span className="hidden sm:inline no-underline">· The Sengar Rajput Parivar Keepsake (Madhya Pradesh)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Split Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typographic & Emotional Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center" spellCheck={false}>
            
            {/* Auspicious Blessing Tag */}
            <div className="flex items-center gap-2 text-xs text-[#9A3412] mb-3 no-underline">
              <span className="font-semibold text-amber-800 no-underline">शुभ प्राकट्योत्सव</span>
              <span aria-hidden="true">·</span>
              <span className="no-underline">2nd Birthday Milestone</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 no-underline">
                <MapPin className="w-3 h-3 text-[#9A3412]" />
                Madhya Pradesh, India
              </span>
            </div>

            {/* Main Headline - Completely clean typography without any underlines */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-royal tracking-tight text-[#4A1D13] leading-[1.2] mb-4 text-balance no-underline">
              Happy 2nd Birthday, <br />
              <span className="text-[#B94726] font-semibold no-underline">
                Baby Varnika Sengar!
              </span>
            </h1>

            {/* Hindi Shloka & Subtitle */}
            <p className="text-sm sm:text-base font-hindi text-[#8C4630] mb-3 no-underline" spellCheck={false}>
              "आयुष्मान भव, कुलदीपिका वर्णिका! सदा हँसती रहो, फूलों सी महकती रहो।"
            </p>

            <p className="text-base text-[#5C5248] leading-relaxed mb-6 max-w-xl no-underline" spellCheck={false}>
              From the blessed morning of <strong>October 27, 2024</strong> to this joyous milestone of <strong>October 27, 2026</strong> — two glorious years of pure sunshine, sweet Hindi whispers, first steps, and traditional Rajput blessings for the proud Sengar family in Madhya Pradesh.
            </p>

            {/* Countdown / Milestone Highlight Card */}
            <div className="p-4 sm:p-5 bg-white/95 rounded-2xl border border-[#F2E4D5] shadow-xs mb-7 max-w-xl">
              <div className="flex items-center justify-between mb-3 border-b border-[#F5EBE1] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎂</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6A58] no-underline">
                    {timeLeft.isPassed ? 'Milestone Reached' : 'Countdown to 2nd Birthday'}
                  </span>
                </div>
                <span className="text-xs text-[#9A3412] font-medium no-underline">Oct 27, 2024 → Oct 27, 2026</span>
              </div>

              {timeLeft.isPassed ? (
                <div className="text-center py-2">
                  <p className="text-lg font-royal text-[#7A2E1E] no-underline">🎉 Blessed 2nd Birthday Celebrations Are Live! 🎉</p>
                  <p className="text-xs text-[#7A6A58] mt-1 no-underline">Varnika is officially 2 years old! Shower her with love.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-[#FFF9F3] border border-[#F6EADB]">
                    <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
                      {timeLeft.days}
                    </div>
                    <div className="text-[11px] font-medium text-[#7A6A58] uppercase no-underline">Days To Go</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFF9F3] border border-[#F6EADB]">
                    <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
                      {timeLeft.hours}
                    </div>
                    <div className="text-[11px] font-medium text-[#7A6A58] uppercase no-underline">Hours</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFF9F3] border border-[#F6EADB]">
                    <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-[11px] font-medium text-[#7A6A58] uppercase no-underline">Minutes</div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreJourney}
                className="px-5 py-2.5 bg-[#8C3A24] hover:bg-[#722F1D] text-white text-sm font-medium rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer no-underline"
              >
                <span>Explore 2-Year Journey</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Surprise Memory Quick Dice Button */}
              {onSurpriseMemory && (
                <button
                  onClick={onSurpriseMemory}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer no-underline transform hover:scale-105 active:scale-95"
                  title="Surprise Memory 🎲 (Shuffle to a unique photo or video memory without repeats)"
                >
                  <Dices className="w-4 h-4 text-white" />
                  <span>Surprise Memory 🎲</span>
                </button>
              )}

              <button
                onClick={onExploreWishes}
                className="px-4 py-2.5 bg-white hover:bg-[#FAF6F0] text-[#7A2E1E] text-sm font-medium rounded-xl border border-[#E8D7C6] transition-all flex items-center gap-1.5 cursor-pointer no-underline"
              >
                <Heart className="w-4 h-4 text-[#B94726]" />
                <span>Family Wishes Wall</span>
              </button>

              {/* High-Volume Birthday Cake Cutting Celebration Button */}
              <button
                onClick={() => celebrationPlayer.celebrateCakeCutting()}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:to-orange-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer no-underline transform hover:scale-105 active:scale-95"
                title="Play high-volume Indian birthday music & shower flowers for cake cutting!"
              >
                <span>🎂</span>
                <span>Play Cake Cutting Music 🔊</span>
              </button>

              <a
                href={SHARED_DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#FFF2E2] hover:bg-[#FEE7CC] text-[#9A3412] text-sm font-medium rounded-xl border border-[#F6DBC2] transition-all flex items-center gap-1.5 cursor-pointer no-underline"
                title={`Open Google Drive folder with all ${ALL_DRIVE_MEDIA_ITEMS.length} original photos & videos`}
              >
                <FolderHeart className="w-4 h-4 text-amber-700" />
                <span>Google Drive Album ({ALL_DRIVE_MEDIA_ITEMS.length}) ↗</span>
              </a>

              <button
                onClick={() => triggerPushpaVarsha()}
                className="px-3.5 py-2.5 bg-[#FFF8F0] hover:bg-[#FFF2E4] text-[#9A3412] text-sm font-medium rounded-xl border border-[#F6DBC2] transition-all flex items-center gap-1.5 cursor-pointer no-underline"
                title="Shower flower petals on Varnika"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Shower Flowers 🌸</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual Frame with Baby Varnika - Aligned in Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Auspicious Golden Border Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-200 via-rose-200 to-amber-300 rounded-3xl blur-md opacity-35"></div>

              <div className="relative bg-white p-3.5 sm:p-4 rounded-3xl border border-[#F2DECC] shadow-md">
                
                {/* Photo container - Perfectly aligned in 4:5 portrait frame centered on baby Varnika */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF6F0] flex items-center justify-center border border-[#F0E2D2]">
                  <img
                    src={activePortrait.src}
                    alt={activePortrait.caption}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-102"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md font-medium">
                    {activePortrait.label}
                  </div>
                </div>

                {/* Switchable Portrait Selector Chips */}
                <div className="mt-3 grid grid-cols-4 gap-1.5 p-1 bg-[#FAF4ED] rounded-xl border border-[#F0E2D2]">
                  {HERO_PORTRAITS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`py-1 px-1 text-[10px] sm:text-[11px] font-medium rounded-lg text-center transition-all cursor-pointer truncate ${
                        activePhotoIdx === idx
                          ? 'bg-white text-[#8C3A24] shadow-2xs font-bold'
                          : 'text-[#7A6A58] hover:text-[#4A1D13]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Elegant Caption Card Below Photo (Clean, non-obscuring) */}
                <div className="mt-3 pt-3 border-t border-[#F5EBE1]" spellCheck={false}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-amber-800 uppercase block no-underline">
                        Sengar Family Keepsake 🪔
                      </span>
                      <h3 className="text-base font-royal font-semibold text-[#4A1D13] leading-snug no-underline">
                        Princess Varnika Sengar
                      </h3>
                    </div>
                    <span className="text-xl">✌️</span>
                  </div>
                  <p className="mt-1 text-xs text-[#6B5E51] leading-relaxed no-underline">
                    {activePortrait.caption}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#8C7A6B] no-underline">
                    <span>Captured with love by Rohit Papa & Mumma</span>
                    <span>{activePortrait.date}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Full-width Milestone Strip Below Split Hero */}
        <div className="mt-14 pt-8 border-t border-[#F3E5D7] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6" spellCheck={false}>
          <div className="p-4 bg-white/80 rounded-2xl border border-[#F5E8DC] text-center">
            <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
              730+
            </div>
            <div className="text-xs font-medium text-[#7A6A58] mt-1 no-underline">Days of Smiles & Grace</div>
          </div>

          <div className="p-4 bg-white/80 rounded-2xl border border-[#F5E8DC] text-center">
            <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
              46
            </div>
            <div className="text-xs font-medium text-[#7A6A58] mt-1 no-underline">Drive Photos & Videos</div>
          </div>

          <div className="p-4 bg-white/80 rounded-2xl border border-[#F5E8DC] text-center">
            <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
              7 Phases
            </div>
            <div className="text-xs font-medium text-[#7A6A58] mt-1 no-underline">Milestones Captured</div>
          </div>

          <div className="p-4 bg-white/80 rounded-2xl border border-[#F5E8DC] text-center">
            <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
              5 Years
            </div>
            <div className="text-xs font-medium text-[#7A6A58] mt-1 no-underline">Time Capsule to Age 7</div>
          </div>
        </div>

      </div>
    </section>
  );
};
