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
 * Restaurant · Warm editorial — the light "paper + coral" variant. Best paired
 * with a Ken-Burns hero on the venue's own food/room photo.
 */
const RestaurantWarmEditorial = ({ data }: { data: Prospect }) => (
  <>
    <TryNav data={data} />
    <TryHero data={data} />
    <TryHighlights data={data} />
    <TryMarquee data={data} />
    <TryFeature data={data} label="The house signature" />
    <TryServices data={data} eyebrow="On the menu" heading="Made to be remembered." />
    <TryGallery data={data} />
    <TryAbout data={data} />
    <TryTestimonial data={data} />
    <TryCTA data={data} headline="Come hungry." />
    <TryFooter data={data} />
  </>
);

export default RestaurantWarmEditorial;
