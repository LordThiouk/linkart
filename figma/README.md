# 🎵 African Music Marketplace - Complete App

A premium dark-themed mobile marketplace for beats, samples, and professional audio services,
optimized for African markets and emerging creators.

## 🎨 Design System

### Color Palette

- **Background**: `#0A0A0A` (deep black)
- **Surface**: `#111111` (dark gray)
- **Surface Elevated**: `#1A1A1A`
- **Border**: `#404040`
- **Primary Gradient**: `#6366F1 → #8B5CF6` (indigo → violet)
- **Golden**: `#F59E0B` (prices)
- **Pink Accent**: `#EC4899` (likes, music)
- **Cyan Accent**: `#06B6D4` (services)
- **Success**: `#22C55E`
- **Error**: `#EF4444`

### Typography

- **Display Titles**: Poppins Bold 32px
- **Section Titles**: Poppins SemiBold 24px
- **Card Titles**: Poppins Medium 18px
- **Body Text**: Inter Regular 16px
- **Labels**: Inter Medium 12px

### Layout

- **Base Grid**: 8px
- **Card Radius**: 16px
- **Safe Margins**: 16px
- **Mobile Frame**: 375×812 (iPhone X)

---

## 📱 Application Structure

### Authentication Flow (6 Screens)

1. **SplashScreen** - Animated logo with session check
2. **OnboardingCarousel** - 3-slide app introduction
3. **LoginScreen** - Phone/Email authentication
4. **OTPVerificationScreen** - OTP code verification
5. **ProfileSetupScreen** - Role selection (Buyer/Seller/Both)
6. **WelcomeScreen** - Personalized welcome

### Main Navigation (5 Tabs)

- 🏠 **Home** - Discover beats and trending content
- 🛒 **Marketplace** - Browse beats & services
- ⬆️ **Upload** - Sell beats or offer services
- 💰 **Wallet** - Financial dashboard & withdrawals
- 👤 **Profile** - User profile, stats, and settings

---

## 🎯 Core Features

### 1. Home/Discover Screen

**Features:**

- Search beats & services
- Messages inbox access
- Notifications center
- Category filters (Trending, New, Trap, Lo-fi, etc.)
- Featured beats carousel
- Trending beats grid
- Recent uploads

**Navigation:**

- Click beat → Beat Details
- Search icon → Search/Filters
- Messages icon → Inbox
- Bell icon → Notifications

### 2. Marketplace Screen

**Two Main Tabs:**

#### Beats & Instrumentals

- Premium beats banner
- Trending beats grid (2 columns)
- New releases section
- Category filters

#### Services Pro

- Professional services cards
- Provider ratings & reviews
- Delivery time estimates
- Service categories:
  - Recording
  - Mixing
  - Mastering
  - Production

**Navigation:**

- Click beat → Beat Details
- Click service → Service Details
- Search → Search/Filters

### 3. Beat Details Screen

**Features:**

- Large cover image
- Animated waveform player
- 30-second preview playback
- Like & share buttons
- Stats (Plays, Likes, BPM, Key)
- Tags & description
- License selection:
  - **Basic** (€19.99) - MP3, 2K streams, credit required
  - **Premium** (€49.99) - WAV+MP3, 10K streams, optional credit
  - **Exclusive** (€299.99) - All files, unlimited, exclusive rights
- Similar beats grid
- Fixed bottom purchase CTA

**Future**: Payment integration with Wave/Orange Money

### 4. Service Details Screen

**Features:**

- Hero cover image
- Provider information & location
- Rating & review count
- Completed orders
- Response time
- Service description
- Package selection:
  - Basic
  - Standard (Popular)
  - Premium
- Portfolio gallery
- Client reviews
- Contact provider button
- Book service CTA

**Navigation:**

- Contact → Inbox (direct message)
- Book → Booking Form

### 5. Booking Form Screen

**3-Step Process:**

#### Step 1: Project Details

- Project name
- Description (detailed requirements)
- Deadline (optional)
- Additional notes

#### Step 2: File Upload

- Drag & drop file area
- Audio files (MP3, WAV, AIFF)
- Reference tracks
- Supporting documents
- Upload progress

#### Step 3: Review & Submit

- Summary of project details
- Package confirmation
- Price breakdown
- Submit booking request

**After Submission:**

- Toast notification
- Navigate to Inbox
- Provider receives notification
- Provider can accept/decline

### 6. Inbox/Messages Screen

**Two Views:**

#### Conversations List

- All active conversations
- Unread message count
- Online status indicators
- Last message preview
- Search conversations

#### Active Conversation

- Message history
- Real-time typing indicator
- Send text messages
- Attach files
- Voice messages
- Online/offline status

