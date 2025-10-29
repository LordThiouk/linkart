# 🧪 Guide de Tests Linkart

> Guide rapide pour démarrer avec les tests de Linkart

---

## 🚀 Démarrage Rapide

### Développement avec Storybook

```bash
# 1. Lancer Storybook (interface interactive)
npm run storybook

# Ouvrir <http://localhost:6006>
# - Naviguer entre les composants
# - Vérifier l'onglet "Interactions" pour les play functions
# - Vérifier l'onglet "Accessibility" pour les violations A11y
```

### Tests Automatiques

```bash
# Tests visuels et A11y (Storybook doit être actif)
npm run test:storybook

# Tests unitaires Jest
npm run test

# Tests avec configuration simplifiée
npm run test:simple

# Couverture de code
npm run test:coverage
```

---

## 📚 Documentation Complète

### Guides Principaux

1. **[Testing Overview](./internal/testing-overview.md)**
   - Vue d'ensemble de la stratégie de tests
   - Workflow par rôle (dev, reviewer, QA)
   - Commandes par cas d'usage

2. **[Storybook Testing Guide](./internal/storybook-testing-guide.md)**
   - Tests d'interaction (play functions)
   - Bonnes pratiques
   - Migration depuis Jest

3. **[Visual Regression Testing](./internal/visual-regression-testing.md)**
   - Tests visuels avec Test Runner
   - Tests d'accessibilité (A11y)
   - Debugging et troubleshooting

---

## 🎯 Tests par Type

### Tests d'Interaction (Play Functions)

**Quoi :** Tester les interactions utilisateur dans Storybook

**Quand :** Pour tous les composants interactifs

**Exemple :**

```typescript
export const Interactive: Story = {
  args: {
    onPress: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    expect(args.onPress).toHaveBeenCalled();
  },
};
```

**État actuel :** 22% (2/9 composants Phase 4)

### Tests d'Accessibilité (A11y)

**Quoi :** Vérifier la conformité WCAG 2.1 AA

**Quand :** Automatique pour toutes les stories

**Comment :**

1. Ouvrir Storybook
2. Sélectionner un composant
3. Cliquer sur l'onglet "Accessibility"
4. Corriger les violations listées

**État actuel :** ✅ Configuré pour tous les composants

### Tests Visuels (Test Runner)

**Quoi :** Détecter les régressions visuelles

**Quand :** Avant chaque commit

**Commande :**

```bash
# Terminal 1
npm run storybook

# Terminal 2
npm run test:storybook
```

**État actuel :** ✅ Configuré et fonctionnel

### Tests Unitaires (Jest)

**Quoi :** Tester la logique métier et les hooks

**Quand :** Pour toute logique complexe

**Commande :**

```bash
npm run test           # Tous les tests
npm run test:watch     # Mode watch
npm run test:simple    # Config simplifiée
```

**État actuel :** ~60% de couverture

---

## ✅ Checklist Avant Commit

```bash
# 1. Vérifier visuellement dans Storybook
npm run storybook

# 2. Vérifier l'accessibilité (onglet A11y)

# 3. Lancer les tests automatiques
npm run test:storybook   # Tests visuels
npm run test             # Tests unitaires

# 4. Vérifier la qualité du code
npm run lint             # Linting
npm run type-check       # TypeScript

# 5. Commit
git add .
git commit -m "feat: ..."
```

---

## 🔧 Troubleshooting

### Problème : "Storybook tests échouent"

**Solution :**

```bash
# Vérifier que Storybook est actif
npm run storybook

# Dans un nouveau terminal
npm run test:storybook
```

### Problème : "Play functions échouent"

**Cause :** Élément non trouvé ou timing

**Solution :**

```typescript
// Utiliser des sélecteurs plus robustes
const button = canvas.getByTestId('my-button'); // ✅ Bon
const button = canvas.getByText('Click me'); // ⚠️ Fragile

// Ajouter des attentes
await page.waitForTimeout(500);
```

### Problème : "Violations A11y"

**Solution :**

1. Ouvrir Storybook (`http://localhost:6006`)
2. Naviguer vers le composant concerné
3. Ouvrir l'onglet "Accessibility"
4. Corriger les violations listées

**Violations courantes :**

- **Contraste insuffisant** : Augmenter le contraste des couleurs
- **Labels manquants** : Ajouter `accessibilityLabel` sur les boutons
- **Rôles incorrects** : Ajouter `accessibilityRole="button"`

---

## 📊 Métriques Actuelles

| Type de Test        | Couverture | Objectif |
| ------------------- | ---------- | -------- |
| Tests d'interaction | 22%        | 100%     |
| Tests A11y          | 100%       | 100%     |
| Tests visuels       | 100%       | 100%     |
| Tests unitaires     | 60%        | 80%      |

---

## 🎓 Pour Aller Plus Loin

### Documentation Interne

- [Testing Overview](./docs/internal/testing-overview.md) - Vue d'ensemble complète
- [Storybook Testing Guide](./docs/internal/storybook-testing-guide.md) - Tests d'interaction
- [Visual Regression Testing](./docs/internal/visual-regression-testing.md) - Tests visuels

### Documentation Officielle

- [Storybook Docs](https://storybook.js.org/docs)
- [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)
- [Jest](https://jestjs.io/docs/getting-started)
- [Playwright](https://playwright.dev/docs/intro)
- [axe-core](https://github.com/dequelabs/axe-core)

---

## 🚀 Prochaines Étapes

### Court Terme

- [ ] Compléter les play functions (78% restant)
- [ ] Corriger toutes les violations A11y critiques
- [ ] Augmenter la couverture Jest à 70%

### Moyen Terme

- [ ] Tests E2E avec Playwright
- [ ] Tests de performance (Lighthouse CI)
- [ ] Visual regression snapshots (Chromatic)

### Long Terme

- [ ] Tests d'intégration backend
- [ ] Tests de charge (k6)
- [ ] Dashboard de métriques de tests

---

## 💡 Conseils

### Pour Développeurs

- **Développez avec Storybook ouvert** : Itération rapide + tests visuels immédiats
- **Ajoutez des play functions** : Tests automatiques gratuits pour vos interactions
- **Vérifiez A11y régulièrement** : Plus facile de corriger au fur et à mesure

### Pour Reviewers

- **Testez visuellement** : Ouvrir Storybook et vérifier chaque composant modifié
- **Vérifiez les violations A11y** : Onglet "Accessibility" dans Storybook
- **Lancez les tests** : `npm run test:storybook` avant d'approuver

### Pour QA

- **Explorez Storybook** : Toutes les stories sont des cas de test
- **Testez les interactions** : Onglet "Interactions" pour voir les play functions
- **Rapportez les violations A11y** : Onglet "Accessibility" pour la liste complète

---

**Questions ?** Consulter [Testing Overview](./internal/testing-overview.md) pour plus de détails.
