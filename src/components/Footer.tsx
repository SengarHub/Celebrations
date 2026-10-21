import React from 'react';
import { Heart, ArrowUp, Share2, Sparkles } from 'lucide-react';
import { triggerPushpaVarsha } from '../utils/confettiHelper';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `🎉 Celebrate Baby Varnika Sengar's 2nd Birthday (Oct 27, 2026)! 🎂\nExplore her 2-year journey, Indian Rajput traditions & send your heartfelt blessings to the family album:\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-[#FAF3EA] border-t border-[#EDDCBA] py-12 text-[#6B5E51]" spellCheck={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#E8DACB]">
          
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-royal font-bold text-[#4A1D13] mb-1">
              <span>🪔</span>
              <span>Baby Varnika Sengar · The Sengar Family Journey</span>
            </div>
            <p className="text-xs text-[#7A6A58] max-w-lg leading-relaxed">
              Preserving two golden years of love, Rajput traditions, and sacred Indian festivals (Oct 27, 2024 to Oct 27, 2026). A living digital heirloom for the Sengar Parivar in Madhya Pradesh and across the world.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={shareOnWhatsApp}
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={() => triggerPushpaVarsha()}
              className="px-4 py-2 bg-white hover:bg-[#FFF3E8] text-[#8C3A24] text-xs font-semibold rounded-xl border border-[#EDDCBA] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Pushpa Varsha 🌸</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 bg-white hover:bg-[#FFF3E8] text-[#7A6A58] hover:text-[#4A1D13] rounded-xl border border-[#EDDCBA] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Quiet footer metadata */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A7B6D]">
          <div className="flex items-center gap-2">
            <span>October 27, 2026 Milestone</span>
            <span aria-hidden="true">·</span>
            <span>Madhya Pradesh, India</span>
            <span aria-hidden="true">·</span>
            <span>5-Year Living Keepsake</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted with boundless love by Rohit Papa & Mumma</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};