**Use Cases:**

- Service booking discussions
- Beat purchase inquiries
- Project collaboration
- Support requests

### 7. Upload/Sell Screen

**Multi-Step Upload:**

#### Step 1: Select Type

- Beat/Instrumental
- Service offering
- Quick stats (Sales, Revenue, Views)

#### Step 2: Details

- File upload (30s preview for beats)
- Title & description
- Genre selection (multi-select)
- BPM & key (for beats)
- Category (for services)

#### Step 3: Pricing

**For Beats:**

- Basic license price
- Premium license price
- Exclusive license price
- Platform commission: 15%

**For Services:**

- Base price
- Delivery time
- Package tiers

#### Step 4: Success

- Upload confirmation
- Pending admin approval
- Navigate to My Products

### 8. Wallet Screen

**Features:**

- Balance card with show/hide toggle
- Quick actions:
  - Withdraw funds
  - Add card
- Monthly stats:
  - This month revenue
  - Total sales count
  - Pending withdrawals
- Transaction history:
  - Income (beat sales, services)
  - Withdrawals
  - Status tracking (completed/pending)
- Detailed transaction cards

**Future**: Integration with Wave, Orange Money

### 9. Profile Screen

**Tabs:**

#### Beats Tab

- Published beats grid
- Sales statistics
- Edit/delete products

#### Services Tab

- Published services
- Bookings received
- Service performance

#### Stats Tab

- Performance metrics
- Monthly revenue
- Views & engagement
- Conversion rates

**Profile Features:**

- Avatar with PRO badge
- Bio & location
- Followers/Following
- Rating & reviews
- Share profile
- Settings access

### 10. Notifications Screen

**Notification Types:**

- 💰 **Purchase** (Golden) - "Someone bought your beat"
- ❤️ **Like** (Pink) - "Someone liked your track"
- 💬 **Comment** (Cyan) - "New comment on your beat"
- 👤 **Follow** (Indigo) - "New follower"
- 📢 **System** (Purple) - Platform updates

**Features:**

- Mark all as read
- Filter (All / Unread)
- Unread count badge
- Rich notification cards
- Empty state

### 11. Search/Filters Screen

**Features:**

- Search input (auto-focus)
- Filter panel (expandable):
  - Genre (multi-select)
  - Price ranges
  - BPM ranges
  - Mood/vibe
- Active filter badges
- Clear all filters
- Results grid (2 columns)
- Empty state with suggestions

---

## 🎨 Shared Components

### UI Components

- **BeatCard** - Beat display with cover, play, stats, price
- **ServiceCard** - Service with provider, rating, delivery
- **CategoryChip** - Filter pill with gradient active state
- **WaveformVisualizer** - Animated audio waveform
- **BottomNavigation** - 5-tab navigation with animations
- **PrimaryButton** - Gradient button with press animation
- **InputField** - Custom input with icon support
- **OTPField** - Single-digit OTP input

### Specialized Components

- **OnboardingSlide** - Carousel slide component
- **RoleCard** - Profile setup role selection
- **ImageWithFallback** - Image with loading/error states

---

## 🔄 Navigation Flow

