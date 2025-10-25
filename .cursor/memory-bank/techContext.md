# Linkart Technical Context

> Version: v1.0  
> Last Updated: 2025-01-22  
> Status: Technology Stack & Development Setup

## Technology Stack Overview

### Frontend (Mobile)

| Component            | Technology                          | Purpose                              |
| -------------------- | ----------------------------------- | ------------------------------------ |
| **Framework**        | React Native (Expo SDK)             | Cross-platform mobile development    |
| **Language**         | TypeScript                          | Type safety and developer experience |
| **UI Library**       | NativeBase                          | Design system and components         |
| **Styling**          | NativeWind                          | Utility-first styling                |
| **Navigation**       | React Navigation v7                 | Stack and tab navigation             |
| **State Management** | Zustand                             | Lightweight state management         |
| **HTTP Client**      | Axios                               | API communication                    |
| **Audio**            | expo-av                             | Audio playback and recording         |
| **Storage**          | SecureStore/EncryptedStorage        | Secure local storage                 |
| **Monitoring**       | Sentry                              | Error tracking and performance       |
| **Build**            | EAS (Expo Application Services)     | CI/CD for mobile apps                |
| **Testing**          | Jest + React Native Testing Library | Unit and integration tests           |

### Backend

| Component      | Technology                     | Purpose                       |
| -------------- | ------------------------------ | ----------------------------- |
| **Runtime**    | Supabase Edge Functions (Deno) | Serverless backend logic      |
| **Language**   | TypeScript                     | Type safety and consistency   |
| **Database**   | Supabase Postgres              | Primary data storage          |
| **Auth**       | Supabase Auth (OTP)            | User authentication           |
| **Security**   | Row Level Security (RLS)       | Database-level access control |
| **Storage**    | Cloudflare R2                  | File storage (S3-compatible)  |
| **Payments**   | Wave API + Orange Money API    | Payment processing            |
| **Monitoring** | Sentry + Supabase Logs         | Error tracking and analytics  |

### DevOps & Infrastructure

| Component               | Technology                  | Purpose                           |
| ----------------------- | --------------------------- | --------------------------------- |
| **Version Control**     | GitHub                      | Code repository and collaboration |
| **CI/CD**               | GitHub Actions              | Automated testing and deployment  |
| **Database Migrations** | Supabase CLI                | Schema management                 |
| **Type Generation**     | Supabase CLI                | Automatic TypeScript types        |
| **Secrets Management**  | Supabase Secrets            | Environment variable management   |
| **Backup**              | Supabase Auto + R2 Metadata | Data protection                   |

## Development Environment Setup

### Prerequisites

```bash
# Required tools
node --version  # v18+
npm --version  # v9+
expo --version  # Latest
supabase --version  # Latest
```

### Local Development Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd linkart

# 2. Install dependencies
npm install

# 3. Setup Supabase locally
supabase start
supabase db reset

# 4. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 5. Generate TypeScript types
supabase gen types typescript --local > src/types/supabase.ts

# 6. Start development servers
npm run dev:mobile  # Expo development server
npm run dev:functions  # Supabase Edge Functions
```

### Environment Variables

```bash
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudflare R2 Configuration
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=your_bucket_name
R2_ENDPOINT_URL=your_r2_endpoint

# Payment Providers
PAYMENT_WAVE_CLIENT_ID=your_wave_client_id
PAYMENT_WAVE_SECRET=your_wave_secret
PAYMENT_OM_CLIENT_ID=your_om_client_id
PAYMENT_OM_SECRET=your_om_secret

# Monitoring
SENTRY_DSN=your_sentry_dsn

