# Documentation API Linkart

> Version: v2.3 Auteur: Papa Diop Dernière mise à jour: 2025-10-28 Objet: Documentation complète des
> APIs et intégrations pour la marketplace musicale Linkart. Phase 3 complétée avec composants
> adaptés et intégration complète.

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
  "previewKey": "previews/user123/beat456_preview.mp3",
  "fileKey": "beats/user123/beat456.zip",
  "metadata": {
    "bpm": 140,
    "genre": "trap",
    "key": "C minor"
  }
}
```

Note: La tarification (prix/licence) est gérée via `product_pricing` et non dans `products`.
Utiliser `GET /api/products/:id/pricing` pour récupérer les options.

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

- `type`: `beat` | `sample` | `kit`
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
        "view_count": 1250,
        "download_count": 42,
        "like_count": 89,
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

### 3.2bis Favoris (Beats/Kits)

#### `POST /api/favorites`

Toggle un favori pour un produit. Les favoris sont les "likes" et incrémentent le `like_count` du
produit.

**Request:**

```json
{
  "productId": "uuid"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "is_favorite": true,
    "like_count": 90
  }
}
```

Notes:

- Contrainte unique (user_id, product_id).
- Rollback UI en cas d'erreur.
- Optimistic UI recommandé côté client.
- Le `like_count` du produit est automatiquement mis à jour.

#### `GET /api/favorites`

Retourne la liste des produits favoris de l'utilisateur.

**Response:**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "title": "Trap Beat 2025",
        "previewUrl": "presigned-url",
        "view_count": 1250,
        "download_count": 42,
        "like_count": 89
      }
    ]
  }
}
```

### Playlists (Éditoriales)

#### `GET /api/playlists`

Liste les playlists éditoriales publiées (public).

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Trap Hits 2025",
      "description": "Les meilleurs trap beats",
      "typebeat": "Trap",
      "ambiance": "Énergique",
      "bpmRange": "140-160",
      "coverUrl": "presigned-url",
      "beatCount": 15
    }
  ]
}
```

#### `GET /api/playlists/:id`

Retourne le détail d'une playlist et l'ordre des beats.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Trap Hits 2025",
    "description": "Les meilleurs trap beats",
    "items": [
      { "productId": "uuid1", "order": 1 },
      { "productId": "uuid2", "order": 2 }
    ]
  }
}
```

#### `POST /api/admin/playlists`

Crée une playlist éditoriale (admin uniquement).

**Request:**

```json
{
  "title": "Trap Hits 2025",
  "description": "Les meilleurs trap beats",
  "typebeat": "Trap",
  "ambiance": "Énergique",
  "bpmRange": "140-160"
}
```

**Response:**

```json
{
  "success": true,
  "data": { "id": "uuid", "is_published": false }
}
```

#### `PUT /api/admin/playlists/:id`

Met à jour les métadonnées ou le statut publication (admin).

**Request:**

```json
{
  "title": "Trap Hits 2025",
  "description": "Updated",
  "is_published": true
}
```

#### `POST /api/admin/playlists/:id/items`

Ajoute un beat à une playlist avec un ordre précis (admin).

**Request:**

```json
{
  "productId": "uuid",
  "order": 3
}
```

#### `POST /api/products/:id/play`

Log une lecture de preview (pour métriques).

**Request:**

```json
{
  "durationSeconds": 25
}
```

**Response:**

```json
{
  "success": true
}
```

Note: Appelé automatiquement par le player après 1 seconde de lecture.

#### `GET /api/products/:id/pricing`

**Capability requise** : Aucune (public)

Récupère les options de tarification multi-licences pour un produit.

**Response:**

```json
{
  "success": true,
  "data": {
    "productId": "uuid",
    "pricing": [
      {
        "id": "uuid",
        "licenseType": "basic",
        "price": 25000,
        "terms": "Usage non-commercial uniquement",
        "isAvailable": true,
        "displayOrder": 1
      },
      {
        "id": "uuid",
        "licenseType": "non_exclusive",
        "price": 50000,
        "terms": "Usage commercial, distribution limitée",
        "isAvailable": true,
        "displayOrder": 2
      },
      {
        "id": "uuid",
        "licenseType": "exclusive",
        "price": 150000,
        "terms": "Droits exclusifs complets",
        "isAvailable": true,
        "displayOrder": 3
      }
    ]
  }
}
```

