import { Milestone, GrowthPhase, KeepsakeItem, FamilyWish, TimeCapsuleLetter } from "../types/keepsake";

export const SHARED_DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1gGap2k8l5WhaMpNYcEAap8PUjVRC_RaJ?usp=sharing";

/**
 * 10 Sequential Chronological Landmark Growth Phases
 * From 1st Birthday (Oct 2025) through all traditional Indian festivals to 2nd Birthday Today (Oct 2026).
 */
export const GROWTH_PHASES: GrowthPhase[] = [
  {
    id: "phase-1st-bday-diwali",
    order: 1,
    title: "1st Birthday Milestone & Deepawali Lights",
    hindiTitle: "प्रथम जन्मोत्सव एवं दीपावली दीपदान",
    festivalName: "1st Birthday & Diwali",
    festivalIcon: "🪔",
    timeRange: "October – December 2025",
    ageMonthStr: "12 – 14 Months",
    featuredMediaUrl: "/assets/drive/20251217_102315.jpg",
    featuredMediaType: "image",
    driveUrl: "https://drive.google.com/file/d/1jv5Jv651vD4Kq4PQuHypt4TsgglPvy9M/view?usp=sharing",
    growthStory: "Completing 365 glorious days of life! Taking independent steps, standing without support, tasting sweet kheer with silver spoon, and watching terracotta diyas sparkle in the Sengar courtyard.",
    traditionNote: "Deepawali Lakshmi Pujan and Ayushya Havan in Rajput tradition invoking longevity, health, and radiant grace for the daughter of the clan.",
    familyMemory: "Rohit Papa held your hand as you tried to catch the golden glow of the Diwali lamps with your tiny fingers.",
    totalItemsCount: 42,
    sampleItems: []
  },
  {
    id: "phase-winter-sankranti",
    order: 2,
    title: "Winter Warmth & Makar Sankranti",
    hindiTitle: "शिशिर ऋतु एवं मकर संक्रांति",
    festivalName: "Makar Sankranti",
    festivalIcon: "🪁",
    timeRange: "January 2026",
    ageMonthStr: "15 Months",
    featuredMediaUrl: "/assets/drive/20260120_212422.jpg",
    featuredMediaType: "image",
    driveUrl: "https://drive.google.com/file/d/1jWbfRGyCJRKJOKzCjXnOMhWOXmtvGhAF/view?usp=sharing",
    growthStory: "Bundled up in cozy winter knits, walking confidently from room to room, greeting elders with folded hands (Namaste), and calling out sweet words like \"Dadu\" and \"Mumma\".",
    traditionNote: "Surya worship on Uttarayan, sharing til-gud sweets for harmony, and receiving winter health blessings from elders in Madhya Pradesh.",
    familyMemory: "You loved wearing your little woolen cap and running after Papa across the carpeted living hall.",
    totalItemsCount: 2,
    sampleItems: []
  },
  {
    id: "phase-basant-panchami",
    order: 3,
    title: "Basant Panchami & Saraswati Blessings",
    hindiTitle: "बसंत पंचमी व माँ सरस्वती वंदना",
    festivalName: "Basant Panchami",
    festivalIcon: "🌼",
    timeRange: "February 2026",
    ageMonthStr: "16 Months",
    featuredMediaUrl: "/assets/drive/20260205_154801.jpg",
    featuredMediaType: "image",
    driveUrl: "https://drive.google.com/file/d/1vgcreC8IcwkADjQqsF6rTpxfJHZyBiou/view?usp=sharing",
    growthStory: "Blooming with curiosity and toddler intellect! Inquisitive brown eyes exploring colorful books, stacking building blocks, and babbling sweet melodies with Mumma.",
    traditionNote: "Wearing yellow garments, offering marigold flowers to Goddess Saraswati, and praying for Vidya (sacred learning) and sweet speech.",
    familyMemory: "Dadi gently applied a yellow chandan tilak on your forehead during morning prayer.",
    totalItemsCount: 6,
    sampleItems: []
  },
  {
    id: "phase-holi-rangotsav",
    order: 4,
    title: "Rangotsav Holi: 2nd Festival of Colours",
    hindiTitle: "रंगोत्सव होली व फाग गायन",
    festivalName: "Holi Rangotsav",
    festivalIcon: "🎨",
    timeRange: "March 2026",
    ageMonthStr: "17 Months",
    featuredMediaUrl: "/assets/drive/20260317_222617.jpg",
    featuredMediaType: "image",
    driveUrl: "https://drive.google.com/file/d/1ubXlnw_WgcGdhVWTfIgjmemvfqGaOvyw/view?usp=sharing",
    growthStory: "Her second Holi celebration! Laughing out loud as organic rose petals and fragrant gulal were showered on her. Clapping her hands to traditional folk rhythms.",
    traditionNote: "Holika Dahan protection rituals, Chandan tilak for coolness, and Sengar family sweets and gujiya celebrations in Madhya Pradesh.",
    familyMemory: "You held a pinch of pink gulal in your little fist and placed it proudly on Rohit Papa’s cheek!",
    totalItemsCount: 5,
    sampleItems: []
  },
  {
    id: "phase-chaitra-navratri",
    order: 5,
    title: "Chaitra Navratri & Toddler Steps",
    hindiTitle: "चैत्र नवरात्रि व रामनवमी उल्लास",
    festivalName: "Chaitra Navratri",
    festivalIcon: "🌸",
    timeRange: "April 2026",
    ageMonthStr: "18 Months",
    featuredMediaUrl: "/assets/drive/20260405_213446.jpg",
    featuredMediaType: "image",
    driveUrl: "https://drive.google.com/file/d/1OmQce_Sf3QasQBX_TNngkEVLkNpIgfyB/view?usp=sharing",
    growthStory: "Turning one and a half years old! Stepping swiftly outdoors, climbing onto the sofa independently, recognizing family members on phone calls, and imitating puja aarti.",
    traditionNote: "Kanya Pujan reverence on Ram Navami and Ashtami, worshipping the young girl child as the living manifestation of Maa Jagdamba.",
    familyMemory: "You bowed your little head during the evening Aarti just like Mumma, folding hands with utmost innocence.",
    totalItemsCount: 10,
    sampleItems: []
  },
  {
    id: "phase-summer-sunshine",
    order: 6,
    title: "Summer Sunshine & Joyful Giggles",
    hindiTitle: "ग्रीष्मकालीन मधुर स्मृतियां व नन्हे बोल",
    festivalName: "Summer Joy & Play",
    festivalIcon: "☀️",
    timeRange: "May – June 2026",
    ageMonthStr: "19 – 20 Months",
    featuredMediaUrl: "/assets/drive/20260523_222333.jpg",
    featuredMediaType: "image",
    driveUrl: "https://drive.google.com/file/d/1ic1kk8VqS4pR7Jn45a0ZR2OUDkWX9_4m/view?usp=sharing",
    growthStory: "Speaking in cute full phrases! Running freely across the garden courtyard during cool summer dusks, giggling with parents, and discovering the joy of hide-and-seek.",
    traditionNote: "Terrace gatherings with cold mango panna, folk lullabies under starry Central Indian skies, and affectionate bonding across generations.",
    familyMemory: "Playing hide-and-seek with Papa behind the sofa, popping out with a loud \"Bhooo!\" and laughing endlessly.",
    totalItemsCount: 8,
    sampleItems: []
  },
  {
    id: "phase-rakhi-janmashtami",
    order: 7,
    title: "Shravan, Rakshabandhan & Janmashtami",
    hindiTitle: "रक्षाबंधन व श्रीकृष्ण जन्माष्टमी",
    festivalName: "Rakshabandhan & Janmashtami",
    festivalIcon: "🦚",
    timeRange: "August 2026",
    ageMonthStr: "21 – 22 Months",
    featuredMediaUrl: "/assets/drive/20260816_111237.jpg",
    featuredMediaType: "image",
    driveUrl: "https://drive.google.com/file/d/18Cts-tlmZdyke20SVSszSavcYwF0EUSz/view?usp=sharing",
    growthStory: "Fascinated by colorful Rakhi threads, dancing gracefully like little Radha Rani in peacock-feather attire, waving the Indian tricolor flag high on Independence Day.",
    traditionNote: "The Rajput brotherly vow of lifetime protection, swinging the Bal Gopal cradle (Jhulanotsav), and receiving elder blessings.",
    familyMemory: "Varnika looked at her reflection in the mirror with the peacock feather in her hair and gave herself the sweetest flying kiss!",
    totalItemsCount: 12,
    sampleItems: []
  },
  {
    id: "phase-ganesh-chaturthi",
    order: 8,
    title: "Ganesh Chaturthi & Autumn Excursions",
    hindiTitle: "गणेश चतुर्थी व आनंद यात्रा",
    festivalName: "Ganesh Chaturthi",
    festivalIcon: "🐘",
    timeRange: "September 2026",
    ageMonthStr: "22 Months",
    featuredMediaUrl: "/assets/drive/20260913_114129.jpg",
    featuredMediaType: "image",
    driveUrl: "https://drive.google.com/file/d/1Hbah9TwtlO3R-c6oxAWMmn40u8Y3nVai/view?usp=sharing",
    growthStory: "Weekend family road trips, singing rhymes in the car, clapping along during Ganpati Bappa Aarti, and exploring nature across Madhya Pradesh.",
    traditionNote: "Prayers to Lord Ganesha (Vighnaharta) for intellect, wisdom, and auspicious protection for the Sengar lineage.",
    familyMemory: "Clapping with both hands whenever \"Ganpati Bappa Morya\" was chanted, with her eyes wide with excitement.",
    totalItemsCount: 6,
    sampleItems: []
  },
  {
    id: "phase-durga-pooja",
    order: 9,
    title: "Sharad Navratri Durga Pooja & Kanya Pujan",
    hindiTitle: "शारदीय नवरात्रि दुर्गा पूजा व कन्या पूजन",
    festivalName: "Durga Pooja & Navratri",
    festivalIcon: "🔱",
    timeRange: "Late Sept – Early Oct 2026",
    ageMonthStr: "23 Months",
    featuredMediaUrl: "/assets/drive/20260926_194307.jpg",
    featuredMediaType: "image",
    driveUrl: "https://drive.google.com/file/d/1APa0voCRVEgq3TubCRS2Kcwq_9dmDFyT/view?usp=sharing",
    growthStory: "Sitting serenely during sacred Kanya Pujan, red alta adorning her little feet, accepting prasad, and receiving veneration as Devi Swaroopa from elders.",
    traditionNote: "The supreme Rajput tradition of revering the daughter as Kuldevi’s living blessing during Navratri Ashtami in Madhya Pradesh.",
    familyMemory: "All family members touched her little feet and received her sweet toddler smile as an auspicious blessing.",
    totalItemsCount: 9,
    sampleItems: []
  },
  {
    id: "phase-turning-two-today",
    order: 10,
    title: "Dussehra & Grand 2nd Birthday Today! ✌️",
    hindiTitle: "विजयादशमी व भव्य 2 वर्ष प्राकट्योत्सव (आज)",
    festivalName: "Dussehra & 2nd Birthday Today",
    festivalIcon: "🎂",
    timeRange: "October 19 – 27, 2026",
    ageMonthStr: "24 Months / Turning 2!",
    featuredMediaUrl: "/assets/drive/20261019_154720.jpg",
    featuredMediaType: "image",
    driveUrl: "https://drive.google.com/file/d/1CjAUH19wBwHdhRw-lxpbA3Ujkz8JjnU_/view?usp=sharing",
    growthStory: "Proudly raising two little fingers on both hands: \"Look world, I am Turning Two!\" — Dressed in pristine white & gold, poised like a royal Rajput princess, giggling in live video recordings.",
    traditionNote: "Vijayadashami Shaurya Pooja, Pushpa Varsha (shower of flowers), and sealing memories in this digital heirloom for the next 5 years.",
    familyMemory: "Practicing the \"Two\" peace sign all week with Rohit Papa and showing it with the brightest, most radiant smile!",
    totalItemsCount: 44,
    sampleItems: []
  }
];

