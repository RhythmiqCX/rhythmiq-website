"use client";

import Link from "next/link";
import Container from "@/components/global/container";

const ToolsCTA = () => {
  return (
    <Container className="mt-20 max-w-4xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-dark text-onDark p-8 md:p-12 text-center">
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
          <h3 className="h-feature text-onDark">
            Ready for the full experience?
          </h3>
          <p className="text-onDark2 text-lg">
            These tools are just the beginning. Unlock the full potential of
            AI-driven support with Rhythmiq&apos;s complete platform.
          </p>
          <Link
            href="https://calendly.com/ray-rhythmiqcx/30min"
            className="btn btn-accent"
          >
            Book a Demo <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ToolsCTA;
