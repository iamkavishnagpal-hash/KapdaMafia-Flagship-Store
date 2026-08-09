# Kapda Mafia Build Specification

Kapda Mafia is a production-grade omnichannel men's fashion commerce platform made of two connected products on one Commerce Core: the public Customer Experience and the protected Business OS for owner and team.

## Product north star

- Customer: discover the brand, explore products, try virtually, buy, track, return/rebuy, and become a repeat customer.
- Store: receive product, catalog/barcode, sync inventory, sell via POS/website/marketplaces/WhatsApp, fulfill, handle returns/RTO, reconcile inventory.
- Owner: open Business OS, see reality, ask AI, approve actions, automate operations, grow.

## Design direction

- Customer website: premium streetwear, cinematic, editorial, immersive, high contrast, near-black/charcoal surfaces, off-white typography, controlled deep red accent, asymmetric layouts, oversized media, subtle grain, intentional motion, mobile-first commerce controls.
- Business OS: same brand DNA but operational, dense where useful, data-driven, command-center oriented, usable by owner, manager, sales staff, warehouse and marketing staff.
- Avoid generic SaaS dashboards, Shopify clones, meaningless glassmorphism, excessive gradients/shadows/rounded cards, and fake AI decorations.

## Shared architecture

```text
Customer Website -> Commerce Core -> Business OS -> Omnichannel Engine
Browse/Search/Product/Try-On/Cart/Checkout/Account -> Products/Orders/Inventory/Customers/Payments/Fulfillment -> POS/Analytics/AI -> Amazon/Flipkart/Meesho/WhatsApp
```

Rules:

1. One inventory source of truth.
2. Website, POS, WhatsApp and marketplaces use channel adapters, not duplicated commerce logic.
3. Inventory is ledger-based; never rely on a single mutable stock field as the only source of truth.
4. Stock reservation must be atomic with row locking/equivalent concurrency protection.
5. External APIs use interfaces, service abstractions, environment variables, loading/error states and development adapters until configured.
6. AI converts natural language into validated intents/tool calls; it never mutates inventory directly and every AI tool enforces RBAC.

## Phase plan

1. Foundation: project architecture, design system, database plan, auth/RBAC boundaries, routing, responsive shells.
2. Customer: homepage, shop, collection, search, product, cart, checkout, account, WhatsApp CTA, virtual try-on shell.
3. Commerce: products, variants, inventory ledger, orders, payments, reservations, RTO risk engine.
4. Business OS: owner cockpit, POS, inventory, orders, fulfillment, customers.
5. Operations: shipping abstraction, returns, NDR/RTO workflows, notifications.
6. Omnichannel: WhatsApp, Amazon, Flipkart, Meesho, retryable sync logs/webhooks.
7. AI: copilot, voice, recommendations, forecasting, cataloging, marketing.
8. Advanced: computer vision inventory, production virtual try-on provider, predictive analytics.

## Required routes

Customer:

- `/` cinematic homepage with hero, new drop, trending, shop by vibe, featured collection, editorial/lookbook, AI virtual try-on, best sellers, UGC, reviews, store experience, store finder, WhatsApp CTA, footer.
- `/shop`, `/collection/[slug]`, `/search` with product grid, filters and sorting.
- `/product/[slug]` with media gallery/video/360 slot, title, price, discount, sizes, color, stock, size guide, fit recommendation, delivery pincode, wishlist, add to bag, buy now, reviews, customer photos, FAQs, related products, complete the look, AI Try-On and mobile sticky purchase controls.
- `/try-on` virtual fitting room flow: camera/upload, consent, garment select, VTON, result, retry, save, privacy disclaimer.
- `/cart`, `/checkout`, `/account`.

Business OS:

- `/os`, `/os/pos`, `/os/inventory`, `/os/products`, `/os/orders`, `/os/fulfillment`, `/os/returns`, `/os/customers`, `/os/marketing`, `/os/analytics`.
- Global command center: Cmd/Ctrl+K.
- Mobile OS supports scanning, quick sale, order lookup, inventory lookup and owner AI questions.

## Core database tables

`users`, `roles`, `permissions`, `role_permissions`, `user_roles`, `stores`, `locations`, `employees`, `products`, `product_variants`, `categories`, `collections`, `product_images`, `product_videos`, `product_tags`, `inventory_items`, `inventory_locations`, `inventory_levels`, `inventory_reservations`, `inventory_ledger`, `inventory_adjustments`, `stock_transfers`, `stock_counts`, `orders`, `order_items`, `order_status_history`, `payments`, `payment_transactions`, `refunds`, `customers`, `customer_addresses`, `customer_profiles`, `customer_preferences`, `customer_consents`, `customer_events`, `channels`, `channel_accounts`, `channel_products`, `channel_inventory`, `channel_orders`, `channel_sync_logs`, `channel_webhooks`, `shipments`, `shipment_packages`, `shipment_events`, `ndr_events`, `rto_events`, `return_requests`, `return_items`, `quality_checks`, `campaigns`, `campaign_variants`, `audiences`, `coupons`, `discounts`, `ai_conversations`, `ai_messages`, `ai_actions`, `ai_tool_calls`, `ai_predictions`, `ai_recommendations`, `dashboard_widgets`, `dashboard_layouts`, `audit_logs`, `system_events`, `failed_jobs`.

## Security and quality bar

- Supabase Auth-ready, protected routes, MFA-ready owner architecture, granular RBAC, server-side authorization, audit logs, webhook verification, rate limiting, validation, Sentry-ready monitoring and secure env handling.
- Every major screen must handle loading, empty, error, success and offline/failure states.
- Responsive targets: desktop 1440/1280/1024, tablet 834/768, mobile 430/414/390/375.
- Accessibility: semantic HTML, keyboard navigation, visible focus, contrast, labels, alt text, reduced motion.
- Performance: optimized images, lazy loaded heavy media/3D, code splitting, reduced JS where possible.

## Current implementation status

This repository currently contains Phase 1 scaffolding: Next.js/TypeScript/Tailwind foundation, cinematic customer shell routes, protected Business OS shell routes, shared commerce types, RTO scoring, inventory service interface and channel/RBAC boundaries. Advanced integrations are intentionally represented as interfaces/architecture until credentials and providers are configured.
