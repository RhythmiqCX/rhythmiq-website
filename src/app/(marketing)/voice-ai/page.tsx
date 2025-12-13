import React from "react";
import Hero from "./Hero";
import CallToAction from "./CallToAction";
import VoiceChatDemo from "./VoiceChatDemo";
// import VoiceAICustomerSupport from "./Features";
import VoiceAIFeatures from "../../../components/marketing/VoiceAIFeatures";
// Improved copy object

const voiceAIItems = [
  {
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcm1kc3F1ZmZqNjN1ZjJndGo5NGYxdHA0aXEzM2NxZm9icjJyaTdndiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MbMBoPpI3MS44vkUTS/giphy.gif",
    text: "Voice Cloning",
  },
  {
    image:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTM1djg2b3Zja2NqeW93aDJvNW1obmw4djBrcnBlam01eTdmajdzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MeQ0kQLyqWL5XOsNf7/giphy.gif",
    text: "Neural TTS",
  },
  {
    image:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXp1Z2dxemRuZTV5M3hnbzRldm96ZDZnNDdjYTQ0eGJ5bXgzYzN0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LQv4IGmdZAF7TmMJEa/giphy.gif",
    text: "Real-time Synthesis",
  },
  {
    image:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHhsM2dxNm14ZnM4bXN6aHg3ejNlMDZ6M2tjdDJ6YXRjcmVpZnp4aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ToMjGpDvCkRu9lHREUE/giphy.gif",
    text: "API Integration",
  },
  {
    image:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTl3YWVxN2ZwbWdzcnZweHhmYWFrYWE2MHZ2OHhwYXE3NXc1b3ZsZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fsnTLgZFfWgHmxqQTk/giphy.gif",
    text: "GPU Acceleration",
  },
  {
    image:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzZ4cGFuMzR6dmd2eHF2dmpzeDVoMWswN2hsZGRoYjRueWphNjMzdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/b0HYKHINjL32qEsoJt/giphy.gif",
    text: "Customization",
  },
  {
    image:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXM4dTZjNXFrZzh5dXIyYmwwdGptNWlzYmVhZTV0c3RrbTAzaXVqaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/StcrDoMb4eSXn80J0J/giphy.gif",
    text: "Voice Calls",
  },
  {
    image:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcno2eGR6N2NxN2oxNXN6dmV6bXpldG4wYWc5YTBpeHd3OWtmNjNleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT1Ra12a03lcpJf5C0/giphy.gif",
    text: "Conversation AI",
  },
];
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
      <section id="hero">
        <Hero />
      </section>
      <br />
      {/* VoiceChatDemo Section */}
      <section id="voice-demo" className="scroll-mt-16">
        <VoiceChatDemo />

        {/* <div style={{ height: '600px', position: 'relative' }}>
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} items={voiceAIItems}/>
        </div> */}

        <VoiceAIFeatures
          section2={true}
          section1Content={featuresObject[0].section1Content}
          section1Heading={featuresObject[0].section1Heading}
          section1Subheading={featuresObject[0].section1Subheading}
          section2Content={featuresObject[1].section1Content}
          section2Heading={featuresObject[1].section1Heading}
          section2Subheading={featuresObject[1].section1Subheading}
          imageUrl1="images/mic_3.gif"
          imageUrl2="images/ai-voice-unscreen.gif"
        />
        <VoiceAIFeatures
          section1Content={featuresObject[2].section1Content}
          section1Heading={featuresObject[2].section1Heading}
          section1Subheading={featuresObject[2].section1Subheading}
          imageUrl1="images/thirdimg1-unscreen.gif"
        />
        <CallToAction />
      </section>
    </div>
  );
};

export default VoiceAIApp;
