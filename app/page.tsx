import ChatInterface from "@/components/chat/ChatInterface";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-screen p-4">
        <div className="h-full border rounded-lg overflow-hidden bg-white">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
