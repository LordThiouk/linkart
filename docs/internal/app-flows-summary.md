# Linkart — Résumé des Flows Nécessaires

> Version: v1.0  
> Date: 2025-01-27  
> Objectif: Lister et compter tous les flows fonctionnels nécessaires pour l'application Linkart

---

## 📊 Vue d'ensemble

**Total de flows principaux : 19 flows majeurs**

Répartition :

- **5 flows** utilisateur de base (onboarding, marketplace, détails, etc.)
- **4 flows** produits/vendeurs (upload, configuration, dashboard, activation)
- **3 flows** services (publication, réservation, configuration)
- **2 flows** paiements (checkout beats/kits, boosts)
- **2 flows** communications (messagerie services, favoris)
- **1 flow** playlists (éditoriales admin + consommation user)
- **1 flow** wallet (beats/kits uniquement)
- **1 flow** admin (validation, modération)

---

## 🔐 1. Flows Authentification & Onboarding

### 1.1 Onboarding Flow

- **Étapes** : Splash → Sign In/Sign Up → OTP → Profile Setup → Home
- **Complexité** : Moyenne
- **Priorité** : 🔴 Critique (MVP)

### 1.2 Profile Setup Flow

- **Étapes** : Création profil minimal → Activation capabilities → Configuration
- **Complexité** : Simple
- **Priorité** : 🔴 Critique (MVP)

---

## 🏠 2. Flows Marketplace & Découverte

### 2.1 Home / Marketplace Flow

- **Étapes** : Liste produits → Filtres → Recherche → Navigation
- **Complexité** : Moyenne
- **Priorité** : 🔴 Critique (MVP)

### 2.2 Product Detail Flow

- **Étapes** : Affichage détail → Preview → Infos vendeur → Ratings → Actions
- **Complexité** : Simple
- **Priorité** : 🔴 Critique (MVP)

### 2.3 Search & Filters Flow

- **Étapes** : Recherche → Filtres → Résultats → Navigation
- **Complexité** : Simple
- **Priorité** : 🟡 Important (MVP+)

---

## 💰 3. Flows Paiement & Transaction (Beats/Kits uniquement)

### 3.1 Checkout Flow (Beats & Kits)

- **Étapes** : Sélection licence → Choix paiement → Résumé → Paiement → Confirmation
- **Complexité** : Élevée
- **Priorité** : 🔴 Critique (MVP)

### 3.2 Contract Generation Flow

- **Étapes** : Génération PDF → Stockage R2 → Attribution URL → Affichage
- **Complexité** : Moyenne
- **Priorité** : 🔴 Critique (MVP)

### 3.3 Download Flow (Beats & Kits uniquement)

- **Étapes** : Demande téléchargement → Vérification → Génération URL → Download
- **Complexité** : Moyenne
- **Priorité** : 🔴 Critique (MVP)

### 3.4 Escrow Flow (Beats & Kits uniquement)

- **Étapes** : Paiement → Blocage fonds → Validation → Libération → Commission
- **Complexité** : Élevée
- **Priorité** : 🔴 Critique (MVP)

---

## 📤 4. Flows Vendeur / Créateur

### 4.1 Activer Mode Vendeur Flow

- **Étapes** : Demande activation → Validation admin → Activation capabilities
- **Complexité** : Simple
- **Priorité** : 🔴 Critique (MVP)

### 4.2 Upload Produit Flow

- **Étapes** : Choix type → Formulaire → Upload preview → Upload fichier → Configuration licences →
  Soumission
- **Complexité** : Moyenne
- **Priorité** : 🔴 Critique (MVP)

### 4.3 Dashboard Créateur Flow

- **Étapes** : Vues ventes → Statistiques → Historique → Gestion produits
- **Complexité** : Simple
- **Priorité** : 🟡 Important (MVP+)

### 4.4 Configuration Multi-Licences Flow

- **Étapes** : Définition prix → Configuration termes → Validation → Activation
- **Complexité** : Moyenne
- **Priorité** : 🔴 Critique (MVP)

---

## 🎯 5. Flows Services (Gratuits)

### 5.1 Publication Service Flow

- **Étapes** : Configuration type → Tarification → Portfolio → Disponibilités → Soumission
- **Complexité** : Moyenne
- **Priorité** : 🟡 Important (Phase 2)

### 5.2 Service Booking Flow

- **Étapes** : Sélection service → Consultation tarifs → Demande → Confirmation → Activation chat
- **Complexité** : Élevée
- **Priorité** : 🟡 Important (Phase 2)

### 5.3 Configuration Services Flow (Multi-Tiers)

- **Étapes** : Type tarification → Prix fixe/à la demande/multi-tiers → Disponibilités → Portfolio
- **Complexité** : Moyenne
- **Priorité** : 🟡 Important (Phase 2)

---

## 💬 6. Flows Communication

### 6.1 Messaging Flow (Services uniquement)

