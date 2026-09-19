import Link from "next/link";

/**
 * Full-width ink announcement strip above the nav (design handoff section 1).
 * Copy/target are placeholders the team can edit; keep it a single short line.
 */
const AnnouncementBar = () => {
  return (
    <div className="bg-ink text-onDark text-[13.5px] text-center py-2.5 px-4 flex items-center justify-center gap-2.5 font-sans">
      <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-coral border border-coral/50 rounded-full px-2 py-0.5">
        New
      </span>
      <span className="hidden sm:inline">
        See how D2C brands cut RTO and NDR with voice AI that never misses a call.
      </span>
      <span className="sm:hidden">Cut RTO and NDR with voice AI.</span>
      <Link
        href="/use-cases"
        className="text-white underline underline-offset-2 font-semibold whitespace-nowrap"
      >
        See the use cases →
      </Link>
    </div>
  );
};

export default AnnouncementBar;
