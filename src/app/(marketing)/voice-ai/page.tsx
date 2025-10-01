import React from "react";
import Hero from "./Hero";
import CallToAction from "./CallToAction";
import VoiceChatDemo from "./VoiceChatDemo";
import VoiceAICustomerSupport from "./Features";
import VoiceAIFeatures from "../../../components/marketing/VoiceAIFeatures";
// Improved copy object
const featuresObject = [
  {
    section1Subheading: "Always Available",
    section1Heading: "24/7 Instant Support",
    section1Content:
      "Our AI voice assistant responds instantly to customers anytime, handling queries without delays or human intervention.",
  },
  {
    section1Subheading: "Human-Like Interaction",
    section1Heading: "Natural Conversations",
    section1Content:
      "Deliver engaging, empathetic responses that make every interaction feel personal and human.",
  },
  {
    section1Subheading: "Effortless Handoff",
    section1Heading: "Smart Call Routing",
    section1Content:
      "Automatically route complex queries to human agents while your AI handles FAQs seamlessly.",
  },
];

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
        <VoiceAICustomerSupport />
        <VoiceAIFeatures section2= {true} section1Content={featuresObject[0].section1Content} section1Heading={featuresObject[0].section1Heading} section1Subheading={featuresObject[0].section1Subheading} section2Content={featuresObject[1].section1Content} section2Heading={featuresObject[1].section1Heading} section2Subheading={featuresObject[1].section1Subheading} imageUrl1="images/mic.gif" imageUrl2="images/ai-assistant.gif"/>
        <VoiceAIFeatures section1Content={featuresObject[2].section1Content} section1Heading={featuresObject[2].section1Heading} section1Subheading={featuresObject[2].section1Subheading} imageUrl1="images/third.gif"/>
        <CallToAction />
      </section>
    </div>
  );
};

export default VoiceAIApp;
