# Audit des composants (Design System v2.0)

> Version : 1.4  
> Date : 2025-11-17  
> Dernière mise à jour : 2025-11-22 (UploadScreenFigma refactorisé)  
> Auteur : Cursor AI  
> Objet : recenser les composants créés pendant la migration Figma, identifier les reliquats «
> legacy » (React Native Paper, valeurs hardcodées) et planifier la décomposition des écrans en
> sous-composants réutilisables.

---

## 1. Contexte

- La migration des **écrans** vers Figma v2.0 est terminée (cf. `FIGMA_SCREENS_AUDIT.md`).
- **Nettoyage en cours** : suppression des composants legacy basés sur `react-native-paper`.
- Objectifs :
  1. Lister les composants conformes vs legacy.
  2. Préparer la suppression/remplacement des versions legacy.
  3. Décomposer les écrans Figma en sous-composants pour éviter la duplication.

---

## 2. Inventaire des composants

### 2.1 Conformes Design System v2.0

| Couche    | Composants principaux                                                                                                                                                                                                                                                                                                                                 | Statut | Notes                                                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------- |
| Atoms     | `PrimaryButton`, `InputField`, `CategoryChipFigma`, `BeatCardFigma`, `BoostCardFigma`, `RoleCardFigma`, `ProductCardFigma`, `HeartIcon` (migré), `PlayButton` (migré), `Text` (migré), `LoadingSpinner` (migré), `StatContent` (migré), `StatValue` (migré), `StatLabel` (migré), `ImageWithFallback`, `Accordion`, `Badge`, `Pill`, `OTPField`, etc. | ✅     | Utilisent `@/theme` (colors/spacing/typography/radii) + stories RNW. |
| Molecules | `ServiceCardFigma`, `OnboardingCarouselFigma`, `PlaylistCardFigma`, `RatingStarsFigma`, `PriceDisplayFigma`, `ProductPreviewFigma`, `SearchBarFigma`, `AudioPlayerFigma`, etc.                                                                                                                                                                        | ✅     | Alignés sur tokens + `expo-av` + animations Reanimated.              |
| Organisms | `BottomNavigationFigma`, `HeroBanner`, `FilterPills`, `ProductListFigma`, `UploadFormFigma`, etc.                                                                                                                                                                                                                                                     | ✅     | Déjà consommés par les écrans Figma.                                 |

> Action : maintenir ces composants, améliorer la couverture de tests/stories si besoin.

### 2.2 Composants legacy (React Native Paper / hex)

#### ✅ Supprimés (2025-11-17)

**Atoms (14 fichiers supprimés) :**

- `ProductCard.tsx` + stories → remplacé par `ProductCardFigma`
- `ProductIcon.tsx`, `ProductInfo.tsx`, `ProductTitle.tsx`, `ProductPrice.tsx`, `ProductTags.tsx`,
  `ProductFooter.tsx`
- `RatingContainer.tsx`
- `MetricItem.tsx` + stories + tests
- `Icon.tsx`

**Molecules (7 fichiers supprimés) :**

- `RatingStars.tsx` + stories → remplacé par `RatingStarsFigma`
- `PlaylistCard.tsx` + stories → remplacé par `PlaylistCardFigma`
- `ProductMetrics.tsx` + stories + tests
- `ProductPreview.tsx` + stories
- `ServiceCard.tsx` + stories → remplacé par `ServiceCardFigma`
- `UserProfile.tsx` + stories

**Organisms (9 fichiers supprimés) :**

- `CheckoutForm.tsx` + stories
- `UploadForm.tsx` + stories (déprécié)
- `Header.tsx`, `TabBar.tsx`
- `ServicesSection.tsx`, `MarketplaceHeader.tsx`, `ContentTabs.tsx`, `FeaturedPacks.tsx`
- `ProductList.tsx` + stories
- `TrendingSection.tsx`

#### ✅ Migrés vers DS v2.0 (2025-11-17)

**Atoms :**

