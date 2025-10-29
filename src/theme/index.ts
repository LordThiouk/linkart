import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

// --- 1. Définition des Polices (Typographie) ---
// Conforme à la directive : Poppins pour les titres, Inter pour le corps.
const fontConfig = {
  displayLarge: { fontFamily: 'Poppins_700Bold', fontSize: 57, letterSpacing: 0 },
  displayMedium: { fontFamily: 'Poppins_600SemiBold', fontSize: 45, letterSpacing: 0 },
  displaySmall: { fontFamily: 'Poppins_500Medium', fontSize: 36, letterSpacing: 0 },
  headlineLarge: { fontFamily: 'Poppins_600SemiBold', fontSize: 32, letterSpacing: 0 },
  headlineMedium: { fontFamily: 'Poppins_500Medium', fontSize: 28, letterSpacing: 0 },
  headlineSmall: { fontFamily: 'Poppins_500Medium', fontSize: 24, letterSpacing: 0 },
  titleLarge: { fontFamily: 'Poppins_500Medium', fontSize: 22, letterSpacing: 0 },
  titleMedium: { fontFamily: 'Poppins_500Medium', fontSize: 16, letterSpacing: 0.15 },
  titleSmall: { fontFamily: 'Poppins_500Medium', fontSize: 14, letterSpacing: 0.1 },
  labelLarge: { fontFamily: 'Inter_500Medium', fontSize: 14, letterSpacing: 0.1 },
  labelMedium: { fontFamily: 'Inter_500Medium', fontSize: 12, letterSpacing: 0.5 },
  labelSmall: { fontFamily: 'Inter_500Medium', fontSize: 11, letterSpacing: 0.5 },
  bodyLarge: { fontFamily: 'Inter_400Regular', fontSize: 16, letterSpacing: 0.15 },
  bodyMedium: { fontFamily: 'Inter_400Regular', fontSize: 14, letterSpacing: 0.25 },
  bodySmall: { fontFamily: 'Inter_400Regular', fontSize: 12, letterSpacing: 0.4 },
};

