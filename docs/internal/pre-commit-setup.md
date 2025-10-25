# Pre-commit Setup - Linkart

> Version: v1.0 Auteur : Papa Diop Objet : Documentation du système de pre-commit checks pour
> Linkart

---

## 1. Vue d'ensemble

Le système de pre-commit checks de Linkart garantit la qualité du code avant chaque commit et push
vers GitHub. Il utilise **Husky** pour les hooks Git et **lint-staged** pour optimiser les
performances.

---

## 2. Composants du système

### 2.1 Hooks Git configurés

| Hook         | Script                               | Description                         |
| ------------ | ------------------------------------ | ----------------------------------- |
| `pre-commit` | `scripts/pre-commit-checks.js`       | Vérifications rapides + lint-staged |
| `pre-push`   | `scripts/pre-push-checks.js`         | Vérifications complètes             |
| `commit-msg` | `scripts/validate-commit-message.js` | Validation format message           |

### 2.2 Scripts de validation

#### Pre-commit checks (rapides)

- ✅ ESLint
- ✅ Prettier
- ✅ TypeScript compilation
- ✅ Types Supabase
- ✅ Structure documentation
- ✅ Détection secrets
- ✅ Markdown linting

#### Pre-push checks (complets)

- ✅ Tests avec couverture
- ✅ Audit sécurité
- ✅ Connexion Supabase
- ✅ Statut Git
- ✅ Documentation

---

## 3. Configuration

### 3.1 Fichiers de configuration

```
.husky/
├── pre-commit          # Hook pre-commit
├── pre-push           # Hook pre-push
└── commit-msg         # Hook validation message

.lintstagedrc.js       # Configuration lint-staged
commitlint.config.js   # Configuration commitlint
```

### 3.2 Scripts package.json

```json
{
  "pre-commit": "node scripts/pre-commit-checks.js",
  "pre-push": "node scripts/pre-push-checks.js",
  "validate-commit": "node scripts/validate-commit-message.js",
  "security:audit": "npm audit --audit-level moderate"
}
```

---

## 4. Format des messages de commit

### 4.1 Convention

```
type(scope): description

[body optionnel]

[footer optionnel]
```

### 4.2 Types autorisés

- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage
- `refactor` : Refactoring
- `test` : Tests
- `chore` : Maintenance
- `ci` : CI/CD
- `build` : Build
- `perf` : Performance
- `revert` : Annulation

### 4.3 Scopes autorisés

- `auth` : Authentification
- `api` : API/Backend
- `ui` : Interface utilisateur
- `mobile` : Application mobile
- `db` : Base de données
- `docs` : Documentation
- `security` : Sécurité
- `payment` : Paiements
- `upload` : Upload
- `wallet` : Portefeuille
- `boost` : Boost
- `rating` : Notation
- `admin` : Administration
- `supabase` : Supabase
- `r2` : Stockage R2
- `types` : Types TypeScript

### 4.4 Exemples valides

```bash
feat(auth): ajouter authentification OTP
fix(payment): corriger calcul commission
docs(api): documenter endpoints upload
refactor(ui): simplifier composant ProductCard
test(wallet): ajouter tests unitaires
chore(ci): mettre à jour GitHub Actions
```

---

## 5. Utilisation

### 5.1 Commit normal

```bash
git add .
git commit -m "feat(auth): ajouter authentification OTP"
# Les hooks s'exécutent automatiquement
```

### 5.2 Push vers GitHub

```bash
git push origin main
# Les vérifications pre-push s'exécutent automatiquement
```

### 5.3 Exécution manuelle

```bash
# Vérifications pre-commit
node scripts/pre-commit-checks.js

# Vérifications pre-push
npm run pre-push

# Validation message commit
npm run validate-commit
```

---

## 6. Dépannage

### 6.1 Erreurs courantes

#### ESLint errors

```bash
npm run lint:fix
```

#### Prettier errors

```bash
npm run format
```

#### TypeScript errors

```bash
npm run type-check
```

#### Tests failures

```bash
npm run test
```

### 6.2 Bypass temporaire (non recommandé)

```bash
# Bypass pre-commit
git commit -m "message" --no-verify

# Bypass pre-push
git push --no-verify
```

---

## 7. Personnalisation

### 7.1 Modifier les vérifications

Éditer les fichiers dans `scripts/` :

- `pre-commit-checks.js`
- `pre-push-checks.js`
- `validate-commit-message.js`

### 7.2 Modifier lint-staged

Éditer `.lintstagedrc.js` pour changer les règles de formatage automatique.

### 7.3 Modifier commitlint

Éditer `commitlint.config.js` pour changer les règles de validation des messages.

---

## 8. Intégration CI/CD

Les mêmes vérifications sont exécutées dans GitHub Actions (voir `.github/workflows/ci.yml`) pour
garantir la cohérence entre local et CI.

---

## 9. Bonnes pratiques

1. **Toujours** corriger les erreurs avant de commiter
2. **Utiliser** le format de message standardisé
3. **Tester** localement avant de pusher
4. **Maintenir** la couverture de tests > 70%
5. **Vérifier** qu'aucun secret n'est exposé

---

## 10. Support

En cas de problème :

1. Vérifier les logs d'erreur
2. Exécuter les scripts manuellement
3. Vérifier la configuration
4. Consulter la documentation Husky/lint-staged

---

## 11. Changelog

| Version | Date       | Changements                                  |
| ------- | ---------- | -------------------------------------------- |
| v1.0    | 2025-10-22 | Configuration initiale du système pre-commit |
