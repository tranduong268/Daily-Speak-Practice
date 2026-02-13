import { Type } from "@google/genai";
import ai from "./aiClient";
import { DailyContent } from "../types";
import { SPECIFIC_VARIATIONS, WRITING_STYLES, FOCUS_ANGLES, CONTENT_FORMATS } from "../data/promptData";

// --- SCHEMAS ---
const SEGMENT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    word: { type: Type.STRING },
    phonetic: { type: Type.STRING },
    isStressed: { type: Type.BOOLEAN },
    meaning: { type: Type.STRING },
  },
  required: ["word"]
};

const CONTENT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING },
    vietnameseTranslation: { type: Type.STRING },
    en: {
      type: Type.OBJECT,
      properties: {
        text: { type: Type.STRING },
        segments: { type: Type.ARRAY, items: SEGMENT_SCHEMA }
      },
      required: ["text", "segments"]
    },
    cn: {
      type: Type.OBJECT,
      properties: {
        text: { type: Type.STRING },
        segments: { type: Type.ARRAY, items: SEGMENT_SCHEMA }
      },
      required: ["text", "segments"]
    }
  },
  required: ["topic", "vietnameseTranslation", "en", "cn"]
};

export const generateDailyContent = async (
  topicOrText: string,
  isCustomInput: boolean
): Promise<DailyContent> => {
  try {
    const uniqueSeed = Date.now();
    
    // Pick random parameters to force diversity
    const randomStyle = WRITING_STYLES[Math.floor(Math.random() * WRITING_STYLES.length)];
    const randomAngle = FOCUS_ANGLES[Math.floor(Math.random() * FOCUS_ANGLES.length)];
    const randomFormat = CONTENT_FORMATS[Math.floor(Math.random() * CONTENT_FORMATS.length)];

    let specificContext = "";

    // Check match for preset topics
    const matchedKey = Object.keys(SPECIFIC_VARIATIONS).find(k => topicOrText.includes(k));

    if (matchedKey && !isCustomInput) {
      // --- PRESET TOPIC MODE ---
      const variations = SPECIFIC_VARIATIONS[matchedKey];
      const scenario = variations[Math.floor(Math.random() * variations.length)];
      
      specificContext = `
        The general category is "${topicOrText}".
        SPECIFIC THEME: Write a meaningful piece about: "${scenario}".
        
        MANDATORY CONFIGURATION:
        - FORMAT: ${randomFormat} (Strictly follow this structure).
        - Writing Style: ${randomStyle}.
        - Angle: ${randomAngle}.
      `;
    } else if (isCustomInput) {
      // --- CUSTOM INPUT MODE ---
      if (topicOrText.includes("--- English ---") || topicOrText.includes("Topic:")) {
         specificContext = "PARSE_MODE";
      } else {
        specificContext = `
          The user wants to practice speaking about: "${topicOrText}".
          
          CRITICAL INSTRUCTION:
          Do NOT write a generic Wikipedia definition or a boring "Hello" speech.
          Interpret this topic deeply through a meaningful lens:
          
          - FORMAT: ${randomFormat}.
          - Writing Style: ${randomStyle}.
          
          Make the content insightful and coherent.
        `;
      }
    }

    let fullPrompt = "";

    if (specificContext === "PARSE_MODE") {
       fullPrompt = `
        The user has pasted a previously generated lesson text. 
        Your task is to PARSE and RESTORE this text back into the structured JSON format strictly.
        Input Text to Parse:
        """${topicOrText}"""
       `;
    } else {
       fullPrompt = `
        You are an expert language teacher and a thoughtful writer.
        
        TASK:
        ${specificContext}
        
        STRICT QUALITY CONTROL RULES:
        1. **MEANINGFUL CONTENT**: The text must be coherent, logical, and offer a valuable perspective, lesson, or emotional insight. 
           - AVOID: Trivial complaints, nonsense situations, or chaotic rambling.
           - AVOID: Starting every sentence with "I". Use varied sentence structures.
        2. **NATURAL LANGUAGE**: Use high-quality, natural English (and Chinese) suitable for an intermediate-to-advanced learner.
        3. **LENGTH**: A concise but substantive passage (80-130 words).
        4. **RANDOM SEED**: ${uniqueSeed}.
        
        Output Requirements:
        1. 'vietnameseTranslation': A high-quality, natural Vietnamese translation (dịch thoát ý, văn phong hay, phù hợp ngữ cảnh).
        
        2. 'en': English version.
           - 'text': Full text with proper punctuation.
           - segments: Split by word/phrase. **Punctuation must be attached to the word** (e.g. "Hello,").
           - 'phonetic': IPA.
           - 'isStressed': true for content words (nouns, verbs, adj).
           - 'meaning': Vietnamese meaning of this specific word/phrase in context.
           
        3. 'cn': Chinese (Mandarin) version.
           - 'text': Full text (Hanzi).
           - segments: Split by word/phrase.
           - 'phonetic': Pinyin with tones.
           - 'isStressed': true for keywords.
           - 'meaning': Vietnamese meaning.
        
        Output MUST be valid JSON matching the schema.
      `;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: CONTENT_SCHEMA,
        temperature: 1.3, // Slightly lower temperature to ensure more coherence while keeping creativity
      },
    });

    const text = response.text;
    if (!text) throw new Error("No text response from Gemini");
    
    const parsed = JSON.parse(text);
    return {
      id: new Date().toISOString(),
      ...parsed
    };
  } catch (error) {
    console.error("Content Service Error:", error);
    throw error;
  }
};