- **Étapes** : Activation chat → Échange messages → Coordination → Finalisation
- **Complexité** : Moyenne
- **Priorité** : 🟡 Important (Phase 2)

### 6.2 Favorites Flow (Système de Likes)

- **Étapes** : Toggle favorite → Interface optimiste → Synchronisation → Rollback si erreur
- **Complexité** : Simple
- **Priorité** : 🟢 Optionnel (Phase 2)

---

## 🎵 7. Flows Playlists

### 7.1 Playlists Flow (Admin + User)

- **Étapes Admin** : Création → Ajout beats → Ordre → Publication
- **Étapes User** : Découverte → Lecture → Contrôles → Favoris → Achat
- **Complexité** : Moyenne
- **Priorité** : 🟢 Optionnel (Phase 2)

---

## 💳 8. Flows Wallet & Retraits (Beats/Kits uniquement)

### 8.1 Wallet Flow

- **Étapes** : Affichage solde → Historique → Demandes retrait → Validation admin
- **Complexité** : Moyenne
- **Priorité** : 🔴 Critique (MVP)

### 8.2 Withdrawal Flow

- **Étapes** : Demande retrait → Validation admin → Paiement → Confirmation
- **Complexité** : Moyenne
- **Priorité** : 🔴 Critique (MVP)

---

## 🚀 9. Flows Boosts

### 9.1 Boost Flow

- **Étapes** : Sélection produit/profil → Choix durée → Paiement → Activation → Affichage
  prioritaire
- **Complexité** : Simple
- **Priorité** : 🟡 Important (MVP+)

---

## 👨‍💼 10. Flows Admin

### 10.1 Admin Dashboard Flow

- **Étapes** : Vue produits pending → Signalements → Transactions → Actions validation
- **Complexité** : Élevée
- **Priorité** : 🔴 Critique (MVP)

### 10.2 Admin Validation Flow

- **Étapes** : Revie produit/service → Approbation/Rejet → Notification → Mise à jour statut
- **Complexité** : Simple
- **Priorité** : 🔴 Critique (MVP)

---

## 📈 Résumé par Priorité

### 🔴 Critique (MVP) - 11 flows

1. Onboarding Flow
2. Home / Marketplace Flow
3. Product Detail Flow
4. Checkout Flow (Beats & Kits)
5. Contract Generation Flow
6. Download Flow
7. Escrow Flow
8. Activer Mode Vendeur Flow
9. Upload Produit Flow
10. Wallet Flow
11. Admin Dashboard Flow

### 🟡 Important (MVP+) - 6 flows

1. Search & Filters Flow
2. Dashboard Créateur Flow
3. Configuration Multi-Licences Flow
4. Publication Service Flow
5. Service Booking Flow
6. Configuration Services Flow

### 🟢 Optionnel (Phase 2+) - 2 flows

1. Favorites Flow
2. Playlists Flow

---

## 🎯 Répartition par Complexité

| Complexité  | Nombre | Flows                                                                                                                                     |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Simple**  | 7      | Onboarding, Product Detail, Activer Vendeur, Dashboard, Boosts, Admin Validation, Favorites                                               |
| **Moyenne** | 10     | Profile Setup, Marketplace, Upload, Contract, Download, Wallet, Configuration Licences, Services Publication, Services Booking, Messaging |
| **Élevée**  | 2      | Checkout/Escrow, Admin Dashboard                                                                                                          |

---

## 📋 Checklist Implémentation

### Phase 1 - MVP (Critique)

- [ ] Onboarding Flow
- [ ] Home / Marketplace Flow
- [ ] Product Detail Flow
- [ ] Checkout Flow (Beats & Kits)
- [ ] Contract Generation Flow
- [ ] Download Flow
- [ ] Escrow Flow
- [ ] Activer Mode Vendeur Flow
- [ ] Upload Produit Flow
- [ ] Wallet Flow
- [ ] Admin Dashboard Flow

### Phase 2 - MVP+ (Important)

- [ ] Search & Filters Flow
- [ ] Dashboard Créateur Flow
- [ ] Configuration Multi-Licences Flow
- [ ] Publication Service Flow
- [ ] Service Booking Flow
- [ ] Configuration Services Flow

### Phase 3 - Enhancements (Optionnel)

- [ ] Favorites Flow
- [ ] Playlists Flow

---

## 🔗 Références

- **Document complet** : `.cursor/rules/app_flow_document.mdc`
- **Flowchart visuel** : `.cursor/rules/app_flowchart.mdc`
- **Documentation produit** : `docs/product/README.md`

---

## 📝 Notes

- **Séparation claire** : Produits (beats/kits payants) vs Services (gratuits)
- **Escrow uniquement** : Beats/Kits uniquement, pas pour services
- **Messagerie conditionnelle** : Chat uniquement pour services
- **Multi-pricing** : Système flexible pour licences (produits) et tiers (services)
