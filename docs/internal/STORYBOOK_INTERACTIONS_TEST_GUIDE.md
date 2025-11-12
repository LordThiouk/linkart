# � Guide de Test — Interactions Storybook

> **Test rapide des corrections appliquées aux groupes C et D**

---

## � Préparation

```bash
# 1. Démarrer Storybook
npm run storybook

# 2. Ouvrir http://localhost:6006
```

---

## � Tests Groupe C (Form Inputs)

### 1. Checkbox ✅

**Navigation** : `Atoms/Checkbox → Default`

| Action                              | Résultat Attendu                         |
| ----------------------------------- | ---------------------------------------- |
| **Cliquer** sur le checkbox         | ✅ Se coche/décoche avec animation scale |
| **Regarder** le panneau Controls    | ✅ La prop `checked` change              |
| **Changer** `checked` dans Controls | ✅ Le composant se synchronise           |

**Stories à tester** :

- `Default` → Interaction basique
- `AllStates` → Tous les états (unchecked, checked, disabled)
- `FormExample` → Plusieurs checkboxes interactifs

---

### 2. Switch ✅

**Navigation** : `Atoms/Switch → Default`

| Action                              | Résultat Attendu                       |
| ----------------------------------- | -------------------------------------- |
| **Cliquer** sur le switch           | ✅ Bascule ON/OFF avec slide animation |
| **Regarder** la couleur             | ✅ Change (border → primary)           |
| **Changer** `checked` dans Controls | ✅ Le switch bascule                   |

**Stories à tester** :

- `Default` → Interaction basique
- `SettingsExample` → Plusieurs switches interactifs

---

### 3. RadioGroup ✅

**Navigation** : `Atoms/RadioGroup → Default`

| Action                            | Résultat Attendu                                          |
| --------------------------------- | --------------------------------------------------------- |
| **Cliquer** sur "Option 2"        | ✅ L'option se sélectionne                                |
| **Cliquer** sur "Option 3"        | ✅ "Option 2" se désélectionne, "Option 3" se sélectionne |
| **Changer** `value` dans Controls | ✅ L'option correspondante se sélectionne                 |

**Stories à tester** :

- `Default` → Sélection basique
- `LicenseSelection` → Sélection de licence beat
- `PaymentMethod` → Options Wave/OM

---

### 4. Select ✅

**Navigation** : `Atoms/Select → Default`

| Action                     | Résultat Attendu                 |
| -------------------------- | -------------------------------- |
| **Cliquer** sur le select  | ✅ Dropdown s'ouvre avec overlay |
| **Cliquer** sur une option | ✅ L'option est sélectionnée     |
| **Regarder** le select     | ✅ Affiche l'option sélectionnée |
| **Cliquer** en dehors      | ✅ Dropdown se ferme             |

**Stories à tester** :

- `Default` → Sélection basique
- `GenreSelect` → Sélection de genre musical
- `LicenseSelect` → Sélection avec prix

---

### 5. Slider ✅

**Navigation** : `Atoms/Slider → Default`

| Action                              | Résultat Attendu                             |
| ----------------------------------- | -------------------------------------------- |
| **Glisser** le thumb vers la droite | ✅ Le slider suit le mouvement               |
| **Regarder** le `showValue`         | ✅ La valeur change en temps réel            |
| **Changer** `value` dans Controls   | ✅ Le thumb se déplace avec animation spring |

**Stories à tester** :

- `WithValue` → Affichage de valeur
- `BPMSelector` → Slider BPM (60-200)
- `AudioSettings` → Plusieurs sliders

---

### 6. InputOTP ✅

**Navigation** : `Atoms/InputOTP → Default`

| Action                            | Résultat Attendu                             |
| --------------------------------- | -------------------------------------------- |
| **Taper** "1"                     | ✅ Apparaît dans la première case            |
| **Taper** "2 3 4 5 6"             | ✅ Les chiffres s'affichent séquentiellement |
| **Effacer** avec backspace        | ✅ Le focus revient en arrière               |
| **Changer** `value` dans Controls | ✅ Les cases se remplissent                  |

**Stories à tester** :

- `Default` → Saisie basique
- `SixDigits` → Code OTP 6 chiffres
- `Invalid` → État erreur

---

## � Tests Groupe D (Overlays)

### 7. Dialog ✅

**Navigation** : `Atoms/Dialog → Default`

