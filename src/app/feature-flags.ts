export const featureDefaults = {
  hero_variant: 'studio', // 'studio' | 'launch'
  quick_actions: false,
  show_testimonials: false
} as const;

export type FeatureKey = keyof typeof featureDefaults;
