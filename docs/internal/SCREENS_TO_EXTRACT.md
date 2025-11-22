# 📋 Screens Restants à Extraire vers Features

> **Version**: v1.0  
> **Date**: 22 Novembre 2025  
> **Dernière mise à jour**: 22 Novembre 2025  
> **Objectif**: Lister tous les screens Figma restants dans `src/screens/` qui doivent être extraits
> vers `features/<domain>/screens/` avec leurs composants réutilisables

---

## ✅ Screens Déjà Extraits (21 screens)

| Screen                       | Localisation                      | Composants Extraits | Statut |
| ---------------------------- | --------------------------------- | ------------------- | ------ |
| `PaymentScreenFigma`         | `features/payments/screens/`      | 5 composants        | ✅     |
| `PaymentSuccessScreenFigma`  | `features/payments/screens/`      | 6 composants        | ✅     |
| `BookingsScreenFigma`        | `features/bookings/screens/`      | 4 composants        | ✅     |
| `BookingFormScreenFigma`     | `features/bookings/screens/`      | 6 composants        | ✅     |
| `MyPurchasesScreenFigma`     | `features/purchases/screens/`     | 7 composants        | ✅     |
| `NotificationsScreenFigma`   | `features/notifications/screens/` | 4 composants        | ✅     |
| `FavoritesScreenFigma`       | `features/favorites/screens/`     | 2 composants        | ✅     |
| `InboxScreenFigma`           | `features/messaging/screens/`     | 2 composants        | ✅     |
| `ChatScreenFigma`            | `features/messaging/screens/`     | 4 composants        | ✅     |
| `CheckoutScreenFigma`        | `features/checkout/screens/`      | 5 composants        | ✅     |
| `UploadScreenFigma`          | `features/uploads/screens/`       | 13 composants       | ✅     |
| `DownloadViewerScreenFigma`  | `features/downloads/screens/`     | 6 composants        | ✅     |
| `HomeScreenFigma`            | `features/home/screens/`          | 7 composants        | ✅     |
| `MarketplaceScreenFigma`     | `features/marketplace/screens/`   | 10 composants       | ✅     |
| `BeatDetailsScreenFigma`     | `features/products/screens/`      | 8 composants        | ✅     |
| `ProfileScreenFigma`         | `features/profile/screens/`       | 6 composants        | ✅     |
| `WalletScreenFigma`          | `features/wallet/screens/`        | 5 composants        | ✅     |
| `ServiceDetailsScreenFigma`  | `features/services/screens/`      | 7 composants        | ✅     |
| `SearchFiltersScreenFigma`   | `features/search/screens/`        | 5 composants        | ✅     |
| `WelcomeScreenFigma`         | `features/auth/screens/`          | 3 composants        | ✅     |
| `ProfileSetupScreenFigma`    | `features/auth/screens/`          | 4 composants        | ✅     |
| `LoginScreenFigma`           | `features/auth/screens/`          | 3 composants        | ✅     |
| `OTPVerificationScreenFigma` | `features/auth/screens/`          | 3 composants        | ✅     |
| `BoostScreenFigma`           | `features/boosts/screens/`        | 6 composants        | ✅     |
| `LicenseContractScreenFigma` | `features/legal/screens/`         | 5 composants        | ✅     |
| `PlaylistDetailScreenFigma`  | `features/playlists/screens/`     | 4 composants        | ✅     |
| `SplashScreenFigma`          | `features/auth/screens/`          | 3 composants        | ✅     |

**Total** : 28 screens extraits, 146+ composants réutilisables créés

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

| Screen                      | Localisation Actuelle        | Localisation Cible | Complexité | Composants à Extraire                                                                                                                  | Statut |
| --------------------------- | ---------------------------- | ------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `ServiceDetailsScreenFigma` | `features/services/screens/` | ✅                 | Moyenne    | `ServiceDetailsHeader`, `ServiceInfo`, `ProviderCard`, `PricingTiers`, `ServicePortfolio`, `ServiceBottomCTA`, `ServiceReviewsSection` | ✅     |
| `SearchFiltersScreenFigma`  | `features/search/screens/`   | ✅                 | Simple     | `SearchFiltersHeader`, `FilterSection`, `ChipFilterGroup`, `ClearFiltersButton`, `SearchResults`                                       | ✅     |

---

### Priorité 4 : Screens Auth & Secondaires

| Screen                       | Localisation Actuelle         | Localisation Cible | Complexité | Composants à Extraire                                                                                                    | Statut |
| ---------------------------- | ----------------------------- | ------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------ | ------ |
| `WelcomeScreenFigma`         | `features/auth/screens/`      | ✅                 | Simple     | `WelcomeLogo`, `WelcomeContent`, `WelcomeFeaturesGrid`                                                                   | ✅     |
| `ProfileSetupScreenFigma`    | `features/auth/screens/`      | ✅                 | Moyenne    | `ProfileSetupHeader`, `AvatarUpload`, `RoleSelector`, `FormActions`                                                      | ✅     |
| `BoostScreenFigma`           | `features/boosts/screens/`    | ✅                 | Simple     | `BoostHeader`, `BoostHeroSection`, `BoostInfoBanner`, `BoostPlansSection`, `BoostStatsSection`, `BoostBottomCTA`         | ✅     |
| `LicenseContractScreenFigma` | `features/legal/screens/`     | ✅                 | Simple     | `ContractHeader`, `ContractVerificationBadge`, `ContractDetailsCard`, `ContractTermsSection`, `ContractSignatureSection` | ✅     |
| `PlaylistDetailScreenFigma`  | `features/playlists/screens/` | ✅                 | Moyenne    | `PlaylistDetailHeader`, `PlaylistBeatList`, `PlaylistBeatItem`, `PlaylistPlayer`                                         | ✅     |
| `SplashScreenFigma`          | `features/auth/screens/`      | ✅                 | Simple     | `SplashLogo`, `SplashContent`, `LoadingDots`                                                                             | ✅     |

---

### Screens Déjà Dans Features (Vérification)

| Screen                      | Localisation Actuelle            | Statut        |
| --------------------------- | -------------------------------- | ------------- |
| `DownloadViewerScreenFigma` | `features/downloads/screens/` ✅ | ✅ OK         |
| `SplashScreen`              | `src/screens/SplashScreen.tsx`   | ⏳ À vérifier |

---

## 📊 Statistiques Globales

- **Screens extraits** : 28/28 (100%) ✅
- **Screens restants** : 0/28 (0%)
- **Composants créés** : 146+ composants réutilisables
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

1. ✅ `ServiceDetailsScreenFigma` - Screen service (7 composants extraits)
2. ✅ `SearchFiltersScreenFigma` - Screen filtres (5 composants extraits)

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
