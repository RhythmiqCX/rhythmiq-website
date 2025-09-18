"use client"; // 👈 Required because you’re using hooks

import React, { useState, useEffect, useRef } from "react";

const VoiceChatDemo = () => {
    const [muted, setMuted] = useState(false);
    const bottomRef = useRef(null);
    
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "Hello! I'm your AI voice assistant. Press the microphone button and speak to start our conversation.",
      timestamp: new Date(Date.now() - 120000),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollTo({
  top: messagesContainerRef.current.scrollHeight,
  behavior: "smooth",
});
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShowScrollDown(!isNearBottom && messages.length > 2);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [messages.length]);

  const handleVoiceInput = async () => {
    if (isListening || isProcessing) return;

    setIsListening(true);

    // Simulate listening
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);

      // Add user message
      const userMessage = {
        id: messages.length + 1,
        type: "user",
        text: "How can your voice AI help improve customer service?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "ai",
          text: "Great question! Our voice AI can handle multiple customer inquiries simultaneously, provide 24/7 support, reduce wait times, and maintain consistent service quality. It can process natural language, understand context, and provide personalized responses while learning from each interaction.",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsProcessing(false);
      }, 2000);
    }, 2500);
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto bg-background-80 flex flex-col px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto w-full flex flex-col h-full min-h-0">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4">
            Voice AI Demo
          </h2>
          <p className="text-sm sm:text-base text-gray-300 px-2">
            Experience natural conversations with our advanced voice AI assistant
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden min-h-0">
          {/* Chat Messages */}
<div
  ref={messagesContainerRef}
  className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 min-h-0 relative"
  style={{ maxHeight: "65vh" }}
>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                      : "bg-white/10 backdrop-blur-sm border border-white/20"
                  } rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg`}
                >
                  {message.type === "ai" && (
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-cyan-300">
                        AI Assistant
                      </span>
                    </div>
                  )}

                  <p className="text-white text-sm sm:text-base leading-relaxed mb-2">
                    {message.text}
                  </p>
                  <p className="text-xs text-gray-400 text-right">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {(isListening || isProcessing) && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-300">
                      {isListening ? "Listening..." : "Processing..."}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />

            {/* Scroll to bottom button */}
            {showScrollDown && (
              <button
                onClick={scrollToBottom}
                className="fixed bottom-32 right-4 sm:right-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 z-10"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Voice Input Controls */}
<div className="p-2 sm:p-2 border-t border-white/10 bg-white/5 relative">
  <div className="flex items-center justify-center">
    {/* Microphone Controls */}
    <button
      onClick={handleVoiceInput}
      disabled={isListening || isProcessing}
      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl ${
        isListening
          ? "bg-red-500 hover:bg-red-600 animate-pulse"
          : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
      }`}
    >
      {isListening ? (
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-sm"></div>
      ) : (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {isListening && (
        <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-ping"></div>
      )}
    </button>
  </div>

  {/* Status text */}
  <div className="text-center mt-1">
    <p className="text-sm sm:text-base text-white font-medium">
      {isListening
        ? "Listening..."
        : isProcessing
        ? "Processing..."
        : "Tap to speak"}
    </p>
    <p className="text-xs text-gray-400">Hold to record your voice</p>
  </div>

  {/* 🔹 Mute Button - smaller, bottom left */}
  <button
    onClick={() => setMuted(!muted)}
    className="absolute bottom-2 left-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors duration-200 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
  >
    <div className="relative w-5 h-5 sm:w-6 sm:h-6">
      {/* Speaker Icon */}
      <svg
        className={`absolute inset-0 w-full h-full transition-opacity duration-300`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 34 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>

      {/* Sound Waves */}
      <svg
        className={`absolute inset-0 w-full h-full transition-all duration-300 ${
          muted ? "opacity-0 scale-75" : "opacity-100 scale-100"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728"
        />
      </svg>

      {/* Mute "X" */}
      <svg
        className={`absolute inset-0 w-full h-full transition-all duration-300 ${
          muted ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5l12 12M6 18L18 6"
        />
      </svg>
    </div>
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatDemo;
