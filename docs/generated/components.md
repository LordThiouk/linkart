# Documentation des Composants

> Généré le: 2025-11-21

## Atoms

### Accordion

**Description:** AccordionItem - Item individuel de l'accordion

---

### Alert

---

### AlertDialog

**Props:**

```typescript
interface AlertDialogProps {

  /** État d'ouverture du dialog */
  open?: boolean;
  /** Fonction appelée au changement d'état */
  onOpenChange?: (open: boolean) => void;
  /** Contenu du dialog */
  children: React.ReactNode;

}
```

**Description:** AlertDialogContent - Conteneur principal du dialog

---

### Avatar

**Description:** AvatarGroup - Groupe d'avatars empilés

---

### Badge

---

### BeatCardFigma

**Props:**

```typescript
interface BeatCardFigmaProps {

  id: string;
  title: string;
  artist?: string;
  artistImage?: string;
  coverImage: string;
  price: number;
  bpm: number;
  genre: string;
  likes: number;
  isPlaying?: boolean;
  isLiked?: boolean;
  onPlay?: () => void;
  onPress?: () => void;
  onToggleLike?: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### BoostCardFigma

**Props:**

```typescript
interface BoostCardFigmaProps {

  duration: '24h' | '7j' | '30j';
  price: number;
  views: string;
  isPopular?: boolean;
  onSelect: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### Breadcrumb

**Props:**

```typescript
interface BreadcrumbItemProps {

  /** Label */
  label: string;
  /** Callback */
  onPress?: () => void;
  /** Actif */
  isActive?: boolean;
  style?: TextProps['style'];

}
```

**Description:** BreadcrumbItem - Item individuel

---

### Button

**Props:**

```typescript
interface ButtonProps {

  /** Texte du bouton */
  title?: string;
  /** Fonction appelée au press */
  onPress: () => void;
  /** Style variant du bouton */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  /** Taille du bouton */
  size?: 'sm' | 'default' | 'lg' | 'icon';
  /** État désactivé */
  disabled?: boolean;
  /** État de chargement */
  loading?: boolean;
  /** Largeur pleine */
  fullWidth?: boolean;
  /** Enfants custom (remplace title) */
  children?: React.ReactNode;

}
```

---

### Calendar

---

### Card

**Description:** CardHeader - En-tête de la card

---

### Carousel

**Description:** Carousel - Composant principal

---

### CategoryChipFigma

**Props:**

```typescript
interface CategoryChipFigmaProps {

  label: string;
  icon?: LucideIcon;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### CenteredContent

**Props:**

```typescript
interface CenteredContentProps {

  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;

}
```

---

### Checkbox

**Props:**

```typescript
interface CheckboxProps {

  /** État coché */
  checked?: boolean;
  /** Fonction appelée au changement */
  onCheckedChange?: (checked: boolean) => void;
  /** Label du checkbox */
  label?: string;
  /** État désactivé */
  disabled?: boolean;
  /** État invalide (erreur) */
  invalid?: boolean;
  /** Variant de couleur */
  variant?: 'primary' | 'secondary' | 'success';
  /** Size */
  size?: 'sm' | 'default' | 'lg';

}
```

---

### Container

**Props:**

```typescript
interface ContainerProps {

  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large' | 'xl';
  backgroundColor?: string;
  flex?: number;
  testID?: string;

}
```

---

### Dialog

**Props:**

```typescript
interface DialogProps {

  /** État d'ouverture du dialog */
  open?: boolean;
  /** Fonction appelée au changement d'état */
  onOpenChange?: (open: boolean) => void;
  /** Contenu du dialog */
  children: React.ReactNode;

}
```

**Description:** DialogContent - Conteneur principal du dialog

---

### HeartIcon

**Props:**

```typescript
interface HeartIconProps {

  productId: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  showAnimation?: boolean;
  testID?: string;

}
```

---

### ImageWithFallback

---

### Input

---

### InputField

---

### InputOTP

**Props:**

```typescript
interface InputOTPProps {

  /** Nombre de digits */
  length?: number;
  /** Valeur actuelle */
  value?: string;
  /** Fonction appelée au changement */
  onValueChange?: (value: string) => void;
  /** Fonction appelée quand tous les digits sont remplis */
  onComplete?: (value: string) => void;
  /** Label */
  label?: string;
  /** État désactivé */
  disabled?: boolean;
  /** État invalide (erreur) */
  invalid?: boolean;
  /** Message d'erreur */
  error?: string;
  /** Type de clavier */
  keyboardType?: 'numeric' | 'default';

}
```

---

### Label

---

### LoadingSpinner

**Props:**

```typescript
interface LoadingSpinnerProps {

  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: ViewStyle;
  testID?: string;

}
```

---

### OTPField

**Props:**

```typescript
interface OTPFieldProps {

  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  style?: ViewStyle;
  testID?: string;

}
```

---

### Pagination

**Description:** Pagination - Composant principal

---

### Pill

**Props:**

```typescript
interface PillProps {

