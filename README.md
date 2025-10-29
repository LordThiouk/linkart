# Linkart - Plateforme Musicale du Sénégal

[![Statut du Pipeline](https://github.com/LordThiouk/linkart/actions/workflows/ci.yml/badge.svg)](https://github.com/LordThiouk/linkart/actions/workflows/ci.yml)
[![Couverture de Code](https://codecov.io/gh/LordThiouk/linkart/branch/master/graph/badge.svg)](https://codecov.io/gh/LordThiouk/linkart)
[![Version NPM](https://img.shields.io/npm/v/linkart.svg)](https://www.npmjs.com/package/linkart)
[![Licence](https://img.shields.io/badge/licence-MIT-blue.svg)](LICENSE)

> Version: 1.0.0  
> Auteur: Papa Diop  
> Description: Marketplace mobile pour la musique sénégalaise

## 🎵 À propos

Linkart est une plateforme mobile qui permet aux créateurs musicaux (beatmakers, artistes, studios,
ingénieurs du son) de vendre et d'acheter des beats, samples, kits et services audio via une
application simple, sécurisée et monétisable.

## 🚀 Fonctionnalités principales

- **Marketplace musical** : Vente et achat de beats, samples, kits et services
- **Paiements sécurisés** : Intégration Wave et Orange Money avec système d'escrow
- **Système de boost** : Mise en avant payante des produits et profils
- **Notations et avis** : Système de rating pour la qualité des créations
- **Portefeuille intégré** : Gestion des revenus et retraits
- **Authentification OTP** : Connexion sécurisée par téléphone ou email

## 🛠 Stack technique

### Frontend

- **React Native** (Expo SDK) - Framework mobile cross-platform
- **TypeScript** - Typage strict
- **NativeBase** - Composants UI
- **NativeWind** - Styling utilitaire
- **React Navigation** - Navigation
- **Zustand** - Gestion d'état
- **Expo AV** - Lecture audio

### Backend

- **Supabase** - Base de données et authentification
- **Edge Functions** - API serverless (Deno)
- **PostgreSQL** - Base de données relationnelle
- **Row Level Security** - Sécurité des données

### Stockage

- **Cloudflare R2** - Stockage des fichiers audio
- **URLs presignées** - Accès sécurisé aux fichiers

### Tests

- **Storybook** - Tests d'interaction et documentation UI
- **Play Functions** - Tests d'interaction modernes
- **Addon A11y** - Tests d'accessibilité automatiques
- **Jest** - Tests unitaires (configuration simplifiée)

### Paiements

- **Wave API** - Paiements mobiles
- **Orange Money API** - Paiements mobiles
- **Système d'escrow** - Sécurisation des transactions

### DevOps

- **GitHub Actions** - CI/CD
- **Expo EAS** - Build et distribution mobile
- **Sentry** - Monitoring des erreurs

## 📱 Installation et développement

### Prérequis

- Node.js 18+
- npm 9+
- Expo CLI
- Supabase CLI
- Git

### Installation

1. **Cloner le repository**

```bash
git clone https://github.com/LordThiouk/linkart.git
cd linkart
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configuration de l'environnement**

```bash
cp env.example .env
# Éditer .env avec vos clés API
```

4. **Démarrer Supabase localement**

```bash
supabase start
```

5. **Générer les types TypeScript**

```bash
npm run supabase:types
```

6. **Démarrer l'application**

```bash
npm run dev
```

### Scripts disponibles

```bash
# Développement
npm run dev              # Démarrer l'app et les fonctions
npm run dev:mobile       # Démarrer l'app mobile uniquement
npm run dev:functions   # Démarrer les Edge Functions

# Tests
npm run test            # Tests unitaires Jest
npm run test:simple     # Tests avec configuration simplifiée
npm run test:coverage   # Tests avec couverture
npm run storybook       # Tests d'interaction Storybook
npm run test:storybook  # Tests visuels (Storybook doit être actif)
npm run test:storybook:ci # Tests visuels en CI (lance Storybook automatiquement)
npm run build-storybook # Build Storybook pour production

# Qualité de code
npm run lint            # ESLint
npm run lint:fix        # Corriger automatiquement
npm run format          # Prettier
npm run type-check      # Vérification TypeScript

# Supabase
npm run supabase:start  # Démarrer Supabase local
npm run supabase:stop   # Arrêter Supabase local
npm run supabase:types  # Générer les types
```

## 🗄 Base de données

### Tables principales

- **users** - Utilisateurs et leurs capacités
- **products** - Beats, samples, kits, services
- **transactions** - Paiements et escrow
- **boosts** - Mise en avant payante
- **ratings** - Notations et avis
- **withdrawals** - Retraits de fonds
- **download_tokens** - Tokens de téléchargement
- **download_logs** - Logs de téléchargement
- **platform_earnings** - Revenus de la plateforme

### Migrations

```bash
# Créer une nouvelle migration
supabase migration new "description"

# Appliquer les migrations
supabase db push

# Générer les types après migration
npm run supabase:types
```

## 🔐 Sécurité

- **Row Level Security (RLS)** activé sur toutes les tables
- **Authentification JWT** via Supabase Auth
- **URLs presignées** pour l'accès aux fichiers (TTL 15 min)
- **Système d'escrow** pour sécuriser les transactions
- **Commission fixe** de 5% sur toutes les ventes
- **Logs d'audit** pour toutes les actions sensibles

## 🚀 Déploiement

### Mobile (Expo EAS)

```bash
# Build pour Android
npx expo build:android

# Build pour iOS
npx expo build:ios

# Soumettre aux stores
npx expo submit:android
npx expo submit:ios
```

### Backend (Supabase)

```bash
# Déployer les migrations
supabase db push --project-ref $SUPABASE_PROJECT_REF

# Déployer les Edge Functions
supabase functions deploy --project-ref $SUPABASE_PROJECT_REF
```

## 📊 Monitoring

- **Sentry** - Tracking des erreurs et performances
- **Supabase Logs** - Logs de la base de données
- **Cloudflare Analytics** - Analytics du stockage

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :

- Créer une issue sur GitHub
- Contacter l'équipe : support@linkart.sn

## 📚 Documentation

### Guides Principaux

- **[TESTS.md](./TESTS.md)** - Guide complet des tests (Storybook, A11y, Visual Regression)
- **[SETUP.md](./SETUP.md)** - Installation et configuration du projet

### Documentation Détaillée

- [docs/TESTING.md](./docs/TESTING.md) - Guide de tests détaillé
- [docs/internal/](./docs/internal/) - Documentation technique interne
- [docs/product/](./docs/product/) - Documentation produit et design

## 🗺 Roadmap

- [ ] Phase 1 : MVP avec fonctionnalités de base
- [ ] Phase 2 : Intégration SODAV pour la télé-déclaration
- [ ] Phase 3 : Système de réservation de studios
- [ ] Phase 4 : IA pour le tagging automatique
- [ ] Phase 5 : API publique pour intégrations

---

**Linkart** - Structurons l'économie musicale sénégalaise via la tech 🎵
