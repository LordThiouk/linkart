# Music Marketplace App - Complete Navigation Flow

## 🗺️ Navigation Architecture

### Authentication Flow

```
Splash → Onboarding → Login → OTP → Profile Setup → Home
```

### Main App Structure (Bottom Navigation)

```
┌─────────────────────────────────────┐
│  🏠 Home  |  🛒 Marketplace  |  ⬆️ Upload  |  💰 Wallet  |  👤 Profile  │
└─────────────────────────────────────┘
```

---

## 📱 Screen-by-Screen Navigation

### 1️⃣ HOME TAB

**HomeScreen** (Entry point)

- **Search Icon** → `SearchFiltersScreen`
- **Bell Icon** → `NotificationsScreen`
- **Beat Card Click** → `BeatDetailsScreen`

**SearchFiltersScreen**

- **Back Button** → `HomeScreen`
- **Beat Card Click** → `BeatDetailsScreen`

**BeatDetailsScreen**

- **Back Button** → Previous screen (context-aware)
- **Play/Pause** → Audio playback
- **Like/Share** → Local actions
- **Purchase CTA** → (Future: Checkout flow)

**NotificationsScreen**

- **Back Button** → `HomeScreen`
- **Notification Click** → Context-specific actions

---

### 2️⃣ MARKETPLACE TAB

**MarketplaceScreen** (Entry point)

- **Tabs**: Beats / Services
- **Search Icon** → `SearchFiltersScreen`
- **Beat Card Click** → `BeatDetailsScreen`
- **Service Card Click** → `ServiceDetailsScreen`

**ServiceDetailsScreen** (NEW)

- **Back Button** → `MarketplaceScreen`
- **Share Button** → Share dialog
- **Message Icon** → `InboxScreen` (with provider conversation)
- **Book Service CTA** → `BookingFormScreen`
- **Package Selection** → Updates booking price
- **Portfolio/Reviews** → Read-only display

**BookingFormScreen** (NEW)

- **Back Button** → `ServiceDetailsScreen`
- **3-Step Process**:
  1. **Details Step**: Project info, description, deadline
  2. **Files Step**: Upload project files
  3. **Review Step**: Summary and confirmation
- **Submit Button** → `InboxScreen` (success message + conversation with provider)

---

### 3️⃣ UPLOAD TAB

**UploadScreen** (Entry point)

- **Multi-Step Upload Process**:
  1. **Select Type**: Beat/Service
  2. **Details**: Title, description, genres, BPM, etc.
  3. **Pricing**: Set license prices (Beat) or service rates (Service)
  4. **Success**: Confirmation animation
- **Auto-Reset** → Returns to step 1 after 3s

---

### 4️⃣ WALLET TAB

**WalletScreen** (Entry point)

- **Balance Card**: Show/hide toggle
- **Withdraw Button** → (Future: Withdrawal flow)
- **Card Button** → (Future: Card management)
- **Transaction Items** → (Future: Transaction details)
- **Stats Display**: Monthly revenue, sales, pending

---

### 5️⃣ PROFILE TAB

**ProfileScreen** (Entry point)

- **Share Button** → Share profile
- **Settings Button** → (Future: Settings screen)
- **Edit Profile Button** → (Future: Edit profile flow)
- **Tabs**: Beats / Services / Stats
- **Beat Cards** → `BeatDetailsScreen`

---

### 💬 MESSAGING FLOW

**InboxScreen** (NEW)

- **Access Points**:
  - From `ServiceDetailsScreen` (Contact Provider)
  - From `BookingFormScreen` (After booking submission)
  - From `NotificationsScreen` (Message notifications)
- **Conversation List View**:
  - Shows all conversations
  - Unread badges
  - Online status indicators
  - **Click Conversation** → Opens chat view
- **Chat View**:
  - Message history
  - Real-time typing
  - Send text/attachments/voice
  - **Back Button** → Returns to conversation list

---

## 🔄 Complete User Journeys

