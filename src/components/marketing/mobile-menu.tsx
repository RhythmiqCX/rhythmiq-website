"use client";

import { useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  NAV_GROUPS,
  NAV_LINKS,
  APP_LOGIN_URL,
  BOOK_DEMO_URL,
  CONTACT_URL,
} from "@/constants/links";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className="lg:hidden grid place-items-center w-10 h-10 rounded-lg ring-1 ring-ink/15 text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
            <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-[340px] bg-paper text-ink border-l border-ink/10 font-sans overflow-y-auto"
      >
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="text-ink font-sans">Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-7">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink3 mb-3">
                {group.label}
              </h3>
              <ul className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block py-1.5 text-[15px] font-medium text-ink2 hover:text-ink transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {NAV_LINKS.length > 0 && (
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block py-1.5 text-[15px] font-semibold text-ink hover:text-coral transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col gap-3 pt-5 border-t border-ink/10">
            <Link href={APP_LOGIN_URL} onClick={close} className="text-[15px] font-medium text-ink2 hover:text-ink">
              Log in
            </Link>
            <Link href={CONTACT_URL} onClick={close} className="btn btn-ghost justify-center">
              Contact sales
            </Link>
            <Link href={BOOK_DEMO_URL} onClick={close} className="btn btn-accent justify-center">
              Start free
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
