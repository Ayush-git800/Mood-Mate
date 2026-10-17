/**
 * Seed data for MoodMate - Everyday Happiness & Mental Reset Hub
 * Clean initial state, 8 tactile moods, happiness packs, tasks, and Lumi AI intents.
 */

export const MOODS = [
  {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    valence: 8,
    color: '#E9B949',
    bgColorLight: 'bg-amber-50/70',
    borderColor: 'border-amber-300',
    tintClass: 'from-amber-100/40 via-sand-100 to-emerald-50/30',
    darkTintClass: 'dark:from-amber-950/20 dark:via-darkbg-base dark:to-emerald-950/20',
    validationMessage: "Your joy is a bright warmth. Soak in this moment—it’s yours to keep and share."
  },
  {
    id: 'excited',
    label: 'Excited',
    emoji: '🤩',
    valence: 7,
    color: '#F59E0B',
    bgColorLight: 'bg-orange-50/70',
    borderColor: 'border-orange-300',
    tintClass: 'from-orange-100/40 via-sand-100 to-amber-50/30',
    darkTintClass: 'dark:from-orange-950/20 dark:via-darkbg-base dark:to-stone-900/30',
    validationMessage: "That spark in you is electric! Channel this vibrant energy into whatever makes you feel alive."
  },
  {
    id: 'bored',
    label: 'Bored',
    emoji: '😐',
    valence: 5,
    color: '#94A3B8',
    bgColorLight: 'bg-slate-50/70',
    borderColor: 'border-slate-300',
    tintClass: 'from-slate-100/40 via-sand-100 to-stone-100/30',
    darkTintClass: 'dark:from-slate-900/30 dark:via-darkbg-base dark:to-stone-900/20',
    validationMessage: "Boredom is just your brain resting in neutral. It's often the quiet courtyard before fresh creativity strikes."
  },
  {
    id: 'tired',
    label: 'Tired',
    emoji: '😴',
    valence: 4,
    color: '#818CF8',
    bgColorLight: 'bg-indigo-50/70',
    borderColor: 'border-indigo-300',
    tintClass: 'from-indigo-100/40 via-sand-100 to-blue-50/30',
    darkTintClass: 'dark:from-indigo-950/20 dark:via-darkbg-base dark:to-darkbg-base',
    validationMessage: "It is completely okay to feel exhausted. Your worth is not measured by relentless output. Give yourself permission to pause."
  },
  {
    id: 'anxious',
    label: 'Anxious',
    emoji: '😟',
    valence: 3,
    color: '#38BDF8',
    bgColorLight: 'bg-sky-50/70',
    borderColor: 'border-sky-300',
    tintClass: 'from-sky-100/40 via-sand-100 to-teal-50/30',
    darkTintClass: 'dark:from-sky-950/20 dark:via-darkbg-base dark:to-teal-950/20',
    validationMessage: "Your mind is trying to protect you by racing ahead, but right here in this room, you are physically safe. One slow breath at a time."
  },
  {
    id: 'stressed',
    label: 'Stressed',
    emoji: '😰',
    valence: 3,
    color: '#D97757',
    bgColorLight: 'bg-terracotta-50/70',
    borderColor: 'border-terracotta-300',
    tintClass: 'from-terracotta-100/40 via-sand-100 to-rose-50/30',
    darkTintClass: 'dark:from-terracotta-950/25 dark:via-darkbg-base dark:to-darkbg-base',
    validationMessage: "Heavy shoulders, tight chest? You are carrying a lot today. Let's put down the invisible luggage for just three minutes."
  },
  {
    id: 'sad',
    label: 'Sad',
    emoji: '😢',
    valence: 2,
    color: '#6BA4B8',
    bgColorLight: 'bg-cyan-50/70',
    borderColor: 'border-cyan-300',
    tintClass: 'from-cyan-100/40 via-sand-100 to-blue-50/30',
    darkTintClass: 'dark:from-cyan-950/20 dark:via-darkbg-base dark:to-darkbg-base',
    validationMessage: "Tears and sadness are proof that you care deeply about something. Be gentle with your heart today—it is healing in quiet ways."
  },
  {
    id: 'angry',
    label: 'Angry',
    emoji: '😠',
    valence: 1,
    color: '#F43F5E',
    bgColorLight: 'bg-rose-50/70',
    borderColor: 'border-rose-300',
    tintClass: 'from-rose-100/40 via-sand-100 to-amber-50/30',
    darkTintClass: 'dark:from-rose-950/25 dark:via-darkbg-base dark:to-darkbg-base',
    validationMessage: "Anger is an alarm bell indicating a boundary was crossed or an injustice felt. You don't have to suppress it, but you don't have to let it burn you either."
  }
];

