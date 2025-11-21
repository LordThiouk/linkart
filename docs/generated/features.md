# Documentation des Fonctionnalités

> Généré le: 2025-11-21

## 🎯 Admin

### Exports

```typescript
export { useAdmin } from './hooks/useAdmin';
export { AdminDashboard } from './components/AdminDashboard';

export type { AdminStats, AdminDashboard as AdminDashboardType } from './hooks/useAdmin';

```

### Composants

- **AdminDashboard.stories**
- **AdminDashboard**

### Hooks

- **useAdmin**

---

## 🎯 Auth

### Exports

```typescript
export { LoginForm } from './components/LoginForm';
export { OTPForm } from './components/OTPForm';
export { useAuth } from './hooks/useAuth';

```

### Composants

- **LoginForm.stories**
- **LoginForm**
- **OTPForm.stories**
- **OTPForm**

### Hooks

- **useAuth**

---

## 🎯 Bookings

### Exports

```typescript
export * from './components';
export * from './screens';

```

### Composants

- **BookingCard.stories**
- **BookingCard**
- **BookingFormDetailsStep.stories**
- **BookingFormDetailsStep**
- **BookingFormFilesStep.stories**
- **BookingFormFilesStep**
- **BookingFormHeader.stories**
- **BookingFormHeader**
- **BookingFormNavigationButtons.stories**
- **BookingFormNavigationButtons**
- **BookingFormReviewStep.stories**
- **BookingFormReviewStep**
- **BookingsEmptyState.stories**
- **BookingsEmptyState**
- **BookingsFilterBar.stories**
- **BookingsFilterBar**
- **BookingsHeader.stories**
- **BookingsHeader**
- **ServiceInfoCard.stories**
- **ServiceInfoCard**

---

## 🎯 Boosts

### Exports

```typescript
export { useBoosts } from './hooks/useBoosts';
export { BoostCard } from './components/BoostCard';
export { BoostSelector } from './components/BoostSelector';

export type { BoostOption, UseBoostsOptions } from './hooks/useBoosts';

```

### Composants

- **BoostCard.stories**
- **BoostCard**
- **BoostSelector.stories**
- **BoostSelector**

### Hooks

- **useBoosts**

---

## 🎯 Checkout

### Exports

```typescript
export * from './components';
export * from './screens';

```

### Composants

- **CheckoutHeader.stories**
- **CheckoutHeader**
- **CheckoutInfoBanner.stories**
- **CheckoutInfoBanner**
- **PriceBreakdownCard.stories**
- **PriceBreakdownCard**
- **ProductSummaryCard.stories**
- **ProductSummaryCard**
- **PromoCodeSection.stories**
- **PromoCodeSection**

---

## 🎯 Downloads

### Exports

```typescript
export * from './components';
export * from './screens';

```

### Composants

- **DownloadAllButton.stories**
- **DownloadAllButton**
- **DownloadHeader.stories**
- **DownloadHeader**
- **DownloadNoticeCard.stories**
- **DownloadNoticeCard**
- **DownloadProductInfoCard.stories**
- **DownloadProductInfoCard**
- **DownloadProgressCard.stories**
- **DownloadProgressCard**
- **FileCard.stories**
- **FileCard**

---

## 🎯 Favorites

### Exports

```typescript
export * from './components';
export * from './screens';

```

### Composants

- **FavoritesEmptyState.stories**
- **FavoritesEmptyState**
- **FavoritesHeader.stories**
- **FavoritesHeader**

---

## 🎯 Home

### Exports

```typescript
export * from './components';
export * from './screens';
export * from './types';

```

### Composants

- **HomeCategories.stories**
- **HomeCategories**
- **HomeFeaturedSection.stories**
- **HomeFeaturedSection**
- **HomeHeader.stories**
- **HomeHeader**
- **HomeHeroCarousel.stories**
- **HomeHeroCarousel**
- **HomePlaylistsSection.stories**
- **HomePlaylistsSection**
- **HomeRecentUploadsSection.stories**
- **HomeRecentUploadsSection**
- **HomeTrendingSection.stories**
- **HomeTrendingSection**

---

## 🎯 Marketplace

### Composants

- **MarketplaceCategoriesGrid.stories**
- **MarketplaceCategoriesGrid**
- **MarketplaceCategoryPills.stories**
- **MarketplaceCategoryPills**
- **MarketplaceEmptyState.stories**
- **MarketplaceEmptyState**
- **MarketplaceFiltersPanel.stories**
- **MarketplaceFiltersPanel**
- **MarketplaceHeader.stories**
- **MarketplaceHeader**
- **MarketplaceProductsGrid.stories**
- **MarketplaceProductsGrid**
- **MarketplaceServicesBanner.stories**
- **MarketplaceServicesBanner**
- **MarketplaceServicesSection.stories**
- **MarketplaceServicesSection**
- **MarketplaceStatsBar.stories**
- **MarketplaceStatsBar**
- **MarketplaceTabSelector.stories**
- **MarketplaceTabSelector**

---

## 🎯 Messaging

### Exports

```typescript
export * from './components';
export * from './screens';

```

### Composants

- **ChatHeader.stories**
- **ChatHeader**
- **ConversationItem.stories**
- **ConversationItem**
- **InboxHeader.stories**
- **InboxHeader**
- **InfoBanner.stories**
- **InfoBanner**
- **MessageBubble.stories**
- **MessageBubble**
- **MessageComposer.stories**
- **MessageComposer**

---

## 🎯 Notifications

### Exports

```typescript
export * from './components';
export * from './screens';

```

### Composants

- **NotificationEmptyState.stories**
- **NotificationEmptyState**
- **NotificationItem.stories**
- **NotificationItem**
- **NotificationTabs.stories**
- **NotificationTabs**
- **NotificationsHeader.stories**
- **NotificationsHeader**

