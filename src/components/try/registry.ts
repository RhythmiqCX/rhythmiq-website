import type { ComponentType } from "react";
import type { Prospect } from "@/lib/try/schema";
import GenericDefault from "./templates/generic/default";
import RestaurantWarmEditorial from "./templates/restaurant/warm-editorial";
import RestaurantBoldDark from "./templates/restaurant/bold-dark";
import RestaurantRetroVibe from "./templates/restaurant/retro-vibe";
import DentistCleanClinic from "./templates/dentist/clean-clinic";
import PetsBoutiqueHero from "./templates/pets/boutique-hero";
import RealEstateLuxuryEstate from "./templates/realestate/luxury-estate";
import ArchitectureLayeredDepth from "./templates/architecture/layered-depth";
import RetailWildScent from "./templates/retail/wild-scent";
import BeautyLuxuryBotanical from "./templates/beauty/luxury-botanical";
import FinanceSynthesis from "./templates/finance/synthesis";
import TravelScenic from "./templates/travel/scenic";
import SecurityAkor from "./templates/security/akor";
import EducationRetroStudy from "./templates/education/retro-study";

export type TemplateProps = { data: Prospect };
export type Template = ComponentType<TemplateProps>;

/**
 * vertical -> variantId -> template. Each vertical should define a `default`
 * variant so an unknown/typo'd variant still resolves. Add a vertical by
 * importing its templates and adding one entry here.
 */
export const REGISTRY: Record<string, Record<string, Template>> = {
  generic: {
    default: GenericDefault,
  },
  restaurant: {
    default: RestaurantWarmEditorial,
    "warm-editorial": RestaurantWarmEditorial,
    "bold-dark": RestaurantBoldDark,
    "retro-vibe": RestaurantRetroVibe,
  },
  dentist: {
    default: DentistCleanClinic,
    "clean-clinic": DentistCleanClinic,
  },
  pets: {
    default: PetsBoutiqueHero,
    "boutique-hero": PetsBoutiqueHero,
  },
  realestate: {
    default: RealEstateLuxuryEstate,
    "luxury-estate": RealEstateLuxuryEstate,
  },
  architecture: {
    default: ArchitectureLayeredDepth,
    "layered-depth": ArchitectureLayeredDepth,
  },
  retail: {
    default: RetailWildScent,
    "wild-scent": RetailWildScent,
  },
  beauty: {
    default: BeautyLuxuryBotanical,
    "luxury-botanical": BeautyLuxuryBotanical,
  },
  finance: {
    default: FinanceSynthesis,
    synthesis: FinanceSynthesis,
  },
  travel: {
    default: TravelScenic,
    scenic: TravelScenic,
  },
  security: {
    default: SecurityAkor,
    akor: SecurityAkor,
  },
  education: {
    default: EducationRetroStudy,
    "retro-study": EducationRetroStudy,
  },
};

/** Resolve a template with graceful fallback: variant → vertical default → generic. */
export function pickTemplate(vertical: string, variant: string): Template {
  return (
    REGISTRY[vertical]?.[variant] ??
    REGISTRY[vertical]?.default ??
    REGISTRY.generic.default
  );
}