export const INITIAL_MILESTONES: Milestone[] = GROWTH_PHASES.map((p) => ({
  id: p.id,
  title: p.title,
  hindiTitle: p.hindiTitle,
  phase: p.title,
  phaseId: p.id,
  festivalName: p.festivalName,
  festivalIcon: p.festivalIcon,
  dateStr: p.timeRange,
  ageMonthStr: p.ageMonthStr,
  category: "festivals",
  mediaType: p.featuredMediaType,
  mediaUrl: p.featuredMediaUrl,
  driveUrl: p.driveUrl,
  thumbnailUrl: p.featuredThumbnailUrl,
  caption: p.growthStory,
  traditionNote: p.traditionNote,
  familyNote: p.familyMemory,
  location: "Madhya Pradesh, India",
  tags: [p.festivalName, "Growth Phase", p.ageMonthStr]
}));

export const INITIAL_FAMILY_WISHES: FamilyWish[] = [
  {
    id: "w-papa-mumma",
    senderName: "Rohit Papa & Mumma",
    relationship: "Proud Parents",
    relationRole: "Papa & Mumma",
    blessingTag: "दीर्घायु भव",
    message: "To our darling princess Varnika — you are the heartbeat of our home. Watching you grow from your 1st birthday through Diwali, Holi, Rakshabandhan, and Navratri to this spirited, laughing 2-year-old has been the greatest blessing of our lives. May Kuldevi Maa always protect you with valor, honor, and immense happiness. Happy 2nd Birthday, our angel!",
    hindiMessage: "हमारी प्राणप्यारी वर्णिका, तुम हमारे जीवन का सबसे सुंदर वरदान हो। माँ कुलदेवी की कृपा सदा तुम पर बनी रहे। सदा हँसती रहो, आगे बढ़ती रहो!",
    date: "October 27, 2026",
    flowerCount: 51
  },
  {
    id: "w-dadu-dadi",
    senderName: "Dadu & Dadi (Madhya Pradesh)",
    relationship: "Paternal Grandparents",
    relationRole: "Dadu & Dadi (Sengar Clan)",
    blessingTag: "कुलदीपिका",
    message: "Blessings from the Sengar family roots in Madhya Pradesh. Varnika, you are the shining light of our lineage. Your little giggles echo across the courtyard, reminding us of the timeless Rajput grace and warmth. May your life be filled with Vidya (wisdom), Shaurya (courage), and boundless respect.",
    hindiMessage: "सेंगर कुल की राजदुलारी को दादा-दादी का कोटि-कोटि आशीर्वाद। सदा सुखी रहो, यश कमाओ और परिवार का नाम रोशन करो।",
    date: "October 27, 2026",
    flowerCount: 42
  },
  {
    id: "w-nana-nani",
    senderName: "Nana & Nani",
    relationship: "Maternal Grandparents",
    relationRole: "Nana & Nani",
    blessingTag: "आयुष्मान भव",
    message: "Our sweet little doll! Seeing you hold up two fingers with that sparkling grin filled our eyes with joyous tears. May the almighty bless you with a hundred years of radiant health, sweet laughter, and gentle wisdom. You are the joy of both maternal and paternal homes.",
    hindiMessage: "नाना-नानी की लाडली बिटिया को जन्मदिन की ढेर सारी शुभकामनाएं। दीर्घायु हो, यशस्वी हो!",
    date: "October 27, 2026",
    flowerCount: 38
  },
  {
    id: "w-bua-chacha",
    senderName: "Bua & Chacha",
    relationship: "Aunt & Uncle",
    relationRole: "Bua & Chacha",
    blessingTag: "सदा मुसकाओ",
    message: "Happy 2nd Birthday to the naughtiest, cutest niece ever! We promise to always spoil you with candies, toys, and secret weekend outings. Keep spreading your magical toddler smiles everywhere!",
    hindiMessage: "हमारी चुलबुली भतीजी को ढेर सारा प्यार और जन्मदिन की बधाई! यूँ ही सदा खिलखिलाती रहो।",
    date: "October 27, 2026",
    flowerCount: 29
  }
];

