/**
 * Design Tokens - Typography
 * Source: Figma Design System Linkart
 * Version: 1.0
 *
 * Font Families:
 * - Poppins: Titres et éléments importants (Bold, SemiBold, Medium)
 * - Inter: Texte courant (Regular, Medium)
 */

export const typography = {
  // Font Families
  fontFamily: {
    poppins: {
      bold: 'Poppins_700Bold',
      semibold: 'Poppins_600SemiBold',
      medium: 'Poppins_500Medium',
    },
    inter: {
      regular: 'Inter_400Regular',
      medium: 'Inter_500Medium',
    },
  },

  // Font Sizes
  fontSize: {
    displayXl: 32, // Hero titles
    headingLg: 24, // Screen titles
    titleMd: 18, // Card titles, section headers
    body: 16, // Body text (base)
    label: 14, // Labels, small text
    caption: 12, // Captions, hints
  },

  // Font Weights (pour inline styles)
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2, // Titres serrés
    normal: 1.5, // Body text standard
    relaxed: 1.75, // Texte aéré
  },
} as const;

export type FontSizeKey = keyof typeof typography.fontSize;
export type FontWeightKey = keyof typeof typography.fontWeight;
