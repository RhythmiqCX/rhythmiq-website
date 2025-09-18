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

      const hue1 = (time * 30 + row * 10 + col * 15) % 360;
      const hue2 = (time * 40 + row * 20 + col * 10 + 180) % 360;
      const saturation = 70 + Math.sin(time + i * 0.1) * 20;
      const lightness = 50 + Math.sin(time * 2 + i * 0.2) * 15;

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
              hsl(${hue2}, ${saturation + 10}%, ${lightness + 10}%))`,
            opacity: buttonHovered ? 0.9 : 0.8,
            transform: `scale(${buttonHovered ? 1.05 : 1})`,
          }}
        />
      );
    }
    return pixels;
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-full min-w-[800px] max-w-[1000px] h-[400px] md:w-[400px] overflow-hidden rounded-2xl shadow-2xl">
        
        <div className="absolute inset-0">{mounted && generatePixels()}</div>

        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, 
              transparent 0%, 
              rgba(0,0,0,0.25) 100%)`,
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
              background: buttonHovered
                ? "linear-gradient(135deg, #ffffff, #f5f5f5)"
                : "#ffffff",
              boxShadow: buttonHovered
                ? "0 0 35px rgba(255,255,255,0.7), 0 0 70px rgba(0,0,0,0.5)"
                : "0 6px 20px rgba(0,0,0,0.25)",
              transition: "all 0.6s ease-in-out",
            }}
          >
            {/* Mirrored Glow (only outside) */}
            <div
              className="absolute -inset-1 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(${((time * (buttonHovered ? 120 : 40)) + 180) % 360}, 75%, 60%), 
                  hsl(${((time * (buttonHovered ? 120 : 40)) + 300) % 360}, 75%, 60%)
                )`,
                filter: "blur(20px)",
                zIndex: -1,
                transition: "all 0.6s ease-in-out",
              }}
            />
            <span
              className="relative z-10 text-lg font-semibold tracking-wide"
              style={{
                color: "#000000",
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