---

## 🎯 Payments

### Exports

```typescript
export * from './components';
export * from './screens';

```

### Composants

- **NextStepsSection.stories**
- **NextStepsSection**
- **OrderSummaryCard.stories**
- **OrderSummaryCard**
- **PaymentHeader.stories**
- **PaymentHeader**
- **PaymentMethodCard.stories**
- **PaymentMethodCard**
- **PhoneNumberForm.stories**
- **PhoneNumberForm**
- **PurchaseDetailsCard.stories**
- **PurchaseDetailsCard**
- **SecurityNotice.stories**
- **SecurityNotice**
- **StepCard.stories**
- **StepCard**
- **SuccessActionButtons.stories**
- **SuccessActionButtons**
- **SuccessIcon.stories**
- **SuccessIcon**
- **SuccessMessage.stories**
- **SuccessMessage**

---

## 🎯 Products

### Exports

```typescript
export { useProducts } from './hooks/useProducts';
export { ProductService } from './services/productService';
export type { UseProductsOptions } from './hooks/useProducts';
export type { CreateProductData, UpdateProductData } from './services/productService';

```

### Composants

- **PricingSelector.stories**
- **PricingSelector**
- **ProductBottomCTA.stories**
- **ProductBottomCTA**
- **ProductDetailsHeader.stories**
- **ProductDetailsHeader**
- **ProductInfo.stories**
- **ProductInfo**
- **ProductPlayer.stories**
- **ProductPlayer**
- **ProductStatsBar.stories**
- **ProductStatsBar**
- **ProductUploadForm.stories**
- **ProductUploadForm**
- **ReviewsSection.stories**
- **ReviewsSection**
- **SimilarProductsSection.stories**
- **SimilarProductsSection**

### Hooks

- **useProducts**

---

## 🎯 Profile

### Composants

- **ProfileContent.stories**
- **ProfileContent**
- **ProfileHeader.stories**
- **ProfileHeader**
- **ProfileInfo.stories**
- **ProfileInfo**
- **ProfileQuickActions.stories**
- **ProfileQuickActions**
- **ProfileStatsGrid.stories**
- **ProfileStatsGrid**
- **ProfileTabs.stories**
- **ProfileTabs**

---

## 🎯 Purchases

### Exports

```typescript
export * from './components';
export * from './screens';

```

### Composants

- **ContractBadge.stories**
- **ContractBadge**
- **DownloadCTA.stories**
- **DownloadCTA**
- **PurchaseCard.stories**
- **PurchaseCard**
- **PurchaseEmptyState.stories**
- **PurchaseEmptyState**
- **PurchaseFilters.stories**
- **PurchaseFilters**
- **PurchaseHeader.stories**
- **PurchaseHeader**
- **PurchaseStats.stories**
- **PurchaseStats**

---

## 🎯 Ratings

### Exports

```typescript
export { useRatings } from './hooks/useRatings';
export { RatingForm } from './components/RatingForm';
export { RatingList } from './components/RatingList';

export type { RatingData, UseRatingsOptions } from './hooks/useRatings';
export type { RatingFormData } from './components/RatingForm';

```

### Composants

- **RatingForm.stories**
- **RatingForm**
- **RatingList.stories**
- **RatingList**

### Hooks

- **useRatings**

---

## 🎯 Services

### Composants

- **ServiceUploadForm.stories**
- **ServiceUploadForm**

---

## 🎯 Uploads

### Exports

```typescript
export { useUpload } from './hooks/useUpload';
export { UploadService as FeatureUploadService } from './services/uploadService';
export { FileUpload } from './components/FileUpload';

export type { UploadProgress, UploadState, UseUploadOptions } from './hooks/useUpload';
export type { FileMetadata } from './services/uploadService';

export * from './components';
export * from './screens';

```

### Composants

- **FileUpload.stories**
- **FileUpload**
- **InfoBanner.stories**
- **InfoBanner**
- **LicenseCard.stories**
- **LicenseCard**
- **MultiTierCard.stories**
- **MultiTierCard**
- **PricingTypeCard.stories**
- **PricingTypeCard**
- **StepHeader.stories**
- **StepHeader**
- **UploadFileArea.stories**
- **UploadFileArea**
- **UploadFormContainer.stories**
- **UploadFormContainer**
- **UploadHeader.stories**
- **UploadHeader**
- **UploadNavigationButtons.stories**
- **UploadNavigationButtons**
- **UploadOptionCard.stories**
- **UploadOptionCard**
- **UploadPreviewCard.stories**
- **UploadPreviewCard**
- **UploadStatsCard.stories**
- **UploadStatsCard**
- **UploadSuccessCard.stories**
- **UploadSuccessCard**
- **UploadTypeCard.stories**
- **UploadTypeCard**

### Hooks

- **useUpload**

---

## 🎯 Wallet

### Exports

```typescript
export { useWallet } from './hooks/useWallet';
export { WalletService } from './services/walletService';
export { WalletOverview } from './components/WalletOverview';
export { WithdrawalForm } from './components/WithdrawalForm';

export type { WalletData, UseWalletOptions } from './hooks/useWallet';
export type { WithdrawalRequest, WalletStats } from './services/walletService';
export type { WithdrawalFormData } from './components/WithdrawalForm';

```

### Composants

- **BalanceCard.stories**
- **BalanceCard**
- **TransactionItem.stories**
- **TransactionItem**
- **TransactionList.stories**
- **TransactionList**
- **WalletHeader.stories**
- **WalletHeader**
- **WalletOverview.stories**
- **WalletOverview**
- **WalletStatsGrid.stories**
- **WalletStatsGrid**
- **WithdrawalForm.stories**
- **WithdrawalForm**

### Hooks

- **useWallet**

---