export const HAPPINESS_PACKS = {
  happy: {
    jokes: [
      "Why don't scientists trust atoms? Because they make up everything—just like my excuses for kitchen dancing!",
      "What do you call a factory that makes okay products? A satisfactory.",
      "Why did the sun go to school? To get a little brighter!",
      "I told my suitcase there will be no vacation this year. Now I'm dealing with emotional baggage."
    ],
    quotes: [
      "Joy is not in things; it is in us. — Richard Wagner",
      "Let your joy be in your journey, not in some distant goal. — Tim Cook",
      "There are shortcuts to happiness, and dancing is one of them. — Vicki Baum",
      "Happiness is a warm cup of tea and a cleared mental desk."
    ],
    challenges: [
      "Send a 1-sentence gratitude text to someone who made you smile recently.",
      "Close your eyes for 20 seconds and memorize what happiness feels like in your chest.",
      "Take 30 seconds to dance or sway to the rhythm of the room."
    ]
  },
  excited: {
    jokes: [
      "Why did the coffee file a police report? It got mugged, but it's totally pumped about espresso!",
      "What’s an astronaut’s favorite key on the keyboard? The space bar, obviously!",
      "How do you organize a space party? You planet!"
    ],
    quotes: [
      "Energy flows where attention goes. Harness this spark. — Tony Robbins",
      "Enthusiasm is the electricity of life. — Gordon Parks",
      "Nothing great was ever achieved without enthusiasm. — Ralph Waldo Emerson"
    ],
    challenges: [
      "Jot down your #1 most ambitious idea right now before the spark fades.",
      "Do 10 high-energy jumping jacks to celebrate your momentum.",
      "Write down the immediate next physical micro-step to start your project."
    ]
  },
  bored: {
    jokes: [
      "I asked the librarian if the library had books on paranoia. She whispered, 'They’re right behind you!'",
      "What do you call cheese that isn’t yours? Nacho cheese!",
      "What's brown and sticky? A stick!"
    ],
    quotes: [
      "Boredom is the dream bird that hatches the egg of experience. — Walter Benjamin",
      "Boredom always precedes a period of great creativity. — Robert M. Pirsig",
      "Look at ordinary things with extraordinary eyes."
    ],
    challenges: [
      "Find an object in your room and inspect its texture for 30 seconds.",
      "Doodle an imaginary creature using only straight lines.",
      "Rearrange 3 items on your desk into a neat micro-sculpture."
    ]
  },
  tired: {
    jokes: [
      "I'm not saying I'm tired, but my coffee just made itself another coffee.",
      "My bed and I have a special relationship. The alarm clock is just jealous.",
      "I finally got eight hours of sleep. It took me four days, but I did it!"
    ],
    quotes: [
      "Rest is an essential requirement for existing. — Tricia Hersey",
      "Almost everything will work again if you unplug it for a few minutes, including you. — Anne Lamott",
      "Fatigue makes cowards of us all. Rest restores your natural bravery."
    ],
    challenges: [
      "Palming: Rub your hands together till warm, cup them gently over your eyes for 30 seconds.",
      "The Unclench: Drop shoulders down 2 inches, unglue tongue, release jaw.",
      "Drink a slow glass of cool water, noticing the sensation in your throat."
    ]
  },
  anxious: {
    jokes: [
      "My anxiety is like a smoke alarm that goes off when someone makes toast in another county.",
      "I overthink so much that my brain is asking for overtime pay.",
      "What did the nervous cucumber turn into? A pickle in a jam!"
    ],
    quotes: [
      "You don’t have to control your thoughts. Just stop letting them control you. — Dan Millman",
      "Feel the ground beneath your feet. It is solid, steady, and holding you up.",
      "This moment does not demand perfection. It only asks for your presence."
    ],
    challenges: [
      "5-4-3-2-1 Sensory Reset: Spot 5 colors, touch 4 textures, listen for 3 sounds.",
      "Press both feet firmly into the floor and feel the counter-pressure.",
      "Inhale for 4 seconds, exhale like a slow sigh for 6 seconds."
    ]
  },
  stressed: {
    jokes: [
      "I’m not stressed, I’m just spiritually vibrating at a very loud frequency.",
      "My stress-relief plan: I ate an entire carrot. My teeth are tired, but I feel virtuous.",
      "I have a degree in making 5-minute tasks take 4 hours of anticipatory dread."
    ],
    quotes: [
      "It’s not stress that kills us, it is our reaction to it. — Hans Selye",
      "You don't have to carry every brick to build your life. Some can stay on the ground.",
      "Within you, there is a stillness to which you can retreat at any time. — Hermann Hesse"
    ],
    challenges: [
      "Roll your shoulders backward 5 times, then forward 5 times, then drop heavily.",
      "Physical Declutter: Clear just one arm's length of surface on your desk.",
      "Look at the furthest object on your horizon for 20 continuous seconds."
    ]
  },
  sad: {
    jokes: [
      "What do you call a sad strawberry? A blue-berry having an identity crisis.",
      "I told my dog about my bad day. He licked my elbow, which resolved 40% of the issue.",
      "If you're feeling down, remember: even the moon goes through phases before shining full again."
    ],
    quotes: [
      "There is a crack in everything, that’s how the light gets in. — Leonard Cohen",
      "Healing is not linear. Be as patient with yourself as you would be with a hurt child.",
      "Your heart is resilient; it knows how to mend in the quiet hours."
    ],
    challenges: [
      "Butterfly Hug: Cross arms over chest and alternate gentle taps on your shoulders.",
      "Wrap your hands around a warm mug or wrap a soft blanket around your shoulders.",
      "Allow the Pause: Lie down flat for 60 seconds with zero demands of yourself."
    ]
  },
  angry: {
    jokes: [
      "Why did the teapot whistle? It was boiling mad, but at least it made tea for everyone!",
      "I’m trying to avoid confrontation, which is why I’m currently glaring at a potted plant.",
      "Why was the belt arrested? For holding up pants against their will!"
    ],
    quotes: [
      "Between stimulus and response there is a space. In that space is our power to choose. — Viktor Frankl",
      "Speak when you are angry and you will make the best speech you will ever regret.",
      "The storm passes faster when you don't fight the rain."
    ],
    challenges: [
      "Clench your fists as tight as possible for 5 seconds, then release with a long exhale.",
      "Walk briskly back and forth for 30 seconds to burn off excess adrenaline.",
      "Ask yourself: 'Will this matter 6 months from today?'"
    ]
  }
};

