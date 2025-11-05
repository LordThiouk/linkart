# 🔄 Guide de Conversion React Web → React Native

## 📋 Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [Différences Fondamentales](#différences-fondamentales)
3. [Setup Projet React Native](#setup-projet-react-native)
4. [Architecture & Navigation](#architecture--navigation)
5. [Conversion des Composants](#conversion-des-composants)
6. [Styling : Tailwind → React Native](#styling--tailwind--react-native)
7. [Libraries & Packages](#libraries--packages)
8. [Backend Supabase](#backend-supabase)
9. [Checklist Conversion](#checklist-conversion)

---

## Vue d'Ensemble

### Application Actuelle (React Web)

```
Stack:
- React 18 (Web)
- Tailwind CSS v4
- React Router DOM
- ShadCN UI (Web)
- Lucide React icons
- Supabase Client

Output:
→ Application web (navigateur)
→ PWA possible
```

### Application Cible (React Native)

```
Stack:
- React Native + Expo
- NativeWind ou StyleSheet
- React Navigation
- React Native UI libs
- React Native Vector Icons
- Supabase Client (même!)

Output:
→ Application native iOS
→ Application native Android
```

---

## Différences Fondamentales

### 1. Composants de Base

| React Web               | React Native                         | Notes                              |
| ----------------------- | ------------------------------------ | ---------------------------------- |
| `<div>`                 | `<View>`                             | Container principal                |
| `<span>`, `<p>`, `<h1>` | `<Text>`                             | Tout texte doit être dans `<Text>` |
| `<input>`               | `<TextInput>`                        | Gestion différente                 |
| `<button>`              | `<TouchableOpacity>` / `<Pressable>` | Gestion tactile                    |
| `<img>`                 | `<Image>`                            | API différente                     |
| `<a>`                   | `<TouchableOpacity>` + navigation    | Pas de liens directs               |
| `<ul>`, `<li>`          | `<FlatList>` / `<ScrollView>`        | Optimisé mobile                    |

### 2. Props & Styling

| React Web                | React Native                                |
| ------------------------ | ------------------------------------------- |
| `className="text-white"` | `style={styles.text}`                       |
| `className="flex gap-4"` | `style={{ flexDirection: 'row', gap: 16 }}` |
| CSS classes              | StyleSheet objects                          |
| Tailwind utilities       | Inline styles ou NativeWind                 |

### 3. Events

| React Web    | React Native                   |
| ------------ | ------------------------------ |
| `onClick`    | `onPress`                      |
| `onChange`   | `onChangeText` (TextInput)     |
| `onSubmit`   | Custom handling                |
| Hover states | Touch states (`activeOpacity`) |

---

## Setup Projet React Native

### Option 1 : Expo (Recommandé) ✅

```bash
# Créer nouveau projet Expo
npx create-expo-app linkart-mobile --template blank-typescript

cd linkart-mobile

# Installer dépendances essentielles
npx expo install expo-router
npx expo install react-native-safe-area-context
npx expo install react-native-screens
npx expo install @react-navigation/native
npx expo install @react-navigation/native-stack
npx expo install @react-navigation/bottom-tabs

# Supabase (même backend!)
npm install @supabase/supabase-js

# UI & Icons
npm install react-native-vector-icons
npx expo install expo-linear-gradient
npx expo install expo-blur

# NativeWind (Tailwind pour RN)
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
```

### Option 2 : React Native CLI

```bash
npx react-native init LinkartMobile --template react-native-template-typescript

cd LinkartMobile

# Installer navigation
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# Reste identique à Expo
```

### Configuration NativeWind

**tailwind.config.js** :

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
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
      },
    },
  },
  plugins: [],
};
```

**babel.config.js** :

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
```

---

## Architecture & Navigation

### Structure de Projet React Native

```
linkart-mobile/
├── App.tsx                    # Entry point
├── app.json                   # Expo config
├── babel.config.js
├── tailwind.config.js
│
├── src/
│   ├── navigation/
│   │   ├── RootNavigator.tsx      # Navigation principale
│   │   ├── AuthNavigator.tsx      # Stack auth
│   │   ├── MainNavigator.tsx      # Tabs + Stacks
│   │   └── types.ts               # Navigation types
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
│   │       └── NotificationsScreen.tsx
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── PrimaryButton.tsx
│   │   │   ├── InputField.tsx
│   │   │   ├── RatingStars.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   ├── cards/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── BeatCard.tsx
│   │   │   └── PlaylistCard.tsx
│   │   │
│   │   └── navigation/
│   │       └── BottomTabBar.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSupabase.ts
│   │   └── usePlayer.ts
│   │
│   ├── utils/
│   │   ├── api.ts
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── info.ts
│   │   └── constants.ts
│   │
│   ├── types/
│   │   ├── navigation.ts
│   │   ├── models.ts
│   │   └── api.ts
│   │
│   └── theme/
│       ├── colors.ts
│       ├── typography.ts
│       └── spacing.ts
│
└── assets/
    ├── fonts/
    ├── images/
    └── icons/
```

### Navigation Setup

**src/navigation/RootNavigator.tsx** :

```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**src/navigation/AuthNavigator.tsx** :

```tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import ProfileSetupScreen from '../screens/auth/ProfileSetupScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    </Stack.Navigator>
  );
}
```

**src/navigation/MainNavigator.tsx** :

```tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import MarketplaceScreen from '../screens/marketplace/MarketplaceScreen';
import UploadScreen from '../screens/upload/UploadScreen';
import InboxScreen from '../screens/inbox/InboxScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home Stack
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="BeatDetails" component={BeatDetailsScreen} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
    </Stack.Navigator>
  );
}

