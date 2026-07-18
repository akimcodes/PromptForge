import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();
    console.log("API Key exists:", !!process.env.NEXT_PUBLIC_GEMINI_API_KEY);

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",

          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: image.split(",")[1],
              },
            },

            {
              text: `
Analyze this image carefully.

Generate SIX different professional prompts.

Return ONLY valid JSON.

Format:

{
  "Universal":"...",
  "ChatGPT":"...",
  "Midjourney":"...",
  "Flux":"...",
  "SDXL":"...",
  "Imagen":"..."
}

Requirements:

Universal:
General AI prompt.

ChatGPT:
Optimized for ChatGPT Images.

Midjourney:
Include cinematic wording,
masterpiece,
ultra detailed,
photorealistic,
--ar 3:2
--stylize 300
--v 7

Flux:
Focus on realism,
lighting,
materials,
camera.

SDXL:
Include SDXL quality tags.

Imagen:
Optimize for Google Imagen.

Return ONLY valid JSON.

{
  "recommendedModel":"ChatGPT",
  "reason":"Best for realistic images.",

  "prompts": {
    "Universal":"...",
    "ChatGPT":"...",
    "Midjourney":"...",
    "Flux":"...",
    "SDXL":"...",
    "Imagen":"..."
  },

  "analysis": {
    "score": 96,
    "rating":"Excellent",

    "strengths":[
      "Highly descriptive",
      "Excellent lighting",
      "Strong composition"
    ],

    "suggestions":[
      "Add focal length",
      "Mention atmosphere",
      "Include texture details"
    ]
  }
}
`,
            },
          ],
        },
      ],
    });

const text = result.text ?? "";

// Remove markdown code fences if Gemini adds them
const cleanText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let prompts;

try {
  prompts = JSON.parse(cleanText);
} catch (err) {

  console.log("Gemini Raw Response:");
  console.log(text);

  return NextResponse.json(
    {
      error: "Invalid JSON returned by Gemini",
    },
    {
      status: 500,
    }
  );

}

  return NextResponse.json({
  recommendedModel: prompts.recommendedModel,
  reason: prompts.reason,
  prompts: prompts.prompts,
  analysis: prompts.analysis,
});

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate prompts",
      },
      {
        status: 500,
      }
    );

  }
}