import React, { useState } from 'react';
import { Milestone, GrowthPhase } from '../types/keepsake';
import { GROWTH_PHASES, SHARED_DRIVE_FOLDER_URL } from '../data/keepsakeData';
import { GrowingAlbumExplorer } from './GrowingAlbumExplorer';
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  Maximize2, 
  FolderHeart, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { triggerSparkles } from '../utils/confettiHelper';

interface TimelineSectionProps {
  milestones: Milestone[];
  onSelectMilestone: (milestone: Milestone) => void;
  onOpenAddMemory: () => void;
  onOpenDriveGuide: () => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  milestones,
  onSelectMilestone,
  onOpenAddMemory,
  onOpenDriveGuide
}) => {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('all');

  const displayedPhases = selectedPhaseFilter === 'all' 
    ? GROWTH_PHASES 
    : GROWTH_PHASES.filter(p => p.id === selectedPhaseFilter);

  const handleSelectPhase = (phase: GrowthPhase) => {
    const milestone: Milestone = {
      id: phase.id,
      title: phase.title,
      hindiTitle: phase.hindiTitle,
      phase: phase.title,
      phaseId: phase.id,
      festivalName: phase.festivalName,
      festivalIcon: phase.festivalIcon,
      dateStr: phase.timeRange,
      ageMonthStr: phase.ageMonthStr,
      category: 'festivals',
      mediaType: phase.featuredMediaType,
      mediaUrl: phase.featuredMediaUrl,
      driveUrl: phase.driveUrl,
      thumbnailUrl: phase.featuredThumbnailUrl,
      caption: phase.growthStory,
      traditionNote: phase.traditionNote,
      familyNote: phase.familyMemory,
      location: 'Madhya Pradesh, India',
      tags: [phase.festivalName, 'Growth Phase', phase.ageMonthStr]
    };
    onSelectMilestone(milestone);
  };

  return (
    <section id="journey" className="py-16 bg-[#FFFDF9] border-t border-[#F2E8DC]" spellCheck={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6" spellCheck={false}>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C3A24] uppercase tracking-wider mb-1.5 no-underline">
              <span>🪔</span>
              <span className="no-underline">1-Year Landmark Growth Sequence (Oct 2025 → Oct 2026)</span>
              <span>🪔</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-royal text-[#4A1D13] tracking-tight no-underline">
              The 10 Landmark Phases & Indian Festivals
            </h2>
            <p className="text-sm text-[#7A6A58] mt-1.5 max-w-3xl leading-relaxed no-underline">
              Arranged chronologically from her 1st birthday celebrations to today, highlighting Baby Varnika’s physical and emotional growth through every sacred Indian festival — Diwali, Makar Sankranti, Basant Panchami, Holi, Chaitra Navratri, Rakshabandhan, Janmashtami, Ganesh Chaturthi, Durga Pooja, and Dussehra today!
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={SHARED_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-amber-900 bg-[#FFF3E8] hover:bg-[#FEE5D0] border border-[#F6DBC2] rounded-xl transition-all flex items-center gap-1.5 no-underline shadow-2xs"
            >
              <FolderHeart className="w-4 h-4 text-amber-700" />
              <span>Drive Folder (84 Media) ↗</span>
            </a>

            <button
              onClick={onOpenAddMemory}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#8C3A24] hover:bg-[#722F1D] rounded-xl shadow-xs transition-colors flex items-center gap-1.5 no-underline cursor-pointer"
            >
              <span>+ Add Memory</span>
            </button>
          </div>
        </div>

        {/* Phase Navigation Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-10 text-xs scrollbar-thin" spellCheck={false}>
          <button
            onClick={() => setSelectedPhaseFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 no-underline ${
              selectedPhaseFilter === 'all'
                ? 'bg-[#8C3A24] text-white shadow-2xs font-semibold'
                : 'bg-[#FAF3EA] text-[#6B5E51] hover:text-[#4A1D13] border border-[#F0E4D5]'
            }`}
          >
            All 10 Phases (Sequence)
          </button>

          {GROWTH_PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPhaseFilter(p.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 no-underline ${
                selectedPhaseFilter === p.id
                  ? 'bg-[#8C3A24] text-white shadow-2xs font-semibold'
                  : 'bg-[#FAF3EA] text-[#6B5E51] hover:text-[#4A1D13] border border-[#F0E4D5]'
              }`}
            >
              <span>{p.festivalIcon}</span>
              <span>Phase {p.order}: {p.festivalName}</span>
            </button>
          ))}
        </div>

        {/* The 10 Curated Growth Landmark Frames Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" spellCheck={false}>
          {displayedPhases.map((phase) => {
            const isVideo = phase.featuredMediaType === 'video';

            return (
              <div
                key={phase.id}
                onClick={() => handleSelectPhase(phase)}
                className="group cursor-pointer bg-white rounded-3xl border border-[#EDDCBA] hover:border-[#D6A778] transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col overflow-hidden"
              >
                {/* Media Header Container with Centered Alignment */}
                <div className="relative aspect-[4/5] bg-[#FAF5EE] overflow-hidden flex items-center justify-center border-b border-[#F4E8D8]">
                  <img
                    src={phase.featuredMediaUrl}
                    alt={phase.title}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {isVideo && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-13 h-13 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Top Bar Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white pointer-events-none">
                    <span className="bg-black/65 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5">
                      <span>{phase.festivalIcon}</span>
                      <span>Phase {phase.order}</span>
                    </span>
                    <span className="bg-black/65 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium">
                      {phase.ageMonthStr}
                    </span>
                  </div>

                  {/* Scrim Gradient at bottom with Date */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 to-transparent pointer-events-none flex items-end p-3.5">
                    <span className="text-xs text-white font-medium flex items-center gap-1.5 no-underline">
                      <Calendar className="w-3.5 h-3.5 text-amber-300" />
                      {phase.timeRange}
                    </span>
                  </div>
                </div>

                {/* Card Content & Cultural Lore */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between" spellCheck={false}>
                  <div>
                    {/* Hindi Title */}
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-hindi text-[#8C3A24] font-semibold no-underline">
                        {phase.hindiTitle}
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#FFF3E8] text-[#8C3A24] font-medium border border-[#F8DCBF]">
                        {phase.festivalName}
                      </span>
                    </div>

                    {/* Phase Title */}
                    <h3 className="text-base sm:text-lg font-royal font-bold text-[#4A1D13] leading-snug group-hover:text-[#8C3A24] transition-colors mt-1 no-underline">
                      {phase.title}
                    </h3>

                    {/* Growth Story */}
                    <p className="text-xs text-[#5C5248] mt-2.5 line-clamp-3 leading-relaxed no-underline">
                      {phase.growthStory}
                    </p>

                    {/* Tradition Note */}
                    <div className="mt-3.5 p-3 rounded-xl bg-[#FFF9F3] border border-[#F7E7D6] text-[11px] text-[#7A3620] leading-relaxed">
                      <span className="font-bold text-[#8C3A24] block mb-0.5">संस्कार एवं उत्सव परंपरा:</span>
                      {phase.traditionNote}
                    </div>
                  </div>

                  {/* Card Footer with Drive link & View Button */}
                  <div className="mt-5 pt-3.5 border-t border-[#F5EBE1] flex items-center justify-between text-xs">
                    <a
                      href={phase.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-medium text-amber-800 hover:text-amber-900 bg-[#FDF4EB] px-2.5 py-1 rounded-md border border-[#F4E1CE] no-underline flex items-center gap-1"
                      title="Open in Google Drive"
                    >
                      <span>Drive ↗</span>
                    </a>

                    <button
                      onClick={() => handleSelectPhase(phase)}
                      className="text-[#8C3A24] font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 no-underline cursor-pointer"
                    >
                      <span>Explore Chapter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* 
          THE GRAND FINAL FRAME:
          "Living Digital Keepsake Explorer (Next 5 Years Growth Box)"
          Equipped with Left/Right Arrows, Randomizer, and complete 84+ collection!
        */}
        <GrowingAlbumExplorer onSelectMilestone={onSelectMilestone} />

      </div>
    </section>
  );
};
