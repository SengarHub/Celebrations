import { Milestone, FamilyWish, TimeCapsuleLetter } from '../types/keepsake';

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm-birth-namkaran',
    title: 'Welcoming Princess Varnika: Namkaran Sanskar',
    hindiTitle: 'शुभ नामकरण संस्कार व कुलदेवी माँ का आशीर्वाद',
    phase: 'Phase 1 · Newborn',
    dateStr: 'October 27, 2024',
    ageMonthStr: 'Birth Milestone',
    category: 'sanskars',
    mediaType: 'image',
    mediaUrl: '/assets/aistudio/IMG_20261019_165317_f54135f1.jpg',
    caption: 'The most sacred day of our lives. You arrived like a ray of morning sunshine, filling the Sengar household with divine joy and unending smiles.',
    traditionNote: 'Named "Varnika" (वर्णिका) — representing pure gold, divine grace, and the sacred sacred glow of Maa Durga.',
    familyNote: 'When Papa and Mumma held you for the first time, tears of gratitude flowed. Sengar ancestral roots in Madhya Pradesh rejoiced.',
    location: 'Sengar Family Home, Madhya Pradesh',
    tags: ['Namkaran', 'Kuldevi Ashirwad', 'Newborn']
  },
  {
    id: 'm-first-smiles',
    title: 'Cradle Songs, Lori & The First Sweet Giggles',
    hindiTitle: 'पहली मधुर मुस्कान और दादी-नानी की लोरियाँ',
    phase: 'Phase 2 · 3 to 6 Months',
    dateStr: 'January – March 2025',
    ageMonthStr: '3–5 Months',
    category: 'firsts',
    mediaType: 'image',
    mediaUrl: '/assets/aistudio/20261019_154738_df7f894e.jpg',
    caption: 'That unforgettable moment when your big round eyes lit up and you gifted us your very first real belly giggle.',
    traditionNote: 'Celebrated Makar Sankranti and early spring with til-gud and elder blessings for good health and radiant spirit.',
    familyNote: 'Dadi kept singing traditional Bundelkhandi/Madhya Pradesh folk lullabies, and you would fall asleep gently smiling.',
    location: 'Madhya Pradesh, India',
    tags: ['First Giggles', 'Makar Sankranti', 'Lullabies']
  },
  {
    id: 'm-annaprashan',
    title: 'Annaprashan Sanskar: First Sacred Taste of Kheer',
    hindiTitle: 'अन्नप्राशन संस्कार — चांदी की कटोरी में खीर का प्रसाद',
    phase: 'Phase 3 · 6 Months Milestone',
    dateStr: 'April 2025',
    ageMonthStr: '6 Months',
    category: 'sanskars',
    mediaType: 'image',
    mediaUrl: '/assets/aistudio/20261019_154804_6d04dde2.jpg',
    caption: 'Sitting like a little queen, tasting sweet cardamom kheer from a silver spoon offered with Vedic mantras and family blessings.',
    traditionNote: 'A sacred Hindu rite of passage where solid wholesome food is introduced with prayers to Annapurna Devi.',
    familyNote: 'You smacked your lips and wanted more spoon bites right away! Everyone burst into laughter.',
    location: 'Family Sadan, Madhya Pradesh',
    tags: ['Annaprashan', 'Sanskrit Sanskar', 'First Food']
  },
  {
    id: 'm-janmashtami-peacock',
    title: 'Janmashtami & Raksha Bandhan Celebrations',
    hindiTitle: 'जन्माष्टमी और कान्हा-राधा रूप',
    phase: 'Phase 4 · 9 to 11 Months',
    dateStr: 'August 2025',
    ageMonthStr: '10 Months',
    category: 'festivals',
    mediaType: 'image',
    mediaUrl: '/assets/aistudio/20261019_154813_5e6ec029.jpg',
    caption: 'Adorned in ethnic attire with tiny ghungroo bells in your payal, jingling everywhere as you crawled into every corner with boundless curiosity.',
    traditionNote: 'The auspicious festival of Janmashtami and sacred Raksha Bandhan threads strengthening family bonds.',
    familyNote: 'Mumma dressed you with so much love; you looked at your little reflection and tried to hug the mirror.',
    location: 'Sengar Residence',
    tags: ['Janmashtami', 'Festivals', 'Payal Bells']
  },
  {
    id: 'm-navratri-kanya-pujan',
    title: 'Maha Navratri: Revered as Kanya Devi',
    hindiTitle: 'कन्या पूजन — देवी स्वरूपा वर्णिका के चरण वंदन',
    phase: 'Phase 4 · 11 Months',
    dateStr: 'October 2025',
    ageMonthStr: '11 Months',
    category: 'sanskars',
    mediaType: 'image',
    mediaUrl: '/assets/aistudio/20261019_154828_b84a9d3f.jpg',
    caption: 'During the auspicious Navratri Ashtami & Navami, the entire family touched your tiny feet, revering you as the living presence of Maa Durga.',
    traditionNote: 'In Rajput tradition, young daughters are the highest blessing of Kuldevi, bringing prosperity and auspiciousness to the clan.',
    familyNote: 'With red chuni and chana-halwa in your little plate, you blessed all the elders with innocent smiles.',
    location: 'Madhya Pradesh',
    tags: ['Kanya Pujan', 'Navratri', 'Rajput Heritage']
  },
  {
    id: 'm-first-birthday',
    title: 'The Royal 1st Birthday & Deepotsav Glow',
    hindiTitle: 'पहला जन्मदिन और दीपोत्सव की जगमगाहट',
    phase: 'Phase 5 · 1st Birthday (12 Months)',
    dateStr: 'October 27, 2025',
    ageMonthStr: '12 Months / 1 Year',
    category: 'festivals',
    mediaType: 'image',
    mediaUrl: '/assets/aistudio/IMG_20261019_165317_f54135f1.jpg',
    caption: 'One whole year of pure heaven! Decorated with marigold garlands, earthen diyas, and surrounded by grandparents and relatives celebrating your 1st year.',
    traditionNote: 'Traditional Mangal Aarti, family feast (prasad), and charity offered in baby Varnika’s name.',
    familyNote: 'Papa Rohit couldn’t stop snapping photos, while Mumma made sure every single guest received your birthday mithai.',
    location: 'Sengar Family Hall, MP',
    tags: ['1st Birthday', 'Deepavali', 'Aarti']
  },
  {
    id: 'm-first-words-curiosity',
    title: 'Exploring the World & Endless Sweet Words',
    hindiTitle: 'नन्हीं बातें: "पापा", "मम्मा" और चहकती दुनिया',
    phase: 'Phase 6 · 15 to 20 Months',
    dateStr: 'Early to Mid 2026',
    ageMonthStr: '18 Months',
    category: 'play',
    mediaType: 'image',
    mediaUrl: '/assets/aistudio/20261019_190436_2e5f4377.jpg',
    caption: 'Exploring every wonderland with wide open eyes, curious about lights, games, colors, and repeating every sweet Hindi word after Mumma and Papa.',
    traditionNote: 'Imbibing the Rajput values of bravery (निर्भयता) and keen observation from everyday surroundings.',
    familyNote: 'When you spot an arcade or colorful lights, you point your finger and say "dekho dekho!" with that priceless sparkle.',
    location: 'City Outing & Family Fun',
    tags: ['Sweet Words', 'Curiosity', 'Giggles']
  },
  {
    id: 'm-grace-in-kurti',
    title: 'Poise and Grace: Sitting Like a Rajput Princess',
    hindiTitle: 'संस्कार और गरिमा — पारंपरिक परिधान में नन्हीं वर्णिका',
    phase: 'Phase 6 · 22 Months',
    dateStr: 'October 2026',
    ageMonthStr: '23 Months',
    category: 'sanskars',
    mediaType: 'image',
    mediaUrl: '/assets/aistudio/20261019_154804_6d04dde2.jpg',
    caption: 'Sitting gently in white and embroidered festive wear, hands poised with serene dignity and a sweet, knowing smile that melts any heart.',
    traditionNote: 'Reflecting the quiet nobility, grace, and respectful manners that define the Sengar legacy.',
    familyNote: 'This photograph captured your soul — gentle, observant, intelligent, and infinitely loved by all.',
    location: 'Family Celebration',
    tags: ['Traditional Wear', 'Elegance', 'Mother Tongue']
  },
  {
    id: 'm-two-fingers-turning-2',
    title: 'Look World, I Am Turning Two! (दो साल की वर्णिका)',
    hindiTitle: 'देखो, मैं 2 साल की हो गई! विजय मुद्रा और असीम खुशियाँ',
    phase: 'Phase 7 · Grand 2nd Birthday',
    dateStr: 'October 27, 2026',
    ageMonthStr: '24 Months / Turning 2',
    category: 'firsts',
    mediaType: 'image',
    mediaUrl: '/assets/aistudio/IMG_20261019_165306_bab6a894.jpg',
    caption: 'Proudly showing two little fingers with both hands! "I am TWO years old now!" — our heart, our breath, our entire universe.',
    traditionNote: 'Two years of health, protection by Kuldevi, and blessings from all elders in Madhya Pradesh and beyond.',
    familyNote: 'You practiced making the "Two" sign with your little fingers all week, laughing out loud whenever anyone asked your age!',
    location: 'Sengar Family Homecoming',
    tags: ['Turning 2', 'Two Fingers', 'Birthday Milestone']
  },
  {
    id: 'm-laughing-freedom',
    title: 'Carefree Toddler Glee: The Sengar Sunshine',
    hindiTitle: 'हँसती-खिलखिलाती बिटिया — घर का उजाला',
    phase: 'Phase 7 · 2nd Birthday Special',
    dateStr: 'October 2026',
    ageMonthStr: '24 Months',
    category: 'play',
    mediaType: 'image',
    mediaUrl: '/assets/aistudio/20261019_154720_fcaf2a14.jpg',
    caption: 'Playfully holding up the number two again, eyes twinkling with pure mischief and happiness.',
    traditionNote: 'The joy of a daughter is said to be the greatest Lakshmi in a Hindu home.',
    familyNote: 'Her laughter is our daily medicine. May this smile never fade for all the years to come.',
    location: 'Madhya Pradesh',
    tags: ['Laughter', 'Turning 2', 'Pure Joy']
  }
];

