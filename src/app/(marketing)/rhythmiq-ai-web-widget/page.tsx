'use client';

import HeroSection from "./hero";
import ImpactStats from "./stats";
import UseCasesTestimonials from "./use";
import AIAgentSection from "./agents";
import IntegrationSection from "./integration";
import AiEngine from "./engine";
import AnimatedSection from "./scrollanimation"; // 👈 new wrapper component

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth overscroll-none">
      {/* Hero Section */}
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      {/* Impact Stats */}
      <AnimatedSection>
        <ImpactStats />
      </AnimatedSection>

      {/* System / Integration / Technology - split into distinct full-screen sections */}
      <AnimatedSection>
        <AIAgentSection />
      </AnimatedSection>
      <AnimatedSection>
        <IntegrationSection />
      </AnimatedSection>
      <AnimatedSection>
        <AiEngine />
      </AnimatedSection>

      {/* Use Cases */}
      <AnimatedSection>
        <UseCasesTestimonials />
      </AnimatedSection>

      {/* Final CTA + Footer */}
      <AnimatedSection height="h-[50vh]">
        <section className="w-full flex flex-col justify-center bg-black text-white px-6">
          <div className="max-w-5xl mx-auto text-center py-20">
            <h2 className="text-3xl font-semibold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8">
              Add your final call to action here.
            </p>
            <button className="px-8 py-4 bg-white text-black rounded-xl font-semibold shadow-lg hover:opacity-90 transition">
              Start Free Trial
            </button>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
