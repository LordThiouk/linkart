# 📱 Plan de Migration Figma UI → React Native v4.0

> **Version**: v4.0  
> **Date**: 10 Novembre 2025  
> **Objectif**: Plan de migration mis à jour pour les composants Figma restants
>
> **✅ État Actuel** : **28/48 composants migrés (58%)** avec Design System v2.0

---

## 📊 État des Lieux

### Composants Déjà Migrés (28/48) ✅

**Phase 1 - Groupe A (6 composants)** :

- ✅ Button, Input, Card, Label, TextArea, Separator

**Phase 1 - Groupe B (5 composants)** :

- ✅ Badge, Avatar, Alert, Skeleton, Progress

**Phase 1 - Groupe C (6 composants)** :

- ✅ Checkbox, Switch, RadioGroup, Select, Slider, InputOTP

**Phase 1 - Groupe D (5 composants)** :

- ✅ Dialog, Sheet, Tooltip, Popover, AlertDialog

**Phase 2 - Composants Avancés (6 composants)** :

- ✅ Accordion, Table, Carousel, Calendar, Pagination, Breadcrumb

**Phase 3 - Toast (1 composant)** :

- ✅ Toast (sonner.tsx)

---

## 🎯 Nouveau Plan de Migration v4.0

### 🔴 Phase 4 : Composants Essentiels MVP (Priorité 1)

Composants nécessaires pour compléter le MVP Linkart :

| Composant Figma     | État        | Composant RN         | Action                                  | Priorité | Besoin MVP   |
| ------------------- | ----------- | -------------------- | --------------------------------------- | -------- | ------------ |
| `tabs.tsx`          | 🟡 Existant | `TabsNavigation.tsx` | ⏳ Migrer vers Design System v2.0       | **P1**   | ✅ Critique  |
| `form.tsx`          | ❌ Manquant | `Form.tsx`           | ✅ Créer avec react-hook-form           | **P1**   | ✅ Critique  |
| `dropdown-menu.tsx` | ❌ Manquant | `DropdownMenu.tsx`   | ✅ Créer (remplace Select pour actions) | **P1**   | ✅ Important |
| `drawer.tsx`        | ❌ Manquant | `Drawer.tsx`         | ✅ Créer (navigation mobile)            | **P1**   | ✅ Important |

**Durée estimée** : 3-4 jours

**Justification** :

- **Tabs** : Utilisé dans plusieurs screens (Profile, Upload, etc.)
- **Form** : Unifie la validation des formulaires (Upload, Booking, Profile)
- **DropdownMenu** : Actions rapides (menu utilisateur, options produit)
- **Drawer** : Navigation mobile standard (menu latéral)

---

### 🟡 Phase 5 : Composants Utiles (Priorité 2)

Composants qui améliorent l'UX mais ne sont pas critiques :

| Composant Figma    | État        | Composant RN      | Action                         | Priorité | Besoin MVP   |
| ------------------ | ----------- | ----------------- | ------------------------------ | -------- | ------------ |
| `toggle.tsx`       | ❌ Manquant | `Toggle.tsx`      | ✅ Créer (filtres, options)    | **P2**   | 🟡 Utile     |
| `toggle-group.tsx` | ❌ Manquant | `ToggleGroup.tsx` | ✅ Créer (filtres multiples)   | **P2**   | 🟡 Utile     |
| `context-menu.tsx` | ❌ Manquant | `ContextMenu.tsx` | ✅ Créer (long press menu)     | **P2**   | 🟡 Utile     |
| `collapsible.tsx`  | ❌ Manquant | `Collapsible.tsx` | ✅ Créer (similaire Accordion) | **P2**   | 🟡 Optionnel |

**Durée estimée** : 2-3 jours

**Justification** :

- **Toggle/ToggleGroup** : Filtres marketplace, options de tri
- **ContextMenu** : Actions rapides sur long press (produits, messages)
- **Collapsible** : Alternative légère à Accordion

---

### 🟢 Phase 6 : Composants Optionnels (Priorité 3)

Composants pour features avancées ou admin :

| Composant Figma       | État        | Composant RN         | Action                             | Priorité | Besoin MVP     |
| --------------------- | ----------- | -------------------- | ---------------------------------- | -------- | -------------- |
| `aspect-ratio.tsx`    | ❌ Manquant | `AspectRatio.tsx`    | ✅ Créer (images uniformes)        | **P3**   | 🟢 Optionnel   |
| `chart.tsx`           | ❌ Manquant | `Chart.tsx`          | ⏳ Utiliser react-native-chart-kit | **P3**   | 🟢 Admin/Stats |
| `sidebar.tsx`         | ❌ Manquant | `Sidebar.tsx`        | ⏳ Adapter Drawer                  | **P3**   | 🟢 Admin Web   |
| `menubar.tsx`         | ❌ Manquant | `Menubar.tsx`        | ⏳ Adapter mobile                  | **P3**   | 🟢 Admin Web   |
| `navigation-menu.tsx` | ❌ Manquant | `NavigationMenu.tsx` | ⏳ Adapter mobile                  | **P3**   | 🟢 Optionnel   |

**Durée estimée** : 2-3 jours (si nécessaire)

---

### ⚪ Phase 7 : Composants Non Applicables Mobile (Priorité 4)

Composants web-only, non nécessaires pour mobile :

