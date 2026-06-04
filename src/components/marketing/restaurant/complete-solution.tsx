import Link from "next/link";
import Reveal from "./reveal";
import Placeholder from "./placeholder";
import { BOOK_DEMO_URL, DEMO_URL } from "@/constants/links";

const CompleteSolution = () => {
  return (
    <section className="section bg-paper2" aria-label="Complete solution">
      <div className="wrap grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
        <Reveal>
          <span className="eyebrow">Front of house, automated</span>
          <h2 className="h-section mt-3.5 mb-4">
            A complete solution for <span className="text-coral">the phone and the floor</span>
          </h2>
          <p className="lede mb-[22px] max-w-[46ch]">
            Rhythmiq picks up on the first ring, every time. It books tables, takes orders, answers the
            questions guests actually ask, and hands the rest to your team — so no call goes to voicemail
            and no cover is lost.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link href={BOOK_DEMO_URL} className="btn btn-dark">
              Start free trial
            </Link>
            <Link href={DEMO_URL} className="btn btn-ghost">
              Watch demo <span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="frame frame-light p-[30px]">
          <Placeholder tint="coral" tag="abstract line illustration" className="aspect-square rounded-[14px]" />
        </Reveal>
      </div>
    </section>
  );
};

export default CompleteSolution;
