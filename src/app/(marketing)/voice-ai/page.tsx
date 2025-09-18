import React from "react";
import Hero from "./Hero";
import VoiceChatDemo from "./VoiceChatDemo";
import AnimatedGradientButton from "./Animation";
const VoiceAIApp = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section
        id="hero"
      >
        <Hero />
      </section>
      <br />
      {/* VoiceChatDemo Section */}
      <section
        id="voice-demo"
      >
        <VoiceChatDemo />
      </section>
    </div>
  );
};

export default VoiceAIApp;
