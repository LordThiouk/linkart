# 🗄️ Linkart - Configuration Base de Données

## Architecture KV (Key-Value Store)

L'application Linkart utilise **exclusivement la table KV** de Supabase pour le stockage des
données. Cette approche simplifie le déploiement et est parfaitement adaptée au prototypage.

---

## 📊 Schéma de Données KV

### Préfixes de Clés

Toutes les données sont organisées par **préfixes** pour faciliter les requêtes :

```typescript
// Users
user: {
  userId;
} // Profils utilisateurs

// Products
product: {
  productId;
} // Beats, Kits, Samples

// Purchases
purchase: {
  purchaseId;
} // Achats utilisateurs

// Reviews
review: {
  reviewId;
} // Avis produits

// Boosts
boost: {
  boostId;
} // Campagnes de boost

// Playlists
playlist: {
  playlistId;
} // Playlists curées

// Services
service: {
  serviceId;
} // Services professionnels

// Transactions
transaction: {
  txId;
} // Historique wallet
```

---

## 📦 Structures de Données

### User Profile

```typescript
{
  id: string;              // UUID Supabase
  email: string;
  name: string;
  role: 'producer' | 'artist' | 'engineer';
  avatar: string;          // URL image
  phone?: string;
  location?: string;       // Dakar, Lagos, etc.
  walletBalance: number;   // F CFA
  createdAt: number;       // timestamp
  updatedAt?: number;
}
```

### Product (Beat/Kit/Sample)

```typescript
{
  id: string;
  userId: string;          // Owner
  type: 'beat' | 'kit' | 'sample';
  title: string;
  artist: string;
  artistImage?: string;
  coverImage: string;
  price: number;           // F CFA

  // Beat specific
  bpm?: number;
  key?: string;            // "Am", "C", etc.
  duration?: string;       // "3:24"

  // Metadata
  genre: string;           // Afrobeat, Trap, etc.
  mood?: string;
  location: string;        // Localité
  tags: string[];

  // Stats
  views: number;
  plays: number;
  likes: number;
  downloads: number;
  rating: number;          // 0-5
  reviewCount: number;

  // Boost
  isBoosted: boolean;
  boostEndDate?: number;

  // Files
  files?: Array<{
    id: string;
    name: string;
    size: string;
    type: 'audio' | 'archive' | 'document';
    format: string;
  }>;

  createdAt: number;
  updatedAt?: number;
}
```

### Purchase

```typescript
{
  id: string;
  userId: string;          // Buyer
  productId: string;
  productTitle: string;
  productType: 'beat' | 'kit' | 'sample';
  artistName: string;
  coverImage: string;
  licenseType: 'Basic' | 'Premium' | 'Exclusive';
  price: number;           // F CFA
  purchaseDate: number;    // timestamp
  downloaded: boolean;
  lastDownloadDate?: number;
  hasReview: boolean;
  files: Array<FileInfo>;
}
```

### Review

```typescript
{
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number; // 1-5
  comment: string;
  createdAt: number;
  helpful: number; // Upvotes count
}
```

### Boost

```typescript
{
  id: string;
  userId: string;
  itemType: 'product' | 'profile';
  itemId: string;
  duration: '24h' | '7j' | '30j';
  price: number; // F CFA
  startDate: number;
  endDate: number;
  active: boolean;
  views: number; // Analytics
  clicks: number;
}
```

### Playlist

```typescript
{
  id: string;
  title: string;
  description: string;
  coverImage: string;
  type: 'beats' | 'kits' | 'samples';
  itemCount: number;
  totalPlays: number;
  productIds: string[];    // Array of product IDs
  createdAt: number;
}
```

### Service

```typescript
{
  id: string;
  userId: string;          // Provider
  title: string;
  provider: string;
  providerImage: string;
  coverImage: string;
  category: 'Mixing' | 'Mastering' | 'Production' | 'Recording' | 'Vocal Tuning';
  location: string;
  price: number;           // Starting price
  rating: number;
  reviewCount: number;
  deliveryTime: string;    // "3 jours"
  description: string;
  packages?: Array<{
    name: string;
    price: number;
    deliveryTime: string;
  }>;
  createdAt: number;
}
```

### Transaction

```typescript
{
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'sale';
  amount: number;          // F CFA
  method?: string;         // Mobile Money, Bank, etc.
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
  metadata?: any;
}
```

---

## 🔌 API Routes

### Auth

```
POST /make-server-9eb1163b/auth/signup
POST /make-server-9eb1163b/auth/verify-otp
```

### Products

```
POST   /make-server-9eb1163b/products          # List with filters
GET    /make-server-9eb1163b/products/:id      # Get single
POST   /make-server-9eb1163b/products/create   # Create (auth)
PUT    /make-server-9eb1163b/products/:id      # Update (auth)
```

### Purchases

```
GET    /make-server-9eb1163b/purchases              # List user purchases (auth)
POST   /make-server-9eb1163b/purchases/create      # Create purchase (auth)
GET    /make-server-9eb1163b/purchases/:id         # Get single (auth)
POST   /make-server-9eb1163b/purchases/:id/download # Mark downloaded (auth)
```

### Reviews

```
GET    /make-server-9eb1163b/reviews/:productId    # List reviews
POST   /make-server-9eb1163b/reviews               # Create (auth + purchase required)
```

### Boosts

```
POST   /make-server-9eb1163b/boosts     # Create boost (auth)
GET    /make-server-9eb1163b/boosts     # List user boosts (auth)
```

### Playlists

```
GET    /make-server-9eb1163b/playlists       # List all
GET    /make-server-9eb1163b/playlists/:id   # Get single
```

### Services

