# Documentation des Composants

> Généré le: 2025-11-14

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

### Icon

**Props:**

```typescript
interface IconProps {

  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
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

### MetricItem

**Props:**

```typescript
interface MetricItemProps {

  icon: 'eye' | 'download' | 'heart';
  value: number | string;
  size?: 'sm' | 'md';
  color?: string;
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

### ProductCard

**Props:**

```typescript
interface ProductCardProps {

  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  viewCount: number;
  downloadCount: number;
  likeCount: number;
  onPress: (id: string) => void;
  onPlay?: (id: string) => void;
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
  artist: string;
  artistImage?: string;
  coverImage: string;
  price: number;
  type: 'beat' | 'kit' | 'sample';
  bpm?: number;
  genre: string;
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

### ProductFooter

**Props:**

```typescript
interface ProductFooterProps {

  children: React.ReactNode;
  style?: ViewStyle;

}
```

---

### ProductIcon

**Props:**

```typescript
interface ProductIconProps {

  iconName: string;
  size?: number;

}
```

---

### ProductInfo

**Props:**

```typescript
interface ProductInfoProps {

  children: React.ReactNode;
  style?: ViewStyle;
  flex?: number;

}
```

---

### ProductPrice

---

### ProductTags

**Props:**

```typescript
interface ProductTagsProps {

  children: React.ReactNode;
  style?: ViewStyle;
  gap?: number;
  marginBottom?: number;

}
```

---

### ProductTitle

**Props:**

```typescript
interface ProductTitleProps {

  children: React.ReactNode;
  style?: TextStyle;
  fontSize?: number;
  fontWeight?: string;
  marginBottom?: number;
  numberOfLines?: number;

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

### RatingContainer

**Props:**

```typescript
interface RatingContainerProps {

  children: React.ReactNode;
  style?: ViewStyle;

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

### SectionTitle

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

### PlaylistCard

**Props:**

```typescript
interface PlaylistCardProps {

  id: string;
  title: string;
  description?: string;
  typebeat?: string;
  ambiance?: string;
  beatCount: number;
  duration?: string;
  coverImage?: string;
  isPlaying?: boolean;
  onPress: (playlistId: string) => void;
  onPlay?: (playlistId: string) => void;
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

### ProductMetrics

**Props:**

```typescript
interface ProductMetricsProps {

  viewCount: number;
  downloadCount: number;
  likeCount: number;
  size?: 'sm' | 'md';
  layout?: 'horizontal' | 'vertical';
  testID?: string;

}
```

---

### ProductPreview

---

### RatingStars

**Props:**

```typescript
interface RatingStarsProps {

  rating: number;
  maxRating?: number;
  size?: number;
  color?: string;
  emptyColor?: string;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
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

### ServiceCard

**Props:**

```typescript
interface ServiceCardProps {

  id: string;
  title: string;
  provider: {
    id: string;
    name: string;
    avatar?: string;
    verified?: boolean;
  
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
  providerImage: string;
  coverImage: string;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  category: string;
  isPro?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;

}
```

---

### UserProfile

**Props:**

```typescript
interface UserProfileProps {

  name: string;
  avatarUri?: string;
  location?: string;
  rating?: number;
  isVerified?: boolean;
  isOnline?: boolean;
  size?: 'small' | 'medium' | 'large';
  showRating?: boolean;
  showLocation?: boolean;
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

### CheckoutForm

**Props:**

```typescript
interface CheckoutFormProps {

  productName: string;
  price: number;
  currency?: string;
  commission?: number;
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod?: string;
  onPaymentMethodChange: (methodId: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;

}
```

---

### ContentTabs

**Props:**

```typescript
interface ContentTabsProps {

  activeTab: string;
  onTabPress: (tabId: string) => void;

}
```

---

### FeaturedPacks

**Props:**

```typescript
interface FeaturedPacksProps {

  packs: {
    id: string;
    title: string;
    beatCount: number;
    genre: string;
    price: string;
  
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

### Header

**Props:**

```typescript
interface HeaderProps {

  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showProfile?: boolean;
  userAvatar?: string;
  userName?: string;
  showNotifications?: boolean;
  notificationCount?: number;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  rightActions?: React.ReactNode;
  style?: ViewStyle;
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

### MarketplaceHeader

**Props:**

```typescript
interface MarketplaceHeaderProps {

  onSearch: (query: string) => void;
  onFilterPress: (filterId: string) => void;
  activeFilters: string[];
  searchQuery: string;

}
```

---

### ProductList

**Props:**

```typescript
interface ProductListProps {

  products: Product[];
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onProductPress?: (product: Product) => void;
  onPlayPreview?: (product: Product) => void;
  emptyMessage?: string;
  style?: ViewStyle;
  testID?: string;

}
```

---

### ServicesSection

**Props:**

```typescript
interface ServicesSectionProps {

  services: any[];
  onServicePress: (serviceId: string) => void;
  onBookService?: (serviceId: string) => void;
  onToggleFavorite?: (serviceId: string) => void;

}
```

---

### TabBar

**Props:**

```typescript
interface TabBarProps {

  navigationState: {
    index: number;
    routes: {
      key: string;
      title: string;
      icon: string;
      badge?: string;
    
}
```

---

### TrendingSection

**Props:**

```typescript
interface TrendingSectionProps {

  products: any[];
  onProductPress: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;

}
```

---

### UploadForm

**Props:**

```typescript
interface UploadFormProps {

  onSubmit: (data: UploadFormData) => void;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;

}
```

---