/**
 * 3 Actionable Micro-Tasks per Mood (Award +15 Growth Coins 🟣)
 */
export const MOOD_TASKS = {
  happy: [
    { id: 'h-1', title: 'Send a spontaneous thank you text', hint: 'Message a friend or family member who brought you joy.' },
    { id: 'h-2', title: 'Capture the feeling', hint: 'Close your eyes for 20 seconds and memorize this sensation in your chest.' },
    { id: 'h-3', title: 'Write down 3 tiny ordinary wins', hint: 'Log 3 small mundane things that went surprisingly right today.' }
  ],
  excited: [
    { id: 'e-1', title: 'Jot down the big idea before it fades', hint: 'Capture your breakthrough thought in your journal notes.' },
    { id: 'e-2', title: '10 celebratory jumping jacks', hint: 'Channel that physical kinetic surge into movement.' },
    { id: 'e-3', title: 'Define your next single micro-step', hint: 'Turn excitement into traction with ONE 5-minute action.' }
  ],
  bored: [
    { id: 'b-1', title: 'Texture curiosity scan', hint: 'Find an everyday object nearby and inspect its physical grain for 30s.' },
    { id: 'b-2', title: 'Desk micro-curation', hint: 'Rearrange 3 items on your table into a pleasing geometric setup.' },
    { id: 'b-3', title: 'Doodle with only straight lines', hint: 'Grab scrap paper and draw an abstract creature without curves.' }
  ],
  tired: [
    { id: 't-1', title: '5-minute screen blackout', hint: 'Turn off your monitor or look out the window into the distant horizon.' },
    { id: 't-2', title: 'Hydrate with cool water', hint: 'Drink a slow full glass of water and notice the coolness in your throat.' },
    { id: 't-3', title: 'The 3-point unclench', hint: 'Drop shoulders down 2 inches, unglue tongue, release clenched jaw.' }
  ],
  anxious: [
    { id: 'a-1', title: '5-4-3-2-1 Somatic touch', hint: 'Touch 4 physical surfaces around you (wood, cloth, metal, cool glass).' },
    { id: 'a-2', title: 'Plant your feet firmly', hint: 'Press both soles into the ground and feel the solid floor holding you.' },
    { id: 'a-3', title: 'Externalize the looping thought', hint: 'Write down the worry on paper, circle it, and fold it away.' }
  ],
  stressed: [
    { id: 's-1', title: '2-minute shoulder & neck roll', hint: 'Roll shoulders backward 5 times, forward 5 times, then drop heavily.' },
    { id: 's-2', title: 'Clear 1 arm-length of clutter', hint: 'Tuck away papers or cups within direct sightline.' },
    { id: 's-3', title: 'Audible sigh of relief', hint: 'Inhale deeply through nose, exhale loudly: "Haaaaah".' }
  ],
  sad: [
    { id: 'sd-1', title: 'Butterfly hug tap', hint: 'Cross arms over chest, alternate tapping left and right shoulders slowly.' },
    { id: 'sd-2', title: 'Wrap up in warm warmth', hint: 'Wrap a blanket tightly or cup your hands around a warm ceramic mug.' },
    { id: 'sd-3', title: 'Send a virtual hug on Kindness Wall', hint: 'Sharing warmth with a peer is scientifically proven to comfort yourself.' }
  ],
  angry: [
    { id: 'ag-1', title: 'Progressive fist squeeze & release', hint: 'Clench both fists at 100% force for 5s, then release completely with exhale.' },
    { id: 'ag-2', title: 'Pacing corridor walk', hint: 'Walk briskly back and forth for 60 seconds to metabolize cortisol spikes.' },
    { id: 'ag-3', title: 'The 6-month question', hint: 'Ask: "Will this event determine my well-being 6 months from now?"' }
  ]
};

