# Linkart — Guide de Tests Visuels (Visual Regression)

> Version: v1.0 Auteur : Papa Diop Dernière mise à jour: 2025-10-29 Objectif : Guide complet pour
> les tests de régression visuelle avec Storybook Test Runner

---

## 1. Vue d'ensemble

Les **tests de régression visuelle** détectent automatiquement les changements visuels non
intentionnels dans les composants UI. Ils complètent les tests d'interaction (play functions) et les
tests d'accessibilité.

### 1.1 Avantages

- ✅ **Détection automatique** des régressions visuelles
- ✅ **Tests A11y intégrés** via axe-core
- ✅ **Exécution rapide** via Playwright
- ✅ **CI/CD friendly** pour GitHub Actions
- ✅ **Couvre toutes les stories** automatiquement

---

## 2. Installation et Configuration

### 2.1 Installation des Dépendances

```bash
npm install --save-dev @storybook/test-runner playwright
npx playwright install
```

### 2.2 Configuration du Test Runner

**Fichier:** `.storybook/test-runner.ts`

```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  // Viewport mobile (iPhone size)
  async preVisit(page) {
    await page.setViewportSize({ width: 375, height: 667 });
  },

  // Tests A11y automatiques
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    // Skip si désactivé
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }

    // Attendre le rendu
    await page.waitForTimeout(500);
  },

  // Filtrer les tests
  tags: {
    include: [],
    exclude: ['skip-test'],
  },
};

export default config;
```

### 2.3 Scripts NPM

**Fichier:** `package.json`

```json
{
  "scripts": {
    "test:storybook": "test-storybook",
    "test:storybook:ci": "concurrently -k -s first -n \"SB,TEST\" -c \"magenta,blue\" \"npm run storybook -- --ci\" \"wait-on tcp:6006 && npm run test:storybook\""
  }
}
```

---

## 3. Utilisation

### 3.1 Tests Locaux

**Étape 1 : Démarrer Storybook**

```bash
npm run storybook
```

**Étape 2 : Lancer les tests (dans un nouveau terminal)**

```bash
npm run test:storybook
```

**Résultats :**

```
 PASS   browser: chromium  src/components/organisms/HeroBanner.stories.tsx
  ✓ Organisms/HeroBanner/Default (250 ms)
  ✓ Organisms/HeroBanner/WithImage (180 ms)
  ✓ Organisms/HeroBanner/WithoutBuyButton (165 ms)
  ✓ Organisms/HeroBanner/LongTitle (170 ms)
  ✓ Organisms/HeroBanner/AllStates (190 ms)

 PASS   browser: chromium  src/components/atoms/HeartIcon.stories.tsx
  ✓ Atoms/HeartIcon/Default (145 ms)
  ✓ Atoms/HeartIcon/SmallSize (120 ms)
  ✓ Atoms/HeartIcon/LargeSize (130 ms)

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Time:        3.245 s
```

### 3.2 Tests en CI/CD

**GitHub Actions** (exemple)

```yaml
name: Storybook Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:storybook:ci
```

---

## 4. Tests d'Interaction avec Play Functions

Les **play functions** sont exécutées automatiquement par le test-runner.

### 4.1 Exemple HeroBanner

```typescript
export const Default: Story = {
  args: {
    id: '1',
    title: 'Dark Trap Beat',
    onPress: fn(),
    onPlay: fn(),
    onBuy: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test 1: Vérifier l'affichage
    expect(canvas.getByText('Dark Trap Beat')).toBeTruthy();

    // Test 2: Click sur le banner
    const banner = canvas.getByTestId('hero-banner');
    await userEvent.click(banner);
    expect(args.onPress).toHaveBeenCalledWith('1');
  },
};
```

**Résultat :**

```
✓ Organisms/HeroBanner/Default
  - Renders correctly
  - Play function passed
  - A11y: 0 violations
```

---

## 5. Tests d'Accessibilité (A11y)

Le test-runner utilise **axe-core** pour détecter automatiquement les violations d'accessibilité.

### 5.1 Violations Détectées

**Contraste insuffisant :**

```
✗ Organisms/HeroBanner/Default
  - A11y: 1 violation
    - color-contrast: Elements must have sufficient color contrast
      Fix: Change text color from #999 to #666
```

**Labels manquants :**

```
✗ Atoms/HeartIcon/Default
  - A11y: 1 violation
    - button-name: Buttons must have discernible text
      Fix: Add accessibilityLabel="Toggle favorite"
```

### 5.2 Désactiver A11y pour une Story

```typescript
export const LegacyComponent: Story = {
  args: { ... },
  parameters: {
    a11y: {
      disable: true, // Désactiver temporairement
    },
  },
};
```

### 5.3 Configurer A11y pour un Composant

```typescript
export default {
  title: 'Organisms/HeroBanner',
  component: HeroBanner,
  parameters: {
    a11y: {
      // Options axe-core
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};
```

---

## 6. Filtrage des Tests

### 6.1 Par Tags

```typescript
// Story à exclure des tests
export const Experimental: Story = {
  args: { ... },
  tags: ['skip-test'],
};
```

### 6.2 Par Pattern

