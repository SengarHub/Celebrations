import React, { useEffect } from 'react';
import { Milestone } from '../types/keepsake';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles, Share2 } from 'lucide-react';
import { formatMediaUrl, isGoogleDriveEmbedVideo } from '../utils/googleDriveHelper';
import { triggerSparkles } from '../utils/confettiHelper';

interface LightboxModalProps {
  milestone: Milestone;
  allMilestones: Milestone[];
  onClose: () => void;
  onNavigate: (milestone: Milestone) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  milestone,
  allMilestones,
  onClose,
  onNavigate
}) => {
  const currentIndex = allMilestones.findIndex(m => m.id === milestone.id);
  const prevMilestone = currentIndex > 0 ? allMilestones[currentIndex - 1] : allMilestones[allMilestones.length - 1];
  const nextMilestone = currentIndex < allMilestones.length - 1 ? allMilestones[currentIndex + 1] : allMilestones[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(prevMilestone);
      if (e.key === 'ArrowRight') onNavigate(nextMilestone);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, allMilestones, onClose, onNavigate, prevMilestone, nextMilestone]);

  const formattedUrl = formatMediaUrl(milestone.mediaUrl, milestone.mediaType);
  const isEmbedVideo = milestone.mediaType === 'video' && isGoogleDriveEmbedVideo(formattedUrl);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Baby Varnika's 2nd Birthday Memory: ${milestone.title}`,
        text: milestone.caption,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Keepsake link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      
      {/* Modal Container */}
      <div className="relative bg-[#FFFDF9] rounded-3xl overflow-hidden max-w-5xl w-full max-h-[95vh] flex flex-col lg:flex-row shadow-2xl border border-stone-800/20">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-black/50 hover:bg-black/75 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Media Display with Next/Prev Arrows */}
        <div className="relative lg:w-3/5 bg-stone-950 flex items-center justify-center min-h-[320px] sm:min-h-[440px] max-h-[55vh] lg:max-h-full">
          
          {isEmbedVideo ? (
            <iframe
              src={formattedUrl}
              className="w-full h-full min-h-[350px] border-0"
              allow="autoplay"
              title={milestone.title}
            />
          ) : (
            <img
              src={formattedUrl}
              alt={milestone.title}
              className="max-h-[55vh] lg:max-h-[85vh] w-full object-contain"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Navigation Arrows */}
          <button
            onClick={() => onNavigate(prevMilestone)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer"
            aria-label="Previous memory"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate(nextMilestone)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer"
            aria-label="Next memory"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Counter Badge */}
          <div className="absolute bottom-3 left-4 text-xs bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-md">
            {currentIndex + 1} of {allMilestones.length}
          </div>
        </div>

        {/* Right Side: Rich Storytelling & Sengar Rajput Notes */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-[85vh] bg-[#FFFDF9]">
          <div>
            
            {/* Phase & Date Metadata (clean unboxed text) */}
            <div className="flex items-center gap-2 text-xs text-[#8C3A24] font-medium mb-1">
              <span>{milestone.phase}</span>
              <span aria-hidden="true">·</span>
              <span>{milestone.ageMonthStr}</span>
            </div>

            {milestone.hindiTitle && (
              <p className="text-sm font-hindi text-[#8C3A24] mb-1">
                {milestone.hindiTitle}
              </p>
            )}

            <h3 className="text-xl font-royal font-bold text-[#4A1D13] leading-snug mb-3">
              {milestone.title}
            </h3>

            {/* Date & Location */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#7A6A58] mb-4 pb-3 border-b border-[#F0E4D5]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                {milestone.dateStr}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                {milestone.location || 'Madhya Pradesh, India'}
              </span>
            </div>

            {/* Caption Story */}
            <p className="text-sm text-[#4A4239] leading-relaxed mb-4">
              {milestone.caption}
            </p>

            {/* Tradition Note */}
            {milestone.traditionNote && (
              <div className="p-3.5 bg-[#FFF6EE] rounded-2xl border border-[#FBE0C8] mb-4 text-xs text-[#7A3620] leading-relaxed">
                <div className="font-semibold text-amber-900 mb-0.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>भारतीय व राजपूत परंपरा:</span>
                </div>
                {milestone.traditionNote}
              </div>
            )}

            {/* Family Note */}
            {milestone.familyNote && (
              <div className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#EDE0CE] text-xs text-[#6B5E51] leading-relaxed italic">
                <span className="font-semibold not-italic text-[#4A1D13] block mb-0.5">Family Note:</span>
                "{milestone.familyNote}"
              </div>
            )}

          </div>

          {/* Modal Footer Controls */}
          <div className="mt-6 pt-4 border-t border-[#F0E4D5] flex items-center justify-between">
            <button
              onClick={() => {
                triggerSparkles();
              }}
              className="text-xs text-[#8C3A24] font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>🌸</span>
              <span>Shower Flowers on this Memory</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-[#FAF3EA] hover:bg-[#F3E7D8] text-[#7A2E1E] transition-colors cursor-pointer"
              title="Share this memory"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