// --- 2. Palette de Couleurs Moderne ---
// Inspirée par les apps musicales modernes (Spotify, Apple Music, SoundCloud)
const colors = {
  // Couleurs de marque - Palette moderne et vibrante
  primary: '#6366F1', // Indigo moderne (plus doux que l'ancien violet)
  primaryContainer: '#E0E7FF', // Indigo très clair pour les containers
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#1E1B4B',
  secondary: '#F59E0B', // Orange doré maintenu
  secondaryContainer: '#FEF3C7', // Jaune très clair
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#92400E',

  // Palette sombre moderne (inspirée Spotify/Discord)
  dark: {
    '950': '#0A0A0A', // Noir profond
    '900': '#111111', // Fond principal ultra sombre
    '800': '#1A1A1A', // Surface sombre
    '700': '#262626', // Surface élevée
    '600': '#404040', // Bordures
    '500': '#737373', // Texte secondaire
    '400': '#A3A3A3', // Texte tertiaire
    '300': '#D4D4D4', // Texte principal
    '200': '#E5E5E5', // Texte sur fond sombre
    '100': '#F5F5F5', // Texte sur fond très sombre
  },

  // Palette claire moderne
  light: {
    '50': '#FAFAFA', // Fond principal ultra clair
    '100': '#F5F5F5', // Surface claire
    '200': '#E5E5E5', // Bordures claires
    '300': '#D4D4D4', // Bordures moyennes
    '400': '#A3A3A3', // Texte tertiaire
    '500': '#737373', // Texte secondaire
    '600': '#525252', // Texte principal
    '700': '#404040', // Texte sur fond clair
    '800': '#262626', // Texte sur fond très clair
    '900': '#171717', // Texte sur fond ultra clair
  },

  // Couleurs sémantiques modernes
  success: '#22C55E', // Vert moderne
  successContainer: '#DCFCE7',
  onSuccess: '#FFFFFF',
  onSuccessContainer: '#166534',
  warning: '#F59E0B', // Orange maintenu
  warningContainer: '#FEF3C7',
  onWarning: '#FFFFFF',
  onWarningContainer: '#92400E',
  error: '#EF4444', // Rouge maintenu
  errorContainer: '#FEE2E2',
  onError: '#FFFFFF',
  onErrorContainer: '#991B1B',

  info: '#3B82F6', // Bleu moderne
  infoContainer: '#DBEAFE',
  onInfo: '#FFFFFF',
  onInfoContainer: '#1E40AF',

  // Couleurs spéciales pour l'app musicale
  music: {
    purple: '#8B5CF6', // Violet musical
    pink: '#EC4899', // Rose vibrant
    cyan: '#06B6D4', // Cyan électrique
    lime: '#84CC16', // Vert lime
  },

  // Gradients (pour les effets visuels)
  gradients: {
    primary: ['#6366F1', '#8B5CF6'], // Indigo vers violet
    secondary: ['#F59E0B', '#EC4899'], // Orange vers rose
    success: ['#22C55E', '#84CC16'], // Vert vers lime
    music: ['#8B5CF6', '#EC4899', '#06B6D4'], // Arc-en-ciel musical
  },

  // Couleurs de base
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// --- 3. Thème Sombre Moderne (par défaut) ---
// Ambiance "studio de musique digital" avec design moderne
const DarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 16, // Arrondis plus modernes
  colors: {
    ...MD3DarkTheme.colors,
    // Couleurs principales
    primary: colors.primary,
    onPrimary: colors.onPrimary,
    primaryContainer: colors.primaryContainer,
    onPrimaryContainer: colors.onPrimaryContainer,
    secondary: colors.secondary,
    onSecondary: colors.onSecondary,
    secondaryContainer: colors.secondaryContainer,
    onSecondaryContainer: colors.onSecondaryContainer,
    // Surfaces et fonds
    background: colors.dark['950'],
    onBackground: colors.dark['100'],
    surface: colors.dark['900'],
    onSurface: colors.dark['100'],
    surfaceVariant: colors.dark['800'],
    onSurfaceVariant: colors.dark['300'],
    // surfaceContainerHighest: colors.dark['700'], // Not in MD3Colors type
    // Bordures et outlines
    outline: colors.dark['600'],
    outlineVariant: colors.dark['700'],
    // Couleurs sémantiques
    error: colors.error,
    onError: colors.onError,
    errorContainer: colors.errorContainer,
    onErrorContainer: colors.onErrorContainer,
    // success: colors.success, // Not in MD3Colors type
    // onSuccess: colors.onSuccess, // Not in MD3Colors type
    // successContainer: colors.successContainer, // Not in MD3Colors type
    // onSuccessContainer: colors.onSuccessContainer, // Not in MD3Colors type
    // warning: colors.warning, // Not in MD3Colors type
    // onWarning: colors.onWarning, // Not in MD3Colors type
    // warningContainer: colors.warningContainer, // Not in MD3Colors type
    // onWarningContainer: colors.onWarningContainer, // Not in MD3Colors type
    // info: colors.info, // Not in MD3Colors type
    // onInfo: colors.onInfo, // Not in MD3Colors type
    // infoContainer: colors.infoContainer, // Not in MD3Colors type
    // onInfoContainer: colors.onInfoContainer, // Not in MD3Colors type
    // Couleurs personnalisées
    // accent: colors.secondary, // Not in MD3Colors type
    // muted: colors.dark['400'], // Not in MD3Colors type
    // Effets
    backdrop: 'rgba(0, 0, 0, 0.8)',
    shadow: colors.black,
    scrim: 'rgba(0, 0, 0, 0.6)',
  },
  fonts: configureFonts({ config: fontConfig }),
};

