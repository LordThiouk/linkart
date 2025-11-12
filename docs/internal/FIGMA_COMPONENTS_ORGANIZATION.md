# 📁 Organisation des Composants Figma → React Native

> **Version**: v1.0  
> **Date**: 7 Novembre 2025  
> **Objectif**: Organiser tous les composants Figma selon l'architecture Atomic Design
> (Atoms/Molecules/Organisms)

---

## 📊 Inventaire Complet des Composants Figma

### Localisation

```
figma/
├── components/
│   ├── ui/                    # 48 composants UI de base (ShadCN/Tailwind)
│   ├── figma/                 # 1 composant utilitaire
│   └── *.tsx                  # 43 composants screens & features
```

**Total**: **92 composants** à organiser et migrer

---

## 🎯 Architecture Cible React Native

```
src/components/
├── atoms/           # Composants de base indivisibles
├── molecules/       # Combinaisons simples d'atoms
└── organisms/       # Sections complexes & layouts
```

---

## 🔵 ATOMS - Composants Indivisibles (33 composants)

### Depuis `figma/components/ui/`

| N°  | Composant Figma    | Destination RN                         | État                  | Priorité |
| --- | ------------------ | -------------------------------------- | --------------------- | -------- |
| 1   | `button.tsx`       | `src/components/atoms/Button.tsx`      | 🟢 Existant           | P0       |
| 2   | `input.tsx`        | `src/components/atoms/Input.tsx`       | 🟢 Existant           | P0       |
| 3   | `label.tsx`        | `src/components/atoms/Label.tsx`       | ❌ À créer            | P0       |
| 4   | `textarea.tsx`     | `src/components/atoms/TextArea.tsx`    | 🟢 Existant           | P0       |
| 5   | `separator.tsx`    | `src/components/atoms/Separator.tsx`   | 🟢 Existant (Divider) | P0       |
| 6   | `badge.tsx`        | `src/components/atoms/Badge.tsx`       | 🟢 Existant           | P0       |
| 7   | `avatar.tsx`       | `src/components/atoms/Avatar.tsx`      | 🟢 Existant           | P0       |
| 8   | `checkbox.tsx`     | `src/components/atoms/Checkbox.tsx`    | 🟢 Existant           | P1       |
| 9   | `switch.tsx`       | `src/components/atoms/Switch.tsx`      | 🟢 Existant           | P1       |
| 10  | `radio-group.tsx`  | `src/components/atoms/RadioGroup.tsx`  | ❌ À créer            | P1       |
| 11  | `slider.tsx`       | `src/components/atoms/Slider.tsx`      | ❌ À créer            | P2       |
| 12  | `progress.tsx`     | `src/components/atoms/Progress.tsx`    | ❌ À créer            | P1       |
| 13  | `skeleton.tsx`     | `src/components/atoms/Skeleton.tsx`    | ❌ À créer            | P1       |
| 14  | `toggle.tsx`       | `src/components/atoms/Toggle.tsx`      | ❌ À créer            | P3       |
| 15  | `aspect-ratio.tsx` | `src/components/atoms/AspectRatio.tsx` | ❌ À créer            | P4       |

### Depuis `figma/components/`

| N°  | Composant Figma          | Destination RN                                | État        | Priorité |
| --- | ------------------------ | --------------------------------------------- | ----------- | -------- |
| 16  | `PrimaryButton.tsx`      | Fusionner avec `Button.tsx` variant           | 🟢 Existant | P0       |
| 17  | `InputField.tsx`         | Fusionner avec `Input.tsx`                    | 🟢 Existant | P0       |
| 18  | `RatingStars.tsx`        | `src/components/atoms/RatingStars.tsx`        | 🟢 Existant | P0       |
| 19  | `CategoryChip.tsx`       | `src/components/atoms/CategoryChip.tsx`       | 🟢 Existant | P0       |
| 20  | `OTPField.tsx`           | `src/components/atoms/OTPField.tsx`           | ❌ À créer  | P1       |
| 21  | `WaveformVisualizer.tsx` | `src/components/atoms/WaveformVisualizer.tsx` | 🟢 Existant | P2       |

### Depuis `figma/components/figma/`

