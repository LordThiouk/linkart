# 🔄 Plan de Migration React Web → React Native

## 📋 Migration en 7 Phases

Cette migration doit être faite **étape par étape** pour garantir que chaque partie fonctionne avant
de passer à la suivante.

---

## Phase 1 : Setup Projet (1-2 jours)

### Objectif

Créer le projet React Native et configurer l'environnement de développement.

### Checklist

- [ ] **1.1** Installer prérequis (Node, Expo CLI, Xcode/Android Studio)
- [ ] **1.2** Créer projet Expo avec TypeScript
- [ ] **1.3** Créer structure de dossiers (`src/`, `screens/`, `components/`, etc.)
- [ ] **1.4** Configurer `app.json` (bundle ID, permissions, icons)
- [ ] **1.5** Configurer `babel.config.js` (NativeWind, Reanimated)
- [ ] **1.6** Configurer `tailwind.config.js` avec couleurs Linkart
- [ ] **1.7** Créer fichier `.env` avec clés Supabase
- [ ] **1.8** Installer toutes les dépendances (voir script installation)
- [ ] **1.9** Tester premier run avec `npx expo start`
- [ ] **1.10** Vérifier hot reload fonctionne

### Fichiers à Créer

```
linkart-mobile/
├── app.json ✅
├── babel.config.js ✅
├── tailwind.config.js ✅
├── .env ✅
├── src/
│   ├── theme/index.ts ✅
│   ├── utils/supabase/client.ts ✅
│   └── utils/supabase/info.ts ✅
└── App.tsx ✅
```

### Validation

```bash
# Projet démarre sans erreurs
npx expo start

# App affiche écran blanc (normal à ce stade)
# Pas d'erreurs dans console
```

**Référence** : `/REACT_NATIVE_COMPLETE_SETUP.md`

---

## Phase 2 : Navigation (2-3 jours)

### Objectif

Mettre en place l'architecture de navigation complète.

### Checklist

- [ ] **2.1** Installer React Navigation packages
- [ ] **2.2** Créer types navigation (`src/navigation/types.ts`)
- [ ] **2.3** Créer `RootNavigator.tsx` (auth check)
- [ ] **2.4** Créer `AuthNavigator.tsx` (stack auth)
- [ ] **2.5** Créer `MainNavigator.tsx` (bottom tabs + stacks)
- [ ] **2.6** Créer stacks pour chaque tab (Home, Marketplace, Profile)
- [ ] **2.7** Configurer deep linking
- [ ] **2.8** Tester navigation entre écrans (avec placeholders)

### Structure Navigation

```
src/navigation/
├── types.ts ✅
│   - AuthStackParamList
│   - HomeStackParamList
│   - MainTabParamList
│   - Navigation props types
│
├── RootNavigator.tsx ✅
│   - Check auth state
│   - Show Auth ou Main
│
├── AuthNavigator.tsx ✅
│   - Welcome → Login → OTP → ProfileSetup
│
└── MainNavigator.tsx ✅
    - Bottom Tabs:
      ├── Home Stack
      ├── Marketplace Stack
      ├── Upload Screen
      ├── Inbox Stack
      └── Profile Stack
```

### Test Navigation

```tsx
// Créer écrans placeholder temporaires
function PlaceholderScreen({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{route.name}</Text>
    </View>
  );
}
```

### Validation

- [ ] Navigation auth fonctionne (welcome → login → etc.)
- [ ] Bottom tabs affichent 5 onglets
- [ ] Peut naviguer entre tous les écrans
- [ ] Back button fonctionne
- [ ] Deep links fonctionnent

**Référence** : `/REACT_NATIVE_CONVERSION_GUIDE.md` (Section Navigation)

---

## Phase 3 : Composants Communs (3-4 jours)

### Objectif

Convertir tous les composants réutilisables (buttons, inputs, cards).

### Checklist

#### 3.1 Composants de Base

- [ ] **PrimaryButton** (gradient, loading, disabled states)
- [ ] **InputField** (text, phone, email types)
- [ ] **RatingStars** (affichage + sélection)
- [ ] **LoadingSpinner** (custom avec couleurs Linkart)
- [ ] **EmptyState** (placeholder vide)

#### 3.2 Cards

- [ ] **ProductCard** (beat/kit card)
- [ ] **ServiceCard** (service card)
- [ ] **BeatCard** (mini format)
- [ ] **PlaylistCard** (playlist slider)
- [ ] **LicenseCard** (checkout)
- [ ] **BoostCard** (plans boost)

