# Linkart — Playlists Éditoriales (Admin)

> Version: v2.0 Auteur : Papa Diop Objectif : Spécifications complètes du système de playlists
> éditoriales créées par l'admin selon les typebeats/genres.

---

## 1. Vue d'ensemble

Le système de playlists éditoriales permet aux administrateurs de créer des collections thématiques
de beats pour améliorer la découverte et l'engagement des utilisateurs. Ces playlists sont **lecture
seule** pour les utilisateurs et servent de **curation éditoriale**.

## 2. Principe de Fonctionnement

### 2.1 Rôles et Permissions

**Administrateur :**

- ✅ Créer, modifier, supprimer des playlists
- ✅ Ajouter/retirer des beats des playlists
- ✅ Définir l'ordre des beats
- ✅ Gérer les métadonnées (titre, description, cover)
- ✅ Publier/dépublier des playlists

**Utilisateur :**

- ✅ Consulter les playlists publiques
- ✅ Écouter les beats en lecture continue
- ✅ Ajouter des beats aux favoris depuis une playlist
- ✅ Partager des playlists
- ❌ Créer/modifier des playlists

### 2.2 Critères de Curation

Les playlists sont organisées selon :

**TypeBeat/Genre :**

- Trap, Drill, Afrobeat, Hip-Hop, R&B, Pop, etc.

**Ambiance :**

- Chill, Energy, Dark, Summer, Night, etc.

**BPM :**

- Slow (60-80), Medium (80-120), Fast (120+)

**Tendances :**

- Trending, New Releases, Classics, etc.

**Thématiques :**

- Workout, Study, Party, Relax, etc.

## 3. Modèle de Données

### 3.1 Table `playlists`

```sql
CREATE TABLE playlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT, -- URL de l'image de couverture
  cover_gradient TEXT, -- Gradient CSS pour couverture générée
  typebeat TEXT NOT NULL, -- Genre principal
  ambiance TEXT, -- Ambiance (chill, energy, etc.)
  bpm_range TEXT, -- Range BPM (slow, medium, fast)
  theme TEXT, -- Thématique (workout, study, etc.)
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT false, -- Mise en avant
  display_order INTEGER DEFAULT 0, -- Ordre d'affichage
  created_by UUID REFERENCES users(id) NOT NULL, -- Admin uniquement
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP -- Date de publication
);

-- Index pour performance
CREATE INDEX idx_playlists_status ON playlists(status);
CREATE INDEX idx_playlists_typebeat ON playlists(typebeat);
CREATE INDEX idx_playlists_featured ON playlists(is_featured);
CREATE INDEX idx_playlists_display_order ON playlists(display_order);
```

### 3.2 Table `playlist_items`

```sql
CREATE TABLE playlist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  position INTEGER NOT NULL, -- Ordre dans la playlist
  added_by UUID REFERENCES users(id) NOT NULL, -- Admin qui a ajouté
  added_at TIMESTAMP DEFAULT NOW(),

  -- Contraintes
  UNIQUE(playlist_id, product_id), -- Un beat ne peut être qu'une fois par playlist
  UNIQUE(playlist_id, position) -- Position unique dans la playlist
);

-- Index pour performance
CREATE INDEX idx_playlist_items_playlist_id ON playlist_items(playlist_id);
CREATE INDEX idx_playlist_items_position ON playlist_items(playlist_id, position);
CREATE INDEX idx_playlist_items_product_id ON playlist_items(product_id);
```

### 3.3 Relations et Contraintes

```sql
-- RLS Policies
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_items ENABLE ROW LEVEL SECURITY;

-- Policy : Tous peuvent lire les playlists publiées
CREATE POLICY "Anyone can read published playlists" ON playlists
  FOR SELECT USING (status = 'published');

-- Policy : Seuls les admins peuvent modifier les playlists
CREATE POLICY "Admins can manage playlists" ON playlists
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Policy : Tous peuvent lire les items des playlists publiées
CREATE POLICY "Anyone can read published playlist items" ON playlist_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_items.playlist_id
      AND playlists.status = 'published'
    )
  );

-- Policy : Seuls les admins peuvent modifier les items
CREATE POLICY "Admins can manage playlist items" ON playlist_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );
```

