# 📋 Screens Restants à Extraire vers Features

> **Version**: v1.0  
> **Date**: 22 Novembre 2025  
> **Dernière mise à jour**: 22 Novembre 2025  
> **Objectif**: Lister tous les screens Figma restants dans `src/screens/` qui doivent être extraits
> vers `features/<domain>/screens/` avec leurs composants réutilisables

---

## ✅ Screens Déjà Extraits (17 screens)

| Screen                      | Localisation                      | Composants Extraits | Statut |
| --------------------------- | --------------------------------- | ------------------- | ------ |
| `PaymentScreenFigma`        | `features/payments/screens/`      | 5 composants        | ✅     |
| `PaymentSuccessScreenFigma` | `features/payments/screens/`      | 6 composants        | ✅     |
| `BookingsScreenFigma`       | `features/bookings/screens/`      | 4 composants        | ✅     |
| `BookingFormScreenFigma`    | `features/bookings/screens/`      | 6 composants        | ✅     |
| `MyPurchasesScreenFigma`    | `features/purchases/screens/`     | 7 composants        | ✅     |
| `NotificationsScreenFigma`  | `features/notifications/screens/` | 4 composants        | ✅     |
| `FavoritesScreenFigma`      | `features/favorites/screens/`     | 2 composants        | ✅     |
| `InboxScreenFigma`          | `features/messaging/screens/`     | 2 composants        | ✅     |
| `ChatScreenFigma`           | `features/messaging/screens/`     | 4 composants        | ✅     |
| `CheckoutScreenFigma`       | `features/checkout/screens/`      | 5 composants        | ✅     |
| `UploadScreenFigma`         | `features/uploads/screens/`       | 13 composants       | ✅     |
| `DownloadViewerScreenFigma` | `features/downloads/screens/`     | 6 composants        | ✅     |
| `HomeScreenFigma`           | `features/home/screens/`          | 7 composants        | ✅     |
| `MarketplaceScreenFigma`    | `features/marketplace/screens/`   | 10 composants       | ✅     |
| `BeatDetailsScreenFigma`    | `features/products/screens/`      | 8 composants        | ✅     |
| `ProfileScreenFigma`        | `features/profile/screens/`       | 6 composants        | ✅     |
| `WalletScreenFigma`         | `features/wallet/screens/`        | 5 composants        | ✅     |

**Total** : 18 screens extraits, 103+ composants réutilisables créés

---

## 🔴 Screens à Extraire par Priorité

### Priorité 1 : Screens Principaux (Home/Marketplace/Products)

| Screen                   | Localisation Actuelle        | Localisation Cible | Complexité   | Composants à Extraire | Statut |
| ------------------------ | ---------------------------- | ------------------ | ------------ | --------------------- | ------ |
| `BeatDetailsScreenFigma` | `features/products/screens/` | ✅                 | 8 composants | ✅                    |

---

### Priorité 2 : Screens Profil & Wallet

| Screen               | Localisation Actuelle       | Localisation Cible | Complexité   | Composants à Extraire | Statut |
| -------------------- | --------------------------- | ------------------ | ------------ | --------------------- | ------ |
| `ProfileScreenFigma` | `features/profile/screens/` | ✅                 | 6 composants | ✅                    |
| `WalletScreenFigma`  | `features/wallet/screens/`  | ✅                 | 5 composants | ✅                    |

---

### Priorité 3 : Screens Services & Recherche

| Screen                      | Localisation Actuelle                                | Localisation Cible           | Complexité | Composants à Extraire                                                                                              | Statut |
| --------------------------- | ---------------------------------------------------- | ---------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------ | ------ |
| `ServiceDetailsScreenFigma` | `src/screens/services/ServiceDetailsScreenFigma.tsx` | `features/services/screens/` | Moyenne    | `ServiceDetailsHeader`, `ServiceInfo`, `ProviderCard`, `PricingTiers`, `Portfolio`, `BookingCTA`, `ReviewsSection` | ⏳     |
| `SearchFiltersScreenFigma`  | `src/screens/search/SearchFiltersScreenFigma.tsx`    | `features/search/screens/`   | Simple     | `SearchFiltersHeader`, `FilterSection`, `GenreFilter`, `PriceRangeFilter`, `SortFilter`, `ApplyButton`             | ⏳     |

