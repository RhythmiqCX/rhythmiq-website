import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="w-full flex flex-col justify-center px-6 lg:px-16 py-20 bg-paper2">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col justify-center items-center">
        {/* Subheading */}
        <span className="eyebrow justify-center mb-3">Don’t Miss Out</span>

        {/* Heading */}
        <h2 className="h-section text-ink mb-4">
          Ready to Experience the Future of Support?
        </h2>

        {/* Content */}
        <p className="lede mb-8 max-w-2xl">
           From automating routine calls to empowering live agents,
           Rhythmiq ensures seamless, 24/7 support that keeps your business in perfect rhythm with your customers.
        </p>

        {/* CTA Button */}
        <Link
          href="https://calendly.com/ray-rhythmiqcx/30min"
          className="btn btn-accent"
        >
          Schedule a Free Demo <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
