"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Textarea from "react-textarea-autosize";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { CornerDownLeft, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";

interface ChatInputProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  clearChatLog: () => void;
  isSubmitting: boolean;
}

const formSchema = z.object({
  message: z.string().min(1, { message: "Please enter a prompt" }),
});

export default function ChatInput({
  onSubmit,
  clearChatLog,
  isSubmitting,
}: ChatInputProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { formRef, onKeyDown } = useEnterSubmit();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitting) {
      form.reset();
    }
  }, [form.formState.isSubmitting, form.reset, form]);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 w-1/2 bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef}>
                <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          clearChatLog();
                          router.refresh();
                          router.push("/");
                          router.replace("/");
                        }}
                        className={cn(
                          buttonVariants({ size: "sm", variant: "outline" }),
                          "absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4"
                        )}
                      >
                        <Plus />
                        <span className="sr-only">New Chat</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>New Chat</TooltipContent>
                  </Tooltip>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {/* <div className="!h-[62px]"> */}
                          <Textarea
                            spellCheck={false}
                            className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                            placeholder="Send a prompt"
                            {...field}
                            ref={inputRef}
                            tabIndex={0}
                            onKeyDown={onKeyDown}
                            rows={1}
                            // disabled={isSubmitting}
                          />
                          {/* </div> */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="absolute right-0 top-4 sm:right-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="submit"
                          size="icon"
                          disabled={
                            isSubmitting || form.getValues("message") === ""
                          }
                        >
                          <CornerDownLeft />
                          <span className="sr-only">Send message</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
