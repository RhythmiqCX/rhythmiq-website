'use client';
import HeroSection from "./hero";
import Carousel from "./carousel";
import Demo from "./demo";
import IntegrationSection from "./integration";
import UseCasesTestimonials from "./use";
import ScrollSnapLayout from "./section2";
// export to a diff file
const featureCards = [
  {
    image: "/images/support.png",
    title: "24/7 Support",
    description: "AI handles customer queries instantly, anytime.",
  },
  {
    image: "/images/crm.png",
    title: "Seamless CRM Integration",
    description: "Connects with your existing workflow effortlessly.",
  },
  {
    image: "/images/analytics.png",
    title: "Smart Analytics",
    description: "Track and optimize performance with insights.",
  },
  {
    image: "/images/security.png",
    title: "lorem ipsum1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: "/images/security.png",
    title: "lorem ipsum2",
    description: "Your data stays safe with industry-leading protection.",
  },
  {
    image: "/images/security.png",
    title: "Enterprise Security3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
export default function Home() {
  return (
    <main className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* Hero Section */}
      <section
        id="section1"
        className="h-screen w-full flex flex-col items-center justify-center bg-background px-6 py-20 snap-start text-white"
      >
      <HeroSection></HeroSection>
      </section>

      {/* SECTION 2 */}
      <ScrollSnapLayout />

      <UseCasesTestimonials/>

{/* Final CTA + Footer */}
<section
  id="section5"
  className="h-[50vh] w-full flex flex-col justify-center bg-black text-white px-6 snap-start"
>
  <div className="max-w-5xl mx-auto text-center py-20">
    <h2 className="text-3xl font-semibold mb-6">Ready to Get Started?</h2>
    <p className="text-gray-300 mb-8">
      Add your final call to action here.
    </p>
    <button className="px-8 py-4 bg-white text-black rounded-xl font-semibold shadow-lg hover:opacity-90">
      Start Free Trial
    </button>
  </div>
</section>
    </main>
  );
}
