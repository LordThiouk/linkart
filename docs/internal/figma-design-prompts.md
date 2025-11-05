# Linkart — Prompts Détaillés pour Design Figma

> Version: v1.0  
> Date: 2025-01-27  
> Objectif: Générer des prompts détaillés pour chaque flow afin de créer les designs Figma de
> l'application Linkart

---

## 🎨 Contexte Design System

### Palette de Couleurs

**Fond principal :**

- Background: `#0A0A0A` (Noir profond)
- Surface cards: `#111111` (Gris très sombre)
- Surface élevée: `#1A1A1A` (Gris sombre)
- Bordures: `#404040` (Gris moyen)

**Couleurs primaires :**

- Primary (Indigo): `#6366F1` (Boutons principaux, liens, accents)
- Secondary (Orange): `#F59E0B` (Prix, highlights)
- Music Pink: `#EC4899` (Heart icon, éléments spéciaux)

**Texte :**

- Principal: `#F5F5F5` (Blanc cassé)
- Secondaire: `#D4D4D4` (Gris clair)
- Tertiaire: `#A3A3A3` (Gris moyen)

**Gradients :**

- Primary: `#6366F1` → `#8B5CF6` (Indigo vers violet)
- Secondary: `#F59E0B` → `#EC4899` (Orange vers rose)
- Music: `#8B5CF6` → `#EC4899` → `#06B6D4` (Arc-en-ciel musical)

### Typographie

- **Titres principaux** : Poppins Bold, 32px
- **Titres sections** : Poppins SemiBold, 24px
- **Titres cards** : Poppins Medium, 18px
- **Texte principal** : Inter Regular, 16px
- **Descriptions** : Inter Regular, 14px
- **Labels, prix** : Inter Medium, 12px

### Espacements (8px Grid)

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Composants Disponibles

**Atoms :**

- Button (primary, secondary, ghost, fab, icon)
- HeartIcon (outline/filled states)
- PlayButton (sm, md, lg)
- Badge/Pill (active/inactive states)
- PriceTag
- Input
- Text
- Avatar

**Molecules :**

- ProductCard (avec HeartIcon, PlayButton, ProductMetrics)
- ServiceCard (avec avatar, pricing, bouton "Réserver")
- PlaylistCard (avec cover, métadonnées, PlayButton)
- AudioPlayer/MiniPlayer (sticky bottom avec HeartIcon)
- SearchBar
- RatingStars

**Organisms :**

- HeroBanner (avec gradient overlay, boutons actions)
- FilterPills (scrollable horizontal)
- ProductList/ProductGrid (2 colonnes)
- ServicesSection (verticale)
- TrendingSection (horizontale)
- AppHeader (avec menu, search, avatar)
- BottomNavigation (5 tabs)

---

## 📱 PROMPT 1 : Onboarding Flow

### Description

Créer les écrans d'onboarding pour l'application mobile Linkart, incluant le splash screen, les
écrans d'introduction, l'authentification OTP, et la configuration du profil initial.

### Écrans à concevoir

#### 1.1 Splash Screen

**Layout :**

- Background: `#0A0A0A` (noir profond)
- Logo centré verticalement et horizontalement
- Tagline sous le logo: "La marketplace musicale africaine"
- Texte tagline: Poppins Medium, 16px, couleur `#D4D4D4`
- Logo size: 120x120px
- Spinner de chargement discret en bas (optionnel)

**Spécifications :**

- Dimensions: 375x667px (iPhone SE) / 414x896px (iPhone 11)
- Animation: Fade in du logo (300ms)

#### 1.2 Écrans Onboarding (Carousel - 3-4 écrans)

**Layout par écran :**

