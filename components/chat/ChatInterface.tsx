"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MemoizedMarkdown } from "./MemoizedMarkdown";
import { Send } from "lucide-react";

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    experimental_throttle: 50,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">
              Try asking something like "Check my schedule for today".
              <br />
              This assistant can integrate with Google Calendar.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="break-words max-w-4xl mx-auto">
              <div
                className={`p-3 rounded ${
                  message.role === "user"
                    ? "bg-gray-100 ml-auto max-w-[80%]"
                    : "bg-gray-50 max-w-[80%]"
                }`}
              >
                <MemoizedMarkdown id={message.id} content={message.content} />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t p-3">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter your task or instruction..."
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!input.trim()}
            variant="default"
            size="sm"
          >
            <Send size={16} className="mr-1" /> Send
          </Button>
        </form>
      </div>
    </div>
  );
}
