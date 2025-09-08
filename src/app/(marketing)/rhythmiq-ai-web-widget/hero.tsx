import React, { useState, useEffect } from "react";
import { Clock, Brain, Users, CheckSquare, Zap, Shield } from "lucide-react";

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
      } mb-3 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl ${
          isBot ? "bg-violet-500 text-white" : "bg-gray-800 text-gray-100"
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

// Typing indicator
const TypingIndicator: React.FC<{ visible: boolean }> = ({ visible }) => (
  <div
    className={`flex justify-start mb-3 transition-all duration-300 ${
      visible ? "opacity-100" : "opacity-0"
    }`}
  >
    <div className="bg-violet-500 px-4 py-2 rounded-2xl">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.6s" }}
        ></div>
      </div>
    </div>
  </div>
);

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
      { message: "Got it ✅ Your order will arrive tomorrow by 3 PM.", isBot: true },
    ],
    [
      { message: "Welcome back! Looking for product updates?", isBot: true },
      { message: "Yes, what’s new this week?", isBot: false },
      { message: "We just launched real-time tracking 🚀", isBot: true },
      { message: "That’s awesome!", isBot: false },
      { message: "Glad you like it! Want me to enable it?", isBot: true },
    ],
    [
      { message: "Hey 👋 Need any assistance?", isBot: true },
      { message: "Yeah, how do I reset my password?", isBot: false },
      { message: "Easy! Just click ‘Forgot password’ on login screen.", isBot: true },
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
    <div className="bg-black rounded-xl shadow-lg p-4 w-full max-w-sm mx-auto border border-gray-800">
      <div className="flex items-center mb-4 pb-3 border-b border-gray-700">
        <div className="w-9 h-9 bg-violet-500 rounded-full flex items-center justify-center mr-3">
          <CheckSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white text-base">Rhythmiq AI</h3>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
            <span className="text-xs text-gray-400">Online</span>
          </div>
        </div>
      </div>

      <div className="h-72 overflow-hidden">
        {conversation.slice(0, step).map((msg, idx) => (
          <ChatMessage key={idx} message={msg.message} isBot={msg.isBot} delay={500} />
        ))}

        {showTyping && <TypingIndicator visible={true} />}
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
    <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center mb-3">
      <Icon className="w-6 h-6 text-violet-400" />
    </div>
    <span className="text-sm font-medium text-gray-200">{title}</span>
  </div>
);

// Hero Section
const HeroSection: React.FC = () => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    setTextVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="h-screen w-screen snap-start snap-always bg-black text-white flex items-center justify-center scroll-mt-16"
    >
      <div className="w-full h-full flex flex-col justify-center px-6 py-12">
        <div className="max-w-7xl w-full mx-auto flex flex-col justify-center">
          {/* Top grid: text + chat */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 w-full 
                flex-col-reverse lg:flex-row">
            {/* Text */}
  <div
    className={`transition-all duration-1000 ${
      textVisible
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-8"
    }`}
  >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white pt-8">
      Instant Answers,
      <br />
      <span className="text-violet-500">Effortless Support</span>
    </h1>
    <p className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed">
      Our AI-powered bot provides immediate, intelligent help so your
      customers never have to wait. Say goodbye to long queues and hello
      to instant resolution.
    </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center bg-violet-500/20 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-violet-400 mr-2" />
                  <span className="text-sm font-medium text-gray-200">
                    Lightning Fast
                  </span>
                </div>
                <div className="flex items-center bg-violet-500/20 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-violet-400 mr-2" />
                  <span className="text-sm font-medium text-gray-200">
                    99.9% Uptime
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-violet-500 text-black rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-lg">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-semibold text-lg">
                  Book a Demo
                </button>
              </div>

              {/* Trust Badge */}
              <p className="text-sm text-gray-500 mt-6">
                Trusted by{" "}
                <span className="text-violet-500 font-semibold">10,000+</span>{" "}
                businesses worldwide
              </p>
            </div>

            {/* Chat Animation */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                textVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <ChatAnimation />
            </div>
          </div>

          {/* Benefits (always inside hero, stacked on mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto w-full">
            <BenefitItem icon={Clock} title="24/7 Availability" />
            <BenefitItem icon={Brain} title="AI-Powered Intelligence" />
            <BenefitItem icon={Users} title="Better Customer Experience" />
            <BenefitItem icon={CheckSquare} title="Automatic Resolution" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;