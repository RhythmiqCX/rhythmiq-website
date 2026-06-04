import type { CSSProperties } from "react";
import { cn } from "@/lib";

/**
 * Real HTML/CSS product mockups (replacing the old SVG "screenshots"). They are
 * composed from the same paper primitives the live ProductShowcase window uses
 * (`.win`, `.transcript`, `.bubble`, `.tagpill`, `.stats`, `.bars`, `.wave`) so
 * everything reads as one product. Server components, no client JS; the only
 * motion is the CSS `.wave`/`.live` pulse already defined in globals.css.
 */

const Win = ({
  addr,
  className,
  children,
}: {
  addr: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("win", className)}>
    <div className="win-bar">
      <div className="win-dots">
        <i />
        <i />
        <i />
      </div>
      <span className="addr">{addr}</span>
    </div>
    {children}
  </div>
);

/* tiny inline glyphs (1.4px stroke, currentColor) */
const Glyph = ({ d }: { d: string }) => (
  <svg viewBox="0 0 16 16" className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

const ICON = {
  menu: "M3 4h10M3 8h10M3 12h6",
  clock: "M8 3v5l3 2M8 14A6 6 0 108 2a6 6 0 000 12z",
  doc: "M4 2h5l3 3v9H4zM9 2v3h3",
  faq: "M6 6a2 2 0 113 1.7c-.6.4-1 .8-1 1.6M8 12h.01",
  phone: "M3 3c0 6 4 10 10 10l-1.5-2.6-2 .7C7.7 10.4 5.6 8.3 4.9 6.5l.7-2L3 3z",
  sms: "M2.5 4h11v7h-7l-2.5 2.2V11h-1.5z",
  whatsapp: "M8 2.5a5.5 5.5 0 00-4.7 8.3L2.5 13.5l2.8-.8A5.5 5.5 0 108 2.5z",
  web: "M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2.5 8h11M8 2.5c2 2.2 2 8.8 0 11M8 2.5c-2 2.2-2 8.8 0 11",
};

/* ---------- 1. Knowledge base (AIWorkspace) ---------- */

const SOURCES = [
  { icon: ICON.menu, name: "Dinner & wine menu", meta: "Updated 2h ago · 64 items", tag: "ok" as const, label: "Live" },
  { icon: ICON.clock, name: "Hours & holidays", meta: "Open late Fri–Sat", tag: "ok" as const, label: "Live" },
  { icon: ICON.doc, name: "Reservation policy", meta: "Parties of 6+ · deposit", tag: "ok" as const, label: "Live" },
  { icon: ICON.faq, name: "Top guest questions", meta: "48 answers learned", tag: "new" as const, label: "Learning" },
];

export const KnowledgeMockup = ({ className }: { className?: string }) => (
  <Win addr="rhythmiq · knowledge" className={className}>
    <div className="p-[18px]">
      <div className="flex items-center justify-between mb-3.5">
        <h4 className="text-[15px] font-semibold">Trained on your restaurant</h4>
        <span className="font-mono text-[11px] text-coral bg-coralSoft px-2.5 py-1 rounded-full">auto-updated</span>
      </div>
      <div className="flex flex-col gap-2">
        {SOURCES.map((s) => (
          <div key={s.name} className="flex items-center gap-3 rounded-[10px] bg-white px-3 py-2.5 border border-ink/10">
            <span className="w-8 h-8 rounded-[8px] grid place-items-center bg-paper2 text-coral flex-none">
              <Glyph d={s.icon} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] font-semibold text-ink leading-tight">{s.name}</div>
              <div className="text-[12px] text-ink3 mt-0.5">{s.meta}</div>
            </div>
            <span className={`tagpill ${s.tag}`}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[12.5px] text-ink3 mt-3.5">
        <span className="w-[7px] h-[7px] rounded-full bg-coral flex-none" />
        Rhythmiq only answers with what you have approved.
      </div>
    </div>
  </Win>
);

/* ---------- 2. Analytics (SelfImproving) ---------- */

const ANALYTICS_BARS = ["46%", "62%", "53%", "78%", "67%", "92%", "84%"];

export const AnalyticsMockup = ({ className }: { className?: string }) => (
  <Win addr="rhythmiq · analytics" className={className}>
    <div className="p-[18px]">
      <div className="app-head">
        <h4>This month</h4>
        <span className="chip">Last 30 days</span>
      </div>
      <div className="stats">
        <div className="stat">
          <div className="k">Calls answered</div>
          <div className="v">5,120</div>
          <div className="d">100% · 0 missed</div>
        </div>
        <div className="stat">
          <div className="k">Tables booked</div>
          <div className="v">1,284</div>
          <div className="d">+18% vs last mo</div>
        </div>
        <div className="stat">
          <div className="k">After hours</div>
          <div className="v">37%</div>
          <div className="d">won back</div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink3">Calls answered / day</span>
        <span className="font-mono text-[10.5px] text-ink3">Mon–Sun</span>
      </div>
      <div className="bars" aria-hidden>
        {ANALYTICS_BARS.map((h, i) => (
          <i key={i} style={{ "--h": h } as CSSProperties} />
        ))}
      </div>
    </div>
  </Win>
);

/* ---------- 3. Insights (TwoUpCards, right) ---------- */

const REQUESTS = [
  { label: "Reservations", pct: 62 },
  { label: "Hours & menu", pct: 24 },
  { label: "Takeout orders", pct: 14 },
];

export const InsightsMockup = ({ className }: { className?: string }) => (
  <Win addr="rhythmiq · insights" className={className}>
    <div className="p-[18px]">
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink3">Calls answered</div>
          <div className="text-[34px] font-semibold tracking-[-0.03em] leading-none mt-1">1,284</div>
        </div>
        <span className="tagpill ok mb-1">▲ 18% this week</span>
      </div>
      <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink3 mb-2">What guests ask for</div>
      <div className="flex flex-col gap-2.5">
        {REQUESTS.map((r, i) => (
          <div key={r.label}>
            <div className="flex justify-between text-[12.5px] mb-1">
              <span className="font-semibold text-ink">{r.label}</span>
              <span className="text-ink3 font-mono">{r.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-paper2 overflow-hidden">
              <div
                className={i === 0 ? "h-full rounded-full bg-coral" : "h-full rounded-full bg-ink/25"}
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </Win>
);

/* ---------- 4. Auto-confirmation messages (TwoUpCards, left) ---------- */

export const GuestTextMockup = ({ className }: { className?: string }) => (
  <Win addr="rhythmiq · messages" className={className}>
    <div className="p-[18px]">
      <div className="app-head">
        <h4>Auto-confirmation</h4>
        <span className="live">Texting guest</span>
      </div>
      <div className="transcript">
        <div className="bubble caller">
          <small>Guest · SMS</small>Can I move my 7pm to 8 tonight?
        </div>
        <div className="bubble ai">
          <small>Rhythmiq</small>Done. Your table for 4 is now at <span className="hl">8:00 PM</span> tonight. See you then.
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3.5">
        <span className="tagpill ok">Booking updated</span>
        <span className="text-[12px] text-ink3">synced to your reservation book</span>
      </div>
    </div>
  </Win>
);

/* ---------- 5. Live call composer (ResolveFaster) ---------- */

const RESOLVE_WAVE = [0, 0.12, 0.26, 0.4, 0.16, 0.32, 0.06, 0.5, 0.22, 0.36, 0.46, 0.1, 0.3, 0.42, 0.18, 0.34];

export const CallComposerMockup = ({ className }: { className?: string }) => (
  <Win addr="rhythmiq · live call" className={className}>
    <div className="p-[18px]">
      <div className="app-head">
        <h4>Incoming call · +1 (415) 555-0148</h4>
        <span className="live">On call · 00:48</span>
      </div>
      <div className="transcript">
        <div className="bubble caller">
          <small>Caller</small>Are you open on Sunday, and can I bring a dog on the patio?
        </div>
        <div className="bubble ai">
          <small>Rhythmiq</small>We are. We open at <span className="hl">10 AM Sunday</span>, and dogs are welcome on the patio. Want me to hold a table?
        </div>
        <div className="bubble caller">
          <small>Caller</small>Yes please, two of us at noon.
        </div>
      </div>
      <div className="wave mt-2.5" aria-hidden>
        {RESOLVE_WAVE.map((d, i) => (
          <i key={i} style={{ animationDelay: `${d}s` }} />
        ))}
      </div>
    </div>
  </Win>
);

/* ---------- 6. Unified inbox (Omnichannel) ---------- */

const INBOX = [
  { icon: ICON.phone, channel: "Phone", who: "Table for 4 tonight", snip: "Booked for 8:00 PM", tag: "ok" as const, label: "Booked", time: "now", on: true },
  { icon: ICON.sms, channel: "SMS", who: "Moving my reservation", snip: "7:00 → 8:00 PM", tag: "new" as const, label: "Updated", time: "2m" },
  { icon: ICON.whatsapp, channel: "WhatsApp", who: "Any vegan mains?", snip: "Shared 3 dishes", tag: "ok" as const, label: "Answered", time: "8m" },
  { icon: ICON.web, channel: "Web chat", who: "Pickup order", snip: "Pushed to POS", tag: "ok" as const, label: "Sent", time: "12m" },
];

export const InboxMockup = ({ className }: { className?: string }) => (
  <Win addr="rhythmiq · inbox" className={className}>
    <div className="p-[18px]">
      <div className="app-head">
        <h4>All conversations</h4>
        <span className="chip">one shared memory</span>
      </div>
      <div className="flex flex-col gap-2">
        {INBOX.map((row) => (
          <div
            key={row.channel}
            className={cn(
              "flex items-center gap-3 rounded-[10px] px-3 py-2.5 border",
              row.on ? "bg-white border-coral/40" : "bg-white/60 border-ink/10"
            )}
          >
            <span className="w-8 h-8 rounded-[8px] grid place-items-center bg-ink text-white flex-none">
              <Glyph d={row.icon} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink3">{row.channel}</span>
                <span className="text-[11px] text-ink3">· {row.time}</span>
              </div>
              <div className="text-[13.5px] font-semibold text-ink leading-tight truncate">{row.who}</div>
              <div className="text-[12px] text-ink3 truncate">{row.snip}</div>
            </div>
            <span className={`tagpill ${row.tag}`}>{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  </Win>
);

/* ---------- Mini booking card (hero strip flourish) ---------- */

export const MiniBookingCard = ({ className }: { className?: string }) => (
  <div className={cn("relative overflow-hidden grid place-items-center p-3 bg-paper3", className)}>
    <div className="w-full max-w-[150px] rounded-[12px] bg-white border border-ink/10 shadow-[0_12px_24px_-18px_rgba(25,24,20,0.5)] p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-6 h-6 rounded-full bg-coral text-white grid place-items-center flex-none">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 8.5l3 3 7-7" />
          </svg>
        </span>
        <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink3">Booked</span>
      </div>
      <div className="text-[14px] font-semibold text-ink leading-tight">Table for 4</div>
      <div className="text-[12px] text-ink3 mt-0.5">Tonight · 8:00 PM</div>
      <span className="tagpill ok mt-2.5 inline-block">Confirmed</span>
    </div>
  </div>
);