| Composant Figma   | État | Action     | Raison                          |
| ----------------- | ---- | ---------- | ------------------------------- |
| `command.tsx`     | ❌   | ❌ Ignorer | Palette de commandes (web-only) |
| `hover-card.tsx`  | ❌   | ❌ Ignorer | Hover non applicable mobile     |
| `resizable.tsx`   | ❌   | ❌ Ignorer | Redimensionnement (web-only)    |
| `scroll-area.tsx` | ❌   | ❌ Ignorer | ScrollView natif suffit         |

**Action** : Marquer comme "Non applicable" dans la documentation

---

## 📋 Détails Phase 4 : Composants Essentiels

### 1. Tabs (Migration vers Design System v2.0)

**Fichier actuel** : `src/components/atoms/TabsNavigation.tsx`

**Action** :

- Migrer vers Design Tokens
- Ajouter variants (default, outline, ghost)
- Ajouter animations Reanimated
- Créer stories Storybook complètes

**Fichier Figma** : `figma/components/ui/tabs.tsx`

- Structure : `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- Variants : background muted, active state avec border

**Estimation** : 1 jour

---

### 2. Form (Nouveau composant)

**Action** : Créer composant Form avec react-hook-form

**Fichier Figma** : `figma/components/ui/form.tsx`

- Structure : `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`,
  `FormMessage`
- Intégration : react-hook-form pour validation

**Fonctionnalités** :

- Validation automatique
- Messages d'erreur
- États disabled/loading
- Intégration avec Input, Select, Checkbox existants

**Estimation** : 1-2 jours

---

### 3. DropdownMenu (Nouveau composant)

**Action** : Créer menu déroulant pour actions rapides

**Fichier Figma** : `figma/components/ui/dropdown-menu.tsx`

- Structure : `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`,
  `DropdownMenuSeparator`, `DropdownMenuLabel`
- Variants : default, destructive
- Animations : fade + slide

**Cas d'usage** :

- Menu utilisateur (profil, paramètres, déconnexion)
- Actions produit (partager, signaler, modifier)
- Options de tri/filtre

**Estimation** : 1 jour

---

### 4. Drawer (Nouveau composant)

**Action** : Créer drawer pour navigation mobile

**Fichier Figma** : `figma/components/ui/drawer.tsx`

- Structure : `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`,
  `DrawerTitle`, `DrawerDescription`
- Directions : top, bottom, left, right
- Gestures : swipe to close

**Cas d'usage** :

- Menu navigation latéral
- Filtres marketplace
- Panneau de configuration

**Estimation** : 1 jour

---

## 📋 Détails Phase 5 : Composants Utiles

### 1. Toggle

**Action** : Créer composant Toggle (bouton on/off)

**Fichier Figma** : `figma/components/ui/toggle.tsx`

- Variants : default, outline
- Sizes : sm, default, lg
- États : on, off, disabled

**Estimation** : 0.5 jour

---

### 2. ToggleGroup

**Action** : Créer groupe de Toggles (sélection multiple)

**Fichier Figma** : `figma/components/ui/toggle-group.tsx`

- Modes : single, multiple
- Orientation : horizontal, vertical

**Estimation** : 0.5 jour

---

### 3. ContextMenu

**Action** : Créer menu contextuel (long press)

**Fichier Figma** : `figma/components/ui/context-menu.tsx`

- Trigger : long press
- Position : auto (top/bottom/left/right)
- Structure similaire à DropdownMenu

**Estimation** : 1 jour

---

### 4. Collapsible

**Action** : Créer composant Collapsible (alternative Accordion)

**Fichier Figma** : `figma/components/ui/collapsible.tsx`

- Similaire à Accordion mais plus simple
- Pas de groupes, juste expand/collapse

**Estimation** : 0.5 jour

---

## 🎯 Priorisation Finale

### MVP Critique (Phase 4) - **4 composants**

1. ✅ **Tabs** - Migration Design System
2. ✅ **Form** - Validation unifiée
3. ✅ **DropdownMenu** - Actions rapides
4. ✅ **Drawer** - Navigation mobile

### Amélioration UX (Phase 5) - **4 composants**

1. Toggle / ToggleGroup - Filtres
2. ContextMenu - Actions long press
3. Collapsible - Alternative Accordion

### Features Avancées (Phase 6) - **5 composants**

1. AspectRatio - Images uniformes
2. Chart - Stats/Admin
3. Sidebar / Menubar / NavigationMenu - Admin web

---

## 📈 Timeline Estimée

| Phase       | Composants        | Durée          | Priorité     |
| ----------- | ----------------- | -------------- | ------------ |
| **Phase 4** | 4 composants      | 3-4 jours      | 🔴 Critique  |
| **Phase 5** | 4 composants      | 2-3 jours      | 🟡 Utile     |
| **Phase 6** | 5 composants      | 2-3 jours      | 🟢 Optionnel |
| **Total**   | **13 composants** | **7-10 jours** | -            |

---

## ✅ Critères de Succès

Pour chaque composant migré :

- ✅ Utilise Design Tokens (colors, spacing, radii, typography)
- ✅ Animations Reanimated (si applicable)
- ✅ Stories Storybook complètes
- ✅ 100% conforme Figma
- ✅ Testé sur iOS/Android
- ✅ Exporté dans `index.ts`

---

## 🚀 Prochaines Étapes Immédiates

### Aujourd'hui - Phase 4.1 : Tabs Migration

1. Lire `TabsNavigation.tsx` actuel
2. Migrer vers Design Tokens
3. Ajouter variants et animations
4. Créer stories Storybook
5. Tester sur mobile

**👉 Dis "ACT" pour commencer la migration Tabs !** 🎯