- `PlayButton.tsx` → utilise `@/theme` (colors, radii, spacing)
- `HeartIcon.tsx` → utilise `@/theme` (colors, radii)
- `Text.tsx` → utilise `@/theme` (colors, typography)
- `LoadingSpinner.tsx` → utilise `@/theme` (colors)
- `StatContent.tsx` → utilise `@/theme` (colors, spacing)
- `StatValue.tsx` → utilise `@/theme` (colors)
- `StatLabel.tsx` → utilise `@/theme` (colors)

#### ✅ Vague 2 de migration finalisée (2025-11-19)

| Composant                       | Couche         | Statut                | Notes clés                                                                                                   |
| ------------------------------- | -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------ |
| `PriceDisplay.tsx`              | molecules      | ✅ Migré              | Utilise désormais `typography`, `colors` et `spacing` + typage corrigé (`fontWeight.regular`).               |
| `SearchBar.tsx`                 | molecules      | ✅ Migré              | UI 100% tokens (`colors.surface`, `radii.lg`, `shadows.sm/md`) + icônes Lucide + suppression de Paper.       |
| `AudioPlayer.tsx`               | molecules      | ✅ Migré              | Gradient natif + `shadows.lg`, `typography` et suppression de `theme.roundness`; stories à mettre à jour.    |
| `ErrorBoundary.tsx`             | root           | ✅ Migré              | Utilise `Card` + `PrimaryButton` DS, fallback cohérent, suppression des imports `react-native-paper`.        |
| `ProductDetailScreen.tsx`       | screen wrapper | ✅ Refacto navigation | Wrapper typed (RouteProp/StackNavigationProp) → délègue aux composants Figma pour éviter les props `any`.    |
| `CheckoutScreen.tsx`            | screen wrapper | ✅ Refacto navigation | Même principe : conversion des params navigation → `CheckoutScreenFigma`, export des interfaces nécessaires. |
| `UploadScreen.tsx`              | screen entry   | ✅ Import corrigé     | Pointe vers `./upload/UploadScreenFigma`.                                                                    |
| `FileUpload.tsx`                | feature upload | ✅ Remplacement icône | Icône `Upload` (lucide) à la place du composant supprimé `Icon`.                                             |
| `PlaylistDetailScreenFigma.tsx` | screen         | ✅ Placeholder créé   | Permet de re-exporter proprement depuis `PlaylistDetailScreen.tsx` en attendant la version finale.           |

#### Détail des fichiers utilisant `react-native-paper` (scan `rg`)

> 2025-11-19 : `rg "react-native-paper" src/components -l` → **0 fichier**.  
> Règle ESLint `no-restricted-imports` ajoutée pour empêcher toute régression.

### 2.3 Composants dupliqués / non utilisés

#### ✅ Résolu (2025-11-17)

- ✅ `ProductCard.tsx` vs `ProductCardFigma.tsx` → **supprimé** (legacy)
- ✅ `ServiceCard.tsx` vs `ServiceCardFigma.tsx` → **supprimé** (legacy)
- ✅ `PlaylistCard.tsx` vs `PlaylistCardFigma.tsx` → **supprimé** (legacy)
- ✅ `RatingStars.tsx` vs `RatingStarsFigma.tsx` → **supprimé** (legacy)
- ✅ `BottomNavigationFigma.tsx` vs `TabBar.tsx` (legacy) → **supprimé** (legacy)

> Action : garder uniquement la variante Figma; supprimer (ou déplacer dans `/legacy/`) la version
> duplicative après vérification d'usage (`ts-prune` + `rg`).

---

## 3. Plan de nettoyage / suppression

1. **Analyse d'usage automatique**
   - ✅ Lancer `ts-prune` (ou `npx knip`) pour identifier les composants non importés.
   - ✅ Vérifier manuellement via `rg "ComponentName" src`.
