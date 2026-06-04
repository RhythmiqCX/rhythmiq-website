"use client";

import { useRef, useState, type CSSProperties } from "react";

type TabKey = "calls" | "reservations" | "orders" | "insights";

const TABS: { key: TabKey; label: string; sub: string; addr: string }[] = [
  { key: "calls", label: "Live calls", sub: "Real-time transcripts", addr: "app.rhythmiq.ai / live" },
  { key: "reservations", label: "Reservations", sub: "Bookings & waitlist", addr: "app.rhythmiq.ai / reservations" },
  { key: "orders", label: "Orders", sub: "Takeout & delivery", addr: "app.rhythmiq.ai / orders" },
  { key: "insights", label: "Insights", sub: "Call analytics", addr: "app.rhythmiq.ai / insights" },
];

const SIDE_ITEMS = ["Live calls", "Reservations", "Orders", "Voicemail"] as const;
const SIDE_MANAGE = ["Knowledge", "Insights", "Settings"] as const;

const ACTIVE_LABEL: Record<TabKey, string> = {
  calls: "Live calls",
  reservations: "Reservations",
  orders: "Orders",
  insights: "Insights",
};

function Sidebar({ active }: { active: TabKey }) {
  const activeLabel = ACTIVE_LABEL[active];
  return (
    <aside className="app-side">
      <div className="org">
        <span className="av" />
        <b>Osteria Lume</b>
      </div>
      {SIDE_ITEMS.map((item) => (
        <div key={item} className={`nav-item${item === activeLabel ? " is-on" : ""}`}>
          <span className="ic" />
          {item}
        </div>
      ))}
      <div className="grp-label">Manage</div>
      {SIDE_MANAGE.map((item) => (
        <div key={item} className={`nav-item${item === activeLabel ? " is-on" : ""}`}>
          <span className="ic" />
          {item}
        </div>
      ))}
    </aside>
  );
}

const WAVE_DELAYS = [0, 0.1, 0.25, 0.4, 0.15, 0.3, 0.05, 0.5, 0.2, 0.35, 0.45, 0.1, 0.28, 0.4, 0.18];

function CallsPanel() {
  return (
    <main className="app-main">
      <div className="app-head">
        <h4>Incoming call · +1 (415) 555‑0148</h4>
        <span className="live">On call · 01:12</span>
      </div>
      <div className="transcript">
        <div className="bubble caller">
          <small>Caller</small>Hi, do you have a table for four tonight around 7:30?
        </div>
        <div className="bubble ai">
          <small>Rhythmiq</small>Let me check. We have <span className="hl">7:15 or 8:00</span> for a party
          of four. Which works better?
        </div>
        <div className="bubble caller">
          <small>Caller</small>8 o&rsquo;clock is perfect. Under the name Marsh.
        </div>
        <div className="bubble ai">
          <small>Rhythmiq</small>Booked! Table for four at 8:00 PM under Marsh. I&rsquo;ve texted a
          confirmation. Anything else?
        </div>
      </div>
      <div className="wave" aria-hidden>
        {WAVE_DELAYS.map((d, i) => (
          <i key={i} style={{ animationDelay: `${d}s` }} />
        ))}
      </div>
    </main>
  );
}

function ReservationsPanel() {
  return (
    <main className="app-main">
      <div className="app-head">
        <h4>Tonight · 22 covers booked</h4>
        <span className="chip">auto‑synced</span>
      </div>
      <div className="rows">
        <div className="row">
          <span className="time">7:00</span>
          <span>
            <span className="who">Alvarez · 2</span>
            <br />
            <span className="meta">Window booth · anniversary</span>
          </span>
          <span className="tagpill ok">Confirmed</span>
        </div>
        <div className="row">
          <span className="time">7:30</span>
          <span>
            <span className="who">Okafor · 6</span>
            <br />
            <span className="meta">High-top · 1 highchair</span>
          </span>
          <span className="tagpill warn">Pending</span>
        </div>
        <div className="row">
          <span className="time">8:00</span>
          <span>
            <span className="who">Marsh · 4</span>
            <br />
            <span className="meta">Booked by Rhythmiq · 2 min ago</span>
          </span>
          <span className="tagpill new">New</span>
        </div>
        <div className="row">
          <span className="time">8:30</span>
          <span>
            <span className="who">Chen · 2</span>
            <br />
            <span className="meta">Bar seating · gluten-free</span>
          </span>
          <span className="tagpill ok">Confirmed</span>
        </div>
        <div className="row">
          <span className="time">9:00</span>
          <span>
            <span className="who">Waitlist · 3</span>
            <br />
            <span className="meta">Texted when table frees</span>
          </span>
          <span className="tagpill warn">Waitlist</span>
        </div>
      </div>
    </main>
  );
}