| N°  | Composant Figma         | Destination RN                               | État        | Priorité |
| --- | ----------------------- | -------------------------------------------- | ----------- | -------- |
| 22  | `ImageWithFallback.tsx` | `src/components/atoms/ImageWithFallback.tsx` | 🟢 Existant | P0       |

### Composants Atoms Spécifiques Linkart (Déjà créés)

| N°  | Composant       | Fichier               | État | Notes                     |
| --- | --------------- | --------------------- | ---- | ------------------------- |
| 23  | HeartIcon       | `HeartIcon.tsx`       | 🟢   | Avec animation Reanimated |
| 24  | PlayButton      | `PlayButton.tsx`      | 🟢   | Avec animation Reanimated |
| 25  | Icon            | `Icon.tsx`            | 🟢   | Wrapper Lucide icons      |
| 26  | Logo            | `Logo.tsx`            | 🟢   | Logo app                  |
| 27  | Spacer          | `Spacer.tsx`          | 🟢   | Utilitaire spacing        |
| 28  | Container       | `Container.tsx`       | 🟢   | Wrapper layout            |
| 29  | CenteredContent | `CenteredContent.tsx` | 🟢   | Layout helper             |
| 30  | SafeArea        | `SafeArea.tsx`        | 🟢   | SafeAreaView wrapper      |
| 31  | LoadingSpinner  | `LoadingSpinner.tsx`  | 🟢   | ActivityIndicator         |
| 32  | Title           | `Title.tsx`           | 🟢   | Text wrapper              |
| 33  | StatusIndicator | `StatusIndicator.tsx` | 🟢   | Dot indicator             |

**Total Atoms**: **33 composants**

- ✅ **21 déjà créés/existants**
- ❌ **12 à créer**

---

## 🟢 MOLECULES - Combinaisons Simples (28 composants)

### Depuis `figma/components/ui/`

| N°  | Composant Figma    | Destination RN                             | État        | Priorité |
| --- | ------------------ | ------------------------------------------ | ----------- | -------- |
| 1   | `card.tsx`         | `src/components/molecules/Card.tsx`        | ❌ À créer  | P0       |
| 2   | `alert.tsx`        | `src/components/molecules/Alert.tsx`       | ❌ À créer  | P1       |
| 3   | `select.tsx`       | `src/components/molecules/Select.tsx`      | 🟢 Existant | P1       |
| 4   | `tabs.tsx`         | `src/components/molecules/Tabs.tsx`        | 🟢 Existant | P1       |
| 5   | `tooltip.tsx`      | `src/components/molecules/Tooltip.tsx`     | ❌ À créer  | P2       |
| 6   | `popover.tsx`      | `src/components/molecules/Popover.tsx`     | ❌ À créer  | P2       |
| 7   | `toggle-group.tsx` | `src/components/molecules/ToggleGroup.tsx` | ❌ À créer  | P3       |
| 8   | `input-otp.tsx`    | `src/components/molecules/InputOTP.tsx`    | ❌ À créer  | P2       |
| 9   | `pagination.tsx`   | `src/components/molecules/Pagination.tsx`  | ❌ À créer  | P3       |
| 10  | `breadcrumb.tsx`   | `src/components/molecules/Breadcrumb.tsx`  | ❌ À créer  | P3       |

### Depuis `figma/components/`

| N°  | Composant Figma        | Destination RN                                  | État        | Priorité |
| --- | ---------------------- | ----------------------------------------------- | ----------- | -------- |
| 11  | `BeatCard.tsx`         | `src/components/molecules/BeatCard.tsx`         | 🟢 Existant | P0       |
| 12  | `ProductCard.tsx`      | `src/components/molecules/ProductCard.tsx`      | 🟢 Existant | P0       |
| 13  | `ServiceCard.tsx`      | `src/components/molecules/ServiceCard.tsx`      | 🟢 Existant | P0       |
| 14  | `PlaylistCard.tsx`     | `src/components/molecules/PlaylistCard.tsx`     | 🟢 Existant | P0       |
| 15  | `BoostCard.tsx`        | `src/components/molecules/BoostCard.tsx`        | 🟢 Existant | P1       |
| 16  | `RoleCard.tsx`         | `src/components/molecules/RoleCard.tsx`         | ❌ À créer  | P1       |
| 17  | `OnboardingSlide.tsx`  | `src/components/molecules/OnboardingSlide.tsx`  | ❌ À créer  | P1       |
| 18  | `BottomNavigation.tsx` | `src/components/molecules/BottomNavigation.tsx` | ❌ À créer  | P0       |

