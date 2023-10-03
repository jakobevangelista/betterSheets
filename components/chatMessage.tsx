import { Messages } from "@/app/page";
import { ShieldPlus, User } from "lucide-react";
import { Separator } from "./ui/separator";
import Markdown from "react-markdown";

interface ChatMessageProps {
  message: Messages;
}

export function ChatMessage({ message }: ChatMessageProps) {
  function formatGptResponse() {
    // Split the response into paragraphs based on double line breaks.
    const paragraphs = message.message.split("\n");

    // Map each paragraph to a <p> element or a numbered list for steps.
    let isStep = false;
    const formattedParagraphs = paragraphs.map((paragraph, index) => {
      // Check if it's a step (starts with a number followed by a dot)
      if (/^\d+\.\s+/.test(paragraph)) {
        isStep = true;
        return <p key={index}>{paragraph}</p>;
      } else {
        if (isStep) {
          isStep = false;
          return <p key={index}>{paragraph}</p>;
        } else {
          return <p key={index}>{paragraph}</p>;
        }
      }
    });

    return formattedParagraphs;
  }
  return (
    <>
      <div className="group relative mb-4 flex items-start md:-ml-12">
        {message.role === "system" ? (
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow bg-background bg-emerald-500">
            <ShieldPlus className="bg-emerald-500" size={20} />
          </div>
        ) : (
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow bg-background">
            <User size={20} />
          </div>
        )}

        <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
          <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
            {/* <p className="mb-2 last:mb-0">{message.message.split("\n\n")}</p> */}
            {formatGptResponse()}
          </div>
        </div>
      </div>
    </>
  );
}
