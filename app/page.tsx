"use client";
import ChatInput from "@/components/chatInput";
import ChatLog from "@/components/chatLog";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { useState } from "react";
import * as z from "zod";

export interface Messages {
  role: string;
  message: string;
}

const formSchema = z.object({
  message: z.string().min(1, { message: "Please enter a prompt" }),
});

export default function Home() {
  const [sheetLink, setSheetLink] = useState<string>(
    "https://docs.google.com/spreadsheets/d/11oC81VbhDhRqE8NY2ZNrlEXIrdsAummmLxihhPqctmw/edit#gid=0"
  );
  const [sheetLinkInputControl, setSheetLinkInputControl] =
    useState<string>("");
  const [chatLog, setChatLog] = useState<Messages[]>([
    { role: "system", message: "How can I help you?" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setChatLog((chatLog) => [
      ...chatLog,
      { role: "user", message: values.message },
    ]);
    const linkRegex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
    const linkExpression = sheetLink.match(linkRegex);
    if (!linkExpression) {
      setIsSubmitting(false);
      setChatLog((chatLog) => [
        ...chatLog,
        { role: "system", message: "Invalid Sheet Link" },
      ]);
      return;
    }
    const sheetId = linkExpression && linkExpression[1];

    const request = await axios.post("/api/chat", {
      message: values.message,
      sheetId: sheetId,
    });
    console.log(request.data.message);
    setChatLog((chatLog) => [
      ...chatLog,
      { role: "system", message: request.data.message },
    ]);
    setIsSubmitting(false);
  }

  function clearChatLog() {
    setChatLog([{ role: "system", message: "How can I help you?" }]);
  }

  function handleSheetLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSheetLink(sheetLinkInputControl);
    setSheetLinkInputControl("");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-row">
        <div className="flex flex-1 flex-col bg-muted/50">
          <div className="pb-[200px] pt-4 md:pt-10">
            <div className="overflow-y-auto">
              <ChatLog chatLog={chatLog} />
            </div>
          </div>
        </div>
        <Separator orientation="vertical" className="h-full" />
        <div className="flex flex-1 flex-col bg-muted/50 ">
          <iframe className="p-4 h-full" src={sheetLink}></iframe>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-1 flex-col bg-muted/50">
          <ChatInput
            onSubmit={handleSubmit}
            clearChatLog={clearChatLog}
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="flex flex-1 flex-row bg-muted/50 ">
          <div className="flex-1 p-4">
            <Label>Sheet Link</Label>
            <form onSubmit={handleSheetLink}>
              <Input
                className="m-auto"
                placeholder="Put Sheet Link Here"
                value={sheetLinkInputControl}
                onChange={(e) => setSheetLinkInputControl(e.target.value)}
              ></Input>
            </form>
          </div>
          <Button
            className="my-auto"
            variant="destructive"
            onClick={() =>
              setSheetLink(
                "https://docs.google.com/spreadsheets/d/11oC81VbhDhRqE8NY2ZNrlEXIrdsAummmLxihhPqctmw/edit#gid=0"
              )
            }
          >
            Reset Sheet
          </Button>
        </div>
      </div>
    </div>
  );
}
