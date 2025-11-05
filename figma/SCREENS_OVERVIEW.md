# Music Marketplace App - Screens Overview

## 🎨 Complete Application Structure

### Auth Flow (Onboarding)

1. **SplashScreen** → Animated logo & branding
2. **OnboardingCarousel** → 3 slides explaining the app
3. **LoginScreen** → Phone/Email login
4. **OTPVerificationScreen** → OTP code verification
5. **ProfileSetupScreen** → Setup profile & select role (Buyer/Seller/Both)
6. **WelcomeScreen** → Welcome message (optional)

### Main App Navigation (Bottom Nav)

**Bottom Navigation Tabs:**

- 🏠 Home (Accueil)
- 🛒 Marketplace
- ⬆️ Upload
- 💰 Wallet
- 👤 Profile

---

## 📱 Main Screens

### 1. Home Screen (Discover Flow)

**Path:** Home Tab **Features:**

- Search button → SearchFiltersScreen
- Notifications button → NotificationsScreen
- Featured beats horizontal carousel
- Category filters (Trending, New, Trap, Lo-fi, etc.)
- Trending beats grid (2 columns)
- Recent uploads list
- Beat cards with play/pause, like, add to cart

**Navigation:**

- Click beat → BeatDetailsScreen
- Search icon → SearchFiltersScreen
- Bell icon → NotificationsScreen

---

### 2. Search & Filters Screen

**Path:** Home → Search OR via bottom nav (future) **Features:**

- Search input with auto-focus
- Filter button with badge counter
- Expandable filters panel:
  - Genre (multi-select)
  - Price ranges
  - BPM ranges
  - Mood selection
- Results grid (2 columns)
- Clear all filters
- Empty state with search prompt

**Navigation:**

- Back → Home
- Click beat → BeatDetailsScreen

---

### 3. Beat Details Screen

**Path:** Home/Search/Marketplace → Beat Card **Features:**

- Large cover image with gradient overlay
- Back button
- Like & Share buttons
- Play/Pause button (large, gradient)
- Interactive waveform player
- Stats (Plays, Likes, BPM, Key)
- Description & tags
- License selection cards (Basic, Premium, Exclusive)
- Similar beats grid
- Fixed bottom purchase CTA

**Navigation:**

- Back → Previous screen (context-aware)

---

### 4. Notifications Screen

**Path:** Home → Bell Icon **Features:**

- Back button
- "Mark all as read" button
- Filter tabs (All / Unread)
- Unread count badge
- Notification types:
  - Purchase (golden)
  - Like (pink)
  - Comment (cyan)
  - Follow (indigo)
  - System (purple)
- Rich cards with user avatars
- Empty state when all read

**Navigation:**

- Back → Home

---

### 5. Marketplace Screen

**Path:** Bottom Nav → Marketplace Tab **Features:**

- Search button
- Filters button
- Tab selector (Beats / Services)
- Categories horizontal scroll

**Beats Tab:**

- Premium banner with CTA
- Trending beats grid (2 columns)
- New releases grid

**Services Tab:**

- Services banner
- Top rated services (full-width cards)
- Categories grid (4 items):
  - Recording
  - Mixing
  - Mastering
  - Production

**Navigation:**

- Search → SearchFiltersScreen
- Click beat → BeatDetailsScreen
- Click service → ServiceDetailsScreen (TODO)

---

### 6. Upload Screen

**Path:** Bottom Nav → Upload Tab **Features:**

**Step 1: Select Type**

- Upload Beat card
- Upload Service card
- Quick stats (Sales, Revenue, Views)

**Step 2: Details**

- File upload area (drag & drop)
- Title input
- Description textarea
- Genre multi-select (for beats)
- BPM & Key inputs (for beats)
- Back & Next buttons

**Step 3: Pricing**

- License pricing (Beats):
  - Basic (suggested €19.99)
  - Premium (suggested €49.99)
  - Exclusive (suggested €299.99)
- Service pricing:
  - Base price
  - Delivery time
- Platform commission notice (15%)
- Back & Publish buttons

**Step 4: Success**

- Success animation
- Confirmation message
- Auto-reset after 3s

---

### 7. Wallet Screen

**Path:** Bottom Nav → Wallet Tab **Features:**

- Balance card with gradient background
- Show/Hide balance toggle
- Withdraw & Card buttons
- Stats grid (This month, Total sales, Pending)
- Recent transactions list:
  - Income (green)
  - Withdrawals (orange)
  - Status badges (Completed/Pending)
- Transaction details

---

### 8. Profile Screen

**Path:** Bottom Nav → Profile Tab **Features:**

- Settings & Share buttons (top right)
- Profile picture with PRO badge
- Username, bio, location
- Followers/Following count
- Edit Profile button
- Stats grid:
  - Total views
  - Published beats
  - Average rating
  - Sales
- Tabs (Beats / Services / Stats)

**Beats Tab:**

- User's published beats grid

**Services Tab:**

- Empty state with "Create service" CTA

**Stats Tab:**

- Performance metrics
- Monthly statistics

---

## 🎨 Shared Components

### Cards

- **BeatCard** - Displays beat with cover, play button, stats, price
- **ServiceCard** - Displays service with cover, provider, rating, delivery time

### UI Elements

- **CategoryChip** - Filter/category pill with gradient active state
- **WaveformVisualizer** - Animated audio waveform
- **BottomNavigation** - 5-tab navigation bar with animations
- **PrimaryButton** - Gradient button with animations
- **InputField** - Custom input with icon support
- **OTPField** - Single OTP digit input

### Specialized

- **OnboardingSlide** - Carousel slide component
- **RoleCard** - Profile setup role selection

---

## 🎯 Navigation Flow Map

```
Auth Flow:
Splash → Onboarding → Login → OTP → Profile Setup → Home

Main App:
┌─ Home ──────────────────────────┐
│  ├─ Search ─→ Beat Details      │
│  ├─ Notifications               │
│  └─ Beat Details                │
├─ Marketplace ───────────────────┤
│  ├─ Search                      │
│  ├─ Beat Details                │
│  └─ Service Details (TODO)      │
├─ Upload ────────────────────────┤
│  └─ Multi-step form             │
├─ Wallet ────────────────────────┤
│  └─ Transaction history         │
└─ Profile ───────────────────────┘
   └─ Tabs (Beats/Services/Stats)
```

---

## 🎨 Design System Summary

### Colors

- Background: `#0A0A0A` (deep black)
- Surface: `#111111` (dark gray)
- Surface elevated: `#1A1A1A`
- Border: `#404040`
- Primary gradient: `#6366F1 → #8B5CF6` (indigo → violet)
- Golden: `#F59E0B` (prices)
- Pink accent: `#EC4899` (likes, music)
- Cyan accent: `#06B6D4` (services)
- Success: `#22C55E`
- Error: `#EF4444`

### Typography

- Display: Poppins Bold 32px
- Section titles: Poppins SemiBold 24px
- Card titles: Poppins Medium 18px
- Body: Inter Regular 16px
- Labels: Inter Medium 12px

### Spacing

- Base grid: 8px
- Card padding: 16px
- Safe margins: 16px
- Rounded corners: 16px

### Animations

- Transitions: 200-300ms
- Button press: scale(0.97-0.98)
- Fade delays: 50-100ms stagger
- Spring physics for special effects

---

## 📊 Screen Count

- **Auth/Onboarding:** 6 screens
- **Main App:** 8 screens
- **Total:** 14 screens
- **Shared Components:** 15+ components

All screens follow the premium dark aesthetic with smooth animations and consistent spacing!