function OrdersPanel() {
  return (
    <main className="app-main">
      <div className="app-head">
        <h4>Open tickets · pushed to POS</h4>
        <span className="chip">Toast · synced</span>
      </div>
      <div className="rows">
        <div className="row">
          <span className="time">#1843</span>
          <span>
            <span className="who">Pickup · Daniela</span>
            <br />
            <span className="meta">2× margherita, 1× burrata, 1× tiramisu</span>
          </span>
          <span className="tagpill new">$58.00</span>
        </div>
        <div className="row">
          <span className="time">#1844</span>
          <span>
            <span className="who">Delivery · J. Park</span>
            <br />
            <span className="meta">Cacio e pepe, side meatballs · no cheese on side</span>
          </span>
          <span className="tagpill ok">$41.50</span>
        </div>
        <div className="row">
          <span className="time">#1845</span>
          <span>
            <span className="who">Pickup · Marsh</span>
            <br />
            <span className="meta">Pre-order for 8:00 table · 1× branzino</span>
          </span>
          <span className="tagpill warn">Scheduled</span>
        </div>
        <div className="row">
          <span className="time">#1846</span>
          <span>
            <span className="who">Delivery · Okafor</span>
            <br />
            <span className="meta">Family meal × 2, garlic bread, soda</span>
          </span>
          <span className="tagpill new">$72.25</span>
        </div>
      </div>
    </main>
  );
}

const BAR_HEIGHTS = ["42%", "58%", "50%", "73%", "64%", "90%", "81%"];

function InsightsPanel() {
  return (
    <main className="app-main">
      <div className="app-head">
        <h4>This week</h4>
        <span className="chip">Mon–Sun</span>
      </div>
      <div className="stats">
        <div className="stat">
          <div className="k">Calls answered</div>
          <div className="v">1,284</div>
          <div className="d">100% · 0 missed</div>
        </div>
        <div className="stat">
          <div className="k">Tables booked</div>
          <div className="v">312</div>
          <div className="d">+18% vs last wk</div>
        </div>
        <div className="stat">
          <div className="k">Avg. handle time</div>
          <div className="v">48s</div>
          <div className="d">−11s faster</div>
        </div>
      </div>
      <div className="bars" aria-hidden>
        {BAR_HEIGHTS.map((h, i) => (
          <i key={i} style={{ "--h": h } as CSSProperties} />
        ))}
      </div>
    </main>
  );
}

const PANELS: Record<TabKey, () => React.JSX.Element> = {
  calls: CallsPanel,
  reservations: ReservationsPanel,
  orders: OrdersPanel,
  insights: InsightsPanel,
};

const ProductShowcase = () => {
  const [active, setActive] = useState<TabKey>("calls");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = TABS.findIndex((t) => t.key === active);
    const n =
      e.key === "ArrowRight" ? (i + 1) % TABS.length : (i - 1 + TABS.length) % TABS.length;
    setActive(TABS[n].key);
    tabRefs.current[n]?.focus();
  };

  const Panel = PANELS[active];
  const addr = TABS.find((t) => t.key === active)!.addr;

  return (
    <section className="section bg-paper2" id="showcase" aria-label="Product showcase">
      <div className="wrap">
        <div
          className="flex flex-wrap gap-1.5 border-b border-ink/15 mb-7 lg:mb-11"
          role="tablist"
          aria-label="Product views"
          onKeyDown={onKeyDown}
        >
          {TABS.map((tab, i) => (
            <button
              key={tab.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={active === tab.key}
              tabIndex={active === tab.key ? 0 : -1}
              className="tab"
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
              <span className="tab-sub">{tab.sub}</span>
            </button>
          ))}
        </div>

        <div key={active} className="panel is-active">
          <div className="win">
            <div className="win-bar">
              <div className="win-dots">
                <i />
                <i />
                <i />
              </div>
              <span className="addr">{addr}</span>
            </div>
            <div className="win-body">
              <Sidebar active={active} />
              <Panel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
