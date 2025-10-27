# Documentation Linkart

> Version: v2.0 Auteur: Papa Diop Dernière mise à jour: 2025-10-27 Objet: Documentation centrale
> complète du projet Linkart - Marketplace musicale du Sénégal

---

## 🎵 À Propos de Linkart

**Linkart** est la **première marketplace musicale du Sénégal** dédiée aux professionnels du son.
Notre plateforme connecte beatmakers, artistes, ingénieurs du son et studios dans un écosystème
sécurisé et profitable.

### Vision

Devenir la **plateforme de référence** pour l'industrie musicale en Afrique francophone, permettant
à tous les créateurs de monétiser leurs talents de manière équitable.

### Mission

- **Connecter** tous les acteurs de l'industrie musicale
- **Sécuriser** les transactions et la propriété intellectuelle
- **Faciliter** la collaboration et la création
- **Monétiser** équitablement les talents créatifs

---

## 📚 Structure de la Documentation

Notre documentation suit une **architecture modulaire** organisée par audience et usage :

```
docs/
├── internal/        ← Documentation technique interne (dev, archi, tests, sécurité)
├── product/         ← Documentation fonctionnelle (roadmap, user flow, UX, marketing)
├── api/             ← Documentation API (endpoints, webhooks, schemas)
├── public/          ← Documentation externe (README, CGU, support)
└── generated/       ← Documentation compilée automatiquement (en lecture seule)
```

---

## 🎯 Types de Documents

| Type                     | Destinataire               | Contenu                                       | Mise à jour         |
| ------------------------ | -------------------------- | --------------------------------------------- | ------------------- |
| **🔧 Technique interne** | Développeurs / DevOps      | Stack, backend, sécurité, migrations, CI      | Automatique (build) |
| **📋 Produit**           | Équipe projet              | Fonctionnalités, parcours utilisateur, vision | Trimestrielle       |
| **🔌 API**               | Intégrateurs / Partenaires | Endpoints, auth, formats, erreurs             | Continue            |
| **👥 Public**            | Utilisateurs finaux        | Guides, CGU, FAQs, support                    | Selon release       |
| **🤖 Générée**           | CI / Plateforme            | Docs extraites automatiquement du code        | Post-build          |

---

## 🚀 Accès Rapide

### Pour les Développeurs

- **[Architecture Technique](./internal/README.md)** - Stack, patterns, sécurité
- **[Documentation API](./api/README.md)** - Endpoints, authentification, exemples
- **[Base de Données](./generated/db-tables.md)** - Schéma, relations, RLS
- **[Composants UI](./generated/components.md)** - Documentation complète des composants

### Pour l'Équipe Produit