#### 3.3 Navigation Components

- [ ] **CustomTabBar** (si customisation nécessaire)
- [ ] **Header** (avec back button, title, actions)

### Ordre de Conversion

**1. PrimaryButton** (le plus utilisé)

```tsx
// src/components/common/PrimaryButton.tsx
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Convertir depuis components/PrimaryButton.tsx
// div → TouchableOpacity
// onClick → onPress
// className → StyleSheet
```

**2. InputField**

```tsx
// src/components/common/InputField.tsx
import { View, Text, TextInput } from 'react-native';

// Convertir depuis components/InputField.tsx
// input → TextInput
// onChange → onChangeText
// type → keyboardType
```

**3. Cards (dans l'ordre d'utilisation)**

- ProductCard (HomeScreen)
- PlaylistCard (HomeScreen)
- ServiceCard (MarketplaceScreen)
- BeatCard (partout)
- LicenseCard (CheckoutScreen)

### Pattern de Conversion

Pour chaque composant :

1. Créer fichier dans `src/components/[common|cards]/`
2. Copier interface TypeScript (souvent identique)
3. Remplacer JSX web par React Native
4. Convertir Tailwind → StyleSheet
5. Tester dans Storybook ou écran test
6. Documenter props et exemples

### Validation

Créer **ComponentsTestScreen.tsx** :

```tsx
function ComponentsTestScreen() {
  return (
    <ScrollView style={{ padding: 24 }}>
      <Text style={{ color: '#FFF', fontSize: 24, marginBottom: 16 }}>Tests Composants</Text>

      <Text style={{ color: '#FFF', marginTop: 16 }}>Buttons:</Text>
      <PrimaryButton title="Primary" onPress={() => {}} />
      <PrimaryButton title="Secondary" variant="secondary" onPress={() => {}} />
      <PrimaryButton title="Loading" loading onPress={() => {}} />

      <Text style={{ color: '#FFF', marginTop: 16 }}>Inputs:</Text>
      <InputField label="Phone" value="" onChangeText={() => {}} />

      <Text style={{ color: '#FFF', marginTop: 16 }}>Cards:</Text>
      <ProductCard beat={mockBeat} onPress={() => {}} />
      {/* etc. */}
    </ScrollView>
  );
}
```

**Référence** : `/REACT_NATIVE_CONVERSION_GUIDE.md` (Section Composants)

---

## Phase 4 : Écrans Auth (2-3 jours)

### Objectif

Convertir tous les écrans du flow d'authentification.

### Checklist

- [ ] **4.1** SplashScreen (gradient animé)
- [ ] **4.2** WelcomeScreen (carousel onboarding)
- [ ] **4.3** LoginScreen (input phone + validation)
- [ ] **4.4** OTPVerificationScreen (6 digit code)
- [ ] **4.5** ProfileSetupScreen (form complet)
- [ ] **4.6** OnboardingCarousel (slider avec dots)
- [ ] **4.7** Intégrer avec Supabase Auth

### Ordre de Conversion

**1. SplashScreen** (simple)

```tsx
// src/screens/auth/SplashScreen.tsx
- LinearGradient background
- Logo animé
- Loading indicator
```

**2. WelcomeScreen**

```tsx
// src/screens/auth/WelcomeScreen.tsx
- OnboardingCarousel
- CTA buttons
- Navigation vers Login
```

**3. LoginScreen**

```tsx
// src/screens/auth/LoginScreen.tsx
- KeyboardAvoidingView
- Phone input avec validation
- API call Supabase
- Navigation vers OTP
```

**4. OTPVerificationScreen**

```tsx
// src/screens/auth/OTPVerificationScreen.tsx
- 6 TextInput pour code
- Auto-focus suivant
- Timer countdown
- Vérification API
```

**5. ProfileSetupScreen**

```tsx
// src/screens/auth/ProfileSetupScreen.tsx
- Multi-step form
- Image picker (avatar)
- Capabilities selection
- Save to Supabase
```

### Intégration Supabase

**hooks/useAuth.ts** (identique web!) :