```
POST   /make-server-9eb1163b/services     # List with filters
GET    /make-server-9eb1163b/services/:id # Get single
```

### Profile

```
GET    /make-server-9eb1163b/profile/:userId  # Get profile
PUT    /make-server-9eb1163b/profile          # Update (auth)
```

### Wallet

```
GET    /make-server-9eb1163b/wallet/balance      # Get balance (auth)
POST   /make-server-9eb1163b/wallet/add-funds   # Deposit (auth)
POST   /make-server-9eb1163b/wallet/withdraw    # Withdraw (auth)
```

---

## 🔐 Authentification

### Frontend (useAuth hook)

```tsx
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();

  // Use auth state
}
```

### API Calls

```tsx
import { api } from '../utils/api';

// Public endpoint
const { products } = await api.products.list({ type: 'beat' });

// Authenticated endpoint
const { purchases } = await api.purchases.list(accessToken);
```

---

## 🚀 Utilisation

### 1. Sign Up / Sign In

```tsx
// Sign up
const { data, error } = await signUp('user@email.com', 'password123', {
  name: 'DJ Shadow',
  role: 'producer',
  phone: '+225070000000',
});

// Sign in
const { data, error } = await signIn('user@email.com', 'password123');
```

### 2. Lister des Produits

```tsx
import { api } from '../utils/api';

const { products } = await api.products.list({
  type: 'beat',
  genre: 'Afrobeat',
  minPrice: 10000,
  maxPrice: 50000,
  location: 'Lagos',
});
```

### 3. Créer un Achat

```tsx
const { purchase } = await api.purchases.create(
  {
    productId: 'prod_1',
    licenseType: 'Premium',
    price: 49000,
  },
  accessToken
);
```

### 4. Laisser un Avis

```tsx
const { review } = await api.reviews.create(
  {
    productId: 'prod_1',
    rating: 5,
    comment: 'Excellent beat!',
  },
  accessToken
);
```

### 5. Booster un Produit

```tsx
const { boost } = await api.boosts.create(
  {
    itemType: 'product',
    itemId: 'prod_1',
    duration: '7j',
    price: 12000,
  },
  accessToken
);
```

---

## 💡 Fonctionnalités Clés

### 🎯 Système de Boost

- Les produits boostés apparaissent **en premier** dans les résultats
- Badge "Boosté" visible sur les cards
- Expiration automatique après la durée
- Analytics (vues, clics) trackés

### 🔒 Avis Post-Achat

- **Vérification obligatoire** : l'utilisateur doit avoir acheté le produit
- Mise à jour automatique du rating produit
- Flag `hasReview` sur le purchase

### 💰 Wallet Intégré

- Solde en F CFA
- Déduction automatique lors des achats
- Historique des transactions
- Support futurs paiements Mobile Money

### 📥 Downloads Management

- Tracking des téléchargements
- Flag `downloaded` sur purchases
- Expiration des liens après 30 jours (à implémenter)

### 🎵 Playlists Curées

- Organisation par type (beats/kits/samples)
- Compteurs de plays
- Featured sur HomePage

---

## 🔧 Configuration Environnement

Les variables suivantes doivent être configurées dans Supabase :

```bash
SUPABASE_URL=https://project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
```

Ces valeurs sont déjà disponibles dans `/utils/supabase/info.tsx`.

---

## 📈 Prochaines Étapes

### À Implémenter

1. **Paiements Mobile Money**
   - Orange Money
   - MTN Mobile Money
   - Moov Money

2. **Upload de Fichiers**
   - Supabase Storage pour audio/images
   - Génération de waveforms
   - Compression automatique

3. **Notifications**
   - Push notifications
   - Email confirmations
   - SMS alerts

4. **Analytics**
   - Dashboard vendeur
   - Graphiques ventes
   - Stats boost

5. **Messaging**
   - Chat temps réel
   - Notifications messages
   - Archivage conversations

---

## 🐛 Debugging

### Logs Serveur

Les logs Supabase Edge Functions sont accessibles dans le dashboard Supabase.

### Tester les Routes

```bash
# Health check
curl https://project-id.supabase.co/functions/v1/make-server-9eb1163b/health

# List products
curl -X POST https://project-id.supabase.co/functions/v1/make-server-9eb1163b/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"filters": {}}'
```

### Client Logs

```tsx
// Activer les logs détaillés
console.log('Auth state:', authState);
console.log('API response:', response);
```

---

## ✅ Checklist Migration

- [x] Serveur API configuré (`/supabase/functions/server/index.tsx`)
- [x] Routes auth (signup, verify-otp)
- [x] Routes products (list, get, create, update)
- [x] Routes purchases (list, create, get, download)
- [x] Routes reviews (list, create avec vérification achat)
- [x] Routes boosts (create, list)
- [x] Routes playlists (list, get)
- [x] Routes services (list, get)
- [x] Routes profile (get, update)
- [x] Routes wallet (balance, add-funds, withdraw)
- [x] Client Supabase frontend (`/utils/supabase/client.tsx`)
- [x] Utilitaires API (`/utils/api.tsx`)
- [x] Hook useAuth (`/hooks/useAuth.tsx`)
- [x] Seed data (`/utils/seedData.tsx`)
- [x] Documentation complète

---

## 🎉 Résultat

Votre application Linkart est maintenant **100% connectée** à la base de données Supabase avec :

- ✅ Authentification complète
- ✅ CRUD produits
- ✅ Système d'achats/licences
- ✅ Avis post-achat vérifiés
- ✅ Système de boost
- ✅ Wallet intégré
- ✅ API RESTful complète
- ✅ Architecture KV flexible

Tout est prêt pour le déploiement et les tests ! 🚀
