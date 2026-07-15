import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();

    console.log("Received Prompt:", prompt);
    console.log("Received Style:", style);

   const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",

  contents: `
You are an expert AI prompt engineer.

Your task is to improve an existing AI image generation prompt.

DO NOT create a new scene.

DO NOT change the subject.

DO NOT change the composition.

DO NOT change the background.

DO NOT change the camera angle.

Preserve everything from the original prompt.

Only improve:

- wording
- details
- realism
- lighting
- textures
- quality

If a style is selected, rewrite ONLY in that style while preserving the original scene.

Selected Style:
${style || "None"}

Original Prompt:

${prompt}

Return ONLY the improved prompt.
`,
});

    return NextResponse.json({
      prompt: result.text,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to improve prompt",
      },
      {
        status: 500,
      }
    );
  }
}