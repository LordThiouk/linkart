# Compatibilité des Versions - Linkart

> Version: 1.0.0 Dernière mise à jour: 2025-01-22 Objet: Documenter les versions compatibles entre
> Expo SDK 54, React, NativeWind, Storybook et les dépendances du projet Linkart.

---

## 1. Versions Principales

### 1.1 Expo SDK 54

| Package          | Version Compatible | Version Actuelle | Notes                     |
| ---------------- | ------------------ | ---------------- | ------------------------- |
| **expo**         | `54.0.22`          | `54.0.22`        | ✅                        |
| **react**        | `19.1.0`           | `19.1.0`         | ⚠️ Ne pas utiliser 19.2.0 |
| **react-dom**    | `19.1.0`           | `19.1.0`         | ⚠️ Ne pas utiliser 19.2.0 |
| **react-native** | `0.81.5`           | `0.81.5`         | ✅ Vérifié compatible     |
| **@types/react** | `~19.1.10`         | `~19.1.10`       | ⚠️ Ne pas utiliser 19.2.x |

### 1.2 Packages Expo

| Package                  | Version Compatible | Version Actuelle | Notes |
| ------------------------ | ------------------ | ---------------- | ----- |
| **expo-router**          | `~6.0.14`          | `~6.0.14`        | ✅    |
| **expo-web-browser**     | `~15.0.9`          | `~15.0.9`        | ✅    |
| **expo-av**              | `~16.0.7`          | `~16.0.7`        | ✅    |
| **expo-image**           | `~3.0.10`          | `~3.0.10`        | ✅    |
| **expo-linear-gradient** | `^15.0.7`          | `^15.0.7`        | ✅    |

---

## 2. NativeWind & Tailwind CSS

### 2.1 Versions Compatibles

| Package         | Version Compatible | Version Actuelle | Notes                                     |
| --------------- | ------------------ | ---------------- | ----------------------------------------- |
| **nativewind**  | `^2.0.11`          | `^2.0.11`        | ✅                                        |
| **tailwindcss** | `^3.3.2`           | `^3.3.2`         | ⚠️ Ne pas utiliser Tailwind CSS v4        |
| **postcss**     | N/A                | N/A              | Non utilisé (config synchrone uniquement) |

### 2.2 Configuration PostCSS

NativeWind v2 utilise PostCSS en interne, mais Metro ne doit pas traiter les fichiers CSS.

**Règles importantes :**