```tsx
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

    // Listen auth changes
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

### Validation

- [ ] SplashScreen affiche au démarrage
- [ ] WelcomeScreen avec carousel fonctionnel
- [ ] LoginScreen accepte numéro téléphone
- [ ] OTP screen gère 6 chiffres
- [ ] ProfileSetup sauvegarde dans Supabase
- [ ] Navigation flow complet fonctionne
- [ ] Auth state persiste (AsyncStorage)

**Référence** : `/REACT_NATIVE_SCREENS_CONVERSION.md` (Auth Screens)

---

## Phase 5 : Écrans Principaux (5-7 jours)

### Objectif

Convertir tous les écrans du flow principal de l'app.

### Checklist

#### 5.1 Home

- [ ] **HomeScreen** (FlatList, carousel, sections)
- [ ] **BeatDetailsScreen** (player, licenses, actions)
- [ ] **ServiceDetailsScreen** (booking form)

#### 5.2 Marketplace

- [ ] **MarketplaceScreen** (grid, filters, search)
- [ ] **SearchFiltersScreen** (modal filters)

#### 5.3 Purchases

- [ ] **CheckoutScreen** (license selection, promo)
- [ ] **PaymentScreen** (Wave/Orange Money)
- [ ] **PaymentSuccessScreen** (animation success)
- [ ] **MyPurchasesScreen** (list + download)

#### 5.4 Upload

- [ ] **UploadScreen** (file picker, metadata form)

#### 5.5 Inbox

- [ ] **InboxScreen** (conversations list)
- [ ] **ChatScreen** (messages, input)

#### 5.6 Profile

- [ ] **ProfileScreen** (stats, settings)
- [ ] **WalletScreen** (balance, transactions)
- [ ] **BookingsScreen** (services bookings)
- [ ] **FavoritesScreen** (liked beats)
- [ ] **NotificationsScreen** (notifs list)

### Ordre Prioritaire

**Semaine 1 : Core Screens**

1. HomeScreen (le plus important)
2. BeatDetailsScreen (2ème plus utilisé)
3. MarketplaceScreen (découverte)
4. ProfileScreen (navigation)

**Semaine 2 : Purchase Flow** 5. CheckoutScreen 6. PaymentScreen 7. PaymentSuccessScreen 8.
MyPurchasesScreen

**Semaine 3 : Reste** 9. Inbox + Chat 10. Upload 11. Wallet, Favorites, etc.

### Pattern : HomeScreen

**Complexité** : ⭐⭐⭐⭐⭐ (le plus complexe)

**Éléments clés** :

```tsx
// src/screens/home/HomeScreen.tsx
- SafeAreaView
- FlatList (avec header complexe)
  ├── Header (logo, notif, profile icons)
  ├── HeroCarousel
  ├── Playlists horizontal scroll
  └── Beats grid (2 columns)
- RefreshControl
- Navigation vers détails
```

**Conversion** :

1. Remplacer `<div>` scrollable par `<FlatList>`
2. Tout le contenu fixe va dans `ListHeaderComponent`
3. Grid avec `numColumns={2}`
4. Horizontal scroll avec `FlatList horizontal`
5. Images avec `<Image>` + cache
6. Navigation avec `navigation.navigate()`

### Pattern : CheckoutScreen

**Complexité** : ⭐⭐⭐⭐

**Éléments clés** :

```tsx
// src/screens/purchases/CheckoutScreen.tsx
- KeyboardAvoidingView (important!)
- ScrollView
- Product card with image
- License cards (selectable)
- Promo code input
- Price breakdown
- Footer button (fixed)
```

**Astuce** : Footer fixe

```tsx
<View style={styles.container}>
  <ScrollView>{/* content */}</ScrollView>

  <View style={styles.footer}>
    <PrimaryButton title="Payer" onPress={handlePay} />
  </View>
