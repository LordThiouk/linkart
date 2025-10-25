# Linkart Project Brief

> Version: v1.0  
> Last Updated: 2025-10-22  
> Status: Foundation Document

## Project Overview

**Linkart** is a mobile marketplace platform for the Senegalese music industry, designed to connect
beatmakers, artists, studios, and sound engineers in a secure, monetizable ecosystem.

### Core Mission

- Create a **digital marketplace** for beats, samples, kits, and audio services
- Enable **fair monetization** with 5% platform commission
- Provide **secure escrow system** for transactions
- Support **visibility boosts** and **rating systems**
- Prepare for **SODAV integration** (Senegalese music rights organization)

## Key Stakeholders

| User Type                 | Role                                      | Primary Goal               |
| ------------------------- | ----------------------------------------- | -------------------------- |
| **Beatmaker**             | Creates and sells beats, samples, kits    | Monetize musical creations |
| **Artist**                | Buys beats or audio services              | Produce music tracks       |
| **Sound Engineer/Studio** | Offers audio services (mixing, mastering) | Find clients               |
| **Manager/Label**         | Supervises purchases and sales            | Centralize management      |
| **Admin**                 | Validates products, processes withdrawals | Ensure compliance          |

## Core Business Model

- **5% commission** on all sales (fixed rate)
- **Paid visibility boosts** for products and profiles
- **Escrow system** - funds held until transaction completion
- **Manual withdrawal processing** via Wave/Orange Money
- **No subscription fees** (freemium MVP model)

## Technical Foundation

### Architecture

- **Mobile-first**: React Native (Expo) + TypeScript
- **Backend**: Supabase (Postgres + Edge Functions)
- **Storage**: Cloudflare R2 (presigned URLs only)
- **Payments**: Wave API + Orange Money API
- **Security**: RLS + JWT + Escrow system

### Key Features (MVP)

1. **User Authentication** (OTP via phone/email)
2. **Product Management** (upload, preview, approval workflow)
3. **Secure Payments** (Wave/OM integration with escrow)
4. **Download System** (presigned URLs with TTL)
5. **Wallet & Withdrawals** (manual admin processing)
6. **Boost System** (paid visibility)
7. **Rating System** (post-purchase reviews)
8. **Admin Dashboard** (product approval, withdrawal processing)

## Success Criteria

- MVP functional for 50+ real creators
- Successful real transactions via Wave/OM
- Download time < 15s per file
- No major security incidents
- Well-documented and tested codebase
- Ready for SODAV integration (v2)

## Project Constraints

- **Language**: French (v1), English (v2)
- **Target Devices**: Android 8+ / iOS 14+
- **Performance**: Page load < 3s, instant audio preview
- **Security**: RLS enabled, JWT validation, presigned URLs
- **Compliance**: GDPR, CNRA/SODAV regulations

## Future Vision

- **Phase 2**: SODAV integration for automatic copyright declaration
- **Phase 3**: AI-powered audio tagging and recommendations
- **Phase 4**: Booking system for studios and engineers
- **Phase 5**: Public API for third-party integrations

---

_This document serves as the foundation for all other memory bank files and should be referenced
when making architectural or business decisions._
