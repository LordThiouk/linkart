/**
 * Design Tokens - Colors
 * Source: Figma Design System Linkart
 * Version: 1.0
 */

export const colors = {
  // Background
  background: '#0A0A0A',
  surface: '#111111',
  surfaceElevated: '#1A1A1A',
  border: '#404040',

  // Brand - Primary
  primary: '#6366F1', // Indigo main
  primaryDark: '#8B5CF6', // Purple variant
  primaryLight: '#A78BFA', // Light purple

  // Brand - Secondary
  secondary: '#F59E0B', // Orange doré (boutons secondaires)

  // Accents
  accent: '#EC4899', // Accent principal (alias de pink)
  accentForeground: '#F5F5F5', // Texte sur accent
  golden: '#F59E0B', // Prix, highlights (alias de secondary)
  pink: '#EC4899', // Heart icon, special
  cyan: '#06B6D4', // Info
  // Success variants
  success: '#22C55E', // Success states
  successDark: '#059669', // Success gradient darker tone
  error: '#EF4444', // Error states
  warning: '#F59E0B', // Warning states

  // Muted (surfaces neutres)
  muted: '#1A1A1A', // Surfaces neutres (alias surfaceElevated)
  mutedForeground: '#A3A3A3', // Texte sur muted

  // Text
  textPrimary: '#F5F5F5', // Titres, texte principal
  textSecondary: '#D4D4D4', // Texte secondaire
  textMuted: '#A3A3A3', // Texte tertiaire, hints

  // Foreground explicites (pour compatibilité Figma)
  foreground: '#F5F5F5', // Alias de textPrimary
  primaryForeground: '#FFFFFF', // Texte sur primary
  secondaryForeground: '#0A0A0A', // Texte sur secondary
  destructiveForeground: '#FFFFFF', // Texte sur destructive

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)', // Modal backdrop
  backdrop: 'rgba(0, 0, 0, 0.8)', // Heavy overlay

  // Focus & Interactive
  ring: '#6366F1', // Focus ring (alias primary)

  // Special UI
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Partner / brand-specific palettes
  wavePrimary: '#00D9FF',
  waveSecondary: '#0099FF',
  orangeMoneyPrimary: '#FF7900',
  orangeMoneySecondary: '#FFB84D',
} as const;

export type ColorKey = keyof typeof colors;