### Composants Molecules Spécifiques (Déjà créés)

| N°  | Composant           | Fichier                   | État | Notes          |
| --- | ------------------- | ------------------------- | ---- | -------------- |
| 19  | SearchInput         | `SearchInput.tsx`         | 🟢   | Input + icon   |
| 20  | ProfileImage        | `ProfileImage.tsx`        | 🟢   | Avatar + badge |
| 21  | ListItem            | `ListItem.tsx`            | 🟢   | Item layout    |
| 22  | PrimaryButton       | `PrimaryButton.tsx`       | 🟢   | Button styled  |
| 23  | SecondaryButton     | `SecondaryButton.tsx`     | 🟢   | Button variant |
| 24  | ServiceCategoryChip | `ServiceCategoryChip.tsx` | 🟢   | Chip styled    |
| 25  | TagChip             | `TagChip.tsx`             | 🟢   | Tag styled     |
| 26  | TabsNavigation      | `TabsNavigation.tsx`      | 🟢   | Tabs wrapper   |
| 27  | BeatCardFigma       | `BeatCardFigma.tsx`       | 🟢   | Figma exact    |
| 28  | BoostCardFigma      | `BoostCardFigma.tsx`      | 🟢   | Figma exact    |

**Total Molecules**: **28 composants**

- ✅ **18 déjà créés/existants**
- ❌ **10 à créer**

---

## 🔴 ORGANISMS - Sections Complexes (31 composants)

### Depuis `figma/components/ui/`

| N°  | Composant Figma       | Destination RN                                | État       | Priorité |
| --- | --------------------- | --------------------------------------------- | ---------- | -------- |
| 1   | `dialog.tsx`          | `src/components/organisms/Dialog.tsx`         | ❌ À créer | P1       |
| 2   | `sheet.tsx`           | `src/components/organisms/Sheet.tsx`          | ❌ À créer | P1       |
| 3   | `alert-dialog.tsx`    | `src/components/organisms/AlertDialog.tsx`    | ❌ À créer | P2       |
| 4   | `drawer.tsx`          | `src/components/organisms/Drawer.tsx`         | ❌ À créer | P2       |
| 5   | `dropdown-menu.tsx`   | `src/components/organisms/DropdownMenu.tsx`   | ❌ À créer | P3       |
| 6   | `context-menu.tsx`    | `src/components/organisms/ContextMenu.tsx`    | ❌ À créer | P3       |
| 7   | `menubar.tsx`         | `src/components/organisms/Menubar.tsx`        | ❌ À créer | P3       |
| 8   | `navigation-menu.tsx` | `src/components/organisms/NavigationMenu.tsx` | ❌ À créer | P3       |
| 9   | `command.tsx`         | `src/components/organisms/Command.tsx`        | ❌ À créer | P4       |
| 10  | `sidebar.tsx`         | `src/components/organisms/Sidebar.tsx`        | ❌ À créer | P3       |
| 11  | `table.tsx`           | `src/components/organisms/Table.tsx`          | ❌ À créer | P2       |
| 12  | `calendar.tsx`        | `src/components/organisms/Calendar.tsx`       | ❌ À créer | P2       |
| 13  | `carousel.tsx`        | `src/components/organisms/Carousel.tsx`       | ❌ À créer | P2       |
| 14  | `accordion.tsx`       | `src/components/organisms/Accordion.tsx`      | ❌ À créer | P2       |
| 15  | `collapsible.tsx`     | `src/components/organisms/Collapsible.tsx`    | ❌ À créer | P3       |
| 16  | `hover-card.tsx`      | `src/components/organisms/HoverCard.tsx`      | ❌ À créer | P4       |
| 17  | `scroll-area.tsx`     | Native ScrollView                             | ❌ N/A     | P4       |
| 18  | `resizable.tsx`       | N/A (mobile)                                  | ❌ N/A     | P4       |
| 19  | `form.tsx`            | `src/components/organisms/Form.tsx`           | ❌ À créer | P2       |
| 20  | `chart.tsx`           | `src/components/organisms/Chart.tsx`          | ❌ À créer | P3       |
| 21  | `sonner.tsx` (toast)  | `src/components/organisms/Toast.tsx`          | ❌ À créer | P2       |

