# Linkart — Modèle Services Gratuits

> Version: v2.0 Auteur : Papa Diop Objet : Définir la stratégie business et technique pour les
> services gratuits sur Linkart
>
> **Architecture v2.0**: Séparation claire entre Products (beats/kits payants) et Services
> (professionnels gratuits) avec système multi-pricing pour les deux.

---

## 1. Vision Stratégique

### 1.1 Rationale Business

**Objectif :** Acquisition massive d'utilisateurs via services gratuits pour créer un écosystème
complet musique.

**Stratégie :**

- Services = **levier d'acquisition** (gratuits, attractifs)
- Beats/Kits = **monétisation** (commission 5%)
- Écosystème = **valeur réseau** (tous les acteurs sur une plateforme)

### 1.2 Avantages Concurrentiels

| Avantage            | Description                                    |
| ------------------- | ---------------------------------------------- |
| **Acquisition**     | Services gratuits attirent plus d'utilisateurs |
| **Rétention**       | Écosystème complet (beats + services)          |
| **Données**         | Insights marché précieux (demandes services)   |
| **Différenciation** | Seule plateforme avec services gratuits        |
| **Scalabilité**     | Possibilité monétiser services plus tard       |

---

## 2. Types de Services

### 2.1 Services Éligibles

**Critères :**

- Services audio professionnels
- Prestations créatives musicales
- Expertise technique sonore

**Exemples :**

- Mixage audio
- Mastering
- Enregistrement studio
- Production musicale
- Coaching vocal
- Arrangement musical
- Sound design

### 2.2 Services Exclus

**Non autorisés :**

- Services non-audio (graphisme, vidéo)
- Services illégaux ou douteux
- Vente de matériel physique
- Services de streaming ou distribution

---

## 3. Modèles de Tarification

### 3.1 Prix Fixe

**Description :** Tarif unique pour le service

**Exemples :**

- Studio enregistrement : 15,000F/heure
- Mastering simple : 25,000F/titre
- Mixage standard : 20,000F/titre

**Configuration :**

```json
{
  "pricing_type": "fixed",
  "price": 15000,
  "currency": "XOF",
  "unit": "hour"
}
```

### 3.2 À la Demande

**Description :** Prix négocié selon le projet

**Exemples :**

- "Contactez-moi pour devis"
- "Prix selon complexité"
- "Négociation possible"

**Configuration :**

```json
{
  "pricing_type": "on_demand",
  "description": "Contactez-moi pour devis personnalisé"
}
```

### 3.3 Multi-Tarifs (Tiers)

**Description :** Plusieurs options tarifaires

**Exemples :** **Ingénieur Son - Mix & Mastering :**

- Tier 1 "Basic Mix" : 20,000F (2h, mix simple)
- Tier 2 "Standard" : 35,000F (4h, mix + mastering)
- Tier 3 "Premium" : 50,000F (6h, mix + mastering + révisions)

**Configuration :**

```json
{
  "pricing_type": "tiered",
  "tiers": [
    {
      "name": "Basic Mix",
      "price": 20000,
      "duration": 120,
      "description": "Mix simple, 2h de travail"
    },
    {
      "name": "Standard",
      "price": 35000,
      "duration": 240,
      "description": "Mix + Mastering, 4h de travail"
    },
    {
      "name": "Premium",
      "price": 50000,
      "duration": 360,
      "description": "Mix + Mastering + Révisions, 6h de travail"
    }
  ]
}
```

---

## 4. Système de Réservation

### 4.1 Flow Réservation

1. **Client** parcourt services disponibles
2. **Client** sélectionne créneau disponible
3. **Client** crée réservation (statut: `pending`)
4. **Prestataire** reçoit notification
5. **Prestataire** confirme ou refuse (statut: `confirmed` ou `cancelled`)
6. **Prestataire** marque comme complété (statut: `completed`)
7. **Client** peut laisser un avis

### 4.2 États de Réservation

| État        | Description               | Actions possibles                  |
| ----------- | ------------------------- | ---------------------------------- |
| `pending`   | En attente confirmation   | Prestataire peut confirmer/refuser |
| `confirmed` | Confirmée par prestataire | Prestataire peut marquer complété  |
| `completed` | Service terminé           | Client peut laisser avis           |
| `cancelled` | Annulée                   | Aucune action                      |

