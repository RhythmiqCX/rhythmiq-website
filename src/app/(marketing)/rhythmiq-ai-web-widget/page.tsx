"use client";
import Link from "next/link";
import HeroSection from "./hero";
import ImpactStats from "./stats";
import UseCasesTestimonials from "./use";
import Section2 from "./section2";

export default function Home() {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden">
      {/* Hero Section */}
        <HeroSection />
      

      {/* Impact Stats */}
      
        <ImpactStats />
      

      {/* System / Integration / Technology - split into distinct full-screen sections */}
      
        <Section2 />
      

      {/* Use Cases */}
      
        <UseCasesTestimonials />
      

      {/* Final CTA + Footer */}
  <section className="w-full flex flex-col justify-center bg-background/80 text-white px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
    <div className="max-w-3xl mx-auto text-center flex flex-col justify-center">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
        Ready to Get Started?
      </h2>
      <p className="text-gray-300 mb-4 text-sm sm:text-base lg:text-lg">
        Enter a new era of customer support with Rhythmiq AI. Take a free demo, no credit card required.
      </p>
      <Link href="https://calendly.com/ray-rhythmiqcx/30min">
        <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg font-semibold shadow-md hover:opacity-90 transition">
          Schedule a Free Demo
        </button>
      </Link>
    </div>
  </section>

    </main>
  );
}
