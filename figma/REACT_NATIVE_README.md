# 📱 Linkart Mobile - React Native Conversion

> Guide complet pour convertir l'application Linkart de React Web vers React Native

---

## 🎯 Objectif

Créer une **application mobile native iOS et Android** à partir de l'application web React
existante, en réutilisant le même backend Supabase.

**Application Web** : ✅ Complète et fonctionnelle  
**Backend Supabase** : ✅ Production-ready  
**Application Mobile** : 📋 À créer (ce guide)

---

## 📊 État Actuel

### ✅ Ce qui est Prêt

**Backend (100%)** :

- ✅ 32 routes API RESTful fonctionnelles
- ✅ Système d'authentification (JWT, OTP)
- ✅ Base de données Postgres avec KV store
- ✅ Storage Supabase pour fichiers
- ✅ Système de paiement Wave/Orange Money
- ✅ Notifications automatiques
- ✅ Commission 5% sur beats/kits

**Frontend Web (100%)** :

- ✅ 20+ écrans implémentés
- ✅ Flow auth complet (Splash → Login → OTP → Setup)
- ✅ Flow home (Carousel, Playlists, Beats)
- ✅ Flow marketplace (Search, Filters, Grid)
- ✅ Flow purchase (Checkout → Payment → Success)
- ✅ Profil, Wallet, Inbox, Upload
- ✅ Navigation bottom tabs 5 onglets
- ✅ Design system Linkart (couleurs, typo, spacing)

### 📋 Ce qui Reste à Faire

**Frontend Mobile (0%)** :

- 📋 Créer projet React Native
- 📋 Convertir tous les composants
- 📋 Convertir tous les écrans
- 📋 Implémenter navigation mobile
- 📋 Adapter styling Tailwind → StyleSheet/NativeWind
- 📋 Intégrer features mobiles (audio, upload, push notifs)
- 📋 Tester sur iOS et Android
- 📋 Build production et store submission

---

## 📚 Documentation Complète

### 🎓 Démarrer Ici

**1. Index Principal**

```
📄 /REACT_NATIVE_INDEX.md
```

→ Vue d'ensemble, liens vers tous les guides, FAQ

**2. Plan de Migration**

```
📄 /REACT_NATIVE_MIGRATION_STEPS.md
```

→ Les 7 phases de migration, timeline, checklist complète

### 📖 Guides Techniques

**3. Setup Complet**

```
📄 /REACT_NATIVE_COMPLETE_SETUP.md
```

→ Installation, configuration, structure projet, build production

**4. Guide Conversion Général**

```
📄 /REACT_NATIVE_CONVERSION_GUIDE.md
```

→ Différences Web/Native, navigation, conversion composants

**5. Guide Styling**

```
📄 /REACT_NATIVE_STYLING_GUIDE.md
```

→ Tailwind → StyleSheet, NativeWind, thème, gradients

**6. Conversion Écrans**

```
📄 /REACT_NATIVE_SCREENS_CONVERSION.md
```

→ Exemples détaillés de 5 écrans clés

**7. Libraries & Packages**

```
📄 /REACT_NATIVE_LIBRARIES_GUIDE.md
```

→ Équivalences Web/Native, audio, storage, Supabase

---

## 🚀 Quick Start

### Prérequis

```bash
# Node.js v18+
node --version

# Expo CLI
npm install -g expo-cli

# Xcode (macOS) pour iOS
xcode-select --install

# Android Studio pour Android
# Télécharger depuis developer.android.com
```

### Installation

```bash
# 1. Créer projet React Native
npx create-expo-app linkart-mobile --template blank-typescript

# 2. Naviguer dans le dossier
cd linkart-mobile

# 3. Installer dépendances essentielles
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
npm install nativewind
npm install @supabase/supabase-js
npx expo install @react-native-async-storage/async-storage
npx expo install expo-linear-gradient expo-av

# 4. Configurer .env
cp .env.example .env
# Ajouter vos clés Supabase

# 5. Démarrer
npx expo start
```

### Première Étape

**Lire la documentation dans cet ordre** :

1. `/REACT_NATIVE_INDEX.md` (10 min) - Vue d'ensemble
2. `/REACT_NATIVE_MIGRATION_STEPS.md` (20 min) - Plan détaillé
3. `/REACT_NATIVE_COMPLETE_SETUP.md` (Phase 1) - Setup projet

Ensuite, suivez les **7 phases** du plan de migration.

---

## 📋 Les 7 Phases de Migration

### Phase 1 : Setup Projet (1-2 jours)

- Créer projet Expo TypeScript
- Configurer babel, tailwind, metro
- Installer toutes dépendances
- Structure de dossiers
- Premier run réussi

### Phase 2 : Navigation (2-3 jours)

- React Navigation setup
- RootNavigator (auth check)
- AuthNavigator (stack)
- MainNavigator (tabs + stacks)
- Types navigation

### Phase 3 : Composants Communs (3-4 jours)

- PrimaryButton (gradient)
- InputField (validation)
- ProductCard, ServiceCard, BeatCard
- PlaylistCard, LicenseCard
- RatingStars, LoadingSpinner

