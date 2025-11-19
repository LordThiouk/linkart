# 📱 Architecture des Screens - Guide de Référence

> **Version**: v1.0  
> **Date**: 2025-01-22  
> **Objectif**: Définir l'organisation et les conventions pour les screens dans Linkart

---

## 🎯 Principe Fondamental

**Séparation claire entre Navigation et Logique UI** :

- **Screens `*Figma`** (logique UI) → `src/features/<domain>/screens/`
- **Wrappers React Navigation** → `src/screens/` (points d'entrée)

---

## 📂 Structure des Dossiers

```
src/
├── features/                    # Logique métier isolée par feature
│   ├── payments/
│   │   ├── components/          # Composants réutilisables (PaymentMethodCard, etc.)
│   │   └── screens/             # Screens Figma (logique UI pure)
│   │       ├── PaymentScreenFigma.tsx
│   │       ├── PaymentSuccessScreenFigma.tsx
│   │       └── index.ts         # Export centralisé
│   ├── bookings/
│   │   └── screens/
│   │       └── BookingsScreenFigma.tsx
│   └── ...
│
└── screens/                     # Wrappers React Navigation
    ├── payments/
    │   └── PaymentScreen.tsx    # Wrapper qui importe depuis features
    └── ...
```

---

## 🔄 Pattern d'Utilisation

### 1. Screen Figma (Logique UI)

**Localisation** : `src/features/<domain>/screens/<Screen>Figma.tsx`

**Responsabilités** :

- ✅ Logique UI pure (affichage, interactions)
- ✅ Utilise les composants depuis `features/<domain>/components/`
- ✅ Props typées, pas de dépendance à React Navigation
- ✅ Réutilisable (peut être utilisé dans modales, web, etc.)

**Exemple** :

```typescript
// src/features/payments/screens/PaymentScreenFigma.tsx
interface PaymentScreenFigmaProps {
  onBack?: () => void;
  onPaymentSuccess?: (transactionId: string) => void;
  checkoutData: CheckoutData;
  // ... autres props
}

export function PaymentScreenFigma({
  onBack,
  onPaymentSuccess,
  checkoutData,
}: PaymentScreenFigmaProps) {
  // Logique UI pure
  return (
    <SafeAreaView>
      <PaymentHeader onBack={onBack} />
      {/* ... */}
    </SafeAreaView>
  );
}
```

### 2. Wrapper React Navigation

**Localisation** : `src/screens/<domain>/<Screen>.tsx`

**Responsabilités** :

- ✅ Point d'entrée pour React Navigation
- ✅ Gère les paramètres de route (`useRoute`, `useNavigation`)
- ✅ Transforme les paramètres de route en props pour le screen Figma
- ✅ Gère la navigation (callbacks `onBack`, `onSuccess`, etc.)

**Exemple** :

```typescript
// src/screens/payments/PaymentScreen.tsx
import { PaymentScreenFigma } from '@/features/payments/screens';
import { useNavigation, useRoute } from '@react-navigation/native';

export function PaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute<PaymentRouteProp>();

  return (
    <PaymentScreenFigma
      onBack={() => navigation.goBack()}
      onPaymentSuccess={(txId) => {
        navigation.navigate('PaymentSuccess', { transactionId: txId });
      }}
      checkoutData={route.params}
      // ... autres props depuis route.params
    />
  );
}
```

---

## ✅ Avantages de cette Approche

1. **Isolation par Feature** : Toute la logique d'une feature (composants + screens) est regroupée
2. **Réutilisabilité** : Les screens Figma peuvent être utilisés hors navigation (modales, web,
   tests)
3. **Testabilité** : Tests unitaires faciles sur les screens Figma (pas de dépendance React
   Navigation)
4. **Séparation des Responsabilités** : Navigation ≠ Logique UI
5. **Cohérence** : Même pattern que les composants (dans `features/`)

---

## 📋 Checklist de Migration

Pour migrer un screen existant vers cette architecture :

- [ ] Déplacer le screen `*Figma` vers `src/features/<domain>/screens/`
- [ ] Créer/ajouter l'export dans `src/features/<domain>/screens/index.ts`
- [ ] Créer un wrapper dans `src/screens/<domain>/<Screen>.tsx` si nécessaire
- [ ] Mettre à jour les imports dans React Navigation
- [ ] Mettre à jour les stories Storybook (import depuis features)
- [ ] Vérifier que les composants utilisés sont dans `features/<domain>/components/`

---

## 🚫 Anti-Patterns à Éviter

❌ **Ne pas** mettre la logique UI directement dans les wrappers React Navigation  
❌ **Ne pas** mélanger navigation et logique UI dans le même fichier  
❌ **Ne pas** créer des dépendances circulaires entre screens et composants  
❌ **Ne pas** utiliser `useNavigation` ou `useRoute` dans les screens Figma

---

## 📚 Exemples Concrets

### ✅ Bon Pattern

```typescript
// ✅ Screen Figma isolé
// src/features/payments/screens/PaymentScreenFigma.tsx
export function PaymentScreenFigma({ onBack, onSuccess, data }: Props) {
  // Logique UI pure
}

// ✅ Wrapper React Navigation
// src/screens/payments/PaymentScreen.tsx
export function PaymentScreen() {
  const nav = useNavigation();
  const route = useRoute();
  return <PaymentScreenFigma onBack={() => nav.goBack()} {...route.params} />;
}
```

### ❌ Mauvais Pattern

```typescript
// ❌ Mélange navigation + UI
// src/screens/payments/PaymentScreen.tsx
export function PaymentScreen() {
  const nav = useNavigation(); // Navigation
  const [state, setState] = useState(); // Logique UI
  // ... mélange des responsabilités
}
```

---

## 🔗 Références

- [React Navigation - Type Checking](https://reactnavigation.org/docs/typescript/)
- [Feature-Sliced Design](https://feature-sliced.design/) (inspiration)
- [Frontend Guidelines](./frontend_guidelines_document.mdc)

---

## 📝 Notes

- Les screens `*Figma` sont nommés ainsi car ils viennent directement des prototypes Figma
- Cette architecture facilite la migration future vers une version web (réutilisation des screens)
- Les wrappers peuvent être supprimés si on passe à une navigation différente (ex: Next.js)
