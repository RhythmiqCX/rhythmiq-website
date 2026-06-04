import Link from "next/link";
import { cn } from "@/lib";

/**
 * Rhythmiq wordmark + CSS brand-mark (the two coral "equalizer" bars in a rounded
 * ink square). `onDark` swaps the mark base to white for the dark footer.
 * The real logo is still TBD — this is the interim brand per the design handoff.
 */
const Brand = ({
  className,
  onDark = false,
  label = "Rhythmiq",
}: {
  className?: string;
  onDark?: boolean;
  label?: string;
}) => {
  return (
    <Link
      href="/"
      aria-label="Rhythmiq home"
      className={cn(
        "inline-flex items-center gap-[9px] font-sans font-bold text-[20px] tracking-[-0.03em]",
        onDark ? "text-onDark" : "text-ink",
        className,
      )}
    >
      <span className="brand-mark" style={onDark ? { background: "#fff" } : undefined} />
      {label}
    </Link>
  );
};

export default Brand;
