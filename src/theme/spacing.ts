/**
 * Design Tokens - Spacing
 * Source: Figma Design System Linkart
 * Version: 1.0
 *
 * Système d'espacement basé sur multiples de 4px
 */

export const spacing = {
  xs: 4, // 4px - Micro spacing
  sm: 8, // 8px - Small spacing
  md: 16, // 16px - Medium spacing (base)
  lg: 24, // 24px - Large spacing
  xl: 32, // 32px - Extra large spacing
  xxl: 48, // 48px - Double extra large
} as const;

export type SpacingKey = keyof typeof spacing;
