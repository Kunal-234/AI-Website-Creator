import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model:
        //  "mistralai/mistral-7b-instruct:free",
        'openai/gpt-oss-20b:free' ,
        messages,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
