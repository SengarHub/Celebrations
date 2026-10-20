import React from 'react';
import { TRADITIONAL_FESTIVALS_INFO } from '../data/keepsakeData';
import { Sparkles, Heart, Shield, Flame, Sun } from 'lucide-react';

export const TraditionShowcase: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-600" />;
      case 'Sun': return <Sun className="w-5 h-5 text-amber-600" />;
      case 'Heart': return <Heart className="w-5 h-5 text-amber-600" />;
      default: return <Shield className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section id="traditions" className="py-16 bg-[#FFF9F3] border-t border-[#F2E4D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C3A24] uppercase tracking-wider mb-2">
            <span>🪔</span>
            <span>राजपूत संस्कार व भारतीय संस्कृति</span>
            <span>🪔</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-royal text-[#4A1D13] tracking-tight">
            Indian Hindu Traditions & Rajput Heritage
          </h2>
          <p className="text-sm text-[#6B5E51] mt-2 leading-relaxed">
            In the Sengar family roots of Madhya Pradesh, raising a daughter is considered the highest spiritual grace. Every festival in her first 2 years has anchored Varnika in purity, strength, and timeless sanskars.
          </p>
        </div>

        {/* Rajput Lineage Callout Card */}
        <div className="mb-12 p-6 sm:p-8 bg-white rounded-3xl border border-[#EDDCBA] shadow-xs max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF3E8] border border-[#F5DCBE] flex items-center justify-center shrink-0 text-3xl">
              🦁
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-[#9A3412] font-semibold mb-1">
                <span>The Sengar Rajput Legacy</span>
                <span aria-hidden="true">·</span>
                <span>Madhya Pradesh Roots</span>
              </div>
              <h3 className="text-lg sm:text-xl font-royal text-[#4A1D13] mb-2">
                "शौर्य, संस्कार, मर्यादा और अपार करुणा"
              </h3>
              <p className="text-sm text-[#5C5248] leading-relaxed">
                The Sengar Rajputs (descendants of the sacred Rishyasringa lineage) hold traditions of honor, courage, and supreme devotion to the Kuldevi. For our daughter Varnika, these roots are her wings — giving her the strength to soar with humility, fearlessness, and deep love for her culture.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Traditional Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRADITIONAL_FESTIVALS_INFO.map((trad, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-[#F3E5D7] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FFF5EC] border border-[#FCE6D2] flex items-center justify-center mb-4">
                  {getIcon(trad.icon)}
                </div>

                <div className="text-xs font-hindi text-[#8C3A24] mb-1">
                  {trad.hindi}
                </div>

                <h4 className="text-base font-royal font-semibold text-[#4A1D13] mb-2">
                  {trad.name}
                </h4>

                <p className="text-xs text-[#6B5E51] leading-relaxed">
                  {trad.significance}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F8EFE6] text-[11px] text-[#9A3412] font-medium flex items-center gap-1.5">
                <span>पवित्र प्रतीक:</span>
                <span className="text-[#5C5248]">{trad.motif}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