# App Configuration
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_APP_NAME=Linkart
```

## Database Schema

### Core Tables

```sql
-- Users table with capabilities
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE,
  email TEXT UNIQUE,
  name TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  capabilities JSONB DEFAULT '{"can_buy": true, "can_sell": false, "can_withdraw": false, "can_boost": false}',
  wallet_balance NUMERIC DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('beat', 'sample', 'kit', 'service')),
  price NUMERIC NOT NULL,
  license TEXT,
  preview_key TEXT,
  file_key TEXT,
  status TEXT CHECK (status IN ('draft', 'pending', 'active', 'rejected')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  type TEXT CHECK (type IN ('sale', 'boost', 'withdrawal', 'refund')),
  gross_amount NUMERIC NOT NULL,
  commission_amount NUMERIC NOT NULL,
  net_amount NUMERIC NOT NULL,
  status TEXT CHECK (status IN ('pending', 'paid_held', 'released', 'failed', 'refunded')),
  contract_url TEXT,
  provider_payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### RLS Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "users_own_data" ON users
FOR ALL USING (auth.uid() = id);

-- Products are public for reading when active
CREATE POLICY "products_public_read" ON products
FOR SELECT USING (status = 'active');

-- Users can only create products for themselves
CREATE POLICY "products_owner_create" ON products
FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## API Endpoints

### Core Endpoints

```typescript
// Product Management
POST   /api/upload-request     // Get presigned upload URL
POST   /api/upload-complete    // Confirm upload completion
GET    /api/products           // List products with filters
GET    /api/products/:id       // Get product details

// Payment Processing
POST   /api/pay                // Initiate payment
POST   /api/payment-callback   // Webhook from payment provider
POST   /api/generate-download  // Get download URL

// Wallet Management
GET    /api/wallet             // Get wallet balance
POST   /api/withdraw           // Request withdrawal

// Boost System
POST   /api/boost              // Purchase boost

// Admin Functions
GET    /api/admin/products/pending
POST   /api/admin/products/:id/approve
POST   /api/admin/withdrawals/:id/mark-paid
```

## File Storage Strategy

### Cloudflare R2 Bucket Structure

```
linkart-storage/
├── beats/
│   └── {userId}/
│       └── {productId}.zip
├── previews/
│   └── {userId}/
│       └── {productId}_preview.mp3
├── contracts/
│   └── {txId}.pdf
└── avatars/
    └── {userId}.jpg
```

### Presigned URL Configuration

```typescript
// Upload URLs (5 minute TTL)
const uploadConfig = {
  expiresIn: 300, // 5 minutes
  conditions: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    allowedMimeTypes: ['audio/mpeg', 'application/zip'],
  },
};

// Download URLs (15 minute TTL)
const downloadConfig = {
  expiresIn: 900, // 15 minutes
  maxDownloads: 3,
};
```

## Security Configuration

### Authentication Flow

```typescript
// OTP Authentication
const authFlow = {
  step1: 'User enters phone/email',
  step2: 'System sends OTP via Supabase Auth',
  step3: 'User enters OTP code',
  step4: 'System validates and creates JWT',
  step5: 'JWT stored securely in app',
};
```

### Security Headers

```typescript
// Edge Function security headers
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000',
};
```

## Performance Optimization

### Database Optimization

```sql
-- Key indexes for performance
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_buyer_id ON transactions(buyer_id);
CREATE INDEX idx_download_tokens_expires_at ON download_tokens(expires_at);
```

### Caching Strategy

```typescript
// Multi-level caching
const cacheStrategy = {
  client: 'Zustand store + AsyncStorage',
  edge: 'Supabase Edge Functions cache',
  cdn: 'Cloudflare R2 CDN',
  database: 'Postgres query optimization',
};
```

## Testing Strategy

### Test Configuration

```json
// jest.config.js
{
  "preset": "react-native",
  "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
  "testMatch": ["**/__tests__/**/*.test.ts"],
  "collectCoverageFrom": ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 70,
      "lines": 70,
      "statements": 70
    }
  }
}
```

### Test Commands

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## Deployment Configuration

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test:unit
      - run: npm run test:integration

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: supabase db push --project-ref $SUPABASE_PROJECT_REF
      - run: supabase functions deploy --project-ref $SUPABASE_PROJECT_REF
```

### Environment Management

```typescript
// Environment-specific configurations
const environments = {
  development: {
    supabaseUrl: process.env.SUPABASE_URL_DEV,
    r2Bucket: 'linkart-dev-storage',
    paymentProvider: 'sandbox',
  },
  staging: {
    supabaseUrl: process.env.SUPABASE_URL_STAGING,
    r2Bucket: 'linkart-staging-storage',
    paymentProvider: 'sandbox',
  },
  production: {
    supabaseUrl: process.env.SUPABASE_URL_PROD,
    r2Bucket: 'linkart-prod-storage',
    paymentProvider: 'live',
  },
};
```

## Monitoring & Observability

### Error Tracking

```typescript
// Sentry configuration
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter sensitive data
    if (event.user) {
      delete event.user.email;
      delete event.user.phone;
    }
    return event;
  },
});
```

### Performance Monitoring

```typescript
// Key metrics to track
const metrics = {
  api: {
    responseTime: 'p95 < 800ms',
    errorRate: '< 1%',
    throughput: 'requests per second',
  },
  database: {
    queryTime: 'p95 < 100ms',
    connectionPool: 'utilization < 80%',
  },
  storage: {
    uploadTime: 'p95 < 5s',
    downloadTime: 'p95 < 3s',
  },
};
```

---

_This document defines the technical stack, development setup, and infrastructure requirements for
the Linkart project._