### 4.3 Gestion Disponibilités

**Options :**

- Calendrier intégré (recommandé)
- Disponibilités par créneaux
- Système de demande de disponibilité

---

## 5. Système de Messagerie

### 5.1 Règles de Messagerie

**Principe :** Protection des revenus beats/kits

#### Pour Services (gratuits)

- ✅ Chat 1-to-1 illimité activé
- ✅ Négociation prix/horaires autorisée
- ✅ Échange coordonnées permis
- ✅ Lié à chaque réservation

#### Pour Beats/Kits (commission 5%)

- ❌ PAS de messagerie avant achat
- ✅ Preview 30s + fiche détaillée = info suffisante
- ✅ Contact uniquement via système d'avis après achat
- ✅ Protection contre ventes hors plateforme

### 5.2 Architecture Messagerie

**Tables :**

```sql
-- Conversations uniquement pour réservations
CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  user1_id UUID REFERENCES users(id),
  user2_id UUID REFERENCES users(id),
  related_to_type TEXT CHECK (related_to_type = 'booking'),
  related_to_id UUID REFERENCES bookings(id),
  created_at TIMESTAMP
);

-- Messages dans conversations
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  sender_id UUID REFERENCES users(id),
  content TEXT,
  read_at TIMESTAMP,
  created_at TIMESTAMP
);
```

---

## 6. Paiements et Transactions

### 6.1 Principe : Pas de Transaction Plateforme

**Services :**

- ❌ Aucune transaction sur Linkart
- ✅ Paiements externes (Wave direct, cash, virement)
- ✅ Négociation libre entre client/prestataire
- ✅ Pas de commission Linkart

**Beats/Kits :**

- ✅ Transactions obligatoires sur Linkart
- ✅ Commission 5% automatique
- ✅ Protection escrow

### 6.2 Méthodes de Paiement Services

**Recommandées :**

- Wave Money (direct prestataire)
- Orange Money (direct prestataire)
- Virement bancaire
- Espèces (rencontre physique)

**Non autorisées :**

- Paiement via Linkart (pour services)

---

## 7. Système d'Avis

### 7.1 Avis Services

**Fonctionnement :**

- Avis possible après réservation `completed`
- Note 1-5 étoiles + commentaire
- Visible sur profil prestataire
- Pas de transaction requise

**Protection :**

- Avis uniquement si réservation confirmée
- Possibilité signalement abus
- Modération admin

### 7.2 Avis Beats/Kits

**Fonctionnement :**

- Avis après achat confirmé
- Note 1-5 étoiles + commentaire
- Visible sur produit et profil
- Transaction requise

---

## 8. Modèle de Données

### 8.1 Table `services` (nouvelle)

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('mixing', 'mastering', 'recording', 'production', 'coaching', 'arrangement', 'sound_design')),
  portfolio_keys TEXT[], -- Array des clés R2 pour les exemples
  status TEXT CHECK (status IN ('pending', 'active', 'rejected')) DEFAULT 'pending',
  metadata JSONB, -- Informations supplémentaires (équipements, expérience, etc.)
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX idx_services_provider_id ON services(provider_id);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_status ON services(status);
```

### 8.2 Table `service_pricing` (détaillée)

```sql
CREATE TABLE service_pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE NOT NULL,
  tier_name TEXT NOT NULL, -- 'Basic Mix', 'Standard', 'Premium', etc.
  price DECIMAL(10,2), -- NULL si is_on_demand = true
  description TEXT NOT NULL, -- Description détaillée du tier
  duration_estimate INTEGER, -- Durée estimée en minutes
  is_on_demand BOOLEAN DEFAULT false, -- true pour "Contactez-moi"
  display_order INTEGER DEFAULT 0, -- Ordre d'affichage
  is_available BOOLEAN DEFAULT true, -- Disponibilité du tier
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX idx_service_pricing_service_id ON service_pricing(service_id);
CREATE INDEX idx_service_pricing_display_order ON service_pricing(service_id, display_order);
CREATE INDEX idx_service_pricing_available ON service_pricing(is_available);

