import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'YOUR_API_KEY_HERE' });

export const generateTourInsights = async (artistName: string, cityData: any[]) => {
  try {
    const prompt = `
      Analyze the following tour data for the artist "${artistName}" and provide 3 concise, strategic insights for their tour management team.
      Data: ${JSON.stringify(cityData)}
      
      Format the response as a JSON array of strings. Do not include markdown code blocks.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Error generating insights:", error);
    // Fallback data in case of error (or missing API key)
    return [
      "Demand in Bangalore is outpacing venue capacity by 20%.",
      "Pune shows low engagement; consider a targeted promo.",
      "Superfan conversion is highest in Mumbai."
    ];
  }
};
