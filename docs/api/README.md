# Documentation API Linkart

> Version: v2.0 Auteur: Papa Diop Dernière mise à jour: 2025-10-27 Objet: Documentation complète des
> APIs et intégrations pour la marketplace musicale Linkart

---

## 1. Architecture API

**Linkart** utilise une architecture **serverless** basée sur **Supabase Edge Functions** (Deno)
pour toutes les opérations backend.

### Stack Technique

- **Runtime** : Deno (TypeScript natif)
- **Base de données** : PostgreSQL (Supabase)
- **Stockage** : Cloudflare R2 (S3-compatible)
- **Auth** : Supabase Auth (JWT)
- **Paiements** : Wave API + Orange Money API

---

## 2. Authentification & Autorisation

### 2.1 Authentification

Tous les endpoints nécessitent un **JWT Supabase** valide dans le header `Authorization`.

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.2 Capabilities System

Chaque utilisateur possède des **capabilities** stockées dans `users.capabilities` (JSONB) :

```json
{
  "can_buy": true,
  "can_sell": false,
  "can_withdraw": false,
  "can_boost": false
}
```

### 2.3 Vérification des Capabilities

Chaque endpoint vérifie les capabilities requises avant exécution :

```typescript
// Exemple de vérification
if (!user.capabilities.can_sell) {
  return new Response(JSON.stringify({ error: 'Capability can_sell required' }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

---

## 3. Endpoints Principaux

### 3.1 Upload & Produits

#### `POST /api/upload-request`

**Capability requise** : `can_sell`

Génère une URL presignée pour l'upload de fichiers sur R2.

**Request:**

```json
{
  "fileType": "preview" | "full",
  "fileName": "beat_preview.mp3",
  "contentType": "audio/mpeg"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "uploadUrl": "https://r2.cloudflare.com/presigned-put-url",
    "fileKey": "previews/user123/beat456_preview.mp3",
    "expiresIn": 300
  }
}
```

#### `POST /api/upload-complete`

**Capability requise** : `can_sell`

Finalise l'upload et crée le produit en statut `pending`.

**Request:**

```json
{
  "title": "Trap Beat 2025",
  "type": "beat",
  "price": 50000,
  "license": "Exclusive",
  "previewKey": "previews/user123/beat456_preview.mp3",
  "fileKey": "beats/user123/beat456.zip",
  "metadata": {
    "bpm": 140,
    "genre": "trap",
    "key": "C minor"
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "productId": "uuid",
    "status": "pending",
    "message": "Produit créé, en attente de validation admin"
  }
}
```

### 3.2 Marketplace & Recherche

#### `GET /api/products`

**Capability requise** : Aucune (public)

Récupère la liste des produits actifs avec filtres.

**Query Parameters:**

- `type`: `beat` | `sample` | `kit` | `service`
- `genre`: `trap` | `afrobeat` | `hip-hop` | etc.
- `minPrice`: number
- `maxPrice`: number
- `sortBy`: `newest` | `price_asc` | `price_desc` | `rating`
- `page`: number (pagination)
- `limit`: number (défaut: 20)

**Response:**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "title": "Trap Beat 2025",
        "type": "beat",
        "price": 50000,
        "previewUrl": "presigned-url",
        "rating": 4.5,
        "seller": {
          "name": "Producer Name",
          "verified": true
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "hasMore": true
    }
  }
}
```

### 3.3 Paiements & Transactions

#### `POST /api/pay`

**Capability requise** : `can_buy`

Initie un paiement pour un produit.

**Request:**

```json
{
  "productId": "uuid",
  "paymentMethod": "wave" | "orange_money",
  "phoneNumber": "+221701234567"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "transactionId": "uuid",
    "status": "pending",
    "paymentUrl": "https://wave.com/payment-url",
    "amount": 50000,
    "commission": 2500,
    "netAmount": 47500
  }
}
```

#### `POST /api/payment-callback`

**Webhook** : Wave/Orange Money

Reçoit les callbacks de paiement et met à jour le statut.

**Request (Wave):**

```json
{
  "transaction_id": "wave_tx_id",
  "status": "success",
  "amount": 50000,
  "signature": "hmac_signature"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "transactionId": "uuid",
    "status": "paid_held",
    "contractUrl": "https://r2.cloudflare.com/contracts/uuid.pdf"
  }
}
```

### 3.4 Téléchargements

#### `POST /api/generate-download`

**Capability requise** : `can_buy`

Génère une URL presignée pour télécharger un fichier acheté.

**Request:**

```json
{
  "transactionId": "uuid"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://r2.cloudflare.com/presigned-get-url",
    "expiresIn": 900,
    "fileName": "beat456.zip"
  }
}
```

### 3.5 Wallet & Retraits

#### `GET /api/wallet`

**Capability requise** : `can_withdraw`

Récupère les informations du wallet utilisateur.

**Response:**

```json
{
  "success": true,
  "data": {
    "balance": 125000,
    "pendingWithdrawals": 25000,
    "transactions": [
      {
        "id": "uuid",
        "type": "sale",
        "amount": 47500,
        "description": "Vente: Trap Beat 2025",
        "date": "2025-10-27T10:30:00Z"
      }
    ]
  }
}
```