</View>;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#0A0A0A',
    borderTopWidth: 1,
    borderTopColor: '#262626',
  },
});
```

### Validation par Écran

Pour chaque écran :

- [ ] Layout correct sur iPhone SE (petit)
- [ ] Layout correct sur iPhone 14 Pro Max (grand)
- [ ] Layout correct sur Android (différentes tailles)
- [ ] ScrollView fonctionne (pas de contenu coupé)
- [ ] Keyboard ne cache pas inputs (KeyboardAvoidingView)
- [ ] Images chargent correctement
- [ ] Navigation fonctionne
- [ ] API calls fonctionnent
- [ ] Loading states affichés
- [ ] Error handling OK

**Référence** : `/REACT_NATIVE_SCREENS_CONVERSION.md`

---

## Phase 6 : Features Avancées (3-5 jours)

### Objectif

Implémenter les fonctionnalités complexes (audio, upload, paiement).

### Checklist

#### 6.1 Audio Player

- [ ] Installer `expo-av` ou `react-native-track-player`
- [ ] Créer hook `usePlayer`
- [ ] Player controls (play, pause, seek)
- [ ] Background audio (iOS/Android config)
- [ ] Waveform visualizer (canvas ou library)
- [ ] Mini player sticky

#### 6.2 File Upload

- [ ] Installer `expo-document-picker` + `expo-image-picker`
- [ ] Audio file picker (MP3, WAV)
- [ ] Image picker (cover)
- [ ] Upload à Supabase Storage
- [ ] Progress indicator
- [ ] Validation fichiers

#### 6.3 Paiement Mobile Money

- [ ] Intégrer API Wave
- [ ] Intégrer API Orange Money
- [ ] WebView pour paiement (si nécessaire)
- [ ] Confirmation paiement
- [ ] Webhook handling

#### 6.4 Notifications Push

- [ ] Installer `expo-notifications`
- [ ] Configure iOS/Android
- [ ] Request permissions
- [ ] Handle foreground notifs
- [ ] Handle background notifs
- [ ] Deep linking depuis notif

#### 6.5 Offline Support

- [ ] Installer `@react-native-async-storage/async-storage`
- [ ] Cache API responses
- [ ] Queue uploads offline
- [ ] Sync quand connexion revient
- [ ] Indicator offline mode

### Audio Player Setup

**Installation** :

```bash
npx expo install expo-av
```

**Hook usePlayer** :

```tsx
// src/hooks/usePlayer.ts
import { Audio } from 'expo-av';
import { useState } from 'react';

export function usePlayer() {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  async function play(uri: string) {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );

    setSound(newSound);
    setIsPlaying(true);
  }

  async function pause() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  function onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);

      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  }

  return { play, pause, isPlaying, duration, position, sound };
}
```

### Validation

- [ ] Audio joue sur iOS
- [ ] Audio joue sur Android
- [ ] Controls fonctionnent (play/pause/seek)
- [ ] Upload fichiers fonctionne
- [ ] Paiement Wave test OK
- [ ] Paiement Orange Money test OK
- [ ] Notifications reçues
- [ ] Offline mode fonctionne

**Référence** : `/REACT_NATIVE_LIBRARIES_GUIDE.md` (Audio/Video section)

---

## Phase 7 : Polish & Production (3-5 jours)

### Objectif

Optimiser, tester, et préparer pour production.

### Checklist

#### 7.1 Performance

- [ ] Optimiser FlatList (initialNumToRender, windowSize)
- [ ] Image caching avec `expo-image`
- [ ] Lazy load screens
- [ ] Minimize bundle size
- [ ] Test performance iOS
- [ ] Test performance Android

#### 7.2 UI/UX Polish

- [ ] Animations smooth (60fps)
- [ ] Haptic feedback (vibrations)
- [ ] Pull-to-refresh partout
- [ ] Empty states designs
- [ ] Error states designs
- [ ] Loading skeletons
- [ ] Transitions screens

#### 7.3 Icons & Assets

- [ ] App icon (1024×1024)
- [ ] Adaptive icon Android
- [ ] Splash screen
- [ ] All images optimized
- [ ] Fonts loaded (Poppins, Inter)

#### 7.4 Testing

- [ ] Test sur iPhone (multiple sizes)
- [ ] Test sur Android (multiple sizes)
- [ ] Test dark mode uniquement
- [ ] Test slow network
- [ ] Test offline mode
- [ ] Test deep links
- [ ] Test notifications
- [ ] Test all payments flows

#### 7.5 Build Production

- [ ] Configure EAS Build
- [ ] Test build iOS
- [ ] Test build Android
- [ ] Beta test avec TestFlight (iOS)
- [ ] Beta test avec Play Console (Android)

#### 7.6 Store Submission

- [ ] Screenshots (all sizes)
- [ ] App description
- [ ] Keywords SEO
- [ ] Privacy policy
- [ ] Submit iOS (App Store Connect)
- [ ] Submit Android (Play Console)

### Performance Optimizations

**FlatList** :

```tsx
<FlatList
  data={beats}
  renderItem={renderBeat}
  keyExtractor={item => item.id}
  // Performance props
  initialNumToRender={6}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
  // Better scrolling
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

**Images** :

```bash
# Installer expo-image (meilleur cache)
npx expo install expo-image

# Remplacer Image par ExpoImage
import { Image } from 'expo-image';

<Image
  source={{ uri: beat.coverImage }}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
/>
```

**Lazy Loading** :

