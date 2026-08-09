# Kapda Mafia

Kapda Mafia is a Gen-Z men's fashion brand platform: a premium cinematic Customer Website plus a protected Business OS for POS, inventory, orders, fulfillment, analytics, AI and omnichannel operations.

## Current phase

Phase 1 foundation is scaffolded with Next.js, TypeScript and Tailwind CSS. The implementation establishes:

- Customer routes for homepage, shop, product detail, cart, checkout, account, search, collection and virtual try-on.
- Business OS routes for owner cockpit, POS, inventory, orders, fulfillment, customers, marketing and analytics.
- Shared Commerce Core boundaries for inventory, RTO scoring, channel adapters and RBAC.
- Product specification in [`BUILD_SPEC.md`](./BUILD_SPEC.md).
- Environment template in [`.env.example`](./.env.example).

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Architecture rule

Website, POS, WhatsApp and marketplaces must use the same Commerce Core. Inventory is ledger-based, reservations must be atomic, and integrations remain explicit service abstractions until production credentials are configured.

## Environment

Copy `.env.example` to `.env.local` and fill only the providers you are actively integrating. Do not commit secrets.