- ✅ `postcss.config.js` doit être synchrone (pas de plugins async)
- ✅ Metro doit exclure les fichiers CSS (`metro.config.js`)
- ❌ Ne pas utiliser `autoprefixer` dans PostCSS (React Native n'en a pas besoin)

---

## 3. Storybook

### 3.1 Versions Compatibles

| Package                              | Version Compatible | Version Actuelle | Notes                              |
| ------------------------------------ | ------------------ | ---------------- | ---------------------------------- |
| **storybook**                        | `^9.1.13`          | `^9.1.13`        | ✅                                 |
| **@storybook/react-native-web-vite** | `^9.1.13`          | `^9.1.13`        | ✅                                 |
| **@storybook/react-native**          | `^9.1.4`           | `^9.1.4`         | ✅                                 |
| **@storybook/addon-docs**            | `^9.1.13`          | `^9.1.13`        | ✅                                 |
| **@storybook/addon-storyshots**      | N/A                | N/A              | ⚠️ Supprimé (non disponible en v9) |
| **@storybook/test**                  | N/A                | N/A              | ⚠️ Supprimé (non disponible en v9) |

### 3.2 Packages à Ne Pas Utiliser

- ❌ `@storybook/react-webpack5` - Non utilisé (on utilise `@storybook/react-native-web-vite`)
- ❌ `@storybook/addon-storyshots` - Non disponible en version 9.x (peut être réintégré dans
  Storybook 10.x)
- ❌ `@storybook/test` - Non disponible en version 9.x (peut être réintégré dans Storybook 10.x)
- ❌ Versions Storybook < 9.x - Incompatibles avec les addons v9

---

## 4. React Native Reanimated

### 4.1 Versions Compatibles

| Package                     | Version Compatible | Version Actuelle | Notes                     |
| --------------------------- | ------------------ | ---------------- | ------------------------- |
| **react-native-reanimated** | `^4.1.3`           | `^4.1.3`         | ✅                        |
| **react-native-worklets**   | `0.5.1`            | `0.5.2`          | ⚠️ Version attendue 0.5.1 |

### 4.2 Storybook & Reanimated

**Important :** Storybook web nécessite un mock pour `react-native-reanimated` car les worklets
(JSI) ne fonctionnent pas dans le contexte web.

**Fichier :** `.storybook/mocks/react-native-reanimated.ts`

---

## 5. Règles de Mise à Jour

### 5.1 Avant de Mettre à Jour

1. ✅ Vérifier la compatibilité avec Expo SDK 54
2. ✅ Vérifier la compatibilité avec NativeWind v2
3. ✅ Vérifier la compatibilité avec Storybook 9.x
4. ✅ Lire les changelogs pour les breaking changes

### 5.2 Commandes de Vérification

```bash
# Vérifier les versions Expo
npx expo install --check

# Vérifier les versions compatibles
npm run check-compatibility
```

### 5.3 Packages Critiques

**Ne jamais mettre à jour sans vérification :**

- `react` / `react-dom` (doivent être compatibles avec Expo SDK)
- `react-native` (doit être compatible avec Expo SDK)
- `nativewind` (doit être compatible avec Tailwind CSS)
- `storybook` (tous les addons doivent être en même version)

---

## 6. Problèmes Connus et Solutions

### 6.1 Erreur PostCSS "Use process(css).then(cb) to work with async plugins"

**Cause :** Metro essaie de traiter PostCSS avec des plugins asynchrones.

**Solution :**

1. Vérifier que `postcss.config.js` est synchrone
2. Vérifier que Metro exclut les fichiers CSS
3. Nettoyer le cache Metro : `npx expo start --clear`

### 6.2 Incompatibilité Storybook v7/v8 avec Storybook v9

**Cause :** Addons Storybook en version inférieure à v9.

**Solution :**

1. Mettre à jour tous les addons Storybook en v9.x
2. Supprimer les packages inutilisés (`@storybook/react-webpack5`)

### 6.3 React 19.2.0 vs Expo SDK 54

**Cause :** Expo SDK 54 attend React 19.1.0.

**Solution :**

1. Downgrader React et React-DOM à 19.1.0
2. Downgrader @types/react à ~19.1.10

---

## 7. Checklist de Compatibilité

### 7.1 Avant Chaque Build

- [ ] Toutes les versions sont compatibles avec Expo SDK 54
- [ ] NativeWind v2 et Tailwind CSS 3.3.2 sont installés
- [ ] Tous les addons Storybook sont en version 9.x
- [ ] React et React-DOM sont en version 19.1.0
- [ ] PostCSS config est synchrone
- [ ] Metro exclut les fichiers CSS

### 7.2 Avant Chaque Mise à Jour

- [ ] Lire les changelogs
- [ ] Vérifier la compatibilité avec Expo SDK
- [ ] Tester localement avant de commiter
- [ ] Documenter les changements dans ce fichier

---

## 8. Script de Vérification

Un script `scripts/check-compatibility.js` est disponible pour vérifier automatiquement les versions
compatibles.

**Utilisation :**

```bash
npm run check-compatibility
```

---

## 9. Changelog

### 2025-01-22 - Stabilisation des Versions

- ✅ React downgrade de 19.2.0 à 19.1.0 (compatible Expo SDK 54)
- ✅ React-DOM downgrade de 19.2.0 à 19.1.0
- ✅ @types/react downgrade de 19.2.2 à ~19.1.10
- ✅ expo-router mis à jour de ~6.0.13 à ~6.0.14
- ✅ expo-web-browser mis à jour de ~15.0.8 à ~15.0.9
- ✅ @storybook/addon-storyshots mis à jour de v7.6.20 à v9.1.13
- ✅ @storybook/test mis à jour de v8.6.14 à v9.1.13
- ✅ @storybook/react-webpack5 supprimé (non utilisé)
- ✅ postcss.config.js créé (config synchrone)
- ✅ App.tsx restauré avec option Storybook via variable d'environnement

---

## 10. Références

- [Expo SDK 54 Documentation](https://docs.expo.dev/)
- [NativeWind v2 Documentation](https://www.nativewind.dev/)
- [Storybook 9.x Documentation](https://storybook.js.org/)
- [React Native Reanimated Documentation](https://docs.swmansion.com/react-native-reanimated/)

---

**Note :** Ce document doit être mis à jour à chaque changement de version critique.
