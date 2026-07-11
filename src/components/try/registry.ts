import type { ComponentType } from "react";
import type { Prospect } from "@/lib/try/schema";
import GenericDefault from "./templates/generic/default";
import RestaurantWarmEditorial from "./templates/restaurant/warm-editorial";
import RestaurantBoldDark from "./templates/restaurant/bold-dark";
import RestaurantRetroVibe from "./templates/restaurant/retro-vibe";
import DentistCleanClinic from "./templates/dentist/clean-clinic";
import PetsBoutiqueHero from "./templates/pets/boutique-hero";

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
};

/** Resolve a template with graceful fallback: variant → vertical default → generic. */
export function pickTemplate(vertical: string, variant: string): Template {
  return (
    REGISTRY[vertical]?.[variant] ??
    REGISTRY[vertical]?.default ??
    REGISTRY.generic.default
  );
}
