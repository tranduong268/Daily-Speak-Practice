// This file contains all the static data for prompts to keep the service layer clean.

export const SPECIFIC_VARIATIONS: Record<string, string[]> = {
  'Công việc': [
    "asking for a salary raise confidently", "a printer jam crisis 5 minutes before a meeting", 
    "dealing with passive-aggressive office emails", "the first day of a nervous intern", 
    "accidentally replying 'Reply All' to a confidential email", "staying late to finish a deadline while everyone else leaves", 
    "a funny silence in the elevator with the CEO", "losing a keycard and getting locked out", 
    "bringing a pet to the office and it causes chaos", "the struggle of keeping eyes open during a boring presentation",
    "a zoom meeting where the wifi disconnects at the worst moment", "working from a noisy coffee shop", 
    "forgetting to mute the microphone during a call", "the joy of working in pajamas",
    "collaborating with a colleague in a different time zone",
    "feeling imposter syndrome on a new project", "the satisfaction of finally solving a hard bug", 
    "mentoring a younger colleague", "giving a farewell speech for a retiring coworker",
    "dealing with constructive criticism without getting angry", "burnout and the need for a break",
    "celebrating a team victory with pizza", "negotiating a contract for a freelance gig",
    "quitting a toxic job to follow a passion", "the anxiety of a job interview"
  ],
  'Đời sống': [
    "trying to fix a leaking faucet and making it worse", "finding money in an old pair of jeans", 
    "waiting for a package that is delayed", "the smell of rain on dry asphalt (petrichor)", 
    "organizing a very messy bookshelf", "waking up before the alarm clock rings",
    "a power outage in the middle of the night", "trying a DIY haircut at home",
    "neighbors playing loud music at 2 AM", "finding a spider in the bathroom",
    "the struggle of folding a fitted sheet", "grocery shopping on an empty stomach",
    "accidentally shrinking a favorite sweater in the wash", "burning toast and setting off the smoke alarm",
    "the feeling of nostalgia when hearing an old song", "watching a sunset alone",
    "writing a letter to a future self", "cleaning out old childhood toys",
    "the peace of a quiet Sunday morning", "missing the bus by exactly one second",
    "adopting a stray cat and gaining its trust", "planting a seed and watching it grow",
    "learning to cook a meal from grandma's recipe"
  ],
  'Sức khỏe': [
    "waking up with a stiff neck from sleeping wrong", "the first day at the gym feeling awkward", 
    "trying to drink 2 liters of water a day", "a visit to the dentist and the fear of drills", 
    "catching a common cold and being grumpy", "running a marathon and hitting the wall", 
    "trying a new yoga pose and falling over", "the soreness after 'leg day'",
    "giving up sugar for a week and having cravings", "dealing with a bad sunburn",
    "meditating for 5 minutes but mind wandering", "taking a mental health day off work",
    "the relief of a deep sleep after stress", "learning to say 'no' to protect energy",
    "cooking a healthy green salad that actually tastes good", "breaking a bad habit (like nail biting)",
    "feeling energetic after a morning jog", "understanding the importance of posture",
    "dealing with seasonal allergies in spring"
  ],
  'Du lịch': [
    "losing luggage at the airport and improvising", "trying to ask for directions in a broken language", 
    "finding a hidden gem restaurant in a small alley", "missing a flight and sleeping at the terminal", 
    "packing a suitcase and sitting on it to close it", "taking a selfie at a famous landmark but blinking", 
    "meeting a fellow traveler and sharing stories", "getting lost in a beautiful old city without a map", 
    "trying exotic street food that looks scary", "bargaining at a local night market",
    "a road trip where the car gets a flat tire", "watching the sunrise from a mountain top",
    "misunderstanding a cultural custom and apologizing", "the sadness of the last day of vacation",
    "writing postcards to friends back home"
  ],
  'Giao tiếp': [
    "arguing about who pays the bill at dinner", "politely declining a wedding invitation", 
    "apologizing for being late to a date", "introducing two friends who have nothing in common", 
    "complaining about bad service without being rude", "asking a neighbor to lower the volume",
    "admitting a mistake to a friend", "negotiating the rent price with a landlord",
    "complimenting a stranger's outfit naturally", "making small talk in an awkward elevator ride", 
    "telling a joke that no one laughs at", "comforting a friend who is crying",
    "expressing gratitude deeply to a teacher", "asking for a favor from a busy person",
    "explaining a complex idea to a child", "listening actively without interrupting",
    "handling an interrupting person in a meeting"
  ],
  'Tình yêu': [
    "the awkwardness of a first date", "waiting for a text message that takes too long", 
    "buying a thoughtful gift for an anniversary", "a misunderstanding over a vague message", 
    "cooking a romantic dinner that accidentally burns", "confessing feelings to a best friend", 
    "dealing with a long-distance relationship time difference", "the first big fight and the makeup",
    "meeting the partner's parents for the first time", "proposing in a public place",
    "healing from a heartbreak and finding self-love", "a quiet evening just reading together",
    "sharing an umbrella in the rain"
  ],
  'Động lực': [
    "overcoming the paralyzing fear of failure", "waking up at 5am to work on a dream", 
    "reading a book that changes your perspective", "failing a test but deciding to try again immediately", 
    "setting a new year resolution and actually keeping it", "encouraging a friend who wants to give up",
    "the discipline of doing things when not motivated", "learning a new skill at an older age",
    "ignoring negative comments from haters", "visualizing success before a big event",
    "finding joy in the small progress", "why comparison is the thief of joy",
    "trusting the process even when it's slow", "stepping out of the comfort zone"
  ],
  'Giải trí': [
    "binge-watching a series and regretting it the next day", "accidentally spoiling a movie ending for a friend",
    "learning a magic trick to impress people", "going to a concert and losing your voice screaming",
    "trying to paint a picture and making a mess", "playing a board game and getting too competitive",
    "reading a mystery novel and guessing the killer wrong", "learning to play a guitar chord",
    "singing karaoke badly but having fun", "visiting an art museum and pretending to understand art",
    "video gaming until 3 AM with friends"
  ],
  'Truyền thống': [
    "preparing a traditional meal for Lunar New Year", "explaining a cultural superstition to a foreigner",
    "visiting ancestors' graves", "receiving 'lucky money' and acting polite",
    "wearing traditional clothes for a festival", "the importance of family reunion dinners",
    "learning a folk song from a grandparent", "the bustling atmosphere of a flower market",
    "cleaning the house before the new year arrives"
  ]
};

