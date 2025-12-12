import { GoogleGenAI, Type } from "@google/genai";
import { AIPasswordSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCreativePasswords = async (theme: string): Promise<AIPasswordSuggestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 3 strong, secure, yet memorable passwords based on the theme: "${theme}". 
      Each password should try to meet high security standards (mixed case, numbers, special chars) but use the theme as a mnemonic anchor. 
      Also provide a brief explanation of the mnemonic logic.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              password: { type: Type.STRING },
              explanation: { type: Type.STRING },
              strength: { type: Type.STRING, description: "A label like Strong or Very Strong" }
            },
            required: ["password", "explanation", "strength"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIPasswordSuggestion[];
    }
    return [];
  } catch (error) {
    console.error("Failed to generate passwords:", error);
    throw new Error("AI service temporarily unavailable");
  }
};
