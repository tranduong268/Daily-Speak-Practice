// This file contains all the static data for prompts to keep the service layer clean.

// REFACTORED: Topics are now focused on meaningful, insightful, and coherent themes.
export const SPECIFIC_VARIATIONS: Record<string, string[]> = {
  'Công việc': [
    "The importance of emotional intelligence in leadership",
    "Finding purpose and meaning in your daily work",
    "The art of constructive feedback and growth mindset",
    "Balancing professional ambition with personal well-being",
    "How to cultivate deep focus in a distracted world",
    "The value of mentorship and passing on knowledge",
    "Overcoming 'Imposter Syndrome' through self-acceptance",
    "The changing landscape of remote work and human connection",
    "Why adaptability is the most important career skill",
    "Building trust within a diverse team",
    "The difference between being busy and being productive",
    "Handling failure as a necessary step towards success",
    "The ethics of decision-making in business",
    "How to negotiate with empathy and firmness"
  ],
  'Đời sống': [
    "The philosophy of 'Slow Living' in a fast-paced world",
    "Finding beauty in imperfection (The concept of Wabi-sabi)",
    "The profound impact of gratitude on mental health",
    "Minimalism: Clearing space for what truly matters",
    "The art of solitude vs. the pain of loneliness",
    "How our daily habits shape our future self",
    "The importance of disconnecting from technology to reconnect with oneself",
    "Learning to be present in the moment (Mindfulness)",
    "The joy of lifelong learning and curiosity",
    "Overcoming the fear of judgment from others",
    "The subtle art of listening to your intuition",
    "Why patience is a form of wisdom",
    "Cherishing small, ordinary moments of happiness"
  ],
  'Sức khỏe': [
    "The connection between mental health and physical vitality",
    "Sleep as the foundation of a healthy life",
    "The psychological benefits of spending time in nature",
    "Mindful eating: Listening to your body's needs",
    "Resilience: How we recover from stress and adversity",
    "The importance of posture and body language on confidence",
    "Why meditation is exercise for the brain",
    "Understanding the circadian rhythm and biological clock",
    "The impact of sugar and processed food on cognitive function",
    "Holistic health: Treating the whole person, not just symptoms",
    "The benefits of cold exposure and breathwork",
    "Aging gracefully and maintaining mobility"
  ],
  'Du lịch': [
    "How travel shifts our perspective and destroys prejudice",
    "The difference between a tourist and a traveler",
    "The serendipity of getting lost in a new city",
    "Learning humility through cultural immersion",
    "The environmental impact of sustainable tourism",
    "Solo travel as a journey of self-discovery",
    "The universal language of a smile across borders",
    "Preserving the heritage of ancient destinations",
    "Culinary diplomacy: Understanding culture through food",
    "The nostalgia of returning to a place that has changed",
    "Packing light: A metaphor for life"
  ],
  'Giao tiếp': [
    "The power of active listening and empathy",
    "Non-verbal communication: What we say without words",
    "How to handle difficult conversations with grace",
    "The art of storytelling in human connection",
    "Validating others' feelings without fixing their problems",
    "The difference between assertiveness and aggressiveness",
    "Overcoming social anxiety through small steps",
    "The importance of eye contact in building trust",
    "How to give a genuine compliment that matters",
    "Navigating cultural differences in communication styles",
    "The power of silence in a conversation"
  ],
  'Động lực': [
    "Discipline implies freedom: The paradox of self-control",
    "Why 'Why' is more important than 'How'",
    "The compound effect of small, consistent actions",
    "Turning obstacles into opportunities (Stoicism)",
    "The courage to be disliked and follow your own path",
    "Why comparison is the thief of joy",
    "Visualizing success: The psychology of belief",
    "Breaking the cycle of procrastination",
    "The infinite game: Playing for the long term",
    "Embracing uncertainty as a part of growth"
  ],
  'Giải trí': [
    "How literature expands our capacity for empathy",
    "The evolution of cinema as a reflection of society",
    "Music: The only universal language",
    "The psychology behind why we love sad songs",
    "Video games as a new form of interactive storytelling",
    "The impact of social media on our attention span",
    "Why we need art to understand the human condition",
    "The resurgence of vinyl records and analog media",
    "How comedy helps us process tragedy",
    "The role of museums in preserving collective memory"
  ],
  'Truyền thống': [
    "The importance of rituals in maintaining family bonds",
    "Bridging the generation gap through shared stories",
    "How traditional festivals preserve cultural identity",
    "The wisdom of elders in a digital age",
    "Respecting ancestors while embracing modernity",
    "The meaning behind traditional costumes and symbols",
    "Folklore: The moral compass of a culture",
    "The role of food in passing down family history",
    "Why we must protect dying languages and dialects"
  ]
};

export const WRITING_STYLES = [
  "Inspirational and Uplifting",
  "Reflective and Philosophical",
  "Analytical and Insightful",
  "Calm and Meditative",
  "Narrative and Descriptive (Storytelling)",
  "Empathetic and Warm"
];

export const CONTENT_FORMATS = [
  "A Short Essay (Focus on a clear argument or insight)",
  "A Reflective Monologue (Deep personal thought)",
  "A Descriptive Narrative (Painting a scene with words)",
  "A Dialogue between two wise characters",
  "A Letter to a friend (Sharing advice or experience)"
];

export const FOCUS_ANGLES = [
  "Focus on the underlying meaning, not just surface events",
  "Focus on the emotional transformation of a person",
  "Focus on a universal truth that applies to everyone",
  "Focus on the contrast between expectation and reality",
  "Focus on the beauty of simplicity"
];

// Removed "Generic Characters" as they often lead to childish stories. 
// We rely on the context to create depth.
export const GENERIC_CHARACTERS = []; 