// --- 4. Thème Clair Moderne ---
// Ambiance "pro" pour web admin ou préférence utilisateur
const LightTheme: MD3Theme = {
  ...MD3LightTheme,
  dark: false,
  roundness: 16, // Arrondis cohérents avec le thème sombre
  colors: {
    ...MD3LightTheme.colors,
    // Couleurs principales
    primary: colors.primary,
    onPrimary: colors.onPrimary,
    primaryContainer: colors.primaryContainer,
    onPrimaryContainer: colors.onPrimaryContainer,
    secondary: colors.secondary,
    onSecondary: colors.onSecondary,
    secondaryContainer: colors.secondaryContainer,
    onSecondaryContainer: colors.onSecondaryContainer,
    // Surfaces et fonds
    background: colors.light['50'],
    onBackground: colors.light['900'],
    surface: colors.white,
    onSurface: colors.light['900'],
    surfaceVariant: colors.light['100'],
    onSurfaceVariant: colors.light['600'],
    // surfaceContainerHighest: colors.light['200'], // Not in MD3Colors type
    // Bordures et outlines
    outline: colors.light['300'],
    outlineVariant: colors.light['200'],
    // Couleurs sémantiques
    error: colors.error,
    onError: colors.onError,
    errorContainer: colors.errorContainer,
    onErrorContainer: colors.onErrorContainer,
    // success: colors.success, // Not in MD3Colors type
    // onSuccess: colors.onSuccess, // Not in MD3Colors type
    // successContainer: colors.successContainer, // Not in MD3Colors type
    // onSuccessContainer: colors.onSuccessContainer, // Not in MD3Colors type
    // warning: colors.warning, // Not in MD3Colors type
    // onWarning: colors.onWarning, // Not in MD3Colors type
    // warningContainer: colors.warningContainer, // Not in MD3Colors type
    // onWarningContainer: colors.onWarningContainer, // Not in MD3Colors type
    // info: colors.info, // Not in MD3Colors type
    // onInfo: colors.onInfo, // Not in MD3Colors type
    // infoContainer: colors.infoContainer, // Not in MD3Colors type
    // onInfoContainer: colors.onInfoContainer, // Not in MD3Colors type
    // Couleurs personnalisées
    // accent: colors.secondary, // Not in MD3Colors type
    // muted: colors.light['400'], // Not in MD3Colors type
    // Effets
    backdrop: 'rgba(0, 0, 0, 0.5)',
    shadow: colors.black,
    scrim: 'rgba(0, 0, 0, 0.3)',
  },
  fonts: configureFonts({ config: fontConfig }),
};

// --- 5. Tokens de Design Moderne ---
export const tokens = {
  // Espacement moderne (basé sur 8px grid)
  spacing: {
    xs: 4, // 0.25rem
    sm: 8, // 0.5rem
    md: 16, // 1rem
    lg: 24, // 1.5rem
    xl: 32, // 2rem
    '2xl': 48, // 3rem
    '3xl': 64, // 4rem
  },

  // Rayons modernes
  radii: {
    none: 0,
    sm: 4, // Petit arrondi
    md: 8, // Arrondi moyen
    lg: 16, // Arrondi large (cohérent avec roundness)
    xl: 24, // Très grand arrondi
    '2xl': 32, // Arrondi extra large
    full: 999, // Cercle parfait
  },

  // Ombres modernes (inspirées Material Design 3)
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
    xl: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 12,
    },
  },

  // Animations et transitions
  animations: {
    fast: 150, // ms
    normal: 300, // ms
    slow: 500, // ms
  },

  // Z-index (pour les layers)
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Breakpoints (pour responsive)
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    '2xl': 1400,
  },
};

// --- 6. Thème étendu avec tokens ---
// Étendre le thème avec nos tokens personnalisés
const extendThemeWithTokens = (baseTheme: MD3Theme) => ({
  ...baseTheme,
  spacing: tokens.spacing,
  radii: tokens.radii,
  shadows: tokens.shadows,
  animations: tokens.animations,
  zIndex: tokens.zIndex,
  breakpoints: tokens.breakpoints,
  colors: {
    ...baseTheme.colors,
    // Ajouter nos couleurs personnalisées
    music: colors.music,
    gradients: colors.gradients,
    success: colors.success,
    successContainer: colors.successContainer,
    onSuccess: colors.onSuccess,
    onSuccessContainer: colors.onSuccessContainer,
    warning: colors.warning,
    warningContainer: colors.warningContainer,
    onWarning: colors.onWarning,
    onWarningContainer: colors.onWarningContainer,
    info: colors.info,
    infoContainer: colors.infoContainer,
    onInfo: colors.onInfo,
    onInfoContainer: colors.onInfoContainer,
    accent: colors.secondary,
    muted: baseTheme.dark ? colors.dark['400'] : colors.light['400'],
  },
});

// --- 8. Exportations ---
export const darkTheme = extendThemeWithTokens(DarkTheme);
export const lightTheme = extendThemeWithTokens(LightTheme);

// Le thème sombre est celui par défaut pour l'application mobile.
export const theme = darkTheme;

// --- 9. Styles personnalisés pour les composants ---
export const componentStyles = {
  // Styles pour les boutons modernes
  button: {
    primary: {
      borderRadius: tokens.radii.lg,
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    secondary: {
      borderRadius: tokens.radii.lg,
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
      borderWidth: 1,
    },
    ghost: {
      borderRadius: tokens.radii.lg,
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
    },
  },

  // Styles pour les cards modernes
  card: {
    borderRadius: tokens.radii.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // Styles pour les inputs modernes
  input: {
    borderRadius: tokens.radii.md,
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.lg,
    borderWidth: 1,
  },
};
