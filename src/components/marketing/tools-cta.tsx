"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/global/container";

const ToolsCTA = () => {
  return (
    <Container className="mt-20 max-w-4xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm p-8 md:p-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
          <h3 className="text-3xl font-heading font-bold">
            Ready for the full experience?
          </h3>
          <p className="text-muted-foreground text-lg">
            These tools are just the beginning. Unlock the full potential of
            AI-driven support with Rhythmiq&apos;s complete platform.
          </p>
          <Link href="https://calendly.com/ray-rhythmiqcx/30min">
            <Button
              size="lg"
              className="rounded-full px-8 h-12 text-base shadow-xl shadow-primary/20"
            >
              Book a Demo
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ToolsCTA;
