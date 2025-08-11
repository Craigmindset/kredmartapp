"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#128C7E] flex items-center gap-2 px-5 py-3"
            aria-label="Chat us"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="font-semibold">Chat us</span>
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>Chat us on WhatsApp</DialogTitle>
            <DialogDescription>
              Start a conversation with our support team on WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-6">
            <a
              href="https://wa.me/2349057871672"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Start WhatsApp Chat</span>
            </a>
            <span className="text-xs text-gray-500">
              You will be redirected to WhatsApp
            </span>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
