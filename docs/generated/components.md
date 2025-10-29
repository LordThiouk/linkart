# Documentation des Composants

> Généré le: 2025-10-29

## Atoms

### Avatar

**Props:**

```typescript
interface AvatarProps {

  uri?: string;
  name?: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  testID?: string;

}
```

---

### Badge

**Props:**

```typescript
interface BadgeProps {

  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  visible?: boolean;
  style?: ViewStyle;
  testID?: string;

}
```

---

### Button

**Props:**

```typescript
interface ButtonProps {

  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
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

### Divider

**Props:**

```typescript
interface DividerProps {

  style?: ViewStyle;
  testID?: string;

}
```

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

### Input

**Props:**

```typescript
interface InputProps {

  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;

}
```

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

### RatingContainer

**Props:**

```typescript
interface RatingContainerProps {

  children: React.ReactNode;
  style?: ViewStyle;

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

### Text

---

### Toast

**Props:**

```typescript
interface ToastProps {

  visible: boolean;
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  
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

## Organisms

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

