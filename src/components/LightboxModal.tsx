import React, { useEffect } from 'react';
import { Milestone } from '../types/keepsake';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles, Share2, ExternalLink, Play } from 'lucide-react';
import { formatMediaUrl, isGoogleDriveEmbedVideo } from '../utils/googleDriveHelper';
import { triggerSparkles } from '../utils/confettiHelper';
import { SHARED_DRIVE_FOLDER_URL } from '../data/keepsakeData';

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
  const isEmbedVideo = milestone.mediaType === 'video' && (isGoogleDriveEmbedVideo(formattedUrl) || (milestone.driveUrl && milestone.driveUrl.includes('drive.google.com/file/d/')));
  
  // Extract drive preview if available
  let videoEmbedUrl = formattedUrl;
  if (milestone.mediaType === 'video' && milestone.driveUrl) {
    const matchId = milestone.driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (matchId && matchId[1]) {
      videoEmbedUrl = `https://drive.google.com/file/d/${matchId[1]}/preview`;
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Baby Varnika's 2nd Birthday Memory: ${milestone.title}`,
        text: milestone.caption,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      triggerSparkles();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4" spellCheck={false}>
      
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

        {/* Left Side: Media Display with Next/Prev Arrows - Centered and Aligned */}
        <div className="relative lg:w-3/5 bg-stone-950 flex items-center justify-center min-h-[320px] sm:min-h-[440px] max-h-[55vh] lg:max-h-full p-2">
          
          {milestone.mediaType === 'video' ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <iframe
                src={videoEmbedUrl}
                className="w-full h-[360px] sm:h-[450px] border-0 rounded-xl"
                allow="autoplay; fullscreen"
                title={milestone.title}
              />
            </div>
          ) : (
            <img
              src={formattedUrl}
              alt={milestone.title}
              className="max-h-[55vh] lg:max-h-[82vh] w-auto max-w-full object-contain mx-auto rounded-lg shadow-sm"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Navigation Arrows */}
          <button
            onClick={() => onNavigate(prevMilestone)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer z-10"
            aria-label="Previous memory"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate(nextMilestone)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer z-10"
            aria-label="Next memory"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Counter Badge */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md">
            {currentIndex + 1} of {allMilestones.length}
          </div>
        </div>

        {/* Right Side: Rich Narrative & Cultural Notes */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-[90vh]" spellCheck={false}>
          <div>
            {/* Phase & Date Badge */}
            <div className="flex items-center justify-between text-xs text-[#9A3412] mb-3 no-underline">
              <span className="font-semibold uppercase tracking-wider">{milestone.phase}</span>
              <span className="flex items-center gap-1 text-[#7A6A58]">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                {milestone.dateStr}
              </span>
            </div>

            {/* Hindi Title & Sanskrit Blessing */}
            {milestone.hindiTitle && (
              <p className="text-sm font-hindi text-[#8C3A24] mb-1.5 no-underline">
                {milestone.hindiTitle}
              </p>
            )}

            {/* Main Milestone Title */}
            <h2 className="text-xl sm:text-2xl font-royal font-bold text-[#4A1D13] leading-snug no-underline">
              {milestone.title}
            </h2>

            {/* Location & Age tag */}
            <div className="flex items-center gap-3 text-xs text-[#7A6A58] mt-2 mb-4 no-underline">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-700" />
                {milestone.location || 'Madhya Pradesh, India'}
              </span>
              <span>·</span>
              <span className="font-medium text-[#8C3A24]">
                {milestone.ageMonthStr}
              </span>
            </div>

            {/* Full Story Caption */}
            <p className="text-sm text-[#4E443B] leading-relaxed mb-5 no-underline">
              {milestone.caption}
            </p>

            {/* Rajput Tradition / Sanskar Annotation */}
            {milestone.traditionNote && (
              <div className="p-3.5 bg-[#FFF9F3] rounded-2xl border border-[#F6EADB] mb-4 text-xs text-[#7A402B]">
                <div className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5 no-underline">
                  <span>🪔</span>
                  <span>भारतीय राजपूत संस्कार एवं परंपरा</span>
                </div>
                <p className="leading-relaxed no-underline">{milestone.traditionNote}</p>
              </div>
            )}

            {/* Family Memory Note */}
            {milestone.familyNote && (
              <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-100 text-xs text-[#82382D]">
                <div className="font-semibold text-rose-900 mb-1 flex items-center gap-1.5 no-underline">
                  <span>💌</span>
                  <span>Sengar Family Memory Note</span>
                </div>
                <p className="leading-relaxed no-underline">{milestone.familyNote}</p>
              </div>
            )}

            {/* Tags */}
            {milestone.tags && milestone.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {milestone.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-[#FAF3EA] text-[#7A6A58] px-2.5 py-1 rounded-md border border-[#F0E4D5] no-underline"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="mt-6 pt-4 border-t border-[#F2E8DC] flex items-center justify-between gap-3">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 text-xs font-medium text-[#7A2E1E] bg-[#FFF2E2] hover:bg-[#FEE5CD] rounded-xl border border-[#F6DBC2] transition-colors flex items-center gap-1.5 cursor-pointer no-underline"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Memory</span>
            </button>

            {milestone.driveUrl ? (
              <a
                href={milestone.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#8C3A24] font-medium flex items-center gap-1 cursor-pointer no-underline bg-[#FAF3EA] px-3 py-2 rounded-xl border border-[#F0E4D5] hover:bg-[#F5E8DC]"
              >
                <span>Open in Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href={SHARED_DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#8C3A24] font-medium flex items-center gap-1 cursor-pointer no-underline"
              >
                <span>Google Drive Folder</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
