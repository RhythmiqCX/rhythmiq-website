import React, { useState, useEffect } from "react";
import { Clock, Brain, Users, CheckSquare, Zap, Shield, MoreVertical, Maximize2, Send, Smile } from "lucide-react";

// ChatMessage component
interface ChatMessageProps {
  message: string;
  isBot: boolean;
  delay?: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, delay = 0 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`flex ${
        isBot ? "justify-start" : "justify-end"
      } transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className={`flex items-start ${isBot ? "flex-row" : "flex-row-reverse"}`}>
        {isBot && (
          <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
            <CheckSquare className="w-3 h-3 text-white" />
          </div>
        )}
        <div
          className={`max-w-[85%] px-4 py-3 rounded-2xl ${
            isBot 
              ? "bg-gray-700 text-white rounded-bl-sm" 
              : "bg-indigo-500 text-white rounded-br-sm"
          }`}
        >
          <p className="text-sm break-words leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};


// Conversation data
interface ConversationMessage {
  message: string;
  isBot: boolean;
}

const ChatAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [conversationIndex, setConversationIndex] = useState(0);

  const conversations: ConversationMessage[][] = [
    [
      { message: "Hi! How can I help you today?", isBot: true },
      { message: "I need help with my recent order", isBot: false },
      { message: "Of course! Could you share your order number?", isBot: true },
      { message: "#12345", isBot: false },
      { message: "Got it ! Your order will arrive tomorrow by 3 PM.", isBot: true },
    ],
    [
      { message: "Welcome back! Looking for product updates?", isBot: true },
      { message: "Yes, what's new this week?", isBot: false },
      { message: "We just launched real-time tracking!", isBot: true },
      { message: "That's awesome!", isBot: false },
      { message: "Glad you like it! Want me to enable it?", isBot: true },
    ],
    [
      { message: "Hey 👋 Need any assistance?", isBot: true },
      { message: "Yeah, how do I reset my password?", isBot: false },
      { message: "Easy! Just click 'Forgot password' on login screen.", isBot: true },
      { message: "Thanks!", isBot: false },
      { message: "Anytime 😊", isBot: true },
    ],
  ];

  const conversation = conversations[conversationIndex];

  useEffect(() => {
    if (step < conversation.length) {
      const current = conversation[step];

      if (current.isBot) {
        const delayBeforeTyping = setTimeout(() => {
          setShowTyping(true);

          const typingDelay = setTimeout(() => {
            setShowTyping(false);
            setStep((prev) => prev + 1);
          }, 1500);

          return () => clearTimeout(typingDelay);
        }, 1000);

        return () => clearTimeout(delayBeforeTyping);
      } else {
        const userDelay = setTimeout(() => {
          setStep((prev) => prev + 1);
        }, 1000);

        return () => clearTimeout(userDelay);
      }
    } else {
      const resetDelay = setTimeout(() => {
        let newIndex = Math.floor(Math.random() * conversations.length);
        if (newIndex === conversationIndex) {
          newIndex = (newIndex + 1) % conversations.length;
        }
        setConversationIndex(newIndex);
        setStep(0);
      }, 2500);

      return () => clearTimeout(resetDelay);
    }
  }, [step]);

  return (
    <div className="bg-gray-900 rounded-2xl shadow-2xl w-full mx-auto max-w-sm sm:max-w-md lg:max-w-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
            <CheckSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Rhythmiq AI</h3>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
              <span className="text-xs text-gray-400">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer">
            <MoreVertical className="w-4 h-4" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-64 sm:h-72 overflow-y-auto bg-gray-900 p-4 space-y-3">
        {conversation.slice(0, step).map((msg, idx) => (
          <ChatMessage key={idx} message={msg.message} isBot={msg.isBot} delay={500} />
        ))}
        
        {showTyping && (
          <div className="flex justify-start">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <CheckSquare className="w-3 h-3 text-white" />
              </div>
              <div className="bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Message..."
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Send className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500">
              <Smile className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Benefits
const BenefitItem: React.FC<{ icon: React.ElementType; title: string }> = ({
  icon: Icon,
  title,
}) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-3">
      <Icon className="w-6 h-6 text-indigo-400" />
    </div>
    <span className="text-sm font-medium text-gray-200">{title}</span>
  </div>
);

// Hero Section
const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen w-full bg-background/80 text-white flex items-center justify-center overflow-x-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content Container */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white">
              Instant Answers,
              <br />
              <span className="text-indigo-500">Effortless Support</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed">
              Our AI-powered bot provides immediate, intelligent help so your
              customers never have to wait. Say goodbye to long queues and
              hello to instant resolution.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center bg-indigo-500/20 px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-indigo-400 mr-2" />
                <span className="text-sm font-medium text-gray-200">
                  Lightning Fast
                </span>
              </div>
              <div className="flex items-center bg-indigo-500/20 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-indigo-400 mr-2" />
                <span className="text-sm font-medium text-gray-200">
                  99.9% Uptime
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-indigo-500 text-black rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-semibold text-lg">
                Book a Demo
              </button>
            </div>

            {/* Trust Badge */}
            <p className="text-sm text-gray-500 mt-6">
              Join the{" "}
              <span className="text-indigo-500 font-semibold">early adopters</span>{" "}
              revolutionizing customer support
            </p>
          </div>

          {/* Chat Animation */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <ChatAnimation />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <BenefitItem icon={Clock} title="24/7 Availability" />
          <BenefitItem icon={Brain} title="AI-Powered Intelligence" />
          <BenefitItem icon={Users} title="Better Customer Experience" />
          <BenefitItem icon={CheckSquare} title="Automatic Resolution" />
        </div>
      </div>
    </section>
  );
};


export default HeroSection;