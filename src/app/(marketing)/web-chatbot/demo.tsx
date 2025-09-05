"use client";

import React, { useRef, useState } from "react";
import Confetti from "react-confetti";
import Carousel from "./carousel";

interface FeatureCard {
  image: string;
  title: string;
  description: string;
}

interface SectionProps {
  featureCards: FeatureCard[];
}

const Section2: React.FC<SectionProps> = ({ featureCards }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [confettiActive, setConfettiActive] = useState(false);

  const getSectionDimensions = () => {
    if (!sectionRef.current) return { width: 0, height: 0 };
    return {
      width: sectionRef.current.offsetWidth,
      height: sectionRef.current.offsetHeight,
    };
  };

  return (
    <section
      id="section2"
      ref={sectionRef}
      className="h-screen w-full flex flex-col items-center justify-center gap-6 snap-start bg-[hsl(60,30%,96%)] relative"
    >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">LOREM</h1>
      {/* Carousel */}
      <Carousel cards={featureCards} />

      {/* CTA Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onMouseEnter={() => setConfettiActive(true)}
          onMouseLeave={() => setConfettiActive(false)}
          className="px-6 py-3 rounded-xl bg-yellow-400 text-neutral-900 font-semibold shadow-lg hover:bg-yellow-300 transition-all"
        >
          Get Started
        </button>
        <button
          onMouseEnter={() => setConfettiActive(true)}
          onMouseLeave={() => setConfettiActive(false)}
          className="px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold shadow-lg hover:bg-neutral-700 transition-all"
        >
          Learn More
        </button>
      </div>

      {/* Confetti overlay */}
      {confettiActive && (
        <Confetti
          width={getSectionDimensions().width}
          height={getSectionDimensions().height}
          recycle={true} // keep raining while hover is active
          numberOfPieces={400} // more confetti
          gravity={1.2} // falls faster
          initialVelocityY={20} // starts with more speed
          colors={[
            "#FF595E",
            "#FFCA3A",
            "#8AC926",
            "#1982C4",
            "#6A4C93",
            "#FF6F91",
            "#FFD93D",
          ]}
          confettiSource={{
            x: 0,
            y: 64, // start dropping just below navbar (h-16)
            w: getSectionDimensions().width,
            h: 0,
          }}
        />
      )}
    </section>
  );
};

export default Section2;