## 4. API Endpoints

### 4.1 Gestion des Playlists (Admin)

#### `GET /api/admin/playlists`

Liste toutes les playlists (admin uniquement)

**Response :**

```typescript
{
  success: true,
  data: {
    playlists: [
      {
        id: string,
        title: string,
        description: string,
        cover_url?: string,
        cover_gradient?: string,
        typebeat: string,
        ambiance?: string,
        bpm_range?: string,
        theme?: string,
        status: 'draft' | 'published' | 'archived',
        is_featured: boolean,
        display_order: number,
        beat_count: number,
        created_at: string,
        updated_at: string,
        published_at?: string
      }
    ],
    pagination: {
      page: number,
      limit: number,
      total: number,
      totalPages: number
    }
  }
}
```

#### `POST /api/admin/playlists`

Créer une nouvelle playlist (admin uniquement)

**Request :**

```typescript
{
  title: string,
  description?: string,
  cover_url?: string,
  cover_gradient?: string,
  typebeat: string,
  ambiance?: string,
  bpm_range?: string,
  theme?: string,
  is_featured?: boolean,
  display_order?: number
}
```

#### `PUT /api/admin/playlists/:id`

Modifier une playlist (admin uniquement)

#### `DELETE /api/admin/playlists/:id`

Supprimer une playlist (admin uniquement)

#### `POST /api/admin/playlists/:id/publish`

Publier une playlist (admin uniquement)

#### `POST /api/admin/playlists/:id/unpublish`

Dépublier une playlist (admin uniquement)

### 4.2 Gestion des Items de Playlist (Admin)

#### `GET /api/admin/playlists/:id/items`

Liste les beats d'une playlist (admin uniquement)

**Response :**

```typescript
{
  success: true,
  data: {
    items: [
      {
        id: string,
        position: number,
        product: {
          id: string,
          title: string,
          artist: string,
          preview_url: string,
          price: number,
          typebeat: string,
          bpm: number
        },
        added_at: string
      }
    ]
  }
}
```

#### `POST /api/admin/playlists/:id/items`

Ajouter un beat à une playlist (admin uniquement)

**Request :**

```typescript
{
  product_id: string,
  position?: number // Si non fourni, ajoute à la fin
}
```

#### `PUT /api/admin/playlists/:id/items/:itemId`

Modifier la position d'un beat dans la playlist (admin uniquement)

**Request :**

```typescript
{
  position: number;
}
```

#### `DELETE /api/admin/playlists/:id/items/:itemId`

Retirer un beat d'une playlist (admin uniquement)

### 4.3 Consultation des Playlists (Users)

#### `GET /api/playlists`

Liste les playlists publiées (public)

**Query Parameters :**

- `typebeat` : Filtrer par genre
- `ambiance` : Filtrer par ambiance
- `bpm_range` : Filtrer par range BPM
- `theme` : Filtrer par thème
- `featured` : Seulement les playlists featured
- `page` : Numéro de page
- `limit` : Nombre d'éléments par page

**Response :**

```typescript
{
  success: true,
  data: {
    playlists: [
      {
        id: string,
        title: string,
        description: string,
        cover_url?: string,
        cover_gradient?: string,
        typebeat: string,
        ambiance?: string,
        bpm_range?: string,
        theme?: string,
        is_featured: boolean,
        beat_count: number,
        duration_estimate: number, // Durée totale estimée
        published_at: string
      }
    ],
    pagination: {
      page: number,
      limit: number,
      total: number,
      totalPages: number
    }
  }
}
```

#### `GET /api/playlists/:id`

Détail d'une playlist avec ses beats (public)

**Response :**

```typescript
{
  success: true,
  data: {
    playlist: {
      id: string,
      title: string,
      description: string,
      cover_url?: string,
      cover_gradient?: string,
      typebeat: string,
      ambiance?: string,
      bpm_range?: string,
      theme?: string,
      is_featured: boolean,
      beat_count: number,
      duration_estimate: number,
      published_at: string
    },
    beats: [
      {
        id: string,
        position: number,
        title: string,
        artist: string,
        preview_url: string,
        full_url?: string, // Si acheté
        price: number,
        typebeat: string,
        bpm: number,
        duration: number,
        is_purchased: boolean,
        is_favorite: boolean
      }
    ]
  }
}
```

