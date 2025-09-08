"use client";

import * as React from "react";
import Carousel from "./carousel";

export default function UseCasesTestimonials() {
  const useCases = [
    {
      image: "/images/lead-gen.png",
      title: "Lead Capture & Qualification",
      description:
        "Automatically greet visitors, collect contact details, and qualify leads 24/7—no missed opportunities, even outside business hours.",
    },
    {
      image: "/images/24-7-support.png",
      title: "24/7 Customer Support",
      description:
        "Instant answers to FAQs like shipping, returns, and account questions—reducing support tickets while boosting customer satisfaction.",
    },
    {
      image: "/images/ecom.png",
      title: "E-commerce Assistance",
      description:
        "Guide customers to the right products, check stock availability, and handle order tracking in real time.",
    },
    {
      image: "/images/saas.jpg",
      title: "SaaS Onboarding",
      description:
        "Walk new users through your platform, answer setup questions, and reduce churn with proactive onboarding support.",
    },
    {
      image: "/images/appointment.png",
      title: "Appointment Booking",
      description:
        "Seamlessly integrate with calendars to schedule demos, consultations, or service appointments without human intervention.",
    },
    {
      image: "/images/feedback.jpg",
      title: "Feedback & Surveys",
      description:
        "Collect customer feedback in the flow of conversation, making it effortless to understand user sentiment and improve experiences.",
    },
  ];

  return (
    <section
      id="section4"
      className="h-screen w-full flex flex-col justify-center bg-background/80 text-white px-6 snap-start"
    >
      <div className="max-w-7xl mx-auto text-center flex flex-col justify-center h-full">
        <h2 className="text-2xl font-semibold mb-6 text-violet-500">Use Cases</h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-200">
          RhythmiqCX makes customer engagement effortless across industries.
          From automating support to capturing leads, our AI-powered chatbots
          handle the conversations that matter most so your team can focus on
          growth.
        </p>

        {/* Custom Carousel */}
        <Carousel cards={useCases} />
      </div>
    </section>
  );
}
