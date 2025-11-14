# 📱 Plan de Migration Screens Figma → React Native (Design System v2.0)

> **Version**: v1.0  
> **Date**: 10 Novembre 2025  
> **Objectif**: Migrer tous les screens Figma vers React Native avec **Design System v2.0
> centralisé**
>
> **✅ État Actuel** : **22/26 screens migrés**, **8/26 conformes Design System v2.0** (Phase 1
> complète ✅ : HomeScreen, MarketplaceScreen, BeatDetailsScreen, CheckoutScreen, PaymentScreen,
> LoginScreen, OTPVerificationScreen, ProfileSetupScreen)

---

## 📊 État des Lieux

### Screens Figma (26 screens)

**Localisation** : `figma/components/*Screen.tsx`

| N°  | Screen Figma                | Screen RN Actuel                 | État Migration | Conformité DS v2.0  | Action                 |
| --- | --------------------------- | -------------------------------- | -------------- | ------------------- | ---------------------- |
| 1   | `SplashScreen.tsx`          | `SplashScreen.tsx`               | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 2   | `WelcomeScreen.tsx`         | `WelcomeScreenFigma.tsx`         | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 3   | `LoginScreen.tsx`           | `LoginScreen.tsx`                | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé             |
| 4   | `OTPVerificationScreen.tsx` | `OTPVerificationScreen.tsx`      | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé             |
| 5   | `ProfileSetupScreen.tsx`    | `ProfileSetupScreenFigma.tsx`    | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé             |
| 6   | `HomeScreen.tsx`            | `HomeScreenFigma.tsx`            | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé             |
| 7   | `MarketplaceScreen.tsx`     | `MarketplaceScreenFigma.tsx`     | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé             |
| 8   | `BeatDetailsScreen.tsx`     | `BeatDetailsScreenFigma.tsx`     | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé             |
| 9   | `ServiceDetailsScreen.tsx`  | `ServiceDetailsScreenFigma.tsx`  | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 10  | `SearchFiltersScreen.tsx`   | `SearchFiltersScreenFigma.tsx`   | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 11  | `CheckoutScreen.tsx`        | `CheckoutScreenFigma.tsx`        | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé             |
| 12  | `PaymentScreen.tsx`         | `PaymentScreenFigma.tsx`         | ✅ Migré       | ✅ Conforme DS v2.0 | ✅ Terminé             |
| 13  | `PaymentSuccessScreen.tsx`  | `PaymentSuccessScreenFigma.tsx`  | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 14  | `MyPurchasesScreen.tsx`     | `MyPurchasesScreenFigma.tsx`     | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 15  | `UploadScreen.tsx`          | `UploadScreenFigma.tsx`          | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 16  | `BoostScreen.tsx`           | `BoostScreenFigma.tsx`           | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 17  | `BookingFormScreen.tsx`     | `BookingFormScreenFigma.tsx`     | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 18  | `BookingsScreen.tsx`        | `BookingsScreenFigma.tsx`        | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 19  | `InboxScreen.tsx`           | `InboxScreenFigma.tsx`           | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 20  | `ChatScreen.tsx`            | `ChatScreenFigma.tsx`            | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 21  | `ProfileScreen.tsx`         | `ProfileScreenFigma.tsx`         | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 22  | `WalletScreen.tsx`          | `WalletScreenFigma.tsx`          | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 23  | `FavoritesScreen.tsx`       | `FavoritesScreenFigma.tsx`       | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 24  | `NotificationsScreen.tsx`   | `NotificationsScreenFigma.tsx`   | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 25  | `LicenseContractScreen.tsx` | `LicenseContractScreenFigma.tsx` | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |
| 26  | `DownloadViewerScreen.tsx`  | `DownloadViewerScreenFigma.tsx`  | ✅ Migré       | ❌ Non conforme     | ⏳ Migrer vers DS v2.0 |

**Total** : 26 screens Figma, 22 migrés, **8 conformes Design System v2.0** (HomeScreen,
MarketplaceScreen, BeatDetailsScreen, CheckoutScreen, PaymentScreen, LoginScreen,
OTPVerificationScreen, ProfileSetupScreen)

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

