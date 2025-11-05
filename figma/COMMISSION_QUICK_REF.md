# 💰 Commission - Référence Rapide

## 🎯 Règle d'Or

> **L'acheteur paie le prix affiché. Point final.**
>
> La commission de 5% est **déduite du vendeur**, pas ajoutée à l'acheteur.

---

## 📊 Tableau Rapide

| Produit        | Prix Affiché | Acheteur Paie | Vendeur Reçoit  | Plateforme    |
| -------------- | ------------ | ------------- | --------------- | ------------- |
| Beat Basic     | 29 000 F     | **29 000 F**  | 27 550 F (95%)  | 1 450 F (5%)  |
| Beat Premium   | 49 000 F     | **49 000 F**  | 46 550 F (95%)  | 2 450 F (5%)  |
| Beat Exclusive | 299 000 F    | **299 000 F** | 284 050 F (95%) | 14 950 F (5%) |
| Service Mixing | 50 000 F     | **50 000 F**  | 50 000 F (100%) | 0 F (0%)      |

---

## 🔢 Formules

### Pour l'Acheteur

```
Total à payer = Prix affiché - Promo (si applicable)
```

### Pour le Vendeur

```
Montant reçu = Prix final × 0.95  (beats/kits)
Montant reçu = Prix final × 1.00  (services)
```

### Pour la Plateforme

```
Commission = Prix final × 0.05  (beats/kits)
Commission = 0                   (services)
```

---

## 💡 Exemples Concrets

### Exemple 1 : Beat sans promo

```
Beat "Midnight Vibes" - Premium
Prix:           49 000 F
Promo:               0 F
─────────────────────────
Acheteur paie:  49 000 F ✅

Split:
→ Vendeur:      46 550 F (95%)
→ Plateforme:    2 450 F (5%)
```

### Exemple 2 : Beat avec promo LINKART10

```
Beat "Midnight Vibes" - Premium
Prix:           49 000 F
Promo (-10%):  - 4 900 F
─────────────────────────
Acheteur paie:  44 100 F ✅

Split:
→ Vendeur:      41 895 F (95% de 44 100)
→ Plateforme:    2 205 F (5% de 44 100)
```

### Exemple 3 : Service (gratuit plateforme)

```
Service "Mixing Pro" - Standard
Prix:           50 000 F
Promo:               0 F
─────────────────────────
Acheteur paie:  50 000 F ✅

Split:
→ Prestataire:  50 000 F (100%)
→ Plateforme:        0 F (0%)
```

---

## 🎨 UI Messages

### Checkout Screen

```
💡 Aucun frais supplémentaire.
   La commission de 5% est déduite du vendeur.
```

### Info Banner

```
🔒 Paiement transparent
Vous payez exactement le prix affiché.
Après paiement, vous recevrez immédiatement
votre contrat de licence et vos fichiers.
```

### Seller Dashboard

```
📊 Vos Revenus
Prix affiché:  49 000 F
Vous recevez:  46 550 F (95%)
Commission:     2 450 F (5%)
```

---

## 🔐 Backend Logic

### TypeScript Implementation

```typescript
interface PurchaseCalculation {
  displayPrice: number; // Prix affiché au public
  promoDiscount: number; // Réduction promo (0 si aucune)
  buyerAmount: number; // Ce que l'acheteur paie
  sellerAmount: number; // Ce que le vendeur reçoit
  platformFee: number; // Commission plateforme
}

function calculatePurchase(
  displayPrice: number,
  promoPercent: number = 0,
  productType: 'beat' | 'service'
): PurchaseCalculation {
  const promoDiscount = Math.round(displayPrice * promoPercent);
  const buyerAmount = displayPrice - promoDiscount;

  if (productType === 'service') {
    return {
      displayPrice,
      promoDiscount,
      buyerAmount,
      sellerAmount: buyerAmount,
      platformFee: 0,
    };
  }

  // Beat/Kit avec commission 5%
  const platformFee = Math.round(buyerAmount * 0.05);
  const sellerAmount = buyerAmount - platformFee;

  return {
    displayPrice,
    promoDiscount,
    buyerAmount,
    sellerAmount,
    platformFee,
  };
}

// Exemples
calculatePurchase(49000, 0, 'beat');
// → { buyerAmount: 49000, sellerAmount: 46550, platformFee: 2450 }

calculatePurchase(49000, 0.1, 'beat');
// → { buyerAmount: 44100, sellerAmount: 41895, platformFee: 2205 }

calculatePurchase(50000, 0, 'service');
// → { buyerAmount: 50000, sellerAmount: 50000, platformFee: 0 }
```

---

## ✅ Validation Checklist

### Frontend

- [ ] Prix affiché = prix payé par acheteur
- [ ] Aucune ligne "frais plateforme" visible
- [ ] Message transparence affiché
- [ ] Promo appliquée sur prix de base
- [ ] Total calculé correctement

### Backend

- [ ] buyerAmount = displayPrice - promo
- [ ] sellerAmount = buyerAmount × 0.95 (beats)
- [ ] platformFee = buyerAmount × 0.05 (beats)
- [ ] sellerAmount = buyerAmount (services)
- [ ] Validation: buyerAmount = sellerAmount + platformFee

### UX

- [ ] Pas de surprise au paiement
- [ ] Message clair et rassurant
- [ ] Transparence totale
- [ ] Expérience fluide

---

## 🚫 À NE PAS FAIRE

❌ **Ajouter commission au prix acheteur**

```
// MAUVAIS
const total = basePrice + commission;
```

❌ **Afficher "Frais plateforme" au checkout**

```
// MAUVAIS
Frais plateforme: 2 450 F (5%)
```

❌ **Surprendre l'acheteur**

```
// MAUVAIS
Prix: 49 000 F
[Au paiement] Total: 51 450 F ← SURPRISE!
```

---

## ✅ À FAIRE

✅ **Prix affiché = Prix payé**

```typescript
// BON
const total = basePrice - promoDiscount;
```

✅ **Être transparent**

```
// BON
💡 Aucun frais supplémentaire
   (Commission déduite du vendeur)
```

✅ **Calculer commission côté vendeur**

```typescript
// BON (Backend)
const sellerAmount = buyerAmount * 0.95;
const platformFee = buyerAmount * 0.05;
```

---

## 📞 Support

### Questions Fréquentes

**Q: L'acheteur paie-t-il des frais ?** R: Non. L'acheteur paie exactement le prix affiché.

**Q: Qui paie la commission de 5% ?** R: Le vendeur. Il reçoit 95% du prix de vente.

**Q: Et pour les services ?** R: 0% de commission. Le prestataire reçoit 100%.

**Q: Les promos s'appliquent avant ou après commission ?** R: Avant. La commission est calculée sur
le prix final payé par l'acheteur.

**Q: Comment le vendeur voit-il sa commission ?** R: Dans son dashboard, le split est affiché
clairement.

---

## 🎓 Principe Clé

```
┌────────────────────────────────────────┐
│                                        │
│  ACHETEUR PAIE LE PRIX AFFICHÉ        │
│  (Pas de frais cachés)                │
│                                        │
│  ↓                                     │
│                                        │
│  VENDEUR REÇOIT 95%                   │
│  (Commission transparente)            │
│                                        │
│  ↓                                     │
│                                        │
│  PLATEFORME PREND 5%                  │
│  (Business model durable)             │
│                                        │
└────────────────────────────────────────┘
```

**Simplicité = Confiance = Conversion** ✅

---

**Quick Ref Version**: 1.0.0  
**Dernière Mise à Jour**: Novembre 2024
