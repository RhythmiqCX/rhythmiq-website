import { cn } from "@/lib";

/**
 * On-brand SVG illustrations + product-UI mockups that replace the striped `.ph`
 * placeholders. All are inline SVG (zero network cost, crisp at any size) in the
 * paper palette. Each fills its slot via the aspect className passed from the
 * call site; the SVG slices to cover so the tinted background always fills.
 */

const INK = "#191814";
const INK2 = "#57534B";
const INK3 = "#8B847A";
const CORAL = "#E8643C";
const CORAL2 = "#C9461F";
const PAPER = "#FAF8F3";
const LINE = "rgba(25,24,20,0.12)";

const TINT: Record<string, string> = {
  sand: "#EAE2D4",
  sky: "#DCE6EC",
  coral: "#F7D9C9",
  default: "#F1ECE2",
  ink: "#2A2620",
};

const Box = ({
  className,
  viewBox,
  children,
}: {
  className?: string;
  viewBox: string;
  children: React.ReactNode;
}) => (
  <div className={cn("relative overflow-hidden", className)}>
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      role="img"
      aria-hidden
    >
      {children}
    </svg>
  </div>
);

/* ---------- Hero strip (7) ---------- */

export const HeroDining = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 150 170">
    <rect width="150" height="170" fill={TINT.sand} />
    {/* pendant lights */}
    <line x1="45" y1="0" x2="45" y2="28" stroke={INK} strokeWidth="1.5" />
    <line x1="105" y1="0" x2="105" y2="20" stroke={INK} strokeWidth="1.5" />
    <path d="M38 28h14l-3 8H41z" fill={CORAL} />
    <path d="M99 20h12l-2.5 7H101z" fill={INK} />
    {/* tables */}
    <ellipse cx="50" cy="118" rx="30" ry="11" fill={PAPER} stroke={INK} strokeWidth="1.5" />
    <ellipse cx="108" cy="135" rx="26" ry="9" fill={PAPER} stroke={INK} strokeWidth="1.5" />
    <circle cx="50" cy="112" r="6" fill="none" stroke={INK2} strokeWidth="1.2" />
    <circle cx="108" cy="130" r="5" fill="none" stroke={INK2} strokeWidth="1.2" />
    {/* chairs */}
    <rect x="22" y="120" width="9" height="14" rx="2" fill={INK} />
    <rect x="70" y="120" width="9" height="14" rx="2" fill={INK} />
    <rect x="86" y="138" width="8" height="12" rx="2" fill={INK2} />
  </Box>
);

export const HeroChef = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 150 170">
    <rect width="150" height="170" fill={TINT.default} />
    {/* steam */}
    <path d="M62 30c6 6-6 12 0 18M75 26c6 6-6 12 0 18M88 30c6 6-6 12 0 18" stroke={INK3} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* plate */}
    <ellipse cx="75" cy="108" rx="46" ry="16" fill={PAPER} stroke={INK} strokeWidth="1.5" />
    <ellipse cx="75" cy="104" rx="30" ry="9" fill="none" stroke={LINE} strokeWidth="1.2" />
    {/* food arcs + garnish */}
    <path d="M60 104q15 -10 30 0" stroke={INK2} strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="75" cy="100" r="3.5" fill={CORAL} />
    {/* tweezers */}
    <line x1="104" y1="62" x2="82" y2="96" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="110" y1="64" x2="86" y2="98" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
  </Box>
);

export const HeroPhone = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 150 170">
    <rect width="150" height="170" fill={TINT.sky} />
    {/* handset */}
    <g transform="rotate(-18 75 90)">
      <path
        d="M50 70c0 30 20 50 50 50l-7-14-11 4c-13-6-23-16-29-29l4-11z"
        fill={INK}
      />
    </g>
    {/* ring waves */}
    <path d="M104 64a22 22 0 0 1 0 30" stroke={CORAL} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M112 56a34 34 0 0 1 0 46" stroke={CORAL} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
  </Box>
);

export const HeroRings = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 150 170">
    <rect width="150" height="170" fill={TINT.coral} />
    <g transform="translate(75 85)">
      <circle r="44" fill="none" stroke={CORAL2} strokeWidth="2" />
      <circle r="30" fill="none" stroke={CORAL2} strokeWidth="2" />
      <circle r="16" fill="none" stroke={CORAL2} strokeWidth="2" />
      <circle cx="0" cy="-44" r="6" fill={INK} />
      <circle cx="44" cy="0" r="6" fill={INK} />
      <circle cx="0" cy="44" r="6" fill={INK} />
      <circle cx="-44" cy="0" r="6" fill={CORAL2} />
    </g>
  </Box>
);

