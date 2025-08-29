"use client";

import React from "react";

export default function AboutUs() {
  return (
    <main className="flex flex-col">
      {/* Hero section with gradient - limited scope like blog page */}
      <section className="py-20 bg-gradient-to-b from-blue-500/20 to-background text-center px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-5xl font-bold text-gray-200">About Us</h1>
        </div>
      </section>

      {/* Content section with plain background */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none">
              <p>
    At RhythmiqCX, we believe world-class customer support is the foundation of lasting business success. 
    Our mission is helping organizations of all sizes deliver experiences that delight customers and 
    strengthen loyalty. From seamless omnichannel service to cutting-edge automation and analytics, 
    we provide everything you need to support your customers with confidence.
  </p>
  <p>
    We are Engineers at heart, and that principle drives everything we do. We approach every challenge 
    with precision, creativity, and a problem-solving mindset to design solutions that are not only 
    effective today but scalable for tomorrow. Our dedication to quality engineering ensures reliability, 
    innovation, and long-term value for our clients.
  </p>
  <p>
    Our mission is to deliver the best customer support solutions. By combining technical 
    excellence with deep customer experience expertise, we create systems that are efficient, adaptable, 
    and impactful. Partner with us, and together we’ll transform the way you engage with your customers.
  </p>
          </div>
        </div>
      </section>
    </main>
  );
}