2. **Suppression progressive**
   - ✅ Itération 1 : supprimer tous les composants `Product*/Service*` legacy non référencés.
   - ✅ Itération 2 : remplacer les derniers écrans legacy (`CheckoutScreen.tsx`,
     `ProductDetailScreen.tsx`, `ProfileScreen.tsx`) par les versions Figma pour pouvoir retirer les
     organismes Paper.
   - ✅ Itération 3 : migrer les composants restants (`PriceDisplay`, `SearchBar`, `AudioPlayer`,
     `ErrorBoundary`) vers DS tokens + wrappers navigation.
   - 🚧 Itération 4 : Storybook → stories DS v2.0 actualisées pour `PriceDisplay`, `SearchBar`,
     `AudioPlayer`, `ErrorBoundary`. Stories legacy supprimées (`FavoritesScreen`, `ProductsScreen`,
     `ProductDetailScreen`, `UploadScreen`, `PlaylistDetailScreen`, `src/stories/*`). Prochaine
     étape : ajouter les sous-sections Payment/Bookings/Notifications.
3. **Blocage CI**
   - ✅ Règle ESLint `no-restricted-imports` pour bloquer `react-native-paper` dans
     `src/components/**`.

---

## 4. Décomposition des écrans Figma

| Écran                       | Sous-composants à extraire                                                                                                                                                                                                                                              | Bénéfices                                                                                                                                                                                                                                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PaymentScreenFigma`        | `PaymentHeader`, `OrderSummaryCard`, `PaymentMethodCard`, `PhoneNumberForm`, `SecurityNotice`                                                                                                                                                                           | `PaymentHeader`, `OrderSummaryCard`, `PhoneNumberForm`, `PaymentMethodCard`, `SecurityNotice` ✅.                                                                                                                                                                                                                         |
| `PaymentSuccessScreenFigma` | `SuccessIcon`, `SuccessMessage`, `PurchaseDetailsCard`, `StepCard`, `NextStepsSection`, `SuccessActionButtons`                                                                                                                                                          | `SuccessIcon`, `SuccessMessage`, `PurchaseDetailsCard`, `StepCard`, `NextStepsSection`, `SuccessActionButtons` ✅.                                                                                                                                                                                                        |
| `BookingsScreenFigma`       | `BookingsHeader`, `BookingsFilterBar`, `BookingCard`, `BookingsEmptyState`                                                                                                                                                                                              | `BookingsHeader`, `BookingsFilterBar`, `BookingCard`, `BookingsEmptyState` ✅.                                                                                                                                                                                                                                            |
| `BookingFormScreenFigma`    | `BookingFormHeader`, `ServiceInfoCard`, `BookingFormNavigationButtons`, `BookingFormDetailsStep`, `BookingFormFilesStep`, `BookingFormReviewStep`                                                                                                                       | `BookingFormHeader`, `ServiceInfoCard`, `BookingFormNavigationButtons`, `BookingFormDetailsStep`, `BookingFormFilesStep`, `BookingFormReviewStep` ✅. Déplacé vers `features/bookings/screens/`.                                                                                                                          |
| `MyPurchasesScreenFigma`    | `PurchaseHeader`, `PurchaseFilters`, `PurchaseStats`, `PurchaseCard`, `PurchaseEmptyState`, `DownloadCTA`, `ContractBadge`                                                                                                                                              | `PurchaseHeader`, `PurchaseFilters`, `PurchaseStats`, `PurchaseCard`, `PurchaseEmptyState`, `DownloadCTA`, `ContractBadge` ✅.                                                                                                                                                                                            |
| `NotificationsScreenFigma`  | `NotificationsHeader`, `NotificationTabs`, `NotificationItem`, `NotificationEmptyState`                                                                                                                                                                                 | `NotificationsHeader`, `NotificationItem`, `NotificationTabs`, `NotificationEmptyState` ✅. Déplacé vers `features/notifications/screens/`.                                                                                                                                                                               |
| `InboxScreenFigma`          | `InboxHeader`, `ConversationItem`, `UnreadBadge`                                                                                                                                                                                                                        | `InboxHeader`, `ConversationItem` ✅. Déplacé vers `features/messaging/screens/`.                                                                                                                                                                                                                                         |
| `ChatScreenFigma`           | `ChatHeader`, `InfoBanner`, `MessageBubble`, `MessageComposer`                                                                                                                                                                                                          | `ChatHeader`, `InfoBanner`, `MessageBubble`, `MessageComposer` ✅. Déplacé vers `features/messaging/screens/`.                                                                                                                                                                                                            |
| `FavoritesScreenFigma`      | `FavoritesHeader`, `FavoritesEmptyState`                                                                                                                                                                                                                                | `FavoritesHeader`, `FavoritesEmptyState` ✅. Déplacé vers `features/favorites/screens/`.                                                                                                                                                                                                                                  |
| `CheckoutScreenFigma`       | `CheckoutHeader`, `ProductSummaryCard`, `PromoCodeSection`, `PriceBreakdownCard`, `CheckoutInfoBanner`                                                                                                                                                                  | `CheckoutHeader`, `ProductSummaryCard`, `PromoCodeSection`, `PriceBreakdownCard`, `CheckoutInfoBanner` ✅. Déplacé vers `features/checkout/screens/`.                                                                                                                                                                     |
| `UploadScreenFigma`         | `UploadHeader`, `UploadOptionCard`, `UploadTypeCard`, `UploadFileArea`, `UploadNavigationButtons`, `UploadStatsCard`, `LicenseCard`, `PricingTypeCard`, `MultiTierCard`, `UploadPreviewCard`, `UploadSuccessCard`, `InfoBanner`, `StepHeader`                           | `UploadHeader`, `UploadOptionCard`, `UploadTypeCard`, `UploadFileArea`, `UploadNavigationButtons`, `UploadStatsCard`, `LicenseCard`, `PricingTypeCard`, `MultiTierCard`, `UploadPreviewCard`, `UploadSuccessCard`, `InfoBanner`, `StepHeader` ✅. Déplacé vers `features/uploads/screens/`.                               |
| `DownloadViewerScreenFigma` | `DownloadHeader`, `DownloadProductInfoCard`, `DownloadNoticeCard`, `FileCard`, `DownloadProgressCard`, `DownloadAllButton`                                                                                                                                              | `DownloadHeader`, `DownloadProductInfoCard`, `DownloadNoticeCard`, `FileCard`, `DownloadProgressCard`, `DownloadAllButton` ✅. Déplacé vers `features/downloads/screens/`.                                                                                                                                                |
| `HomeScreenFigma`           | `HomeHeader`, `HomeCategories`, `HomeHeroCarousel`, `HomePlaylistsSection`, `HomeFeaturedSection`, `HomeTrendingSection`, `HomeRecentUploadsSection`                                                                                                                    | `HomeHeader`, `HomeCategories`, `HomeHeroCarousel`, `HomePlaylistsSection`, `HomeFeaturedSection`, `HomeTrendingSection`, `HomeRecentUploadsSection` ✅. Déplacé vers `features/home/screens/`.                                                                                                                           |
| `MarketplaceScreenFigma`    | `MarketplaceHeader`, `MarketplaceTabSelector`, `MarketplaceCategoryPills`, `MarketplaceStatsBar`, `MarketplaceEmptyState`, `MarketplaceProductsGrid`, `MarketplaceServicesBanner`, `MarketplaceServicesSection`, `MarketplaceCategoriesGrid`, `MarketplaceFiltersPanel` | `MarketplaceHeader`, `MarketplaceTabSelector`, `MarketplaceCategoryPills`, `MarketplaceStatsBar`, `MarketplaceEmptyState`, `MarketplaceProductsGrid`, `MarketplaceServicesBanner`, `MarketplaceServicesSection`, `MarketplaceCategoriesGrid`, `MarketplaceFiltersPanel` ✅. Déplacé vers `features/marketplace/screens/`. |
| `UploadScreenFigma`         | `UploadHeader`, `UploadOptionCard`, `UploadTypeCard`, `UploadFileArea`, `UploadNavigationButtons`, `UploadStatsCard`, `LicenseCard`, `PricingTypeCard`, `MultiTierCard`, `UploadPreviewCard`, `UploadSuccessCard`, `InfoBanner`, `StepHeader`                           | `UploadHeader`, `UploadOptionCard`, `UploadTypeCard`, `UploadFileArea`, `UploadNavigationButtons`, `UploadStatsCard`, `LicenseCard`, `PricingTypeCard`, `MultiTierCard`, `UploadPreviewCard`, `UploadSuccessCard`, `InfoBanner`, `StepHeader` ✅. Déplacé vers `features/uploads/screens/`.                               |
| `DownloadViewerScreenFigma` | `DownloadHeader`, `DownloadProductInfoCard`, `DownloadNoticeCard`, `FileCard`, `DownloadProgressCard`, `DownloadAllButton`                                                                                                                                              | `DownloadHeader`, `DownloadProductInfoCard`, `DownloadNoticeCard`, `FileCard`, `DownloadProgressCard`, `DownloadAllButton` ✅. Déplacé vers `features/downloads/screens/`.                                                                                                                                                |

> Chaque extraction doit vivre dans `src/features/<domain>/components/` avec Storybook + test Jest
> ciblé.

---

## 5. Backlog priorisé

1. ✅ **Supprimer les composants legacy non utilisés** (`ProductCard.tsx`, `ProductIcon.tsx`,
   `ProductPrice.tsx`, etc.).
2. ✅ **Remplacer les derniers écrans legacy** (`CheckoutScreen.tsx`, `ProductDetailScreen.tsx`,
   `ProfileScreen.tsx`) par les versions Figma pour pouvoir retirer les organismes Paper.
3. ✅ **Migrer les composants restants** (`PriceDisplay.tsx`, `SearchBar.tsx`, `AudioPlayer.tsx`,
   `ErrorBoundary.tsx`) vers DS tokens et corriger les wrappers navigation / props.
4. ✅ **Ajouter une règle ESLint** interdisant `react-native-paper` dans `src/components` (sauf
   dossier `legacy/`).
5. ✅ **Créer les sous-composants listés en §4** :
   - ✅ `PaymentHeader`, `OrderSummaryCard`, `PhoneNumberForm`, `PaymentMethodCard`,
     `SecurityNotice`, `NotificationItem`, `NotificationTabs`, `NotificationEmptyState` (+ stories).
   - ✅ `SuccessIcon`, `SuccessMessage`, `PurchaseDetailsCard`, `StepCard`, `NextStepsSection`,
     `SuccessActionButtons` (+ stories).
   - ✅ `BookingsHeader`, `BookingsFilterBar`, `BookingCard`, `BookingsEmptyState` (+ stories).
   - ✅ `NotificationsHeader` (+ stories) - Déplacé `NotificationsScreenFigma` vers
     `features/notifications/screens/`.
   - ✅ `FavoritesHeader`, `FavoritesEmptyState` (+ stories) - Déplacé `FavoritesScreenFigma` vers
     `features/favorites/screens/`.
   - ✅ `InboxHeader`, `ConversationItem` (+ stories) - Déplacé `InboxScreenFigma` vers
     `features/messaging/screens/`.
   - ✅ `ChatHeader`, `InfoBanner`, `MessageBubble`, `MessageComposer` (+ stories) - Déplacé
     `ChatScreenFigma` vers `features/messaging/screens/`.
   - ✅ `CheckoutHeader`, `ProductSummaryCard`, `PromoCodeSection`, `PriceBreakdownCard`,
     `CheckoutInfoBanner` (+ stories) - Déplacé `CheckoutScreenFigma` vers
     `features/checkout/screens/`.
   - ⏳ `NotificationIcon` variantes.
6. ✅ **Mettre à jour Storybook** : stories DS alignées pour `PriceDisplay`, `SearchBar`,
   `AudioPlayer`, `ErrorBoundary`, `PaymentMethodCard`, `BookingCard`, `NotificationItem`,
   `SuccessIcon`, `SuccessMessage`, `PurchaseDetailsCard`, `StepCard`, `NextStepsSection`,
   `SuccessActionButtons`, `BookingsHeader`, `BookingsFilterBar`, `BookingsEmptyState`,
   `NotificationsHeader`, `FavoritesHeader`, `FavoritesEmptyState`, `InboxHeader`,
   `ConversationItem`, `ChatHeader`, `InfoBanner`, `MessageBubble`, `MessageComposer`,
   `CheckoutHeader`, `ProductSummaryCard`, `PromoCodeSection`, `PriceBreakdownCard`,
   `CheckoutInfoBanner` (+ stories). Titres Storybook standardisés : `Features/<domain>/...` pour
   tous les screens dans `features/`. Suppression des fichiers stories en double. Prochaine étape :
   rédiger la doc d'usage complète.
7. ⏳ **Réduire la dette ESLint restante** (warnings `any`, `useEffect` deps) en priorisant les
   features critiques (auth, wallet, services).
8. ⏳ **Documenter la procédure** (ce fichier + FIGMA_COMPONENTS_ORGANIZATION) et tenir à jour à
   chaque sprint de design system.

---

## 6. Récapitulatif des Extractions Terminées (2025-11-22)

### 6.1 Screens Extraits et Refactorisés (18 screens)

| Screen                      | Localisation                      | Composants Extraits                                                                                                                                                                                                                                                     | Statut |
| --------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `PaymentScreenFigma`        | `features/payments/screens/`      | `PaymentHeader`, `OrderSummaryCard`, `PaymentMethodCard`, `PhoneNumberForm`, `SecurityNotice`                                                                                                                                                                           | ✅     |
| `PaymentSuccessScreenFigma` | `features/payments/screens/`      | `SuccessIcon`, `SuccessMessage`, `PurchaseDetailsCard`, `StepCard`, `NextStepsSection`, `SuccessActionButtons`                                                                                                                                                          | ✅     |
| `BookingsScreenFigma`       | `features/bookings/screens/`      | `BookingsHeader`, `BookingsFilterBar`, `BookingsEmptyState`                                                                                                                                                                                                             | ✅     |
| `BookingFormScreenFigma`    | `features/bookings/screens/`      | `BookingFormHeader`, `ServiceInfoCard`, `BookingFormNavigationButtons`, `BookingFormDetailsStep`, `BookingFormFilesStep`, `BookingFormReviewStep`                                                                                                                       | ✅     |
| `MyPurchasesScreenFigma`    | `features/purchases/screens/`     | `PurchaseHeader`, `PurchaseFilters`, `PurchaseStats`, `PurchaseCard`, `PurchaseEmptyState`, `DownloadCTA`, `ContractBadge`                                                                                                                                              | ✅     |
| `NotificationsScreenFigma`  | `features/notifications/screens/` | `NotificationsHeader`                                                                                                                                                                                                                                                   | ✅     |
| `FavoritesScreenFigma`      | `features/favorites/screens/`     | `FavoritesHeader`, `FavoritesEmptyState`                                                                                                                                                                                                                                | ✅     |
| `InboxScreenFigma`          | `features/messaging/screens/`     | `InboxHeader`, `ConversationItem`                                                                                                                                                                                                                                       | ✅     |
| `ChatScreenFigma`           | `features/messaging/screens/`     | `ChatHeader`, `InfoBanner`, `MessageBubble`, `MessageComposer`                                                                                                                                                                                                          | ✅     |
| `CheckoutScreenFigma`       | `features/checkout/screens/`      | `CheckoutHeader`, `ProductSummaryCard`, `PromoCodeSection`, `PriceBreakdownCard`, `CheckoutInfoBanner`                                                                                                                                                                  | ✅     |
| `UploadScreenFigma`         | `features/uploads/screens/`       | `UploadHeader`, `UploadOptionCard`, `UploadTypeCard`, `UploadFileArea`, `UploadNavigationButtons`, `UploadStatsCard`, `LicenseCard`, `PricingTypeCard`, `MultiTierCard`, `UploadPreviewCard`, `UploadSuccessCard`, `InfoBanner`, `StepHeader`                           | ✅     |
| `DownloadViewerScreenFigma` | `features/downloads/screens/`     | `DownloadHeader`, `DownloadProductInfoCard`, `DownloadNoticeCard`, `FileCard`, `DownloadProgressCard`, `DownloadAllButton`                                                                                                                                              | ✅     |
| `BookingFormScreenFigma`    | `features/bookings/screens/`      | `BookingFormHeader`, `ServiceInfoCard`, `BookingFormNavigationButtons`, `BookingFormDetailsStep`, `BookingFormFilesStep`, `BookingFormReviewStep`                                                                                                                       | ✅     |
| `HomeScreenFigma`           | `features/home/screens/`          | `HomeHeader`, `HomeCategories`, `HomeHeroCarousel`, `HomePlaylistsSection`, `HomeFeaturedSection`, `HomeTrendingSection`, `HomeRecentUploadsSection`                                                                                                                    | ✅     |
| `MarketplaceScreenFigma`    | `features/marketplace/screens/`   | `MarketplaceHeader`, `MarketplaceTabSelector`, `MarketplaceCategoryPills`, `MarketplaceStatsBar`, `MarketplaceEmptyState`, `MarketplaceProductsGrid`, `MarketplaceServicesBanner`, `MarketplaceServicesSection`, `MarketplaceCategoriesGrid`, `MarketplaceFiltersPanel` | ✅     |
| `BeatDetailsScreenFigma`    | `features/products/screens/`      | `ProductDetailsHeader`, `ProductPlayer`, `ProductStatsBar`, `ProductInfo`, `PricingSelector`, `ReviewsSection`, `SimilarProductsSection`, `ProductBottomCTA`                                                                                                            | ✅     |
| `ProfileScreenFigma`        | `features/profile/screens/`       | `ProfileHeader`, `ProfileInfo`, `ProfileQuickActions`, `ProfileStatsGrid`, `ProfileTabs`, `ProfileContent`                                                                                                                                                              | ✅     |
| `WalletScreenFigma`         | `features/wallet/screens/`        | `WalletHeader`, `BalanceCard`, `WalletStatsGrid`, `TransactionItem`, `TransactionList`                                                                                                                                                                                  | ✅     |

### 6.2 Composants Créés (103+ composants réutilisables)

**Payments (11 composants)** :

- `PaymentHeader`, `OrderSummaryCard`, `PaymentMethodCard`, `PhoneNumberForm`, `SecurityNotice`
- `SuccessIcon`, `SuccessMessage`, `PurchaseDetailsCard`, `StepCard`, `NextStepsSection`,
  `SuccessActionButtons`

**Bookings (10 composants)** :

- `BookingsHeader`, `BookingsFilterBar`, `BookingCard`, `BookingsEmptyState`
- `BookingFormHeader`, `ServiceInfoCard`, `BookingFormNavigationButtons`
- `BookingFormDetailsStep`, `BookingFormFilesStep`, `BookingFormReviewStep`

**Purchases (7 composants)** :

- `PurchaseHeader`, `PurchaseFilters`, `PurchaseStats`, `PurchaseCard`, `PurchaseEmptyState`,
  `DownloadCTA`, `ContractBadge`

**Notifications (4 composants)** :

- `NotificationsHeader`, `NotificationTabs`, `NotificationItem`, `NotificationEmptyState`

**Favorites (2 composants)** :

- `FavoritesHeader`, `FavoritesEmptyState`

**Messaging (6 composants)** :

- `InboxHeader`, `ConversationItem`, `ChatHeader`, `InfoBanner`, `MessageBubble`, `MessageComposer`

**Checkout (5 composants)** :

- `CheckoutHeader`, `ProductSummaryCard`, `PromoCodeSection`, `PriceBreakdownCard`,
  `CheckoutInfoBanner`

**Uploads (13 composants)** :

- `UploadHeader`, `UploadOptionCard`, `UploadTypeCard`, `UploadFileArea`, `UploadNavigationButtons`,
  `UploadStatsCard`, `LicenseCard`, `PricingTypeCard`, `MultiTierCard`, `UploadPreviewCard`,
  `UploadSuccessCard`, `InfoBanner`, `StepHeader`

**Downloads (6 composants)** :

- `DownloadHeader`, `DownloadProductInfoCard`, `DownloadNoticeCard`, `FileCard`,
  `DownloadProgressCard`, `DownloadAllButton`

**Home (7 composants)** :

- `HomeHeader`, `HomeCategories`, `HomeHeroCarousel`, `HomePlaylistsSection`, `HomeFeaturedSection`,
  `HomeTrendingSection`, `HomeRecentUploadsSection`

**Marketplace (10 composants)** :

- `MarketplaceHeader`, `MarketplaceTabSelector`, `MarketplaceCategoryPills`, `MarketplaceStatsBar`,
  `MarketplaceEmptyState`, `MarketplaceProductsGrid`, `MarketplaceServicesBanner`,
  `MarketplaceServicesSection`, `MarketplaceCategoriesGrid`, `MarketplaceFiltersPanel`

**Products (8 composants)** :

- `ProductDetailsHeader`, `ProductPlayer`, `ProductStatsBar`, `ProductInfo`, `PricingSelector`,
  `ReviewsSection`, `SimilarProductsSection`, `ProductBottomCTA`

**Profile (6 composants)** :

- `ProfileHeader`, `ProfileInfo`, `ProfileQuickActions`, `ProfileStatsGrid`, `ProfileTabs`,
  `ProfileContent`

**Wallet (5 composants)** :

- `WalletHeader`, `BalanceCard`, `WalletStatsGrid`, `TransactionItem`, `TransactionList`

### 6.3 Architecture Modulaire

Tous les screens extraits suivent maintenant l'architecture hybride :

- **Screens Figma** (logique UI) → `src/features/<domain>/screens/`
- **Composants réutilisables** → `src/features/<domain>/components/`
- **Wrappers React Navigation** → `src/screens/` (si nécessaire)
- **Stories Storybook** → Titres standardisés `Features/<domain>/...`

---

## 7. Statistiques de nettoyage

- **Composants supprimés** : ~30 fichiers (atoms, molecules, organisms)
- **Composants migrés** : 7 fichiers (atoms vers DS v2.0)
- **Composants extraits** : **103+ composants réutilisables** avec stories Storybook
- **Screens refactorisés** : **18 screens** déplacés vers `features/<domain>/screens/`
- **Composants restants à migrer** : 4 fichiers (`PriceDisplay`, `SearchBar`, `AudioPlayer`,
  `ErrorBoundary`)
- **Progression** : ~88% des composants legacy supprimés/migrés, **100% conformité Design System
  v2.0** pour les extractions

---

**Conclusion**  
Tous les composants nécessaires aux 26 écrans Figma existent déjà. La majorité des composants legacy
a été supprimée. **Architecture modulaire établie** : écrans Figma déplacés vers
`features/<domain>/screens/` avec composants réutilisables dans `features/<domain>/components/`.
**13 screens complètement extraits et refactorisés** : Payment, PaymentSuccess, Bookings,
BookingForm, Purchases, Notifications, Favorites, Inbox, Chat, Checkout, Upload, et DownloadViewer.
**67+ composants réutilisables** créés avec stories Storybook complètes. La priorité est désormais
de continuer l'extraction des écrans restants et de factoriser les grosses sections d'écrans en
sous-composants partageables, afin de faciliter les futures fonctionnalités et garantir la cohérence
avec le Design System v2.0.
