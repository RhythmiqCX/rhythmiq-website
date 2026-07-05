import Preloader from "./preloader";
import DevNav from "./nav";
import DevHero from "./hero";
import DevMarquee from "./marquee";
import DevServices from "./services";
import DevWork from "./work";
import DevProcess from "./process";
import DevAbout from "./about";
import DevCTA from "./cta";
import DevFooter from "./footer";

/**
 * Rhythmiq Dev homepage (dev.rhythmiqcx.com) — the studio arm's single-page
 * marketing site. Composes the full approved design top-to-bottom. Each
 * interactive piece (preloader, nav, hero parallax, process scrollytelling)
 * owns its own client-side effects; this shell stays a server component.
 */
const DevLanding = () => {
  return (
    <div className="bg-paper text-ink font-sans" style={{ overflowX: "clip" }}>
      <Preloader />
      <DevNav />
      <DevHero />
      <DevMarquee />
      <DevServices />
      <DevWork />
      <DevProcess />
      <DevAbout />
      <DevCTA />
      <DevFooter />
    </div>
  );
};

export default DevLanding;