export const INITIAL_FAMILY_WISHES: FamilyWish[] = [
  {
    id: 'w-papa-mumma',
    senderName: 'Rohit Papa & Mumma',
    relationship: 'Parents',
    relationRole: 'Papa & Mumma',
    blessingTag: 'कुलदीपिका',
    message: 'Our darling baby Varnika, watching you grow these past 730 days has been God’s greatest blessing to us. Your laughter fills our home with light, and your tiny hands hold our entire world. May you always walk with courage, kindness, and our Rajput dignity. We love you beyond words!',
    hindiMessage: 'मेरी प्यारी वर्णिका गुड़िया, तुम हमारे जीवन का सबसे बड़ा उपहार हो। तुम्हारा हर कदम हमारे घर में सुख-समृद्धि लाता है। सदा हँसती रहो, आगे बढ़ो और कुल का नाम रोशन करो।',
    date: 'October 27, 2026',
    flowerCount: 54
  },
  {
    id: 'w-dadu-dadi',
    senderName: 'Dadu & Dadi (Sengar Parivar)',
    relationship: 'Paternal Grandparents',
    relationRole: 'Dadu & Dadi · Madhya Pradesh',
    blessingTag: 'आयुष्मान भव',
    message: 'Happy 2nd Birthday to our little princess Varnika! You carry the brave spirit and sacred values of our Sengar Rajput clan. May Kuldevi Maa always protect you, bless you with radiant health, sharp wisdom, and a compassionate heart. All our blessings are with you forever.',
    hindiMessage: 'हमारी कुल की शान, लाडली वर्णिका को दूसरे जन्मदिन पर दादा-दादी का अनंत स्नेह और आशीर्वाद। कुलदेवी माँ सदा तुम्हारी रक्षा करें और तुम्हें दीर्घायु, सुखी जीवन प्रदान करें।',
    date: 'October 27, 2026',
    flowerCount: 48
  },
  {
    id: 'w-nana-nani',
    senderName: 'Nana & Nani Ji',
    relationship: 'Maternal Grandparents',
    relationRole: 'Nana & Nani',
    blessingTag: 'दीर्घायु भव',
    message: 'To our dearest angel Varnika, seeing your two sweet fingers sign "I am 2" brought tears of happiness to our eyes. May Saraswati Devi bless your intellect and Lakshmi Devi fill your life with abundance. Stay as sweet and playful as you are!',
    hindiMessage: 'नाना-नानी की आँखों का तारा वर्णिका बिटिया। तुम सदा फूलों की तरह महकती रहो और अपने माता-पिता का नाम गर्व से ऊँचा करो। बहुत सारा प्यार!',
    date: 'October 27, 2026',
    flowerCount: 42
  },
  {
    id: 'w-bua-fufa',
    senderName: 'Bua & Fufa Ji',
    relationship: 'Aunt & Uncle',
    relationRole: 'Bua & Fufa Ji',
    blessingTag: 'सदा मुसकाओ',
    message: 'Happy 2nd Birthday to the sweetest niece ever! Your little dance steps in festive lehengas and that sparkling glance make you the heart of every family gathering. Sending you endless chocolates, toys, and royal blessings!',
    hindiMessage: 'बुआ की जान वर्णिका को जन्मदिन की ढेरों शुभकामनाएँ! तुम्हारी चहक से पूरा परिवार खिल उठता है।',
    date: 'October 27, 2026',
    flowerCount: 36
  },
  {
    id: 'w-chacha-chachi',
    senderName: 'Chacha & Chachi Ji',
    relationship: 'Uncle & Aunt',
    relationRole: 'Chacha & Chachi',
    blessingTag: 'विजयी भव',
    message: 'Turning 2 is a big milestone! Watching you sprint across the room and wave with that charming smile is the highlight of every visit. Stay fearless, stay joyful, and keep being Papa and Mumma’s superstar.',
    hindiMessage: 'चाचा-चाची की तरफ से ढेर सारा प्यार और दुआएं। हमारी नन्हीं परी हमेशा खुश रहे और खूब तरक्की करे।',
    date: 'October 27, 2026',
    flowerCount: 31
  }
];

