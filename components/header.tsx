import { Button } from "@/components/ui/button";
import { Github, HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <>
      <div className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
        <div className="flex items-center">better sheets</div>
        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline" asChild>
            <a
              href={"https://github.com/jakobevangelista/betterSheets"}
              rel="noopener noreferrer"
            >
              <Github size={20} />
              Github
            </a>
          </Button>

          <Dialog>
            <DialogTrigger>
              <Button variant={"outline"}>
                <HelpCircle />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share the sheet with the email below:</DialogTitle>
                <DialogDescription>
                  better-sheets-account@better-sheets-400818.iam.gserviceaccount.com
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </>
  );
}
