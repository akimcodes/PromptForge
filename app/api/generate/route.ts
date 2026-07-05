import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { image, prompt } = await req.json();

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
              text: prompt,
            },
          ],
        },
      ],
    });

    return NextResponse.json({
      text: result.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate content",
      },
      {
        status: 500,
      }
    );
  }
}