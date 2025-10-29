import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Expo modules
jest.mock('expo-av', () => ({
  Audio: {
    setAudioModeAsync: jest.fn(),
    Sound: {
      createAsync: jest.fn(),
    },
  },
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
  },
}));

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithOtp: jest.fn().mockResolvedValue({ data: {}, error: null }),
      verifyOtp: jest.fn().mockResolvedValue({ data: {}, error: null }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      upsert: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null }),
    })),
  })),
}));

// Mock React Native Paper
jest.mock('react-native-paper', () => {
  const mockTheme = {
    colors: {
      primary: '#6366F1',
      onPrimary: '#FFFFFF',
      surface: '#111111',
      onSurface: '#F5F5F5',
      onSurfaceVariant: '#A3A3A3',
      outline: '#404040',
      music: {
        pink: '#EC4899',
      },
    },
    roundness: 16,
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    fonts: {
      titleMedium: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
      },
      bodyMedium: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
      },
      bodySmall: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
      },
      labelMedium: {
        fontSize: 12,
        fontFamily: 'Inter_500Medium',
      },
    },
  };

  return {
    useTheme: jest.fn(() => mockTheme),
    PaperProvider: 'PaperProvider',
    Button: 'Button',
    Card: 'Card',
    Text: 'Text',
    Surface: 'Surface',
    IconButton: 'IconButton',
    ActivityIndicator: 'ActivityIndicator',
    Divider: 'Divider',
    Badge: 'Badge',
    Avatar: 'Avatar',
    Chip: 'Chip',
    Portal: 'Portal',
    Modal: 'Modal',
    Provider: 'Provider',
    MD3DarkTheme: {},
    MD3LightTheme: {},
    configureFonts: jest.fn(),
  };
});

// Mock Lucide React Native
jest.mock('lucide-react-native', () => ({
  Heart: 'Heart',
  Play: 'Play',
  Pause: 'Pause',
  Eye: 'Eye',
  Download: 'Download',
  Search: 'Search',
  X: 'X',
  SkipForward: 'SkipForward',
}));

// Mock Sentry
jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
}));

// Mock Expo modules
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        supabaseUrl: 'https://test.supabase.co',
        supabaseAnonKey: 'test-key',
      },
    },
  },
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// Mock @storybook/react
jest.mock('@storybook/react', () => ({
  composeStories: jest.fn(stories => stories),
}));

// Global test setup
global.fetch = jest.fn();
global.console = {
  ...console,
  // Suppress console warnings in tests
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock global variables
global.__DEV__ = true;
