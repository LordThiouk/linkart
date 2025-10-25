# Linkart - Setup Guide

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+
- npm 9+
- Git
- Expo CLI: `npm install -g @expo/cli`
- Supabase CLI: `npm install -g supabase`

### 2. Clone and Install

```bash
git clone https://github.com/LordThiouk/linkart.git
cd linkart
npm install --legacy-peer-deps
```

### 3. Supabase Setup

#### Option A: Use Remote Supabase Project (Recommended)

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and API keys from Settings > API
3. Copy `env.example` to `.env` and fill in your credentials:

```bash
cp env.example .env
```

Edit `.env` with your Supabase credentials:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. Link to your remote project:

```bash
supabase link --project-ref your_project_ref
```

5. Apply migrations:

```bash
supabase db push
```

6. Generate TypeScript types:

```bash
npm run supabase:types
```

#### Option B: Local Development (Requires Docker)

1. Install Docker Desktop
2. Start local Supabase:

```bash
supabase start
```

3. Apply migrations:

```bash
supabase db push
```

4. Generate types:

```bash
npm run supabase:types
```

### 4. Cloudflare R2 Setup

1. Create a Cloudflare R2 bucket
2. Get your R2 credentials from Cloudflare dashboard
3. Add to `.env`:

```env
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=linkart-storage
R2_ENDPOINT_URL=your_r2_endpoint
```

### 5. Payment Providers Setup

1. **Wave API**: Get credentials from Wave dashboard
2. **Orange Money API**: Get credentials from Orange Money
3. Add to `.env`:

```env
PAYMENT_WAVE_CLIENT_ID=your_wave_client_id
PAYMENT_WAVE_SECRET=your_wave_secret
PAYMENT_OM_CLIENT_ID=your_om_client_id
PAYMENT_OM_SECRET=your_om_secret
```

### 6. Start Development

```bash
# Start the mobile app
npm run dev:mobile

# Or start both app and functions
npm run dev
```

## 📱 Mobile App Development

### Expo Setup

1. Install Expo Go app on your phone
2. Scan QR code from terminal
3. Or use iOS Simulator/Android Emulator

### Build for Production

```bash
# Android
npx expo build:android

# iOS
npx expo build:ios
```

## 🗄 Database Management

### Apply New Migrations

```bash
# Create new migration
supabase migration new "description"

# Apply migrations
supabase db push

# Generate types
npm run supabase:types
```

### Reset Database

```bash
supabase db reset
```

## 🧪 Testing

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# All tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Supabase Functions

```bash
# Deploy functions
supabase functions deploy
```

### Mobile App

```bash
# Build and submit to stores
npx expo build:android
npx expo build:ios
npx expo submit:android
npx expo submit:ios
```

## 🔧 Troubleshooting

### Common Issues

1. **Dependencies conflicts**: Use `--legacy-peer-deps` flag
2. **Supabase connection**: Check your credentials in `.env`
3. **Expo issues**: Clear cache with `npx expo start -c`
4. **TypeScript errors**: Run `npm run supabase:types`

### Environment Variables

Make sure all required environment variables are set:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `PAYMENT_WAVE_CLIENT_ID`
- `PAYMENT_WAVE_SECRET`

## 📚 Documentation

- [Project Requirements](.cursor/rules/project_requirements_document.mdc)
- [Technical Architecture](.cursor/rules/tech_stack_document.mdc)
- [Security Guidelines](.cursor/rules/security_guideline_document.mdc)
- [Frontend Guidelines](.cursor/rules/frontend_guidelines_document.mdc)
- [Testing Strategy](.cursor/rules/testing.mdc)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## 📞 Support

- GitHub Issues: [Create an issue](https://github.com/LordThiouk/linkart/issues)
- Email: pirlothiouk@gmail.com

---

**Linkart** - Structurons l'économie musicale sénégalaise via la tech 🎵
