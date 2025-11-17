# Audit des composants (Design System v2.0)

> Version : 1.1  
> Date : 2025-11-17  
> Dernière mise à jour : 2025-11-17  
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

#### ⚠️ Restants à migrer

| Composant           | Couche    | Problème principal                               | Action                                                           |
| ------------------- | --------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| `PriceDisplay.tsx`  | molecules | Utilise `react-native-paper`                     | **Migrer** vers DS tokens (utilisé dans wallet, checkout, admin) |
| `SearchBar.tsx`     | molecules | Utilise `react-native-paper`                     | **Migrer** vers DS tokens (utilisé dans `MarketplaceHeader`)     |
| `AudioPlayer.tsx`   | molecules | Utilise `react-native-paper`                     | **Migrer** vers DS tokens (utilisé dans plusieurs écrans)        |
| `ErrorBoundary.tsx` | root      | Utilise `react-native-paper` pour la UI fallback | **Migrer** UI vers DS tokens (logique à garder)                  |

#### Détail des fichiers utilisant `react-native-paper` (scan `rg`)

| Dossier                     | Fichiers restants                                      | Remédiation                 |
| --------------------------- | ------------------------------------------------------ | --------------------------- |
| `src/components/molecules/` | `PriceDisplay.tsx`, `SearchBar.tsx`, `AudioPlayer.tsx` | migrer vers DS tokens       |
| Racine                      | `src/components/ErrorBoundary.tsx`                     | réimplémenter UI sans Paper |

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
     **TERMINÉ**
   - ✅ Itération 2 : remplacer les derniers écrans legacy (`CheckoutScreen.tsx`,
     `ProductDetailScreen.tsx`, `ProfileScreen.tsx`) par les versions Figma -> supprimer leurs
     dépendances Paper. **TERMINÉ**
   - ⏳ Itération 3 : migrer les composants restants (`PriceDisplay`, `SearchBar`, `AudioPlayer`,
     `ErrorBoundary`) vers DS tokens.
3. **Blocage CI (optionnel)**
   - ⏳ Ajouter une règle ESLint pour interdire `react-native-paper` dans `src/components` (hors
     éventuel dossier `legacy/`).

---

## 4. Décomposition des écrans Figma

| Écran                       | Sous-composants à extraire                                                                    | Bénéfices                                                                |
| --------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `PaymentScreenFigma`        | `PaymentHeader`, `OrderSummaryCard`, `PaymentMethodCard`, `PhoneNumberForm`, `SecurityNotice` | Réutilisation dans `CheckoutScreenFigma`, tests unitaires ciblés.        |
| `PaymentSuccessScreenFigma` | `SuccessHero`, `PurchaseDetailsCard`, `NextStepCard`, `SuccessActions`                        | Facilite l'intégration dans une modal ou une version web.                |
| `BookingsScreenFigma`       | `BookingsFilterBar`, `BookingCard`, `BookingActions`, `StatusBadge`, `EmptyState`             | Utilisable dans `BookingsScreen` (provider vs client) + tests isolés.    |
| `MyPurchasesScreenFigma`    | `PurchaseFilters`, `PurchaseCard`, `DownloadCTA`, `ContractBadge`                             | Mutualiser avec `DownloadViewerScreenFigma`.                             |
| `NotificationsScreenFigma`  | `NotificationTabs`, `NotificationItem`, `NotificationIcon`, `EmptyState`                      | Permet d'utiliser `NotificationItem` dans d'autres flux (activity feed). |
| `InboxScreenFigma`          | `ConversationFilter`, `ConversationItem`, `UnreadBadge`                                       | Réutilisable pour un éventuel dashboard web.                             |
| `ChatScreenFigma`           | `ChatHeader`, `MessageList`, `Composer`, `TypingIndicator`                                    | Prépare l'arrivée d'un module messaging partagé (services uniquement).   |
| `DownloadViewerScreenFigma` | `FilePreview`, `ContractInfo`, `ActionButtons`, `LimitBadge`                                  | Réutilisable depuis `MyPurchases`, `PaymentSuccess`.                     |

> Chaque extraction doit vivre dans `src/features/<domain>/components/` avec Storybook + test Jest
> ciblé.

---

## 5. Backlog priorisé

1. ✅ **Supprimer les composants legacy non utilisés** (`ProductCard.tsx`, `ProductIcon.tsx`,
   `ProductPrice.tsx`, etc.). **TERMINÉ**
2. ✅ **Remplacer les derniers écrans legacy** (`CheckoutScreen.tsx`, `ProductDetailScreen.tsx`,
   `ProfileScreen.tsx`) par les versions Figma pour pouvoir retirer les organismes
   `react-native-paper` (DONE via re-export). **TERMINÉ**
3. ⏳ **Migrer les composants restants** (`PriceDisplay.tsx`, `SearchBar.tsx`, `AudioPlayer.tsx`,
   `ErrorBoundary.tsx`) vers DS tokens.
4. ⏳ **Ajouter une règle ESLint** interdisant `react-native-paper` dans `src/components` (sauf
   dossier `legacy/`).
5. ⏳ **Créer les sous-composants listés en §4**, commencer par `PaymentScreenFigma` et
   `BookingsScreenFigma` (les plus complexes).
6. ⏳ **Mettre à jour Storybook** pour pointer uniquement vers les composants Figma (supprimer
   stories legacy).
7. ⏳ **Documenter la procédure** dans `docs/internal/COMPONENTS_AUDIT.md` (ce fichier) et tenir à
   jour lors des prochaines features.

---

## 6. Statistiques de nettoyage

- **Composants supprimés** : ~30 fichiers (atoms, molecules, organisms)
- **Composants migrés** : 7 fichiers (atoms vers DS v2.0)
- **Composants restants à migrer** : 4 fichiers (`PriceDisplay`, `SearchBar`, `AudioPlayer`,
  `ErrorBoundary`)
- **Progression** : ~88% des composants legacy supprimés/migrés

---

**Conclusion**  
Tous les composants nécessaires aux 26 écrans Figma existent déjà. La majorité des composants legacy
a été supprimée. La priorité est désormais de migrer les 4 composants restants vers DS tokens, puis
de factoriser les grosses sections d'écrans en sous-composants partageables, afin de faciliter les
futures fonctionnalités (wallet, services, playlists) et garantir la cohérence avec le Design System
v2.0.