- **[Vision Produit](./product/README.md)** - Roadmap, KPIs, utilisateurs cibles
- **[Parcours Utilisateurs](./product/README.md#3-parcours-utilisateurs)** - Flows détaillés
- **[Business Rules](./product/README.md#5-business-rules)** - Commission, escrow, sécurité

### Pour les Utilisateurs

- **[Guide de Démarrage](./public/README.md)** - Guides vendeurs et acheteurs
- **[FAQ](./public/README.md#3-faq---questions-fréquentes)** - Questions fréquentes
- **[Support](./public/README.md#4-support-technique)** - Contact et dépannage

### Pour les Intégrateurs

- **[API Reference](./api/README.md)** - Documentation complète des endpoints
- **[Authentification](./api/README.md#2-authentification--autorisation)** - JWT, capabilities
- **[Webhooks](./api/README.md#5-webhooks--intégrations)** - Intégrations paiement

---

## 🏗️ Architecture Technique

### Stack Principal

- **Frontend** : React Native + Expo (mobile cross-platform)
- **Backend** : Supabase Edge Functions (Deno serverless)
- **Base de données** : PostgreSQL (Supabase)
- **Stockage** : Cloudflare R2 (fichiers audio)
- **Paiements** : Wave + Orange Money APIs
- **Auth** : Supabase Auth (JWT + OTP)

### Fonctionnalités Clés

- ✅ **Marketplace** : Beats, samples, kits, services
- ✅ **Paiements sécurisés** : Wave/Orange Money + escrow
- ✅ **Upload** : Fichiers complets + preview 30s
- ✅ **Boosts** : Mise en avant payante
- ✅ **Ratings** : Système d'évaluation
- ✅ **Wallet** : Gestion des fonds et retraits
- ✅ **Admin** : Validation et modération

---

## 📊 Documentation Générée Automatiquement

Notre système génère automatiquement **1,479 lignes** de documentation :

| Fichier           | Lignes | Description                               |
| ----------------- | ------ | ----------------------------------------- |
| **components.md** | 698    | Documentation complète des composants UI  |
| **features.md**   | 176    | Modules fonctionnels par feature          |
| **db-tables.md**  | 159    | Schéma complet de la base de données      |
| **hooks.md**      | 148    | Hooks personnalisés React                 |
| **db-rls.md**     | 87     | Politiques de sécurité Row Level Security |
| **api.md**        | 92     | Template pour documentation API           |
| **db-rpc.md**     | 44     | Fonctions RPC de la base de données       |
| **tests.md**      | 25     | Couverture et structure des tests         |
| **services.md**   | 24     | Services et utilitaires                   |
| **README.md**     | 26     | Rapport de génération                     |

---

## 🔄 Synchronisation Automatique

La documentation est **automatiquement synchronisée** à chaque :

- ✅ **Commit** : Génération via pre-commit hook
- ✅ **Push** : Vérification via pre-push hook
- ✅ **CI/CD** : Validation dans GitHub Actions
- ✅ **Types** : Génération depuis Supabase distant

### Commandes de Documentation

```bash
# Générer toute la documentation
npm run docs:generate

# Vérifier la synchronisation
npm run docs:check

# Valider la qualité
npm run docs:validate

# Maintenance complète
npm run docs:maintain
```

---

## 🎯 Standards de Qualité

### Principes Documentaires

- ✅ **Clair et concis** (max 500 lignes par document)
- ✅ **Structuré** (titres hiérarchiques uniformes)
- ✅ **Actionnable** (procédures, pas de généralités)
- ✅ **Vérifiable** (liens directs vers le code)
- ✅ **Daté et versionné** (traçabilité complète)
- ❌ **Pas de doublons** ni d'incohérences

### Conventions

- **Format** : Markdown (.md) universel
- **Langue** : Français (principal), Anglais (secondaire)
- **Versioning** : Semantic versioning (v1.0, v2.0)
- **Métadonnées** : Auteur, date, objet dans chaque document

---

## 🛠️ Outils et Intégrations

| Outil            | Rôle               | Usage                         |
| ---------------- | ------------------ | ----------------------------- |
| **GitHub**       | Versioning + CI/CD | Documentation versionnée      |
| **Supabase CLI** | Types génération   | Types TypeScript automatiques |
| **Markdownlint** | Validation         | Qualité des documents         |
| **Prettier**     | Formatage          | Style cohérent                |
| **Husky**        | Git hooks          | Synchronisation automatique   |
| **Sentry**       | Monitoring         | Liens doc → erreurs           |

---

## 📈 Métriques et KPIs

### Documentation

- **Couverture** : 100% des modules documentés
- **Synchronisation** : Automatique à chaque commit
- **Qualité** : Validation continue via CI/CD
- **Traçabilité** : Changelog dans chaque document

### Projet

- **GMV** : Volume transactions total
- **Commission** : 5% fixe sur toutes ventes
- **Utilisateurs** : Beatmakers, artistes, studios
- **Géographie** : Sénégal + Afrique francophone

---

## 🔮 Roadmap Documentation

### Phase 1 - MVP (Q1 2025) ✅

- ✅ Structure complète mise en place
- ✅ Génération automatique opérationnelle
- ✅ Synchronisation CI/CD active
- ✅ Documentation technique complète

### Phase 2 - Growth (Q2 2025) 🔄

- 🔄 Documentation multilingue (EN)
- 🔄 Guides vidéo intégrés
- 🔄 API interactive (Swagger UI)
- 🔄 Documentation mobile (app)

### Phase 3 - Scale (Q3-Q4 2025) 📋

- 📋 Documentation partenaires
- 📋 Guides intégration SODAV
- 📋 Documentation compliance légale
- 📋 Analytics documentation usage

---

## 🤝 Contribution

### Pour les Développeurs

1. **Modifiez** le code source
2. **Commitez** - la documentation se génère automatiquement
3. **Vérifiez** que les hooks pre-commit passent
4. **Poussez** - la CI valide la cohérence

### Pour l'Équipe Produit

1. **Mettez à jour** les documents dans `docs/product/`
2. **Respectez** les conventions de formatage
3. **Versionnez** vos changements
4. **Validez** avec `npm run docs:validate`

---

## 📞 Support

### Documentation

- **Issues** : [GitHub Issues](https://github.com/LordThiouk/linkart/issues)
- **Discussions** : [GitHub Discussions](https://github.com/LordThiouk/linkart/discussions)

### Projet

- **Email** : support@linkart.sn
- **WhatsApp** : +221 70 123 45 67
- **Horaires** : Lundi-Vendredi, 9h-18h (GMT)

---

## 📝 Changelog

### v2.0 (2025-10-27)

- **Documentation complète** selon les règles du projet
- **Architecture modulaire** avec 4 types de docs
- **Génération automatique** de 1,479 lignes
- **Synchronisation CI/CD** opérationnelle
- **Standards de qualité** définis et appliqués
- **Roadmap** et métriques documentées

### v1.0 (2025-10-22)

- Création de la structure de documentation
- Mise en place des standards et templates
- Intégration dans le CI/CD

---

## 🎉 Conclusion

**Linkart dispose maintenant d'une documentation de niveau entreprise** qui :

1. **Se génère automatiquement** depuis le code source
2. **Se synchronise** avec la base de données distante
3. **Couvre tous les aspects** : technique, produit, API, utilisateur
4. **Respecte les standards** de qualité documentaire
5. **Évolue automatiquement** avec le projet

**C'est un système de documentation vivant et intelligent !** 🚀

---

_Cette documentation est maintenue automatiquement par le système Linkart. Pour toute question,
consultez les sections spécialisées ou contactez l'équipe._