### Depuis `figma/components/` - Carousel & Complex UI

| N°  | Composant Figma          | Destination RN                                    | État       | Priorité |
| --- | ------------------------ | ------------------------------------------------- | ---------- | -------- |
| 22  | `OnboardingCarousel.tsx` | `src/components/organisms/OnboardingCarousel.tsx` | ❌ À créer | P1       |

**Total Organisms**: **22 composants**

- ✅ **0 déjà créés**
- ❌ **19 à créer**
- ⚪ **3 N/A (non applicable mobile)**

---

## 📱 SCREENS - Pages Complètes (21 screens)

### Depuis `figma/components/`

Ces composants sont des **screens complets** qui doivent aller dans `src/screens/` (pas dans
components/).

#### Auth Flow (6 screens)

| N°  | Composant Figma             | Destination RN                               | État       | Priorité |
| --- | --------------------------- | -------------------------------------------- | ---------- | -------- |
| 1   | `SplashScreen.tsx`          | `src/screens/auth/SplashScreen.tsx`          | ❌ À créer | P0       |
| 2   | `WelcomeScreen.tsx`         | `src/screens/auth/WelcomeScreen.tsx`         | ❌ À créer | P0       |
| 3   | `LoginScreen.tsx`           | `src/screens/auth/LoginScreen.tsx`           | ❌ À créer | P0       |
| 4   | `OTPVerificationScreen.tsx` | `src/screens/auth/OTPVerificationScreen.tsx` | ❌ À créer | P0       |
| 5   | `ProfileSetupScreen.tsx`    | `src/screens/auth/ProfileSetupScreen.tsx`    | ❌ À créer | P0       |

#### Main Flow (16 screens)

| N°  | Composant Figma             | Destination RN                                      | État       | Priorité |
| --- | --------------------------- | --------------------------------------------------- | ---------- | -------- |
| 6   | `HomeScreen.tsx`            | `src/screens/home/HomeScreen.tsx`                   | ❌ À créer | P0       |
| 7   | `MarketplaceScreen.tsx`     | `src/screens/marketplace/MarketplaceScreen.tsx`     | ❌ À créer | P0       |
| 8   | `BeatDetailsScreen.tsx`     | `src/screens/products/BeatDetailsScreen.tsx`        | ❌ À créer | P0       |
| 9   | `ServiceDetailsScreen.tsx`  | `src/screens/services/ServiceDetailsScreen.tsx`     | ❌ À créer | P0       |
| 10  | `SearchFiltersScreen.tsx`   | `src/screens/marketplace/SearchFiltersScreen.tsx`   | ❌ À créer | P1       |
| 11  | `CheckoutScreen.tsx`        | `src/screens/checkout/CheckoutScreen.tsx`           | ❌ À créer | P0       |
| 12  | `PaymentScreen.tsx`         | `src/screens/checkout/PaymentScreen.tsx`            | ❌ À créer | P0       |
| 13  | `PaymentSuccessScreen.tsx`  | `src/screens/checkout/PaymentSuccessScreen.tsx`     | ❌ À créer | P0       |
| 14  | `UploadScreen.tsx`          | `src/screens/upload/UploadScreen.tsx`               | ❌ À créer | P0       |
| 15  | `BookingFormScreen.tsx`     | `src/screens/bookings/BookingFormScreen.tsx`        | ❌ À créer | P1       |
| 16  | `BookingsScreen.tsx`        | `src/screens/bookings/BookingsScreen.tsx`           | ❌ À créer | P1       |
| 17  | `InboxScreen.tsx`           | `src/screens/inbox/InboxScreen.tsx`                 | ❌ À créer | P1       |
| 18  | `ChatScreen.tsx`            | `src/screens/inbox/ChatScreen.tsx`                  | ❌ À créer | P1       |
| 19  | `ProfileScreen.tsx`         | `src/screens/profile/ProfileScreen.tsx`             | ❌ À créer | P0       |
| 20  | `WalletScreen.tsx`          | `src/screens/wallet/WalletScreen.tsx`               | ❌ À créer | P0       |
| 21  | `NotificationsScreen.tsx`   | `src/screens/notifications/NotificationsScreen.tsx` | ❌ À créer | P1       |
| 22  | `MyPurchasesScreen.tsx`     | `src/screens/purchases/MyPurchasesScreen.tsx`       | ❌ À créer | P1       |
| 23  | `FavoritesScreen.tsx`       | `src/screens/favorites/FavoritesScreen.tsx`         | ❌ À créer | P1       |
| 24  | `DownloadViewerScreen.tsx`  | `src/screens/downloads/DownloadViewerScreen.tsx`    | ❌ À créer | P2       |
| 25  | `LicenseContractScreen.tsx` | `src/screens/contracts/LicenseContractScreen.tsx`   | ❌ À créer | P2       |
| 26  | `BoostScreen.tsx`           | `src/screens/boost/BoostScreen.tsx`                 | ❌ À créer | P2       |