```
┌─ Auth Flow ─────────────────────────────────┐
│ Splash → Onboarding → Login → OTP          │
│         → Profile Setup → Home              │
└─────────────────────────────────────────────┘

┌─ Main App ──────────────────────────────────┐
│                                             │
│  Home ─────────┬─→ Search → Beat Details   │
│                ├─→ Notifications            │
│                ├─→ Inbox ← → Conversations  │
│                └─→ Beat Details             │
│                                             │
│  Marketplace ──┬─→ Beat Details             │
│                ├─→ Service Details ─┬─→ Inbox
│                └─→ Search            └─→ Booking Form
│                                             │
│  Upload ───────→ Multi-step Form            │
│                                             │
│  Wallet ───────→ Transactions & Withdrawals │
│                                             │
│  Profile ──────→ Tabs (Beats/Services/Stats)│
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🛠 Technology Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4.0
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **UI Components**: Shadcn/ui
- **Toasts**: Sonner
- **Backend**: Supabase (Edge Functions, Auth, Storage, KV Store)

---

## 📊 Data Flow

### Beats & Products

1. Seller uploads beat with 30s preview
2. Admin approves product
3. Product appears in marketplace
4. Buyer purchases license
5. Payment via Wave/Orange Money
6. Download token generated
7. Funds held in escrow
8. Seller can withdraw after delivery

### Services

1. Provider creates service offering
2. Admin approves service
3. Service appears in marketplace
4. Client books service via form
5. Provider receives notification in Inbox
6. Provider accepts/declines booking
7. 1-to-1 messaging in Inbox
8. Service delivered (external payment)
9. Client can leave review

---

## 🎯 Key User Flows

### Buying a Beat

1. Browse Home or Marketplace
2. Click beat card
3. Preview 30 seconds
4. Select license
5. Add to cart / Buy now
6. Payment (Wave/OM)
7. Download & receive contract

### Booking a Service

1. Browse Marketplace → Services
2. Click service card
3. View packages & reviews
4. Click "Contact" to message or "Book"
5. Fill booking form (3 steps)
6. Submit request
7. Provider responds in Inbox
8. Discuss project details
9. Service delivered
10. Leave review

### Selling a Beat

1. Navigate to Upload tab
2. Select "Beat/Instrumental"
3. Upload audio file
4. Add details (title, BPM, genre, etc.)
5. Set license prices
6. Submit for approval
7. Admin approves
8. Beat goes live
9. Receive sales in Wallet
10. Withdraw funds

---

## 🚀 Future Enhancements

### Payment Integration

- Wave API integration
- Orange Money API
- Escrow system for disputes
- Refund handling

### Admin Dashboard

- Pending approvals
- User management
- Transaction monitoring
- Dispute resolution

### Advanced Features

- In-app audio editor
- Collaboration tools
- Royalty splits
- Beat leasing
- Sample packs
- Subscription models
- Social features (following, feeds)
- Live sessions

---

## 📄 File Structure

```
/
├── App.tsx                          # Main app with navigation
├── components/
│   ├── BeatCard.tsx                 # Beat display card
│   ├── BeatDetailsScreen.tsx        # Beat details & preview
│   ├── BookingFormScreen.tsx        # Service booking form
│   ├── BottomNavigation.tsx         # Main tab bar
│   ├── CategoryChip.tsx             # Filter chip
│   ├── HomeScreen.tsx               # Discover screen
│   ├── InboxScreen.tsx              # Messaging
│   ├── InputField.tsx               # Custom input
│   ├── LoginScreen.tsx              # Auth screen
│   ├── MarketplaceScreen.tsx        # Marketplace
│   ├── NotificationsScreen.tsx      # Notifications
│   ├── OTPField.tsx                 # OTP input
│   ├── OTPVerificationScreen.tsx    # OTP verification
│   ├── OnboardingCarousel.tsx       # Onboarding
│   ├── OnboardingSlide.tsx          # Slide component
│   ├── PrimaryButton.tsx            # Main CTA button
│   ├── ProfileScreen.tsx            # User profile
│   ├── ProfileSetupScreen.tsx       # Initial setup
│   ├── RoleCard.tsx                 # Role selector
│   ├── SearchFiltersScreen.tsx      # Search & filters
│   ├── ServiceCard.tsx              # Service card
│   ├── ServiceDetailsScreen.tsx     # Service details
│   ├── SplashScreen.tsx             # Splash/loading
│   ├── UploadScreen.tsx             # Upload flow
│   ├── WalletScreen.tsx             # Financial dashboard
│   ├── WaveformVisualizer.tsx       # Audio waveform
│   ├── WelcomeScreen.tsx            # Welcome message
│   ├── figma/
│   │   └── ImageWithFallback.tsx    # Image component
│   └── ui/                          # Shadcn components
├── styles/
│   └── globals.css                  # Global styles
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx            # API routes
│           └── kv_store.tsx         # KV utilities
└── utils/
    └── supabase/
        └── info.tsx                 # Supabase config
```

---

## 🎨 Design Principles

1. **Dark & Premium** - Studio-quality aesthetic
2. **Smooth Animations** - 200-300ms transitions
3. **Clear Hierarchy** - Obvious CTAs and navigation
4. **Accessible** - 4.5:1 contrast, 44px tap targets
5. **Responsive Feedback** - Scale animations on tap
6. **Consistent Spacing** - 8px grid system
7. **Mobile-First** - Optimized for 375×812

---

## 📝 Notes

- All screens maintain the dark premium aesthetic
- Smooth transitions between screens (300ms)
- Bottom navigation persists across main screens
- Context-aware back navigation
- Toast notifications for user feedback
- Loading states for async operations
- Empty states with helpful prompts
- Error handling with retry options

---

## 🎵 Built for African Creators

This platform is designed specifically for the African music ecosystem, featuring:

- Local payment methods (Wave, Orange Money)
- Afrobeat, Amapiano, Drill-focused genres
- Service marketplace for audio engineers
- Community-driven discovery
- Fair pricing and transparent fees
- Support for emerging artists and producers

---

**Total Screens**: 14 screens + 15+ reusable components **Status**: ✅ Complete navigation flow
ready for backend integration
