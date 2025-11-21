# 📱 Plan de Migration Screens Figma → React Native (Design System v2.0)

> **Version**: v1.1  
> **Date**: 10 Novembre 2025  
> **Dernière mise à jour**: 22 Novembre 2025 (HomeScreenFigma refactorisé avec 7 composants)  
> **Objectif**: Migrer tous les screens Figma vers React Native avec **Design System v2.0
> centralisé** et architecture modulaire (`features/<domain>/screens/`)
>
> **✅ État Actuel** : **22/26 screens migrés**, **26/26 conformes Design System v2.0** (Phase 1
> complète ✅ : HomeScreen, MarketplaceScreen, BeatDetailsScreen, CheckoutScreen, PaymentScreen,
> LoginScreen, OTPVerificationScreen, ProfileSetupScreen | Phase 2 complète ✅ :
> ServiceDetailsScreen ✅, UploadScreen ✅, ProfileScreen ✅, WalletScreen ✅, FavoritesScreen ✅,
> SearchFiltersScreen ✅, BookingFormScreen ✅, BookingsScreen ✅ | Phase 3 complète ✅ :
> WelcomeScreen ✅, SplashScreen ✅, PaymentSuccessScreen ✅, BoostScreen ✅, LicenseContractScreen
> ✅, DownloadViewerScreen ✅, MyPurchasesScreen ✅, InboxScreen ✅, ChatScreen ✅,
> NotificationsScreen ✅)
>
> **🔄 Refactorisation en cours** : Déplacement des screens vers `features/<domain>/screens/` avec
> extraction des sous-composants réutilisables dans `features/<domain>/components/`. ✅ Complétés :
> Payment, PaymentSuccess, Bookings, Purchases, Notifications, Favorites, Inbox, Chat, Checkout.
> **35+ composants réutilisables** créés avec stories Storybook.

---

## 📊 État des Lieux

### Screens Figma (26 screens)

**Localisation** : `figma/components/*Screen.tsx`

| N°  | Screen Figma                | Screen RN Actuel                                              | État Migration | Conformité DS v2.0  | Action                                      |
| --- | --------------------------- | ------------------------------------------------------------- | -------------- | ------------------- | ------------------------------------------- |
| 1   | `SplashScreen.tsx`          | `SplashScreen.tsx`                                            | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 2   | `WelcomeScreen.tsx`         | `WelcomeScreenFigma.tsx`                                      | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 3   | `LoginScreen.tsx`           | `LoginScreen.tsx`                                             | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 4   | `OTPVerificationScreen.tsx` | `OTPVerificationScreen.tsx`                                   | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 5   | `ProfileSetupScreen.tsx`    | `ProfileSetupScreenFigma.tsx`                                 | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 6   | `HomeScreen.tsx`            | `features/home/screens/HomeScreenFigma.tsx`                   | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé (Refactorisé avec 7 composants)  |
| 7   | `MarketplaceScreen.tsx`     | `features/marketplace/screens/MarketplaceScreenFigma.tsx`     | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé (Refactorisé avec 10 composants) |
| 8   | `BeatDetailsScreen.tsx`     | `features/products/screens/BeatDetailsScreenFigma.tsx`        | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé (Refactorisé avec 8 composants)  |
| 9   | `ProfileScreen.tsx`         | `features/profile/screens/ProfileScreenFigma.tsx`             | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé (Refactorisé avec 6 composants)  |
| 10  | `ServiceDetailsScreen.tsx`  | `ServiceDetailsScreenFigma.tsx`                               | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 10  | `SearchFiltersScreen.tsx`   | `SearchFiltersScreenFigma.tsx`                                | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 11  | `CheckoutScreen.tsx`        | `features/checkout/screens/CheckoutScreenFigma.tsx`           | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 12  | `PaymentScreen.tsx`         | `features/payments/screens/PaymentScreenFigma.tsx`            | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 13  | `PaymentSuccessScreen.tsx`  | `features/payments/screens/PaymentSuccessScreenFigma.tsx`     | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 14  | `MyPurchasesScreen.tsx`     | `features/purchases/screens/MyPurchasesScreenFigma.tsx`       | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 15  | `UploadScreen.tsx`          | `features/uploads/screens/UploadScreenFigma.tsx`              | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 16  | `BoostScreen.tsx`           | `BoostScreenFigma.tsx`                                        | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 17  | `BookingFormScreen.tsx`     | `features/bookings/screens/BookingFormScreenFigma.tsx`        | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé (Refactorisé avec 6 composants)  |
| 18  | `BookingsScreen.tsx`        | `features/bookings/screens/BookingsScreenFigma.tsx`           | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 19  | `InboxScreen.tsx`           | `features/messaging/screens/InboxScreenFigma.tsx`             | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 20  | `ChatScreen.tsx`            | `features/messaging/screens/ChatScreenFigma.tsx`              | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 21  | `ProfileScreen.tsx`         | `ProfileScreenFigma.tsx`                                      | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 22  | `WalletScreen.tsx`          | `WalletScreenFigma.tsx`                                       | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 23  | `FavoritesScreen.tsx`       | `features/favorites/screens/FavoritesScreenFigma.tsx`         | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 24  | `NotificationsScreen.tsx`   | `features/notifications/screens/NotificationsScreenFigma.tsx` | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 25  | `LicenseContractScreen.tsx` | `LicenseContractScreenFigma.tsx`                              | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |
| 26  | `DownloadViewerScreen.tsx`  | `DownloadViewerScreenFigma.tsx`                               | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé                                  |

