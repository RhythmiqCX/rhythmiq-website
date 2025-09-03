// components/IntegrationSection.tsx
import React from "react";
import Image from "next/image";

export default function IntegrationSection() {
  const steps = [
    {
      id: 1,
      title: "Generate Your Widget",
      description:
        "Provide your website URL, and instantly get a ready-to-use chatbot widget.",
      image: "/images/embed.png", // transparent PNG
      bg: "bg-teal-400",
    },
    {
      id: 2,
      title: "Add It to Your Site",
      description:
        "Copy-paste one line of code into your website. No setup, no fuss.",
      image: "/images/code-snippet.png",
      bg: "bg-purple-500",
    },
    {
      id: 3,
      title: "Go Live Instantly",
      description:
        "Your chatbot is live in minutes, engaging visitors and capturing leads.",
      image: "/images/chat-bot.png",
      bg: "bg-orange-400",
    },
  ];

  return (
    <section
      id="integration"
      className="h-screen w-full flex flex-col justify-center bg-background px-6 snap-start"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Seamless Integration in 3 Steps
        </h2>
        <p className="text-gray-400 mb-12 text-lg">
          Get started without hassle — just drop it in and watch it work.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Colorful Block */}
              <div
                className={`${step.bg} w-full h-60 rounded-2xl flex items-center justify-center transition-transform transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl`}
              >
                {step.image && (
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                )}
              </div>

              {/* Text Below */}
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
