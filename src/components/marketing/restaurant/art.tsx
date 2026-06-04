import { cn } from "@/lib";

/**
 * Editorial art for the landing page: hand-built ink line-illustrations and warm
 * gradient-mesh "art tiles" (the silk/sculpture-style panels). All inline SVG:
 * zero network cost, crisp at any size, in the paper palette with a single coral
 * accent. The procedural pieces (flock, sprig, waveform, arcs) are computed once
 * at module load (server-side) into static element lists, so there is no runtime
 * or client cost and the output is deterministic.
 */

const INK = "#191814";
const INK3 = "#8B847A";
const CORAL = "#E8643C";
const CORAL2 = "#C9461F";
const SOFT = "#F7D9C9";
const CRUST = "#F2C7A0";

const TINT = {
  sand: "#EAE2D4",
  sky: "#DCE6EC",
  coral: "#F7D9C9",
  paper2: "#F1ECE2",
  paper3: "#E7DFD0",
} as const;

/* Full illustration always visible (meet), tile background fills the margins. */
const ArtBox = ({
  className,
  viewBox,
  tint,
  children,
}: {
  className?: string;
  viewBox: string;
  tint: string;
  children: React.ReactNode;
}) => (
  <div className={cn("relative overflow-hidden", className)} style={{ backgroundColor: tint }}>
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full"
      role="img"
      aria-hidden
    >
      {children}
    </svg>
  </div>
);

/* ----------------------------------------------------------------------------
 * Gradient-mesh "art tiles" (warm silk / cool calm / dark night-glow).
 * Each instance needs a unique `uid` so its <defs> IDs don't collide on a page.
 * -------------------------------------------------------------------------- */

type MeshVariant = "coral" | "cool" | "dark";

export const MeshTile = ({
  uid,
  variant = "coral",
  className,
}: {
  uid: string;
  variant?: MeshVariant;
  className?: string;
}) => {
  const W = 300;
  const H = 360;
  const gid = (k: string) => `m-${uid}-${k}`;
  const grain = (
    <filter id={gid("grain")}>
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" result="n" />
      <feColorMatrix in="n" type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="linear" slope={variant === "cool" ? 0.05 : 0.065} />
      </feComponentTransfer>
      <feComposite operator="over" in2="SourceGraphic" />
    </filter>
  );

  let defs: React.ReactNode;
  let rects: React.ReactNode;
  let extra: React.ReactNode = null;

  if (variant === "coral") {
    defs = (
      <>
        <radialGradient id={gid("c1")} cx="28%" cy="22%" r="80%">
          <stop offset="0" stopColor="#FCE0CF" />
          <stop offset="55%" stopColor="#F0A47E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={gid("c2")} cx="78%" cy="38%" r="70%">
          <stop offset="0" stopColor="#F47B4E" />
          <stop offset="60%" stopColor="#F47B4E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={gid("c3")} cx="62%" cy="92%" r="85%">
          <stop offset="0" stopColor="#A83716" />
          <stop offset="60%" stopColor="#A83716" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gid("cb")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2A179" />
          <stop offset="55%" stopColor="#E8643C" />
          <stop offset="100%" stopColor="#C9461F" />
        </linearGradient>
      </>
    );
    rects = (
      <>
        <rect width={W} height={H} fill={`url(#${gid("cb")})`} />
        <rect width={W} height={H} fill={`url(#${gid("c1")})`} />
        <rect width={W} height={H} fill={`url(#${gid("c2")})`} />
        <rect width={W} height={H} fill={`url(#${gid("c3")})`} />
      </>
    );
  } else if (variant === "cool") {
    defs = (
      <>
        <radialGradient id={gid("k1")} cx="25%" cy="20%" r="80%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={gid("k2")} cx="80%" cy="75%" r="75%">
          <stop offset="0" stopColor="#C5D4DE" />
          <stop offset="60%" stopColor="#C5D4DE" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={gid("k3")} cx="85%" cy="18%" r="55%">
          <stop offset="0" stopColor="#F2C4AC" />
          <stop offset="60%" stopColor="#F2C4AC" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gid("kb")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E8EEF2" />
          <stop offset="55%" stopColor="#DCE6EC" />
          <stop offset="100%" stopColor="#E7DECE" />
        </linearGradient>
      </>
    );
    rects = (
      <>
        <rect width={W} height={H} fill={`url(#${gid("kb")})`} />
        <rect width={W} height={H} fill={`url(#${gid("k1")})`} />
        <rect width={W} height={H} fill={`url(#${gid("k2")})`} />
        <rect width={W} height={H} fill={`url(#${gid("k3")})`} />
      </>
    );
  } else {
    defs = (
      <>
        <radialGradient id={gid("d1")} cx="58%" cy="100%" r="80%">
          <stop offset="0" stopColor="#E8643C" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#C9461F" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={gid("d2")} cx="22%" cy="14%" r="60%">
          <stop offset="0" stopColor="#3A332B" />
          <stop offset="70%" stopColor="#3A332B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gid("db")} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#211D18" />
          <stop offset="100%" stopColor="#14110E" />
        </linearGradient>
      </>
    );
    rects = (
      <>
        <rect width={W} height={H} fill={`url(#${gid("db")})`} />
        <rect width={W} height={H} fill={`url(#${gid("d2")})`} />
        <rect width={W} height={H} fill={`url(#${gid("d1")})`} />
      </>
    );
    extra = <circle cx={W * 0.78} cy={H * 0.2} r={W * 0.06} fill="#F4EFE6" opacity="0.85" />;
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-hidden
      >
        <defs>
          {defs}
          {grain}
        </defs>
        <g filter={`url(#${gid("grain")})`}>{rects}</g>
        {extra}
      </svg>
    </div>
  );
};

