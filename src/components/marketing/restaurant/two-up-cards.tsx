import Link from "next/link";
import Reveal from "./reveal";
import { GuestTextMockup, InsightsMockup } from "./mockups";
import { DEMO_URL } from "@/constants/links";

const CARDS = [
  {
    Art: GuestTextMockup,
    title: "Easy for guests, less work for your team",
    body: "Callers get a warm, natural conversation with no menus to press. Your team gets every booking, note, and order pushed straight into the tools they already use.",
  },
  {
    Art: InsightsMockup,
    title: "Insights from across every call",
    body: "See what guests ask for most, when you are missing covers, and which nights need more hands, all pulled from thousands of real calls.",
  },
];

const TwoUpCards = () => {
  return (
    <section className="section-tight" aria-label="Highlights">
      <div className="wrap grid md:grid-cols-2 gap-6 lg:gap-9">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.12}>
            <card.Art className="mb-5" />
            <h3 className="h-feature mb-2">{card.title}</h3>
            <p className="text-ink2 text-[15.5px] mb-3.5 max-w-[44ch]">{card.body}</p>
            <Link href={DEMO_URL} className="link-arrow">
              Learn more <span className="arrow">→</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default TwoUpCards;
