# Linkart — Guide de Tests avec Storybook

> Version: v1.0 Auteur : Papa Diop Dernière mise à jour: 2025-10-29 Objectif : Guide complet pour
> tester les composants React Native avec Storybook

---

## 1. Vue d'ensemble

Linkart utilise **Storybook** comme outil principal pour le développement et les tests des
composants UI. Cette approche moderne remplace les tests unitaires traditionnels avec Jest/React
Native Testing Library pour les composants visuels.

### 1.1 Pourquoi Storybook pour les Tests ?

**Avantages :**

- ✅ **Tests visuels interactifs** - Voir les composants en action
- ✅ **Documentation vivante** - Les stories servent aussi de documentation
- ✅ **Pas de conflits Babel** - Fonctionne nativement avec React Native Web
- ✅ **Débogage facile** - Tests dans le navigateur avec DevTools
- ✅ **Tests d'accessibilité automatiques** - Via addon a11y
- ✅ **Tests de régression visuelle** - Détection automatique des changements

**Inconvénients :**

- ❌ StoryShots est obsolète et cause des conflits Babel
- ❌ Nécessite Storybook en cours d'exécution pour les tests

---

## 2. Types de Tests Disponibles

### 2.1 Play Functions (Tests d'Interaction) ⭐ RECOMMANDÉ

Les **play functions** permettent de tester les interactions utilisateur directement dans Storybook.

**Installation :**

```bash
npm install --save-dev @storybook/addon-interactions @storybook/test
```

**Configuration `.storybook/main.ts` :**

```typescript
addons: ['@storybook/addon-docs', '@storybook/addon-interactions'];
```

**Exemple - HeroBanner :**

```typescript
import { expect, fn, userEvent, within } from '@storybook/test';

export const Default: Story = {
  args: {
    id: '1',
    title: 'Dark Trap Beat',
    artist: 'Producer Name',
    onPress: fn(),
    onPlay: fn(),
    onBuy: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test 1: Vérifier que le titre s'affiche
    expect(canvas.getByText('Dark Trap Beat')).toBeTruthy();

    // Test 2: Click sur le banner
    const banner = canvas.getByTestId('hero-banner');
    await userEvent.click(banner);
    expect(args.onPress).toHaveBeenCalledWith('1');
  },
};
```

**Avantages :**

- Tests exécutés dans le navigateur
- Débogage avec Chrome DevTools
- Pas de configuration Babel complexe
- Tests visibles dans l'interface Storybook

### 2.2 Tests d'Accessibilité (A11y)

L'addon **a11y** vérifie automatiquement l'accessibilité de tous les composants.

**Installation :**

```bash
npm install --save-dev @storybook/addon-a11y
```

**Configuration `.storybook/main.ts` :**

```typescript
addons: ['@storybook/addon-docs', '@storybook/addon-a11y'];
```

**Utilisation :**

- Ouvrir Storybook
- Sélectionner un composant
- Cliquer sur l'onglet "Accessibility"
- Voir les violations automatiquement détectées

**Violations courantes détectées :**

- Contraste de couleur insuffisant
- Labels manquants pour les boutons
- Rôles ARIA incorrects
- Navigation au clavier impossible

### 2.3 Visual Regression Tests (Futur)

**Installation :**

```bash
npm install --save-dev @storybook/test-runner playwright
```

**Configuration `package.json` :**

```json
{
  "scripts": {
    "test:storybook": "test-storybook"
  }
}
```

**Utilisation :**

```bash
# Terminal 1
npm run storybook

# Terminal 2
npm run test:storybook
```

---

## 3. Guide d'Implémentation

### 3.1 Structure des Tests

Chaque composant doit avoir :

1. **Stories de base** - Démonstration visuelle
2. **Play functions** - Tests d'interaction
3. **Tests A11y** - Vérification automatique

**Structure recommandée :**

