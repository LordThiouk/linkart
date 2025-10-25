# Bibliothèque de Composants UI & Storybook

> Version: v1.0 Auteur: Papa Diop Dernière mise à jour: 2025-10-23 Objet: Décrire l'architecture de
> la bibliothèque de composants UI de Linkart et l'utilisation de Storybook pour la documentation et
> les tests.

---

## 1. Contexte

Pour garantir une interface utilisateur cohérente, maintenable et scalable, Linkart utilise une
architecture de composants basée sur l'**Atomic Design** et documentée via **Storybook**.

Chaque morceau d'UI est une "brique" réutilisable, ce qui accélère le développement et réduit les
bugs.

---

## 2. Architecture (Atomic Design)

Notre bibliothèque de composants est structurée en trois niveaux de complexité croissante, situés
dans `src/components/`:

### 2.1 Atoms

Les "atomes" sont les briques de base indivisibles de notre UI.

- **Exemples**: `Button`, `Text`, `Input`, `Avatar`, `Icon`.
- **Règle**: Un atome n'a pas de "logique métier" et est purement présentationnel.

### 2.2 Molecules

Les "molécules" sont des assemblages d'atomes qui forment des unités fonctionnelles simples.

- **Exemples**: `SearchBar` (un `Input` + un `Button`), `ProductPreview` (une image, du texte, un
  prix).
- **Règle**: Une molécule peut avoir une logique d'UI simple (ex: état d'un champ de recherche).

### 2.3 Organisms

Les "organismes" sont des sections plus complexes de l'interface, composées de molécules et/ou
d'atomes.

- **Exemples**: `Header`, `ProductList`, `CheckoutForm`.
- **Règle**: Un organisme gère une partie significative d'une fonctionnalité.

---

## 3. Storybook : Notre Catalogue de Composants

**Storybook** est l'outil central pour visualiser, tester et documenter chaque composant de manière
isolée.

### 3.1 Objectifs

- **Documentation Visuelle**: Fournir un catalogue de tous les composants existants.
- **Développement Isolé**: Permettre de construire et de tester un composant sans avoir à lancer
  l'application entière.
- **Tests de Régression Visuelle**: S'assurer qu'un changement sur un composant n'a pas d'effets de
  bord inattendus.

### 3.2 Comment l'utiliser ?

Le projet est configuré pour lancer Storybook dans deux environnements :

#### a) Version Web (pour le développement)

C'est la méthode la plus rapide pour développer et visualiser les composants.

- **Commande**: `npm run storybook`
- **Accès**: Ouvre ton navigateur à l'adresse `http://localhost:6006/`.

#### b) Version Mobile Native (pour la validation)

Ceci affiche Storybook directement dans l'application mobile, pour un rendu 100% fidèle.

1. **Ouvre le fichier `App.tsx`**.
2. **Commente** la ligne de l'application principale.
3. **Décommente** la ligne : `export { default } from './.rnstorybook';`
4. **Lance l'application** comme d'habitude (`npx expo start`).

> **Note**: N'oublie pas de rétablir le fichier `App.tsx` avant de commiter tes changements !

### 3.3 Règle d'or

**Chaque nouveau composant créé dans `src/components/` DOIT être accompagné de son fichier de
stories (`.stories.tsx`).**

Une story doit documenter :

- L'état par défaut du composant.
- Ses principales variations (ex: `disabled`, `loading`, `selected`).
- Les cas limites (ex: avec un texte très long, sans image).
