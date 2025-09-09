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
      image: "/images/integrate-1.svg",
      bg: "bg-teal-400",
    },
    {
      id: 2,
      title: "Add It to Your Site",
      description:
        "Copy-paste one line of code into your website. No setup, no fuss.",
      image: "/images/integrate-2.svg",
      bg: "bg-purple-500",
    },
    {
      id: 3,
      title: "Go Live Instantly",
      description:
        "Your chatbot is live in minutes, engaging visitors and capturing leads.",
      image: "/images/integrate-3.svg",
      bg: "bg-orange-400",
    },
  ];

  return (
    <section
      id="integration"
      className="min-h-screen w-full flex flex-col justify-center bg-background px-4 sm:px-6 lg:px-12 snap-start scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
          Seamless Integration in 3 Steps
        </h2>
        <p className="text-gray-400 mb-8 sm:mb-12 text-base sm:text-lg">
          Get started without hassle — just drop it in and watch it work.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 overflow-x-auto pb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center flex-shrink-0"
            >
              {/* Colorful Block */}
              <div
                className={`${step.bg} w-full h-52 sm:h-60 rounded-2xl flex items-center justify-center transition-transform transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl`}
              >
                {step.image && (
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={300}
                    height={300}
                    className="object-contain w-full max-h-[180px] sm:max-h-[220px]"
                  />
                )}
              </div>

              {/* Text Below */}
              <div className="mt-4 sm:mt-6 text-center px-2">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