  label: string;
  icon?: LucideIcon;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### PlayButton

**Props:**

```typescript
interface PlayButtonProps {

  isPlaying: boolean;
  size: 'sm' | 'md' | 'lg';
  onPress: () => void;
  disabled?: boolean;
  testID?: string;

}
```

---

### Popover

**Props:**

```typescript
interface PopoverProps {

  /** Contenu du popover */
  content: React.ReactNode;
  /** Enfants (trigger) */
  children: React.ReactNode;
  /** Position du popover */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Alignement du popover */
  align?: 'start' | 'center' | 'end';
  /** État d'ouverture contrôlé */
  open?: boolean;
  /** Callback changement d'état */
  onOpenChange?: (open: boolean) => void;

}
```

**Description:** PopoverContent - Conteneur de contenu stylisé

---

### PrimaryButton

**Props:**

```typescript
interface PrimaryButtonProps {

  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### ProductCardFigma

**Props:**

```typescript
interface ProductCardFigmaProps {

  id: string;
  title: string;
  artist?: string;
  artistImage?: string;
  coverImage: string;
  price: number;
  type: 'beat' | 'kit' | 'sample';
  bpm?: number;
  genre?: string;
  likes?: number;
  downloads?: number;
  rating?: number;
  reviewCount?: number;
  isPlaying?: boolean;
  isFavorited?: boolean;
  onPlay?: () => void;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### Progress

---

### RadioGroup

**Props:**

```typescript
interface RadioGroupProps {

  /** Options disponibles */
  options: RadioOption[];
  /** Valeur sélectionnée */
  value?: string;
  /** Fonction appelée au changement */
  onValueChange?: (value: string) => void;
  /** État désactivé global */
  disabled?: boolean;
  /** État invalide (erreur) */
  invalid?: boolean;
  /** Variant de couleur */
  variant?: 'primary' | 'secondary' | 'success';
  /** Size */
  size?: 'sm' | 'default' | 'lg';
  /** Layout direction */
  orientation?: 'vertical' | 'horizontal';

}
```

---

### RoleCardFigma

**Props:**

```typescript
interface RoleCardFigmaProps {

  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### ScrollContent

**Props:**

```typescript
interface ScrollContentProps {

  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  paddingBottom?: number;

}
```

---

### SectionCard

**Props:**

```typescript
interface SectionCardProps {

  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  marginBottom?: number;
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
  testID?: string;

}
```

---

### Select

**Props:**

```typescript
interface SelectProps {

  /** Options disponibles */
  options: SelectOption[];
  /** Valeur sélectionnée */
  value?: string;
  /** Fonction appelée au changement */
  onValueChange?: (value: string) => void;
  /** Placeholder */
  placeholder?: string;
  /** Label du select */
  label?: string;
  /** État désactivé */
  disabled?: boolean;
  /** État invalide (erreur) */
  invalid?: boolean;
  /** Message d'erreur */
  error?: string;
  /** Variant de couleur */
  variant?: 'default' | 'filled';
  /** Size */
  size?: 'sm' | 'default' | 'lg';

}
```

---

### Separator

---

### Sheet

**Props:**

```typescript
interface SheetProps {

  /** État d'ouverture du sheet */
  open?: boolean;
  /** Fonction appelée au changement d'état */
  onOpenChange?: (open: boolean) => void;
  /** Contenu du sheet */
  children: React.ReactNode;
  /** Position du sheet (mobile: bottom uniquement) */
  side?: 'bottom';

}
```

**Description:** SheetContent - Conteneur principal du sheet

---

### Skeleton

---

### Slider

**Props:**

```typescript
interface SliderProps {

  /** Valeur actuelle */
  value?: number;
  /** Valeur minimale */
  min?: number;
  /** Valeur maximale */
  max?: number;
  /** Step */
  step?: number;
  /** Fonction appelée au changement */
  onValueChange?: (value: number) => void;
  /** Label */
  label?: string;
  /** Afficher la valeur */
  showValue?: boolean;
  /** État désactivé */
  disabled?: boolean;
  /** Variant de couleur */
  variant?: 'primary' | 'secondary' | 'success';

}
```

---

### Spacer

**Props:**

```typescript
interface SpacerProps {

  size?: number;
  horizontal?: boolean;
  style?: ViewStyle;
  testID?: string;

}
```

---

### StatCard

**Props:**

```typescript
interface StatCardProps {