---

### Priorité 4 : Screens Auth & Secondaires

| Screen                       | Localisation Actuelle                              | Localisation Cible            | Complexité | Composants à Extraire                                                                           | Statut |
| ---------------------------- | -------------------------------------------------- | ----------------------------- | ---------- | ----------------------------------------------------------------------------------------------- | ------ |
| `WelcomeScreenFigma`         | `src/screens/auth/WelcomeScreenFigma.tsx`          | `features/auth/screens/`      | Simple     | `WelcomeHeader`, `OnboardingCarousel`, `GetStartedButton` (déjà dans molecules)                 | ⏳     |
| `ProfileSetupScreenFigma`    | `src/screens/auth/ProfileSetupScreenFigma.tsx`     | `features/auth/screens/`      | Moyenne    | `ProfileSetupHeader`, `AvatarUpload`, `FormSteps`, `GenreSelector`, `LocationInput`             | ⏳     |
| `BoostScreenFigma`           | `src/screens/boost/BoostScreenFigma.tsx`           | `features/boosts/screens/`    | Simple     | `BoostHeader`, `BoostOptions`, `DurationSelector`, `PaymentMethod`, `ConfirmButton`             | ⏳     |
| `LicenseContractScreenFigma` | `src/screens/legal/LicenseContractScreenFigma.tsx` | `features/legal/screens/`     | Simple     | `ContractHeader`, `ContractViewer`, `TermsSection`, `DownloadButton`, `AcceptButton`            | ⏳     |
| `PlaylistDetailScreenFigma`  | `src/screens/PlaylistDetailScreenFigma.tsx`        | `features/playlists/screens/` | Moyenne    | `PlaylistHeader`, `PlaylistPlayer`, `PlaylistInfo`, `BeatList`, `ShuffleButton`, `RepeatButton` | ⏳     |

---

### Screens Déjà Dans Features (Vérification)

| Screen                      | Localisation Actuelle            | Statut        |
| --------------------------- | -------------------------------- | ------------- |
| `DownloadViewerScreenFigma` | `features/downloads/screens/` ✅ | ✅ OK         |
| `SplashScreen`              | `src/screens/SplashScreen.tsx`   | ⏳ À vérifier |

---

## 📊 Statistiques Globales

- **Screens extraits** : 18/26 (69%)
- **Screens restants** : 8/26 (31%)
- **Composants créés** : 103+ composants réutilisables
- **Architecture** : Modulaire établie (`features/<domain>/screens/` +
  `features/<domain>/components/`)

---

## 🎯 Plan d'Extraction Recommandé

### Étape 1 : Home & Marketplace (Priorité 1)

1. ✅ `MarketplaceScreenFigma` - Screen principal, composants similaires à Home (10 composants
   extraits)
2. ✅ `BeatDetailsScreenFigma` - Screen produit, composants réutilisables

### Étape 2 : Profil & Wallet (Priorité 2)

1. ✅ `ProfileScreenFigma` - Screen utilisateur
2. ✅ `WalletScreenFigma` - Screen financier

### Étape 3 : Services & Recherche (Priorité 3)

1. `ServiceDetailsScreenFigma` - Screen service
2. `SearchFiltersScreenFigma` - Screen filtres

### Étape 4 : Auth & Secondaires (Priorité 4)

1. `WelcomeScreenFigma` - Screen onboarding
2. `ProfileSetupScreenFigma` - Screen setup
3. `BoostScreenFigma` - Screen boost
4. `LicenseContractScreenFigma` - Screen légal
5. `PlaylistDetailScreenFigma` - Screen playlist (placeholder actuellement)

---

## 📝 Notes

- **HomeScreenFigma** ✅ terminé - **MarketplaceScreenFigma** ✅ terminé -
  **BeatDetailsScreenFigma** ✅ terminé - **ProfileScreenFigma** ✅ terminé - **WalletScreenFigma**
  ✅ terminé
- **PlaylistDetailScreenFigma** est actuellement un placeholder et doit être implémenté complètement
- Tous les composants extraits doivent avoir leurs stories Storybook
- Chaque screen doit suivre l'architecture modulaire (`features/<domain>/screens/` +
  `features/<domain>/components/`)

---

**Dernière mise à jour** : 22 Novembre 2025