/**
 * 2-3 Curated YouTube Song / Soundscape Cards per Mood
 * Opens safely in new tab: target="_blank" rel="noopener noreferrer"
 */
export const MOOD_MUSIC = {
  happy: [
    { id: 'm-h1', title: 'Sunny Lofi Cafe Beats', genre: 'Uplifting Lofi', duration: 'Live Stream', youtubeId: 'jfKfPfyJRdk' },
    { id: 'm-h2', title: 'Morning Forest Birds & Sunlight', genre: 'Acoustic Ambient', duration: '3 hr', youtubeId: 'eKFTSSKCzWA' }
  ],
  excited: [
    { id: 'm-e1', title: 'Synthwave Momentum Sprint', genre: 'Dynamic Flow', duration: 'Live Stream', youtubeId: '4xDzrJKXOOY' },
    { id: 'm-e2', title: 'Indie Folk Joy & Travel', genre: 'Acoustic Indie', duration: '1 hr', youtubeId: '7NOSDKb0HlU' }
  ],
  bored: [
    { id: 'm-b1', title: 'Deep Creative Flow State 432Hz', genre: 'Ambient Drone', duration: '2 hr', youtubeId: 'WPni755-Krg' },
    { id: 'm-b2', title: 'Japanese Garden Wind Chimes', genre: 'Organic World', duration: '1 hr', youtubeId: 'tNkZsRW7h2c' }
  ],
  tired: [
    { id: 'm-t1', title: 'Weightless Deep Rest & Sleep', genre: 'Delta Wave 0.5Hz', duration: '8 hr', youtubeId: 'UfcAVejslrU' },
    { id: 'm-t2', title: 'Soft Midnight Rain on Glass', genre: 'Rain White Noise', duration: '3 hr', youtubeId: 'mPZkdNFkNps' }
  ],
  anxious: [
    { id: 'm-a1', title: 'Vagus Nerve Reset 528Hz Miracle Tone', genre: 'Healing Solfeggio', duration: '2 hr', youtubeId: '1ZYbU82GVz4' },
    { id: 'm-a2', title: 'Warm Hearth & Acoustic Guitar', genre: 'Fingerstyle Acoustic', duration: '1.5 hr', youtubeId: 'NEZl4Z84wuo' }
  ],
  stressed: [
    { id: 'm-s1', title: 'Soft Piano For Overthinking Brains', genre: 'Neoclassical Piano', duration: '2.5 hr', youtubeId: 'pUZa3P4aNyo' },
    { id: 'm-s2', title: 'Distant Mountain Thunder & Rain', genre: 'Deep Nature', duration: '4 hr', youtubeId: 'q76bMs-NwRk' }
  ],
  sad: [
    { id: 'm-sd1', title: 'Gentle Music for Wounded Hearts', genre: 'Melancholic Comfort', duration: '2 hr', youtubeId: '2OEL4P1Rz04' },
    { id: 'm-sd2', title: 'Cello & Gentle Ocean Tides', genre: 'Somatic Strings', duration: '1.5 hr', youtubeId: 'bn9F19Hi1Lk' }
  ],
  angry: [
    { id: 'm-ag1', title: 'Tibetan Bowls for Disarming Fury', genre: 'Singing Bowls', duration: '1 hr', youtubeId: 'RmaP3v7D-tM' },
    { id: 'm-ag2', title: 'Deep Earth Low Rumble & Rain', genre: 'Earth Frequency', duration: '2 hr', youtubeId: 'W_vM8GqD_58' }
  ]
};