- Background: `#0A0A0A`
- Illustration/Image en haut (60% hauteur)
- Titre: Poppins Bold, 28px, couleur `#F5F5F5`, centré, margin-bottom 16px
- Description: Inter Regular, 16px, couleur `#D4D4D4`, centré, padding horizontal 32px
- Dots indicateurs en bas (3-4 dots selon nombre d'écrans)
- Bouton "Suivant" / "Commencer" : Primary button, largeur full width - 32px margin horizontal

**Thèmes écrans :**

1. "Vendez vos beats" - Illustration music production
2. "Achetez des créations" - Illustration marketplace
3. "Collaborez avec des pros" - Illustration collaboration
4. "Monétisez vos talents" - Illustration wallet/money

**Composants :**

- Button (primary variant)
- Dots pagination (custom)

#### 1.3 Login / Sign Up Screen

**Layout :**

- Background: `#0A0A0A`
- Logo en haut (petit, 80x80px), margin-top 48px
- Titre: "Bienvenue sur Linkart" - Poppins Bold, 32px, couleur `#F5F5F5`
- Sous-titre: "Connectez-vous ou créez un compte" - Inter Regular, 16px, couleur `#A3A3A3`

**Champ téléphone :**

- Label: "Numéro de téléphone" - Inter Medium, 14px, couleur `#D4D4D4`
- Input: Background `#111111`, border `#404040`, borderRadius 16px, padding 16px
- Placeholder: "+221 7X XXX XX XX" - Inter Regular, 16px, couleur `#737373`
- Flag selector à gauche (Sénégal 🇸🇳)

**Boutons :**

- "Continuer" : Primary button, full width - 32px margin horizontal
- "J'ai déjà un compte" : Ghost button, texte couleur `#6366F1`

**Composants :**

- Input (avec flag selector)
- Button (primary, ghost)

#### 1.4 OTP Verification Screen

**Layout :**

- Background: `#0A0A0A`
- Logo petit en haut (60x60px)
- Titre: "Vérification" - Poppins Bold, 28px, couleur `#F5F5F5`
- Description: "Nous avons envoyé un code à +221 7X XXX XX XX" - Inter Regular, 16px, couleur
  `#D4D4D4`

**Champs OTP (6 chiffres) :**

- 6 inputs carrés (48x48px) alignés horizontalement
- Background: `#111111`, border `#404040`, borderRadius 12px
- Texte: Poppins Bold, 24px, couleur `#F5F5F5`, centré
- Gap entre inputs: 8px
- Auto-focus next input, backspace previous

**Boutons :**

- "Vérifier" : Primary button, disabled jusqu'à 6 chiffres
- "Renvoyer le code" : Ghost button, texte couleur `#6366F1`, timer "Renvoyer dans 59s"
- "Modifier le numéro" : Ghost button, texte couleur `#A3A3A3`

**Composants :**

- OTP Inputs (custom)
- Button (primary, ghost)

#### 1.5 Profile Setup Screen

**Layout :**

- Background: `#0A0A0A`
- Header: "Complétez votre profil" - Poppins Bold, 28px, couleur `#F5F5F5`
- Sous-titre: "Ces informations sont publiques" - Inter Regular, 14px, couleur `#A3A3A3`

**Champs :**

1. **Nom complet** : Input texte
2. **Bio** : Textarea multiline (3-4 lignes)
3. **Localisation** : Input texte + icône géolocalisation
4. **Photo de profil** : Upload zone circulaire (96x96px), placeholder avatar + "Ajouter photo"

Checkbox :

“Je veux vendre mes beats” → can_sell = true

“Je veux offrir mes services” → can_offer_service = true

Bouton principal : “Terminer l’inscription”

**Boutons :**

- "Continuer" : Primary button, full width - 32px margin horizontal
- "Passer" : Ghost button (optionnel)

**Composants :**

- Input
- Textarea
- Avatar upload
- Button (primary, ghost)

---

## 📱 PROMPT 2 : Home / Marketplace Flow

### Description

Créer l'écran principal Home avec Hero Banner, filtres, sections trending, et marketplace avec
navigation tabs.

### Écrans à concevoir

#### 2.1 Home Screen

**Layout :**

- Background: `#0A0A0A`
- **AppHeader** en haut :
  - Menu burger (gauche) - 24x24px, couleur `#D4D4D4`
  - SearchBar (centre) - Background `#111111`, borderRadius 24px, placeholder "Rechercher..."
  - Avatar avec badge notification (droite) - 40x40px, badge `#EC4899`

**HeroBanner (première section) :**

- Background image avec gradient overlay (`#6366F1` → `#8B5CF6`, opacity 0.7)
- Height: 200px
- BorderRadius: 24px (top corners), margin horizontal 16px
- Content overlay:
  - Titre: Poppins Bold, 24px, couleur `#F5F5F5`
  - Sous-titre: Inter Regular, 16px, couleur `#D4D4D4`
  - Artist: Inter Medium, 14px, couleur `#A3A3A3`
  - Boutons: "Écouter" (primary), "Acheter" (secondary)
  - Progress dots + durée en bas

**FilterPills (section filtres) :**

- Scrollable horizontal, padding horizontal 16px
- Pills: Background `#1A1A1A`, borderRadius 20px, padding 8px 16px
- Active pill: Background `#6366F1`, couleur texte `#F5F5F5`
- Inactive pill: Background `#1A1A1A`, couleur texte `#D4D4D4`
- Icons: Genre, BPM, Prix, Licence (Lucide icons, 16x16px)

**SectionHeader (Tendances) :**

- Layout horizontal: Titre gauche "Tendances" - Poppins SemiBold, 20px
- "Voir tout" droite - Inter Medium, 14px, couleur `#6366F1`

**TrendingSection (horizontal scroll) :**

- Cards horizontales, width 160px, gap 12px
- ProductCard avec:
  - Image artwork (120x120px), borderRadius 12px
  - HeartIcon top-right (20x20px, couleur `#EC4899` si favori)
  - Titre: Poppins Medium, 14px
  - Artiste: Inter Regular, 12px, couleur `#A3A3A3`
  - Prix: Inter Medium, 14px, couleur `#F59E0B`
  - PlayButton: 32x32px, position absolue sur image

**ProductGrid (2 colonnes) :**

- 2 colonnes, gap 12px vertical, 16px horizontal
- ProductCard layout:
  - Image (aspect ratio 1:1), borderRadius 12px
  - HeartIcon top-right
  - Titre + Artiste en bas
  - Prix + PlayButton
  - ProductMetrics (eye, download, heart icons) en bas

**ServicesSection (verticale) :**

- ServiceCard verticale, width full - 32px
- Layout:
  - Avatar provider (gauche) - 40x40px
  - Titre service (Poppins Medium, 16px)
  - Description (Inter Regular, 14px, couleur `#A3A3A3`)
  - Prix "À partir de 15 000 F" (Inter Medium, 14px, couleur `#F59E0B`)
  - Bouton "Réserver" (primary, small)
  - HeartIcon (droite)

**BottomNavigation :**

- Background: `#111111`, height 64px
- 5 tabs: Home (actif), Market, Upload (+), Wallet, Profile
- Icons: 24x24px, couleur `#6366F1` si actif, `#737373` si inactif
- Upload button: FAB style, 56x56px, background `#6366F1`, borderRadius full

**Composants utilisés :**

- AppHeader
- SearchBar
- HeroBanner
- FilterPills
- ProductCard
- ServiceCard
- BottomNavigation
- ProductGrid

#### 2.2 Marketplace Screen

**Layout :**

- Background: `#0A0A0A`
- **MarketplaceHeader** :
  - Titre "Marketplace" - Poppins Bold, 28px, couleur `#F5F5F5`
  - Icons droite: Search (24x24px), Filter (24x24px), couleur `#D4D4D4`

**ActiveFilters (si filtres appliqués) :**

- Pills avec close button (X), scrollable horizontal
- Background `#6366F1`, borderRadius 20px, padding 8px 16px

**ContentTabs :**

- Tabs horizontal: Beats (actif), Samples, Services
- Background `#111111`, borderRadius 12px, padding 4px
- Tab actif: Background `#6366F1`, couleur texte `#F5F5F5`
- Tab inactif: Background transparent, couleur texte `#A3A3A3`

**FeaturedPacks (2 colonnes) :**

- Cards avec icon (crown, flame), label, titre
- Background avec gradient léger

**ProductGrid (2 colonnes) :**

- Même layout que Home Screen

**SortDropdown :**

- "Popularité" avec chevron down, couleur `#D4D4D4`

**FABButton (Upload) :**

- Position fixe bottom-right, 56x56px
- Background `#6366F1`, borderRadius full
- Icon "+" blanc, 24x24px
- Shadow: elevation 12

**Composants utilisés :**

- MarketplaceHeader
- ContentTabs
- ActiveFilters
- FeaturedPacks
- ProductGrid
- FABButton

---

## 📱 PROMPT 3 : Product Detail Flow

### Description

Créer l'écran de détail produit avec player, informations, vendeur, ratings, et actions d'achat.

### Écrans à concevoir

#### 3.1 Product Detail Screen

**Layout :**

- Background: `#0A0A0A`
- **Header** : Back button (gauche), Share button (droite), couleur `#D4D4D4`

**Image Artwork :**

- Full width, height 300px, aspect ratio 1:1
- Gradient overlay bas (noir transparent → noir opaque)
- PlayButton large (64x64px) au centre
- HeartIcon top-right (32x32px)

**Product Info :**

- Titre: Poppins Bold, 24px, couleur `#F5F5F5`, margin-bottom 8px
- Artiste: Inter Medium, 16px, couleur `#A3A3A3`, margin-bottom 16px
- Métadonnées badges: Genre, BPM, Licence (Pills, couleur `#1A1A1A`)

**AudioPlayer :**

- Background `#111111`, borderRadius 16px, padding 16px
- Progress bar (full width, height 4px, background `#6366F1`)
- Controls: Previous, Play/Pause, Next (32x32px)
- Time display: "1:23 / 3:45" - Inter Regular, 12px, couleur `#A3A3A3`

**Pricing Section :**

- Titre "Licences disponibles" - Poppins SemiBold, 18px
- Liste licences (Basic, Non-Exclusive, Exclusive, Lease) :
  - Card par licence: Background `#111111`, borderRadius 12px, padding 16px
  - Type licence: Poppins Medium, 16px
  - Prix: Inter Bold, 18px, couleur `#F59E0B`
  - Termes: Inter Regular, 14px, couleur `#A3A3A3`
  - Bouton "Sélectionner" (primary, small)

**Creator Profile :**

- Card: Background `#111111`, borderRadius 16px, padding 16px
- Avatar (gauche) - 48x48px
- Nom vendeur: Poppins Medium, 16px
- Badge vérifié (si applicable)
- Rating: RatingStars + nombre d'avis
- Bouton "Voir profil" (ghost, small)

**Ratings Section :**

- Titre "Avis" - Poppins SemiBold, 18px
- Average rating: RatingStars large + score
- Liste avis:
  - Avatar utilisateur (gauche) - 32x32px
  - Nom utilisateur: Inter Medium, 14px
  - RatingStars: 16px
  - Commentaire: Inter Regular, 14px, couleur `#D4D4D4`
  - Date: Inter Regular, 12px, couleur `#A3A3A3`

**Metrics (ProductMetrics) :**

- Icons: Eye (vues), Download (téléchargements), Heart (likes)
- Valeurs: "1.2K", "345", "89" - Inter Medium, 12px

**CTA Buttons :**

- "Acheter maintenant" : Primary button, full width - 32px margin horizontal
- "Ajouter aux favoris" : Secondary button avec HeartIcon
- "Partager" : Ghost button

**Composants utilisés :**

- AudioPlayer
- ProductCard (informations)
- HeartIcon
- PlayButton
- PriceTag (multi-licences)
- RatingStars
- UserProfile
- Button (primary, secondary, ghost)

---

## 📱 PROMPT 4 : Checkout Flow (Beats & Kits)

### Description

Créer le flow de checkout avec sélection licence, résumé commande, choix paiement, et confirmation.

### Écrans à concevoir

#### 4.1 License Selection Screen

**Layout :**

- Background: `#0A0A0A`
- Header: "Choisissez une licence" - Poppins Bold, 24px
- Product summary card en haut:
  - Image artwork (80x80px), borderRadius 12px
  - Titre + Artiste
  - Prix actuel sélectionné

**Liste licences :**

- Card par licence (Background `#111111`, borderRadius 16px, padding 20px):
  - Radio button (24x24px) à gauche
  - Type licence: Poppins SemiBold, 18px
  - Description: Inter Regular, 14px, couleur `#A3A3A3`
  - Prix: Inter Bold, 20px, couleur `#F59E0B`
  - Termes détaillés (expandable)

**Bouton continuer :**

- "Continuer" : Primary button, disabled si aucune licence sélectionnée

**Composants utilisés :**

- ProductCard (mini version)
- Radio buttons
- Button (primary)

#### 4.2 Checkout Summary Screen

**Layout :**

- Background: `#0A0A0A`
- Header: "Résumé de commande" - Poppins Bold, 24px

**Product Card :**

- Image artwork + Titre + Artiste
- Licence sélectionnée (badge)
- Prix licence

**Order Summary :**

- Background `#111111`, borderRadius 16px, padding 16px
- Lignes:
  - "Sous-total" : Inter Regular, 14px
  - "Montant" : Inter Medium, 16px, couleur `#F5F5F5`
  - "Commission plateforme (5%)" : Inter Regular, 14px, couleur `#A3A3A3`
  - "Montant commission" : Inter Medium, 14px, couleur `#A3A3A3`
  - Divider
  - "Total" : Poppins SemiBold, 18px
  - "Montant total" : Poppins SemiBold, 20px, couleur `#F59E0B`

**Payment Methods :**

- Titre "Méthode de paiement" - Poppins SemiBold, 18px
- Options:
  - Wave: Logo + "Wave" - Card selectable (Background `#1A1A1A`)
  - Orange Money: Logo + "Orange Money" - Card selectable

**Terms & Conditions :**

- Checkbox "J'accepte les conditions d'utilisation"
- Texte: Inter Regular, 12px, couleur `#A3A3A3`

**Bouton payer :**

- "Payer XX XXX F" : Primary button, full width - 32px

**Composants utilisés :**

- ProductCard
- PriceTag
- Radio buttons (payment methods)
- Checkbox
- Button (primary)

#### 4.3 Payment Processing Screen

**Layout :**

- Background: `#0A0A0A`
- Content centré verticalement
- Logo payment provider (Wave/Orange Money) - 80x80px
- Titre "Confirmez le paiement" - Poppins Bold, 24px
- Instructions: Inter Regular, 16px, couleur `#D4D4D4`
- Montant: Poppins Bold, 32px, couleur `#F59E0B`
- Loading spinner
- Bouton "Annuler" (ghost)

#### 4.4 Payment Success Screen

**Layout :**

- Background: `#0A0A0A`
- Content centré
- Success icon (checkmark circle, couleur `#22C55E`) - 80x80px
- Titre "Paiement confirmé !" - Poppins Bold, 28px, couleur `#F5F5F5`
- Message: Inter Regular, 16px, couleur `#D4D4D4`
- Transaction ID: Inter Regular, 12px, couleur `#A3A3A3`

**Actions :**

- "Télécharger" : Primary button
- "Voir le contrat" : Secondary button
- "Retour à l'accueil" : Ghost button

**Composants utilisés :**

- Success icon
- Button (primary, secondary, ghost)

---

## 📱 PROMPT 5 : Upload Produit Flow

### Description

Créer le flow d'upload produit avec formulaire, upload fichiers, et configuration multi-licences.

### Écrans à concevoir

#### 5.1 Upload Type Selection Screen

**Layout :**

- Background: `#0A0A0A`
- Header: "Publier un produit" - Poppins Bold, 24px
- Sous-titre: "Choisissez le type de produit" - Inter Regular, 16px

**Type Cards (grid 2 colonnes) :**

- Beat: Icon + "Beat" - Card selectable
- Kit: Icon + "Kit" - Card selectable
- Sample: Icon + "Sample" - Card selectable

**Bouton continuer :**

- "Continuer" : Primary button, disabled si aucun type sélectionné

#### 5.2 Upload Form Screen

**Layout :**

- Background: `#0A0A0A`
- ScrollView vertical

**Section 1 - Informations de base :**

- Titre: "Informations du produit" - Poppins SemiBold, 18px
- Champs:
  - Titre (Input texte)
  - Description (Textarea multiline)
  - Genre (Dropdown/Searchable)
  - BPM (Input numérique)
  - Tags (Input avec chips)

**Section 2 - Artwork Upload :**

- Titre: "Image de couverture" - Poppins SemiBold, 18px
- Upload zone: Background `#111111`, borderRadius 16px, padding 32px
- Aspect ratio 1:1, min 400x400px
- Preview image si uploadée
- Bouton "Changer l'image"
- Message: "Image requise" - Inter Regular, 12px, couleur `#A3A3A3`

**Section 3 - Licences et Prix :**

- Titre: "Licences disponibles" - Poppins SemiBold, 18px
- Checkboxes par type licence:
  - ☐ Basic
  - ☐ Non-Exclusive
  - ☐ Exclusive
  - ☐ Lease

**Pour chaque licence cochée (expandable) :**

- Prix (Input numérique, placeholder "En FCFA")
- Termes (Textarea, placeholder "Conditions de la licence...")
- Toggle "Disponible" (default: ON)

**Section 4 - Fichiers :**

- Titre: "Fichiers audio" - Poppins SemiBold, 18px
- Preview (30s max): Upload button + preview player si uploadé
- Fichier complet: Upload button + indication format (ZIP, WAV, MP3)

**Section 5 - Validation :**

- Checkbox "J'accepte les conditions de publication"
- Message: Inter Regular, 12px, couleur `#A3A3A3`

**Boutons :**

- "Publier" : Primary button, full width
- "Enregistrer comme brouillon" : Ghost button

**Composants utilisés :**

- Input
- Textarea
- Dropdown
- Checkbox
- Upload zone (artwork)
- Upload button (audio files)
- AudioPlayer (preview)
- Button (primary, ghost)

---

## 📱 PROMPT 6 : Service Booking Flow

### Description

Créer le flow de réservation de service avec sélection service, consultation tarifs, demande de
réservation, et chat.

### Écrans à concevoir

#### 6.1 Service Detail Screen

**Layout :**

- Background: `#0A0A0A`
- **ServiceCard** expanded:
  - Header avec avatar provider + nom + badge vérifié
  - Image/Portfolio preview
  - Titre service: Poppins Bold, 24px
  - Description complète: Inter Regular, 16px
  - Category badge: Background `#6366F1`
  - Rating: RatingStars + nombre d'avis

**Pricing Section :**

- Titre "Tarifs" - Poppins SemiBold, 18px
- Si prix fixe: Prix unique affiché
- Si à la demande: "Prix à discuter"
- Si multi-tiers: Liste des tiers (Basic/Standard/Premium) avec prix

**Portfolio Section :**

- Titre "Portfolio" - Poppins SemiBold, 18px
- Gallery d'exemples (images/audio previews)
- Témoignages clients (cartes avec avatars, noms, commentaires)

**Disponibilités :**

- Titre "Disponibilités" - Poppins SemiBold, 18px
- Calendrier simplifié ou liste créneaux

**Boutons :**

- "Réserver" : Primary button, full width
- "Ajouter aux favoris" : Secondary button avec HeartIcon

**Composants utilisés :**

- ServiceCard (expanded)
- RatingStars
- PriceTag
- Button (primary, secondary)

#### 6.2 Booking Request Screen

**Layout :**

- Background: `#0A0A0A`
- Header: "Demande de réservation" - Poppins Bold, 24px

**Service Summary :**

- ServiceCard mini avec informations de base

**Form fields :**

- Date souhaitée (DatePicker)
- Heure (TimePicker)
- Message (Textarea, placeholder "Notes pour le prestataire...")

**Bouton :**

- "Envoyer la demande" : Primary button, full width

#### 6.3 Booking Confirmation Screen

**Layout :**

- Background: `#0A0A0A`
- Status badge: "En attente de confirmation" / "Confirmé"
- Service details
- Date/Heure réservée
- Bouton "Annuler" (ghost) si pending
- Bouton "Contacter" (primary) si confirmed → ouvre chat

---

## 📱 PROMPT 7 : Wallet Flow

### Description

Créer l'écran wallet avec solde, historique transactions, et demande de retrait.

### Écrans à concevoir

#### 7.1 Wallet Screen

**Layout :**

- Background: `#0A0A0A`
- **Header** : "Mon portefeuille" - Poppins Bold, 24px

**Balance Card :**

- Background gradient (`#6366F1` → `#8B5CF6`)
- BorderRadius: 24px, padding: 32px
- Label: "Solde disponible" - Inter Regular, 14px, couleur `#D4D4D4`
- Montant: Poppins Bold, 48px, couleur `#F5F5F5`
- Badge: "FCFA" - Inter Medium, 12px

**Quick Actions :**

- Grid 2 colonnes:
  - "Retirer" : Card avec icon, background `#111111`
  - "Historique" : Card avec icon, background `#111111`

**Transactions récentes :**

- Titre "Transactions récentes" - Poppins SemiBold, 18px
- Liste transactions:
  - Card: Background `#111111`, borderRadius 12px, padding 16px
  - Icon transaction (vendu/acheté)
  - Description: "Vente - Beat XYZ" - Inter Medium, 14px
  - Montant: Inter Bold, 16px, couleur `#22C55E` (crédit) / `#F59E0B` (débit)
  - Date: Inter Regular, 12px, couleur `#A3A3A3`
  - Status badge: "Payé", "En attente", "Libéré"

**Composants utilisés :**

- StatCard
- TransactionCard
- Button (primary, ghost)

#### 7.2 Withdrawal Request Screen

**Layout :**

- Background: `#0A0A0A`
- Header: "Demande de retrait" - Poppins Bold, 24px

**Balance disponible :**

- Montant affiché en grand

**Form :**

- Montant à retirer (Input numérique)
- Méthode: Radio buttons (Wave, Orange Money)
- Numéro de compte (Input texte)
- Notes (Textarea optionnel)

**Bouton :**

- "Demander le retrait" : Primary button, full width

**Composants utilisés :**

- Input
- Radio buttons
- Button (primary)

---

## 📱 PROMPT 8 : Admin Dashboard Flow

### Description

Créer le dashboard admin avec vue produits pending, services, transactions, et actions de
modération.

### Écrans à concevoir

#### 8.1 Admin Dashboard Screen

**Layout :**

- Background: `#0A0A0A` (web ou tablet layout)
- **Sidebar** (si web) :
  - Logo
  - Menu items: Dashboard, Produits, Services, Transactions, Utilisateurs
  - Active item: Background `#6366F1`

**Header Stats :**

- Cards horizontales (4 colonnes):
  - "Produits en attente" : Background `#111111`, nombre + icon
  - "Services en attente" : Background `#111111`
  - "Transactions du jour" : Background `#111111`
  - "Revenus plateforme" : Background gradient `#6366F1`

**Sections principales :**

- **Produits en attente** :
  - Liste produits avec:
    - Image + Titre + Artiste
    - Date soumission
    - Badge status "En attente"
    - Actions: "Approuver", "Rejeter", "Voir détails"
- **Services en attente** : Même layout que produits

- **Transactions récentes** :
  - Table avec colonnes: ID, Produit, Acheteur, Vendeur, Montant, Commission, Status, Date
  - Filtres: Status, Date range

**Composants utilisés :**

- StatCard
- ProductCard (admin version)
- ServiceCard (admin version)
- DataTable
- Button (primary, secondary, ghost)

---

## 🎨 Guidelines Design Figma

### Structure Figma Recommandée

```
📁 Linkart Mobile App
├── 📁 01_Design System
│   ├── Colors
│   ├── Typography
│   ├── Spacing & Layout
│   └── Components Library
├── 📁 02_Flows
│   ├── 📁 Onboarding
│   ├── 📁 Home & Marketplace
│   ├── 📁 Product Detail
│   ├── 📁 Checkout
│   ├── 📁 Upload
│   ├── 📁 Services
│   ├── 📁 Wallet
│   └── 📁 Admin
└── 📁 03_Prototypes
    └── User Flows Interactive
```

### Composants Figma à créer

1. **Atoms** : Button variants, Input, Badge, Avatar, Icon set
2. **Molecules** : ProductCard, ServiceCard, AudioPlayer
3. **Organisms** : Header, BottomNavigation, HeroBanner
4. **Templates** : Screen layouts (375x667, 414x896)

### Interactions Prototype

- Transitions: Slide (300ms), Fade (200ms)
- Micro-interactions: Button press (scale 0.98), Heart toggle (scale 0.9 → 1.1)
- Loading states: Spinner, skeleton screens
- Error states: Toast messages, inline errors

### Responsive Breakpoints

- Mobile: 375px (iPhone SE), 414px (iPhone 11)
- Tablet: 768px (iPad portrait)
- Desktop: 1280px (Admin dashboard)

---

## 📝 Notes Finales

- **Cohérence** : Utiliser les mêmes composants et tokens dans tous les flows
- **Accessibilité** : Contrastes minimum 4.5:1, zones de touch minimum 44x44px
- **Performance** : Optimiser les images, utiliser des placeholders pour les assets lourds
- **Animation** : Garder les animations subtiles (150-300ms max)
- **Dark mode uniquement** : Le design est optimisé pour le mode sombre

---

## 🔗 Références

- **Design System** : `docs/product/design-system.md`
- **Components Library** : `docs/product/components-library.md`
- **Flows Summary** : `docs/internal/app-flows-summary.md`
- **Theme** : `src/theme/index.ts`
