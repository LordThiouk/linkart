# 🚀 Setup Complet React Native - Linkart Mobile

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Initialisation Projet](#initialisation-projet)
3. [Configuration Expo](#configuration-expo)
4. [Installation Dependencies](#installation-dependencies)
5. [Structure Projet](#structure-projet)
6. [Configuration Files](#configuration-files)
7. [Premier Build](#premier-build)
8. [Workflow Développement](#workflow-développement)

---

## Prérequis

### Logiciels Requis

**macOS (iOS + Android)** :

```bash
# Node.js (v18+)
brew install node

# Watchman
brew install watchman

# Expo CLI
npm install -g expo-cli

# iOS (optional)
xcode-select --install
# Installer Xcode depuis App Store

# Android (optional)
# Installer Android Studio
```

**Windows (Android uniquement)** :

```bash
# Node.js (v18+)
# Télécharger depuis nodejs.org

# Expo CLI
npm install -g expo-cli

# Android Studio
# Télécharger depuis developer.android.com
```

**Linux (Android uniquement)** :

```bash
# Node.js
sudo apt install nodejs npm

# Watchman
# Voir instructions: facebook.github.io/watchman

# Expo CLI
sudo npm install -g expo-cli
```

### Comptes Requis

- [ ] Compte Expo (expo.dev)
- [ ] Compte Apple Developer (pour iOS production)
- [ ] Compte Google Play Console (pour Android production)
- [ ] Compte Supabase (déjà configuré)

---

## Initialisation Projet

### 1. Créer le Projet Expo

```bash
# Créer nouveau projet
npx create-expo-app linkart-mobile --template blank-typescript

# Naviguer dans le dossier
cd linkart-mobile

# Ouvrir dans VS Code
code .
```

### 2. Initialiser Git

```bash
git init
git add .
git commit -m "Initial commit - Expo TypeScript project"
```

### 3. Structure de Base

```bash
# Créer dossiers
mkdir -p src/{screens,components,navigation,hooks,utils,types,theme}
mkdir -p src/screens/{auth,home,marketplace,purchases,profile,inbox,upload}
mkdir -p src/components/{common,cards,navigation}
mkdir -p src/utils/supabase
mkdir -p assets/{fonts,images,icons}
```

---

## Configuration Expo

### app.json

```json
{
  "expo": {
    "name": "Linkart",
    "slug": "linkart-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0A0A0A"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.linkart.mobile",
      "buildNumber": "1.0.0",
      "infoPlist": {
        "NSCameraUsageDescription": "Linkart a besoin d'accéder à votre caméra pour uploader des covers.",
        "NSPhotoLibraryUsageDescription": "Linkart a besoin d'accéder à vos photos pour uploader des covers.",
        "NSMicrophoneUsageDescription": "Linkart a besoin d'accéder au micro pour les previews audio."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0A0A0A"
      },
      "package": "com.linkart.mobile",
      "versionCode": 1,
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "RECORD_AUDIO"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-av",
        {
          "microphonePermission": "Autoriser Linkart à accéder au microphone."
        }
      ],
      [
        "expo-document-picker",
        {
          "iCloudContainerEnvironment": "Production"
        }
      ],
      "expo-router"
    ],
    "extra": {
      "supabaseUrl": process.env.SUPABASE_URL,
      "supabaseAnonKey": process.env.SUPABASE_ANON_KEY
    }
  }
}
```

### .env (Variables d'environnement)

```bash
# Créer fichier .env
touch .env

# Ajouter vos clés Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

**.gitignore** (ajouter) :

```
.env
.env.local
```

---

## Installation Dependencies

### Script d'Installation Complet

Créer **install-deps.sh** :

```bash
#!/bin/bash

echo "🚀 Installation des dépendances Linkart Mobile..."

# Navigation
echo "📱 Navigation..."
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs

# UI & Styling
echo "🎨 UI & Styling..."
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
npm install react-native-paper
npx expo install react-native-vector-icons

# Gradients & Effects
echo "✨ Effects..."
npx expo install expo-linear-gradient
npx expo install expo-blur

# Animations
echo "🎭 Animations..."
npx expo install react-native-reanimated

# Forms & Validation
echo "📝 Forms..."
npm install react-hook-form
npm install zod
npm install @hookform/resolvers

# Audio
echo "🎵 Audio..."
npx expo install expo-av

# Storage
echo "💾 Storage..."
npx expo install @react-native-async-storage/async-storage

# Backend
echo "🔐 Backend..."
npm install @supabase/supabase-js

# File Handling
echo "📁 Files..."
npx expo install expo-document-picker
npx expo install expo-image-picker
npx expo install expo-file-system

# Utilities
echo "🛠️  Utilities..."
npm install date-fns
npm install lodash
npm install @types/lodash --save-dev

# Dev Dependencies
echo "🔧 Dev Dependencies..."
npm install --save-dev @types/react-native
npm install --save-dev typescript

echo "✅ Installation terminée!"
```

Rendre exécutable et lancer :

```bash
chmod +x install-deps.sh
./install-deps.sh
```

### OU Installation Manuelle

```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

# UI & Styling
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
npm install react-native-paper

# Gradients & Effects
npx expo install expo-linear-gradient expo-blur

# Animations
npx expo install react-native-reanimated

# Forms
npm install react-hook-form zod @hookform/resolvers

# Audio
npx expo install expo-av

# Storage
npx expo install @react-native-async-storage/async-storage

# Backend
npm install @supabase/supabase-js

# File Handling
npx expo install expo-document-picker expo-image-picker expo-file-system

# Utilities
npm install date-fns lodash
npm install @types/lodash --save-dev
```

---

## Structure Projet

### Structure Complète

```
linkart-mobile/
├── App.tsx                         # Entry point
├── app.json                        # Expo config
├── package.json
├── tsconfig.json
├── babel.config.js
├── tailwind.config.js
├── metro.config.js
├── .env                            # Variables d'env
├── .gitignore
│
├── src/
│   ├── navigation/
│   │   ├── RootNavigator.tsx       # Navigation racine
│   │   ├── AuthNavigator.tsx       # Stack auth
│   │   ├── MainNavigator.tsx       # Tabs + Stacks
│   │   └── types.ts                # Types navigation
│   │
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── OTPVerificationScreen.tsx
│   │   │   └── ProfileSetupScreen.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── BeatDetailsScreen.tsx
│   │   │   └── ServiceDetailsScreen.tsx
│   │   │
│   │   ├── marketplace/
│   │   │   ├── MarketplaceScreen.tsx
│   │   │   └── SearchFiltersScreen.tsx
│   │   │
│   │   ├── purchases/
│   │   │   ├── CheckoutScreen.tsx
│   │   │   ├── PaymentScreen.tsx
│   │   │   ├── PaymentSuccessScreen.tsx
│   │   │   └── MyPurchasesScreen.tsx
│   │   │
│   │   ├── upload/
│   │   │   └── UploadScreen.tsx
│   │   │
│   │   ├── inbox/
│   │   │   ├── InboxScreen.tsx
│   │   │   └── ChatScreen.tsx
│   │   │
│   │   └── profile/
│   │       ├── ProfileScreen.tsx
│   │       ├── WalletScreen.tsx
│   │       ├── BookingsScreen.tsx
│   │       ├── FavoritesScreen.tsx
│   │       └── NotificationsScreen.tsx
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── PrimaryButton.tsx
│   │   │   ├── InputField.tsx
│   │   │   ├── RatingStars.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── EmptyState.tsx
│   │   │
│   │   ├── cards/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── BeatCard.tsx
│   │   │   ├── PlaylistCard.tsx
│   │   │   └── LicenseCard.tsx
│   │   │
│   │   └── navigation/
│   │       └── CustomTabBar.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSupabase.ts
│   │   ├── usePlayer.ts
│   │   └── useAsyncStorage.ts
│   │
│   ├── utils/
│   │   ├── api.ts                  # API calls
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── mockData.ts
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── info.ts
│   │
│   ├── types/
│   │   ├── navigation.ts
│   │   ├── models.ts
│   │   └── api.ts
│   │
│   └── theme/
│       ├── colors.ts
│       ├── typography.ts
│       ├── spacing.ts
│       └── index.ts
│
└── assets/
    ├── fonts/
    │   ├── Poppins-Regular.ttf
    │   ├── Poppins-Bold.ttf
    │   ├── Inter-Regular.ttf
    │   └── Inter-Medium.ttf
    ├── images/
    │   ├── icon.png
    │   ├── adaptive-icon.png
    │   ├── splash.png
    │   └── favicon.png
    └── icons/
```

---

## Configuration Files

### 1. babel.config.js

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel', 'react-native-reanimated/plugin'],
  };
};
```

### 2. tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          dark: '#8B5CF6',
        },
        background: {
          DEFAULT: '#0A0A0A',
          card: '#111111',
          elevated: '#1A1A1A',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#D4D4D4',
          muted: '#A3A3A3',
        },
        border: {
          DEFAULT: '#404040',
          light: '#262626',
        },
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#06B6D4',
        wave: '#00D9FF',
        orange: '#FF7900',
      },
    },
  },
  plugins: [],
};
```

### 3. metro.config.js

```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.minifierConfig = {
  compress: {
    drop_console: true,
  },
};

module.exports = config;
```

### 4. tsconfig.json

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@navigation/*": ["src/navigation/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"],
      "@theme/*": ["src/theme/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

### 5. app.d.ts (Types NativeWind)

```tsx
/// <reference types="nativewind/types" />
```

### 6. src/theme/index.ts

```tsx
export const colors = {
  primary: {
    DEFAULT: '#6366F1',
    dark: '#8B5CF6',
  },
  background: {
    primary: '#0A0A0A',
    secondary: '#111111',
    tertiary: '#1A1A1A',
    elevated: '#262626',
  },
  text: {
    primary: '#F5F5F5',
    secondary: '#D4D4D4',
    muted: '#A3A3A3',
    disabled: '#737373',
  },
  border: {
    primary: '#404040',
    secondary: '#262626',
  },
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#06B6D4',
  wave: '#00D9FF',
  orange: '#FF7900',
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  gradients: {
    primary: ['#6366F1', '#8B5CF6'],
    success: ['#10B981', '#059669'],
    wave: ['#00D9FF', '#0099FF'],
    orange: ['#FF7900', '#FFB84D'],
  },
};
```

### 7. src/utils/supabase/client.ts

```tsx
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### 8. src/utils/supabase/info.ts

```tsx
import Constants from 'expo-constants';

export const projectId =
  Constants.expoConfig?.extra?.supabaseUrl?.replace('https://', '')?.replace('.supabase.co', '') ||
  '';

export const publicAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || '';
```

### 9. App.tsx (Entry Point)

```tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import RootNavigator from './src/navigation/RootNavigator';
import { theme } from './src/theme';

const paperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: theme.colors.primary.DEFAULT,
    background: theme.colors.background.primary,
    surface: theme.colors.background.secondary,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <RootNavigator />
        <StatusBar style="light" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

---

## Premier Build

### Development

```bash
# Démarrer Metro bundler
npx expo start

# Scanner QR code avec:
# - Expo Go app (iOS/Android)
# - Ou choisir simulator
```

**Options** :

- `i` - Ouvrir iOS simulator
- `a` - Ouvrir Android emulator
- `w` - Ouvrir web browser
- `r` - Reload app
- `m` - Toggle menu

### iOS Simulator (macOS uniquement)

```bash
# Installer simulateur
xcode-select --install

# Lancer build iOS
npx expo run:ios
```

### Android Emulator

```bash
# Créer AVD (Android Virtual Device) dans Android Studio
# Puis lancer:
npx expo run:android
```

### Build Production

**EAS Build (Recommandé)** :

```bash
# Installer EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurer
eas build:configure

# Build iOS
eas build --platform ios

# Build Android
eas build --platform android

# Build Both
eas build --platform all
```

**eas.json** :

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_ANON_KEY": "your-anon-key"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

## Workflow Développement

### Scripts package.json

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "clean": "rm -rf node_modules && npm install",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "type-check": "tsc --noEmit"
  }
}
```

### Hot Reload & Fast Refresh

**Activé par défaut** :

- Éditer un fichier → Sauvegarde automatique → App reload
- État préservé entre reloads
- Erreurs affichées en overlay

### Debugging

**React Native Debugger** :

```bash
# Installer
brew install --cask react-native-debugger

# Lancer
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

**Chrome DevTools** :

- Ouvrir menu (Cmd+D / Shake device)
- "Debug Remote JS"
- Ouvrir Chrome → http://localhost:8081/debugger-ui

**Expo DevTools** :

```bash
# Démarrer avec DevTools
npx expo start --devClient
```

### Testing

**Jest + React Native Testing Library** :

```bash
npm install --save-dev jest @testing-library/react-native

# Run tests
npm test
```

**jest.config.js** :

```js
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
};
```

---

## Checklist Complète

### Setup Initial

- [ ] Node.js installé (v18+)
- [ ] Expo CLI installé globalement
- [ ] Compte Expo créé
- [ ] Projet initialisé avec TypeScript
- [ ] Git initialisé
- [ ] .env créé avec clés Supabase

### Configuration

- [ ] app.json configuré
- [ ] babel.config.js avec plugins
- [ ] tailwind.config.js avec couleurs
- [ ] tsconfig.json avec path aliases
- [ ] metro.config.js optimisé

### Dependencies

- [ ] Navigation installée
- [ ] UI libraries installées
- [ ] Animations installées
- [ ] Supabase client installé
- [ ] AsyncStorage installé
- [ ] File pickers installés

### Structure

- [ ] Dossiers src/ créés
- [ ] Theme configuré
- [ ] Supabase client setup
- [ ] Navigation setup
- [ ] Types définis

### Premier Run

- [ ] `npx expo start` fonctionne
- [ ] App charge sur Expo Go
- [ ] Hot reload fonctionne
- [ ] Pas d'erreurs console

### Production Ready

- [ ] EAS Build configuré
- [ ] Icons & Splash screen créés
- [ ] Permissions configurées (iOS/Android)
- [ ] Environment variables setup
- [ ] Build test réussi

---

## Prochaines Étapes

1. **Convertir les écrans** (voir `/REACT_NATIVE_SCREENS_CONVERSION.md`)
2. **Implémenter navigation** (voir `/REACT_NATIVE_CONVERSION_GUIDE.md`)
3. **Migrer styling** (voir `/REACT_NATIVE_STYLING_GUIDE.md`)
4. **Adapter libraries** (voir `/REACT_NATIVE_LIBRARIES_GUIDE.md`)
5. **Tester sur devices**
6. **Build production**
7. **Submit aux stores**

---

## Ressources

### Documentation

- Expo: https://docs.expo.dev
- React Navigation: https://reactnavigation.org
- React Native: https://reactnative.dev
- Supabase: https://supabase.com/docs

### Communauté

- Expo Discord: https://chat.expo.dev
- React Native Community: https://reactnative.dev/community/overview
- Stack Overflow: tag `react-native` + `expo`

### Outils

- Expo Snack (playground): https://snack.expo.dev
- React Native Directory: https://reactnative.directory

---

**Version**: 1.0.0  
**Dernière Mise à Jour**: Novembre 2024  
**Status**: ✅ Production Ready