/**
 * 6 Friendly Illustrated Avatars for Signup
 */
export const FRIENDLY_AVATARS = [
  { id: 'sprout', emoji: '🌱', label: 'Gentle Sprout', desc: 'Growing at my own steady pace' },
  { id: 'fox', emoji: '🦊', label: 'Curious Fox', desc: 'Observant, playful, and resilient' },
  { id: 'lotus', emoji: '🌸', label: 'Calm Lotus', desc: 'Finding peace amidst muddy waters' },
  { id: 'star', emoji: '✨', label: 'Cosmic Starlight', desc: 'Sparking joy and creative energy' },
  { id: 'owl', emoji: '🦉', label: 'Wise Owl', desc: 'Thoughtful, grounded, and deep' },
  { id: 'sun', emoji: '☀️', label: 'Warm Sunrise', desc: 'Radiating warmth and optimism' }
];

/**
 * Multi-Branch Intent-Based Intelligence for Lumi AI 🌿
 * Rotating responses per topic to guarantee non-repetitive conversations.
 */
export const LUMI_INTENTS = {
  academic_stress: {
    keywords: ['exam', 'viva', 'test', 'quiz', 'gpa', 'study', 'marks', 'assignment', 'grade', 'midterm', 'finals', 'syllabus', 'fail'],
    responses: [
      (name) => `I completely understand that academic weight, ${name}. Exams and vivas evaluate specific recall under time pressure—they never define your intellectual curiosity, human kindness, or future. Let's take one steady breath. Can you step away from the textbook for 5 minutes and drink a glass of water?`,
      (name) => `That exam pressure can feel suffocating, ${name}. When the syllabus seems infinite, our instinct is to panic. But your brain digests information in small, spaced intervals. Pick just ONE single concept to review for 20 minutes, then give yourself an intentional break. You are capable of steady progress.`,
      (name) => `Viva and exam nerves are high adrenaline, ${name}. Your body is trying to protect you. Try this physical grounding: press your toes firmly into the floor, drop your shoulders 2 inches, and remind yourself: "I have prepared, and I only have to answer one question at a time." I am cheering for you.`
    ]
  },
  loneliness_hostel: {
    keywords: ['lonely', 'hostel', 'dorm', 'alone', 'no friends', 'homesick', 'miss home', 'isolated', 'nobody to talk to', 'by myself'],
    responses: [
      (name) => `Hostel and dorm rooms can feel strangely silent, ${name}. Even with hundreds of students next door, feeling homesick or isolated is so common. It is a sign of how deeply you treasure your roots. Can you call a loved one for just 3 minutes, or make a warm cup of tea? Small touches tether us back.`,
      (name) => `I hear you, ${name}. Loneliness is one of the heaviest quiet aches. Please know that having a slow social season doesn't mean you won't find your kindred people. Drop an encouraging sticky note on our Community Kindness Wall—warming someone else often warms our own hands too.`,
      (name) => `Living away from home is an intense adjustment, ${name}. You are building an entirely new foundation from scratch. Be gentle with yourself tonight. Put on your favorite comfort playlist from our sound sanctuary and let yourself rest without guilt.`
    ]
  },
  panic_anxiety: {
    keywords: ['panic', 'anxious', 'anxiety', 'ground', 'overwhelmed', 'shaking', 'racing heart', 'cant breathe', 'hyperventilating'],
    isGroundingTrigger: true,
    responses: [
      (name) => `I am right here with you, ${name}. Place both feet flat on the floor and feel the ground holding you effortlessly. Let's do the step-by-step 5-4-3-2-1 sensory grounding exercise together. Look right below this message to start step 1:`,
      (name) => `Breathe with me, ${name}. Your nervous system is sounding an alarm, but right now in this physical space, you are completely safe. Let's bring your focus out of your racing thoughts and into your physical senses with our 5-4-3-2-1 grounding below:`
    ]
  },
  exhaustion_burnout: {
    keywords: ['tired', 'burnout', 'exhausted', 'cant sleep', 'insomnia', 'drained', 'no energy', 'sleep deprived', 'heavy', 'numb'],
    responses: [
      (name) => `When your battery hits single digits, ${name}, doing even basic tasks feels like climbing Everest. That is not weakness—it is your physical circuit breaker asking for maintenance. Rest is not something you 'earn' after you collapse; it is an essential human right. What can you take off your plate tonight?`,
      (name) => `I hear how depleted you are, ${name}. Tossing and turning or feeling 'tired but wired' is your nervous system's way of processing unspent cortisol. Step away from blue light for 15 minutes, do 3 slow shoulder rolls, and give yourself permission to do absolutely nothing.`,
      (name) => `You have been carrying lead luggage for too long, ${name}. You don't have to be a superhero every single day. Allow yourself to have a low-output evening. Put on our Delta Sleep soundscape and just rest your eyes.`
    ]
  },
  celebration_happiness: {
    keywords: ['happy', 'excited', 'celebrate', 'passed', 'good news', 'small win', 'did it', 'proud', 'yay', 'awesome', 'great day'],
    responses: [
      (name) => `YES! 🎉 I am smiling ear to ear with you, ${name}! We spend so much energy worrying about what could go wrong; pause right now and savor what went wonderfully right! How are you going to treat yourself today?`,
      (name) => `That bright spark in your voice is contagious, ${name}! Celebrate this moment—bookmark this feeling in your memory so you remember what joy feels like. You put in the energy, and it paid off!`,
      (name) => `What an uplifting milestone, ${name}! Soak in every single drop of this win. You deserve this happiness. Thank you for sharing this beautiful energy with me in our sanctuary!`
    ]
  },
  general_venting: {
    keywords: ['vent', 'frustrated', 'annoyed', 'confused', 'dont know', 'thoughts', 'why', 'honestly', 'life'],
    responses: [
      (name) => `I am here to listen with zero judgment, ${name}. Putting honest thoughts into words is the first step toward clearing mental clutter. Speak as freely or messily as you need—I've got your back.`,
      (name) => `Thank you for sharing your unfiltered thoughts with me, ${name}. It takes courage to be authentic about how messy life feels sometimes. What is the single biggest thing pulling on your attention right now?`,
      (name) => `I hear you loud and clear, ${name}. You don't have to have everything figured out today. If you could give yourself just 5% more breathing room in this next hour, what would that look like?`
    ]
  }
};