| Screen                        | Complexité | Durée    | Priorité    | État       |
| ----------------------------- | ---------- | -------- | ----------- | ---------- |
| `HomeScreenFigma.tsx`         | Élevée     | 1 jour   | 🔴 Critique | ✅ Terminé |
| `MarketplaceScreenFigma.tsx`  | Élevée     | 1 jour   | 🔴 Critique | ✅ Terminé |
| `BeatDetailsScreenFigma.tsx`  | Moyenne    | 0.5 jour | 🔴 Critique | ✅ Terminé |
| `CheckoutScreenFigma.tsx`     | Moyenne    | 0.5 jour | 🔴 Critique | ✅ Terminé |
| `PaymentScreenFigma.tsx`      | Simple     | 0.5 jour | 🔴 Critique | ✅ Terminé |
| `LoginScreen.tsx`             | Simple     | 0.5 jour | 🔴 Critique | ✅ Terminé |
| `OTPVerificationScreen.tsx`   | Simple     | 0.5 jour | 🔴 Critique | ✅ Terminé |
| `ProfileSetupScreenFigma.tsx` | Moyenne    | 0.5 jour | 🔴 Critique | ✅ Terminé |

**Durée totale** : 5 jours — **✅ Phase 1 complète !**

---

### 🟡 Phase 2 : Screens Importants (Priorité 2) - **8 screens**

Screens importants pour l'expérience utilisateur :

| Screen                          | Complexité | Durée    | Priorité     |
| ------------------------------- | ---------- | -------- | ------------ |
| `ServiceDetailsScreenFigma.tsx` | Moyenne    | 0.5 jour | 🟡 Important |
| `UploadScreenFigma.tsx`         | Élevée     | 1 jour   | 🟡 Important |
| `ProfileScreenFigma.tsx`        | Moyenne    | 0.5 jour | 🟡 Important |
| `WalletScreenFigma.tsx`         | Moyenne    | 0.5 jour | 🟡 Important |
| `FavoritesScreenFigma.tsx`      | Simple     | 0.5 jour | 🟡 Important |
| `SearchFiltersScreenFigma.tsx`  | Moyenne    | 0.5 jour | 🟡 Important |
| `BookingFormScreenFigma.tsx`    | Moyenne    | 0.5 jour | 🟡 Important |
| `BookingsScreenFigma.tsx`       | Simple     | 0.5 jour | 🟡 Important |

**Durée totale** : 4.5 jours

---

### 🟢 Phase 3 : Screens Secondaires (Priorité 3) - **10 screens**

Screens moins critiques mais nécessaires :

| Screen                           | Complexité | Durée    | Priorité      |
| -------------------------------- | ---------- | -------- | ------------- |
| `WelcomeScreenFigma.tsx`         | Simple     | 0.5 jour | 🟢 Secondaire |
| `SplashScreen.tsx`               | Simple     | 0.5 jour | 🟢 Secondaire |
| `PaymentSuccessScreenFigma.tsx`  | Simple     | 0.5 jour | 🟢 Secondaire |
| `MyPurchasesScreenFigma.tsx`     | Moyenne    | 0.5 jour | 🟢 Secondaire |
| `BoostScreenFigma.tsx`           | Simple     | 0.5 jour | 🟢 Secondaire |
| `InboxScreenFigma.tsx`           | Moyenne    | 0.5 jour | 🟢 Secondaire |
| `ChatScreenFigma.tsx`            | Moyenne    | 0.5 jour | 🟢 Secondaire |
| `NotificationsScreenFigma.tsx`   | Moyenne    | 0.5 jour | 🟢 Secondaire |
| `LicenseContractScreenFigma.tsx` | Simple     | 0.5 jour | 🟢 Secondaire |
| `DownloadViewerScreenFigma.tsx`  | Simple     | 0.5 jour | 🟢 Secondaire |

**Durée totale** : 5 jours

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

### Aujourd'hui - Phase 1.1 : HomeScreen

1. Lire `figma/components/HomeScreen.tsx`
2. Lire `src/screens/HomeScreenFigma.tsx`
3. Identifier toutes les valeurs hardcodées
4. Remplacer par Design Tokens
5. Tester visuellement
6. Commit

**👉 Dis "ACT" pour commencer la migration HomeScreen !** 🎯
