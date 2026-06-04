"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NavItem } from "@/constants/links";
import { cn } from "@/lib";

/**
 * Paper-styled desktop nav dropdown (Product / Solutions / Resources / Compare).
 * Opens on hover or click, closes on outside-click / Escape / blur.
 */
const NavDropdown = ({ label, items }: { label: string; items: NavItem[] }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-[15px] font-medium text-ink2 hover:text-ink transition-colors"
      >
        {label}
        <svg
          className={cn("w-2 h-2 opacity-50 transition-transform", open && "rotate-180")}
          viewBox="0 0 12 12"
          aria-hidden
        >
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50"
        >
          <ul
            className="min-w-[248px] rounded-[14px] bg-paper p-2 shadow-[0_24px_48px_-24px_rgba(25,24,20,0.35)]"
            style={{ border: "1px solid var(--line)" }}
          >
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block rounded-[9px] px-3 py-2 hover:bg-paper2 transition-colors"
                >
                  <span className="block text-[14px] font-semibold text-ink">{item.name}</span>
                  {item.description && (
                    <span className="block text-[12.5px] text-ink3 mt-0.5">{item.description}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