/* ----------------------------------------------------------------------------
 * Ink line-illustrations
 * -------------------------------------------------------------------------- */

// quadratic bezier point + tangent (for placing leaves along the sprig stem)
function qbez(p0: number[], p1: number[], p2: number[], t: number) {
  const mt = 1 - t;
  const x = mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0];
  const y = mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1];
  const dx = 2 * mt * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
  const dy = 2 * mt * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
  return { x, y, a: Math.atan2(dy, dx) };
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* --- Flock of birds (FullyFeatured) --- */
const FLOCK = (() => {
  const r = mulberry32(7);
  const N = 17;
  const out: { d: string; w: string; coral: boolean }[] = [];
  for (let i = 0; i < N; i++) {
    const tt = i / (N - 1);
    const x = 26 + tt * 196 + (r() - 0.5) * 26;
    const y = 138 - tt * 96 + (r() - 0.5) * 40;
    const s = 1.35 - tt * 0.85 + (r() - 0.3) * 0.2;
    const sw = 7 * s;
    const hw = 5.5 * s;
    const dip = 1.6 * s;
    out.push({
      d: `M${(x - sw).toFixed(1)} ${y.toFixed(1)} Q${(x - sw * 0.4).toFixed(1)} ${(y - hw).toFixed(1)} ${x.toFixed(1)} ${(y - dip).toFixed(1)} Q${(x + sw * 0.4).toFixed(1)} ${(y - hw).toFixed(1)} ${(x + sw).toFixed(1)} ${y.toFixed(1)}`,
      w: (2.4 * s).toFixed(2),
      coral: i === 4,
    });
  }
  return out;
})();

export const FlockArt = ({ className }: { className?: string }) => (
  <ArtBox className={className} viewBox="0 0 240 180" tint={TINT.sand}>
    {FLOCK.map((b, i) => (
      <path key={i} d={b.d} stroke={b.coral ? CORAL : INK} strokeWidth={b.w} fill="none" strokeLinecap="round" />
    ))}
  </ArtBox>
);

/* --- Olive sprig --- */
const SPRIG = (() => {
  const p0 = [42, 154];
  const p1 = [120, 150];
  const p2 = [206, 40];
  const leaves: string[] = [];
  const count = 7;
  for (let i = 1; i <= count; i++) {
    const t = i / (count + 0.4);
    const pt = qbez(p0, p1, p2, t);
    const side = i % 2 === 0 ? 1 : -1;
    const perp = pt.a + (side * Math.PI) / 2;
    const len = 30 - t * 8;
    const lx = pt.x + Math.cos(perp) * 4;
    const ly = pt.y + Math.sin(perp) * 4;
    const ex = lx + Math.cos(perp) * len;
    const ey = ly + Math.sin(perp) * len;
    const nx = Math.cos(perp + Math.PI / 2);
    const ny = Math.sin(perp + Math.PI / 2);
    const wdt = 7 - t * 1.5;
    const m1x = lx + (ex - lx) * 0.5 + nx * wdt;
    const m1y = ly + (ey - ly) * 0.5 + ny * wdt;
    const m2x = lx + (ex - lx) * 0.5 - nx * wdt;
    const m2y = ly + (ey - ly) * 0.5 - ny * wdt;
    leaves.push(
      `M${lx.toFixed(1)} ${ly.toFixed(1)} Q${m1x.toFixed(1)} ${m1y.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)} Q${m2x.toFixed(1)} ${m2y.toFixed(1)} ${lx.toFixed(1)} ${ly.toFixed(1)} Z`
    );
  }
  return { stem: `M${p0[0]} ${p0[1]} Q${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}`, leaves };
})();