```
src/
  components/
    atoms/
      HeartIcon.tsx
      HeartIcon.stories.tsx (avec play functions)
    molecules/
      ServiceCard.tsx
      ServiceCard.stories.tsx (avec play functions)
    organisms/
      HeroBanner.tsx
      HeroBanner.stories.tsx (avec play functions)
```

### 3.2 Bonnes Pratiques

**1. Utiliser `fn()` pour les callbacks :**

```typescript
export const Default: Story = {
  args: {
    onPress: fn(), // ✅ Bon
    onPlay: fn(),
  },
};

// ❌ Éviter
export const Default: Story = {
  args: {
    onPress: () => console.log('Pressed'), // Pas testable
  },
};
```

**2. Tester les cas limites :**

```typescript
export const WithoutBuyButton: Story = {
  args: {
    onPress: fn(),
    onPlay: fn(),
    // Pas de onBuy - test du cas sans bouton
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buyButtons = canvas.queryAllByText(/Acheter/i);
    expect(buyButtons.length).toBe(0);
  },
};
```

**3. Utiliser `testID` pour les éléments clés :**

```typescript
// Composant
<TouchableOpacity testID="hero-banner" onPress={onPress}>
  {children}
</TouchableOpacity>

// Test
const banner = canvas.getByTestId('hero-banner');
await userEvent.click(banner);
```

**4. Tester les états multiples :**

```typescript
export const AllStates: Story = {
  args: {
    isPlaying: true,
    isFavorite: false,
    isLoading: false,
  },
  play: async ({ args }) => {
    expect(args.isPlaying).toBe(true);
    expect(args.isFavorite).toBe(false);
  },
};
```

### 3.3 Tests d'Interaction Courants

**Toggle Favorite (HeartIcon) :**

```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const heartButton = canvas.getByRole('button');
  await userEvent.click(heartButton);
  expect(heartButton).toBeTruthy();
},
```

**Click sur Card :**

```typescript
play: async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  const card = canvas.getByTestId('product-card');
  await userEvent.click(card);
  expect(args.onPress).toHaveBeenCalledWith('123');
},
```

**Validation de Formulaire :**

```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Remplir le formulaire
  const titleInput = canvas.getByPlaceholderText('Titre du beat');
  await userEvent.type(titleInput, 'My Beat');

  // Soumettre
  const submitButton = canvas.getByText('Publier');
  await userEvent.click(submitButton);
},
```

---

## 4. Configuration du Projet

### 4.1 `.storybook/main.ts`

```typescript
import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
};

export default config;
```

### 4.2 Scripts `package.json`

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test:storybook": "test-storybook"
  }
}
```

---

## 5. Workflow de Développement

### 5.1 Développement d'un Nouveau Composant

1. **Créer le composant** : `src/components/atoms/NewComponent.tsx`
2. **Créer les stories** : `src/components/atoms/NewComponent.stories.tsx`
3. **Ajouter play functions** pour tester les interactions
4. **Vérifier A11y** dans l'addon Storybook
5. **Tester visuellement** dans différents états

### 5.2 Modification d'un Composant Existant

1. **Ouvrir Storybook** : `npm run storybook`
2. **Modifier le composant**
3. **Vérifier toutes les stories** pour détecter les régressions
4. **Mettre à jour les play functions** si nécessaire
5. **Vérifier A11y** pour les nouvelles violations

### 5.3 Revue de Code

**Checklist PR :**

- [ ] Toutes les stories s'affichent correctement
- [ ] Play functions passent sans erreur
- [ ] Pas de violations A11y critiques
- [ ] Documentation mise à jour
- [ ] Stories créées pour les nouveaux états

---

## 6. Debugging

### 6.1 Play Functions qui Échouent

**Erreur : Element not found**

```typescript
// ❌ Problème
const button = canvas.getByText('Acheter');

// ✅ Solution : Utiliser regex pour être plus flexible
const button = canvas.getByText(/Acheter/i);

