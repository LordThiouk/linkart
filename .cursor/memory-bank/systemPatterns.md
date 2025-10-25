# Linkart System Patterns

> Version: v1.0  
> Last Updated: 2025-01-22  
> Status: Architecture & Design Patterns

## System Architecture Overview

### High-Level Architecture

```
Mobile App (React Native)
    ↓ REST API
Supabase Edge Functions (Deno/TypeScript)
    ↓ SQL/RPC
Supabase Postgres Database
    ↓ Storage
Cloudflare R2 (S3-compatible)
```

### Core Design Principles

1. **Serverless-First**: All business logic in Edge Functions
2. **Database-Centric**: Supabase Postgres as single source of truth
3. **Security by Design**: RLS, JWT, presigned URLs
4. **Mobile-First**: React Native with offline capabilities
5. **Type-Safe End-to-End**: TypeScript throughout the stack

## Key Architectural Patterns

### 1. Capability-Based Access Control

```typescript
// User capabilities stored in JWT and database
interface UserCapabilities {
  can_buy: boolean;
  can_sell: boolean;
  can_withdraw: boolean;
  can_boost: boolean;
}

// RLS policies enforce capabilities
CREATE POLICY "users_can_sell" ON products
FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  auth.jwt() -> 'capabilities' ->> 'can_sell' = 'true'
);
```

### 2. Escrow Transaction Pattern

```typescript
// Transaction states for escrow system
type TransactionStatus =
  | 'pending' // Payment initiated
  | 'paid_held' // Payment received, funds held
  | 'released' // Funds released to seller
  | 'disputed' // Under dispute
  | 'refunded'; // Refunded to buyer

// Commission calculation (5% fixed)
const commission = grossAmount * 0.05;
const netAmount = grossAmount - commission;
```

### 3. Presigned URL Pattern

```typescript
// Secure file access with TTL
interface PresignedURL {
  url: string;
  expiresAt: Date;
  ttl: number; // 5min upload, 15min download
}

// R2 bucket structure
const bucketStructure = {
  beats: `beats/{userId}/{productId}.zip`,
  previews: `previews/{userId}/{productId}_preview.mp3`,
  contracts: `contracts/{txId}.pdf`,
  avatars: `avatars/{userId}.jpg`,
};
```

### 4. Event-Driven Architecture

```typescript
// Key events that trigger actions
interface SystemEvents {
  'product.uploaded': { productId: string; userId: string };
  'payment.completed': { txId: string; amount: number };
  'download.generated': { txId: string; userId: string };
  'withdrawal.requested': { userId: string; amount: number };
}
```

## Database Design Patterns

### 1. Row-Level Security (RLS)

```sql
-- Users can only access their own data
CREATE POLICY "users_own_data" ON users
FOR ALL USING (auth.uid() = id);

-- Products are public for reading, private for writing
CREATE POLICY "products_public_read" ON products
FOR SELECT USING (status = 'active');

CREATE POLICY "products_owner_write" ON products
FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 2. Audit Trail Pattern

```sql
-- All critical operations logged
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. Soft Delete Pattern

```sql
-- Preserve data integrity with soft deletes
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMPTZ;
ALTER TABLE products ADD COLUMN deleted_at TIMESTAMPTZ;

-- Filter out deleted records in queries
SELECT * FROM users WHERE deleted_at IS NULL;
```

## API Design Patterns

### 1. RESTful Resource Design

```
GET    /api/products           # List products
GET    /api/products/:id       # Get product details
POST   /api/products           # Create product (upload)
PUT    /api/products/:id       # Update product
DELETE /api/products/:id       # Delete product

POST   /api/upload-request     # Get presigned upload URL
POST   /api/upload-complete    # Confirm upload completion
POST   /api/pay                # Initiate payment
POST   /api/generate-download  # Get download URL
```

