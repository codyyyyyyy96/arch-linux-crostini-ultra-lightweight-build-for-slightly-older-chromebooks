
import { GoogleGenAI, Chat } from "@google/genai";
import type { GroundingSource } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWithThinkingMode = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error in Thinking Mode:", error);
    return "An error occurred while processing your complex request. Please check the console for details.";
  }
};

export const generateWithLowLatency = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error in Low-Latency Mode:", error);
    return "An error occurred while processing your quick request. Please check the console for details.";
  }
};

let chatInstance: Chat | null = null;

export const getChatInstance = (): Chat => {
    if (!chatInstance) {
        chatInstance = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are an expert Linux systems administrator specializing in optimizing Arch Linux for ChromeOS Crostini on systems with limited resources (4GB RAM). Your tone is helpful, technical, and direct. Prioritize performance, efficiency, and free, open-source solutions.`,
            },
        });
    }
    return chatInstance;
}


export const generateWithSearchGrounding = async (prompt: string): Promise<{ text: string, sources: GroundingSource[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources: GroundingSource[] = groundingChunks
      .map((chunk: any) => ({
        title: chunk.web?.title || 'Unknown Source',
        uri: chunk.web?.uri || '#',
      }))
      .filter((source: GroundingSource) => source.uri !== '#');

    return { text, sources };
  } catch (error) {
    console.error("Error with Search Grounding:", error);
    return { text: "An error occurred while fetching up-to-date information. Please check the console for details.", sources: [] };
  }
};