**Total Screens**: **26 screens**

- ✅ **0 déjà créés**
- ❌ **26 à créer**

---

## 📊 Récapitulatif Global

| Catégorie     | Total   | Existants    | À Créer | N/A   | Priorité P0 | Priorité P1 | Priorité P2+ |
| ------------- | ------- | ------------ | ------- | ----- | ----------- | ----------- | ------------ |
| **Atoms**     | 33      | 21 (64%)     | 12      | 0     | 8           | 5           | 7            |
| **Molecules** | 28      | 18 (64%)     | 10      | 0     | 5           | 4           | 1            |
| **Organisms** | 22      | 0 (0%)       | 19      | 3     | 0           | 4           | 15           |
| **Screens**   | 26      | 0 (0%)       | 26      | 0     | 13          | 10          | 3            |
| **TOTAL**     | **109** | **39 (36%)** | **67**  | **3** | **26**      | **23**      | **26**       |

---

## 🎯 Plan d'Action par Phase

### Phase 1 - MVP Core (2 semaines)

**Semaine 1 : Atoms + Molecules**

**Jour 1-2 : Atoms critiques (P0)**

- ✅ Créer/Migrer : Label, Card components, unifier Input/InputField
- ✅ Total : 8 atoms P0

**Jour 3-4 : Atoms secondaires (P1)**

- ✅ Créer : RadioGroup, OTPField, Progress, Skeleton, Alert
- ✅ Total : 5 atoms P1

**Jour 5-7 : Molecules critiques (P0-P1)**

- ✅ Créer : Card, Alert, RoleCard, OnboardingSlide, BottomNavigation
- ✅ Migrer : Select, Tabs existants
- ✅ Total : 9 molecules P0+P1

**Semaine 2 : Screens Core**

**Jour 8-10 : Auth Flow (6 screens P0)**

- Splash, Welcome, Login, OTP, ProfileSetup

**Jour 11-14 : Main Screens (7 screens P0)**

- Home, Marketplace, BeatDetails, ServiceDetails, Checkout, Payment, PaymentSuccess, Upload,
  Profile, Wallet

### Phase 2 - Features Complètes (1 semaine)

**Jour 15-17 : Screens secondaires (P1)**

- SearchFilters, BookingForm, Bookings, Inbox, Chat, Notifications, MyPurchases, Favorites

**Jour 18-21 : Organisms essentiels (P1-P2)**

- Dialog, Sheet, AlertDialog, Drawer, OnboardingCarousel, Form, Toast, Table, Calendar, Carousel,
  Accordion

### Phase 3 - Polish & Optionnel (3-5 jours)

**Jour 22-26 : Composants optionnels (P2-P3)**

- Organisms avancés : DropdownMenu, ContextMenu, Menubar, NavigationMenu, Sidebar
- Screens avancés : DownloadViewer, LicenseContract, Boost
- Molecules optionnels : Pagination, Breadcrumb, ToggleGroup

---

## 🛠️ Structure de Dossiers Finale