#### `POST /api/withdraw`

**Capability requise** : `can_withdraw`

Demande un retrait de fonds.

**Request:**

```json
{
  "amount": 100000,
  "method": "wave" | "orange_money",
  "phoneNumber": "+221701234567"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "withdrawalId": "uuid",
    "status": "pending",
    "amount": 100000,
    "message": "Demande de retrait soumise, validation admin requise"
  }
}
```

### 3.6 Boosts

#### `POST /api/boost`

**Capability requise** : `can_buy`

Achète un boost pour un produit ou profil.

**Request:**

```json
{
  "type": "product" | "profile",
  "targetId": "uuid",
  "duration": 7 | 14,
  "paymentMethod": "wave" | "orange_money"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "boostId": "uuid",
    "status": "active",
    "expiresAt": "2025-11-03T10:30:00Z",
    "price": 2000
  }
}
```

### 3.7 Ratings

#### `POST /api/ratings`

**Capability requise** : `can_buy`

Soumet une évaluation après achat.

**Request:**

```json
{
  "transactionId": "uuid",
  "rating": 5,
  "comment": "Excellent beat, très professionnel!"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "ratingId": "uuid",
    "message": "Évaluation soumise avec succès"
  }
}
```

---

## 4. Codes d'Erreur

### 4.1 Codes HTTP Standards

- `200` : Succès
- `201` : Créé
- `400` : Requête invalide
- `401` : Non authentifié
- `403` : Capability manquante
- `404` : Ressource non trouvée
- `500` : Erreur serveur

### 4.2 Codes d'Erreur Métier

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_FUNDS",
    "message": "Solde insuffisant pour cette transaction",
    "details": {
      "required": 50000,
      "available": 30000
    }
  }
}
```

**Codes d'erreur courants :**

- `INSUFFICIENT_FUNDS` : Solde insuffisant
- `PRODUCT_NOT_AVAILABLE` : Produit non disponible
- `PAYMENT_FAILED` : Échec du paiement
- `UPLOAD_FAILED` : Échec de l'upload
- `INVALID_CAPABILITY` : Capability manquante

---

## 5. Webhooks & Intégrations

### 5.1 Webhooks Paiement

Les webhooks sont **signés** avec HMAC pour vérification :

```typescript
// Vérification signature Wave
const signature = request.headers.get('X-Wave-Signature');
const expectedSignature = crypto
  .createHmac('sha256', WAVE_WEBHOOK_SECRET)
  .update(requestBody)
  .digest('hex');

if (signature !== expectedSignature) {
  return new Response('Invalid signature', { status: 401 });
}
```

### 5.2 Intégrations Externes

- **Wave API** : Paiements mobiles
- **Orange Money API** : Paiements mobiles
- **Cloudflare R2** : Stockage fichiers
- **Sentry** : Monitoring erreurs

---

## 6. Sécurité

### 6.1 Row Level Security (RLS)

Toutes les tables utilisent RLS pour l'isolation des données :

```sql
-- Exemple: users ne peuvent voir que leurs propres données
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

### 6.2 URLs Presignées

- **Upload** : TTL 5 minutes
- **Download** : TTL 15 minutes
- **Contrats** : Accès permanent (après achat)

### 6.3 Audit Trail

Toutes les actions sensibles sont loggées dans `audit_logs` :

- Paiements
- Téléchargements
- Modifications admin
- Changements capabilities

---

## 7. Exemples d'Utilisation

### 7.1 Flow Complet : Upload → Vente → Achat

```typescript
// 1. Upload produit
const uploadResponse = await fetch('/api/upload-request', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({
    fileType: 'preview',
    fileName: 'beat_preview.mp3',
    contentType: 'audio/mpeg',
  }),
});

// 2. Upload fichier sur R2
const { uploadUrl } = await uploadResponse.json();
await fetch(uploadUrl, {
  method: 'PUT',
  body: previewFile,
});

// 3. Finaliser produit
await fetch('/api/upload-complete', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({
    title: 'Trap Beat 2025',
    type: 'beat',
    price: 50000,
    previewKey: 'previews/user123/beat456_preview.mp3',
  }),
});
```

### 7.2 Flow Achat

```typescript
// 1. Initier paiement
const paymentResponse = await fetch('/api/pay', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({
    productId: 'uuid',
    paymentMethod: 'wave',
    phoneNumber: '+221701234567',
  }),
});

// 2. Rediriger vers Wave
const { paymentUrl } = await paymentResponse.json();
window.location.href = paymentUrl;

// 3. Après callback, générer téléchargement
const downloadResponse = await fetch('/api/generate-download', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({ transactionId: 'uuid' }),
});
```

---

## 8. Changelog

### v2.0 (2025-10-27)

- Documentation complète selon les règles du projet
- Ajout de tous les endpoints principaux
- Exemples d'utilisation détaillés
- Codes d'erreur et troubleshooting
- Sécurité et webhooks

### v1.0 (2025-10-22)

- Création de la structure de documentation API
- Configuration de la génération automatique
