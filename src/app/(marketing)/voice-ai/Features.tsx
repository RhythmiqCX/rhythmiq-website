"use client";
import React, { useState, useEffect } from 'react';

export default function VoiceAICustomerSupport() {
  interface Message {
    type: 'customer' | 'ai';
    text: string;
    delay: number;
    duration: number;
  }
  const [messages, setMessages] = useState<Message[]>([]);
  const [mounted, setMounted] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const conversation: Message[] = [
    { type: 'customer', text: "Hi, I need help with my recent order. It hasn't arrived yet.", delay: 1500, duration: 1200 },
    { type: 'ai', text: "I'd be happy to help you track your order. Could you provide your order number?", delay: 4000, duration: 0 },
    { type: 'customer', text: "Sure, it's ORD-2024-789456", delay: 6500, duration: 1200 },
    { type: 'ai', text: "Thank you! I've located your order. It's currently out for delivery and should arrive today by 6 PM.", delay: 9000, duration: 0 },
    { type: 'customer', text: "That's great! Can I change the delivery address?", delay: 12000, duration: 1200 },
    { type: 'ai', text: "I can help with that. Since it's already out for delivery, I'll contact the courier immediately to update the address. What's your new delivery location?", delay: 14500, duration: 0 },
    { type: 'customer', text: "123 Maple Street, Apartment 4B", delay: 17500, duration: 1200 },
    { type: 'ai', text: "Perfect! I've updated your delivery address to 123 Maple Street, Apt 4B. The courier has been notified and will deliver there today. Is there anything else I can help you with?", delay: 20000, duration: 0 },
    { type: 'customer', text: "No, that's all. Thank you so much!", delay: 23000, duration: 1200 },
    { type: 'ai', text: "You're very welcome! Have a wonderful day, and enjoy your order!", delay: 25500, duration: 0 }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const startAnimation = () => {
      setMessages([]);
      
      const intervals: ReturnType<typeof setTimeout>[] = [];
      
      conversation.forEach((msg) => {
        const timeout = setTimeout(() => {
          setMessages(prev => [...prev, msg]);
          
          // Scroll to bottom of container
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
          
        }, msg.delay);
        
        intervals.push(timeout);
      });

      // Restart animation after completion
      const restartTimeout = setTimeout(() => {
        startAnimation();
      }, conversation[conversation.length - 1].delay + 3000);
      
      intervals.push(restartTimeout);

      return intervals;
    };

    const intervals = startAnimation();

    return () => intervals.forEach(clearTimeout);
  }, [mounted]);

  return (
    <div ref={containerRef} className="h-96 overflow-y-auto p-4 bg-gray-100 rounded-lg">
      {messages.map((message, index) => (
        <div key={index} className={`mb-2 p-2 rounded ${
          message.type === 'customer' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200'
        }`}>
          <strong>{message.type === 'customer' ? 'Customer' : 'AI'}:</strong> {message.text}
        </div>
      ))}
    </div>
  );
}