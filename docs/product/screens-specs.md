# Linkart — Spécifications d'Écrans

> Version: v2.0 Auteur : Papa Diop Objectif : Spécifications détaillées de tous les écrans basés sur
> le design system, incluant layout, comportements, interactions et états.

---

## 1. Vue d'ensemble

Cette documentation détaille les spécifications complètes de tous les écrans Linkart v2.0, basées
sur les screenshots fournis et le design system.

## 2. Home Screen

### 2.1 Structure et Layout

**Composition :**

```
┌─────────────────────────────────┐
│ [Header]                        │
├─────────────────────────────────┤
│ [Hero Banner]                   │
├─────────────────────────────────┤
│ [Filter Pills]                  │
├─────────────────────────────────┤
│ [Tendances] "Voir tout"         │
│ [Horizontal Scroll Cards]       │
├─────────────────────────────────┤
│ [Nouveautés] "Voir tout"        │
│ [Grid 2 colonnes]               │
├─────────────────────────────────┤
│ [Services] "Voir tout"          │
│ [Vertical List Cards]           │
├─────────────────────────────────┤
│ [Mini Player]                   │
├─────────────────────────────────┤
│ [Bottom Navigation]              │
└─────────────────────────────────┘
```

### 2.2 Composants et Interactions

#### Header

- **Menu Burger** (gauche) : Ouvre drawer navigation
- **Search Bar** (centre) : Placeholder "Rechercher beats, artistes..."
- **Avatar + Badge** (droite) : Badge notification (orange, nombre)

#### Hero Banner

- **Image Background** : Beat featured avec gradient overlay
- **Titre Principal** : "Dark Trap" (grand, blanc)
- **Sous-titre** : "by ProducerX" (moyen, gris)
- **Progress Dots** : 5 dots + "0:30" (durée)
- **Boutons** : "Écouter" (secondary) + "Acheter" (primary)

#### Filter Pills

- **Scrollable Horizontal** : Genre, BPM, Prix, Licence
- **État Actif** : Violet avec icon
- **État Inactif** : Gris avec icon
- **Interaction** : Tap pour toggle

#### Tendances Section

- **Header** : "Tendances" + "Voir tout" (lien bleu)
- **Cards Horizontales** : Image + titre + artiste + prix + play button
- **Scroll Horizontal** : Swipe pour voir plus

#### Nouveautés Section

- **Header** : "Nouveautés" + "Voir tout" (lien bleu)
- **Grid 2 Colonnes** : Image + titre + artiste + prix + heart icon
- **Scroll Vertical** : Pagination infinie

#### Services Section

- **Header** : "Services recommandés" + "Voir tout" (lien bleu)
- **Cards Verticales** : Avatar + titre + description + prix "À partir de" + bouton "Réserver"

#### Mini Player

- **Sticky Bottom** : Toujours visible
- **Artwork** : Thumbnail du beat en cours
- **Info** : Titre + artiste
- **Progress Bar** : Barre de progression
- **Controls** : Heart icon + play/pause + next

#### Bottom Navigation

- **5 Tabs** : Home (actif), Market, Upload (+), Wallet, Profile
- **Upload Tab** : Style FAB (bouton flottant)

### 2.3 États et Comportements

#### États de Chargement

- **Skeleton** : Placeholders pour cards
- **Spinner** : Centré pour sections
- **Progressive** : Chargement par sections

#### États d'Erreur

- **Toast** : Message d'erreur temporaire
- **Retry Button** : Bouton pour réessayer
- **Fallback** : Contenu de remplacement

#### États Vides

- **Message** : "Aucun contenu trouvé"
- **Action** : Bouton pour découvrir
- **Illustration** : Icône ou image

### 2.4 Interactions et Gestures

- **Pull to Refresh** : Recharger le contenu
- **Swipe Horizontal** : Navigation entre sections
- **Tap** : Sélection d'éléments
- **Long Press** : Actions contextuelles
- **Scroll** : Navigation dans les listes

## 3. Marketplace Screen

### 3.1 Structure et Layout

**Composition :**

```
┌─────────────────────────────────┐
│ "Marketplace" [Search] [Filter] │
├─────────────────────────────────┤
│ [Active Filters] X X X          │
├─────────────────────────────────┤
│ [Tabs] Beats Samples Services   │
├─────────────────────────────────┤
│ [Featured Packs] 2 colonnes     │
├─────────────────────────────────┤
│ "Latest Beats" [Sort Dropdown]  │
│ [Grid 2 colonnes]               │
│ [FAB Button +]                  │
├─────────────────────────────────┤
│ [Mini Player]                   │
├─────────────────────────────────┤
│ [Bottom Navigation]              │
└─────────────────────────────────┘
```

### 3.2 Composants et Interactions

