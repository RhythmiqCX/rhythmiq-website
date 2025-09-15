"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Copy } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
export default function ContactUsPage() {
    const copyToClipboard = (email: string, label: string) => {
        navigator.clipboard.writeText(email);
        toast.success(`${label} copied!`, { duration: 2000 });
      };

  return (
    <div className="bg-gradient-to-b from-blue-500/20 to-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-200">Let's get in touch</h2>
        {/* <p className="mt-4 text-lg text-gray-600">
          Email us .
        </p> */}
      </div>

      <div className="max-w-4xl mx-auto text-center grid grid-cols-1 md:grid-cols-1 gap-8 px-4">

        {/* Contact Details */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Contact Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Mail className="h-5 w-5 text-gray-200" />
              <div className="flex items-center space-x-2 text-left">
                <div>
                  <p className="text-sm font-medium text-gray-500">Primary Email</p>
                  <p className="text-sm text-gray-200">hello@rhythmiqcx.com</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard('hello@rhythmiqcx.com', 'Primary Email')}
                >
                  <Copy className="h-5 w-5 text-gray-200" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-5 w-5 text-gray-200" />
              <div className="flex items-center space-x-2 text-left">
                <div>
                  <p className="text-sm font-medium text-gray-500">Alternate Email</p>
                  <p className="text-sm text-gray-200">ray@rhythmiqcx.com</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard('ray@rhythmiqcx.com', 'Alternate Email')}
                >
                  <Copy className="h-5 w-5 text-gray-200" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Link href="https://calendly.com/ray-rhythmiqcx/30min">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-xl font-semibold shadow-lg hover:opacity-90 transition">
              Schedule a Free Demo
            </button>
            </Link>
      </div>
    </div>
  );
}
