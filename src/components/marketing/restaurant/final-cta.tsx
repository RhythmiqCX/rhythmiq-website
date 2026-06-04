import Link from "next/link";
import Reveal from "./reveal";
import { BOOK_DEMO_URL, CONTACT_URL } from "@/constants/links";

const FinalCTA = () => {
  return (
    <section className="section bg-paper2 text-center" aria-label="Get started">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow justify-center">Get started</span>
          <h2 className="h-display mt-[18px]">
            Never miss
            <br />
            another call.
          </h2>
          <div className="flex gap-3 justify-center flex-wrap mt-7">
            <Link href={BOOK_DEMO_URL} className="btn btn-accent">
              Start free trial
            </Link>
            <Link href={CONTACT_URL} className="btn btn-ghost">
              Talk to sales <span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTA;