### Journey 1: Buying a Beat

```
Home → Beat Card → BeatDetailsScreen → [Purchase] → Checkout → Success
       ↓
   Search → Filters → Results → Beat Card → BeatDetailsScreen
       ↓
   Marketplace (Beats Tab) → Beat Card → BeatDetailsScreen
```

### Journey 2: Booking a Service

```
Marketplace → Services Tab → Service Card → ServiceDetailsScreen
    ↓
Select Package → Book Service → BookingFormScreen
    ↓
Step 1: Details → Step 2: Files → Step 3: Review → Submit
    ↓
InboxScreen (Conversation with Provider)
```

### Journey 3: Messaging a Provider

```
ServiceDetailsScreen → Message Icon → InboxScreen → Select Conversation → Chat View
    ↓
Send Message → Receive Reply → Continue Conversation
```

### Journey 4: Uploading Content

```
Upload Tab → Select Beat/Service → Enter Details → Set Pricing → Success
    ↓
[After Approval] → Appears in Marketplace
```

### Journey 5: Managing Sales

```
Wallet Tab → View Balance → Transaction History → [Withdraw] → Success
    ↓
Profile Tab → My Products → Stats Tab → Performance Metrics
```

---

## 📊 Screen States & Context

### Context-Aware Navigation

- `BeatDetailsScreen` remembers previous screen (Home, Search, or Marketplace)
- `InboxScreen` can open directly to a specific conversation
- `BookingFormScreen` carries service data from `ServiceDetailsScreen`

### State Management

```typescript
- currentScreen: Screen type
- activeTab: Bottom nav tab
- selectedBeatId: For beat details
- selectedServiceId: For service details
- bookingData: Service booking context
- userContact: Auth flow data
```

### Persistent Bottom Navigation

Bottom nav shows on all main app screens:

- home, search, beatDetails, notifications
- marketplace, serviceDetails, bookingForm
- upload
- wallet
- profile-view
- inbox

---

## 🎯 Future Enhancements

### Coming Soon

1. **Checkout Flow**: Complete purchase flow for beats
2. **Payment Integration**: Wave/Orange Money integration
3. **Admin Panel**: Content moderation
4. **Dispute Resolution**: Refund/dispute handling
5. **Advanced Messaging**: File sharing, voice messages
6. **Notifications System**: Real-time push notifications
7. **Service Delivery**: Workflow for service completion
8. **Reviews & Ratings**: After-purchase reviews
9. **Social Features**: Following, feed, comments

### Backend Integration

- Supabase auth for user sessions
- KV store for data persistence
- Edge functions for API endpoints
- File storage for uploads
- Real-time subscriptions for messaging

---

## 🔐 Protected Flows

### Requires Authentication

- Upload content
- Book services
- Message providers
- View wallet
- Manage profile
- Make purchases

### Public Access

- Browse marketplace
- View beat/service details
- Search and filter
- View provider profiles (limited)

---

## 📱 Screen Count Summary

**Auth Screens**: 6

- Splash, Onboarding, Login, OTP, Profile Setup, Welcome

**Main App Screens**: 12

- Home, Search, Beat Details, Notifications
- Marketplace, Service Details, Booking Form
- Upload, Wallet, Profile
- Inbox

**Total**: 18 screens

**Shared Components**: 20+

- BeatCard, ServiceCard, CategoryChip
- WaveformVisualizer, BottomNavigation
- PrimaryButton, InputField, OTPField
- ImageWithFallback, etc.

---

## 🎨 Design Consistency

All screens follow:

- Dark premium aesthetic (#0A0A0A background)
- Gradient accents (#6366F1 → #8B5CF6)
- Smooth animations (200-300ms)
- 8px grid spacing
- 16px border radius
- Poppins/Inter typography
- Mobile-first (375×812)

---

**Last Updated**: November 3, 2025 **App Version**: 1.0.0 **Framework**: React + TypeScript +
Tailwind + Motion