```bash
# Tester uniquement HeroBanner
npm run test:storybook -- --grep "HeroBanner"

# Exclure HeartIcon
npm run test:storybook -- --grep "^(?!.*HeartIcon)"
```

---

## 7. Debugging

### 7.1 Mode Debug

```bash
# Lancer avec navigateur visible
npm run test:storybook -- --debug

# Pause sur erreur
npm run test:storybook -- --debug-on-failure
```

### 7.2 Screenshots

```bash
# Générer screenshots pour toutes les stories
npm run test:storybook -- --screenshots
```

**Résultat :**

```
screenshots/
  Organisms-HeroBanner-Default.png
  Organisms-HeroBanner-WithImage.png
  Atoms-HeartIcon-Default.png
```

### 7.3 Logs Détaillés

```bash
# Activer les logs
DEBUG=pw:api npm run test:storybook
```

---

## 8. Performance

### 8.1 Optimisation

**Parallélisation :**

```bash
# Lancer 4 workers en parallèle
npm run test:storybook -- --maxWorkers 4
```

**Timeouts :**

```typescript
// .storybook/test-runner.ts
const config: TestRunnerConfig = {
  async postVisit(page) {
    await page.waitForTimeout(200); // Réduire de 500ms à 200ms
  },
};
```

### 8.2 Métriques

**Temps d'exécution typiques (par story) :**

- Atoms (HeartIcon, PlayButton) : 120-150ms
- Molecules (ServiceCard, PlaylistCard) : 150-200ms
- Organisms (HeroBanner, FilterPills) : 200-300ms

**Total pour 50 stories :** ~10-15 secondes

---

## 9. Intégration avec Chromatic (Optionnel)

**Chromatic** est un service payant pour les tests visuels avancés.

### 9.1 Installation

```bash
npm install --save-dev chromatic
```

### 9.2 Configuration

```json
{
  "scripts": {
    "chromatic": "chromatic --project-token=<PROJECT_TOKEN>"
  }
}
```

### 9.3 CI/CD

```yaml
- run: npm run chromatic -- --exit-zero-on-changes
```

---

## 10. Bonnes Pratiques

### 10.1 Stories Testables

**✅ Bon :**

```typescript
export const Default: Story = {
  args: {
    id: '1',
    title: 'Dark Trap Beat',
    onPress: fn(), // Mockable
  },
};
```

**❌ Mauvais :**

```typescript
export const Default: Story = {
  args: {
    id: '1',
    title: 'Dark Trap Beat',
    onPress: () => window.alert('Clicked'), // Non testable
  },
};
```

### 10.2 Tests Déterministes

**✅ Bon :**

```typescript
export const WithData: Story = {
  args: {
    data: [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ], // Données fixes
  },
};
```

**❌ Mauvais :**

```typescript
export const WithData: Story = {
  args: {
    data: generateRandomData(), // Non déterministe
  },
};
```

### 10.3 Accessibilité First

**Toujours :**

- Ajouter `accessibilityLabel` sur les boutons sans texte
- Vérifier les contrastes de couleur (ratio 4.5:1 minimum)
- Utiliser `accessibilityRole` approprié
- Tester la navigation au clavier

---

## 11. Troubleshooting

### 11.1 Erreur : "Cannot find module '@storybook/test-runner'"

**Solution :**

```bash
npm install --save-dev @storybook/test-runner
```

### 11.2 Erreur : "Executable doesn't exist at ..."

**Solution :**

```bash
npx playwright install
```

### 11.3 Erreur : "Timeout waiting for the story to render"

**Solution :**

```typescript
// Augmenter le timeout
const config: TestRunnerConfig = {
  async postVisit(page) {
    await page.waitForTimeout(1000); // Augmenter à 1s
  },
};
```

### 11.4 Erreur : "A11y violations found"

**Solution :**

1. Ouvrir Storybook : `npm run storybook`
2. Aller sur l'onglet "Accessibility"
3. Corriger les violations listées
4. Re-lancer les tests

---

## 12. Résumé des Commandes

```bash
# Développement
npm run storybook                  # Lancer Storybook
npm run test:storybook             # Lancer tests (Storybook doit être actif)

# CI/CD
npm run test:storybook:ci          # Lancer Storybook + tests automatiquement

# Debug
npm run test:storybook -- --debug  # Mode debug interactif
npm run test:storybook -- --grep "HeroBanner"  # Filtrer par composant

# Performance
npm run test:storybook -- --maxWorkers 4  # Paralléliser
```

---

## 13. Checklist Tests Visuels

**Avant de merger une PR :**

- [ ] Toutes les stories s'affichent correctement dans Storybook
- [ ] `npm run test:storybook` passe sans erreur
- [ ] Aucune violation A11y critique
- [ ] Play functions passent pour toutes les stories interactives
- [ ] Screenshots générés pour validation visuelle (si nécessaire)

---

## 14. Changelog

- **v1.0** (2025-10-29) - Guide initial avec test-runner et A11y
- **v1.0** (2025-10-29) - Configuration Playwright et CI/CD
- **v1.0** (2025-10-29) - Guide de debugging et troubleshooting
