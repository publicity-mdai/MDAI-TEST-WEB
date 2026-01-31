
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the Manitoba Darts Association (MDA) AI Assistant. 
Your goal is to help prospective and current members with the registration process.
MDA has 4 Zones:
- Zone 1: Winnipeg (The city proper and immediate urban areas).
- Zone 2: Interlake (Selkirk, Gimli, and the region between the lakes).
- Zone 3: Westman (Brandon, Virden, and the South-Western region).
- Zone 4: Manitoba East (Beausejour, Steinbach, and the Eastern border regions).

Membership info:
- Annual renewal is required.
- Benefits include participation in provincial tournaments, ranked play, and community events.
- If they don't have a membership number, tell them to leave it blank for a new application.

Keep responses friendly, helpful, and concise.
`;

export const getAiResponse = async (userMessage: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. How can I help with your darts membership today?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble connecting to my brain. Please try again or contact MDA support directly!";
  }
};
