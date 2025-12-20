import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        // model: "google/gemini-3-pro-preview",
        // model: "google/gemini-2.0-flash-exp:free",
        model: "google/gemma-3-27b-it:free",

        reasoning: { enabled: true },
        // increase max tokens to avoid truncation; tune as needed
        // max_tokens: 1500,
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );


    // Robust extraction: OpenRouter/OpenAI-like responses may put text in
    // different fields depending on model / streaming / format.
    const choice = response.data?.choices?.[0] || {};
    const output =
      // new-style chat message
      choice?.message?.content ||
      // older completions style
      choice?.text ||
      // delta / streaming piece
      (choice?.delta && (choice.delta.content || choice.delta.text)) ||
      // fallback: stringify
      (typeof response.data === 'string' ? response.data : JSON.stringify(response.data));

    // ✅ Return plain text only
    return new NextResponse(String(output), {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });

  } catch (error: any) {
    console.error("API error:", error?.response?.data || error);

    return NextResponse.json(
      { error: error?.response?.data || error.message },
      { status: error?.response?.status || 500 }
    );
  }
}
