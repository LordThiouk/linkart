# ⚡ React Native - Quick Start Guide

> Démarrez votre conversion en 30 minutes

---

## 🎯 En Bref

**Objectif** : Convertir Linkart de React Web → React Native  
**Timeline** : 4-6 semaines solo, 2-3 semaines en équipe  
**Difficulté** : ⭐⭐⭐☆☆ Moyenne

---

## 📚 Documentation (7 Guides)

1. **`/REACT_NATIVE_README.md`** - Start here! Overview général
2. **`/REACT_NATIVE_INDEX.md`** - Index complet, liens, FAQ
3. **`/REACT_NATIVE_MIGRATION_STEPS.md`** - Plan 7 phases détaillé
4. **`/REACT_NATIVE_COMPLETE_SETUP.md`** - Setup projet complet
5. **`/REACT_NATIVE_CONVERSION_GUIDE.md`** - Guide conversion général
6. **`/REACT_NATIVE_STYLING_GUIDE.md`** - Tailwind → StyleSheet
7. **`/REACT_NATIVE_SCREENS_CONVERSION.md`** - Conversion écrans
8. **`/REACT_NATIVE_LIBRARIES_GUIDE.md`** - Libraries équivalences

---

## ⚡ Setup en 5 Minutes

### 1. Prérequis

```bash
# Vérifier Node.js (v18+)
node --version

# Installer Expo CLI
npm install -g expo-cli

# Vérifier installation
expo --version
```

### 2. Créer Projet

```bash
# Créer projet React Native
npx create-expo-app linkart-mobile --template blank-typescript

# Naviguer
cd linkart-mobile
```

### 3. Installer Dépendances

```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

# UI & Styling
npm install nativewind
npm install --save-dev tailwindcss@3.3.2

# Backend
npm install @supabase/supabase-js
npx expo install @react-native-async-storage/async-storage

# Gradients & Effects
npx expo install expo-linear-gradient

# Audio
npx expo install expo-av
```

### 4. Configuration

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

**tailwind.config.js** :

```js
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        background: '#0A0A0A',
      },
    },
  },
  plugins: [],
};
```

**.env** :

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 5. Démarrer

```bash
# Lancer dev server
npx expo start

# Scanner QR code avec Expo Go
# OU taper 'i' pour iOS, 'a' pour Android
```

---

## 🗺️ Les 7 Phases

### Phase 1: Setup (1-2j)

```
✅ Projet créé
✅ Config babel/tailwind
✅ Dépendances installées
✅ Structure dossiers
```

### Phase 2: Navigation (2-3j)

```
✅ React Navigation
✅ Auth stack
✅ Main tabs
✅ Types
```

### Phase 3: Composants (3-4j)

```
✅ Button, Input, Cards
✅ ProductCard, ServiceCard
✅ RatingStars
```

### Phase 4: Auth (2-3j)

```
✅ Splash, Welcome
✅ Login, OTP
✅ ProfileSetup
```

### Phase 5: Écrans (5-7j)

```
✅ Home, Marketplace
✅ BeatDetails
✅ Checkout, Payment
✅ Profile
```

### Phase 6: Features (3-5j)

```
✅ Audio player
✅ Upload files
✅ Paiement
✅ Notifications
```

### Phase 7: Production (3-5j)

```
✅ Performance
✅ Testing
✅ Build
✅ Store submit
```

**Total** : 19-29 jours

---

## 🔄 Conversion Rapide

### Syntax Changes

```tsx
// Web → React Native

<div>              → <View>
<span>, <p>, <h1>  → <Text>
<img>              → <Image>
<input>            → <TextInput>
<button>           → <TouchableOpacity>

onClick            → onPress
onChange           → onChangeText
className          → style
src                → source={{ uri }}
```

### Example

**Avant (Web)** :

```tsx
<div className="bg-black p-4 rounded-xl">
  <h1 className="text-white text-2xl">Hello</h1>
  <button onClick={handleClick}>Click</button>
</div>
```

**Après (React Native)** :

```tsx
<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
  <TouchableOpacity onPress={handleClick}>
    <Text>Click</Text>
  </TouchableOpacity>
</View>;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
  },
});
```

---

## 📦 Libraries Web → Native