```tsx
import { lazy, Suspense } from 'react';

const BeatDetailsScreen = lazy(() => import('./screens/BeatDetailsScreen'));

<Suspense fallback={<LoadingSpinner />}>
  <BeatDetailsScreen />
</Suspense>;
```

### EAS Build

**Installation** :

```bash
npm install -g eas-cli
eas login
eas build:configure
```

**Build iOS** :

```bash
# Development build
eas build --profile development --platform ios

# Production build
eas build --profile production --platform ios
```

**Build Android** :

```bash
# Development build
eas build --profile development --platform android

# Production build
eas build --profile production --platform android
```

### Validation Finale

- [ ] App fonctionne sans bugs critiques
- [ ] Performance 60fps
- [ ] Toutes features testées
- [ ] Build production réussi
- [ ] Beta testers satisfaits
- [ ] Ready pour stores

**Référence** : `/REACT_NATIVE_COMPLETE_SETUP.md` (Build Production)

---

## 📊 Timeline Estimé

### Développeur Seul (Full-time)

```
Phase 1: Setup              1-2 jours   ████░░
Phase 2: Navigation         2-3 jours   ██████░░
Phase 3: Composants         3-4 jours   ████████░░
Phase 4: Auth Screens       2-3 jours   ██████░░
Phase 5: Main Screens       5-7 jours   ██████████████░░
Phase 6: Features Avancées  3-5 jours   ██████████░░
Phase 7: Polish & Prod      3-5 jours   ██████████░░
                            ────────
Total:                      19-29 jours (~4-6 semaines)
```

### Équipe de 2-3 Dev

```
Total: 2-3 semaines (parallélisation)
```

---

## 🎯 Priorités si Temps Limité

### MVP (Minimum Viable Product)

**Must-Have** (Priorité 1) :

- ✅ Auth flow complet
- ✅ HomeScreen (découverte)
- ✅ BeatDetailsScreen (écoute)
- ✅ Checkout + Payment (achat)
- ✅ ProfileScreen (compte)

**Should-Have** (Priorité 2) :

- ✅ MarketplaceScreen (recherche)
- ✅ MyPurchasesScreen (téléchargements)
- ✅ Audio player global

**Nice-to-Have** (Priorité 3) :

- Upload
- Inbox/Chat
- Wallet
- Notifications push
- Offline mode

---

## ✅ Checklist Globale Migration

### Pré-Migration

- [ ] Backend Supabase fonctionnel (déjà fait ✅)
- [ ] APIs documentées
- [ ] Design system défini (couleurs, typo, spacing)
- [ ] Compte Expo créé
- [ ] Comptes Apple/Google Dev créés

### Migration Technique

- [ ] Projet React Native initialisé
- [ ] Tous composants convertis
- [ ] Tous écrans convertis
- [ ] Navigation complète
- [ ] Supabase intégré
- [ ] Audio player fonctionnel
- [ ] Upload fonctionnel
- [ ] Paiement fonctionnel

### Testing & QA

- [ ] Test iOS (multiple devices)
- [ ] Test Android (multiple devices)
- [ ] Test all user flows
- [ ] Performance OK
- [ ] No memory leaks
- [ ] Offline mode tested

### Production

- [ ] Builds production réussis
- [ ] Beta testing complété
- [ ] App Store submission
- [ ] Play Store submission
- [ ] Marketing assets ready

---

## 📚 Ressources par Phase

**Phase 1-2** : Setup & Navigation

- `/REACT_NATIVE_COMPLETE_SETUP.md`
- `/REACT_NATIVE_CONVERSION_GUIDE.md` (Navigation section)

**Phase 3** : Composants

- `/REACT_NATIVE_CONVERSION_GUIDE.md` (Composants section)
- `/REACT_NATIVE_STYLING_GUIDE.md`

**Phase 4-5** : Écrans

- `/REACT_NATIVE_SCREENS_CONVERSION.md`
- `/REACT_NATIVE_STYLING_GUIDE.md`

**Phase 6** : Features

- `/REACT_NATIVE_LIBRARIES_GUIDE.md`
- Expo docs (expo.dev)

**Phase 7** : Production

- `/REACT_NATIVE_COMPLETE_SETUP.md` (Build section)
- EAS Build docs

---

**BON COURAGE ! 🚀**

Cette migration est ambitieuse mais tout à fait réalisable. Suivez les phases dans l'ordre, testez
chaque étape, et vous aurez une superbe app React Native !

**Version**: 1.0.0  
**Date**: Novembre 2024