export const SprigArt = ({ className }: { className?: string }) => (
  <ArtBox className={className} viewBox="0 0 240 180" tint={TINT.paper2}>
    <path d={SPRIG.stem} stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    {SPRIG.leaves.map((d, i) => (
      <path key={i} d={d} stroke={INK} strokeWidth="1.8" fill="none" />
    ))}
    <circle cx="64" cy="150" r="5.5" fill={CORAL} />
    <circle cx="86" cy="156" r="4.5" fill={CORAL} opacity="0.85" />
  </ArtBox>
);

/* --- Place setting (CompleteSolution) --- */
export const PlaceSettingArt = ({ className }: { className?: string }) => (
  <ArtBox className={className} viewBox="0 0 220 220" tint={TINT.sand}>
    <circle cx="116" cy="110" r="62" stroke={INK} strokeWidth="2.4" fill="none" />
    <circle cx="116" cy="110" r="46" stroke={INK3} strokeWidth="1.4" fill="none" />
    <g stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round">
      <line x1="30" y1="58" x2="30" y2="86" />
      <line x1="38" y1="58" x2="38" y2="86" />
      <line x1="46" y1="58" x2="46" y2="86" />
      <path d="M30 86h16v10c0 6-4 8-8 8s-8-2-8-8z" />
      <line x1="38" y1="104" x2="38" y2="168" />
    </g>
    <g stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round">
      <path d="M196 56c8 6 8 30 0 46l-4 0 0-46z" />
      <line x1="194" y1="102" x2="194" y2="168" />
    </g>
    {/* pizza on the plate */}
    <circle cx="116" cy="110" r="33" fill={CRUST} stroke={CORAL2} strokeWidth="2" />
    <circle cx="116" cy="110" r="27" fill={CORAL} />
    <g stroke={SOFT} strokeWidth="1.3" opacity="0.65">
      <line x1="89" y1="110" x2="143" y2="110" />
      <line x1="96.9" y1="90.9" x2="135.1" y2="129.1" />
      <line x1="116" y1="83" x2="116" y2="137" />
      <line x1="135.1" y1="90.9" x2="96.9" y2="129.1" />
    </g>
    <g fill={CORAL2}>
      <circle cx="107" cy="103" r="3.2" />
      <circle cx="124" cy="100" r="3.2" />
      <circle cx="128" cy="115" r="3.2" />
      <circle cx="109" cy="120" r="3.2" />
      <circle cx="119" cy="111" r="3.2" />
      <circle cx="103" cy="113" r="3.2" />
      <circle cx="122" cy="123" r="3.2" />
    </g>
  </ArtBox>
);

/* --- Waveform (rhythm) --- */
const WAVE = (() => {
  const W = 260;
  const mid = 75;
  const n = 34;
  const gap = W / (n + 1);
  const out: { x: string; y1: string; y2: string; coral: boolean }[] = [];
  for (let i = 0; i < n; i++) {
    const x = gap * (i + 1);
    const env = Math.sin((i / (n - 1)) * Math.PI);
    const osc = 0.45 + 0.55 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.35));
    const h = 8 + env * osc * 58;
    out.push({ x: x.toFixed(1), y1: (mid - h).toFixed(1), y2: (mid + h).toFixed(1), coral: i === 22 });
  }
  return out;
})();

export const WaveformArt = ({ className }: { className?: string }) => (
  <ArtBox className={className} viewBox="0 0 260 150" tint={TINT.sky}>
    {WAVE.map((b, i) => (
      <line
        key={i}
        x1={b.x}
        y1={b.y1}
        x2={b.x}
        y2={b.y2}
        stroke={b.coral ? CORAL : INK}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={b.coral ? 1 : 0.9}
      />
    ))}
  </ArtBox>
);

/* --- Sound arcs --- */
const ARCS = (() => {
  const ox = 40;
  const oy = 184;
  const out: { d: string; coral: boolean; w: string; op: string }[] = [];
  for (let i = 1; i <= 6; i++) {
    const rr = i * 27;
    out.push({
      d: `M${ox + rr} ${oy} A${rr} ${rr} 0 0 0 ${ox} ${oy - rr}`,
      coral: i === 2,
      w: i === 2 ? "2.6" : "1.8",
      op: (1 - i * 0.08).toFixed(2),
    });
  }
  return { ox, oy, out };
})();

export const SoundArcsArt = ({ className }: { className?: string }) => (
  <ArtBox className={className} viewBox="0 0 220 220" tint={TINT.paper2}>
    <circle cx={ARCS.ox} cy={ARCS.oy} r="7" fill={CORAL} />
    {ARCS.out.map((a, i) => (
      <path key={i} d={a.d} stroke={a.coral ? CORAL : INK} strokeWidth={a.w} fill="none" strokeLinecap="round" opacity={a.op} />
    ))}
  </ArtBox>
);