### Phase 4 : Écrans Auth (2-3 jours)

- SplashScreen
- WelcomeScreen (carousel)
- LoginScreen
- OTPVerificationScreen
- ProfileSetupScreen

### Phase 5 : Écrans Principaux (5-7 jours)

- HomeScreen (FlatList complexe)
- BeatDetailsScreen
- MarketplaceScreen
- CheckoutScreen
- PaymentScreen
- ProfileScreen
- - 10 autres écrans

### Phase 6 : Features Avancées (3-5 jours)

- Audio player (Expo AV)
- File upload (Document Picker)
- Paiement mobile money
- Notifications push
- Offline support

### Phase 7 : Polish & Production (3-5 jours)

- Optimisations performance
- Testing iOS + Android
- Build production (EAS)
- Submission App Store + Play Store

---

## 📊 Timeline & Effort

### Solo Developer (Full-time)

```
Total : 19-29 jours (4-6 semaines)

Semaine 1 : Setup + Navigation + Composants
Semaine 2 : Écrans Auth + Début Écrans Principaux
Semaine 3-4 : Écrans Principaux + Features
Semaine 5-6 : Features + Polish + Production
```

### Équipe 2-3 Développeurs

```
Total : 10-15 jours (2-3 semaines)

Parallélisation possible :
- Dev 1 : Auth flow + Profile
- Dev 2 : Home + Marketplace
- Dev 3 : Purchase flow + Features
```

### MVP (Minimum Viable Product)

```
Total : 10-14 jours (2 semaines)

Inclut uniquement :
✅ Auth flow
✅ HomeScreen (découverte)
✅ BeatDetailsScreen (écoute)
✅ Checkout + Payment
✅ ProfileScreen

Skip :
- Upload
- Inbox/Chat
- Wallet détaillé
- Notifications push
```

---

## 🎨 Design System

### Couleurs Linkart

```typescript
const colors = {
  // Primary gradient
  primary: {
    DEFAULT: '#6366F1',
    dark: '#8B5CF6',
  },

  // Backgrounds dark
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
  },

  // Status
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#06B6D4',

  // Payment methods
  wave: '#00D9FF',
  orange: '#FF7900',
};
```

### Typography

```typescript
const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
```

### Spacing (8px grid)

```typescript
const spacing = {
  1: 4, // 0.25rem
  2: 8, // 0.5rem
  3: 12, // 0.75rem
  4: 16, // 1rem
  6: 24, // 1.5rem
  8: 32, // 2rem
};
```

---

## 🔐 Backend Supabase

### ✅ Compatible à 100%

Le backend Supabase fonctionne **exactement de la même manière** sur Web et React Native.

**Aucun changement requis !**

### Setup Client

```typescript
// src/utils/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient('https://your-project.supabase.co', 'your-anon-key', {
  auth: {
    storage: AsyncStorage, // ← Seule différence!
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### API Calls (Identiques!)

```typescript
// ✅ Même code sur Web et React Native
const { data: beats } = await supabase
  .from('beats')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(10);
