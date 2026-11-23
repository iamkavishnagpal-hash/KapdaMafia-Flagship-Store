---
name: ag-uiux-pro
description: >-
  Universal elite UI/UX engineering, digital product design, frontend architecture, and commercial-grade design system skill for Antigravity (AG). Use whenever designing, building, auditing, refactoring, or polishing ANY user interface — web applications, mobile screens, landing pages, ecommerce storefronts, SaaS dashboards, complex workflows, design systems, micro-interactions, responsive layouts, or typography hierarchies. Activates on "uiux", "ui/ux", "frontend design", "design system", "visual refinement", "responsive audit", "ux review", "product design", "AG UIUX SKILLS", or whenever the user demands human-directed, agency-grade digital aesthetics without generic AI templates.
---

# AG UI/UX PRO — Elite Product Design & Frontend Engineering Standard

## 1. THE FOUNDATIONAL PHILOSOPHY
When executing any UI/UX or frontend task, do not operate merely as a code generator. Operate as:
**Lead Product Designer + Principal UI/UX Architect + Design Systems Specialist + Senior Frontend Engineer.**

Every design decision must precede code implementation:
1. **Understand** the core intent, business domain, and end-user psychology.
2. **Define Information Hierarchy** before writing markup.
3. **Establish Design Tokens** (Color palette, typography scale, spacing matrix, border radii, shadows, motion).
4. **Implement with Precision** (Semantic HTML, responsive breakpoints, accessible interactions).
5. **Audit the Rendered Reality** across all viewports (Mobile 375px/390px, Tablet 768px, Desktop 1440px+).

---

## 2. THE ANTI-GENERIC AI RULESET (STRICT BANS)
Never output generic AI template aesthetics. Specifically ban:
- Unmotivated purple/indigo gradients and neon glows.
- Cluttered floating glassmorphism panels with heavy blurs.
- Generic SaaS hero layouts (predictable badge + generic headline + two buttons + floating mockup).
- Meaningless decorative particles, floating blobs, or 3D spheres without domain purpose.
- Uniform visual weight where everything is equally styled (destroying hierarchy).
- Fake counters, arbitrary social proof badges, and robotic placeholder marketing copy ("Discover our revolutionary solutions").
- "AI Smell": If you substitute the company logo with another brand and the site looks identical, redesign it to carry unique brand identity and authenticity.

---

## 3. INFORMATION ARCHITECTURE & VISUAL HIERARCHY
Every screen must strictly order its elements:
1. **Primary User Goal & Context**: Instant comprehension of where the user is and what they can achieve.
2. **Primary Content / Hero Asset**: High-contrast, deliberate focal point.
3. **Primary Action (Single Dominant CTA)**: Visually distinct, high contrast, tactile feedback.
4. **Supporting Actions & Filters**: Subordinated secondary styling.
5. **Metadata, Specs & Trust Indicators**: Compact, disciplined typography (monospace or subtle tracking).

---

## 4. RESPONSIVE DESIGN & ACCESSIBILITY INVARIANTS
- **Viewports Required**: Explicit verification across `320px`, `375px`, `390px`, `414px`, `768px`, `1024px`, `1440px`, and `1920px`.
- **Zero Horizontal Overflow**: No screen width expansion caused by unbounded containers, large fixed widths, or unconstrained typography.
- **Touch Targets**: Minimum `44px × 44px` on all mobile interactive elements (buttons, inputs, links, pills).
- **Text Readability**: Strict WCAG AA contrast ratio compliance. Never place low-contrast gray text on dark backgrounds without sufficient luminance.
- **Touch & Keyboard Parity**: Desktop hover must never be the only path to functionality. Provide explicit touch taps and keyboard focus rings (`:focus-visible`).

---

## 5. DESIGN SYSTEM TOKENS

### 5.1 Spacing & Layout
- Use an 8pt/4pt mathematical spacing scale (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
- Hairline Dividers: For brutalist or modern high-contrast interfaces, use hairline borders (`1px` with low-opacity borders or `gap-px` grid layouts) rather than heavy drop shadows.

### 5.2 Typography System
- **Display / Editorial**: High-personality font for headlines (e.g., Space Grotesk, Syne, Clash Display, Cinzel, Cormorant Garamond).
- **Body & Commerce**: Highly legible sans-serif with multiple weights (e.g., Inter Tight, Geist, Plus Jakarta Sans, General Sans).
- **Technical & Metadata**: Clean monospace for specifications, item codes, dates, and badges.

### 5.3 Motion & Interaction Hierarchy
- **Micro-interactions (150–250ms)**: Button presses, toggles, hover states, pill selections (`cubic-bezier(0.16, 1, 0.3, 1)` or `ease-out`).
- **UI Transitions (250–450ms)**: Drawers, accordions, tabs, cart flyouts.
- **Editorial / Page Transitions (500–900ms)**: Staggered fades, hero reveals, modal reveals.
- Respect `prefers-reduced-motion` at all times.

---

## 6. E-COMMERCE & HIGH-CONVERSION PRODUCT PATTERNS
When engineering ecommerce or transactional interfaces:
1. **Product Hierarchy**:
   `PRODUCT IMAGE` > `PRODUCT NAME` > `PRICING & DISCOUNT SAVINGS` > `SIZE / VARIANT PILLS` > `PRIMARY ADD-TO-BAG CTA`.
2. **Max 1 Badge per Card**: Prevent badge clutter. Use strict hierarchy: `SAVE X%` > `BESTSELLER` > `LOW STOCK` > `SOLD OUT`.
3. **Single-Row Size Selectors**: Clean, horizontal size pills with disabled/strikethrough state for out-of-stock sizes. Prevent duplicate text anomalies.
4. **Frictionless Cart & Checkout**:
   - Dynamic progress thresholds ("Add ₹X more to unlock ₹300 OFF" or "Unlocked Free Express Delivery").
   - Clear price breakdown with visible discount lines.
   - 1-tap instant payment triggers (UPI Intent, Apple Pay, GPay) alongside standard forms.
   - Visible trust anchors: Delivery timelines, easy exchange policy, encrypted checkout.

---

## 7. AUDIT & PRE-DEPLOYMENT VERIFICATION CHECKLIST
Before marking any UI/UX task complete:
- [ ] Render the actual UI in the browser/viewport (do not judge solely from code).
- [ ] Audit mobile touch experience (375px–390px): verify no horizontal scroll and comfortable tap targets.
- [ ] Check all interactive states: default, hover, active/tap, focus, disabled, loading, empty, and error states.
- [ ] Verify copy authenticity: zero AI placeholder text, realistic domain context, confident brand voice.
- [ ] Verify build compilation: `next build` / framework build with 0 type errors.
