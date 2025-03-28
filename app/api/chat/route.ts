// app/api/chat/route.ts

import { openai } from "@ai-sdk/openai";
import {
  experimental_createMCPClient as createMCPClient,
  streamText,
} from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const mcpClient = await createMCPClient({
    transport: new StdioMCPTransport({
      command: "env",
      args: [
        "node",
        process.env.GOOGLE_CALENDAR_MCP_PATH ||
          "path/to/google-calendar-mcp/build/index.js",
      ],
    }),
  });

  try {
    const { messages } = await req.json();

    const tools = await mcpClient.tools();

    // Generate text using OpenAI
    const result = streamText({
      model: openai("gpt-4o"),
      tools,
      messages,
      system: `You are a productivity assistant. Use the following tools to help users manage their tasks:
          1. Google Calendar: For scheduling appointments and events
          
          Format your responses using Markdown, especially utilizing these elements:
          - Headings (#, ##)
          - Bullet points (- or 1.)
          - Code blocks (\`\`\`)
          - Bold (**bold**) and italic (*italic*)
          
          Note: When using Google Calendar, always use "primary" as the calendar ID.
          When performing calendar operations, always specify "primary" for the calendarId parameter.
          Example: mcp_MCP_Google_Calendar_list_events({calendarId: "primary"})

          Today's date is ${new Date().toISOString().split("T")[0]}.`,
      maxSteps: 10,
      onFinish: async () => {
        await mcpClient.close();
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
