import React, { useState, useEffect, useRef } from 'react';
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
  Clock
} from 'lucide-react';
import { triggerSparkles, triggerPushpaVarsha } from '../utils/confettiHelper';

interface GrowingAlbumExplorerProps {
  onSelectMilestone?: (milestone: Milestone) => void;
}

export const GrowingAlbumExplorer: React.FC<GrowingAlbumExplorerProps> = ({
  onSelectMilestone
}) => {
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [selectedFestival, setSelectedFestival] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Filter items
  const filteredItems = ALL_DRIVE_MEDIA_ITEMS.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (selectedFestival !== 'all' && item.phaseId !== selectedFestival) return false;
    return true;
  });

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

  const pickRandom = () => {
    if (filteredItems.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * filteredItems.length);
    if (nextIdx === currentIndex) {
      nextIdx = (nextIdx + 1) % filteredItems.length;
    }
    setCurrentIndex(nextIdx);
    triggerPushpaVarsha();
  };

  const handleOpenInLightbox = () => {
    if (onSelectMilestone && currentItem) {
      const m: Milestone = {
        id: currentItem.id,
        title: currentItem.title,
        phase: currentItem.phaseName,
        dateStr: currentItem.dateStr,
        ageMonthStr: 'Last 1 Year Journey',
        category: 'festivals',
        mediaType: currentItem.type,
        mediaUrl: currentItem.mediaUrl,
        driveUrl: currentItem.driveUrl,
        thumbnailUrl: currentItem.thumbnailUrl,
        caption: currentItem.caption,
        traditionNote: currentItem.traditionNote,
        location: 'Madhya Pradesh, India',
        tags: [currentItem.festivalTag, currentItem.phaseName]
      };
      onSelectMilestone(m);
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
            Browse through all 84 authentic photos and video recordings from the Google Drive album using the left & right arrows, or hit <strong className="text-[#8C3A24]">"Surprise Memory"</strong>. As more memories are added over the next 5 years, this album continues to blossom.
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
            <span>Open Google Drive Folder (84) ↗</span>
          </a>
        </div>
      </div>

      {/* Filter and Controls Toolbar */}
      <div className="p-3 bg-[#FAF4ED] rounded-2xl border border-[#F0E2D2] mb-6 flex flex-wrap items-center justify-between gap-3 shadow-2xs" spellCheck={false}>
        {/* Type Segments */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#EADBCC] text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer no-underline ${
              filterType === 'all'
                ? 'bg-[#8C3A24] text-white shadow-2xs font-semibold'
                : 'text-[#7A6A58] hover:text-[#4A1D13]'
            }`}
          >
            All Media ({ALL_DRIVE_MEDIA_ITEMS.length})
          </button>
          <button
            onClick={() => setFilterType('image')}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer no-underline flex items-center gap-1 ${
              filterType === 'image'
                ? 'bg-[#8C3A24] text-white shadow-2xs font-semibold'
                : 'text-[#7A6A58] hover:text-[#4A1D13]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photos (44)</span>
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer no-underline flex items-center gap-1 ${
              filterType === 'video'
                ? 'bg-[#8C3A24] text-white shadow-2xs font-semibold'
                : 'text-[#7A6A58] hover:text-[#4A1D13]'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Videos (40)</span>
          </button>
        </div>

        {/* Festival Quick Filter Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#7A6A58] font-medium hidden sm:inline">Festival Phase:</span>
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

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Surprise Randomizer Button */}
          <button
            onClick={pickRandom}
            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 no-underline"
            title="Pick a random photo or video memory"
          >
            <Shuffle className="w-3.5 h-3.5" />
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
            <span className="text-[11px] text-[#8C7A6B]">Scroll sideways for all 84 items →</span>
          </div>

          <div 
            ref={filmstripRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scroll-smooth"
          >
            {filteredItems.map((item, idx) => {
              const isSelected = idx === currentIndex;
              const isVid = item.type === 'video';
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
                  {isVid && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-white text-white opacity-90" />
                    </div>
                  )}
                  <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 text-white px-1 rounded">
                    {idx + 1}
                  </span>
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
