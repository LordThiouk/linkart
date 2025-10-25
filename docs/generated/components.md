# Documentation des Composants

> Généré le: 2025-10-25

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

### ProductCard

**Props:**

```typescript
interface ProductCardProps {

  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  marginBottom?: number;
  padding?: 'none' | 'small' | 'medium' | 'large';
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

## Molecules

### AudioPlayer

**Props:**

```typescript
interface AudioPlayerProps {

  uri: string;
  duration?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
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
  filters?: {
    label: string;
    value: string;
    selected?: boolean;
  
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