-- Contraintes
ALTER TABLE service_pricing ADD CONSTRAINT check_price_or_on_demand
CHECK ((price IS NOT NULL AND is_on_demand = false) OR (price IS NULL AND is_on_demand = true));

ALTER TABLE service_pricing ADD CONSTRAINT check_positive_price
CHECK (price IS NULL OR price > 0);
```

### 8.3 Table `bookings` (détaillée)

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) NOT NULL,
  pricing_tier_id UUID REFERENCES service_pricing(id), -- NULL si on_demand
  client_id UUID REFERENCES users(id) NOT NULL,
  provider_id UUID REFERENCES users(id) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  scheduled_at TIMESTAMP, -- Date/heure prévue
  completed_at TIMESTAMP, -- Date/heure de completion
  negotiated_price DECIMAL(10,2), -- Prix négocié si on_demand
  notes TEXT, -- Notes du client
  client_notes TEXT, -- Notes du prestataire
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX idx_bookings_service_id ON bookings(service_id);
CREATE INDEX idx_bookings_client_id ON bookings(client_id);
CREATE INDEX idx_bookings_provider_id ON bookings(provider_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_at ON bookings(scheduled_at);

-- Contraintes
ALTER TABLE bookings ADD CONSTRAINT check_negotiated_price_positive
CHECK (negotiated_price IS NULL OR negotiated_price > 0);

ALTER TABLE bookings ADD CONSTRAINT check_scheduled_future
CHECK (scheduled_at IS NULL OR scheduled_at > NOW());
```

