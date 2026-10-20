export type MilestoneCategory = 'all' | 'sanskars' | 'festivals' | 'firsts' | 'play';

export interface Milestone {
  id: string;
  title: string;
  hindiTitle?: string;
  phase: string;
  dateStr: string;
  ageMonthStr: string;
  category: MilestoneCategory;
  mediaType: 'image' | 'video';
  mediaUrl: string; // local asset path or Google Drive link
  thumbnailUrl?: string;
  caption: string;
  traditionNote?: string;
  familyNote?: string;
  location?: string;
  tags?: string[];
}

export interface FamilyWish {
  id: string;
  senderName: string;
  relationship: string;
  relationRole: string; // e.g. "Papa & Mumma", "Dadu & Dadi (Madhya Pradesh)", "Nana & Nani"
  blessingTag: 'दीर्घायु भव' | 'आयुष्मान भव' | 'सदा मुसकाओ' | 'कुलदीपिका' | 'विजयी भव';
  message: string;
  hindiMessage?: string;
  date: string;
  flowerCount: number;
}

export interface TimeCapsuleLetter {
  id: string;
  unlockYear: number;
  targetAge: number;
  title: string;
  subtitle: string;
  theme: string;
  summary: string;
  fullLetter: string;
  rajputValue: string;
  sender: string;
}
