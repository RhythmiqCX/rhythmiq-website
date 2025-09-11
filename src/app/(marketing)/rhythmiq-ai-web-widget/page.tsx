"use client";
import Link from "next/link";
import HeroSection from "./hero";
import ImpactStats from "./stats";
import UseCasesTestimonials from "./use";
import Section2 from "./section2";
import AnimatedSection from "./scrollanimation"; // 👈 new wrapper component

export default function Home() {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden">
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
      <AnimatedSection>
        <section className="w-full flex flex-col justify-center bg-background/80 text-white px-4 sm:px-6 lg:px-12 overflow-x-hidden">
          <div className="max-w-5xl mx-auto text-center py-12 sm:py-16 lg:py-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-8 text-base sm:text-lg lg:text-xl">
              Enter a new era of customer support with Rhythmiq AI. Take a free demo , no credit card required.
            </p>
            <Link href="https://calendly.com/ray-rhythmiqcx/30min">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-xl font-semibold shadow-lg hover:opacity-90 transition">
              Schedule a Free Demo
            </button>
            </Link>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