## 5. Interface Utilisateur

### 5.1 Écrans Utilisateur

#### Home Screen - Section Playlists

```typescript
// Section "Playlists Recommandées"
<PlaylistsSection
  title="Playlists Recommandées"
  playlists={featuredPlaylists}
  onPlaylistPress={(playlist) => navigateToPlaylist(playlist.id)}
  onSeeAll={() => navigateToPlaylists()}
/>
```

#### Playlists List Screen

```typescript
// Liste des playlists avec filtres
<PlaylistsList
  playlists={playlists}
  filters={{
    typebeat: 'Trap',
    ambiance: 'Energy',
    bpm_range: 'Fast'
  }}
  onPlaylistPress={(playlist) => navigateToPlaylist(playlist.id)}
  onFilterChange={(filters) => updateFilters(filters)}
/>
```

#### Playlist Detail Screen

```typescript
// Détail playlist avec player intégré
<PlaylistDetail
  playlist={playlist}
  beats={beats}
  currentBeat={currentBeat}
  isPlaying={isPlaying}
  onBeatPress={(beat) => playBeat(beat)}
  onPlayPause={() => togglePlayPause()}
  onNext={() => playNext()}
  onPrevious={() => playPrevious()}
  onToggleFavorite={(beatId) => toggleFavorite(beatId)}
  onBuyBeat={(beat) => navigateToPurchase(beat)}
/>
```

### 5.2 Composants UI

#### PlaylistCard

```typescript
interface PlaylistCardProps {
  playlist: {
    id: string;
    title: string;
    description: string;
    cover_url?: string;
    cover_gradient?: string;
    beat_count: number;
    duration_estimate: number;
    typebeat: string;
  };
  onPress: () => void;
}
```

#### PlaylistHeader

```typescript
interface PlaylistHeaderProps {
  playlist: Playlist;
  onPlayAll: () => void;
  onShuffle: () => void;
}
```

#### BeatInPlaylist

```typescript
interface BeatInPlaylistProps {
  beat: {
    id: string;
    position: number;
    title: string;
    artist: string;
    duration: number;
    price: number;
    is_purchased: boolean;
    is_favorite: boolean;
  };
  isCurrentBeat: boolean;
  isPlaying: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  onBuy: () => void;
}
```

### 5.3 Player Intégré

Le player intégré permet la lecture continue des beats d'une playlist :

```typescript
interface PlaylistPlayerProps {
  playlist: Playlist;
  beats: Beat[];
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (position: number) => void;
  onShuffle: () => void;
  onRepeat: () => void;
}
```

**Fonctionnalités :**

- Lecture séquentielle automatique
- Mode shuffle
- Mode repeat (one/all)
- Contrôles play/pause/next/previous
- Progress bar avec seek
- Affichage du beat actuel

## 6. Interface Admin

### 6.1 Dashboard Admin - Gestion Playlists

#### Playlists Management

```typescript
// Liste des playlists avec actions admin
<AdminPlaylistsList
  playlists={allPlaylists}
  onEdit={(playlist) => navigateToEdit(playlist.id)}
  onDelete={(playlist) => confirmDelete(playlist)}
  onPublish={(playlist) => publishPlaylist(playlist.id)}
  onUnpublish={(playlist) => unpublishPlaylist(playlist.id)}
  onReorder={(playlists) => updateOrder(playlists)}
/>
```

#### Create/Edit Playlist

```typescript
// Formulaire création/édition playlist
<PlaylistForm
  playlist={editingPlaylist}
  onSave={(data) => savePlaylist(data)}
  onCancel={() => navigateBack()}
/>
```

#### Playlist Items Management

```typescript
// Gestion des beats dans une playlist
<PlaylistItemsManager
  playlist={playlist}
  items={items}
  onAddBeat={(productId) => addBeatToPlaylist(productId)}
  onRemoveBeat={(itemId) => removeBeatFromPlaylist(itemId)}
  onReorder={(items) => updateItemsOrder(items)}
/>
```

### 6.2 Composants Admin

#### PlaylistForm

