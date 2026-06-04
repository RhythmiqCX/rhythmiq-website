import Link from "next/link";
import Brand from "./restaurant/brand";
import NavDropdown from "./nav-dropdown";
import MobileMenu from "./mobile-menu";
import {
  NAV_GROUPS,
  NAV_LINKS,
  APP_LOGIN_URL,
  BOOK_DEMO_URL,
  CONTACT_URL,
  DEMO_URL,
} from "@/constants/links";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-ink/[0.08]">
      <div className="wrap flex items-center gap-7 h-16">
        <Brand />

        <nav className="hidden lg:flex items-center gap-[22px]" aria-label="Primary">
          {NAV_GROUPS.map((group) => (
            <NavDropdown key={group.label} label={group.label} items={group.items} />
          ))}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-ink2 hover:text-ink transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <span className="flex-1" />

        <div className="flex items-center gap-4">
          <Link
            href={APP_LOGIN_URL}
            className="hidden lg:inline whitespace-nowrap text-[15px] font-medium text-ink2 hover:text-ink transition-colors"
          >
            Log in
          </Link>
          <Link
            href={CONTACT_URL}
            className="hidden lg:inline whitespace-nowrap text-[15px] font-medium text-ink2 hover:text-ink transition-colors"
          >
            Contact sales
          </Link>
          <Link href={DEMO_URL} className="btn btn-ghost hidden sm:inline-flex shrink-0">
            Watch demo
          </Link>
          <Link href={BOOK_DEMO_URL} className="pill-cta shrink-0">
            Start free
            <span className="dot">
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M3 6h6M6 3l3 3-3 3"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
