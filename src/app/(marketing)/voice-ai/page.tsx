import React from "react";
import Hero from "./Hero";
import CallToAction from "./CallToAction";
import VoiceChatDemo from "./VoiceChatDemo";
import VoiceAIFeatures from "../../../components/marketing/VoiceAIFeatures";
const featuresObject ={"s1":"Lorem","sh1":"Lorem","h1":"Lorem","c1":"Lorem","s2":"Lorem","sh2":"Lorem","h2":"Lorem","c2":"Lorem"}
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
        <VoiceAIFeatures section2= {true} section1Content={featuresObject.s1} section1Heading={featuresObject.s2} section1Subheading={featuresObject.c1} section2Content={featuresObject.c2} section2Heading={featuresObject.s1} section2Subheading={featuresObject.sh1}/>
        <VoiceAIFeatures section1Content={featuresObject.s1} section1Heading={featuresObject.s2} section1Subheading={featuresObject.c1}/>
        <CallToAction />
      </section>
    </div>
  );
};

export default VoiceAIApp;
