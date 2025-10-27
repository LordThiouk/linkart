# Linkart — Modèle Services Gratuits

> Version: v1.0 Auteur : Papa Diop Objet : Définir la stratégie business et technique pour les
> services gratuits sur Linkart

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

### 8.1 Table `products` (modifiée)

```sql
-- Ajout distinction claire
ALTER TABLE products ADD COLUMN pricing_type TEXT CHECK (pricing_type IN ('fixed', 'on_demand', 'tiered'));
```

### 8.2 Nouvelle table `service_pricing`

```sql
CREATE TABLE service_pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES products(id),
  tier_name TEXT, -- 'Basic', 'Standard', 'Premium'
  price DECIMAL(10,2),
  duration INTEGER, -- en minutes
  description TEXT, -- 'Mix simple', 'Mix + Mastering'
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 8.3 Nouvelle table `bookings`

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES products(id),
  client_id UUID REFERENCES users(id),
  provider_id UUID REFERENCES users(id),
  booking_date TIMESTAMP,
  duration INTEGER, -- en minutes
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 8.4 Contraintes Transactions

```sql
-- Bloquer transactions pour services
ALTER TABLE transactions ADD CONSTRAINT check_no_service_transactions
CHECK (product_type != 'service');
```

---

## 9. API Endpoints

### 9.1 Réservations

```typescript
// Créer réservation
POST /api/bookings/create
{
  service_id: string,
  booking_date: string,
  duration: number,
  notes?: string
}

// Lister réservations utilisateur
GET /api/bookings?user_id=xxx&status=xxx

// Confirmer réservation (prestataire)
PATCH /api/bookings/:id/confirm

// Marquer complété (prestataire)
PATCH /api/bookings/:id/complete

// Annuler réservation
PATCH /api/bookings/:id/cancel
```

### 9.2 Messagerie

```typescript
// Créer conversation (liée à réservation)
POST /api/conversations/create
{
  booking_id: string,
  other_user_id: string
}

// Envoyer message
POST /api/messages/send
{
  conversation_id: string,
  content: string
}

// Lister conversations
GET /api/conversations

// Lister messages conversation
GET /api/conversations/:id/messages
```

### 9.3 Restrictions Paiement

```typescript
// POST /api/pay - MODIFIÉ
// Bloquer pour type='service'
{
  "error": "Services cannot be purchased through Linkart. Use booking system instead."
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

### 11.1 Scénario : Studio Enregistrement

**Prestataire :** Studio "SoundWave Dakar" **Service :** Enregistrement vocal + instruments **Tarif
:** 15,000F/heure (prix fixe)

**Flow :**

1. Client réserve créneau 2h samedi 14h
2. Studio confirme réservation
3. Chat activé pour coordonner détails
4. Paiement 30,000F en cash à l'arrivée
5. Service terminé, client laisse avis 5 étoiles

### 11.2 Scénario : Ingénieur Multi-Tarifs

**Prestataire :** "MixMaster Pro" **Service :** Mix & Mastering **Tarifs :** 3 tiers
(Basic/Standard/Premium)

**Flow :**

1. Client choisit tier "Standard" (35,000F)
2. Réservation créée pour 4h de travail
3. Chat pour échanger fichiers et instructions
4. Paiement Wave direct vers prestataire
5. Livraison fichiers finaux, avis positif

---

## 12. Roadmap Évolution

### 12.1 Phase 1 (MVP)

- ✅ Services gratuits avec réservation
- ✅ Messagerie conditionnelle
- ✅ Système d'avis
- ✅ Tarification flexible

### 12.2 Phase 2 (Amélioration)

- 📅 Calendrier intégré
- 📅 Notifications push
- 📅 Système de disponibilités avancé
- 📅 Analytics prestataires

### 12.3 Phase 3 (Monétisation Optionnelle)

- 🔮 Commission optionnelle services (si demande)
- 🔮 Abonnements premium prestataires
- 🔮 Services marketplace avancés
- 🔮 Intégration paiements externes

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

Cette stratégie positionne Linkart comme la plateforme de référence pour tous les acteurs de
l'industrie musicale sénégalaise, avec un modèle économique durable et évolutif.
