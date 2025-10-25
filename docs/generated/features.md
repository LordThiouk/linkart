# Documentation des Fonctionnalités

> Généré le: 2025-10-25

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

## 🎯 Products

### Exports

```typescript
export { useProducts } from './hooks/useProducts';
export { ProductService } from './services/productService';
export type { UseProductsOptions } from './hooks/useProducts';
export type { CreateProductData, UpdateProductData } from './services/productService';

```

### Hooks

- **useProducts**

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

## 🎯 Uploads

### Exports

```typescript
export { useUpload } from './hooks/useUpload';
export { UploadService as FeatureUploadService } from './services/uploadService';
export { FileUpload } from './components/FileUpload';

export type { UploadProgress, UploadState, UseUploadOptions } from './hooks/useUpload';
export type { FileMetadata } from './services/uploadService';

```

### Composants

- **FileUpload.stories**
- **FileUpload**

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

- **WalletOverview.stories**
- **WalletOverview**
- **WithdrawalForm.stories**
- **WithdrawalForm**

### Hooks

- **useWallet**

---

