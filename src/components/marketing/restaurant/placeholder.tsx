import { cn } from "@/lib";

type Tint = "default" | "sky" | "coral" | "sand" | "ink";

const TINT_CLASS: Record<Tint, string> = {
  default: "",
  sky: "ph-sky",
  coral: "ph-coral",
  sand: "ph-sand",
  ink: "ph-ink",
};

/**
 * Striped placeholder box with a mono caption chip (design handoff `.ph`).
 * Swap these for real photography/illustration as assets land — the `tag`
 * documents the intended image.
 */
const Placeholder = ({
  tag,
  tint = "default",
  className,
}: {
  tag?: string;
  tint?: Tint;
  className?: string;
}) => {
  return (
    <div className={cn("ph", TINT_CLASS[tint], className)}>
      {tag && <span className="ph-tag">{tag}</span>}
    </div>
  );
};

export default Placeholder;
