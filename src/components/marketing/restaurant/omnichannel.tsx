import Reveal from "./reveal";
import { InboxMockup } from "./mockups";

const CHANNELS: { name: string; icon: React.JSX.Element }[] = [
  {
    name: "Phone",
    icon: (
      <path
        d="M3 3c0 6 4 10 10 10l-1.5-2.5-2 .8C7.8 10.6 5.4 8.2 4.7 6.5l.8-2L3 3z"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "SMS",
    icon: (
      <>
        <rect x="2.5" y="3.5" width="11" height="8" rx="2" stroke="#fff" strokeWidth="1.2" />
        <path d="M8 11.5V14l2.2-2.5" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </>
    ),
  },
  {
    name: "Web chat",
    icon: (
      <>
        <circle cx="8" cy="8" r="5.5" stroke="#fff" strokeWidth="1.2" />
        <path d="M2.5 8h11M8 2.5c2 2 2 9 0 11M8 2.5c-2 2-2 9 0 11" stroke="#fff" strokeWidth="1.2" />
      </>
    ),
  },
  {
    name: "WhatsApp",
    icon: (
      <path
        d="M8 2.5a5.5 5.5 0 00-4.7 8.3L2.5 13.5l2.8-.8A5.5 5.5 0 108 2.5z"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "Booking widget",
    icon: (
      <>
        <rect x="2.5" y="2.5" width="11" height="11" rx="2.5" stroke="#fff" strokeWidth="1.2" />
        <path d="M2.5 6h11M6 2.5v11" stroke="#fff" strokeWidth="1.2" />
      </>
    ),
  },
];

const Omnichannel = () => {
  return (
    <section className="section bg-paper2" aria-label="Omnichannel">
      <div className="wrap grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-[72px] items-center">
        <Reveal>
          <span className="eyebrow">One host, every channel</span>
          <h2 className="h-section my-3.5">Meet guests wherever they reach you</h2>
          <p className="lede max-w-[46ch]">
            Phone, SMS, web chat, WhatsApp, and your booking widget. Rhythmiq answers on all of them
            with one voice and one shared memory.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            {CHANNELS.map((ch) => (
              <span className="ch" key={ch.name}>
                <span className="ic">
                  <svg className="w-[15px] h-[15px]" viewBox="0 0 16 16" fill="none" aria-hidden>
                    {ch.icon}
                  </svg>
                </span>
                {ch.name}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <InboxMockup />
        </Reveal>
      </div>
    </section>
  );
};

export default Omnichannel;