```
src/
├── components/
│   ├── atoms/              # 33 composants
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx       # Nouveau
│   │   ├── Checkbox.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx      # Nouveau
│   │   ├── Progress.tsx   # Nouveau
│   │   ├── RadioGroup.tsx # Nouveau
│   │   ├── Separator.tsx
│   │   ├── Skeleton.tsx   # Nouveau
│   │   ├── Slider.tsx     # Nouveau
│   │   ├── Switch.tsx
│   │   ├── TextArea.tsx
│   │   ├── HeartIcon.tsx
│   │   ├── PlayButton.tsx
│   │   └── ...
│   │
│   ├── molecules/          # 28 composants
│   │   ├── Alert.tsx      # Nouveau
│   │   ├── BeatCard.tsx
│   │   ├── BoostCard.tsx
│   │   ├── Card.tsx       # Nouveau (avec Header/Content/Footer)
│   │   ├── InputOTP.tsx   # Nouveau
│   │   ├── OnboardingSlide.tsx # Nouveau
│   │   ├── PlaylistCard.tsx
│   │   ├── ProductCard.tsx
│   │   ├── RoleCard.tsx   # Nouveau
│   │   ├── Select.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── Tabs.tsx
│   │   ├── Tooltip.tsx    # Nouveau
│   │   └── ...
│   │
│   └── organisms/          # 22 composants
│       ├── Accordion.tsx  # Nouveau
│       ├── AlertDialog.tsx # Nouveau
│       ├── Calendar.tsx   # Nouveau
│       ├── Carousel.tsx   # Nouveau
│       ├── Dialog.tsx     # Nouveau
│       ├── Drawer.tsx     # Nouveau
│       ├── Form.tsx       # Nouveau
│       ├── OnboardingCarousel.tsx # Nouveau
│       ├── Sheet.tsx      # Nouveau
│       ├── Table.tsx      # Nouveau
│       ├── Toast.tsx      # Nouveau
│       └── ...
│
└── screens/               # 26 screens
    ├── auth/
    │   ├── SplashScreen.tsx
    │   ├── WelcomeScreen.tsx
    │   ├── LoginScreen.tsx
    │   ├── OTPVerificationScreen.tsx
    │   └── ProfileSetupScreen.tsx
    │
    ├── home/
    │   └── HomeScreen.tsx
    │
    ├── marketplace/
    │   ├── MarketplaceScreen.tsx
    │   └── SearchFiltersScreen.tsx
    │
    ├── products/
    │   └── BeatDetailsScreen.tsx
    │
    ├── services/
    │   └── ServiceDetailsScreen.tsx
    │
    ├── checkout/
    │   ├── CheckoutScreen.tsx
    │   ├── PaymentScreen.tsx
    │   └── PaymentSuccessScreen.tsx
    │
    ├── upload/
    │   └── UploadScreen.tsx
    │
    ├── bookings/
    │   ├── BookingFormScreen.tsx
    │   └── BookingsScreen.tsx
    │
    ├── inbox/
    │   ├── InboxScreen.tsx
    │   └── ChatScreen.tsx
    │
    ├── profile/
    │   └── ProfileScreen.tsx
    │
    ├── wallet/
    │   └── WalletScreen.tsx
    │
    ├── purchases/
    │   └── MyPurchasesScreen.tsx
    │
    ├── favorites/
    │   └── FavoritesScreen.tsx
    │
    ├── notifications/
    │   └── NotificationsScreen.tsx
    │
    ├── downloads/
    │   └── DownloadViewerScreen.tsx
    │
    ├── contracts/
    │   └── LicenseContractScreen.tsx
    │
    └── boost/
        └── BoostScreen.tsx
```

---

## ✅ Prochaines Actions Immédiates

### Aujourd'hui (Jour 1)

1. ✅ Créer les design tokens (`src/theme/tokens.ts`)
2. ✅ Mettre à jour `tailwind.config.js`
3. ✅ Créer `src/lib/utils.ts` (fonction `cn`)
4. ✅ Migrer `Button.tsx` vers NativeWind + cva
5. ✅ Créer `Card.tsx` + sous-composants + story
6. ✅ Créer `Label.tsx` + story
7. ✅ Unifier `Input.tsx` et `InputField.tsx`

---

**Prêt à commencer la migration ! Par quoi veux-tu qu'on commence ?** 🚀
