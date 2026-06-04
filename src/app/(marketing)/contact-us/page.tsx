"use client";

import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Copy, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
export default function ContactUsPage() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      company: "",
      message: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const copyToClipboard = (email: string, label: string) => {
        navigator.clipboard.writeText(email);
        toast.success(`${label} copied!`, { duration: 2000 });
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!formData.email || !formData.name) {
        toast.error("Please provide at least your name and email.");
        return;
      }

      setSubmitting(true);
      try {
        const res = await fetch("/api/lead-notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, source: "contact-us" }),
        });

        if (!res.ok) throw new Error("Network response not ok");
        
        toast.success("Thanks! We'll be in touch soon 🎉");
        setFormData({ name: "", email: "", company: "", message: "" });
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <div className="paper-surface bg-paper text-ink font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <span className="eyebrow justify-center">Contact</span>
        <h2 className="h-section mt-3">Let&apos;s get in touch</h2>
      </div>

      <div className="max-w-4xl mx-auto text-center grid grid-cols-1 md:grid-cols-1 gap-8 px-4">

        {/* Contact Details */}
        <Card className="bg-white border-ink/10 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]">
          <CardHeader>
            <CardTitle className="text-ink">Contact Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Mail className="h-5 w-5 text-coral" />
              <div className="flex items-center space-x-2 text-left">
                <div>
                  <p className="text-sm font-medium text-ink3">Primary Email</p>
                  <p className="text-sm text-ink">hello@rhythmiqcx.com</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard('hello@rhythmiqcx.com', 'Primary Email')}
                >
                  <Copy className="h-5 w-5 text-ink2" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-5 w-5 text-coral" />
              <div className="flex items-center space-x-2 text-left">
                <div>
                  <p className="text-sm font-medium text-ink3">Alternate Email</p>
                  <p className="text-sm text-ink">ray@rhythmiqcx.com</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard('ray@rhythmiqcx.com', 'Alternate Email')}
                >
                  <Copy className="h-5 w-5 text-ink2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead Capture Form */}
        <Card className="bg-white border-ink/10 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]">
          <CardHeader>
            <div className="flex items-center gap-2 justify-center">
              <Sparkles className="h-5 w-5 text-coral" />
              <CardTitle className="text-ink">Get in Touch</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-ink">Name</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white border-ink/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-ink">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white border-ink/10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="company" className="text-sm font-medium text-ink">Company</label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Company (optional)"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-white border-ink/10"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-ink">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="What brings you here? (optional)"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="resize-none bg-white border-ink/10"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="btn btn-accent w-full justify-center"
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Link href="https://calendly.com/ray-rhythmiqcx/30min" className="btn btn-dark mx-auto justify-center">
          Schedule a Free Demo
        </Link>
      </div>
    </div>
  );
}