```typescript
interface PlaylistFormProps {
  playlist?: Playlist;
  onSave: (data: PlaylistFormData) => void;
  onCancel: () => void;
}

interface PlaylistFormData {
  title: string;
  description?: string;
  cover_url?: string;
  cover_gradient?: string;
  typebeat: string;
  ambiance?: string;
  bpm_range?: string;
  theme?: string;
  is_featured: boolean;
  display_order: number;
}
```

#### BeatSelector

```typescript
interface BeatSelectorProps {
  onSelectBeat: (beat: Product) => void;
  filters?: {
    typebeat?: string;
    bpm_range?: string;
    price_range?: string;
  };
}
```

## 7. Exemples Concrets

### 7.1 Playlist "Trap Energy"

```json
{
  "id": "playlist-001",
  "title": "Trap Energy",
  "description": "Les meilleurs beats trap énergiques pour vos sessions",
  "typebeat": "Trap",
  "ambiance": "Energy",
  "bpm_range": "Fast",
  "theme": "Workout",
  "is_featured": true,
  "beat_count": 15,
  "duration_estimate": 1800,
  "cover_gradient": "linear-gradient(135deg, #8B5CF6, #EC4899)"
}
```

### 7.2 Playlist "Afrobeat Chill"

```json
{
  "id": "playlist-002",
  "title": "Afrobeat Chill",
  "description": "Ambiance détendue avec les meilleurs afrobeat",
  "typebeat": "Afrobeat",
  "ambiance": "Chill",
  "bpm_range": "Medium",
  "theme": "Relax",
  "is_featured": false,
  "beat_count": 12,
  "duration_estimate": 1440,
  "cover_gradient": "linear-gradient(135deg, #F59E0B, #84CC16)"
}
```

## 8. Workflows

### 8.1 Création d'une Playlist (Admin)

1. **Admin** accède au dashboard playlists
2. **Admin** clique "Créer une playlist"
3. **Admin** remplit les métadonnées (titre, description, typebeat, etc.)
4. **Admin** choisit une couverture (upload ou gradient)
5. **Admin** ajoute des beats via le sélecteur
6. **Admin** réorganise l'ordre des beats
7. **Admin** prévisualise la playlist
8. **Admin** publie la playlist

### 8.2 Découverte d'une Playlist (User)

1. **User** voit la playlist sur Home ou liste
2. **User** clique sur la playlist
3. **User** voit la liste des beats
4. **User** peut écouter les previews
5. **User** peut démarrer la lecture continue
6. **User** peut ajouter des beats aux favoris
7. **User** peut acheter des beats individuels

### 8.3 Lecture Continue (User)

1. **User** démarre la lecture d'une playlist
2. **Player** lit le premier beat
3. **Player** passe automatiquement au suivant
4. **User** peut contrôler (pause, next, previous)
5. **User** peut activer shuffle ou repeat
6. **User** peut quitter et reprendre plus tard

## 9. Métriques et Analytics

### 9.1 KPIs Playlists

- **Nombre de playlists** créées par mois
- **Taux d'écoute** par playlist
- **Durée moyenne** d'écoute par playlist
- **Conversion** playlist → achat de beat
- **Partage** de playlists
- **Engagement** par typebeat/ambiance

### 9.2 Métriques Admin

- **Temps de création** d'une playlist
- **Nombre de beats** par playlist
- **Taux de publication** (draft → published)
- **Performance** des playlists featured

## 10. Roadmap Évolution

### Phase 1 (MVP)

- ✅ Création/édition playlists par admin
- ✅ Lecture continue par users
- ✅ Interface admin basique

### Phase 2 (Améliorations)

- 🔄 Playlists automatiques (par algorithme)
- 🔄 Recommandations personnalisées
- 🔄 Analytics avancées

### Phase 3 (Avancé)

- 🔮 Playlists collaboratives (multi-admins)
- 🔮 Playlists saisonnières/thématiques
- 🔮 Intégration réseaux sociaux

---

## Changelog

- **v2.0** - Système de playlists éditoriales complet
- **v2.0** - Interface admin pour gestion playlists
- **v2.0** - Player intégré avec lecture continue
- **v2.0** - Modèle de données et API endpoints
