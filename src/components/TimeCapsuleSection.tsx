import React, { useState } from 'react';
import { TimeCapsuleLetter } from '../types/keepsake';
import { Lock, Mail, Clock, Shield, Sparkles, BookOpen, X, Printer } from 'lucide-react';

interface TimeCapsuleSectionProps {
  letters: TimeCapsuleLetter[];
}

export const TimeCapsuleSection: React.FC<TimeCapsuleSectionProps> = ({ letters }) => {
  const [selectedLetter, setSelectedLetter] = useState<TimeCapsuleLetter | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="capsule" className="py-16 bg-[#FFF9F3] border-t border-[#F2E4D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C3A24] uppercase tracking-wider mb-2">
            <span>⏳</span>
            <span>भविष्य की धरोहर · 5-Year Living Keepsake</span>
            <span>⏳</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-royal text-[#4A1D13] tracking-tight">
            The 5-Year Future Time Capsule
          </h2>
          <p className="text-sm text-[#7A6A58] mt-2 leading-relaxed">
            Letters sealed on her 2nd birthday (Oct 27, 2026), meant to be unlocked and read with Varnika as she blossoms through ages 3, 4, 5, 6, and 7 (up to October 2031).
          </p>
        </div>

        {/* 5 Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {letters.map((letter) => (
            <div
              key={letter.id}
              className="bg-white rounded-3xl border border-[#EDDCBA] shadow-xs p-6 flex flex-col justify-between hover:border-[#D6A778] transition-all group"
            >
              <div>
                {/* Envelope Wax Seal Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF3E8] border border-[#F6DCBE] flex items-center justify-center text-amber-800">
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-royal font-bold text-[#8C3A24] block">
                      Age {letter.targetAge} Milestone
                    </span>
                    <span className="text-[11px] text-[#8A7B6D] flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      Year {letter.unlockYear}
                    </span>
                  </div>
                </div>

                {/* Rajput Value Badge (clean unboxed text) */}
                <div className="text-xs font-hindi text-[#8C3A24] mb-2 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-700" />
                  <span>{letter.rajputValue}</span>
                </div>

                <h3 className="text-base font-royal font-semibold text-[#4A1D13] leading-snug mb-2">
                  {letter.title}
                </h3>

                <p className="text-xs text-[#6B5E51] leading-relaxed mb-4">
                  {letter.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F8EFE6] flex items-center justify-between">
                <span className="text-xs text-[#8A7B6D] font-medium">
                  By {letter.sender}
                </span>

                <button
                  onClick={() => setSelectedLetter(letter)}
                  className="px-3 py-1.5 bg-[#FFF3E8] hover:bg-[#FEE5CD] text-[#8C3A24] text-xs font-semibold rounded-xl border border-[#F6DCBE] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Letter</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notice for Family */}
        <div className="mt-12 text-center text-xs text-[#8A7B6D]">
          <span>🌟 Sealed with love by the Sengar Parivar · Accessible online for the next 5 years (2026–2031)</span>
        </div>

      </div>

      {/* Modal for Reading Time Capsule Letter */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#EDDCBA] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#F2E4D5]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#8C3A24] font-medium mb-1">
                  <span>Age {selectedLetter.targetAge} Capsule</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedLetter.subtitle}</span>
                </div>
                <h3 className="text-xl font-royal font-bold text-[#4A1D13]">
                  {selectedLetter.title}
                </h3>
                <p className="text-xs font-hindi text-amber-800 mt-0.5">
                  मूल्य: {selectedLetter.rajputValue}
                </p>
              </div>

              <button
                onClick={() => setSelectedLetter(null)}
                className="p-2 text-[#7A6A58] hover:text-[#4A1D13] rounded-full hover:bg-[#FAF4ED] transition-colors"
                aria-label="Close letter"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: The Letter */}
            <div className="py-6 overflow-y-auto flex-1 text-sm text-[#4A4239] leading-relaxed whitespace-pre-line font-serif pr-2">
              <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#F3E6D8] shadow-2xs">
                {selectedLetter.fullLetter}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#F2E4D5] flex items-center justify-between text-xs">
              <span className="text-[#8A7B6D]">
                Written with boundless love on Oct 27, 2026
              </span>
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 bg-[#8C3A24] text-white rounded-xl text-xs font-medium hover:bg-[#722F1D] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Keepsake Note</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
