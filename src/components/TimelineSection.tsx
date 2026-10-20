import React, { useState } from 'react';
import { Milestone, MilestoneCategory } from '../types/keepsake';
import { Maximize2, MapPin, Calendar, PlusCircle, ExternalLink, Play, LayoutGrid, Image as ImageIcon } from 'lucide-react';
import { formatMediaUrl, isGoogleDriveEmbedVideo } from '../utils/googleDriveHelper';

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
  const [activeCategory, setActiveCategory] = useState<MilestoneCategory>('all');
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');

  const filteredMilestones = milestones.filter(m => {
    if (activeCategory === 'all') return true;
    return m.category === activeCategory;
  });

  return (
    <section id="journey" className="py-16 bg-[#FFFDF9] border-t border-[#F2E8DC]" spellCheck={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#9A3412] mb-1.5">
              <span>Chronological Memories</span>
              <span aria-hidden="true">·</span>
              <span>Oct 2024 to Oct 2026</span>
              <span aria-hidden="true">·</span>
              <span>Madhya Pradesh Heritage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-royal text-[#4A1D13] tracking-tight">
              The 2-Year Milestone Journey
            </h2>
            <p className="text-sm text-[#7A6A58] mt-1 max-w-2xl">
              From her sacred Namkaran ceremony to showing two little fingers for her 2nd birthday. Each memory preserves the traditional Rajput sanskars of the Sengar family.
            </p>
          </div>

          {/* Action buttons on header */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Photo Framing Mode Toggle */}
            <div className="flex items-center bg-[#FAF3EA] border border-[#F0E4D5] rounded-xl p-1 text-xs">
              <button
                onClick={() => setFitMode('cover')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  fitMode === 'cover'
                    ? 'bg-white text-[#7A2E1E] shadow-2xs'
                    : 'text-[#7A6A58] hover:text-[#4A1D13]'
                }`}
                title="Fill portrait frames focusing on face and gestures"
              >
                Framed View
              </button>
              <button
                onClick={() => setFitMode('contain')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  fitMode === 'contain'
                    ? 'bg-white text-[#7A2E1E] shadow-2xs'
                    : 'text-[#7A6A58] hover:text-[#4A1D13]'
                }`}
                title="Show entire full photo uncropped"
              >
                Full Uncropped
              </button>
            </div>

            <button
              onClick={onOpenDriveGuide}
              className="px-3 py-2 text-xs font-medium text-[#7A2E1E] bg-[#FFF3E8] hover:bg-[#FEE5D0] border border-[#F6DBC2] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Drive Link Guide</span>
            </button>
            <button
              onClick={onOpenAddMemory}
              className="px-3.5 py-2 text-xs font-medium text-white bg-[#8C3A24] hover:bg-[#722F1D] rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Memory</span>
            </button>
          </div>
        </div>

        {/* Category Filters (Clean functional button segmented control) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FAF3EA] rounded-xl border border-[#F0E4D5] mb-8 max-w-xl">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-white text-[#7A2E1E] shadow-2xs'
                : 'text-[#7A6A58] hover:text-[#4A1D13]'
            }`}
          >
            All Milestones ({milestones.length})
          </button>
          <button
            onClick={() => setActiveCategory('sanskars')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeCategory === 'sanskars'
                ? 'bg-white text-[#7A2E1E] shadow-2xs'
                : 'text-[#7A6A58] hover:text-[#4A1D13]'
            }`}
          >
            Sanskars & Pujas
          </button>
          <button
            onClick={() => setActiveCategory('festivals')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeCategory === 'festivals'
                ? 'bg-white text-[#7A2E1E] shadow-2xs'
                : 'text-[#7A6A58] hover:text-[#4A1D13]'
            }`}
          >
            Indian Festivals
          </button>
          <button
            onClick={() => setActiveCategory('firsts')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeCategory === 'firsts'
                ? 'bg-white text-[#7A2E1E] shadow-2xs'
                : 'text-[#7A6A58] hover:text-[#4A1D13]'
            }`}
          >
            Milestone Firsts
          </button>
          <button
            onClick={() => setActiveCategory('play')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeCategory === 'play'
                ? 'bg-white text-[#7A2E1E] shadow-2xs'
                : 'text-[#7A6A58] hover:text-[#4A1D13]'
            }`}
          >
            Joy & Giggles
          </button>
        </div>

        {/* Milestone Cards Grid - Optimized for Vertical Smartphone Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMilestones.map((item, index) => {
            const formattedUrl = formatMediaUrl(item.mediaUrl, item.mediaType);
            const isEmbedVideo = item.mediaType === 'video' && isGoogleDriveEmbedVideo(formattedUrl);

            return (
              <div
                key={item.id}
                onClick={() => onSelectMilestone(item)}
                className="group cursor-pointer bg-white rounded-3xl border border-[#F0E4D5] hover:border-[#DDBB9E] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col overflow-hidden"
              >
                {/* Media Container: 4:5 Portrait Ratio to match camera orientation */}
                <div className="relative aspect-[4/5] bg-[#FAF5EE] overflow-hidden flex items-center justify-center">
                  {isEmbedVideo ? (
                    <div className="w-full h-full flex items-center justify-center bg-stone-900 text-white">
                      <Play className="w-10 h-10 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="absolute bottom-3 left-3 text-xs bg-black/60 px-2 py-0.5 rounded text-white">
                        Video Memory
                      </span>
                    </div>
                  ) : (
                    <img
                      src={formattedUrl}
                      alt={item.title}
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-102 ${
                        fitMode === 'cover'
                          ? 'object-cover object-top'
                          : 'object-contain p-2'
                      }`}
                      referrerPolicy="no-referrer"
                      loading={index < 4 ? 'eager' : 'lazy'}
                    />
                  )}

                  {/* Top Badges (quiet unboxed text inside subtle overlay) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium">
                      {item.phase}
                    </span>
                    <span className="bg-black/60 backdrop-blur-xs p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Scrim Gradient at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none flex items-end p-3">
                    <span className="text-xs text-white font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-300" />
                      {item.dateStr}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Hindi Title & Sanskrit Blessing */}
                    {item.hindiTitle && (
                      <p className="text-xs font-hindi text-[#8C3A24] mb-1">
                        {item.hindiTitle}
                      </p>
                    )}

                    <h3 className="text-base font-royal font-semibold text-[#3D1A12] leading-snug group-hover:text-[#8C3A24] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#6B5E51] mt-2 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>

                    {item.traditionNote && (
                      <div className="mt-3 p-2.5 bg-[#FFF9F3] rounded-xl border border-[#F8EADC] text-xs text-[#7A402B]">
                        <span className="font-semibold text-amber-800">संस्कार परंपरा:</span> {item.traditionNote}
                      </div>
                    )}
                  </div>

                  {/* Card Footer with clean unboxed metadata */}
                  <div className="mt-4 pt-3 border-t border-[#F5EBE1] flex items-center justify-between text-xs text-[#8A7B6D]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-700" />
                      {item.location || 'Madhya Pradesh'}
                    </span>
                    <span className="text-amber-800 font-medium">
                      View Memory →
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
