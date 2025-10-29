# 🧪 Guide de Tests Linkart

> Guide de démarrage rapide pour les tests

---

## 📚 Documentation Complète

La documentation complète des tests est maintenant organisée dans `docs/` :

### 🚀 Démarrage Rapide

**[docs/TESTING.md](./docs/TESTING.md)** - Guide rapide pour démarrer avec les tests

- Commandes essentielles
- Tests d'interaction avec Storybook
- Tests d'accessibilité
- Troubleshooting

### 📖 Guides Détaillés

1. **[Testing Overview](./docs/internal/testing-overview.md)** - Vue d'ensemble de la stratégie
   - Architecture de tests
   - Workflow par rôle
   - Métriques et objectifs

2. **[Storybook Testing Guide](./docs/internal/storybook-testing-guide.md)** - Tests d'interaction
   - Play functions
   - Bonnes pratiques
   - Exemples de code

3. **[Visual Regression Testing](./docs/internal/visual-regression-testing.md)** - Tests visuels
   - Configuration Test Runner
   - Tests A11y automatiques
   - Debugging

### 📋 Récapitulatifs

- **[STORYBOOK_IMPLEMENTATION_SUMMARY.md](./docs/STORYBOOK_IMPLEMENTATION_SUMMARY.md)** -
  Implémentation complète
- **[FINAL_STATUS.md](./docs/FINAL_STATUS.md)** - Statut final et troubleshooting

---

## ⚡ Commandes Rapides

```bash
# Développement
npm run storybook              # Interface Storybook

# Tests
npm run test                   # Tests unitaires Jest
npm run test:storybook         # Tests visuels (Storybook doit être actif)
npm run test:storybook:ci      # Tests visuels en CI

# Qualité
npm run lint                   # Linting
npm run type-check             # TypeScript
```

---

## 🎯 Prochaines Actions

1. **Lire** [docs/TESTING.md](./docs/TESTING.md) pour démarrer
2. **Lancer** `npm run storybook` pour explorer les composants
3. **Vérifier** l'onglet "Accessibility" dans Storybook
4. **Tester** avec `npm run test:storybook`

---

**Pour plus de détails, consulter la documentation complète dans [docs/](./docs/)**
