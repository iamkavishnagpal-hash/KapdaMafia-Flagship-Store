# ARCHITECTURE.MD — TECHNICAL IMPLEMENTATION & STATE ENGINE

---

## 1. COMPONENT & MODULE ARCHITECTURE

```
kapda-mafia/src/
├── app/
│   ├── layout.tsx                 # Root layout with font imports, global providers, & spatial sequence
│   ├── page.tsx                   # Server component data fetcher (CatalogService)
│   ├── globals.css                # Semantic tokens, typography system, spatial perspective rig
│   └── store/page.tsx             # Physical flagship locator page (NIT-5 Faridabad)
├── components/
│   ├── SpatialShowroomSequence.tsx# Core spatial arrival sequence (Exterior -> Threshold -> Atrium)
│   ├── DualHomePage.tsx           # World-aware home switcher (Kapda vs Shoes)
│   ├── Navbar.tsx                 # Fixed top navigation with world toggles & showroom trigger
│   ├── Hero.tsx                   # Editorial campaign showcase & flagship walk-in button
│   ├── ShoesMafiaView.tsx         # Footwear vault UI with 3D pedestal showcase
│   └── WorldSelectorModal.tsx     # Instant dual-world switcher modal
├── context/
│   ├── WorldContext.tsx           # Global state: active world, showroom visibility, phone auth
│   └── CartContext.tsx            # Unified bag state across both apparel and footwear
└── utils/
    └── soundEffects.ts            # Zero-dependency Web Audio API procedural acoustic engine
```

---

## 2. STATE MANAGEMENT STRATEGY

### Global World State (`WorldContext.tsx`)
- `world`: `'clothing' | 'shoes'` (persisted to `localStorage: km_active_world`).
- `isShowroomOpen`: `boolean` (persisted to `sessionStorage: km_entered_portal`). Automatically opens on initial visit and remains closed upon subsequent route changes unless explicitly invoked via the menu or header.
- `setWorld(world: StoreWorld)`: Triggers immediate re-render of active world view without resetting user cart or authentication.

### Unified Cart Engine (`CartContext.tsx`)
- Manages products from both `clothing` and `shoes` worlds in a single, persistent bag.
- Single unified checkout flow with pan-India pin-code validation and real-time inventory reservation.

---

## 3. PROCEDURAL SOUND SYNTHESIS (`soundEffects.ts`)

Instead of loading heavy, latency-prone MP3/WAV assets over the network, all physical store acoustics are generated procedurally on demand using the browser's native **Web Audio API**:

1. **`playSubBassThud()`**:
   - Oscillator: `triangle`
   - Frequency: Exponential ramp from 90Hz down to 32Hz over 220ms.
   - Purpose: Simulates low-frequency architectural floor resonance.
2. **`playPneumaticHiss()`**:
   - Noise Buffer: Synthesized white noise over 450ms.
   - Filter: Biquad bandpass filter sweeping from 1800Hz to 800Hz ($Q=1.8$).
   - Purpose: Models pressurized air seal release between sliding tempered glass leaves.
3. **`playStorefrontArrivalChime()`**:
   - 2-tone resonant studio chime: C5 (523.25Hz) followed 160ms later by E5 (659.25Hz).
   - Envelope: Smooth exponential decay over 650ms.
   - Purpose: Deliberate, high-end acoustic arrival confirmation.

---

## 4. PERFORMANCE & BUILD OPTIMIZATION
- Next.js 16.3 with Turbopack compilation.
- Sub-second static generation across all catalog and content routes.
- Fully tree-shaken Lucide icon vectors.
- Zero external runtime script tags or trackers blocking first contentful paint (`FCP < 0.6s`).
