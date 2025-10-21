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
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [waveActive, setWaveActive] = useState(false);
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
      setCurrentMessageIndex(0);
      
      const intervals: ReturnType<typeof setTimeout>[] = [];
      
      conversation.forEach((msg, index) => {
        const timeout = setTimeout(() => {
          setMessages(prev => [...prev, msg]);
          setCurrentMessageIndex(index);
          
          // Scroll to bottom of container
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
          
          // Only activate wave for customer messages
          if (msg.type === 'customer' && msg.duration > 0) {
            setWaveActive(true);
            setTimeout(() => setWaveActive(false), msg.duration);
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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background/80 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-sm font-semibold text-white/60 tracking-wider uppercase mb-6">
              For CUSTOMER SUPPORT & SERVICE
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-4xl">
              Transform customer experience with our AI voice assistant for support, sales, and service
            </h1>
          </div>
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-2 space-y-10">
              <div className="opacity-0"></div>
            </div>
            <div className="md:col-span-3">
              <div className="bg-slate-900/50 rounded-3xl overflow-hidden shadow-2xl relative h-[600px]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/80 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-white/60 tracking-wider uppercase mb-6">
            For CUSTOMER SUPPORT & SERVICE
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-4xl">
            Transform customer experience with our AI voice assistant for support, sales, and service
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Features Column */}
          <div className="md:col-span-2 space-y-10">
            <div className="opacity-0 animate-[fadeIn_0.8s_ease-out_0.3s_forwards]">
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">
                24/7 AVAILABILITY
              </h3>
              <p className="text-white/70 leading-relaxed">
                Provide instant support around the clock. Handle customer inquiries at any time without wait times or transfers.
              </p>
            </div>

            <div className="opacity-0 animate-[fadeIn_0.8s_ease-out_0.5s_forwards]">
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">
                NATURAL CONVERSATIONS
              </h3>
              <p className="text-white/70 leading-relaxed">
                Engage customers with human-like dialogue. Our AI understands context, emotion, and intent for seamless interactions.
              </p>
            </div>

            <div className="opacity-0 animate-[fadeIn_0.8s_ease-out_0.7s_forwards]">
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">
                INSTANT PROBLEM SOLVING
              </h3>
              <p className="text-white/70 leading-relaxed">
                Access customer data in real-time to resolve issues immediately. Update orders, process refunds, and make changes on the fly.
              </p>
            </div>

            <div className="opacity-0 animate-[fadeIn_0.8s_ease-out_0.9s_forwards]">
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">
                MULTI-LANGUAGE SUPPORT
              </h3>
              <p className="text-white/70 leading-relaxed">
                Communicate in 50+ languages with perfect pronunciation and cultural nuance. Break down language barriers effortlessly.
              </p>
            </div>
                        <div className="mt-6 flex justify-center">
              <div className="grid grid-cols-2 gap-4 max-w-2xl">
                <div className="flex items-center gap-3 bg-slate-800/40 backdrop-blur-md rounded-xl px-5 py-4 border border-white/10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 font-medium">Response Time</div>
                    <div className="text-xl text-white font-bold">0.8s</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-slate-800/40 backdrop-blur-md rounded-xl px-5 py-4 border border-white/10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 font-medium">Satisfaction</div>
                    <div className="text-xl text-white font-bold">98%</div>
                  </div>
                </div>
              </div>
            </div>

            

          </div>

          {/* Animation Column */}
          <div className="md:col-span-3">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl relative h-[600px] border border-white/5">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}></div>
              </div>

              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-500/10 to-pink-600/10"></div>

              {/* Conversation Container */}
              <div className="relative z-10 h-full flex flex-col p-8">
                <div 
                  ref={containerRef}
                  className="flex-1 overflow-y-auto space-y-3 max-w-2xl mx-auto w-full pb-20"
                  style={{ scrollBehavior: 'auto' }}
                >
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`opacity-0 animate-[slideIn_0.6s_ease-out_forwards] ${
                        msg.type === 'customer' ? 'ml-auto' : 'mr-auto'
                      } max-w-[75%]`}
                      style={{ animationDelay: '0.1s' }}
                    >
                      <div
                        className={`rounded-2xl p-4 backdrop-blur-sm border transition-all duration-300 ${
                          msg.type === 'customer'
                            ? 'bg-blue-600/20 border-blue-500/30'
                            : 'bg-purple-600/20 border-purple-500/30'
                        }`}
                      >
                        <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                          {msg.type === 'customer' ? '👤 Customer' : '🤖 AI Assistant'}
                        </div>
                        <p className="text-white text-sm leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Voice Wave Animation - Fixed at bottom */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                  {waveActive && (
                    <div className="flex items-center gap-1 bg-slate-800/80 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full animate-wave"
                          style={{
                            height: '6px',
                            animationDelay: `${i * 0.05}s`,
                            animationDuration: '0.8s'
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-slate-800/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Live Support Active</span>
              </div>
            </div>

            {/* Features Highlight */}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes wave {
          0%, 100% {
            height: 6px;
            opacity: 0.5;
          }
          50% {
            height: 28px;
            opacity: 1;
          }
        }

        .animate-wave {
          animation: wave 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}