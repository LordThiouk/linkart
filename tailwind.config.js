/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Background colors (exact Figma values)
        background: '#0A0A0A',
        surface: '#111111',
        'surface-elevated': '#1A1A1A',
        border: '#404040',

        // Primary colors (exact Figma values)
        primary: '#6366F1',
        'primary-foreground': '#F5F5F5',
        secondary: '#F59E0B',
        'secondary-foreground': '#0A0A0A',

        // Accent colors (exact Figma values)
        accent: '#EC4899',
        'accent-foreground': '#F5F5F5',
        cyan: '#06B6D4',

        // Text colors (exact Figma values)
        'text-primary': '#F5F5F5',
        'text-secondary': '#D4D4D4',
        'text-tertiary': '#A3A3A3',

        // Semantic colors
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',

        // Gradient colors
        'gradient-start': '#6366F1',
        'gradient-end': '#8B5CF6',
        'gradient-music-start': '#8B5CF6',
        'gradient-music-mid': '#EC4899',
        'gradient-music-end': '#06B6D4',
      },
      borderRadius: {
        '2xl': '24px',
        xl: '16px',
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      fontFamily: {
        poppins: ['Poppins_700Bold', 'Poppins_600SemiBold', 'Poppins_500Medium'],
        inter: ['Inter_400Regular', 'Inter_500Medium'],
      },
    },
  },
  plugins: [],
};