**Total** : 26 screens Figma, 22 migrés, **26 conformes Design System v2.0** (Phase 1 complète ✅ :
HomeScreen, MarketplaceScreen, BeatDetailsScreen, CheckoutScreen, PaymentScreen, LoginScreen,
OTPVerificationScreen, ProfileSetupScreen | Phase 2 complète ✅ : ServiceDetailsScreen ✅,
UploadScreen ✅, ProfileScreen ✅, WalletScreen ✅, FavoritesScreen ✅, SearchFiltersScreen ✅,
BookingFormScreen ✅, BookingsScreen ✅ | Phase 3 complète ✅ : WelcomeScreen ✅, SplashScreen ✅,
PaymentSuccessScreen ✅, BoostScreen ✅, LicenseContractScreen ✅, DownloadViewerScreen ✅,
MyPurchasesScreen ✅, InboxScreen ✅, ChatScreen ✅, NotificationsScreen ✅)

---

## 🎯 Objectif : Migration vers Design System v2.0

### Problèmes Actuels

Les screens migrés utilisent :

- ❌ **Couleurs hardcodées** (`#111111`, `#6366F1`, etc.)
- ❌ **Spacing hardcodé** (`padding: 16`, `margin: 12`, etc.)
- ❌ **Typography hardcodée** (`fontSize: 18`, `fontWeight: '600'`, etc.)
- ❌ **BorderRadius hardcodé** (`borderRadius: 16`, etc.)

### Solution : Utiliser Design Tokens

Remplacer par :

- ✅ `colors.surface`, `colors.primary`, etc.
- ✅ `spacing.md`, `spacing.lg`, etc.
- ✅ `typography.fontSize.titleMd`, `typography.fontFamily.poppins.semibold`, etc.
- ✅ `radii.lg`, `radii.xl`, etc.

---

## 📋 Plan de Migration par Priorité

### 🔴 Phase 1 : Screens Critiques MVP (Priorité 1) - **8 screens** ✅ **COMPLÈTE**

Screens les plus utilisés et critiques pour le MVP :