export const INITIAL_TIME_CAPSULE_LETTERS: TimeCapsuleLetter[] = [
  {
    id: 'tc-age-3',
    unlockYear: 2027,
    targetAge: 3,
    title: 'To Varnika at Age 3: The World of Wonder & Words',
    subtitle: 'Scheduled Unlock: October 27, 2027',
    theme: 'Curiosity & Play',
    rajputValue: 'विद्या व नम्रता (Knowledge & Humility)',
    sender: 'Papa & Mumma',
    summary: 'A letter about your first questions, the way you mimic Dadu’s spectacles, and your fascination with the moon (Chanda Mama).',
    fullLetter: `Dearest Varnika,\n\nWhen you read this at age three, you will probably be running around the house asking a thousand "why" questions every minute. Today, on your 2nd birthday, you proudly hold up two fingers and giggle when we call you "Miss Two".\n\nAlways keep this boundless curiosity alive. In our Sengar tradition, learning and respect for knowledge (विद्या) is the greatest treasure. When you pick up your first crayons and storybooks, remember that your imagination can take you anywhere.\n\nWe love you more than all the stars in the night sky.\n\n— Papa Rohit & Mumma (Written Oct 27, 2026)`
  },
  {
    id: 'tc-age-4',
    unlockYear: 2028,
    targetAge: 4,
    title: 'To Varnika at Age 4: Stories of Rajput Courage & Roots',
    subtitle: 'Scheduled Unlock: October 27, 2028',
    theme: 'Heritage & Brave Heart',
    rajputValue: 'शौर्य व सत्य (Valor & Truth)',
    sender: 'Papa Rohit',
    summary: 'A letter recounting the proud legacy of the Sengar clan in Madhya Pradesh, and the courage that runs in your blood.',
    fullLetter: `My dearest daughter Varnika,\n\nAt four years old, you are stepping into a bigger world. You belong to the proud Sengar Rajput lineage that has lived in the heart of Madhya Pradesh for generations. Being a Rajput daughter doesn’t just mean courage in words — it means standing up for truth (सत्य), being gentle to the weak, and facing challenges with an unbroken smile.\n\nWhenever you feel nervous or small, put your hand on your heart and remember who you are. You carry the grace of your mother and the resilience of generations before you.\n\nWalk tall, my little princess.\n\n— With endless love, Papa`
  },
  {
    id: 'tc-age-5',
    unlockYear: 2029,
    targetAge: 5,
    title: 'To Varnika at Age 5: The Magic of Festivals & Kanya Blessings',
    subtitle: 'Scheduled Unlock: October 27, 2029',
    theme: 'Traditions & Compassion',
    rajputValue: 'करुणा व संस्कार (Compassion & Noble Character)',
    sender: 'Mumma',
    summary: 'A heartwarming note on how sacred you are to us, our traditions of Navratri Kanya Pujan, and keeping an open heart.',
    fullLetter: `My precious angel Varnika,\n\nAt five years old, you might be helping me place the fresh marigold torans on Diwali, or picking flowers for the morning puja. Ever since you were born, during every Navratri, the entire family touches your feet because you are our living Devi.\n\nNever forget the power of kindness. A gentle word heals, a shared smile brightens a dark room. Stay humble, love your family, and celebrate every Indian festival with the same sparkle that shines in your eyes right now.\n\nForever your shelter,\n\n— Mumma`
  },
  {
    id: 'tc-age-6',
    unlockYear: 2030,
    targetAge: 6,
    title: 'To Varnika at Age 6: Dreams, Friendships & Integrity',
    subtitle: 'Scheduled Unlock: October 27, 2030',
    theme: 'Integrity & Friendship',
    rajputValue: 'मर्यादा व निष्ठा (Dignity & Loyalty)',
    sender: 'Dadu & Dadi (Sengar Family)',
    summary: 'Timeless grandfatherly wisdom from the ancestral home in MP about loyalty, friendship, and self-belief.',
    fullLetter: `Our dearest Granddaughter Varnika,\n\nBy six years old, you will have made your first school friends and discovered your favorite subjects. Always be the friend who stands by others when they are alone. In life, your character (चरित्र) and dignity (मर्यादा) are your greatest ornaments.\n\nEven when we grow older and our hair turns white, our blessings will surround you like a shield. May Kuldevi Maa illuminate your path every day.\n\n— With unconditional blessings, Dadu & Dadi`
  },
  {
    id: 'tc-age-7',
    unlockYear: 2031,
    targetAge: 7,
    title: 'To Varnika at Age 7: Five Years of This Keepsake',
    subtitle: 'Scheduled Unlock: October 27, 2031 (5-Year Milestone)',
    theme: 'The Living Heirloom',
    rajputValue: 'कुलदीपक (The Guiding Light)',
    sender: 'The Entire Sengar Parivar',
    summary: 'The grand five-year milestone letter reviewing her journey from a 2-year-old toddler to a bright, independent young girl.',
    fullLetter: `Beloved Varnika,\n\nFive years have passed since we created this digital keepsake on your 2nd birthday on October 27, 2026. Look at the photographs in this app — look at your tiny hands holding up two fingers, your laughter on the white seat, your mother’s loving embrace, and the smiles of everyone who prayed for you.\n\nToday, as a seven-year-old young lady, know that every single day you have brought pride, laughter, and honor to the Sengar family. Whatever dreams you chase — whether in science, arts, leadership, or public service — know that your family stands behind you with unwavering faith.\n\nYou are, and will always be, the heartbeat of the Sengar family.\n\n— With all our souls, Your Entire Sengar Parivar`
  }
];

