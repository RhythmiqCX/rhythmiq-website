import Link from "next/link";
import { cn } from "@/lib";
import { LogoMark } from "./logo";

/**
 * Rhythmiq wordmark + logo mark (a calligraphic "R" with a coral beat dot in a
 * rounded square). `onDark` inverts the mark for the dark footer.
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
      <LogoMark size={24} onDark={onDark} />
      {label}
    </Link>
  );
};

export default Brand;
