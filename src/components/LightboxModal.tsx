import React, { useEffect, useState } from 'react';
import { Milestone } from '../types/keepsake';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles, Share2, ExternalLink, Play, Dices } from 'lucide-react';
import { formatMediaUrl, isGoogleDriveEmbedVideo } from '../utils/googleDriveHelper';
import { triggerSparkles, triggerPushpaVarsha } from '../utils/confettiHelper';
import { SHARED_DRIVE_FOLDER_URL } from '../data/keepsakeData';
import { ALL_DRIVE_MEDIA_ITEMS } from '../data/driveCatalog';

interface LightboxModalProps {
  milestone: Milestone;
  allMilestones: Milestone[];
  onClose: () => void;
  onNavigate: (milestone: Milestone) => void;
}

import { 
  ALL_DRIVE_MILESTONES, 
  surpriseMemoryManager, 
  isItemNewUpload,
  SurpriseFilterPool 
} from '../utils/shuffleDeck';

export const LightboxModal: React.FC<LightboxModalProps> = ({
  milestone,
  allMilestones,
  onClose,
  onNavigate
}) => {
  const [isRollingDice, setIsRollingDice] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dicePool, setDicePool] = useState<SurpriseFilterPool>('all');

  // Navigation list is ALWAYS the full 144 Drive milestones to prevent getting trapped in 10 phases
  const navigationList = ALL_DRIVE_MILESTONES;

  let currentIndex = navigationList.findIndex(m => m.id === milestone.id);
  if (currentIndex === -1) {
    // If opened from a phase card like 'phase-turning-two-today', find the first media item from that phase
    currentIndex = navigationList.findIndex(m => (m.tags && m.tags.includes(milestone.title)) || m.phase === milestone.title);
    if (currentIndex === -1) currentIndex = 0;
  }
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const prevMilestone = safeIndex > 0 ? navigationList[safeIndex - 1] : navigationList[navigationList.length - 1];
  const nextMilestone = safeIndex < navigationList.length - 1 ? navigationList[safeIndex + 1] : navigationList[0];

  const handleSurpriseDice = (overridePool?: SurpriseFilterPool) => {
    setIsRollingDice(true);
    triggerPushpaVarsha();

    const poolToUse = overridePool || dicePool;
    const { milestone: nextMemory, stats } = surpriseMemoryManager.getNextSurprise(poolToUse, milestone.id);
    onNavigate(nextMemory);

    const isNew = isItemNewUpload(nextMemory);
    const poolLabel = poolToUse === 'new-uploads' ? '✨ New Upload' : '🎲 Surprise Memory';
    setToastMessage(`${poolLabel} (${stats.visitedCount} of ${stats.totalCount} explored · No repeats)`);

    setTimeout(() => {
      setIsRollingDice(false);
    }, 500);

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(prevMilestone);
      if (e.key === 'ArrowRight') onNavigate(nextMilestone);
      if (e.key === 'r' || e.key === 'R' || e.key === 'd' || e.key === 'D') {
        handleSurpriseDice();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIndex, navigationList, onClose, onNavigate, prevMilestone, nextMilestone, milestone.id, dicePool]);

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
        
        {/* Floating Toast Notification for Surprise Memory Feedback */}
        {toastMessage && (
          <div className="absolute top-16 right-4 sm:right-6 z-40 bg-stone-900/95 text-white text-xs px-4 py-2 rounded-full shadow-2xl border border-amber-400/40 flex items-center gap-2 backdrop-blur-md transition-all animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-medium text-amber-100">{toastMessage}</span>
          </div>
        )}

        {/* Top Control Bar with Small Surprise Memory Dice Button & Close Button */}
        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 flex items-center gap-2">
          {/* Quick Dice from New Uploads (if wanted) */}
          <button
            onClick={() => handleSurpriseDice('new-uploads')}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 bg-black/60 hover:bg-black/80 text-amber-200 hover:text-white rounded-full text-xs border border-amber-400/30 transition-all cursor-pointer no-underline"
            title="Surprise from Newly Uploaded 60 Memories ✨"
          >
            <span>✨ New Uploads</span>
          </button>

          {/* Small Surprise Memory Dice Button */}
          <button
            onClick={() => handleSurpriseDice('all')}
            className="group flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white rounded-full shadow-lg border border-amber-300/40 transition-all transform hover:scale-105 active:scale-95 cursor-pointer no-underline"
            title="Surprise Memory 🎲 (Fair non-repeating shuffle through all 144 Drive memories)"
            aria-label="Surprise Memory 🎲"
          >
            <div className={`flex items-center justify-center transition-transform duration-500 ${isRollingDice ? 'rotate-180 scale-110' : 'group-hover:rotate-12'}`}>
              <Dices className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-semibold tracking-tight text-white hidden sm:inline">Surprise Memory</span>
            <span className="text-sm">🎲</span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 bg-black/60 hover:bg-black/85 text-white rounded-full transition-colors cursor-pointer border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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

          {/* Counter Badge with Scope */}
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md border border-white/10">
            {safeIndex + 1} of {navigationList.length} memories
          </div>
        </div>

        {/* Right Side: Rich Narrative & Cultural Notes */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-[90vh]" spellCheck={false}>
          <div>
            {/* Newly Uploaded Badge */}
            {isItemNewUpload(milestone) && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-full text-xs font-bold text-amber-900 mb-3 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>✨ New Upload · Turning 2 Years Old</span>
              </div>
            )}

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
          <div className="mt-6 pt-4 border-t border-[#F2E8DC] flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-2 text-xs font-medium text-[#7A2E1E] bg-[#FFF2E2] hover:bg-[#FEE5CD] rounded-xl border border-[#F6DBC2] transition-colors flex items-center gap-1.5 cursor-pointer no-underline"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>

              {/* Small Surprise Memory Dice Button in Footer */}
              <button
                onClick={() => handleSurpriseDice('all')}
                className="px-3 py-2 text-xs font-semibold text-[#8C3A24] bg-[#FFF3E8] hover:bg-[#FEE5D0] active:scale-95 rounded-xl border border-[#F6DBC2] transition-all flex items-center gap-1.5 cursor-pointer no-underline shadow-2xs group"
                title="Surprise Memory 🎲 (Shuffle to a random memory)"
              >
                <Dices className={`w-3.5 h-3.5 text-amber-700 transition-transform ${isRollingDice ? 'animate-spin' : 'group-hover:rotate-45'}`} />
                <span>Surprise Memory 🎲</span>
              </button>
            </div>

            {milestone.driveUrl ? (
              <a
                href={milestone.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#8C3A24] font-medium flex items-center gap-1 cursor-pointer no-underline bg-[#FAF3EA] px-3 py-2 rounded-xl border border-[#F0E4D5] hover:bg-[#F5E8DC]"
              >
                <span>Google Drive</span>
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