### 3.3 Services & Réservations

#### `GET /api/services`

**Capability requise** : Aucune (public)

Récupère la liste des services professionnels disponibles.

**Query Parameters:**

- `category`: `mixing` | `mastering` | `recording` | `production` | `coaching`
- `location`: string (ville/région)
- `minPrice`: number
- `maxPrice`: number
- `sortBy`: `newest` | `rating` | `price_asc` | `price_desc`
- `page`: number (pagination)
- `limit`: number (défaut: 20)

**Response:**

```json
{
  "success": true,
  "data": {
    "services": [
      {
        "id": "uuid",
        "title": "Mixage Professionnel",
        "category": "mixing",
        "provider": {
          "name": "Studio Pro",
          "verified": true,
          "rating": 4.8
        },
        "pricing": [
          {
            "tierName": "Basic Mix",
            "price": 20000,
            "description": "Mix simple, 2h",
            "durationEstimate": "2h",
            "isOnDemand": false
          },
          {
            "tierName": "Premium Mix",
            "price": null,
            "description": "Mix personnalisé",
            "durationEstimate": "Variable",
            "isOnDemand": true
          }
        ],
        "portfolioUrl": "presigned-url"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "hasMore": true
    }
  }
}
```

#### `GET /api/services/:id/pricing`

**Capability requise** : Aucune (public)

Récupère les options de tarification multi-tiers pour un service.

**Response:**

```json
{
  "success": true,
  "data": {
    "serviceId": "uuid",
    "pricing": [
      {
        "id": "uuid",
        "tierName": "Basic Mix",
        "price": 20000,
        "description": "Mix simple, 2h de travail",
        "durationEstimate": "2h",
        "isOnDemand": false,
        "displayOrder": 1
      },
      {
        "id": "uuid",
        "tierName": "Standard Mix",
        "price": 35000,
        "description": "Mix + mastering, 4h de travail",
        "durationEstimate": "4h",
        "isOnDemand": false,
        "displayOrder": 2
      },
      {
        "id": "uuid",
        "tierName": "Premium Mix",
        "price": null,
        "description": "Mix personnalisé selon vos besoins",
        "durationEstimate": "Variable",
        "isOnDemand": true,
        "displayOrder": 3
      }
    ]
  }
}
```

#### `POST /api/bookings/create`

**Capability requise** : `can_buy`

Crée une demande de réservation pour un service.

**Request:**

```json
{
  "serviceId": "uuid",
  "pricingTierId": "uuid", // Optionnel pour services "à la demande"
  "scheduledAt": "2025-11-15T14:00:00Z",
  "notes": "Besoin d'un mixage pour mon nouveau single"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "pending",
    "message": "Demande de réservation envoyée au prestataire"
  }
}
```

#### `GET /api/bookings`

**Capability requise** : Aucune (utilisateur authentifié)

Récupère les réservations de l'utilisateur (en tant que client ou prestataire).

**Query Parameters:**

- `role`: `client` | `provider` (défaut: les deux)
- `status`: `pending` | `confirmed` | `completed` | `cancelled`
- `page`: number (pagination)
- `limit`: number (défaut: 20)

**Response:**

```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "uuid",
        "service": {
          "title": "Mixage Professionnel",
          "category": "mixing"
        },
        "provider": {
          "name": "Studio Pro"
        },
        "client": {
          "name": "Artiste Name"
        },
        "status": "confirmed",
        "scheduledAt": "2025-11-15T14:00:00Z",
        "negotiatedPrice": 25000,
        "notes": "Besoin d'un mixage pour mon nouveau single"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 8,
      "hasMore": false
    }
  }
}
```

#### `PATCH /api/bookings/:id/confirm`

**Capability requise** : Propriétaire du service

Confirme une demande de réservation.

**Request:**

