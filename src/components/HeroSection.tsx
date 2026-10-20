import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Sparkles, MapPin, ChevronDown } from 'lucide-react';
import { triggerPushpaVarsha } from '../utils/confettiHelper';

interface HeroSectionProps {
  onExploreJourney: () => void;
  onOpenWishes: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreJourney,
  onOpenWishes
}) => {
  // Birthday is October 27, 2026
  const targetBirthday = new Date('2026-10-27T00:00:00');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; isPassed: boolean }>({
    days: 0,
    hours: 0,
    minutes: 0,
    isPassed: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetBirthday.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, isPassed: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setTimeLeft({ days, hours, minutes, isPassed: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative pt-4 pb-16 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F3] to-[#FFFDF9]" spellCheck={false}>
      
      {/* Decorative Traditional Toran Ribbon */}
      <div className="w-full flex justify-center items-center py-2 text-xs tracking-widest text-[#9A3412]/80 uppercase font-medium bg-[#FFF3E8]/80 border-b border-[#FBE6D3]">
        <div className="flex items-center gap-2 max-w-5xl mx-auto px-4 overflow-hidden whitespace-nowrap text-ellipsis">
          <span className="text-amber-600">🪔</span>
          <span>शौर्य · संस्कार · अपार स्नेह · कुलदेवी माँ का आशीर्वाद</span>
          <span className="text-amber-600">🪔</span>
          <span className="hidden sm:inline">· The Sengar Rajput Parivar Keepsake (Madhya Pradesh)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Split Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typographic & Emotional Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Auspicious Blessing Tag */}
            <div className="flex items-center gap-2 text-xs text-[#9A3412] mb-3">
              <span className="font-semibold text-amber-700">शुभ प्राकट्योत्सव</span>
              <span aria-hidden="true">·</span>
              <span>2nd Birthday Milestone</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#9A3412]" />
                Madhya Pradesh, India
              </span>
            </div>

            {/* Main Headline - Clean, no underlines or wavy lines */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-royal tracking-tight text-[#4A1D13] leading-[1.2] mb-4 text-balance">
              Happy 2nd Birthday, <br />
              <span className="text-[#B94726] font-semibold">
                Baby Varnika Sengar!
              </span>
            </h1>

            {/* Hindi Shloka & Subtitle */}
            <p className="text-sm sm:text-base font-hindi text-[#8C4630] mb-3">
              "आयुष्मान भव, कुलदीपिका वर्णिका! सदा हँसती रहो, फूलों सी महकती रहो।"
            </p>

            <p className="text-base text-[#5C5248] leading-relaxed mb-6 max-w-xl">
              From the blessed morning of <strong>October 27, 2024</strong> to this joyous milestone of <strong>October 27, 2026</strong> — two glorious years of pure sunshine, sweet Hindi whispers, first steps, and traditional Rajput blessings for the proud Sengar family.
            </p>

            {/* Countdown / Milestone Highlight Card */}
            <div className="p-4 sm:p-5 bg-white/90 rounded-2xl border border-[#F2E4D5] shadow-xs mb-8 max-w-xl">
              <div className="flex items-center justify-between mb-3 border-b border-[#F5EBE1] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎂</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6A58]">
                    {timeLeft.isPassed ? 'Milestone Reached' : 'Countdown to 2nd Birthday'}
                  </span>
                </div>
                <span className="text-xs text-[#9A3412] font-medium">Oct 27, 2024 → Oct 27, 2026</span>
              </div>

              {timeLeft.isPassed ? (
                <div className="text-center py-2">
                  <p className="text-lg font-royal text-[#7A2E1E]">🎉 Blessed 2nd Birthday Celebrations Are Live! 🎉</p>
                  <p className="text-xs text-[#7A6A58] mt-1">Varnika is officially 2 years old! Shower her with love.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-[#FFF9F3] border border-[#F6EADB]">
                    <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
                      {timeLeft.days}
                    </div>
                    <div className="text-[11px] font-medium text-[#7A6A58] uppercase">Days To Go</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFF9F3] border border-[#F6EADB]">
                    <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
                      {timeLeft.hours}
                    </div>
                    <div className="text-[11px] font-medium text-[#7A6A58] uppercase">Hours</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFF9F3] border border-[#F6EADB]">
                    <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-[11px] font-medium text-[#7A6A58] uppercase">Minutes</div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreJourney}
                className="px-5 py-2.5 bg-[#8C3A24] hover:bg-[#722F1D] text-white text-sm font-medium rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore 2-Year Journey</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenWishes}
                className="px-5 py-2.5 bg-white hover:bg-[#FAF4ED] text-[#7A2E1E] text-sm font-medium rounded-xl border border-[#EAD7C5] shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Family Wishes Wall</span>
              </button>

              <button
                onClick={() => triggerPushpaVarsha()}
                className="px-4 py-2.5 bg-[#FFF2E2] hover:bg-[#FEE7CC] text-[#9A3412] text-sm font-medium rounded-xl border border-[#F6DBC2] transition-all flex items-center gap-1.5 cursor-pointer"
                title="Shower flower petals on Varnika"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Shower Flowers 🌸</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual Frame with Baby Varnika - Aligned Perfectly */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Auspicious Golden Border Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-200 via-rose-200 to-amber-300 rounded-3xl blur-md opacity-35"></div>

              <div className="relative bg-white p-3 sm:p-4 rounded-3xl border border-[#F2DECC] shadow-md">
                
                {/* Photo container - Perfectly aligned in 3:4 portrait frame without cutting head or gesture */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF6F0] flex items-center justify-center">
                  <img
                    src="/assets/aistudio/IMG_20261019_165306_bab6a894.jpg"
                    alt="Baby Varnika Sengar holding up two fingers for her 2nd birthday"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Elegant Caption Card Below Photo (Clean, non-obscuring) */}
                <div className="mt-3.5 pt-3 border-t border-[#F5EBE1]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-amber-700 uppercase block">
                        "Look, I'm Turning 2!" ✌️
                      </span>
                      <h3 className="text-base font-royal font-semibold text-[#4A1D13] leading-snug">
                        Princess Varnika Sengar
                      </h3>
                    </div>
                    <span className="text-xl">🪔</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#7A6A58]">
                    <span>Captured with love by Rohit Papa & Mumma</span>
                    <span>Oct 19, 2026</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Full-width Milestone Strip Below Split Hero */}
        <div className="mt-14 pt-8 border-t border-[#F3E5D7] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 bg-white/70 rounded-2xl border border-[#F5E8DC] text-center">
            <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
              730+
            </div>
            <div className="text-xs font-medium text-[#7A6A58] mt-1">Days of Smiles & Grace</div>
          </div>

          <div className="p-4 bg-white/70 rounded-2xl border border-[#F5E8DC] text-center">
            <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
              5+
            </div>
            <div className="text-xs font-medium text-[#7A6A58] mt-1">Sacred Indian Festivals</div>
          </div>

          <div className="p-4 bg-white/70 rounded-2xl border border-[#F5E8DC] text-center">
            <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
              10+
            </div>
            <div className="text-xs font-medium text-[#7A6A58] mt-1">Milestone Phases Captured</div>
          </div>

          <div className="p-4 bg-white/70 rounded-2xl border border-[#F5E8DC] text-center">
            <div className="text-2xl sm:text-3xl font-royal font-bold text-[#8C3A24] tabular-nums">
              5 Years
            </div>
            <div className="text-xs font-medium text-[#7A6A58] mt-1">Time Capsule to Age 7</div>
          </div>
        </div>

      </div>
    </section>
  );
};
