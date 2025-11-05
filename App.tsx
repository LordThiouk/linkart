// Storybook React Native - Activé via variable d'environnement
// Pour activer Storybook, définir EXPO_PUBLIC_STORYBOOK_ENABLED=true dans .env
// Par défaut, l'app normale est chargée

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { ActivityIndicator, View } from 'react-native';

import { theme } from './src/theme';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
// Log des variables d'environnement au démarrage de l'app
console.log("🚀 [App] Démarrage de l'application Linkart...");
console.log(
  '📋 [App] Variables EXPO_PUBLIC_* disponibles:',
  Object.keys(process.env).filter(key => key.startsWith('EXPO_PUBLIC_'))
);
console.log(
  '📋 [App] EXPO_PUBLIC_SUPABASE_URL:',
  process.env.EXPO_PUBLIC_SUPABASE_URL ? `${process.env.EXPO_PUBLIC_SUPABASE_URL.substring(0, 30)}...` : 'undefined'
);
console.log(
  '📋 [App] EXPO_PUBLIC_SUPABASE_ANON_KEY:',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    ? `${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`
    : 'undefined'
);
console.log('📋 [App] EXPO_PUBLIC_STORYBOOK_ENABLED:', process.env.EXPO_PUBLIC_STORYBOOK_ENABLED);

// Initialize Sentry
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter sensitive data
    if (event.user) {
      delete event.user.email;
      delete event.user.phone;
    }
    return event;
  },
});

// Condition pour activer Storybook via variable d'environnement
// Si Storybook est activé, charger Storybook au lieu de l'app normale
const STORYBOOK_ENABLED = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

// ============================================================================
// APP NORMALE (par défaut)
// ============================================================================
function App() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AuthProvider>
              <AppNavigator />
              <StatusBar style="auto" />
            </AuthProvider>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

// Export conditionnel : Storybook ou App normale
console.log('📦 [App] STORYBOOK_ENABLED:', STORYBOOK_ENABLED);
console.log('📦 [App] Export conditionnel:', STORYBOOK_ENABLED ? 'Storybook' : 'App normale');

// eslint-disable-next-line @typescript-eslint/no-require-imports
let AppExport: React.ComponentType;
if (STORYBOOK_ENABLED) {
  console.log('📦 [App] Chargement du module Storybook...');
  try {
    const storybookModule = require('./.rnstorybook');
    console.log('✅ [App] Module Storybook chargé:', storybookModule ? 'oui' : 'non');
    console.log('✅ [App] storybookModule.default:', storybookModule.default ? 'défini' : 'undefined');
    AppExport = storybookModule.default;
  } catch (error) {
    console.error('❌ [App] Erreur lors du chargement de Storybook:', error);
    if (error instanceof Error) {
      console.error('❌ [App] Error type:', error.constructor.name);
      console.error('❌ [App] Error message:', error.message);
      console.error('❌ [App] Error stack:', error.stack);
    }
    // Fallback vers App normale en cas d'erreur
    console.warn('⚠️ [App] Fallback vers App normale');
    AppExport = Sentry.wrap(App);
  }
} else {
  AppExport = Sentry.wrap(App);
}

export default AppExport;
