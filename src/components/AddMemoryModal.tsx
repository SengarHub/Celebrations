import React, { useState } from 'react';
import { Milestone, MilestoneCategory } from '../types/keepsake';
import { X, Plus, Sparkles, Image as ImageIcon, Video, Calendar, MapPin } from 'lucide-react';
import { triggerPushpaVarsha } from '../utils/confettiHelper';

interface AddMemoryModalProps {
  onClose: () => void;
  onAddMilestone: (milestone: Milestone) => void;
}

export const AddMemoryModal: React.FC<AddMemoryModalProps> = ({
  onClose,
  onAddMilestone
}) => {
  const [title, setTitle] = useState('');
  const [hindiTitle, setHindiTitle] = useState('');
  const [phase, setPhase] = useState('Phase 7 · 2nd Birthday Special');
  const [dateStr, setDateStr] = useState('October 2026');
  const [ageMonthStr, setAgeMonthStr] = useState('24 Months');
  const [category, setCategory] = useState<MilestoneCategory>('firsts');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaUrl, setMediaUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [traditionNote, setTraditionNote] = useState('');
  const [familyNote, setFamilyNote] = useState('');
  const [location, setLocation] = useState('Madhya Pradesh, India');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !mediaUrl.trim() || !caption.trim()) return;

    const newMilestone: Milestone = {
      id: `m-custom-${Date.now()}`,
      title: title.trim(),
      hindiTitle: hindiTitle.trim() || undefined,
      phase,
      dateStr,
      ageMonthStr,
      category,
      mediaType,
      mediaUrl: mediaUrl.trim(),
      caption: caption.trim(),
      traditionNote: traditionNote.trim() || undefined,
      familyNote: familyNote.trim() || undefined,
      location: location.trim() || 'Madhya Pradesh, India',
      tags: ['Custom Memory', 'Varnika Journey']
    };

    onAddMilestone(newMilestone);
    triggerPushpaVarsha();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] rounded-3xl border border-[#EDDCBA] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#F2E4D5] mb-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#8C3A24] font-semibold uppercase tracking-wider mb-1">
              <span>🌸</span>
              <span>Cherish Every Step</span>
            </div>
            <h3 className="text-xl font-royal font-bold text-[#4A1D13]">
              Add a New Milestone Memory
            </h3>
            <p className="text-xs text-[#7A6A58]">
              Paste a Google Drive photo/video link or web image URL to add to Varnika's timeline.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7A6A58] hover:text-[#4A1D13] rounded-full hover:bg-[#FAF4ED] transition-colors"
            aria-label="Close add memory modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" spellCheck={false}>
          
          {/* Media URL */}
          <div>
            <label className="block text-xs font-semibold text-[#4A1D13] mb-1">
              Google Drive Link or Image URL *
            </label>
            <input
              type="text"
              required
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="e.g. https://drive.google.com/file/d/... or /assets/..."
              spellCheck={false}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DACB] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#8C3A24]/20"
            />
            <p className="text-[11px] text-[#8A7B6D] mt-1">
              Tip: Works with any shared Google Drive file link, local image path, or online URL.
            </p>
          </div>

          {/* Media Type & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#5C5248] mb-1">
                Media Type
              </label>
              <select
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value as 'image' | 'video')}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DACB] bg-white"
              >
                <option value="image">Photo / Picture</option>
                <option value="video">Video Recording</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C5248] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MilestoneCategory)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DACB] bg-white"
              >
                <option value="firsts">Milestone Firsts</option>
                <option value="sanskars">Sanskars & Pujas</option>
                <option value="festivals">Indian Festivals</option>
                <option value="play">Joy & Play</option>
              </select>
            </div>
          </div>

          {/* Title & Hindi Title */}
          <div>
            <label className="block text-xs font-semibold text-[#4A1D13] mb-1">
              Milestone Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Dancing in her new Rajput Ghagra Choli"
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DACB] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#8C3A24]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#5C5248] mb-1">
              Optional Hindi Title (हिंदी शीर्षक)
            </label>
            <input
              type="text"
              value={hindiTitle}
              onChange={(e) => setHindiTitle(e.target.value)}
              placeholder="e.g. पारंपरिक परिधान में नन्हीं वर्णिका की सुंदर छटा"
              className="w-full px-3 py-2 text-xs font-hindi rounded-xl border border-[#E8DACB] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#8C3A24]/20"
            />
          </div>

          {/* Phase, Date & Age */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-[#5C5248] mb-1">Phase</label>
              <input
                type="text"
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#E8DACB] bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#5C5248] mb-1">Date</label>
              <input
                type="text"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#E8DACB] bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#5C5248] mb-1">Age</label>
              <input
                type="text"
                value={ageMonthStr}
                onChange={(e) => setAgeMonthStr(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#E8DACB] bg-white"
              />
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-[#4A1D13] mb-1">
              Heartwarming Memory Caption *
            </label>
            <textarea
              required
              rows={2}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe the sweet moment, laughter, or achievement..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DACB] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#8C3A24]/20"
            />
          </div>

          {/* Tradition Note */}
          <div>
            <label className="block text-xs font-medium text-[#5C5248] mb-1">
              Indian Tradition / Rajput Sanskar Note (Optional)
            </label>
            <input
              type="text"
              value={traditionNote}
              onChange={(e) => setTraditionNote(e.target.value)}
              placeholder="e.g. Diya lighting with family elders, Kanya Pujan prasad"
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DACB] bg-white"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-medium text-[#5C5248] mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Sengar Family Residence, Madhya Pradesh"
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DACB] bg-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#7A6A58] hover:bg-[#FAF4ED] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#8C3A24] hover:bg-[#722F1D] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save to 2-Year Journey</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