// Marketplace Stack
function MarketplaceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MarketplaceMain" component={MarketplaceScreen} />
      <Stack.Screen name="SearchFilters" component={SearchFiltersScreen} />
      <Stack.Screen name="BeatDetails" component={BeatDetailsScreen} />
    </Stack.Navigator>
  );
}

// Profile Stack
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Bookings" component={BookingsScreen} />
      <Stack.Screen name="MyPurchases" component={MyPurchasesScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0A0A',
          borderTopColor: '#262626',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#737373',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Marketplace':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Upload':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case 'Inbox':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Marketplace" component={MarketplaceStack} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
```

**Navigation Types** (`src/navigation/types.ts`) :

```tsx
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

// Auth Stack Params
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  OTPVerification: { phoneNumber: string };
  ProfileSetup: undefined;
};

// Home Stack Params
export type HomeStackParamList = {
  HomeMain: undefined;
  BeatDetails: { beatId: string };
  ServiceDetails: { serviceId: string };
  Checkout: { productId: string; productType: 'beat' | 'service' };
  Payment: { checkoutData: CheckoutData };
  PaymentSuccess: {
    transactionId: string;
    productTitle: string;
    licenseType: string;
    amount: number;
  };
};

// Tab Params
export type MainTabParamList = {
  Home: undefined;
  Marketplace: undefined;
  Upload: undefined;
  Inbox: undefined;
  Profile: undefined;
};

// Navigation Props
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

export type BeatDetailsScreenRouteProp = RouteProp<HomeStackParamList, 'BeatDetails'>;
```

---

## Conversion des Composants

### Exemple 1 : PrimaryButton

**React Web (actuel)** :

```tsx
// components/PrimaryButton.tsx
import React from 'react';

interface PrimaryButtonProps {
  title: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function PrimaryButton({
  title,
  onClick,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-4 rounded-2xl
        ${fullWidth ? 'w-full' : ''}
        ${
          variant === 'primary'
            ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white'
            : 'bg-[#262626] text-[#D4D4D4]'
        }
        ${disabled ? 'opacity-50' : ''}
      `}
    >
      {title}
    </button>
  );
}
```

**React Native (converti)** :

```tsx
// src/components/common/PrimaryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  loading = false,
}: PrimaryButtonProps) {
  const isPrimary = variant === 'primary';

  if (isPrimary && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[styles.button, fullWidth && styles.fullWidth]}
      >
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryText}>{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        styles.secondaryButton,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#D4D4D4" />
      ) : (
        <Text style={styles.secondaryText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: '#262626',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#D4D4D4',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### Exemple 2 : InputField

**React Web** :

```tsx
// components/InputField.tsx
export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#D4D4D4] text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-[#111111] border border-[#404040] rounded-xl px-4 py-3 text-white"
      />
    </div>
  );
}
```

**React Native** :

```tsx
// src/components/common/InputField.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  multiline?: boolean;
}

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#737373"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: '#D4D4D4',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
```

### Exemple 3 : ProductCard

**React Web** :

```tsx
// components/ProductCard.tsx
export default function ProductCard({ beat, onPress }: ProductCardProps) {
  return (
    <div onClick={onPress} className="bg-[#111111] rounded-2xl overflow-hidden cursor-pointer">
      <img src={beat.coverImage} alt={beat.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-white mb-1">{beat.title}</h3>
        <p className="text-[#A3A3A3] text-sm">{beat.producer}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[#6366F1]">{beat.price.toLocaleString()} F</span>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-[#737373]" />
            <PlayCircle className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

**React Native** :

```tsx
// src/components/cards/ProductCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

interface ProductCardProps {
  beat: {
    id: string;
    title: string;
    producer: string;
    coverImage: string;
    price: number;
  };
  onPress: () => void;
}

export default function ProductCard({ beat, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <Image source={{ uri: beat.coverImage }} style={styles.cover} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {beat.title}
        </Text>
        <Text style={styles.producer} numberOfLines={1}>
          {beat.producer}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>{beat.price.toLocaleString()} F</Text>

          <View style={styles.actions}>
            <Icon name="heart-outline" size={16} color="#737373" />
            <Icon name="play-circle" size={20} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#111111',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cover: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  producer: {
    color: '#A3A3A3',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  price: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
```

---

Je continue avec les autres sections dans les prochains fichiers...
