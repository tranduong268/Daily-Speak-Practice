import { GoogleGenAI } from "@google/genai";

// Centralized AI Client initialization
// This ensures we don't instantiate the client multiple times across different services.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export default ai;