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
        model: "google/gemini-3-pro-preview",
        reasoning: { enabled: true },
        max_tokens: 100,
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const output = response.data?.choices?.[0]?.message?.content;

    // ✅ Return plain text only
    return new NextResponse(output, {
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