export const TRADITIONAL_FESTIVALS_INFO = [
  {
    name: 'Navratri & Kanya Pujan',
    hindi: 'कन्या पूजन व नवरात्रि',
    motif: 'कलश व त्रिशूल',
    significance: 'In Rajput and Indian Hindu tradition, young daughters are revered as the living swaroop of Maa Durga. During Ashtami and Navami, baby Varnika’s feet are washed with milk and blessed with floral offerings.',
    icon: 'Sparkles'
  },
  {
    name: 'Diwali & Deepotsav',
    hindi: 'दीपावली दीपोत्सव',
    motif: 'दीपक व लक्ष्मी कृपा',
    significance: 'The triumph of light over darkness. Hand-poured earthen diyas illuminate the Sengar household in Madhya Pradesh, welcoming Lakshmi and praying for Varnika’s long life and radiance.',
    icon: 'Flame'
  },
  {
    name: 'Holi Phoolon Ki & Rangotsav',
    hindi: 'फूलों की होली व रंगोत्सव',
    motif: 'गुलाल व पुष्प',
    significance: 'Her first Holi was celebrated with fragrant rose petals, marigolds, and herbal chandan-gulal, showering her with the colors of health, joy, and innocent laughter.',
    icon: 'Sun'
  },
  {
    name: 'Janmashtami & Raksha Bandhan',
    hindi: 'जन्माष्टमी व रक्षाबंधन',
    motif: 'मोरपंख व राखी',
    significance: 'Dressing little Varnika in festive lehengas with peacock feather charms and celebrating the timeless sacred bond of siblings and family unity.',
    icon: 'Heart'
  },
  {
    name: 'Kuldevi Maa Ashirwad & Mundan',
    hindi: 'कुलदेवी माँ का आशीर्वाद',
    motif: 'सिंदूर व मंगलसूत्र',
    significance: 'The ancient Rajput custom of seeking the supreme protection of the Sengar Kuldevi, ensuring strength, fearlessness (शौर्य), and spiritual protection throughout her life.',
    icon: 'Shield'
  }
];
