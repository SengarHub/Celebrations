import React, { useState, useEffect, useRef, useMemo } from 'react';
import { KeepsakeItem, Milestone } from '../types/keepsake';
import { ALL_DRIVE_MEDIA_ITEMS } from '../data/driveCatalog';
import { SHARED_DRIVE_FOLDER_URL } from '../data/keepsakeData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Play, 
  Pause, 
  Maximize2, 
  ExternalLink, 
  FolderHeart, 
  Video, 
  Image as ImageIcon,
  Sparkles,
  Calendar,
  Clock,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { triggerSparkles, triggerPushpaVarsha } from '../utils/confettiHelper';
import { 
  surpriseMemoryManager, 
  isItemNewUpload, 
  convertItemToMilestone,
  SurpriseFilterPool 
} from '../utils/shuffleDeck';

interface GrowingAlbumExplorerProps {
  onSelectMilestone?: (milestone: Milestone) => void;
}

export const GrowingAlbumExplorer: React.FC<GrowingAlbumExplorerProps> = ({
  onSelectMilestone
}) => {
  const [filterType, setFilterType] = useState<SurpriseFilterPool>('all');
  const [selectedFestival, setSelectedFestival] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'chronological'>('latest');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Dynamic counts for all 144 Drive items
  const counts = useMemo(() => {
    const total = ALL_DRIVE_MEDIA_ITEMS.length;
    const newUploads = ALL_DRIVE_MEDIA_ITEMS.filter(it => isItemNewUpload(it)).length;
    const videos = ALL_DRIVE_MEDIA_ITEMS.filter(it => it.type === 'video').length;
    const photos = ALL_DRIVE_MEDIA_ITEMS.filter(it => it.type === 'image').length;
    return { total, newUploads, videos, photos };
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    let list = ALL_DRIVE_MEDIA_ITEMS.filter(item => {
      if (filterType === 'new-uploads' && !isItemNewUpload(item)) return false;
      if (filterType === 'videos' && item.type !== 'video') return false;
      if (filterType === 'photos' && item.type !== 'image') return false;
      if (selectedFestival !== 'all' && item.phaseId !== selectedFestival) return false;
      return true;
    });

    if (sortOrder === 'latest') {
      // Show newest 2nd Birthday / 2026 uploads first
      list = [...list].reverse();
    }
    return list;
  }, [filterType, selectedFestival, sortOrder]);

  const currentItem = filteredItems[currentIndex] || filteredItems[0] || ALL_DRIVE_MEDIA_ITEMS[0];

  // Keep index within bounds if filter changes
  useEffect(() => {
    if (currentIndex >= filteredItems.length) {
      setCurrentIndex(0);
    }
  }, [filteredItems.length, currentIndex]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (filmstripRef.current) {
      const activeEl = filmstripRef.current.querySelector(`[data-index="${currentIndex}"]`) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  // Slideshow timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredItems.length]);

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % filteredItems.length);
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  // Fair Non-Repeating Surprise Memory Pick
  const pickRandom = (targetPool: SurpriseFilterPool = filterType) => {
    triggerPushpaVarsha();
    const { item, stats } = surpriseMemoryManager.getNextSurprise(targetPool, currentItem?.id);
    
    // Find index of chosen item in current filteredItems
    const targetIdx = filteredItems.findIndex(it => it.id === item.id);
    if (targetIdx !== -1) {
      setCurrentIndex(targetIdx);
    } else {
      // If item was outside the current filter, adjust filter to include it
      if (targetPool === 'new-uploads' && filterType !== 'new-uploads') {
        setFilterType('new-uploads');
      } else {
        setFilterType('all');
      }
      setSelectedFestival('all');
      // Set to item after state settle
      setTimeout(() => {
        const idx = ALL_DRIVE_MEDIA_ITEMS.findIndex(it => it.id === item.id);
        setCurrentIndex(idx !== -1 ? idx : 0);
      }, 50);
    }

    const poolLabel = targetPool === 'new-uploads' ? '✨ New Upload' : '🎲 Surprise Memory';
    setToastMessage(`${poolLabel} (${stats.visitedCount} of ${stats.totalCount} explored · No repeats)`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenInLightbox = () => {
    if (onSelectMilestone && currentItem) {
      onSelectMilestone(convertItemToMilestone(currentItem));
    }
  };

  // Google Drive video preview URL
  const driveEmbedUrl = currentItem.driveUrl.replace('/view?usp=sharing', '/preview');

  return (
    <div className="mt-14 pt-10 border-t border-[#F2E4D5]" spellCheck={false}>
      {/* Explorer Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4" spellCheck={false}>
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C3A24] uppercase tracking-wider mb-1.5 no-underline">
            <span>✨</span>
            <span>अखंड डिजिटल संस्मरण (2024 — 2031)</span>
            <span>✨</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-royal text-[#4A1D13] tracking-tight no-underline">
            Living Keepsake Explorer & Album Box
          </h3>
          <p className="text-sm text-[#7A6A58] mt-1 max-w-2xl no-underline">
            Browse through all {ALL_DRIVE_MEDIA_ITEMS.length} authentic photos and video recordings from the Google Drive album using the left & right arrows, or hit <strong className="text-[#8C3A24]">"Surprise Memory"</strong>. As more memories are added over the next 5 years, this album continues to blossom.
          </p>
        </div>

        {/* Global Google Drive Album Link */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={SHARED_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold text-amber-900 bg-[#FFF3E8] hover:bg-[#FEE5D0] border border-[#F6DBC2] rounded-xl transition-all flex items-center gap-1.5 no-underline shadow-2xs"
            title="Open original Google Drive folder"
          >
            <FolderHeart className="w-4 h-4 text-amber-700" />
            <span>Open Google Drive Folder ({ALL_DRIVE_MEDIA_ITEMS.length}) ↗</span>
          </a>
        </div>
      </div>

      {/* Floating Toast Notification for Album Explorer */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-stone-900/95 text-white text-xs px-4 py-2.5 rounded-full shadow-2xl border border-amber-400/40 flex items-center gap-2 backdrop-blur-md transition-all animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="font-medium text-amber-100">{toastMessage}</span>
        </div>
      )}

      {/* Filter and Controls Toolbar */}
      <div className="p-3 bg-[#FAF4ED] rounded-2xl border border-[#F0E2D2] mb-6 flex flex-wrap items-center justify-between gap-3 shadow-2xs" spellCheck={false}>
        {/* Type & Upload Segments */}
        <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-xl border border-[#EADBCC] text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer no-underline ${
              filterType === 'all'
                ? 'bg-[#8C3A24] text-white shadow-2xs font-semibold'
                : 'text-[#7A6A58] hover:text-[#4A1D13]'
            }`}
          >
            All Media ({counts.total})
          </button>
          <button
            onClick={() => setFilterType('new-uploads')}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer no-underline flex items-center gap-1 ${
              filterType === 'new-uploads'
                ? 'bg-amber-600 text-white shadow-2xs font-bold'
                : 'text-amber-800 hover:text-amber-950 bg-amber-50/70 border border-amber-200/60 font-semibold'
            }`}
            title="Browse all 60 newly uploaded photos & videos of Baby Varnika"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
            <span>✨ New Uploads ({counts.newUploads})</span>
          </button>
          <button
            onClick={() => setFilterType('videos')}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer no-underline flex items-center gap-1 ${
              filterType === 'videos'
                ? 'bg-[#8C3A24] text-white shadow-2xs font-semibold'
                : 'text-[#7A6A58] hover:text-[#4A1D13]'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Videos ({counts.videos})</span>
          </button>
          <button
            onClick={() => setFilterType('photos')}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer no-underline flex items-center gap-1 ${
              filterType === 'photos'
                ? 'bg-[#8C3A24] text-white shadow-2xs font-semibold'
                : 'text-[#7A6A58] hover:text-[#4A1D13]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photos ({counts.photos})</span>
          </button>
        </div>

        {/* Sort Order & Festival Quick Filter Dropdown */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Sort Order Toggle */}
          <button
            onClick={() => setSortOrder(prev => prev === 'latest' ? 'chronological' : 'latest')}
            className="px-3 py-1.5 bg-white border border-[#EADBCC] rounded-xl text-xs text-[#5C5248] hover:text-[#4A1D13] font-medium flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
            title="Toggle between Latest Uploads First and Chronological sequence"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-700" />
            <span>Order: {sortOrder === 'latest' ? '✨ Newest First' : '📅 1st → 2nd Bday'}</span>
          </button>

          {/* Festival Dropdown */}
          <select
            value={selectedFestival}
            onChange={(e) => setSelectedFestival(e.target.value)}
            className="px-3 py-1.5 bg-white border border-[#EADBCC] rounded-xl text-xs text-[#5C5248] focus:outline-hidden focus:ring-2 focus:ring-[#8C3A24]/20 cursor-pointer"
          >
            <option value="all">All Growth Phases & Festivals</option>
            <option value="phase-1st-bday-diwali">🪔 1st Birthday & Diwali</option>
            <option value="phase-winter-sankranti">🪁 Makar Sankranti (Winter)</option>
            <option value="phase-basant-panchami">🌼 Basant Panchami (Spring)</option>
            <option value="phase-holi-rangotsav">🎨 Holi Rangotsav</option>
            <option value="phase-chaitra-navratri">🌸 Chaitra Navratri & Ram Navami</option>
            <option value="phase-summer-sunshine">☀️ Summer Sunshine & Steps</option>
            <option value="phase-rakhi-janmashtami">🦚 Rakshabandhan & Janmashtami</option>
            <option value="phase-ganesh-chaturthi">🐘 Ganesh Chaturthi</option>
            <option value="phase-durga-pooja">🔱 Durga Pooja & Kanya Pujan</option>
            <option value="phase-turning-two-today">🎂 Dussehra & 2nd Birthday Today</option>
          </select>
        </div>

        {/* Action Controls: Surprise Randomizer & Slideshow */}
        <div className="flex items-center gap-2">
          {/* Surprise New Uploads Quick Button */}
          <button
            onClick={() => pickRandom('new-uploads')}
            className="px-3 py-1.5 bg-[#FFF2E2] hover:bg-[#FEE5CD] text-[#8C3A24] border border-[#F6DAC0] text-xs font-semibold rounded-xl shadow-2xs transition-all flex items-center gap-1 cursor-pointer active:scale-95 no-underline"
            title="Randomize exclusively among newly uploaded memories without repeats"
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Surprise New ✨</span>
          </button>

          {/* Main Surprise Memory Button (Fair Non-Repeating Shuffle) */}
          <button
            onClick={() => pickRandom('all')}
            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 no-underline"
            title="Fair non-repeating shuffle through all 144 Drive memories"
          >
            <Shuffle className="w-3.5 h-3.5 text-white" />
            <span>Surprise Memory 🎲</span>
          </button>

          {/* Auto-play Slideshow */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-1.5 rounded-xl border transition-colors cursor-pointer text-xs flex items-center gap-1 ${
              isAutoPlaying
                ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                : 'bg-white border-[#EADBCC] text-[#7A6A58] hover:bg-[#FAF6F0]'
            }`}
            title={isAutoPlaying ? 'Pause Slideshow' : 'Start Auto Slideshow'}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4 text-amber-800" /> : <Play className="w-4 h-4 text-[#7A6A58]" />}
            <span className="hidden sm:inline text-[11px] pr-1">{isAutoPlaying ? 'Playing' : 'Slideshow'}</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Frame with Left & Right Arrows */}
      <div className="relative bg-white rounded-3xl border border-[#EDDCBA] shadow-md overflow-hidden">
        
        {/* Frame Top Meta Strip */}
        <div className="px-5 py-3.5 bg-[#FFF9F3] border-b border-[#F2E4D5] flex items-center justify-between text-xs text-[#7A6A58]" spellCheck={false}>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#8C3A24]/10 text-[#8C3A24] font-semibold text-[11px]">
              {currentItem.phaseName}
            </span>
            <span className="hidden sm:inline text-stone-300">|</span>
            <span className="flex items-center gap-1 text-[#8C7A6B]">
              <Calendar className="w-3 h-3 text-amber-700" />
              {currentItem.dateStr}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#8C3A24] tabular-nums">
              Memory {currentIndex + 1} of {filteredItems.length}
            </span>
            <button
              onClick={handleOpenInLightbox}
              className="p-1.5 text-[#7A6A58] hover:text-[#4A1D13] hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Fullscreen Lightbox"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Media Viewing Canvas with Left & Right Arrows */}
        <div className="relative bg-stone-950 flex items-center justify-center min-h-[380px] sm:min-h-[500px] max-h-[600px] p-2 overflow-hidden">
          
          {currentItem.type === 'video' ? (
            <div className="w-full h-full min-h-[380px] sm:min-h-[480px] flex items-center justify-center">
              <iframe
                src={driveEmbedUrl}
                className="w-full h-[380px] sm:h-[480px] border-0 rounded-2xl"
                allow="autoplay; fullscreen"
                title={currentItem.title}
              />
            </div>
          ) : (
            <img
              src={currentItem.mediaUrl}
              alt={currentItem.title}
              className="max-h-[500px] w-auto max-w-full object-contain mx-auto rounded-xl transition-all duration-300 shadow-sm"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Left Navigation Arrow */}
          <button
            onClick={goToPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer z-20 shadow-lg active:scale-95"
            aria-label="Previous memory"
            title="Previous (or Left Arrow key)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer z-20 shadow-lg active:scale-95"
            aria-label="Next memory"
            title="Next (or Right Arrow key)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Type Badge in Bottom Corner */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 z-10">
            {currentItem.type === 'video' ? (
              <>
                <Video className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Video Clip</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>Original Photograph</span>
              </>
            )}
          </div>
        </div>

        {/* Media Details Caption & Drive Link Strip */}
        <div className="p-5 sm:p-6 bg-white" spellCheck={false}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {/* New Upload Highlight Badge */}
              {isItemNewUpload(currentItem) && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-full text-xs font-bold mb-2 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  <span>✨ Newly Uploaded Memory (Turning 2 Years Old)</span>
                </div>
              )}

              <div className="flex items-center gap-2 mb-1">
                <span className="text-amber-700 text-sm">🪔</span>
                <span className="text-xs font-semibold text-[#8C3A24]">{currentItem.festivalTag}</span>
              </div>
              <h4 className="text-lg sm:text-xl font-royal font-bold text-[#4A1D13] leading-snug no-underline">
                {currentItem.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#5C5248] mt-1.5 max-w-3xl leading-relaxed no-underline">
                {currentItem.caption}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={currentItem.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-medium text-[#8C3A24] hover:text-[#722F1D] bg-[#FFF3E8] hover:bg-[#FEE5D0] border border-[#F6DBC2] rounded-xl transition-colors flex items-center gap-1.5 no-underline cursor-pointer"
              >
                <span>View in Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleOpenInLightbox}
                className="px-4 py-2 text-xs font-medium text-white bg-[#8C3A24] hover:bg-[#722F1D] rounded-xl shadow-xs transition-colors flex items-center gap-1.5 no-underline cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Filmstrip Carousel at Bottom */}
        <div className="px-5 py-4 bg-[#FAF5EE] border-t border-[#F2E4D5]">
          <div className="flex items-center justify-between text-xs text-[#7A6A58] mb-2.5">
            <span className="font-semibold text-[#4A1D13]">Filmstrip Gallery (Click any thumbnail to view)</span>
            <span className="text-[11px] text-[#8C7A6B]">Scroll sideways for all {filteredItems.length} items →</span>
          </div>

          <div 
            ref={filmstripRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scroll-smooth"
          >
            {filteredItems.map((item, idx) => {
              const isSelected = idx === currentIndex;
              const isVid = item.type === 'video';
              const isNew = isItemNewUpload(item);
              const thumbSrc = isVid ? (item.thumbnailUrl || item.mediaUrl) : item.mediaUrl;

              return (
                <button
                  key={item.id}
                  data-index={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-[#8C3A24] scale-105 shadow-md ring-2 ring-amber-300' 
                      : 'border-transparent opacity-70 hover:opacity-100 hover:border-[#D6A778]'
                  }`}
                  title={`${item.title} (${item.dateStr})`}
                >
                  <img
                    src={thumbSrc}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  {isNew && (
                    <span className="absolute top-1 left-1 text-[8px] font-extrabold bg-amber-500 text-white px-1 py-0.2 rounded shadow-xs z-10">
                      NEW
                    </span>
                  )}
                  {isVid && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-white text-white opacity-90" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5-Year Growth Guarantee Notice */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#FFF8EE] via-[#FFFDF9] to-[#FFF8EE] border border-[#F2DECC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B5E51]">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-amber-100 text-amber-800 text-lg shrink-0">
            🌳
          </span>
          <div>
            <h5 className="font-semibold text-[#4A1D13] text-sm">
              Continuous 5-Year Keepsake Growth (Ages 2 to 7)
            </h5>
            <p className="mt-0.5 text-xs text-[#7A6A58] leading-relaxed">
              Every new photo and video uploaded to the Sengar Family Google Drive automatically joins this collection over the next 5 years so Varnika and her grandparents in Madhya Pradesh can look back at every precious milestone.
            </p>
          </div>
        </div>
        <a
          href={SHARED_DRIVE_FOLDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-white border border-[#E8DACB] text-[#8C3A24] font-semibold hover:bg-[#FAF4ED] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 no-underline shadow-2xs"
        >
          <span>Drive Folder ↗</span>
        </a>
      </div>

    </div>
  );
};