```

### Routes API Disponibles

**Beats** :

- `GET /beats` - Liste tous beats
- `GET /beats/:id` - Détails beat
- `POST /beats` - Créer beat
- `PUT /beats/:id` - Modifier beat
- `DELETE /beats/:id` - Supprimer beat

**Services** :

- `GET /services` - Liste services
- `GET /services/:id` - Détails service
- `POST /services` - Créer service

**Purchases** :

- `POST /purchases/create` - Créer achat
- `GET /purchases/user/:userId` - Achats user

**Bookings** :

- `POST /bookings/create` - Créer booking
- `GET /bookings/user/:userId` - Bookings user

**Auth** :

- `POST /auth/signup` - Inscription
- `POST /auth/login` - Connexion (handled by Supabase)

...et 20+ autres routes

---

## 🛠️ Technologies

### Core

- **React Native** - Framework mobile
- **Expo** - Tooling & build
- **TypeScript** - Type safety

### Navigation

- **React Navigation** - Navigation stack/tabs
- **React Navigation Native Stack** - Stack navigator
- **React Navigation Bottom Tabs** - Tab navigator

### UI & Styling

- **NativeWind** - Tailwind CSS pour RN
- **React Native Paper** - UI components
- **Expo Linear Gradient** - Gradients
- **Expo Blur** - Blur effects

### Media

- **Expo AV** - Audio/Video player
- **Expo Image Picker** - Pick images
- **Expo Document Picker** - Pick files
- **React Native Vector Icons** - Icons

### State & Data

- **Supabase JS** - Backend client
- **AsyncStorage** - Local storage
- **React Hook Form** - Forms
- **Zod** - Validation

### Animations

- **React Native Reanimated** - Animations

### Utils

- **date-fns** - Date manipulation
- **lodash** - Utilities

---

## 📱 Exemple Conversion

### Avant (React Web)

```tsx
// components/PrimaryButton.tsx
export default function PrimaryButton({
  title,
  onClick,
  variant = 'primary',
  fullWidth = false,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-4 rounded-2xl
        ${fullWidth ? 'w-full' : ''}
        ${
          variant === 'primary'
            ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white'
            : 'bg-[#262626] text-[#D4D4D4]'
        }
      `}
    >
      {title}
    </button>
  );
}
```

### Après (React Native)

```tsx
// src/components/common/PrimaryButton.tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  fullWidth = false,
}: PrimaryButtonProps) {
  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[styles.button, fullWidth && styles.fullWidth]}
      >
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.primaryText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, styles.secondaryButton, fullWidth && styles.fullWidth]}
    >
      <Text style={styles.secondaryText}>{title}</Text>
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
  },
  secondaryButton: {
    backgroundColor: '#262626',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
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

**Changements clés** :

- `<button>` → `<TouchableOpacity>`
- `onClick` → `onPress`
- `className` → `style={styles.x}`
- CSS gradient → `<LinearGradient>`
- Tailwind → `StyleSheet.create()`

---

## ✅ Checklist Globale

### Pré-Migration

- [ ] Documentation lue et comprise
- [ ] Environnement dev setup (Node, Expo, Xcode/Android Studio)
- [ ] Compte Expo créé
- [ ] Clés Supabase disponibles

### Phase Setup

- [ ] Projet React Native créé
- [ ] Dépendances installées
- [ ] Configuration complète (babel, tailwind, etc.)
- [ ] Structure dossiers créée
- [ ] Thème configuré
- [ ] Premier run réussi

### Phase Navigation

- [ ] React Navigation installé
- [ ] Types navigation définis
- [ ] RootNavigator créé
- [ ] AuthNavigator créé
- [ ] MainNavigator créé
- [ ] Navigation testée

### Phase Composants

- [ ] PrimaryButton converti
- [ ] InputField converti
- [ ] ProductCard converti
- [ ] ServiceCard converti
- [ ] Toutes cards converties
- [ ] Composants testés

### Phase Écrans

- [ ] SplashScreen converti
- [ ] Auth flow converti (5 écrans)
- [ ] HomeScreen converti
- [ ] MarketplaceScreen converti
- [ ] Purchase flow converti (3 écrans)
- [ ] Profile flow converti (5+ écrans)
- [ ] Tous écrans testés

### Phase Features

- [ ] Audio player implémenté
- [ ] Upload fichiers fonctionnel
- [ ] Paiement mobile money intégré
- [ ] Notifications configurées
- [ ] Offline mode implémenté

### Phase Production

- [ ] Performance optimisée
- [ ] Tests iOS complets
- [ ] Tests Android complets
- [ ] Build production réussi
- [ ] Beta testing fait
- [ ] App Store submission
- [ ] Play Store submission

---

## 🎯 MVP Rapide (2 Semaines)

Si vous voulez un **MVP fonctionnel rapidement** :

### Semaine 1

**Jour 1-2** : Setup + Navigation

- Créer projet
- Configurer navigation
- Créer structure

**Jour 3-4** : Auth Flow

- SplashScreen
- LoginScreen
- OTPScreen

**Jour 5** : Composants de Base

- PrimaryButton
- InputField
- ProductCard

### Semaine 2

**Jour 1-2** : HomeScreen

- FlatList beats
- Carousel hero
- Navigation

**Jour 3** : BeatDetailsScreen

- Détails beat
- Player audio simple
- Actions

**Jour 4** : Checkout + Payment

- CheckoutScreen basic
- PaymentScreen

**Jour 5** : Profile + Testing

- ProfileScreen simple
- Testing complet MVP

### Features MVP

✅ Auth (login, OTP)  
✅ Home (discover beats)  
✅ Beat details (listen, view)  
✅ Checkout (buy)  
✅ Payment (Wave/OM)  
✅ Profile (basic)

### Features Post-MVP

📋 Upload  
📋 Inbox/Chat  
📋 Wallet détaillé  
📋 Notifications push  
📋 Offline mode  
📋 Advanced player

---

## 📞 Support

### Documentation

- Index : `/REACT_NATIVE_INDEX.md`
- Migration : `/REACT_NATIVE_MIGRATION_STEPS.md`
- Setup : `/REACT_NATIVE_COMPLETE_SETUP.md`

### Ressources Externes

- Expo Docs : https://docs.expo.dev
- React Navigation : https://reactnavigation.org
- Supabase : https://supabase.com/docs

### Communautés

- Expo Discord : https://chat.expo.dev
- React Native : https://reactnative.dev/community

---

## 🎉 Conclusion

Vous avez tout ce qu'il faut pour réussir cette conversion :

✅ **Backend prêt** - 32 routes API fonctionnelles  
✅ **App Web complète** - Référence pour conversion  
✅ **Documentation exhaustive** - 7 guides détaillés  
✅ **Exemples complets** - Code prêt à copier  
✅ **Plan clair** - 7 phases bien définies

**Prochaine étape** :

```bash
# Lire l'index principal
open /REACT_NATIVE_INDEX.md

# Puis commencer Phase 1
open /REACT_NATIVE_COMPLETE_SETUP.md
```

**Bon courage ! 🚀**

---

**Version** : 1.0.0  
**Dernière Mise à Jour** : Novembre 2024  
**Status** : ✅ Documentation Complète