### 2. Consistent Response Format

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: PaginationInfo;
    timestamp: string;
  };
}
```

### 3. Error Handling Pattern

```typescript
// Standardized error codes
enum ErrorCodes {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  RATE_LIMITED = 'RATE_LIMITED',
}
```

## Frontend Patterns

### 1. Feature-Based Architecture

```
app/
├── features/
│   ├── auth/           # Authentication flows
│   ├── products/       # Product management
│   ├── payments/       # Payment processing
│   ├── wallet/         # Wallet management
│   └── admin/          # Admin functions
├── components/         # Shared UI components
├── services/          # API clients
└── store/             # State management
```

### 2. Atomic Design System

```
components/
├── atoms/             # Basic elements (Button, Input, Text)
├── molecules/         # Simple combinations (ProductCard, AudioPlayer)
├── organisms/         # Complex sections (ProductList, CheckoutForm)
└── templates/          # Page layouts
```

### 3. State Management Pattern

```typescript
// Zustand store structure
interface AppState {
  auth: AuthState;
  products: ProductsState;
  wallet: WalletState;
  ui: UIState;
}

// Actions are pure functions
const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  login: async credentials => {
    /* ... */
  },
  logout: () => set({ user: null }),
}));
```

## Security Patterns

### 1. JWT Validation Pattern

```typescript
// Every Edge Function validates JWT
const validateAuth = (request: Request) => {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) throw new Error('UNAUTHORIZED');

  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};
```

### 2. Rate Limiting Pattern

```typescript
// Rate limiting by endpoint
const rateLimits = {
  '/api/upload-request': { limit: 5, window: '1m' },
  '/api/generate-download': { limit: 3, window: '1m' },
  '/api/pay': { limit: 3, window: '1m' },
  '/api/withdraw': { limit: 1, window: '1h' },
};
```

### 3. Input Validation Pattern

```typescript
// Zod schemas for all inputs
const productSchema = z.object({
  title: z.string().min(1).max(100),
  price: z.number().positive(),
  type: z.enum(['beat', 'sample', 'kit', 'service']),
  metadata: z.object({
    bpm: z.number().optional(),
    genre: z.string().optional(),
  }),
});
```

## Performance Patterns

### 1. Caching Strategy

```typescript
// Multi-level caching
interface CacheStrategy {
  client: 'Zustand store + AsyncStorage';
  edge: 'Supabase Edge Functions cache';
  cdn: 'Cloudflare R2 CDN';
  database: 'Postgres query optimization';
}
```

### 2. Lazy Loading Pattern

```typescript
// React Native lazy loading
const ProductList = lazy(() => import('./ProductList'));
const AudioPlayer = lazy(() => import('./AudioPlayer'));

// Pagination for large datasets
interface PaginationParams {
  page: number;
  limit: number;
  cursor?: string;
}
```

### 3. Background Processing

```typescript
// Async operations
interface BackgroundJobs {
  'generate-preview': { productId: string };
  'process-payment': { txId: string };
  'send-notification': { userId: string; type: string };
  'cleanup-expired': { resourceType: string };
}
```

## Testing Patterns

### 1. Test Pyramid

```
E2E Tests (Playwright)     ← User journeys
Integration Tests (Jest)   ← API + DB
Unit Tests (Jest)          ← Business logic
```

### 2. Test Data Management

```typescript
// Test fixtures
interface TestFixtures {
  users: User[];
  products: Product[];
  transactions: Transaction[];
  boosts: Boost[];
}

// Test isolation
const setupTestDB = async () => {
  await resetDatabase();
  await seedTestData();
};
```

### 3. Mocking Strategy

```typescript
// External service mocks
const mockWaveAPI = {
  createPayment: jest.fn(),
  verifyWebhook: jest.fn(),
  processWithdrawal: jest.fn(),
};

const mockR2Client = {
  generatePresignedURL: jest.fn(),
  uploadFile: jest.fn(),
  deleteFile: jest.fn(),
};
```

---

_This document defines the architectural patterns and design decisions that guide all development
work._