/**
 * Pre-seeded 14-day history for the DEMO loader (Judging Profile only)
 * Fresh user accounts start with history = []
 */
export const SEED_HISTORY = [
  { id: 's-1', date: '2026-10-04', dayName: 'Sun', mood: 'calm', valence: 6, emoji: '🌿', note: 'Quiet morning reading by the window.', coinsEarned: { calm: 10, happy: 0, growth: 0 }, timestamp: 1791100800000 },
  { id: 's-2', date: '2026-10-05', dayName: 'Mon', mood: 'stressed', valence: 3, emoji: '😰', note: 'Semester projects kickoff. Overwhelmed.', coinsEarned: { calm: 10, happy: 0, growth: 20 }, timestamp: 1791187200000 },
  { id: 's-3', date: '2026-10-06', dayName: 'Tue', mood: 'tired', valence: 4, emoji: '😴', note: 'Late night study group in hostel.', coinsEarned: { calm: 10, happy: 0, growth: 20 }, timestamp: 1791273600000 },
  { id: 's-4', date: '2026-10-07', dayName: 'Wed', mood: 'anxious', valence: 3, emoji: '😟', note: 'Midterm presentation prep.', coinsEarned: { calm: 20, happy: 0, growth: 0 }, timestamp: 1791360000000 },
  { id: 's-5', date: '2026-10-08', dayName: 'Thu', mood: 'happy', valence: 7, emoji: '😊', note: 'Presentation went great! Matcha with friends.', coinsEarned: { calm: 10, happy: 15, growth: 0 }, timestamp: 1791446400000 },
  { id: 's-6', date: '2026-10-09', dayName: 'Fri', mood: 'excited', valence: 8, emoji: '🤩', note: 'Weekend hackathon kickoff with club.', coinsEarned: { calm: 10, happy: 15, growth: 20 }, timestamp: 1791532800000 },
  { id: 's-7', date: '2026-10-10', dayName: 'Sat', mood: 'happy', valence: 8, emoji: '😊', note: 'Sunshine hike and fresh autumn breeze.', coinsEarned: { calm: 10, happy: 15, growth: 0 }, timestamp: 1791619200000 },
  { id: 's-8', date: '2026-10-11', dayName: 'Sun', mood: 'bored', valence: 5, emoji: '😐', note: 'Quiet afternoon desk cleanup.', coinsEarned: { calm: 10, happy: 0, growth: 20 }, timestamp: 1791705600000 },
  { id: 's-9', date: '2026-10-12', dayName: 'Mon', mood: 'stressed', valence: 3, emoji: '😰', note: 'Pop quiz in morning lab.', coinsEarned: { calm: 10, happy: 0, growth: 0 }, timestamp: 1791792000000 },
  { id: 's-10', date: '2026-10-13', dayName: 'Tue', mood: 'sad', valence: 2, emoji: '😢', note: 'Homesick in evening. Listened to piano.', coinsEarned: { calm: 10, happy: 0, growth: 20 }, timestamp: 1791878400000 },
  { id: 's-11', date: '2026-10-14', dayName: 'Wed', mood: 'anxious', valence: 4, emoji: '😟', note: 'Grounded with Lumi AI 5-4-3-2-1 steps.', coinsEarned: { calm: 20, happy: 0, growth: 0 }, timestamp: 1791964800000 },
  { id: 's-12', date: '2026-10-15', dayName: 'Thu', mood: 'happy', valence: 7, emoji: '😊', note: 'Shared notes with classmates on the lawn.', coinsEarned: { calm: 10, happy: 15, growth: 0 }, timestamp: 1792051200000 },
  { id: 's-13', date: '2026-10-16', dayName: 'Fri', mood: 'excited', valence: 8, emoji: '🤩', note: 'MoodMate sprint demo rehearsal!', coinsEarned: { calm: 10, happy: 15, growth: 20 }, timestamp: 1792137600000 },
  { id: 's-14', date: '2026-10-17', dayName: 'Sat', mood: 'happy', valence: 8, emoji: '😊', note: 'Demo day! Human happiness and connection.', coinsEarned: { calm: 10, happy: 15, growth: 0 }, timestamp: 1792224000000 }
];

