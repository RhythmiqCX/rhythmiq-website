import Link from "next/link";
import Reveal from "./reveal";
import { KnowledgeMockup } from "./mockups";
import { DEMO_URL } from "@/constants/links";

const AIWorkspace = () => {
  return (
    <section className="section" id="how-it-works" aria-label="AI workspace">
      <div className="wrap grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-20 items-center">
        <Reveal>
          <span className="eyebrow">The voice that works your order queue</span>
          <h2 className="h-section mt-3.5 mb-4">
            An AI agent trained on your catalogue, your policies, your voice
          </h2>
          <p className="lede mb-[22px] max-w-[46ch]">
            Connect your catalogue, return policy, and order data once. Rhythmiq learns the SKUs,
            knows which items are exchange-eligible, and never offers a swap it can&rsquo;t keep.
          </p>
          <Link href={DEMO_URL} className="link-arrow">
            See how it learns <span className="arrow">→</span>
          </Link>
        </Reveal>
        <Reveal delay={0.12}>
          <KnowledgeMockup />
        </Reveal>
      </div>
    </section>
  );
};

export default AIWorkspace;