  children: React.ReactNode;
  flex?: number;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
  testID?: string;

}
```

---

### StatContent

**Props:**

```typescript
interface StatContentProps {

  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;

}
```

---

### StatLabel

**Props:**

```typescript
interface StatLabelProps {

  children: React.ReactNode;
  style?: TextStyle;
  fontSize?: number;
  textAlign?: 'left' | 'center' | 'right';

}
```

---

### StatValue

**Props:**

```typescript
interface StatValueProps {

  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
  fontSize?: number;
  fontWeight?: string;

}
```

---

### StatsContainer

**Props:**

```typescript
interface StatsContainerProps {

  children: React.ReactNode;
  style?: ViewStyle;
  gap?: number;
  marginBottom?: number;

}
```

---

### Switch

**Props:**

```typescript
interface SwitchProps {

  /** État activé */
  checked?: boolean;
  /** Fonction appelée au changement */
  onCheckedChange?: (checked: boolean) => void;
  /** Label du switch */
  label?: string;
  /** État désactivé */
  disabled?: boolean;
  /** Variant de couleur */
  variant?: 'primary' | 'secondary' | 'success';
  /** Size */
  size?: 'sm' | 'default' | 'lg';

}
```

---

### Table

**Description:** Table - Composant principal

---

### Text

---

### TextArea

---

### Toast

**Description:** Toast - Composant principal

---

### Tooltip

**Props:**

```typescript
interface TooltipProps {

  /** Contenu du tooltip */
  content: string;
  /** Enfants (trigger) */
  children: React.ReactNode;
  /** Position du tooltip */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Délai avant affichage (ms) */
  delayDuration?: number;

}
```

---

### WebLinearGradient

**Props:**

```typescript
interface WebLinearGradientProps {

  colors: string[];
  style?: ViewStyle;
  children?: React.ReactNode;
  start?: { x: number; y: number 
}
```

---

## Molecules

### AudioPlayer

**Props:**

```typescript
interface AudioPlayerProps {

  title: string;
  artist: string;
  artworkUrl: string;
  uri: string;
  duration?: number;
  productId: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onNext?: () => void;
  onPress?: () => void;
  sticky?: boolean;
  style?: ViewStyle;
  testID?: string;

}
```

---

### OnboardingCarouselFigma

**Props:**

```typescript
interface OnboardingCarouselFigmaProps {

  onComplete: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### OnboardingSlideFigma

**Props:**

```typescript
interface OnboardingSlideFigmaProps {

  title: string;
  description: string;
  gradient: [string, string] | [string, string, string];
  icon: LucideIcon;
  style?: ViewStyle;
  testID?: string;

}
```

---

### PlaylistCardFigma

**Props:**

```typescript
interface PlaylistCardFigmaProps {

  id: string;
  title: string;
  description: string;
  coverImage: string;
  type: 'beats' | 'kits' | 'samples';
  itemCount: number;
  totalPlays?: number;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### PriceDisplay

**Props:**

```typescript
interface PriceDisplayProps {

  amount: number;
  currency?: string;
  showCurrency?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: ViewStyle;
  testID?: string;

}
```

---

### RatingStarsFigma

**Props:**

```typescript
interface RatingStarsFigmaProps {

  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
  style?: ViewStyle;
  testID?: string;

}
```

---

### SearchBar

**Props:**

```typescript
interface SearchBarProps {

  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### ServiceCardFigma

**Props:**

```typescript
interface ServiceCardFigmaProps {

  id: string;
  title: string;
  provider: string;
  providerImage?: string;
  coverImage: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  deliveryTime?: string;
  category?: string;
  isPro?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### WaveformVisualizer

**Props:**

```typescript
interface WaveformVisualizerProps {

  isPlaying?: boolean;
  bars?: number;
  height?: number;
  compact?: boolean;
  style?: ViewStyle;
  testID?: string;

}
```

---

## Organisms

### BottomNavigationFigma

**Props:**

```typescript
interface BottomNavigationFigmaProps {

  activeTab: 'home' | 'marketplace' | 'upload' | 'wallet' | 'profile';
  onTabChange: (tab: 'home' | 'marketplace' | 'upload' | 'wallet' | 'profile') => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### FilterPills

**Props:**

```typescript
interface FilterPillsProps {

  filters: FilterPill[];
  onFilterPress: (filterId: string) => void;
  onFilterRemove?: (filterId: string) => void;
  showRemoveButton?: boolean;
  testID?: string;

}
```

---

### HeroBanner

**Props:**

```typescript
interface HeroBannerProps {

  id: string;
  title: string;
  artist: string;
  duration: string;
  backgroundImage?: string;
  backgroundGradient?: string[];
  isPlaying: boolean;
  onPress: (id: string) => void;
  onPlay: (id: string) => void;
  onBuy?: (id: string) => void;

}
```

---