### 8.4 Tables `conversations` et `messages` (détaillées)

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('active', 'closed')) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX idx_conversations_booking_id ON conversations(booking_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
```

### 8.5 Contraintes de Séparation Products/Services

```sql
-- Vérifier que les transactions ne référencent jamais de services
ALTER TABLE transactions ADD CONSTRAINT check_no_service_transactions
CHECK (product_id IS NOT NULL AND service_id IS NULL);

-- Vérifier que les bookings ne référencent jamais de products
ALTER TABLE bookings ADD CONSTRAINT check_no_product_bookings
CHECK (service_id IS NOT NULL AND product_id IS NULL);

-- Vérifier que les ratings peuvent être pour products OU services, mais pas les deux
ALTER TABLE ratings ADD CONSTRAINT check_rating_target
CHECK (
  (product_id IS NOT NULL AND booking_id IS NULL) OR
  (product_id IS NULL AND booking_id IS NOT NULL)
);
```

---

## 9. API Endpoints

### 9.1 Services Management

```typescript
// Créer un service
POST /api/services/create
{
  title: string,
  description: string,
  category: 'mixing' | 'mastering' | 'recording' | 'production' | 'coaching' | 'arrangement' | 'sound_design',
  portfolio_keys?: string[], // Clés R2 des exemples
  metadata?: {
    equipment?: string[],
    experience_years?: number,
    specializations?: string[]
  }
}

// Lister les services disponibles
GET /api/services?category=mixing&status=active&page=1&limit=20

// Récupérer un service spécifique
GET /api/services/:id

// Mettre à jour un service
PATCH /api/services/:id
{
  title?: string,
  description?: string,
  status?: 'active' | 'inactive',
  metadata?: object
}
```

### 9.2 Service Pricing Management

```typescript
// Créer un tier de pricing
POST /api/services/:id/pricing
{
  tier_name: string,
  price?: number, // NULL si is_on_demand = true
  description: string,
  duration_estimate?: number, // en minutes
  is_on_demand?: boolean,
  display_order?: number
}

// Lister les pricing d'un service
GET /api/services/:id/pricing

// Mettre à jour un tier
PATCH /api/services/:id/pricing/:pricingId
{
  tier_name?: string,
  price?: number,
  description?: string,
  duration_estimate?: number,
  is_on_demand?: boolean,
  display_order?: number,
  is_available?: boolean
}

// Supprimer un tier
DELETE /api/services/:id/pricing/:pricingId
```

### 9.3 Bookings Management

```typescript
// Créer une réservation
POST /api/bookings/create
{
  service_id: string,
  pricing_tier_id?: string, // NULL si on_demand
  scheduled_at: string, // ISO date
  notes?: string
}

// Lister les réservations
GET /api/bookings?user_id=xxx&status=pending&page=1&limit=20

// Confirmer une réservation (prestataire)
PATCH /api/bookings/:id/confirm
{
  client_notes?: string
}

// Marquer comme complété (prestataire)
PATCH /api/bookings/:id/complete
{
  completion_notes?: string
}

// Annuler une réservation
PATCH /api/bookings/:id/cancel
{
  reason?: string
}
```

### 9.4 Messaging System

```typescript
// Créer une conversation (automatique après confirmation)
POST /api/conversations/create
{
  booking_id: string
}

// Envoyer un message
POST /api/conversations/:id/messages
{
  content: string
}

// Lister les conversations
GET /api/conversations?user_id=xxx&status=active

// Lister les messages d'une conversation
GET /api/conversations/:id/messages?page=1&limit=50

// Marquer un message comme lu
PATCH /api/messages/:id/read
```

### 9.5 Restrictions Paiement

```typescript
// POST /api/pay - MODIFIÉ pour bloquer les services
{
  "error": "SERVICE_NOT_PURCHASABLE",
  "message": "Services cannot be purchased through Linkart. Use booking system instead.",
  "code": "SERVICE_NOT_PURCHASABLE"
}
```

---

## 10. Métriques et KPIs

### 10.1 Métriques Services

| Métrique                | Description                    | Objectif               |
| ----------------------- | ------------------------------ | ---------------------- |
| **Réservations créées** | Nombre total réservations      | Croissance acquisition |
| **Taux confirmation**   | % réservations confirmées      | Qualité prestataires   |
| **Taux completion**     | % services terminés            | Satisfaction client    |
| **Temps réponse**       | Temps confirmation prestataire | Expérience utilisateur |
| **Avis moyens**         | Note moyenne services          | Qualité écosystème     |

### 10.2 Métriques Business

| Métrique                        | Description                                | Objectif      |
| ------------------------------- | ------------------------------------------ | ------------- |
| **Conversion services → beats** | % utilisateurs services qui achètent beats | Cross-selling |
| **Rétention utilisateurs**      | % utilisateurs actifs mois suivant         | Engagement    |
| **Croissance utilisateurs**     | Nouveaux utilisateurs/mois                 | Acquisition   |

---

## 11. Exemples Concrets

### 11.1 Scénario : Studio Enregistrement (Prix Fixe)

**Prestataire :** Studio "SoundWave Dakar"  
**Service :** Enregistrement vocal + instruments  
**Tarif :** 15,000F/heure (prix fixe)

**Configuration Service :**

```json
{
  "title": "Enregistrement Studio Professionnel",
  "description": "Studio équipé avec matériel professionnel pour enregistrement vocal et instrumental",
  "category": "recording",
  "portfolio_keys": ["studio_example_1.mp3", "studio_example_2.mp3"],
  "metadata": {
    "equipment": ["Pro Tools", "Neumann U87", "SSL Console"],
    "experience_years": 8,
    "specializations": ["Hip-Hop", "Afrobeat", "R&B"]
  }
}
```

**Configuration Pricing :**

```json
{
  "tier_name": "Enregistrement Standard",
  "price": 15000,
  "description": "Enregistrement vocal + instruments, mixage de base inclus",
  "duration_estimate": 60,
  "is_on_demand": false,
  "display_order": 1
}
```

**Flow Réservation :**

1. Client réserve créneau 2h samedi 14h
2. Studio confirme réservation
3. Chat activé pour coordonner détails
4. Paiement 30,000F en cash à l'arrivée
5. Service terminé, client laisse avis 5 étoiles

### 11.2 Scénario : Ingénieur Multi-Tarifs

**Prestataire :** "MixMaster Pro"  
**Service :** Mix & Mastering  
**Tarifs :** 3 tiers (Basic/Standard/Premium)

**Configuration Service :**

```json
{
  "title": "Mix & Mastering Professionnel",
  "description": "Services de mixage et mastering pour tous genres musicaux",
  "category": "mixing",
  "portfolio_keys": ["mix_example_1.mp3", "master_example_1.mp3"],
  "metadata": {
    "equipment": ["Pro Tools", "Waves", "FabFilter"],
    "experience_years": 12,
    "specializations": ["Electronic", "Hip-Hop", "Pop"]
  }
}
```

**Configuration Pricing Multi-Tiers :**

```json
[
  {
    "tier_name": "Basic Mix",
    "price": 20000,
    "description": "Mix simple, 2h de travail, 1 révision incluse",
    "duration_estimate": 120,
    "is_on_demand": false,
    "display_order": 1
  },
  {
    "tier_name": "Standard",
    "price": 35000,
    "description": "Mix + Mastering, 4h de travail, 2 révisions incluses",
    "duration_estimate": 240,
    "is_on_demand": false,
    "display_order": 2
  },
  {
    "tier_name": "Premium",
    "price": 50000,
    "description": "Mix + Mastering + Révisions illimitées, 6h de travail",
    "duration_estimate": 360,
    "is_on_demand": false,
    "display_order": 3
  }
]
```

**Flow Réservation :**

1. Client choisit tier "Standard" (35,000F)
2. Réservation créée pour 4h de travail
3. Chat pour échanger fichiers et instructions
4. Paiement Wave direct vers prestataire
5. Livraison fichiers finaux, avis positif

### 11.3 Scénario : Service À la Demande

**Prestataire :** "SoundDesign Studio"  
**Service :** Sound Design sur mesure  
**Tarif :** À la demande

**Configuration Pricing :**

```json
{
  "tier_name": "Sound Design Personnalisé",
  "price": null,
  "description": "Création d'effets sonores sur mesure selon vos besoins",
  "duration_estimate": null,
  "is_on_demand": true,
  "display_order": 1
}
```

**Flow Réservation :**

1. Client fait une demande de réservation
2. Prestataire confirme et active le chat
3. Négociation du prix via messagerie (ex: 25,000F)
4. Confirmation du prix et des détails
5. Service effectué, paiement direct
6. Avis et évaluation

---

## 12. Roadmap Évolution

### 12.1 Phase 1 (MVP) - ✅ Complété

- ✅ Services gratuits avec réservation
- ✅ Messagerie conditionnelle
- ✅ Système d'avis
- ✅ Tarification flexible (prix fixe, à la demande, multi-tiers)
- ✅ Architecture séparée Products/Services
- ✅ Système multi-pricing complet

### 12.2 Phase 2 (Amélioration) - 📅 En cours

- 📅 Calendrier intégré avec disponibilités
- 📅 Notifications push pour réservations
- 📅 Système de disponibilités avancé
- 📅 Analytics prestataires détaillés
- 📅 Système de réputation avancé

### 12.3 Phase 3 (Monétisation Optionnelle) - 🔮 Futur

- 🔮 Commission optionnelle services (si demande)
- 🔮 Abonnements premium prestataires
- 🔮 Services marketplace avancés
- 🔮 Intégration paiements externes
- 🔮 Système de recommandations IA

---

## 13. Risques et Mitigation

### 13.1 Risques Identifiés

| Risque                       | Impact                    | Mitigation                  |
| ---------------------------- | ------------------------- | --------------------------- |
| **Prestataires non sérieux** | Mauvaise expérience       | Système d'avis + modération |
| **Paiements non honorés**    | Conflits clients          | CGU claires + médiation     |
| **Spam réservations**        | Perturbation prestataires | Limite réservations/client  |
| **Services hors scope**      | Dilution plateforme       | Modération + guidelines     |

### 13.2 Mesures de Protection

- **Modération active** des services publiés
- **Système de signalement** pour abus
- **Limites techniques** (réservations simultanées)
- **CGU spécifiques** services gratuits

---

## 14. Conclusion

Le modèle services gratuits de Linkart vise à créer un écosystème musical complet où :

- **Services** = Acquisition et rétention utilisateurs
- **Beats/Kits** = Monétisation et revenus
- **Messagerie** = Protection revenus + facilitation services
- **Avis** = Qualité et confiance écosystème
- **Multi-pricing** = Flexibilité et personnalisation
- **Architecture séparée** = Sécurité et évolutivité

Cette stratégie positionne Linkart comme la plateforme de référence pour tous les acteurs de
l'industrie musicale sénégalaise, avec un modèle économique durable et évolutif.

**Avantages techniques :**

- Séparation claire des responsabilités
- Système multi-pricing flexible
- Messagerie conditionnelle sécurisée
- Architecture évolutive et maintenable
