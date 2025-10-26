"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Send, Sparkles } from "lucide-react";

interface LeadData {
  name: string;
  email: string;
  company?: string;
  message?: string;
}

interface LeadCapturePopupProps {
  trigger?: "button" | "auto" | "exit";
  delay?: number; // seconds before auto-show
  source?: string;
}

export default function LeadCapturePopup({ 
  trigger = "auto", 
  delay = 30,
  source = "homepage" 
}: LeadCapturePopupProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<LeadData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Auto-show popup after delay
  useEffect(() => {
    if (trigger !== "auto" || hasShown) return;

    const timer = setTimeout(() => {
      setOpen(true);
      setHasShown(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [trigger, delay, hasShown]);

  // Exit intent detection
  useEffect(() => {
    if (trigger !== "exit" || hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [trigger, hasShown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!data.email || !data.name) {
      toast.error("Please provide at least your name and email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/lead-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });

      if (!res.ok) throw new Error("Network response not ok");
      
      toast.success("Thanks! We'll be in touch soon 🎉");
      setSubmitted(true);
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  // Don't render if trigger is button only and not manually triggered
  if (trigger === "button" && !open) return null;

  return (
    <>
      {trigger === "button" && (
        <Button 
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
        >
          <Mail className="mr-2 h-4 w-4" />
          Get in Touch
        </Button>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md border-white/20 bg-gradient-to-br from-background to-background/50 backdrop-blur-xl shadow-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Hey there! 👋
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              We noticed you're interested in customer support and voice AI solutions. Drop your details below, and we'll make sure to reach out to you to make your team's life easier.
            </DialogDescription>
          </DialogHeader>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  name="name"
                  placeholder="Your name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="bg-background border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="bg-background border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Input
                  name="company"
                  placeholder="Company (optional)"
                  value={data.company}
                  onChange={handleChange}
                  className="bg-background border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Textarea
                  name="message"
                  placeholder="What brings you here? (optional)"
                  rows={3}
                  value={data.message}
                  onChange={handleChange}
                  className="bg-background border-white/10 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={submitting}
                  className="flex-1"
                >
                  Maybe Later
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
                >
                  {submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="py-4 text-center">
              <p className="text-sm text-muted-foreground">
                We'll get back to you soon! 🚀
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

