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
 * Generic template — the vertical-agnostic fallback that fits any local
 * business. Neutral copy on the section eyebrows/headings; everything else is
 * data + theme driven.
 */
const GenericDefault = ({ data }: { data: Prospect }) => (
  <>
    <TryNav data={data} />
    <TryHero data={data} />
    <TryHighlights data={data} />
    <TryMarquee data={data} />
    <TryFeature data={data} />
    <TryServices data={data} eyebrow="What we do" heading="Everything you need, done well." />
    <TryGallery data={data} />
    <TryAbout data={data} />
    <TryTestimonial data={data} />
    <TryCTA data={data} />
    <TryFooter data={data} />
  </>
);

export default GenericDefault;
