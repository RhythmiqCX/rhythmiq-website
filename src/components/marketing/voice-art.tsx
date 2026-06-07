import { cn } from "@/lib";

/**
 * Editorial ink line-illustrations for the Voice AI page, in the same hand-built
 * style as the restaurant landing art (paper palette, single coral accent, all
 * inline SVG: zero network cost, crisp at any size). These replace the old
 * animated GIFs (mic_3 / ai-voice-1 / thirdimg1) one-for-one:
 *   AlwaysOnArt      → "Always Available · 24/7 Instant Support"
 *   ConversationArt  → "Human-Like Interaction · Natural Conversations"
 *   RoutingArt       → "Effortless Handoff · Smart Call Routing"
 *
 * The conversation tile uses a warm peach tint so it contrasts with the cream
 * bg-paper2 section behind its shadowed card (a same-cream tile blended in).
 */

const INK = "#191814";
const INK3 = "#8B847A";
const CORAL = "#E8643C";
const CORAL2 = "#C9461F";
const SOFT = "#F7D9C9";
const PAPER = "#FAF8F3";

const TINT = {
  sand: "#EAE2D4",
  paper3: "#E7DFD0",
  coral: "#F7D9C9",
} as const;

/* Full illustration always visible (meet); tile background fills the margins. */
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

/* --- Always-on clock (Always Available · 24/7) --- */
const CLOCK_TICKS = (() => {
  const cx = 110;
  const cy = 110;
  const out: { x1: string; y1: string; x2: string; y2: string; big: boolean }[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const big = i % 3 === 0;
    const r1 = big ? 50 : 53;
    const r2 = 61;
    out.push({
      x1: (cx + Math.cos(a) * r1).toFixed(1),
      y1: (cy + Math.sin(a) * r1).toFixed(1),
      x2: (cx + Math.cos(a) * r2).toFixed(1),
      y2: (cy + Math.sin(a) * r2).toFixed(1),
      big,
    });
  }
  return out;
})();

export const AlwaysOnArt = ({ className }: { className?: string }) => (
  <ArtBox className={className} viewBox="0 0 220 220" tint={TINT.sand}>
    {/* always-on pulse rings behind the clock */}
    <circle cx="110" cy="110" r="88" stroke={CORAL} strokeWidth="1.4" fill="none" opacity="0.18" />
    <circle cx="110" cy="110" r="78" stroke={CORAL} strokeWidth="1.4" fill="none" opacity="0.3" />
    {/* clock body */}
    <circle cx="110" cy="110" r="66" fill={PAPER} stroke={INK} strokeWidth="2.4" />
    {CLOCK_TICKS.map((t, i) => (
      <line
        key={i}
        x1={t.x1}
        y1={t.y1}
        x2={t.x2}
        y2={t.y2}
        stroke={t.big ? INK : INK3}
        strokeWidth={t.big ? 2.6 : 1.6}
        strokeLinecap="round"
      />
    ))}
    {/* hands set to a friendly ~10:08 */}
    <line x1="110" y1="110" x2="88" y2="78" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <line x1="110" y1="110" x2="150" y2="92" stroke={CORAL} strokeWidth="3.4" strokeLinecap="round" />
    <circle cx="110" cy="110" r="5.5" fill={CORAL} stroke={CORAL2} strokeWidth="1.4" />
  </ArtBox>
);

/* --- Conversation bubbles (Human-Like · Natural Conversations) --- */
const REPLY_BARS = (() => {
  const mid = 148;
  const heights = [9, 16, 24, 14, 22, 12, 8];
  return heights.map((h, i) => {
    const x = (122 + i * 9).toFixed(1);
    return { x, y1: (mid - h).toFixed(1), y2: (mid + h).toFixed(1) };
  });
})();

export const ConversationArt = ({ className }: { className?: string }) => (
  <ArtBox className={className} viewBox="0 0 240 210" tint={TINT.coral}>
    {/* incoming bubble (outline) with typing dots + downward tail */}
    <path
      d="M44 36 H140 Q158 36 158 54 V78 Q158 96 140 96 H72 L56 114 L60 96 H44 Q26 96 26 78 V54 Q26 36 44 36 Z"
      fill={PAPER}
      stroke={INK}
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <circle cx="72" cy="66" r="4.5" fill={INK3} />
    <circle cx="96" cy="66" r="4.5" fill={INK3} />
    <circle cx="120" cy="66" r="4.5" fill={INK3} />
    {/* reply bubble (coral) with a voice waveform + upward tail */}
    <path
      d="M102 118 H176 L192 100 L188 118 H198 Q216 118 216 136 V160 Q216 178 198 178 H102 Q84 178 84 160 V136 Q84 118 102 118 Z"
      fill={SOFT}
      stroke={CORAL2}
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    {REPLY_BARS.map((b, i) => (
      <line
        key={i}
        x1={b.x}
        y1={b.y1}
        x2={b.x}
        y2={b.y2}
        stroke={CORAL2}
        strokeWidth="3"
        strokeLinecap="round"
      />
    ))}
  </ArtBox>
);

/* --- Call routing tree (Effortless Handoff · Smart Call Routing) --- */
export const RoutingArt = ({ className }: { className?: string }) => (
  <ArtBox className={className} viewBox="0 0 240 210" tint={TINT.paper3}>
    {/* ringing arcs around the incoming call */}
    <path d="M99 28 q-8 9 0 20" stroke={CORAL} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7" />
    <path d="M141 28 q8 9 0 20" stroke={CORAL} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7" />
    {/* incoming call node with a phone glyph */}
    <circle cx="120" cy="40" r="17" fill={PAPER} stroke={INK} strokeWidth="2.4" />
    <g transform="translate(108.5 28.5) scale(0.96)">
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill={CORAL}
      />
    </g>
    {/* stem + split point */}
    <line x1="120" y1="57" x2="120" y2="92" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="120" cy="96" r="4" fill={INK} />
    {/* branches: AI (ink) + live agent (coral) */}
    <path d="M120 96 C 110 130 66 138 66 162" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <path d="M120 96 C 130 130 174 138 174 162" stroke={CORAL2} strokeWidth="2.8" fill="none" strokeLinecap="round" />
    {/* AI node: hexagon */}
    <path d="M66 152 L82 161 L82 179 L66 188 L50 179 L50 161 Z" fill={PAPER} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="66" cy="170" r="4.5" fill={INK3} />
    {/* live-agent handoff: coral person glyph + glow */}
    <circle cx="174" cy="172" r="22" fill={CORAL} opacity="0.14" />
    <path d="M158 186 Q174 162 190 186 Z" fill={CORAL} stroke={CORAL2} strokeWidth="2.2" strokeLinejoin="round" />
    <circle cx="174" cy="160" r="8" fill={CORAL} stroke={CORAL2} strokeWidth="1.6" />
  </ArtBox>
);
