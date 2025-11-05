# 📦 Libraries & Packages - React Web → React Native

## 📋 Table des Matières

1. [Équivalences Libraries](#équivalences-libraries)
2. [Navigation](#navigation)
3. [UI Components](#ui-components)
4. [Icons](#icons)
5. [Forms & Validation](#forms--validation)
6. [Animations](#animations)
7. [Audio/Video](#audiovideo)
8. [Storage](#storage)
9. [Backend Supabase](#backend-supabase)
10. [Utilities](#utilities)

---

## Équivalences Libraries

### Table de Conversion

| React Web          | React Native              | Package                                     | Notes                 |
| ------------------ | ------------------------- | ------------------------------------------- | --------------------- |
| **Routing**        |
| React Router DOM   | React Navigation          | `@react-navigation/native`                  | Navigation principale |
| Browser History    | Stack Navigator           | `@react-navigation/native-stack`            | Navigation écrans     |
| -                  | Bottom Tabs               | `@react-navigation/bottom-tabs`             | Tabs navigation       |
| **UI**             |
| Tailwind CSS       | NativeWind                | `nativewind`                                | Styling Tailwind-like |
| -                  | StyleSheet                | Built-in                                    | Styling natif         |
| ShadCN UI          | React Native Paper        | `react-native-paper`                        | Composants UI         |
| -                  | React Native Elements     | `@rneui/themed`                             | Alternative UI        |
| **Icons**          |
| Lucide React       | React Native Vector Icons | `react-native-vector-icons`                 | Icons                 |
| -                  | Expo Vector Icons         | Expo built-in                               | Si Expo               |
| **Forms**          |
| React Hook Form    | React Hook Form           | `react-hook-form`                           | Même lib!             |
| Zod                | Zod                       | `zod`                                       | Même lib!             |
| **Animations**     |
| Framer Motion      | React Native Reanimated   | `react-native-reanimated`                   | Animations            |
| -                  | Animated API              | Built-in                                    | Animations simples    |
| **Images**         |
| `<img>`            | `<Image>`                 | Built-in                                    | Native                |
| -                  | Expo Image                | `expo-image`                                | Optimisé              |
| Fast Average Color | -                         | Custom                                      | Extraction couleur    |
| **Audio**          |
| Howler.js          | Expo AV                   | `expo-av`                                   | Audio player          |
| -                  | React Native Track Player | `react-native-track-player`                 | Music player          |
| **Video**          |
| HTML5 Video        | Expo Video                | `expo-video`                                | Video player          |
| **Storage**        |
| localStorage       | AsyncStorage              | `@react-native-async-storage/async-storage` | Key-value store       |
| IndexedDB          | SQLite                    | `expo-sqlite`                               | Database              |
| **HTTP**           |
| Fetch              | Fetch                     | Built-in                                    | Même API              |
| Axios              | Axios                     | `axios`                                     | Même lib!             |
| **Backend**        |
| Supabase Client    | Supabase Client           | `@supabase/supabase-js`                     | Même lib! ✅          |
| **File**           |
| File API           | Expo Document Picker      | `expo-document-picker`                      | File picking          |
| -                  | Expo File System          | `expo-file-system`                          | File management       |
| **Camera**         |
| HTML5 Camera       | Expo Camera               | `expo-camera`                               | Camera                |
| -                  | Expo Image Picker         | `expo-image-picker`                         | Gallery               |
| **Permissions**    |
| Browser APIs       | Expo Permissions          | `expo-permissions`                          | Permissions           |
| **Notifications**  |
| Web Push           | Expo Notifications        | `expo-notifications`                        | Push notifs           |
| **Maps**           |
| Google Maps        | React Native Maps         | `react-native-maps`                         | Maps                  |
| **Charts**         |
| Recharts           | React Native Chart Kit    | `react-native-chart-kit`                    | Charts simple         |
| -                  | Victory Native            | `victory-native`                            | Charts avancé         |
| **Date**           |
| date-fns           | date-fns                  | `date-fns`                                  | Même lib!             |
| **Utils**          |
| Lodash             | Lodash                    | `lodash`                                    | Même lib!             |

---

## Navigation

### Installation

```bash
# React Navigation core
npm install @react-navigation/native

# Dependencies
npx expo install react-native-screens react-native-safe-area-context

# Navigators
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install @react-navigation/drawer
```

### Migration du Routing

**React Router DOM (Web)** :

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beat/:id" element={<BeatDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**React Navigation (Native)** :

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BeatDetails" component={BeatDetailsScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Navigation avec Params

**Web** :

```tsx
// Navigate
navigate(`/beat/${beatId}`);

// Get params
const { id } = useParams();
```

**React Native** :

```tsx
// Navigate
navigation.navigate('BeatDetails', { beatId: beat.id });

// Get params
const { beatId } = route.params;
```

---

## UI Components

### React Native Paper (Alternative ShadCN)

**Installation** :

```bash
npm install react-native-paper
npx expo install react-native-vector-icons
```

**Configuration** :

```tsx
// App.tsx
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#6366F1',
    secondary: '#8B5CF6',
    background: '#0A0A0A',
    surface: '#111111',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <RootNavigator />
    </PaperProvider>
  );
}
```

**Composants Disponibles** :

```tsx
import {
  Button,
  Card,
  Chip,
  Dialog,
  Divider,
  FAB,
  List,
  Menu,
  Modal,
  Portal,
  ProgressBar,
  RadioButton,
  Searchbar,
  Snackbar,
  Switch,
  TextInput,
  ToggleButton,
} from 'react-native-paper';
```

### React Native Elements

**Installation** :

```bash
npm install @rneui/themed @rneui/base
npx expo install react-native-vector-icons
```

**Utilisation** :

```tsx
import { ThemeProvider, Button, Input, Card, Icon } from '@rneui/themed';

const theme = {
  lightColors: {},
  darkColors: {
    primary: '#6366F1',
    background: '#0A0A0A',
  },
  mode: 'dark',
};

<ThemeProvider theme={theme}>
  <Button title="Primary" />
  <Input placeholder="Email" />
  <Card>
    <Card.Title>Title</Card.Title>
    <Card.Divider />
    <Text>Content</Text>
  </Card>
</ThemeProvider>;
```

---

## Icons

### React Native Vector Icons

**Installation** :

```bash
npm install react-native-vector-icons
# Expo : déjà inclus dans expo-vector-icons
```

**Migration Lucide → Ionicons** :

| Lucide React       | React Native Vector Icons         |
| ------------------ | --------------------------------- |
| `<Home />`         | `<Icon name="home" />`            |
| `<User />`         | `<Icon name="person" />`          |
| `<Bell />`         | `<Icon name="notifications" />`   |
| `<Search />`       | `<Icon name="search" />`          |
| `<Heart />`        | `<Icon name="heart" />`           |
| `<ShoppingCart />` | `<Icon name="cart" />`            |
| `<Settings />`     | `<Icon name="settings" />`        |
| `<ChevronRight />` | `<Icon name="chevron-forward" />` |
| `<ArrowLeft />`    | `<Icon name="arrow-back" />`      |
| `<Plus />`         | `<Icon name="add" />`             |
| `<X />`            | `<Icon name="close" />`           |
| `<Check />`        | `<Icon name="checkmark" />`       |
| `<PlayCircle />`   | `<Icon name="play-circle" />`     |
| `<Download />`     | `<Icon name="download" />`        |
| `<Upload />`       | `<Icon name="cloud-upload" />`    |

**Exemple Conversion** :

```tsx
// Web (Lucide React)
import { Heart, PlayCircle, Download } from 'lucide-react';

<Heart className="w-6 h-6 text-white" />
<PlayCircle className="w-8 h-8 text-[#6366F1]" />
<Download className="w-5 h-5" />

// React Native (Vector Icons)
import Icon from 'react-native-vector-icons/Ionicons';

<Icon name="heart" size={24} color="#FFFFFF" />
<Icon name="play-circle" size={32} color="#6366F1" />
<Icon name="download" size={20} color="#FFFFFF" />
```

**Icon Families Disponibles** :

- Ionicons (Recommandé - iOS style)
- MaterialIcons (Material Design)
- FontAwesome
- Feather
- MaterialCommunityIcons

---

## Forms & Validation

### React Hook Form (Compatible!)

**Installation** :

```bash
npm install react-hook-form zod @hookform/resolvers
```

**Web et React Native utilisent la même API** :

```tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  phoneNumber: z.string().min(10, 'Numéro invalide'),
  email: z.string().email('Email invalide'),
});

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <View>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Téléphone"
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber.message}</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
```

---

## Animations

### React Native Reanimated

**Installation** :

```bash
npx expo install react-native-reanimated
```

**Configuration (babel.config.js)** :

```js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'],
};
```

**Migration Framer Motion → Reanimated** :

**Web (Framer Motion)** :

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>;
```

**React Native (Reanimated)** :

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useEffect } from 'react';

function FadeInView({ children }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withSpring(0);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
```

**Animations Communes** :

```tsx
// Fade In
const opacity = useSharedValue(0);
opacity.value = withTiming(1, { duration: 300 });

// Scale
const scale = useSharedValue(0);
scale.value = withSpring(1);

// Slide
const translateX = useSharedValue(-100);
translateX.value = withTiming(0, { duration: 300 });

// Rotate
const rotate = useSharedValue(0);
rotate.value = withTiming(360, { duration: 1000 });

// Animated Style
const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
  transform: [
    { scale: scale.value },
    { translateX: translateX.value },
    { rotate: `${rotate.value}deg` },
  ],
}));
```

---

## Audio/Video

### Expo AV (Audio Player)

**Installation** :

```bash
npx expo install expo-av
```

**Web (Howler.js)** :

```tsx
import { Howl } from 'howler';

const sound = new Howl({
  src: [beatUrl],
  onend: () => setIsPlaying(false),
});

sound.play();
sound.pause();
sound.stop();
```

**React Native (Expo AV)** :

```tsx
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';

function AudioPlayer({ uri }) {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    setSound(sound);
    setIsPlaying(true);
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  function onPlaybackStatusUpdate(status) {
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
      <Icon name={isPlaying ? 'pause-circle' : 'play-circle'} size={48} color="#6366F1" />
    </TouchableOpacity>
  );
}
```

### React Native Track Player (Music App)

**Installation** :

```bash
npm install react-native-track-player
```

**Setup** :

```tsx
import TrackPlayer, { Capability, Event, useTrackPlayerEvents } from 'react-native-track-player';

// Setup (call once)
async function setupPlayer() {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
  });
}

// Add tracks
await TrackPlayer.add([
  {
    id: 'beat1',
    url: 'https://...beat.mp3',
    title: 'Midnight Vibes',
    artist: 'DJ Kofi',
    artwork: 'https://...cover.jpg',
  },
]);

// Controls
await TrackPlayer.play();
await TrackPlayer.pause();
await TrackPlayer.skipToNext();
await TrackPlayer.skipToPrevious();
```

---

## Storage

### AsyncStorage (localStorage equivalent)

**Installation** :

```bash
npx expo install @react-native-async-storage/async-storage
```

**Web (localStorage)** :

```tsx
// Set
localStorage.setItem('accessToken', token);

// Get
const token = localStorage.getItem('accessToken');

// Remove
localStorage.removeItem('accessToken');

// Clear
localStorage.clear();
```

**React Native (AsyncStorage)** :

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set
await AsyncStorage.setItem('accessToken', token);

// Get
const token = await AsyncStorage.getItem('accessToken');

// Remove
await AsyncStorage.removeItem('accessToken');

// Clear
await AsyncStorage.clear();

// Multiple
await AsyncStorage.multiSet([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);

await AsyncStorage.multiGet(['key1', 'key2']);
```

**Hook Custom** :

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export function useAsyncStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadValue();
  }, [key]);

  async function loadValue() {
    try {
      const stored = await AsyncStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored));
      }
    } catch (error) {
      console.error('AsyncStorage load error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateValue(newValue: T) {
    try {
      setValue(newValue);
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('AsyncStorage save error:', error);
    }
  }

  async function removeValue() {
    try {
      setValue(initialValue);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('AsyncStorage remove error:', error);
    }
  }

  return { value, updateValue, removeValue, loading };
}

// Usage
const { value: user, updateValue: setUser } = useAsyncStorage('user', null);
```

---

## Backend Supabase

### ✅ Aucun Changement Nécessaire!

**Supabase Client fonctionne identiquement sur Web et React Native** :

```tsx
// utils/supabase/client.ts (identique!)
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // ← Seule différence (au lieu de localStorage)
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // ← Pas de URLs en React Native
  },
});
```

**API Calls (identique)** :

```tsx
// utils/api.ts - Fonctionne tel quel!
import { supabase } from './supabase/client';

export const api = {
  beats: {
    getAll: async () => {
      const response = await fetch(
        `${projectId}.supabase.co/functions/v1/make-server-9eb1163b/beats`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      return response.json();
    },
  },

  purchases: {
    create: async (data, token) => {
      const response = await fetch(
        `${projectId}.supabase.co/functions/v1/make-server-9eb1163b/purchases/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      return response.json();
    },
  },
};
```

**Auth (identique)** :

```tsx
// hooks/useAuth.ts - Fonctionne tel quel!
import { supabase } from '../utils/supabase/client';
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen to changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
```

---

## Utilities

### File Picker

**Installation** :

```bash
npx expo install expo-document-picker
npx expo install expo-image-picker
```

**Usage** :

```tsx
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

// Pick audio file
async function pickAudio() {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'audio/*',
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
}

// Pick image
async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
}
```

### Permissions

```bash
npx expo install expo-permissions
```

```tsx
import * as Permissions from 'expo-permissions';

async function requestPermissions() {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.AUDIO_RECORDING,
    Permissions.MEDIA_LIBRARY
  );

  if (status !== 'granted') {
    alert('Permission requise');
  }
}
```

---

## Checklist Installation

### Packages Essentiels

```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

# UI
npm install nativewind
npm install react-native-paper

# Icons
# Déjà inclus dans Expo

# Forms
npm install react-hook-form zod @hookform/resolvers

# Animations
npx expo install react-native-reanimated

# Gradients & Effects
npx expo install expo-linear-gradient expo-blur

# Audio
npx expo install expo-av

# Storage
npx expo install @react-native-async-storage/async-storage

# Backend (même!)
npm install @supabase/supabase-js

# File handling
npx expo install expo-document-picker expo-image-picker expo-file-system

# Utilities
npm install date-fns lodash
```

---

**Version**: 1.0.0  
**Dernière Mise à Jour**: Novembre 2024