// ✅ Ou utiliser testID
const button = canvas.getByTestID('buy-button');
```

**Erreur : Click doesn't trigger callback**

```typescript
// ❌ Problème
const onPress = () => console.log('Pressed');

// ✅ Solution : Utiliser fn()
const onPress = fn();
```

### 6.2 Violations A11y Communes

**Contraste insuffisant :**

```typescript
// ❌ Problème
const textStyle = { color: '#999', backgroundColor: '#fff' }; // Ratio 2.85:1

// ✅ Solution : Améliorer le contraste
const textStyle = { color: '#666', backgroundColor: '#fff' }; // Ratio 5.74:1
```

**Labels manquants :**

```typescript
// ❌ Problème
<TouchableOpacity onPress={onPress}>
  <Icon name="heart" />
</TouchableOpacity>

// ✅ Solution : Ajouter accessibilityLabel
<TouchableOpacity
  onPress={onPress}
  accessibilityLabel="Ajouter aux favoris"
  accessibilityRole="button"
>
  <Icon name="heart" />
</TouchableOpacity>
```

---

## 7. Migration depuis Jest

### 7.1 Tests Unitaires → Play Functions

**Avant (Jest) :**

```typescript
import { render, fireEvent } from '@testing-library/react-native';

test('calls onPress when clicked', () => {
  const onPress = jest.fn();
  const { getByTestId } = render(<Button onPress={onPress} />);

  fireEvent.press(getByTestId('button'));
  expect(onPress).toHaveBeenCalled();
});
```

**Après (Storybook) :**

```typescript
export const Interactive: Story = {
  args: {
    onPress: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('button');

    await userEvent.click(button);
    expect(args.onPress).toHaveBeenCalled();
  },
};
```

### 7.2 Avantages de la Migration

- ✅ Pas de configuration Babel complexe
- ✅ Tests visuels en plus des tests unitaires
- ✅ Documentation automatique
- ✅ Débogage facile dans le navigateur
- ✅ Tests A11y inclus

---

## 8. Composants Phase 4 Testés

### 8.1 Liste des Composants avec Play Functions

**Atoms :**

- ✅ `HeartIcon` - Toggle favorite avec animation
- ✅ `PlayButton` - Play/Pause avec états
- ⏳ `MetricItem` - À implémenter

**Molecules :**

- ⏳ `ServiceCard` - À implémenter
- ⏳ `PlaylistCard` - À implémenter
- ⏳ `ProductCard` - À implémenter

**Organisms :**

- ✅ `HeroBanner` - Tests complets avec tous les boutons
- ⏳ `FilterPills` - À implémenter

**Features :**

- ⏳ `ProductUploadForm` - À implémenter
- ⏳ `ServiceUploadForm` - À implémenter

### 8.2 Couverture de Tests

**Objectif :** 100% des composants Phase 4 avec play functions

**État actuel :**

- Tests d'interaction : 20% (2/10 composants)
- Tests A11y : 100% (automatique pour tous)
- Visual regression : 0% (à implémenter)

---

## 9. Ressources

### 9.1 Documentation Officielle

- [Storybook Docs](https://storybook.js.org/docs)
- [Addon Interactions](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Addon A11y](https://storybook.js.org/addons/@storybook/addon-a11y)
- [Test Runner](https://storybook.js.org/docs/writing-tests/test-runner)

### 9.2 Exemples de Code

- `src/components/organisms/HeroBanner.stories.tsx` - Exemple complet
- `src/components/atoms/HeartIcon.stories.tsx` - Exemple simple

---

## 10. Changelog

- **v1.0** (2025-10-29) - Guide initial avec play functions et A11y
- **v1.0** (2025-10-29) - Suppression de StoryShots (obsolète)
- **v1.0** (2025-10-29) - Configuration addons interactions et a11y
- **v1.0** (2025-10-29) - Exemples HeroBanner et HeartIcon
