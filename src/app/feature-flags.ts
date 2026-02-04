export const featureDefaults = {
  hero_variant: 'studio',
  quick_actions: false,
  show_testimonials: false
} as const;

export type FeatureKey = keyof typeof featureDefaults;
