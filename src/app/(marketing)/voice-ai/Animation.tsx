'use client';
import React, { useState, useEffect } from "react";

const AnimatedGradientButton = () => {
  const [time, setTime] = useState(0);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure client-only rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + (buttonHovered ? 0.03 : 0.06)); 
      // 🔹 fast when not hovered, slow when hovered
    }, 50);
    return () => clearInterval(interval);
  }, [buttonHovered]);

  const handleScrollToDemo = () => {
    const demoSection = document.getElementById("voice-demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 🔹 Pixel grid background generator
  const generatePixels = () => {
    const pixels = [];
    const gridSize = 5; // smaller squares = bigger grid

    for (let i = 0; i < gridSize * gridSize; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;

      // Coral-family hues (warm reds/oranges) to match the paper brand accent
      const hue1 = 8 + (Math.sin(time + row * 0.4 + col * 0.3) * 0.5 + 0.5) * 26;
      const hue2 = 14 + (Math.sin(time + row * 0.3 + col * 0.5) * 0.5 + 0.5) * 24;
      const saturation = 62 + Math.sin(time + i * 0.1) * 10;
      const lightness = 60 + Math.sin(time * 2 + i * 0.2) * 10;

      pixels.push(
        <div
          key={i}
          className="absolute transition-all duration-700"
          style={{
            left: `${(col / gridSize) * 100}%`,
            top: `${(row / gridSize) * 100}%`,
            width: `${100 / gridSize}%`,
            height: `${100 / gridSize}%`,
            background: `linear-gradient(${45 + time * 10}deg,
              hsl(${hue1}, ${saturation}%, ${lightness}%),
              hsl(${hue2}, ${saturation + 6}%, ${lightness + 8}%))`,
            opacity: buttonHovered ? 0.85 : 0.7,
            transform: `scale(${buttonHovered ? 1.05 : 1})`,
          }}
        />
      );
    }
    return pixels;
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-full min-w-[800px] max-w-[1000px] h-[400px] md:w-[400px] overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]">

        <div className="absolute inset-0">{mounted && generatePixels()}</div>

        {/* Soft light wash to keep the surface on-brand and readable */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center,
              rgba(250,248,243,0.35) 0%,
              rgba(250,248,243,0.55) 100%)`,
          }}
        />

        {/* Center content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <button
            onClick={handleScrollToDemo}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            className="group relative px-12 py-6 rounded-full transition-all duration-500 transform hover:scale-105 active:scale-95"
            style={{
              background: buttonHovered ? "#C9461F" : "#E8643C",
              boxShadow: buttonHovered
                ? "0 18px 40px -18px rgba(232,100,60,0.7)"
                : "0 10px 24px -14px rgba(25,24,20,0.35)",
              transition: "all 0.6s ease-in-out",
            }}
          >
            <span
              className="relative z-10 text-lg font-semibold tracking-wide"
              style={{
                color: "#ffffff",
                letterSpacing: buttonHovered ? "0.1em" : "0.05em",
                transition: "all 0.3s ease-in-out",
              }}
            >
              CHAT NOW
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedGradientButton;