export const HeroHost = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 150 170">
    <rect width="150" height="170" fill={TINT.default} />
    {/* host stand podium */}
    <path d="M52 70h46l-6 70H58z" fill={PAPER} stroke={INK} strokeWidth="1.5" />
    <rect x="60" y="58" width="30" height="16" rx="2" fill={INK} />
    {/* bell */}
    <path d="M108 120a12 12 0 0 1 24 0z" fill={CORAL} />
    <rect x="106" y="120" width="28" height="4" rx="2" fill={INK} />
    <circle cx="120" cy="104" r="3" fill={INK} />
    {/* reservation lines */}
    <line x1="62" y1="92" x2="88" y2="92" stroke={INK3} strokeWidth="2" strokeLinecap="round" />
    <line x1="62" y1="102" x2="82" y2="102" stroke={INK3} strokeWidth="2" strokeLinecap="round" />
  </Box>
);

export const HeroGuests = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 150 170">
    <rect width="150" height="170" fill={TINT.sand} />
    {/* three guests around */}
    <g fill={INK}>
      <circle cx="48" cy="78" r="13" />
      <path d="M28 120c0-14 9-22 20-22s20 8 20 22z" />
    </g>
    <g fill={INK2}>
      <circle cx="100" cy="74" r="12" />
      <path d="M82 114c0-13 8-20 18-20s18 7 18 20z" />
    </g>
    <circle cx="75" cy="132" r="9" fill={CORAL} />
    <path d="M60 168c0-12 7-19 15-19s15 7 15 19z" fill={CORAL} />
  </Box>
);

export const HeroNight = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 150 170">
    <rect width="150" height="170" fill={TINT.ink} />
    {/* moon */}
    <path d="M118 36a18 18 0 1 0 0 30 22 22 0 0 1 0-30z" fill="#F4EFE6" opacity="0.9" />
    {/* warm windows */}
    <g fill={CORAL}>
      <rect x="30" y="96" width="16" height="20" rx="2" />
      <rect x="58" y="96" width="16" height="20" rx="2" opacity="0.8" />
      <rect x="86" y="96" width="16" height="20" rx="2" opacity="0.6" />
    </g>
    <rect x="24" y="120" width="100" height="34" rx="3" fill="#1A1714" stroke="rgba(244,239,230,0.18)" />
    <circle cx="40" cy="60" r="2" fill="#F4EFE6" opacity="0.7" />
    <circle cx="70" cy="44" r="1.5" fill="#F4EFE6" opacity="0.6" />
  </Box>
);

/* ---------- Abstract / illustration slots ---------- */

export const AbstractRings = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 200 200">
    <rect width="200" height="200" fill={TINT.coral} />
    <g transform="translate(100 100)" fill="none" stroke={CORAL2} strokeWidth="2.5">
      <circle r="70" />
      <circle r="50" />
      <circle r="30" />
    </g>
    <g transform="translate(100 100)" fill={INK}>
      <circle cx="0" cy="-70" r="8" />
      <circle cx="70" cy="0" r="8" />
      <circle cx="0" cy="70" r="8" />
      <circle cx="-70" cy="0" r="8" />
    </g>
    <circle cx="100" cy="100" r="9" fill={CORAL2} />
  </Box>
);

export const FlockArt = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 240 180">
    <rect width="240" height="180" fill={TINT.sand} />
    <g stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round">
      <path d="M40 70q10 -10 20 0q10 -10 20 0" />
      <path d="M90 50q9 -9 18 0q9 -9 18 0" />
      <path d="M150 78q9 -9 18 0q9 -9 18 0" />
      <path d="M70 110q8 -8 16 0q8 -8 16 0" />
      <path d="M130 120q10 -10 20 0q10 -10 20 0" stroke={CORAL} />
      <path d="M180 104q8 -8 16 0q8 -8 16 0" />
    </g>
  </Box>
);