export const SEED_KINDNESS_NOTES = [
  { id: 'note-1', author: 'Elena R. (Design Student)', avatar: '🌸', color: 'bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100', message: "Whoever is studying late at the library tonight: drop your shoulders down, drink water, and sleep when you need to. You're brilliant.", hugs: 42, tag: 'Encouragement', timestamp: '2 hours ago' },
  { id: 'note-2', author: 'Samir K.', avatar: '🌱', color: 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100', message: "Today was the first day in 3 weeks I didn't wake up feeling overwhelmed. Small steps really do accumulate into peace. Keep going, friend.", hugs: 89, tag: 'Healing', timestamp: '5 hours ago' },
  { id: 'note-3', author: 'Maya Lin', avatar: '✨', color: 'bg-sky-100 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800 text-sky-950 dark:text-sky-100', message: "Sending a massive virtual warm hug to anyone feeling unseen today. Your quiet persistence is moving mountains.", hugs: 124, tag: 'Warmth', timestamp: 'Yesterday' }
];

export const SHOP_ITEMS = [
  { id: 'theme-misty-pine', type: 'theme', name: 'Misty Pine Atmosphere', description: 'Deep forest green with soft evergreen accents.', cost: { type: 'calm', amount: 50 }, icon: '🌲', unlocked: true },
  { id: 'theme-sunset-warmth', type: 'theme', name: 'Sunset Warmth Glow', description: 'Golden hour amber with cozy terracotta highlights.', cost: { type: 'happy', amount: 60 }, icon: '🌅', unlocked: false },
  { id: 'sound-lofi-forest', type: 'sound', name: 'Whispering Redwoods Lofi', description: 'Gentle mountain wind rustling leaves.', cost: { type: 'calm', amount: 40 }, icon: '🍃', unlocked: true },
  { id: 'sound-rainy-cafe', type: 'sound', name: 'Rainy Greenhouse Cafe', description: 'Soft raindrops with cozy ceramic clinks.', cost: { type: 'happy', amount: 45 }, icon: '☕', unlocked: false },
  { id: 'badge-kindness-ambassador', type: 'badge', name: 'Kindness Ambassador', description: 'Sent over 25 virtual hugs to peers.', cost: { type: 'happy', amount: 30 }, icon: '🤝', unlocked: true }
];

export const INITIAL_USER = {
  id: 'demo_alex',
  email: 'alex@demo.com',
  name: 'Alex Chen',
  college: 'State University',
  avatar: '🌿',
  goal: 'Build emotional resilience & reduce exam anxiety',
  streak: 5,
  joinedDate: 'October 2026'
};

export const INITIAL_WALLET = {
  happy: 50,
  calm: 70,
  growth: 40,
  transactions: [
    { id: 'tx-1', type: 'calm', amount: 10, reason: 'Honest Daily Check-in', timestamp: 'Today, 09:30 AM' },
    { id: 'tx-2', type: 'growth', amount: 20, reason: 'Completed 30s Shoulder Roll challenge', timestamp: 'Today, 09:31 AM' },
    { id: 'tx-3', type: 'happy', amount: 15, reason: 'Logged gratitude moment with friends', timestamp: 'Yesterday, 04:15 PM' },
    { id: 'tx-4', type: 'calm', amount: 20, reason: 'Completed 4 Box Breathing cycles', timestamp: 'Yesterday, 08:00 PM' }
  ]
};