export const WRITING_STYLES = [
  "Humorous and Witty (make the user smile)", 
  "Deeply Emotional and Touching", 
  "Slightly Sarcastic and Dry", 
  "Energetic and Motivational", 
  "Calm, Poetic, and Descriptive", 
  "Mysterious and Suspenseful",
  "Analytical and Thought-provoking"
];

export const CONTENT_FORMATS = [
  "Descriptive Narrative (Focus on setting the scene and atmosphere, show dont tell)",
  "Third-Person Storytelling (He/She went...)",
  "Dialogue/Conversation (Between two characters)",
  "Internal Monologue (Stream of consciousness, thoughts)",
  "Diary Entry / Personal Journal (Introspective)",
  "Short News Snippet or Factual Report"
];

export const FOCUS_ANGLES = [
  "Focus on the sensory details (smell, sound, sight, touch)",
  "Focus on the internal emotional change of a character",
  "Focus on a sudden, unexpected twist in the situation",
  "Focus on a small, seemingly insignificant detail that means a lot",
  "Focus on the contrast between expectation and reality"
];

export const GENERIC_CHARACTERS = [
  "a grumpy old neighbor", "an energetic child", "a tired student", "a wise grandmother",
  "a confused tourist", "a strict boss", "a helpful stranger", "a mischievous dog",
  "a lonely astronaut", "a passionate street artist"
];