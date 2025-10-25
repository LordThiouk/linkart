# Linkart Documentation

> Version: v1.0 Auteur: Papa Diop Dernière mise à jour: 2025-10-22 Objet: Documentation centrale du
> projet Linkart

## Structure de la documentation

```
docs/
├── internal/        ← Documentation technique interne (dev, archi, tests, sécurité)
├── product/         ← Documentation fonctionnelle (roadmap, user flow, UX, marketing)
├── api/             ← Documentation API (endpoints, webhooks, schemas)
├── public/          ← Documentation externe (README, CGU, support)
└── generated/       ← Documentation compilée automatiquement (en lecture seule)
```

## Types de documents

| Type                  | Destinataire               | Contenu                                             | Mise à jour         |
| --------------------- | -------------------------- | --------------------------------------------------- | ------------------- |
| **Technique interne** | Dev / DevOps               | Stack, backend, sécurité, migrations, CI            | Automatique (build) |
| **Produit**           | Équipe projet              | Fonctionnalités, parcours utilisateur, vision       | Trimestrielle       |
| **API**               | Intégrateurs / Partenaires | Endpoints, auth, formats, erreurs                   | Continue            |
| **Public**            | Utilisateurs finaux        | Guides, CGU, FAQs, support                          | Selon release       |
| **Générée**           | CI / Plateforme            | Docs extraites automatiquement du code ou des specs | Post-build          |

## Standards de qualité

- ✅ Clair et concis (pas plus de 500 lignes par document)
- ✅ Structuré (titres hiérarchiques et sections uniformes)
- ✅ Actionnable (procédures, pas de généralités)
- ✅ Vérifiable (liens directs vers le code ou endpoints)
- ✅ Daté et versionné
- ❌ Pas de doublons ni d'incohérences

## Changelog

### v1.0 (2025-10-22)

- Création de la structure de documentation
- Mise en place des standards et templates
- Intégration dans le CI/CD
