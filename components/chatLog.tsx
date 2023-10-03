import { ChatMessage } from "@/components/chatMessage";
import { Separator } from "@/components/ui/separator";

interface ChatLogProps {
  chatLog: {
    role: string;
    message: string;
  }[];
}
export default function ChatLog({ chatLog }: ChatLogProps) {
  return (
    <>
      <div className="relative mx-auto max-w-2xl px-4">
        {chatLog.map((chatMessage, index) => (
          <div key={index}>
            <ChatMessage message={chatMessage} />
            {index < chatMessage.message.length - 1 && (
              <Separator className="my-4 md:my-8" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
