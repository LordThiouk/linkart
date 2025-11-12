/**
 * Design Tokens - Border Radius
 * Source: Figma Design System Linkart
 * Version: 1.0
 *
 * Système de border radius pour cohérence UI
 */

export const radii = {
  sm: 8, // 8px - Petits éléments (chips, tags)
  md: 12, // 12px - Cards standards
  lg: 16, // 16px - Large cards
  xl: 20, // 20px - Extra large cards
  xxl: 24, // 24px - Buttons, hero cards
  full: 9999, // Cercles parfaits (avatars, pills)
} as const;

export type RadiiKey = keyof typeof radii;