| Screen                        | Complexité | Durée    | Priorité          | État                                     |
| ----------------------------- | ---------- | -------- | ----------------- | ---------------------------------------- |
| `HomeScreenFigma.tsx`         | Élevée     | 1 jour   | 🔴 Critique       | ✅ Terminé                               |
| `MarketplaceScreenFigma.tsx`  | Élevée     | 1 jour   | 🔴 Critique       | ✅ Terminé                               |
| `BeatDetailsScreenFigma.tsx`  | Moyenne    | 0.5 jour | 🔴 Critique       | ✅ Terminé                               |
| `CheckoutScreenFigma.tsx`     | Moyenne    | 0.5 jour | 🔴 Critique       | ✅ Terminé                               |
| `PaymentScreenFigma.tsx`      | Simple     | 0.5 jour | 🟡 Focus Payments | ✅ Terminé (`features/payments/screens`) |
| `LoginScreen.tsx`             | Simple     | 0.5 jour | 🔴 Critique       | ✅ Terminé                               |
| `OTPVerificationScreen.tsx`   | Simple     | 0.5 jour | 🔴 Critique       | ✅ Terminé                               |
| `ProfileSetupScreenFigma.tsx` | Moyenne    | 0.5 jour | 🔴 Critique       | ✅ Terminé                               |

**Durée totale** : 5 jours — **✅ Phase 1 complète !**

---

### 🟡 Phase 2 : Screens Importants (Priorité 2) - **8 screens** - **8/8 complétés** ✅ (100%)

Screens importants pour l'expérience utilisateur :

| Screen                          | Complexité | Durée    | Priorité     | État       |
| ------------------------------- | ---------- | -------- | ------------ | ---------- |
| `ServiceDetailsScreenFigma.tsx` | Moyenne    | 0.5 jour | 🟡 Important | ✅ Terminé |
| `UploadScreenFigma.tsx`         | Élevée     | 1 jour   | 🟡 Important | ✅ Terminé |
| `ProfileScreenFigma.tsx`        | Moyenne    | 0.5 jour | 🟡 Important | ✅ Terminé |
| `WalletScreenFigma.tsx`         | Moyenne    | 0.5 jour | 🟡 Important | ✅ Terminé |
| `FavoritesScreenFigma.tsx`      | Simple     | 0.5 jour | 🟡 Important | ✅ Terminé |
| `SearchFiltersScreenFigma.tsx`  | Moyenne    | 0.5 jour | 🟡 Important | ✅ Terminé |
| `BookingFormScreenFigma.tsx`    | Moyenne    | 0.5 jour | 🟡 Important | ✅ Terminé |
| `BookingsScreenFigma.tsx`       | Simple     | 0.5 jour | 🟡 Important | ✅ Terminé |

**Durée totale** : 4.5 jours — **✅ Phase 2 complète ! (100%)**

---

### 🟢 Phase 3 : Screens Secondaires (Priorité 3) - **10 screens** - **✅ Phase 3 complète ! (100%)**

Screens moins critiques mais nécessaires :

| Screen                           | Complexité | Durée    | Priorité      | État       |
| -------------------------------- | ---------- | -------- | ------------- | ---------- |
| `WelcomeScreenFigma.tsx`         | Simple     | 0.5 jour | 🟢 Secondaire | ✅ Terminé |
| `SplashScreen.tsx`               | Simple     | 0.5 jour | 🟢 Secondaire | ✅ Terminé |
| `PaymentSuccessScreenFigma.tsx`  | Simple     | 0.5 jour | 🟢 Secondaire | ✅ Terminé |
| `BoostScreenFigma.tsx`           | Simple     | 0.5 jour | 🟢 Secondaire | ✅ Terminé |
| `LicenseContractScreenFigma.tsx` | Simple     | 0.5 jour | 🟢 Secondaire | ✅ Terminé |
| `DownloadViewerScreenFigma.tsx`  | Simple     | 0.5 jour | 🟢 Secondaire | ✅ Terminé |
| `MyPurchasesScreenFigma.tsx`     | Moyenne    | 0.5 jour | 🟢 Secondaire | ✅ Terminé |
| `InboxScreenFigma.tsx`           | Moyenne    | 0.5 jour | 🟢 Secondaire | ✅ Terminé |
| `ChatScreenFigma.tsx`            | Moyenne    | 0.5 jour | 🟢 Secondaire | ✅ Terminé |
| `NotificationsScreenFigma.tsx`   | Moyenne    | 0.5 jour | 🟢 Secondaire | ✅ Terminé |

