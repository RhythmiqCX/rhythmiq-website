import React from "react";
import Hero from "./Hero";
import CallToAction from "./CallToAction";
import VoiceChatDemo from "./VoiceChatDemo";
import VoiceAIFeatures from "../../../components/marketing/VoiceAIFeatures";
const featuresObject = [
  {
    "section1Subheading": "24/7 Availability",
    "section1Heading": "Always-On Support",
    "section1Content": "Provide instant responses to customers around the clock without the need for human agents."
  },
  {
    "section1Subheading": "Natural Conversations",
    "section1Heading": "Human-Like Interactions",
    "section1Content": "Engage customers with realistic, empathetic voice responses that feel like speaking to a live agent."
  },
  {
    "section1Subheading": "Smart Call Routing",
    "section1Heading": "Seamless Handoff",
    "section1Content": "Automatically route complex issues to human agents while handling FAQs and routine requests with AI."
  }
]

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
        className="scroll-mt-16"
      >
        <VoiceChatDemo />
        <VoiceAIFeatures section2= {true} section1Content={featuresObject[0].section1Content} section1Heading={featuresObject[0].section1Heading} section1Subheading={featuresObject[0].section1Subheading} section2Content={featuresObject[1].section1Content} section2Heading={featuresObject[1].section1Heading} section2Subheading={featuresObject[1].section1Subheading} imageUrl1="images/voice-ai-image1.jpg" imageUrl2="images/voice-ai-image2.jpg"/>
        <VoiceAIFeatures section1Content={featuresObject[2].section1Content} section1Heading={featuresObject[2].section1Heading} section1Subheading={featuresObject[2].section1Subheading} imageUrl1="images/voice-ai-image3.jpg"/>
        <CallToAction />
      </section>
    </div>
  );
};

export default VoiceAIApp;
