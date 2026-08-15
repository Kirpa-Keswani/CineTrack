import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { AI_MODEL, AI_SYSTEM_PROMPT } from "@/lib/ai/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const messages = body.messages as UIMessage[];

    if (!Array.isArray(messages)) {
      return new Response("Invalid messages", { status: 400 });
    }

    const result = streamText({
      model: AI_MODEL,
      system: AI_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("CineTrack AI error:", error);

    return new Response(
      JSON.stringify({
        error: "Unable to generate a response right now.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}