**Durée totale** : 5 jours — **✅ Phase 3 complète ! (100%)**

---

## 🛠️ Méthodologie de Migration

### Étape 1 : Audit du Screen

Pour chaque screen :

1. **Lire le fichier Figma** (`figma/components/*Screen.tsx`)
2. **Lire le fichier RN actuel** (`src/screens/*/*ScreenFigma.tsx`)
3. **Identifier les valeurs hardcodées** :
   - Couleurs : `#111111`, `#6366F1`, etc.
   - Spacing : `padding: 16`, `margin: 12`, etc.
   - Typography : `fontSize: 18`, `fontWeight: '600'`, etc.
   - BorderRadius : `borderRadius: 16`, etc.

### Étape 2 : Remplacement par Design Tokens

```typescript
// AVANT (hardcodé)
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5F5',
  },
});

// APRÈS (Design Tokens)
import { colors, spacing, radii, typography } from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radii.lg,
  },
  title: {
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.textPrimary,
  },
});
```

### Étape 3 : Vérification

1. ✅ Tous les hardcoded values remplacés
2. ✅ Import des tokens depuis `../../theme`
3. ✅ Tests visuels dans Storybook
4. ✅ Tests sur iOS/Android
5. ✅ Pas de régression fonctionnelle

### Étape 4 : Documentation

1. ✅ Commit avec message descriptif
2. ✅ Mettre à jour ce document
3. ✅ Vérifier que le screen fonctionne toujours

---

## 📊 Checklist par Screen

Pour chaque screen migré :

- [ ] Audit des valeurs hardcodées
- [ ] Remplacement par Design Tokens
- [ ] Import `colors`, `spacing`, `typography`, `radii` depuis `../../theme`
- [ ] Vérification visuelle (Storybook)
- [ ] Tests iOS/Android
- [ ] Commit avec message descriptif
- [ ] Mise à jour de ce document

---

## 🎯 Exemple de Migration Complète

### HomeScreenFigma.tsx

**Avant** :

```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  card: {
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 12,
  },
});
```

**Après** :

```typescript
import { colors, spacing, radii, typography } from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
});
```

---

## 📈 Timeline Globale

| Phase       | Screens        | Durée          | Priorité      |
| ----------- | -------------- | -------------- | ------------- |
| **Phase 1** | 8 screens      | 5 jours        | 🔴 Critique   |
| **Phase 2** | 8 screens      | 4.5 jours      | 🟡 Important  |
| **Phase 3** | 10 screens     | 5 jours        | 🟢 Secondaire |
| **Total**   | **26 screens** | **14.5 jours** | -             |

---

## ✅ Critères de Succès

Pour chaque screen migré :

- ✅ **0 valeur hardcodée** (couleurs, spacing, typography, radii)
- ✅ **100% Design Tokens** depuis `../../theme`
- ✅ **Fonctionne identiquement** (pas de régression)
- ✅ **Tests visuels** passés (Storybook)
- ✅ **Tests mobile** passés (iOS/Android)

---

## 🚀 Prochaines Étapes Immédiates

### Phase 3 - En cours : Screens Secondaires

**✅ Phase 3 complète !** Tous les screens sont maintenant conformes Design System v2.0.

**🎉 Migration terminée !**

**Progression globale** :

- **Phase 1** : ✅ 8/8 screens complétés (100%)
- **Phase 2** : ✅ 8/8 screens complétés (100%)
- **Phase 3** : ✅ 10/10 screens complétés (100%) - WelcomeScreen ✅, SplashScreen ✅,
  PaymentSuccessScreen ✅, BoostScreen ✅, LicenseContractScreen ✅, DownloadViewerScreen ✅,
  MyPurchasesScreen ✅, InboxScreen ✅, ChatScreen ✅, NotificationsScreen ✅
- **Total** : **26/26 screens conformes Design System v2.0 (100%)** 🎊