export const INITIAL_TIME_CAPSULE_LETTERS: TimeCapsuleLetter[] = [
  {
    id: "tc-age-3",
    unlockYear: 2027,
    targetAge: 3,
    title: "Words for Your 3rd Birthday: The Age of Magic & Stories",
    subtitle: "Scheduled to Unlock: October 27, 2027",
    theme: "Language, Imagination & Rajput Heritage Stories",
    summary: "A letter written by Rohit Papa when you were 2, about the first sentences you learned to speak and the folk tales of brave kings and compassionate queens.",
    fullLetter: "Dearest Varnika,\n\nToday, as I write this note on your 2nd birthday, you are busy running around the room holding up two little fingers to anyone who asks your age. By the time you read or hear this letter on October 27, 2027, you will be turning THREE years old!\n\nYou will probably be asking dozens of Kyun? (Why?) questions every single day. I want you to always stay curious. Never be afraid to ask questions. Remember the lullabies Mumma sang to you, and the way Dadu told you about our brave Rajput ancestors in Madhya Pradesh.\n\nKeep holding onto your kindness. When you share your toys with friends and help Mumma pick up flower petals, you make the whole house proud.\n\nWith all our love,\nRohit Papa & Mumma (Written October 2026)",
    rajputValue: "Vidya (विद्या) — The Quest for Sacred Knowledge",
    sender: "Rohit Papa & Mumma"
  },
  {
    id: "tc-age-4",
    unlockYear: 2028,
    targetAge: 4,
    title: "Words for Your 4th Birthday: Stepping into the World",
    subtitle: "Scheduled to Unlock: October 27, 2028",
    theme: "Courage, First School & Boundless Friendship",
    summary: "A message capturing the warmth of family protection as you begin stepping into preschool and discovering the wider community.",
    fullLetter: "My Precious Daughter Varnika,\n\nTurning four is a milestone of big adventures! You might be wearing a little school bag, reciting your first English and Hindi poems, and making lifelong friendships.\n\nAlways remember: in the Sengar family, courage (Shaurya) does not mean being loud or aggressive. True Rajput courage means standing up for what is right, comforting a friend who is crying, and being truthful even when it is difficult.\n\nYour smile has a magical power to bring peace to any room. Never lose that gentle sparkle.\n\nWith immense love and blessings,\nYour Parents & Grandparents",
    rajputValue: "Shaurya (शौर्य) — Gentle Courage & Integrity",
    sender: "The Sengar Elders"
  },
  {
    id: "tc-age-5",
    unlockYear: 2029,
    targetAge: 5,
    title: "Words for Your 5th Birthday: The Golden Milestone",
    subtitle: "Scheduled to Unlock: October 27, 2029",
    theme: "Compassion, Arts, and Cultural Identity",
    summary: "Marking half a decade of pure blessing. Passing on the timeless value of Karuna (compassion for all living beings).",
    fullLetter: "Beloved Varnika,\n\nFive whole years! Half a decade since you came into our lives on October 27, 2024. Today, you are growing into an intelligent, perceptive young girl.\n\nLook at the photos on this digital album: see how small your hands were when you turned two! You wore white and gold, and folded your hands in a respectful Pranam. Never forget the culture of your homeland in Madhya Pradesh. Celebrate Diwali by lighting lamps for the needy, celebrate Holi with cheerful colors, and celebrate Navratri with deep respect for womanhood.\n\nMay you grow up to be wise, compassionate, and deeply grounded in your values.\n\nForever your proud guardians,\nPapa, Mumma, and all Family Elders",
    rajputValue: "Karuna (करुणा) — Unconditional Empathy & Grace",
    sender: "The Sengar Clan"
  },
  {
    id: "tc-age-6",
    unlockYear: 2030,
    targetAge: 6,
    title: "Words for Your 6th Birthday: Dignity & Self-Belief",
    subtitle: "Scheduled to Unlock: October 27, 2030",
    theme: "Maryada, Discipline, and Personal Excellence",
    summary: "A letter on finding your passions — whether in books, dance, sciences, or arts — with unwavering dignity.",
    fullLetter: "Dear Varnika,\n\nAt six years old, you are blossoming into your own unique personality. You may love reading books, dancing to classical rhythms, painting vibrant pictures, or solving mathematics riddles.\n\nWhatever path you choose to pursue, give it your whole heart. Our Rajput heritage honors Maryada (honor and dignity). Hold your head high, treat every person with equal respect, and know that your family will always stand behind you as your strongest foundation.\n\nWith eternal love,\nRohit Papa",
    rajputValue: "Maryada (मर्यादा) — Dignity, Respect & Honor",
    sender: "Rohit Papa"
  },
  {
    id: "tc-age-7",
    unlockYear: 2031,
    targetAge: 7,
    title: "Words for Your 7th Birthday: The Guiding Light of Sengar",
    subtitle: "Scheduled to Unlock: October 27, 2031",
    theme: "Kuldeepika — Leading with Light, Wisdom & Strength",
    summary: "The culmination of the 5-year time capsule. Reading the full memories of her infancy and toddlerhood.",
    fullLetter: "Our Darling Varnika,\n\nToday, you are seven years old. When we created this keepsake for your 2nd birthday back in 2026, we promised that this digital family treasure would preserve every smile, every video, and every tradition for you to look back on.\n\nYou are the Kuldeepika — the guiding lamp — of the Sengar family. May you shine brilliantly in academics, in character, and in your dreams. The world is vast and full of wonder. Step forward with confidence, knowing you carry the blessings of your ancestors, the prayers of your grandparents in Madhya Pradesh, and the boundless love of your parents.\n\nHappy 7th Birthday, Princess Varnika!\n\nAll our love across time,\nYour Entire Sengar Parivar",
    rajputValue: "Kuldeepak (कुलदीपिका) — Radiance & Ancestral Pride",
    sender: "The Entire Sengar Parivar"
  }
];

