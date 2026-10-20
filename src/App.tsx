/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { TimelineSection } from './components/TimelineSection';
import { TraditionShowcase } from './components/TraditionShowcase';
import { FamilyWishesWall } from './components/FamilyWishesWall';
import { TimeCapsuleSection } from './components/TimeCapsuleSection';
import { LightboxModal } from './components/LightboxModal';
import { GoogleDriveGuideModal } from './components/GoogleDriveGuideModal';
import { AddMemoryModal } from './components/AddMemoryModal';
import { AudioBar } from './components/AudioBar';
import { Footer } from './components/Footer';

import { Milestone, FamilyWish } from './types/keepsake';
import {
  INITIAL_MILESTONES,
  INITIAL_FAMILY_WISHES,
  INITIAL_TIME_CAPSULE_LETTERS
} from './data/keepsakeData';
import { lullabyPlayer } from './utils/audioPlayer';

const STORAGE_KEY_MILESTONES = 'sengar_varnika_milestones_v1';
const STORAGE_KEY_WISHES = 'sengar_varnika_wishes_v1';

export default function App() {
  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MILESTONES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to initial
    }
    return INITIAL_MILESTONES;
  });

  const [wishes, setWishes] = useState<FamilyWish[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to initial
    }
    return INITIAL_FAMILY_WISHES;
  });

  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isDriveGuideOpen, setIsDriveGuideOpen] = useState(false);
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    lullabyPlayer.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
  }, []);

  const handleToggleMusic = () => {
    lullabyPlayer.toggle();
  };

  const handleAddMilestone = (newMilestone: Milestone) => {
    setMilestones((prev) => {
      const updated = [newMilestone, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_MILESTONES, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  const handleAddWish = (wishData: Omit<FamilyWish, 'id' | 'flowerCount' | 'date'>) => {
    const newWish: FamilyWish = {
      ...wishData,
      id: `w-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      flowerCount: 1
    };

    setWishes((prev) => {
      const updated = [newWish, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  const handleIncrementFlowers = (id: string) => {
    setWishes((prev) => {
      const updated = prev.map((w) =>
        w.id === id ? { ...w, flowerCount: w.flowerCount + 1 } : w
      );
      try {
        localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  const scrollToJourney = () => {
    const el = document.getElementById('journey');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWishes = () => {
    const el = document.getElementById('wishes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#2D2A26]" spellCheck={false}>
      
      {/* 3-Zone Clean Header */}
      <HeaderNav
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        onOpenAddMemory={() => setIsAddMemoryOpen(true)}
        onOpenDriveGuide={() => setIsDriveGuideOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Welcome / Landing Hero Section */}
        <HeroSection
          onExploreJourney={scrollToJourney}
          onOpenWishes={scrollToWishes}
        />

        {/* Interactive Timeline / Milestone Gallery */}
        <TimelineSection
          milestones={milestones}
          onSelectMilestone={(m) => setSelectedMilestone(m)}
          onOpenAddMemory={() => setIsAddMemoryOpen(true)}
          onOpenDriveGuide={() => setIsDriveGuideOpen(true)}
        />

        {/* Indian Hindu Traditions & Rajput Heritage Showcase */}
        <TraditionShowcase />

        {/* Family Wishes & Blessings Wall */}
        <FamilyWishesWall
          wishes={wishes}
          onAddWish={handleAddWish}
          onIncrementFlowers={handleIncrementFlowers}
        />

        {/* Future Time Capsule (Ages 3 to 7) */}
        <TimeCapsuleSection letters={INITIAL_TIME_CAPSULE_LETTERS} />

      </main>

      {/* Lightbox / Fullscreen Modal */}
      {selectedMilestone && (
        <LightboxModal
          milestone={selectedMilestone}
          allMilestones={milestones}
          onClose={() => setSelectedMilestone(null)}
          onNavigate={(m) => setSelectedMilestone(m)}
        />
      )}

      {/* Google Drive Guide & Live Link Converter */}
      {isDriveGuideOpen && (
        <GoogleDriveGuideModal
          onClose={() => setIsDriveGuideOpen(false)}
        />
      )}

      {/* Add New Memory Modal */}
      {isAddMemoryOpen && (
        <AddMemoryModal
          onClose={() => setIsAddMemoryOpen(false)}
          onAddMilestone={handleAddMilestone}
        />
      )}

      {/* Floating Ambient Lullaby Controller */}
      <AudioBar
        isPlaying={isPlayingMusic}
        onToggle={handleToggleMusic}
      />

      {/* Quiet Family Keepsake Footer */}
      <Footer />

    </div>
  );
}