| Action                          | Résultat Attendu                        |
| ------------------------------- | --------------------------------------- |
| **Cliquer** sur "Ouvrir Dialog" | ✅ Modal s'ouvre avec fade-in           |
| **Regarder** le backdrop        | ✅ Overlay semi-transparent (#000, 50%) |
| **Cliquer** sur le backdrop     | ✅ Modal se ferme                       |
| **Cliquer** sur bouton "Fermer" | ✅ Modal se ferme avec fade-out         |

**Stories à tester** :

- `Default` → Dialog basique
- `DeleteConfirmation` → Dialog destructif
- `FormDialog` → Dialog avec inputs

---

### 8. Sheet ✅

**Navigation** : `Atoms/Sheet → Default`

| Action                         | Résultat Attendu              |
| ------------------------------ | ----------------------------- |
| **Cliquer** sur "Ouvrir Sheet" | ✅ Sheet glisse depuis le bas |
| **Swiper** vers le bas         | ✅ Sheet suit le geste        |
| **Swiper** > 100px             | ✅ Sheet se ferme             |
| **Swiper** < 100px             | ✅ Sheet revient en place     |

**Stories à tester** :

- `Default` → Sheet basique
- `FilterSheet` → Filtres de produits
- `ScrollableContent` → Contenu long

---

### 9. Popover ✅

**Navigation** : `Atoms/Popover → Default`

| Action                     | Résultat Attendu                      |
| -------------------------- | ------------------------------------- |
| **Cliquer** sur le trigger | ✅ Popover s'ouvre                    |
| **Regarder** la position   | ✅ Aligné correctement (side + align) |
| **Cliquer** en dehors      | ✅ Popover se ferme                   |

**Stories à tester** :

- `Default` → Popover basique
- `AllPositions` → Toutes les positions (top, bottom, left, right)
- `UserActions` → Menu utilisateur

---

### 10. Tooltip ✅

**Navigation** : `Atoms/Tooltip → Default`

| Action                        | Résultat Attendu        |
| ----------------------------- | ----------------------- |
| **Long press** sur le trigger | ✅ Tooltip apparaît     |
| **Regarder** la position      | ✅ Au-dessus du trigger |
| **Relâcher**                  | ✅ Tooltip disparaît    |

**Stories à tester** :

- `Default` → Tooltip basique
- `AllPositions` → Toutes les positions
- `IconTooltips` → Tooltips sur icônes

---

### 11. AlertDialog ✅

**Navigation** : `Atoms/AlertDialog → Default`

| Action                               | Résultat Attendu              |
| ------------------------------------ | ----------------------------- |
| **Cliquer** sur "Ouvrir AlertDialog" | ✅ AlertDialog s'ouvre        |
| **Regarder** le style                | ✅ Bordure rouge (danger)     |
| **Cliquer** sur backdrop             | ❌ Ne se ferme PAS (sécurisé) |
| **Cliquer** sur bouton "Confirmer"   | ✅ AlertDialog se ferme       |

**Stories à tester** :

- `Default` → AlertDialog basique
- `DeleteAccount` → Confirmation destruction
- `PaymentConfirmation` → Confirmation paiement

---

## � Checklist Complète

### Groupe C : Form Inputs

- [ ] **Checkbox** : Coche/décoche avec animation ✅
- [ ] **Switch** : Bascule ON/OFF avec slide ✅
- [ ] **RadioGroup** : Sélection mutually exclusive ✅
- [ ] **Select** : Dropdown ouvre/ferme avec sélection ✅
- [ ] **Slider** : Glisse et met à jour la valeur ✅
- [ ] **InputOTP** : Saisie séquentielle avec focus ✅

### Groupe D : Overlays

- [ ] **Dialog** : Ouvre/ferme avec backdrop ✅
- [ ] **Sheet** : Swipe down pour fermer ✅
- [ ] **Popover** : Ouvre/ferme avec position correcte ✅
- [ ] **Tooltip** : Long press pour afficher ✅
- [ ] **AlertDialog** : Ne ferme pas avec backdrop ✅

---

## � Problèmes Potentiels & Solutions

### Problème : Le composant ne réagit pas aux clics

**Diagnostic** :

1. Vérifier que `withInteractiveState` est dans `decorators`
2. Vérifier l'ordre : `withInteractiveState` doit être **en premier**
3. Vérifier les console errors dans DevTools

**Solution** :

```typescript
const meta = {
  decorators: [
    withInteractiveState, // ← EN PREMIER
    (Story) => <View><Story /></View>,
  ],
};
```

---

### Problème : Select ne s'ouvre pas

**Possible cause** : Le decorator ne gère pas encore `open` pour Select.

**Solution temporaire** :

- Select gère son state `open` en interne
- Vérifier que le composant a bien un state local pour `open`

---

### Problème : Slider ne glisse pas

**Possible cause** : Les gestures ne fonctionnent pas dans Storybook Web.

**Status** : ✅ Résolu avec mock `useAnimatedGestureHandler`

---

### Problème : Storybook Web freeze

**Diagnostic** :

1. Vérifier la console pour erreurs `measure()` ou `measureInWindow()`
2. Vérifier les imports `react-native-reanimated`

**Solution** :

- Utiliser `onLayout` avec `event.nativeEvent.layout` au lieu de `measure()`
- Les mocks sont dans `.storybook/mocks/react-native-reanimated.ts`

---

## � Console Errors Acceptables

### Warnings React

```
Warning: componentWillReceiveProps has been renamed...
```

→ **OK** : Vient de librairies tierces, pas de notre code.

### Warnings Reanimated

```
[Reanimated] Mismatch between JavaScript and native value...
```

→ **OK** : Worklets désactivés dans Storybook Web.

---

## ✅ Critères de Succès

**Tous les composants des groupes C et D doivent** :

1. ✅ Réagir aux clics/interactions dans Storybook
2. ✅ Afficher les animations correctement
3. ✅ Se synchroniser avec le panneau "Controls"
4. ✅ Fonctionner dans toutes leurs stories (Default, AllStates, etc.)
5. ✅ Ne pas générer de console errors bloquants

---

## � Prochaines Étapes

Si tous les tests passent :

- [ ] Marquer les groupes C et D comme **100% fonctionnels**
- [ ] Documenter les patterns dans `DESIGN_SYSTEM.md`
- [ ] Créer un composant Form avec validation
- [ ] Passer au Groupe E (Avancés) : Tabs, Accordion, CommandMenu

---

**Status** : ✅ **PRÊT POUR TEST**