#### Marketplace Header

- **Titre** : "Marketplace" (gauche)
- **Search Icon** : Recherche (droite)
- **Filter Icon** : Filtres avancés (droite)

#### Active Filters

- **Pills avec X** : Hip-Hop, 140 BPM, $5-$20
- **Close Button** : X pour retirer le filtre
- **Scroll Horizontal** : Si beaucoup de filtres

#### Content Tabs

- **Beats** : Actif (violet + icon)
- **Samples** : Inactif (gris + icon)
- **Services** : Inactif (gris + icon)

#### Featured Packs

- **2 Colonnes** : Premium Pack, Trending
- **Cards** : Icon + titre + sous-titre
- **Couleurs** : Violet, Orange

#### Sort Dropdown

- **Label** : "Popularité" + chevron down
- **Options** : Popularité, Prix, Nouveautés, BPM

#### Product Grid

- **2 Colonnes** : Cards avec image + info + prix + heart
- **FAB Button** : Bouton "+" flottant (upload)

### 3.3 États et Comportements

#### Filtres Actifs

- **Affichage** : Pills avec X
- **Suppression** : Tap sur X
- **Ajout** : Via modal de filtres

#### Tri et Pagination

- **Sort** : Dropdown avec options
- **Pagination** : Scroll infini
- **Loading** : Skeleton cards

## 4. Playlist Detail Screen

### 4.1 Structure et Layout

**Composition :**

```
┌─────────────────────────────────┐
│ [Header avec retour]            │
├─────────────────────────────────┤
│ [Playlist Cover + Info]         │
│ [Play All] [Shuffle]            │
├─────────────────────────────────┤
│ [Liste des Beats]               │
│ ┌─────────────────────────────┐ │
│ │ [Position] [Artwork] Info   │ │
│ │            [Heart] [Play]   │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ [Player Intégré]                │
└─────────────────────────────────┘
```

### 4.2 Composants et Interactions

#### Playlist Header

- **Cover** : Image ou gradient
- **Titre** : Nom de la playlist
- **Description** : Description éditoriale
- **Beat Count** : "X beats"
- **Durée** : Durée totale estimée

#### Actions Playlist

- **Play All** : Démarrer la lecture
- **Shuffle** : Lecture aléatoire
- **Share** : Partager la playlist

#### Liste des Beats

- **Position** : Numéro dans la playlist
- **Artwork** : Thumbnail du beat
- **Info** : Titre + artiste + durée
- **Heart Icon** : Toggle favorite
- **Play Button** : Jouer ce beat

#### Player Intégré

- **Artwork** : Image du beat actuel
- **Info** : Titre + artiste
- **Progress** : Barre de progression
- **Controls** : Previous + Play/Pause + Next
- **Shuffle/Repeat** : Modes de lecture

### 4.3 États et Comportements

#### Lecture Continue

- **Auto Next** : Passage automatique au suivant
- **Loop** : Retour au début si fin de playlist
- **Shuffle** : Ordre aléatoire

#### Interactions

- **Tap Beat** : Jouer ce beat
- **Long Press** : Menu contextuel
- **Swipe** : Actions rapides

## 5. Favorites Screen

### 5.1 Structure et Layout

**Composition :**

```
┌─────────────────────────────────┐
│ "Mes Favoris" [Sort]            │
├─────────────────────────────────┤
│ [Grid 2 colonnes]               │
│ ┌─────┐ ┌─────┐                 │
│ │Beat1│ │Beat2│                 │
│ │Heart│ │Heart│                 │
│ └─────┘ └─────┘                 │
│ ┌─────┐ ┌─────┐                 │
│ │Beat3│ │Beat4│                 │
│ │Heart│ │Heart│                 │
│ └─────┘ └─────┘                 │
├─────────────────────────────────┤
│ [Mini Player]                   │
├─────────────────────────────────┤
│ [Bottom Navigation]              │
└─────────────────────────────────┘
```

### 5.2 Composants et Interactions

#### Header

- **Titre** : "Mes Favoris"
- **Sort Dropdown** : Par date, par titre, par artiste

#### Favorites Grid

- **2 Colonnes** : Cards avec image + info + heart
- **Heart Icon** : Toggle favorite (retirer)
- **Tap Card** : Ouvrir détail du beat

#### Empty State

- **Message** : "Aucun favori pour le moment"
- **Action** : "Explorer le Marketplace"
- **Illustration** : Icône cœur

### 5.3 États et Comportements

#### Chargement

- **Skeleton** : Placeholders pour cards
- **Progressive** : Chargement par batch

#### Synchronisation

- **Optimistic** : Mise à jour immédiate
- **Sync** : Synchronisation avec backend
- **Conflict** : Résolution des conflits

## 6. Service Detail Screen

### 6.1 Structure et Layout