export const PortraitArt = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 200 250">
    <rect width="200" height="250" fill={TINT.sand} />
    <circle cx="100" cy="96" r="44" fill={PAPER} stroke={INK} strokeWidth="2" />
    <path d="M34 250c0-44 30-66 66-66s66 22 66 66z" fill={PAPER} stroke={INK} strokeWidth="2" />
    <circle cx="100" cy="96" r="44" fill="none" stroke={CORAL} strokeWidth="2" strokeDasharray="6 10" opacity="0.7" />
  </Box>
);

/* ---------- Product-UI mockups ---------- */

const WinChrome = ({ w, label }: { w: number; label?: string }) => (
  <>
    <circle cx="14" cy="14" r="3" fill={LINE} />
    <circle cx="26" cy="14" r="3" fill={LINE} />
    <circle cx="38" cy="14" r="3" fill={LINE} />
    {label && (
      <text x={w / 2} y="18" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={INK3}>
        {label}
      </text>
    )}
    <line x1="0" y1="28" x2={w} y2="28" stroke={LINE} />
  </>
);

export const WorkspaceUI = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 320 180">
    <rect width="320" height="180" fill={TINT.sky} />
    <rect x="18" y="16" width="284" height="148" rx="12" fill={PAPER} stroke={LINE} />
    <g transform="translate(18 16)">
      <WinChrome w={284} label="rhythmiq · knowledge" />
      {/* left nav */}
      <rect x="0" y="28" width="78" height="120" fill="#FCFBF8" />
      <rect x="12" y="44" width="54" height="7" rx="3.5" fill={CORAL} />
      <rect x="12" y="60" width="44" height="6" rx="3" fill={LINE} />
      <rect x="12" y="74" width="50" height="6" rx="3" fill={LINE} />
      <rect x="12" y="88" width="40" height="6" rx="3" fill={LINE} />
      {/* content rows: menu / hours / policies */}
      <g transform="translate(94 42)">
        <rect width="174" height="26" rx="6" fill="#fff" stroke={LINE} />
        <circle cx="16" cy="13" r="6" fill={CORAL} />
        <rect x="30" y="9" width="90" height="7" rx="3.5" fill={INK} />
        <rect x="30" y="9" width="0" height="0" />
        <rect y="34" width="174" height="26" rx="6" fill="#fff" stroke={LINE} />
        <circle cx="16" cy="47" r="6" fill={INK} />
        <rect x="30" y="43" width="70" height="7" rx="3.5" fill={INK2} />
        <rect y="68" width="174" height="26" rx="6" fill="#fff" stroke={LINE} />
        <circle cx="16" cy="81" r="6" fill={INK3} />
        <rect x="30" y="77" width="110" height="7" rx="3.5" fill={INK2} />
      </g>
    </g>
  </Box>
);

export const AnalyticsUI = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 320 180">
    <rect width="320" height="180" fill={TINT.default} />
    <rect x="18" y="16" width="284" height="148" rx="12" fill={PAPER} stroke={LINE} />
    <g transform="translate(18 16)">
      <WinChrome w={284} label="rhythmiq · analytics" />
      {/* stat tiles */}
      <g transform="translate(16 40)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 86} 0)`}>
            <rect width="78" height="34" rx="6" fill="#fff" stroke={LINE} />
            <rect x="10" y="9" width="30" height="6" rx="3" fill={INK3} />
            <rect x="10" y="20" width="44" height="8" rx="4" fill={i === 0 ? CORAL : INK} />
          </g>
        ))}
      </g>
      {/* bar chart */}
      <g transform="translate(16 88)">
        <rect width="252" height="56" rx="6" fill="#fff" stroke={LINE} />
        {[28, 40, 22, 50, 34, 46, 30].map((h, i) => (
          <rect key={i} x={16 + i * 32} y={48 - h} width="16" height={h} rx="3" fill={i === 3 ? CORAL : "#EAE2D4"} />
        ))}
      </g>
    </g>
  </Box>
);

export const InsightsUI = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 320 200">
    <rect width="320" height="200" fill={TINT.default} />
    <rect x="18" y="16" width="284" height="168" rx="12" fill={PAPER} stroke={LINE} />
    <g transform="translate(18 16)">
      <WinChrome w={284} label="insights" />
      <text x="20" y="58" fontFamily="sans-serif" fontWeight="700" fontSize="30" fill={INK}>
        1,284
      </text>
      <rect x="20" y="68" width="120" height="7" rx="3.5" fill={INK3} />
      {/* mini bars */}
      <g transform="translate(20 92)">
        {[30, 48, 36, 60, 44, 70, 52].map((h, i) => (
          <rect key={i} x={i * 36} y={70 - h} width="20" height={h} rx="3" fill={i === 5 ? CORAL : "#EAE2D4"} />
        ))}
      </g>
    </g>
  </Box>
);

