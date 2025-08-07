
import { GoogleGenAI } from "@google/genai";
import type { Team, Match } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This case should ideally be handled by the environment,
  // but as a fallback, we can throw an error or use a mock.
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateTournamentInsights = async (teams: Team[], matches: Match[]): Promise<string> => {
  if (!API_KEY) {
    return Promise.reject(new Error("Gemini API key is not configured."));
  }

  const model = "gemini-2.5-flash";

  // Create a more readable version of the data for the prompt
  const teamDetails = teams.map(t => `${t.name} (Players: ${t.players.map(p => `${p.name} - ${p.role}`).join(', ')})`).join('\n');
  
  const teamNameMap = new Map(teams.map(t => [t.id, t.name]));
  const matchDetails = matches.map(m => `${teamNameMap.get(m.team1Id)} vs ${teamNameMap.get(m.team2Id)} on ${m.date} at ${m.venue}`).join('\n');

  const prompt = `
    You are an expert and enthusiastic cricket commentator and analyst.
    Based on the following tournament data, provide a fun and engaging analysis in about 200-250 words.

    **Tournament Teams & Rosters:**
    ${teamDetails}

    **Match Schedule:**
    ${matchDetails}

    Your analysis should perform the following tasks and be presented in a narrative format:
    1.  **Identify a "Team to Watch"**: Pick one team that looks particularly strong or interesting and briefly explain why, mentioning a key player.
    2.  **Highlight a "Marquee Matchup"**: Choose one match from the schedule that promises the most excitement and explain what makes it a must-see.
    3.  **Offer a "Bold Prediction"**: Make a confident prediction about which team might lift the trophy at the end.

    Keep the tone exciting, insightful, and suitable for passionate cricket fans. Do not use markdown formatting like headings or bullet points; write it as a single block of text.
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    if (error instanceof Error) {
        return Promise.reject(new Error(`Failed to get insights from AI: ${error.message}`));
    }
    return Promise.reject(new Error("An unknown error occurred while communicating with the AI."));
  }
};
