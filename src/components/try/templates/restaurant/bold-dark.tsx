import type { Prospect } from "@/lib/try/schema";
import TryNav from "../../sections/nav";
import TryHero from "../../sections/hero";
import TryHighlights from "../../sections/highlights";
import TryMarquee from "../../sections/marquee";
import TryFeature from "../../sections/feature";
import TryServices from "../../sections/services";
import TryGallery from "../../sections/gallery";
import TryAbout from "../../sections/about";
import TryTestimonial from "../../sections/testimonial";
import TryCTA from "../../sections/cta";
import TryFooter from "../../sections/footer";

/**
 * Restaurant · Bold dark — the cinematic dark variant (pair with a dark theme
 * scheme + a Ken-Burns or particle hero). Same sections, punchier copy.
 */
const RestaurantBoldDark = ({ data }: { data: Prospect }) => (
  <>
    <TryNav data={data} />
    <TryHero data={data} />
    <TryHighlights data={data} />
    <TryMarquee data={data} />
    <TryFeature data={data} label="The house signature" />
    <TryServices data={data} eyebrow="What we serve" heading="Flavour, turned all the way up." />
    <TryGallery data={data} />
    <TryAbout data={data} />
    <TryTestimonial data={data} />
    <TryCTA data={data} headline="Pull up a chair." />
    <TryFooter data={data} />
  </>
);

export default RestaurantBoldDark;