```json
{
  "negotiatedPrice": 25000, // Optionnel pour services "à la demande"
  "notes": "Prix convenu pour le mixage"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "confirmed",
    "conversationId": "uuid",
    "message": "Réservation confirmée, chat activé"
  }
}
```

#### `PATCH /api/bookings/:id/complete`

**Capability requise** : Propriétaire du service

Marque une réservation comme complétée.

**Request:**

```json
{
  "notes": "Service terminé avec succès"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "completed",
    "message": "Service marqué comme complété"
  }
}
```

#### `PATCH /api/bookings/:id/cancel`

**Capability requise** : Client ou prestataire

Annule une réservation.

**Request:**

```json
{
  "reason": "Changement de planning"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "cancelled",
    "message": "Réservation annulée"
  }
}
```

### 3.4 Messagerie (Services uniquement)

#### `POST /api/conversations/create`

**Capability requise** : Aucune (utilisateur authentifié)

Crée une conversation liée à une réservation de service.

**Request:**

```json
{
  "bookingId": "uuid"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "conversationId": "uuid",
    "bookingId": "uuid",
    "status": "active",
    "message": "Conversation créée"
  }
}
```

#### `POST /api/messages/send`

**Capability requise** : Participant de la conversation

Envoie un message dans une conversation de service.

**Request:**

```json
{
  "conversationId": "uuid",
  "content": "Bonjour, j'aimerais discuter des détails du mixage"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "messageId": "uuid",
    "conversationId": "uuid",
    "content": "Bonjour, j'aimerais discuter des détails du mixage",
    "senderId": "uuid",
    "timestamp": "2025-10-22T10:30:00Z"
  }
}
```

#### `GET /api/conversations`

**Capability requise** : Aucune (utilisateur authentifié)

Récupère les conversations de l'utilisateur.

**Query Parameters:**

- `status`: `active` | `closed`
- `page`: number (pagination)
- `limit`: number (défaut: 20)

**Response:**

```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "uuid",
        "booking": {
          "service": {
            "title": "Mixage Professionnel"
          }
        },
        "status": "active",
        "lastMessage": {
          "content": "Parfait, on se voit demain à 14h",
          "timestamp": "2025-10-22T10:30:00Z"
        },
        "unreadCount": 0
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 3,
      "hasMore": false
    }
  }
}
```

#### `GET /api/conversations/:id/messages`

**Capability requise** : Participant de la conversation

Récupère les messages d'une conversation.

**Query Parameters:**

- `page`: number (pagination)
- `limit`: number (défaut: 50)