export const GuestTextUI = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 320 200">
    <rect width="320" height="200" fill={TINT.sand} />
    {/* phone */}
    <rect x="116" y="20" width="88" height="172" rx="14" fill={INK} />
    <rect x="124" y="30" width="72" height="152" rx="8" fill={PAPER} />
    {/* incoming bubble */}
    <rect x="132" y="44" width="48" height="22" rx="9" fill="#F1ECE2" />
    <rect x="138" y="52" width="34" height="5" rx="2.5" fill={INK2} />
    {/* outgoing coral bubble */}
    <rect x="146" y="74" width="44" height="30" rx="9" fill={CORAL} />
    <rect x="152" y="82" width="30" height="4.5" rx="2.25" fill="#fff" />
    <rect x="152" y="91" width="22" height="4.5" rx="2.25" fill="#fff" opacity="0.85" />
    {/* confirmed row */}
    <rect x="132" y="116" width="56" height="22" rx="9" fill="#E2F1E8" />
    <circle cx="143" cy="127" r="4" fill="#1F7A4D" />
    <rect x="151" y="124" width="30" height="5" rx="2.5" fill="#1F7A4D" />
  </Box>
);

export const CallComposerUI = ({ className }: { className?: string }) => (
  <Box className={className} viewBox="0 0 320 180">
    <rect width="320" height="180" fill={TINT.sky} />
    <rect x="18" y="16" width="284" height="148" rx="12" fill={PAPER} stroke={LINE} />
    <g transform="translate(18 16)">
      <WinChrome w={284} label="rhythmiq · live call" />
      {/* transcript bubbles */}
      <rect x="16" y="40" width="120" height="22" rx="9" fill="#F1ECE2" />
      <rect x="24" y="48" width="84" height="6" rx="3" fill={INK2} />
      <rect x="148" y="70" width="120" height="28" rx="9" fill={INK} />
      <rect x="156" y="78" width="74" height="5.5" rx="2.75" fill="#F4EFE6" />
      <rect x="156" y="88" width="50" height="5.5" rx="2.75" fill={CORAL} />
      {/* suggested answer chips */}
      <text x="16" y="120" fontFamily="monospace" fontSize="9" fill={INK3}>SUGGESTED</text>
      <rect x="16" y="126" width="70" height="20" rx="10" fill="#fff" stroke={CORAL} />
      <rect x="24" y="134" width="50" height="5" rx="2.5" fill={CORAL} />
      <rect x="94" y="126" width="86" height="20" rx="10" fill="#fff" stroke={LINE} />
      <rect x="102" y="134" width="66" height="5" rx="2.5" fill={INK2} />
    </g>
  </Box>
);

export const InboxUI = ({ className }: { className?: string }) => {
  const rows = [
    { c: CORAL, on: true },
    { c: INK, on: false },
    { c: INK3, on: false },
    { c: INK2, on: false },
  ];
  return (
    <Box className={className} viewBox="0 0 320 180">
      <rect width="320" height="180" fill={TINT.default} />
      <rect x="18" y="16" width="284" height="148" rx="12" fill={PAPER} stroke={LINE} />
      <g transform="translate(18 16)">
        <WinChrome w={284} label="rhythmiq · inbox" />
        {rows.map((r, i) => (
          <g key={i} transform={`translate(14 ${40 + i * 28})`}>
            <rect width="256" height="22" rx="6" fill={r.on ? "#fff" : "transparent"} stroke={r.on ? LINE : "transparent"} />
            <circle cx="16" cy="11" r="7" fill={r.c} />
            <rect x="32" y="6" width="90" height="5.5" rx="2.75" fill={INK} />
            <rect x="32" y="14" width="140" height="4.5" rx="2.25" fill={INK3} />
            <rect x="222" y="8" width="24" height="7" rx="3.5" fill={r.on ? CORAL : LINE} />
          </g>
        ))}
      </g>
    </Box>
  );
};
