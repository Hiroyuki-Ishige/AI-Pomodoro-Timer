import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY!,
});

export async function GET() {
  const prompt = `
    #Instruction
    Provide one suggestion how to refresh during break time.

    #Constraints
    - we can do in 2 minutes
    - easy to do at home or office
    - no special equipment needed
    - use body movements
    - add emojis to make it more engaging
    - suggest in one short sentence
    - suggest with suggestive tone

    #Output Format
    - Let's stretch our legs with a quick walk around the room! 🚶‍♂️🚶‍♀️
    - Let's do some jumping jacks to get our blood pumping! 🤸‍♂️🤸‍
  
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  console.log("Gemini API response:", response);

  
  return NextResponse.json({ suggestion:response.text }, { status: 200 });
}