**Composition :**

```
┌─────────────────────────────────┐
│ [Header avec retour]            │
├─────────────────────────────────┤
│ [Service Header]                │
│ [Avatar] [Titre] [Rating]        │
├─────────────────────────────────┤
│ [Description]                   │
├─────────────────────────────────┤
│ [Pricing Tiers]                 │
│ ┌─────────────────────────────┐ │
│ │ Basic Mix - $50              │ │
│ │ Standard Mix - $75           │ │
│ │ Premium Mix - $100           │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ [Portfolio]                     │
│ [Horizontal Scroll Samples]     │
├─────────────────────────────────┤
│ [Réserver] [Contacter]          │
└─────────────────────────────────┘
```

### 6.2 Composants et Interactions

#### Service Header

- **Avatar** : Photo du prestataire
- **Titre** : Nom du service
- **Rating** : Note moyenne + nombre d'avis
- **Badge** : "Professionnel vérifié"

#### Description

- **Texte** : Description détaillée du service
- **Tags** : Compétences, équipements
- **Expérience** : Années d'expérience

#### Pricing Tiers

- **Multi-tarifs** : Basic, Standard, Premium
- **Prix** : Montants clairs
- **Description** : Ce qui est inclus
- **Sélection** : Radio buttons

#### Portfolio

- **Samples** : Exemples de travaux
- **Play Buttons** : Écouter les samples
- **Scroll Horizontal** : Voir plus d'exemples

#### Actions

- **Réserver** : Créer une réservation
- **Contacter** : Ouvrir le chat

### 6.3 États et Comportements

#### Réservation

- **Formulaire** : Date, heure, notes
- **Confirmation** : Validation de la réservation
- **Chat** : Activation du chat

## 7. Responsive et Adaptations

### 7.1 Breakpoints

```typescript
const breakpoints = {
  xs: 0, // Mobile portrait
  sm: 576, // Mobile landscape
  md: 768, // Tablet portrait
  lg: 992, // Tablet landscape
  xl: 1200, // Desktop
};
```

### 7.2 Adaptations Mobile

#### Layout

- **Cards** : Toujours 2 colonnes sur mobile
- **Navigation** : Bottom tabs (pas de sidebar)
- **Text** : Tailles adaptées pour lisibilité

#### Touch Targets

- **Minimum** : 44px (iOS) / 48px (Android)
- **Spacing** : Espacement suffisant entre éléments
- **Gestures** : Support des gestes natifs

### 7.3 Adaptations Tablet

#### Layout

- **Cards** : 3-4 colonnes selon la taille
- **Navigation** : Sidebar possible
- **Text** : Tailles plus grandes

## 8. Accessibilité

### 8.1 Support Screen Reader

- **Labels** : Tous les éléments ont des labels
- **Roles** : Rôles ARIA appropriés
- **Navigation** : Navigation au clavier
- **Focus** : Indicateurs de focus visibles

### 8.2 Contraste et Lisibilité

- **Ratio** : 4.5:1 minimum pour le texte
- **Couleurs** : Pas de dépendance couleur seule
- **Tailles** : Textes lisibles sur tous les appareils

### 8.3 Interactions

- **Touch** : Zones de touch suffisantes
- **Gestures** : Alternatives pour les gestes complexes
- **Feedback** : Feedback visuel et haptique

## 9. Performance

### 9.1 Optimisations

#### Images

- **Lazy Loading** : Chargement différé
- **Formats** : WebP, AVIF quand possible
- **Tailles** : Images adaptées à la résolution

#### Listes

- **Virtual Scrolling** : Pour listes longues
- **Pagination** : Chargement par batch
- **Cache** : Mise en cache des données

#### Animations

- **Native Driver** : Animations natives
- **60fps** : Animations fluides
- **Reduced Motion** : Respect des préférences

### 9.2 Métriques

- **First Paint** : < 1s
- **Interactive** : < 2s
- **Smooth Scrolling** : 60fps
- **Memory** : < 100MB

## 10. Tests et Validation

### 10.1 Tests Visuels

- **Screenshots** : Comparaison avec design
- **Responsive** : Test sur différentes tailles
- **Accessibility** : Tests d'accessibilité

### 10.2 Tests Fonctionnels

- **Navigation** : Tous les écrans accessibles
- **Interactions** : Toutes les actions fonctionnent
- **États** : Tous les états gérés

### 10.3 Tests de Performance

- **Load Time** : Temps de chargement
- **Memory** : Utilisation mémoire
- **Battery** : Impact batterie

---

## Changelog

- **v2.0** - Spécifications complètes de tous les écrans
- **v2.0** - Détails des interactions et comportements
- **v2.0** - Adaptations responsive et accessibilité
- **v2.0** - Optimisations performance et tests
