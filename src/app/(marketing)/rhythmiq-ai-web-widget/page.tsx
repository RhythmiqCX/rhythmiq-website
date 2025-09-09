"use client";

import HeroSection from "./hero";
import ImpactStats from "./stats";
import UseCasesTestimonials from "./use";
import Section2 from "./section2";
import AnimatedSection from "./scrollanimation"; // 👈 new wrapper component

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth overscroll-none">
      {/* Hero Section */}
      <AnimatedSection disableOnMobile={true}>
        <HeroSection />
      </AnimatedSection>

      {/* Impact Stats */}
      <AnimatedSection>
        <ImpactStats />
      </AnimatedSection>

      {/* System / Integration / Technology - split into distinct full-screen sections */}
      <AnimatedSection>
        <Section2 />
      </AnimatedSection>

      {/* Use Cases */}
      <AnimatedSection>
        <UseCasesTestimonials />
      </AnimatedSection>

      {/* Final CTA + Footer */}
      <AnimatedSection height="min-h-[60vh] sm:min-h-[50vh]">
        <section className="w-full flex flex-col justify-center bg-background/80 text-white px-4 sm:px-6 lg:px-12 overflow-x-hidden">
          <div className="max-w-5xl mx-auto text-center py-12 sm:py-16 lg:py-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-8 text-base sm:text-lg lg:text-xl">
              Add your final call to action here.
            </p>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-xl font-semibold shadow-lg hover:opacity-90 transition">
              Start Free Trial
            </button>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
