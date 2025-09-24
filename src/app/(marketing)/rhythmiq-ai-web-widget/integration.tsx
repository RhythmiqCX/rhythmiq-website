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
    <div className="w-full h-full flex flex-col justify-center text-center overflow-y-visible sm:overflow-y-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 text-white">
          Seamless Integration in 3 Steps
        </h2>
        <p className="text-gray-400 mb-6 sm:mb-8 lg:mb-12 text-sm sm:text-base lg:text-lg">
          Get started without hassle   just drop it in and watch it work.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 overflow-x-hidden pb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center flex-shrink-0"
            >
              {/* Colorful Block */}
              <div
                className={`${step.bg} w-full h-40 sm:h-48 lg:h-52 xl:h-60 rounded-2xl flex items-center justify-center transition-transform transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl`}
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
              <div className="mt-3 sm:mt-4 lg:mt-6 text-center px-2">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