**Response:**

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "content": "Bonjour, j'aimerais discuter des détails du mixage",
        "senderId": "uuid",
        "timestamp": "2025-10-22T10:30:00Z",
        "isRead": true
      },
      {
        "id": "uuid",
        "content": "Parfait, quel style de musique ?",
        "senderId": "uuid",
        "timestamp": "2025-10-22T10:32:00Z",
        "isRead": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 2,
      "hasMore": false
    }
  }
}
```

### 3.5 Paiements & Transactions (Beats/Kits uniquement)

#### `POST /api/pay`

**Capability requise** : `can_buy`

Initie un paiement pour un produit (beats et kits uniquement).

**⚠️ Restriction importante :** Les services ne peuvent PAS être achetés via cet endpoint.

**Request:**

```json
{
  "productId": "uuid",
  "pricingId": "uuid", // ID de la licence sélectionnée depuis /api/products/:id/pricing
  "paymentMethod": "wave" | "orange_money",
  "phoneNumber": "+221701234567"
}
```

**Response (Succès):**

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

**Response (Erreur - Service):**

```json
{
  "success": false,
  "error": {
    "code": "SERVICE_NOT_PURCHASABLE",
    "message": "Services cannot be purchased through Linkart. Use booking system instead.",
    "details": {
      "productType": "service",
      "alternative": "Use /api/bookings/create for service reservations"
    }
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

Note: Les fichiers achetés et les contrats PDF sont accessibles via des URLs presignées temporaires
(TTL 15 minutes). Aucun lien public permanent n'est exposé.

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

### 3.7 Réservations & Services

#### `POST /api/bookings/create`

**Capability requise** : `can_buy`

Crée une réservation pour un service (gratuit).

**Request:**

```json
{
  "serviceId": "uuid",
  "bookingDate": "2025-11-01T14:00:00Z",
  "duration": 120,
  "notes": "Session de mixage pour mon album"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "pending",
    "message": "Réservation créée, en attente de confirmation du prestataire"
  }
}
```

#### `GET /api/bookings`

**Capability requise** : Aucune (utilisateur authentifié)

Liste les réservations de l'utilisateur.

**Query Parameters:**

- `status`: `pending` | `confirmed` | `completed` | `cancelled`
- `role`: `client` | `provider`

**Response:**

```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "uuid",
        "service": {
          "title": "Mix & Mastering Pro",
          "provider": { "name": "SoundMaster" }
        },
        "bookingDate": "2025-11-01T14:00:00Z",
        "duration": 120,
        "status": "confirmed",
        "notes": "Session de mixage"
      }
    ]
  }
}
```

#### `PATCH /api/bookings/:id/confirm`

**Capability requise** : `can_sell` (prestataire uniquement)

Confirme une réservation.

**Response:**

```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "confirmed",
    "message": "Réservation confirmée, chat activé"
  }
}
```

#### `PATCH /api/bookings/:id/complete`

**Capability requise** : `can_sell` (prestataire uniquement)

Marque une réservation comme complétée.

**Response:**

```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "completed",
    "message": "Service terminé, client peut laisser un avis"
  }
}
```

#### `PATCH /api/bookings/:id/cancel`

**Capability requise** : `can_buy` ou `can_sell`

Annule une réservation.

**Response:**

```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "cancelled",
    "message": "Réservation annulée"
  }
}
```

### 3.8 Messagerie (Services uniquement)

#### `POST /api/conversations/create`

**Capability requise** : Aucune (utilisateur authentifié)

Crée une conversation liée à une réservation.

**Request:**

```json
{
  "bookingId": "uuid",
  "otherUserId": "uuid"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "conversationId": "uuid",
    "message": "Conversation créée"
  }
}
```

#### `POST /api/messages/send`

**Capability requise** : Aucune (utilisateur authentifié)

Envoie un message dans une conversation.

**Request:**

```json
{
  "conversationId": "uuid",
  "content": "Bonjour, j'aimerais discuter des détails de la session"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "messageId": "uuid",
    "message": "Message envoyé"
  }
}
```

#### `GET /api/conversations`

**Capability requise** : Aucune (utilisateur authentifié)

Liste les conversations de l'utilisateur.

**Response:**

```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "uuid",
        "otherUser": { "name": "SoundMaster", "avatar": "url" },
        "booking": { "service": "Mix & Mastering Pro" },
        "lastMessage": "Parfait, on se voit samedi",
        "unreadCount": 2
      }
    ]
  }
}
```

#### `GET /api/conversations/:id/messages`

**Capability requise** : Aucune (utilisateur authentifié)

Récupère les messages d'une conversation.

**Response:**

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "senderId": "uuid",
        "content": "Bonjour, j'aimerais discuter des détails",
        "createdAt": "2025-10-27T10:30:00Z",
        "readAt": "2025-10-27T10:35:00Z"
      }
    ]
  }
}
```

### 3.9 Ratings

#### `POST /api/ratings`

**Capability requise** : `can_buy`

Soumet une évaluation après achat (beats/kits) ou réservation complétée (services).

**Request (Beats/Kits):**

```json
{
  "transactionId": "uuid",
  "rating": 5,
  "comment": "Excellent beat, très professionnel!"
}
```

**Request (Services):**

```json
{
  "bookingId": "uuid",
  "rating": 5,
  "comment": "Service de qualité, prestataire très professionnel!"
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
- `SERVICE_NOT_PURCHASABLE` : Tentative d'achat d'un service
- `BOOKING_NOT_FOUND` : Réservation non trouvée
- `BOOKING_ALREADY_CONFIRMED` : Réservation déjà confirmée
- `CHAT_NOT_ALLOWED` : Messagerie non autorisée (beats/kits)

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
- **Contrats** : Accès via presigned GET (TTL 15 minutes)

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

// 3. Finaliser produit (tarification gérée séparément via product_pricing)
await fetch('/api/upload-complete', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({
    title: 'Trap Beat 2025',
    type: 'beat',
    previewKey: 'previews/user123/beat456_preview.mp3',
  }),
});
```

### 7.2 Flow Achat (Beats/Kits)

```typescript
// 1. Initier paiement (inclure pricingId)
const paymentResponse = await fetch('/api/pay', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({
    productId: 'uuid',
    pricingId: 'uuid',
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

### 7.3 Flow Réservation Service

```typescript
// 1. Créer réservation
const bookingResponse = await fetch('/api/bookings/create', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({
    serviceId: 'uuid',
    bookingDate: '2025-11-01T14:00:00Z',
    duration: 120,
    notes: 'Session de mixage pour mon album',
  }),
});

// 2. Prestataire confirme (côté prestataire)
await fetch('/api/bookings/uuid/confirm', {
  method: 'PATCH',
  headers: { Authorization: `Bearer ${providerToken}` },
});

// 3. Créer conversation
const conversationResponse = await fetch('/api/conversations/create', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({
    bookingId: 'uuid',
    otherUserId: 'provider-uuid',
  }),
});

// 4. Échanger messages
await fetch('/api/messages/send', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({
    conversationId: 'uuid',
    content: "Bonjour, j'aimerais discuter des détails",
  }),
});

// 5. Prestataire marque comme complété
await fetch('/api/bookings/uuid/complete', {
  method: 'PATCH',
  headers: { Authorization: `Bearer ${providerToken}` },
});

// 6. Client laisse un avis
await fetch('/api/ratings', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({
    bookingId: 'uuid',
    rating: 5,
    comment: 'Service de qualité, prestataire très professionnel!',
  }),
});
```

---

## 8. Changelog

### v2.3 (2025-10-28)

- **Phase 3 complétée** : ProductCard, SearchBar, AudioPlayer adaptés avec nouveaux composants
- **Tests unitaires** : Mise à jour des tests pour tous les composants Phase 3
- **Stories Storybook** : Mise à jour des stories pour tous les composants Phase 3
- **Documentation** : Mise à jour avec statut des composants Phase 3
- **Architecture** : Composants modulaires et réutilisables avec intégration complète

### v2.2 (2025-10-28)

- **Ajout: Métriques produits** : view_count, download_count, like_count dans les réponses API
- **Nouveau endpoint** : POST /api/products/:id/play pour logger les lectures preview
- **Système de favoris** : Clarification que favoris = likes avec mise à jour du like_count
- **Performance** : Optimisation des réponses avec métriques agrégées

### v2.2 (2025-10-27)

- **Phase 2 complétée** : ServiceCard, PlaylistCard, HeroBanner, FilterPills créés
- **Tests unitaires** : Création des tests pour tous les composants Phase 2
- **Stories Storybook** : Création des stories pour tous les composants Phase 2
- **Documentation** : Mise à jour avec statut des composants Phase 2
- **Architecture** : Composants modulaires et réutilisables

### v2.1 (2025-10-27)

- **Phase 1 complétée** : HeartIcon, PlayButton, MetricItem, ProductMetrics créés
- **Tests unitaires** : Création des tests pour tous les composants Phase 1
- **Stories Storybook** : Création des stories pour tous les composants Phase 1
- **Documentation** : Mise à jour avec statut des composants Phase 1
- **Architecture** : Composants modulaires et réutilisables
- **Nouveaux endpoints réservations** : Système de booking complet pour services
- **Messagerie conditionnelle** : Chat uniquement pour services, pas pour beats/kits
- **Restriction paiements** : Blocage des achats de services via `/api/pay`
- **Ratings étendus** : Support des avis pour services (via réservations)
- **Codes d'erreur** : Ajout des erreurs spécifiques aux services

### v2.0 (2025-10-27)

- Documentation complète selon les règles du projet
- Ajout de tous les endpoints principaux
- Exemples d'utilisation détaillés
- Codes d'erreur et troubleshooting
- Sécurité et webhooks

### v1.0 (2025-10-22)

- Création de la structure de documentation API
- Configuration de la génération automatique