export const TRADITIONAL_FESTIVALS_INFO = [
  {
    title: "Kuldevi Maa Ashirwad & Rajput Heritage",
    hindi: "कुलदेवी माँ का पावन आशीर्वाद",
    desc: "The Sengar Rajput lineage upholds devotion to Kuldevi Maa, seeking blessings of fearlessness, truth, and righteous conduct for daughters of the clan.",
    icon: "shield"
  },
  {
    title: "Kanya Pujan & Navratri Revering",
    hindi: "कन्या पूजन व देवी स्वरूप",
    desc: "During Sharad and Chaitra Navratri in Madhya Pradesh, young daughters are revered as the living embodiment of Maa Jagdamba, worshipped with alta and sweet kheer.",
    icon: "sparkles"
  },
  {
    title: "Deepawali & Sandhya Aarti",
    hindi: "दीपावली व संध्या दीपदान",
    desc: "Welcoming prosperity and dispelling darkness. Lighting terracotta diyas with pure mustard oil and chanting the Mahalakshmi Ashtakam.",
    icon: "flame"
  },
  {
    title: "Holi & Spring Folk Traditions",
    hindi: "रंगोत्सव व फाग गायन",
    desc: "The vibrant festival of colours in Central India, celebrating joy, fresh harvests, and family togetherness with organic chandan and rose petals.",
    icon: "sun"
  }
];
