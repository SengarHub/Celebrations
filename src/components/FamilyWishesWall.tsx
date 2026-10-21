import React, { useState } from 'react';
import { FamilyWish } from '../types/keepsake';
import { Heart, Send, Sparkles, User, MessageCircle } from 'lucide-react';
import { triggerPushpaVarsha, triggerSparkles } from '../utils/confettiHelper';

interface FamilyWishesWallProps {
  wishes: FamilyWish[];
  onAddWish: (wish: Omit<FamilyWish, 'id' | 'flowerCount' | 'date'>) => void;
  onIncrementFlowers: (id: string) => void;
}

export const FamilyWishesWall: React.FC<FamilyWishesWallProps> = ({
  wishes,
  onAddWish,
  onIncrementFlowers
}) => {
  const [senderName, setSenderName] = useState('');
  const [relationRole, setRelationRole] = useState('Family Member');
  const [blessingTag, setBlessingTag] = useState<FamilyWish['blessingTag']>('आयुष्मान भव');
  const [message, setMessage] = useState('');
  const [hindiMessage, setHindiMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    onAddWish({
      senderName: senderName.trim(),
      relationship: relationRole,
      relationRole: relationRole,
      blessingTag,
      message: message.trim(),
      hindiMessage: hindiMessage.trim() || undefined
    });

    triggerPushpaVarsha();
    setSenderName('');
    setMessage('');
    setHindiMessage('');
    setIsSubmitting(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <section id="wishes" className="py-16 bg-[#FFFDF9] border-t border-[#F2E8DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C3A24] uppercase tracking-wider mb-2">
            <span>💌</span>
            <span>सपरिवार शुभाशीष व शुभकामनाएं</span>
            <span>💌</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-royal text-[#4A1D13] tracking-tight">
            Family Wishes & Blessings Wall
          </h2>
          <p className="text-sm text-[#7A6A58] mt-2">
            Heartfelt love and sacred blessings from Papa, Mumma, Grandparents (Dadu & Dadi in Madhya Pradesh, Nana & Nani), and the entire Sengar Parivar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Form to Add a Wish */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#F0E2D2] shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-xl bg-[#FFF3E8] text-[#8C3A24]">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-royal font-semibold text-[#4A1D13]">
                  Send Your Birthday Blessing
                </h3>
                <p className="text-xs text-[#8A7B6D]">
                  Write a note for Varnika to keep in this digital album
                </p>
              </div>
            </div>

            {showSuccessToast && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                <span>🌸 Your blessing has been added to the family wall!</span>
                <span className="font-bold">✓</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#5C5248] mb-1">
                  Your Name / रिश्ता (e.g. Rohit Papa, Dadu MP, Chachi) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A89887] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Enter your name"
                    spellCheck={false}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8DACB] bg-[#FFFDFB] focus:outline-hidden focus:ring-2 focus:ring-[#8C3A24]/20 focus:border-[#8C3A24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#5C5248] mb-1">
                    Relation / Role
                  </label>
                  <select
                    value={relationRole}
                    onChange={(e) => setRelationRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DACB] bg-[#FFFDFB] focus:outline-hidden focus:ring-2 focus:ring-[#8C3A24]/20 focus:border-[#8C3A24]"
                  >
                    <option value="Papa & Mumma">Papa & Mumma</option>
                    <option value="Dadu & Dadi (Madhya Pradesh)">Dadu & Dadi (MP)</option>
                    <option value="Nana & Nani">Nana & Nani</option>
                    <option value="Bua & Fufa Ji">Bua & Fufa Ji</option>
                    <option value="Chacha & Chachi">Chacha & Chachi</option>
                    <option value="Tauji & Taiji">Tauji & Taiji</option>
                    <option value="Masi & Mausa Ji">Masi & Mausa Ji</option>
                    <option value="Cousin Brother / Sister">Cousin</option>
                    <option value="Loving Family Friend">Family Friend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C5248] mb-1">
                    Vedic Blessing
                  </label>
                  <select
                    value={blessingTag}
                    onChange={(e) => setBlessingTag(e.target.value as FamilyWish['blessingTag'])}
                    className="w-full px-3 py-2 text-xs font-hindi rounded-xl border border-[#E8DACB] bg-[#FFFDFB] focus:outline-hidden focus:ring-2 focus:ring-[#8C3A24]/20 focus:border-[#8C3A24]"
                  >
                    <option value="आयुष्मान भव">आयुष्मान भव (Long Life)</option>
                    <option value="दीर्घायु भव">दीर्घायु भव (Longevity)</option>
                    <option value="कुलदीपिका">कुलदीपिका (Pride of Sengar)</option>
                    <option value="सदा मुसकाओ">सदा मुसकाओ (Joyful Smile)</option>
                    <option value="विजयी भव">विजयी भव (Courage & Victory)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5C5248] mb-1">
                  Heartfelt Birthday Message *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your prayers, love, or special memories with Varnika..."
                  spellCheck={false}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DACB] bg-[#FFFDFB] focus:outline-hidden focus:ring-2 focus:ring-[#8C3A24]/20 focus:border-[#8C3A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5C5248] mb-1">
                  Optional Hindi Blessings (शुभ संदेश)
                </label>
                <input
                  type="text"
                  value={hindiMessage}
                  onChange={(e) => setHindiMessage(e.target.value)}
                  placeholder="e.g. सदा हँसती रहो लाडली बिटिया, कुल का गौरव बढ़ाओ"
                  spellCheck={false}
                  className="w-full px-3 py-2 text-xs font-hindi rounded-xl border border-[#E8DACB] bg-[#FFFDFB] focus:outline-hidden focus:ring-2 focus:ring-[#8C3A24]/20 focus:border-[#8C3A24]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#8C3A24] hover:bg-[#722F1D] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Blessing & Shower Flowers 🌸</span>
              </button>
            </form>
          </div>

          {/* Right Column: Display of All Wishes */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#7A6A58] mb-2 px-1">
              <span>{wishes.length} Family Messages Recorded</span>
              <span className="text-[#8C3A24] font-medium">Click 🌸 on any card to bless again</span>
            </div>

            <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-5 bg-white rounded-2xl border border-[#F3E6D8] shadow-2xs hover:border-[#DEC5AF] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#8A7B6D]">
                        <span className="font-semibold text-[#3D1A12] text-sm">
                          {w.senderName}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#8C3A24] font-medium">{w.relationRole}</span>
                      </div>
                      <span className="text-[11px] text-[#A89887]">{w.date}</span>
                    </div>

                    <span className="text-xs font-hindi px-2.5 py-1 bg-[#FFF5EC] border border-[#FCDDC2] text-[#8C3A24] rounded-lg">
                      {w.blessingTag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A4239] leading-relaxed mb-3">
                    {w.message}
                  </p>

                  {w.hindiMessage && (
                    <p className="text-xs font-hindi text-[#8C4630] bg-[#FFFBF7] p-2 rounded-xl border border-[#F7ECE1] mb-3">
                      "{w.hindiMessage}"
                    </p>
                  )}

                  <div className="pt-2 border-t border-[#F8EFE6] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#8A7B6D]">
                      Kuldevi Ashirwad · The Sengar Clan
                    </span>

                    <button
                      onClick={() => {
                        onIncrementFlowers(w.id);
                        triggerSparkles();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#FFF2E2] hover:bg-[#FEE5CD] text-[#8C3A24] text-xs font-medium border border-[#F6DCBE] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>🌸</span>
                      <span className="tabular-nums font-semibold">{w.flowerCount}</span>
                      <span className="text-[10px] text-[#8A7B6D] hidden sm:inline">Flowers</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
