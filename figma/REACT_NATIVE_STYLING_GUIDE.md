# 🎨 Guide Styling : Tailwind CSS → React Native

## 📋 Table des Matières

1. [Approches de Styling](#approches-de-styling)
2. [NativeWind (Tailwind pour RN)](#nativewind-tailwind-pour-rn)
3. [StyleSheet Natif](#stylesheet-natif)
4. [Conversion Tailwind → StyleSheet](#conversion-tailwind--stylesheet)
5. [Thème & Design Tokens](#thème--design-tokens)
6. [Gradients & Effects](#gradients--effects)

---

## Approches de Styling

### Option 1 : NativeWind ✅ (Recommandé)

**Avantages** :

- ✅ Utilise la syntaxe Tailwind (familier)
- ✅ Conversion plus rapide
- ✅ Hot reload rapide
- ✅ Même design tokens

**Installation** :

```bash
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
```

**Configuration** :

```js
// tailwind.config.js
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        background: '#0A0A0A',
        // ... vos couleurs
      },
    },
  },
  plugins: [],
};
```

**Utilisation** :

```tsx
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

// Ou directement avec className (NativeWind v4)
<View className="bg-[#0A0A0A] p-6">
  <Text className="text-white text-xl font-bold">Linkart</Text>
</View>;
```

### Option 2 : StyleSheet Natif

**Avantages** :

- ✅ Performance optimale
- ✅ TypeScript strict
- ✅ Pas de dépendance externe
- ✅ Contrôle total

**Utilisation** :

```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    padding: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

<View style={styles.container}>
  <Text style={styles.title}>Linkart</Text>
</View>;
```

---

## NativeWind (Tailwind pour RN)

### Setup Complet

**1. Installation**

```bash
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
npx tailwindcss init
```

**2. Configuration babel.config.js**

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
```

**3. Types (app.d.ts)**

```tsx
/// <reference types="nativewind/types" />
```

### Exemples Conversion Directe

**Tailwind Web → NativeWind** :

```tsx
// Web (actuel)
<div className="bg-[#0A0A0A] min-h-screen px-6">
  <h1 className="text-white text-2xl font-bold mb-4">
    Beats Marketplace
  </h1>
  <div className="grid grid-cols-2 gap-4">
    {/* cards */}
  </div>
</div>

// React Native avec NativeWind
<View className="bg-[#0A0A0A] flex-1 px-6">
  <Text className="text-white text-2xl font-bold mb-4">
    Beats Marketplace
  </Text>
  <View className="flex-row flex-wrap">
    {/* cards - utiliser FlatList en prod */}
  </View>
</View>
```

### Classes Supportées

| Tailwind Web                 | NativeWind                      | Notes                         |
| ---------------------------- | ------------------------------- | ----------------------------- |
| `bg-[#0A0A0A]`               | ✅ `bg-[#0A0A0A]`               | Couleurs custom OK            |
| `text-white`                 | ✅ `text-white`                 | Couleurs texte OK             |
| `p-4`, `px-6`                | ✅ `p-4`, `px-6`                | Padding OK                    |
| `m-4`, `mt-2`                | ✅ `m-4`, `mt-2`                | Margin OK                     |
| `flex`, `flex-row`           | ✅ `flex`, `flex-row`           | Flexbox OK                    |
| `rounded-2xl`                | ✅ `rounded-2xl`                | Border radius OK              |
| `border`, `border-[#404040]` | ✅ `border`, `border-[#404040]` | Borders OK                    |
| `gap-4`                      | ✅ `gap-4`                      | Gap supporté                  |
| `w-full`, `h-48`             | ✅ `w-full`, `h-48`             | Dimensions OK                 |
| `grid grid-cols-2`           | ❌ Pas de grid                  | Utiliser `flex-row flex-wrap` |
| `hover:`, `group:`           | ❌ Pas de hover                 | Utiliser `activeOpacity`      |
| `transition`, `animate-`     | ❌ Limité                       | Utiliser Animated API         |

### Classes Non Supportées

**À éviter** :

```tsx
// ❌ Pas de grid
className = 'grid grid-cols-2 gap-4';

// ❌ Pas de hover states
className = 'hover:bg-primary';

// ❌ Pas de pseudo-elements
className = "before:content-['']";

// ❌ Pas de backdrop-blur natif
className = 'backdrop-blur-lg';
```

**Alternatives** :

```tsx
// ✅ Grid → FlatList avec numColumns
<FlatList
  data={items}
  numColumns={2}
  renderItem={({ item }) => <Card />}
  columnWrapperStyle={{ gap: 16 }}
/>

// ✅ Hover → activeOpacity
<TouchableOpacity activeOpacity={0.8}>
  <View className="bg-[#111111]">
    {/* content */}
  </View>
</TouchableOpacity>

// ✅ Blur → expo-blur
import { BlurView } from 'expo-blur';
<BlurView intensity={20} tint="dark">
  {/* content */}
</BlurView>
```

---

## StyleSheet Natif

### Conversion Système

**Web Tailwind** :

```tsx
<div className="bg-[#0A0A0A] p-6 rounded-2xl border border-[#404040]">
  <h2 className="text-white text-xl font-bold mb-2">Title</h2>
  <p className="text-[#A3A3A3] text-sm">Description</p>
</div>
```

**React Native StyleSheet** :

```tsx
import { View, Text, StyleSheet } from 'react-native';

<View style={styles.card}>
  <Text style={styles.title}>Title</Text>
  <Text style={styles.description}>Description</Text>
</View>;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0A0A0A',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#404040',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#A3A3A3',
    fontSize: 14,
  },
});
```

### Table de Conversion Complète

#### Layout & Spacing

| Tailwind          | StyleSheet                        | Valeur                |
| ----------------- | --------------------------------- | --------------------- |
| `flex`            | `display: 'flex'`                 | (défaut RN)           |
| `flex-row`        | `flexDirection: 'row'`            | Horizontal            |
| `flex-col`        | `flexDirection: 'column'`         | Vertical (défaut)     |
| `items-center`    | `alignItems: 'center'`            | Alignement vertical   |
| `justify-center`  | `justifyContent: 'center'`        | Alignement horizontal |
| `justify-between` | `justifyContent: 'space-between'` | Espace entre          |
| `gap-4`           | `gap: 16`                         | 16px = 4 \* 4         |
| `p-4`             | `padding: 16`                     | 16px                  |
| `px-6`            | `paddingHorizontal: 24`           | 24px                  |
| `py-3`            | `paddingVertical: 12`             | 12px                  |
| `m-4`             | `margin: 16`                      | 16px                  |
| `mt-2`            | `marginTop: 8`                    | 8px                   |
| `w-full`          | `width: '100%'`                   | Pleine largeur        |
| `h-48`            | `height: 192`                     | 192px = 48 \* 4       |

#### Colors

| Tailwind           | StyleSheet                   |
| ------------------ | ---------------------------- |
| `bg-[#0A0A0A]`     | `backgroundColor: '#0A0A0A'` |
| `text-white`       | `color: '#FFFFFF'`           |
| `text-[#A3A3A3]`   | `color: '#A3A3A3'`           |
| `border-[#404040]` | `borderColor: '#404040'`     |

#### Typography

| Tailwind        | StyleSheet             | Valeur |
| --------------- | ---------------------- | ------ |
| `text-xs`       | `fontSize: 12`         | 12px   |
| `text-sm`       | `fontSize: 14`         | 14px   |
| `text-base`     | `fontSize: 16`         | 16px   |
| `text-lg`       | `fontSize: 18`         | 18px   |
| `text-xl`       | `fontSize: 20`         | 20px   |
| `text-2xl`      | `fontSize: 24`         | 24px   |
| `font-bold`     | `fontWeight: 'bold'`   | 700    |
| `font-semibold` | `fontWeight: '600'`    | 600    |
| `font-medium`   | `fontWeight: '500'`    | 500    |
| `font-normal`   | `fontWeight: 'normal'` | 400    |

#### Borders & Radius

| Tailwind       | StyleSheet           |
| -------------- | -------------------- |
| `rounded-xl`   | `borderRadius: 12`   |
| `rounded-2xl`  | `borderRadius: 16`   |
| `rounded-full` | `borderRadius: 9999` |
| `border`       | `borderWidth: 1`     |
| `border-2`     | `borderWidth: 2`     |
| `border-t`     | `borderTopWidth: 1`  |

#### Effects

| Tailwind        | StyleSheet              | Notes          |
| --------------- | ----------------------- | -------------- |
| `opacity-50`    | `opacity: 0.5`          | OK             |
| `shadow-lg`     | Voir [Shadow](#shadows) | Complexe       |
| `backdrop-blur` | Utiliser `expo-blur`    | Module externe |

### Shadows

**iOS** :

```tsx
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
```

**Android** :

```tsx
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    // Android elevation
    elevation: 8,
  },
});
```

**Cross-Platform** :

```tsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});
```

---

## Conversion Tailwind → StyleSheet

### Automatiser avec Script

**convertTailwind.ts** :

```typescript
// Utilitaire de conversion
const tailwindToStyle: Record<string, any> = {
  // Layout
  flex: { display: 'flex' },
  'flex-row': { flexDirection: 'row' },
  'flex-col': { flexDirection: 'column' },
  'items-center': { alignItems: 'center' },
  'justify-center': { justifyContent: 'center' },
  'justify-between': { justifyContent: 'space-between' },

  // Spacing (exemples)
  'p-4': { padding: 16 },
  'px-6': { paddingHorizontal: 24 },
  'py-3': { paddingVertical: 12 },
  'gap-4': { gap: 16 },

  // Colors
  'bg-black': { backgroundColor: '#000000' },
  'text-white': { color: '#FFFFFF' },

  // Borders
  'rounded-xl': { borderRadius: 12 },
  'rounded-2xl': { borderRadius: 16 },
  border: { borderWidth: 1 },
};

function convertClasses(className: string): object {
  const classes = className.split(' ');
  return classes.reduce((acc, cls) => {
    return { ...acc, ...(tailwindToStyle[cls] || {}) };
  }, {});
}

// Usage
const style = convertClasses('flex flex-row items-center gap-4 p-4');
// → { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16 }
```

### Exemples Conversion Réels

#### Exemple 1 : Card Container

```tsx
// Web Tailwind
<div className="bg-[#111111] rounded-2xl p-4 border border-[#404040] shadow-lg">

// React Native StyleSheet
<View style={styles.card}>

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#404040',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8, // Android
  },
});
```

#### Exemple 2 : Flex Layout

```tsx
// Web Tailwind
<div className="flex flex-row items-center justify-between gap-3 px-6 py-4">

// React Native StyleSheet
<View style={styles.row}>

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
```

#### Exemple 3 : Text Styling

```tsx
// Web Tailwind
<h1 className="text-white text-2xl font-bold mb-4">

// React Native StyleSheet
<Text style={styles.title}>

const styles = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
```

---

## Thème & Design Tokens

### Créer un Système de Design

**src/theme/colors.ts** :

```typescript
export const colors = {
  // Primary
  primary: {
    DEFAULT: '#6366F1',
    dark: '#8B5CF6',
    light: '#A78BFA',
  },

  // Background
  background: {
    primary: '#0A0A0A',
    secondary: '#111111',
    tertiary: '#1A1A1A',
    elevated: '#262626',
  },

  // Text
  text: {
    primary: '#F5F5F5',
    secondary: '#D4D4D4',
    muted: '#A3A3A3',
    disabled: '#737373',
  },

  // Borders
  border: {
    primary: '#404040',
    secondary: '#262626',
  },

  // Status
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#06B6D4',

  // Payment
  wave: '#00D9FF',
  orange: '#FF7900',
};
```

**src/theme/typography.ts** :

```typescript
export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};
```

**src/theme/spacing.ts** :

```typescript
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
  16: 64,
  20: 80,
};
```

**src/theme/index.ts** :

```typescript
export { colors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,

  // Gradients
  gradients: {
    primary: ['#6366F1', '#8B5CF6'],
    success: ['#10B981', '#059669'],
    wave: ['#00D9FF', '#0099FF'],
    orange: ['#FF7900', '#FFB84D'],
  },

  // Border Radius
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
};
```

### Utilisation du Thème

```tsx
import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    padding: spacing[6],
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing[4],
  },
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
});
```

---

## Gradients & Effects

### Linear Gradient

**Installation** :

```bash
npx expo install expo-linear-gradient
```

**Utilisation** :

```tsx
import { LinearGradient } from 'expo-linear-gradient';

// Button avec gradient
<LinearGradient
  colors={['#6366F1', '#8B5CF6']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.gradient}
>
  <Text style={styles.buttonText}>Acheter</Text>
</LinearGradient>;

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### Blur Effect

**Installation** :

```bash
npx expo install expo-blur
```

**Utilisation** :

```tsx
import { BlurView } from 'expo-blur';

<BlurView intensity={20} tint="dark" style={styles.blurContainer}>
  <Text style={styles.text}>Content avec blur</Text>
</BlurView>;

const styles = StyleSheet.create({
  blurContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
  },
  text: {
    color: '#FFFFFF',
  },
});
```

### Animations

**Animated API** :

```tsx
import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';

function FadeInView({ children }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>;
}
```

---

## Checklist Styling

### Avant Conversion

- [ ] Identifier toutes les classes Tailwind utilisées
- [ ] Lister les effets spéciaux (blur, shadow, gradient)
- [ ] Noter les animations web
- [ ] Vérifier les pseudo-classes (hover, focus)

### Pendant Conversion

- [ ] Créer le système de thème (colors, typography, spacing)
- [ ] Convertir layouts (flex, grid → FlatList)
- [ ] Remplacer Tailwind par StyleSheet
- [ ] Implémenter gradients avec expo-linear-gradient
- [ ] Ajouter shadows iOS/Android
- [ ] Convertir animations web → Animated

### Après Conversion

- [ ] Tester sur iOS
- [ ] Tester sur Android
- [ ] Vérifier responsive (différentes tailles)
- [ ] Optimiser performance (StyleSheet.create)
- [ ] Documenter les patterns custom

---

**Version**: 1.0.0  
**Dernière Mise à Jour**: Novembre 2024
