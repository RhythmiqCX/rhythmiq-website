"use client";

import { useRef, useState, type CSSProperties } from "react";

type TabKey = "calls" | "returns" | "orders" | "insights";

const TABS: { key: TabKey; label: string; sub: string; addr: string }[] = [
  { key: "calls", label: "Live calls", sub: "Real-time transcripts", addr: "app.rhythmiq.ai / live" },
  { key: "returns", label: "Returns", sub: "Refund → exchange", addr: "app.rhythmiq.ai / returns" },
  { key: "orders", label: "Orders", sub: "COD & upsell", addr: "app.rhythmiq.ai / orders" },
  { key: "insights", label: "Insights", sub: "Call analytics", addr: "app.rhythmiq.ai / insights" },
];

const SIDE_ITEMS = ["Live calls", "Returns", "Orders", "Voicemail"] as const;
const SIDE_MANAGE = ["Knowledge", "Insights", "Settings"] as const;

const ACTIVE_LABEL: Record<TabKey, string> = {
  calls: "Live calls",
  returns: "Returns",
  orders: "Orders",
  insights: "Insights",
};

function Sidebar({ active }: { active: TabKey }) {
  const activeLabel = ACTIVE_LABEL[active];
  return (
    <aside className="app-side">
      <div className="org">
        <span className="av" />
        <b>Northgate Skincare</b>
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
        <h4>Outbound call · +91 98765 43210</h4>
        <span className="live">On call · 00:45</span>
      </div>
      <div className="transcript">
        <div className="bubble ai">
          <small>Rhythmiq</small>Hi, this is Northgate Skincare. Our courier tried delivering your
          order this morning but couldn&rsquo;t reach you. Are you home this evening after 6?
        </div>
        <div className="bubble caller">
          <small>Customer</small>Yes, I&rsquo;ll be home after 6.
        </div>
        <div className="bubble ai">
          <small>Rhythmiq</small>Perfect, I&rsquo;ve rescheduled for <span className="hl">today after 6 PM</span> and
          texted you the update. Anything else before I let you go?
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

function ReturnsPanel() {
  return (
    <main className="app-main">
      <div className="app-head">
        <h4>Today · 14 returns processed</h4>
        <span className="chip">auto‑synced</span>
      </div>
      <div className="rows">
        <div className="row">
          <span className="time">10:15</span>
          <span>
            <span className="who">Verma · Order #4021</span>
            <br />
            <span className="meta">Size mismatch → exchanged to L</span>
          </span>
          <span className="tagpill ok">Exchanged</span>
        </div>
        <div className="row">
          <span className="time">11:02</span>
          <span>
            <span className="who">Iyer · Order #4030</span>
            <br />
            <span className="meta">Color issue → store credit +$10</span>
          </span>
          <span className="tagpill warn">Pending pickup</span>
        </div>
        <div className="row">
          <span className="time">12:40</span>
          <span>
            <span className="who">Bose · Order #4041</span>
            <br />
            <span className="meta">Refund requested → converted by Rhythmiq</span>
          </span>
          <span className="tagpill new">New</span>
        </div>
        <div className="row">
          <span className="time">13:15</span>
          <span>
            <span className="who">Nair · Order #4055</span>
            <br />
            <span className="meta">Wrong size → exchanged, free shipping</span>
          </span>
          <span className="tagpill ok">Exchanged</span>
        </div>
        <div className="row">
          <span className="time">14:00</span>
          <span>
            <span className="who">Return pickup failed · Kapoor</span>
            <br />
            <span className="meta">Rescheduled for tomorrow</span>
          </span>
          <span className="tagpill warn">Rescue needed</span>
        </div>
      </div>
    </main>
  );
}

function OrdersPanel() {
  return (
    <main className="app-main">
      <div className="app-head">
        <h4>Open COD orders · confirmed today</h4>
        <span className="chip">Shopify · synced</span>
      </div>
      <div className="rows">
        <div className="row">
          <span className="time">#8821</span>
          <span>
            <span className="who">COD · Meera</span>
            <br />
            <span className="meta">Confirmed + added conditioner, $5 off</span>
          </span>
          <span className="tagpill new">$58.00</span>
        </div>
        <div className="row">
          <span className="time">#8822</span>
          <span>
            <span className="who">COD · Rao</span>
            <br />
            <span className="meta">Confirmed, no changes</span>
          </span>
          <span className="tagpill ok">$36.50</span>
        </div>
        <div className="row">
          <span className="time">#8823</span>
          <span>
            <span className="who">High-risk COD · Singh</span>
            <br />
            <span className="meta">3 calls unanswered → flagged</span>
          </span>
          <span className="tagpill warn">Flagged</span>
        </div>
        <div className="row">
          <span className="time">#8824</span>
          <span>
            <span className="who">COD · Fernandes</span>
            <br />
            <span className="meta">Switched to prepaid, $5 off</span>
          </span>
          <span className="tagpill new">$84.00</span>
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
          <div className="k">Deliveries rescued</div>
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
  returns: ReturnsPanel,
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