/* --- Wine glass (Testimonial) --- */
export const WineGlassArt = ({ className }: { className?: string }) => (
  <ArtBox className={className} viewBox="0 0 150 220" tint={TINT.coral}>
    <path d="M44 30 Q44 92 75 96 Q106 92 106 30 Z" stroke={INK} strokeWidth="2.4" fill="none" strokeLinejoin="round" />
    <path d="M52 56 Q56 80 75 84 Q94 80 98 56" fill={CORAL} opacity="0.16" />
    <path d="M52 56 Q75 70 98 56" stroke={CORAL} strokeWidth="2.2" fill="none" />
    <line x1="75" y1="96" x2="75" y2="170" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    <path d="M50 182 Q75 172 100 182" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
  </ArtBox>
);

/* --- Plug board (Integrations: "plugs into the stack you already run") --- */
const PLUGS = [
  { sx: 76, label: "POS" },
  { sx: 128, label: "Reserve" },
  { sx: 180, label: "CRM" },
  { sx: 232, label: "Delivery" },
];
const PLUG_CONNECTED = 1;

export const PlugBoardArt = ({ className }: { className?: string }) => (
  <ArtBox className={className} viewBox="0 0 300 240" tint={TINT.paper2}>
    {/* power strip */}
    <rect x="46" y="176" width="208" height="40" rx="12" fill="#FAF8F3" stroke={INK} strokeWidth="2.4" />
    <circle cx="60" cy="196" r="3.5" fill={CORAL} />
    {PLUGS.map((p, i) => {
      const isC = i === PLUG_CONNECTED;
      const col = isC ? CORAL : INK;
      const anchorY = 46;
      const plugTopY = isC ? 150 : 116;
      const plugW = 22;
      const plugH = 26;
      const headBottom = plugTopY + plugH;
      const ctrl = p.sx + (i % 2 ? 24 : -24);
      return (
        <g key={p.label}>
          {/* socket holes */}
          <line x1={p.sx - 4} y1="184" x2={p.sx - 4} y2="196" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <line x1={p.sx + 4} y1="184" x2={p.sx + 4} y2="196" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          {/* cable to the app */}
          <path
            d={`M${p.sx} ${plugTopY} C ${p.sx} ${plugTopY - 30} ${ctrl} ${anchorY + 36} ${p.sx} ${anchorY + 14}`}
            stroke={col}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            opacity={isC ? 1 : 0.85}
          />
          {/* app node + label */}
          <circle cx={p.sx} cy={anchorY} r="7" fill="none" stroke={col} strokeWidth="2.2" />
          {isC && <circle cx={p.sx} cy={anchorY} r="3" fill={CORAL} />}
          <text x={p.sx} y={anchorY - 13} textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill={INK3}>
            {p.label}
          </text>
          {/* plug head + prongs */}
          <rect
            x={p.sx - plugW / 2}
            y={plugTopY}
            width={plugW}
            height={plugH}
            rx="6"
            fill={isC ? CORAL : "#FAF8F3"}
            stroke={isC ? CORAL2 : INK}
            strokeWidth="2.2"
          />
          <line x1={p.sx - 4} y1={headBottom} x2={p.sx - 4} y2={headBottom + 9} stroke={isC ? CORAL2 : INK} strokeWidth="2.2" strokeLinecap="round" />
          <line x1={p.sx + 4} y1={headBottom} x2={p.sx + 4} y2={headBottom + 9} stroke={isC ? CORAL2 : INK} strokeWidth="2.2" strokeLinecap="round" />
          {/* connected glow + sparks */}
          {isC && (
            <>
              <circle cx={p.sx} cy="178" r="16" fill={CORAL} opacity="0.16" />
              <g stroke={CORAL} strokeWidth="2" strokeLinecap="round">
                <path d={`M${p.sx + 18} 170 l7 -4`} />
                <path d={`M${p.sx - 18} 170 l-7 -4`} />
                <path d={`M${p.sx} 154 l0 -7`} />
              </g>
            </>
          )}
        </g>
      );
    })}
  </ArtBox>
);

/* --- Concierge bell --- */
export const ConciergeBellArt = ({ className }: { className?: string }) => (
  <ArtBox className={className} viewBox="0 0 190 180" tint={TINT.paper3}>
    <path d="M48 128 Q48 78 95 78 Q142 78 142 128 Z" stroke={INK} strokeWidth="2.4" fill="none" strokeLinejoin="round" />
    <line x1="36" y1="128" x2="154" y2="128" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    <line x1="95" y1="78" x2="95" y2="66" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="95" cy="60" r="6" fill={CORAL} />
    <g stroke={CORAL} strokeWidth="2.2" fill="none" strokeLinecap="round">
      <path d="M150 56 q10 -4 14 4" />
      <path d="M40 56 q-10 -4 -14 4" />
    </g>
  </ArtBox>
);