| Web              | React Native          |
| ---------------- | --------------------- |
| React Router DOM | React Navigation      |
| Lucide Icons     | Vector Icons          |
| Tailwind CSS     | NativeWind/StyleSheet |
| localStorage     | AsyncStorage          |
| Howler.js        | Expo AV               |
| **Supabase**     | **Supabase** ✅ Same! |

---

## 🎨 Design System

```typescript
// Couleurs Linkart
const colors = {
  primary: '#6366F1',
  primaryDark: '#8B5CF6',
  background: '#0A0A0A',
  card: '#111111',
  textPrimary: '#F5F5F5',
  textSecondary: '#A3A3A3',
  success: '#10B981',
  wave: '#00D9FF',
  orange: '#FF7900',
};

// Spacing (8px grid)
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};
```

---

## ✅ MVP (2 Semaines)

**Must-Have** :

- ✅ Auth (login, OTP)
- ✅ HomeScreen
- ✅ BeatDetailsScreen
- ✅ Checkout + Payment
- ✅ ProfileScreen

**Skip for MVP** :

- Upload
- Inbox/Chat
- Wallet détaillé
- Notifications push

---

## 🔐 Supabase (Identique!)

**Setup** :

```tsx
// src/utils/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage, // ← Seule différence
    autoRefreshToken: true,
    persistSession: true,
  },
});
```

**API Calls** (même code!) :

```tsx
// ✅ Fonctionne sur Web ET React Native
const { data: beats } = await supabase
  .from('beats')
  .select('*')
  .order('created_at', { ascending: false });
```

---

## 📱 Navigation

```tsx
// Créer navigateurs
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// App.tsx
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Main" component={MainTabs} />
  </Stack.Navigator>
</NavigationContainer>

// MainTabs
<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
  <Tab.Screen name="Upload" component={UploadScreen} />
  <Tab.Screen name="Inbox" component={InboxScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
```

---

## 🚀 Build Production

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

# Build both
eas build --platform all
```

---

## ✅ Checklist Jour 1

**Matin (2h)** :

- [ ] Lire `/REACT_NATIVE_README.md`
- [ ] Lire `/REACT_NATIVE_INDEX.md`
- [ ] Parcourir `/REACT_NATIVE_MIGRATION_STEPS.md`

**Après-midi (3h)** :

- [ ] Installer Node, Expo CLI
- [ ] Créer projet `linkart-mobile`
- [ ] Installer dépendances
- [ ] Configurer babel, tailwind
- [ ] Premier `expo start` réussi

**Fin de journée** :

- [ ] App affiche écran blanc (normal)
- [ ] Pas d'erreurs console
- [ ] Hot reload fonctionne

---

## 🎯 Prochaines Étapes

**Demain (Jour 2)** :

1. Lire `/REACT_NATIVE_COMPLETE_SETUP.md` (Phase 1 complète)
2. Créer structure de dossiers
3. Setup thème (colors, typography, spacing)
4. Configurer Supabase client

**Semaine 1** :

- Setup complet
- Navigation complète
- Premiers composants

**Semaine 2-4** :

- Tous composants
- Tous écrans
- Features

**Semaine 5-6** :

- Polish
- Testing
- Production

---

## 📞 Aide

**Stuck?** Consultez :

- `/REACT_NATIVE_INDEX.md` - FAQ
- Documentation Expo : https://docs.expo.dev
- Expo Discord : https://chat.expo.dev

---

## 💡 Tips

**DO** :

- ✅ Suivre les phases dans l'ordre
- ✅ Tester après chaque composant
- ✅ Utiliser TypeScript
- ✅ Commiter souvent
- ✅ Tester sur devices réels

**DON'T** :

- ❌ Skip la phase setup
- ❌ Tout faire en même temps
- ❌ Ignorer les warnings
- ❌ Tester seulement sur simulateur
- ❌ Oublier AsyncStorage pour Supabase

---

## 🎉 Vous êtes Prêt !

**Statut actuel** :

- ✅ Backend Supabase ready
- ✅ App Web complète
- ✅ Documentation exhaustive

**Action immédiate** :

```bash
# 1. Créer projet
npx create-expo-app linkart-mobile --template blank-typescript

# 2. Lire guide complet
open /REACT_NATIVE_COMPLETE_SETUP.md

# 3. Start coding!
```

**Bon courage ! 🚀**

---

**Quick Start Version** : 1.0.0  
**Temps de lecture** : 5 minutes  
**Temps de setup** : 30 minutes
