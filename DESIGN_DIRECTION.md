# DESIGN_DIRECTION.MD — AESTHETIC DOCTRINE & DESIGN SYSTEM

---

## 1. BRAND ETHOS: MASCULINE INDUSTRIAL LUXURY
Kapda Mafia expresses the raw, unyielding weight of industrial construction combined with the bespoke precision of haute streetwear.

The aesthetic references brutalist architecture, cast concrete, steel reinforcement beams, high-density combed yarn, and moody ambient studio lighting.

---

## 2. COLOR TOKEN SYSTEM

### Core Architectural Canvas
- `--color-bg: #080808;` (Obsidian Void / Primary Ground)
- `--color-surface: #111111;` (Cast Concrete Surface)
- `--color-surface-elevated: #161616;` (Elevated Display Pedestal)
- `--color-border: #1E1E1E;` (Cold Rolled Steel Hairline)
- `--color-border-subtle: #141414;` (Mortar Joint Hairline)

### Typographic Contrast
- `--color-text-primary: #F4F4F4;` (Warm Natural Chalk / High Contrast)
- `--color-text-secondary: #C8C3B8;` (Unbleached Cotton / Raw Ecru)
- `--color-text-muted: #888888;` (Cast Concrete Ash)
- `--color-text-dim: #555555;` (Subterranean Dark Ash)

### Utilitarian Accents (Strictly Functional)
- `--color-accent: #7D0A0A;` (Deep Faridabad Oxblood / Apparel Accent)
- `--color-accent-hover: #9E1010;` (Active Oxblood Bloom)
- `--color-shoes-accent: #1A8F7A;` (Cold Cyan Surgical Sole Glow)

---

## 3. TYPOGRAPHIC HIERARCHY

| Role | Font Family | Weight & Tracking | Leading | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display Title** | Space Grotesk | 700 / `-0.04em` | `0.94` | Heavyweight, structural, imposing presence |
| **Haute Couture Serif** | Cormorant Garamond | Italic 400 / `-0.01em` | `1.0` | Editorial balance & bespoke craftsmanship |
| **Commerce / Body** | Inter Tight | 400, 500, 600 / `-0.02em` | `1.55` | Legible, high-density data, neutral clarity |
| **Architectural Specs**| Monospace | 500 / `+0.25em` | `1.2` | Street plates, GSM specs, coordinates |

---

## 4. LIGHTING & MATERIAL TEXTURES
- **2700K Tungsten Halogen**: Radial illumination bleed (`radial-gradient`) modeling interior studio halogen lamps bleeding onto dusk concrete.
- **Micro-Cement Terrazzo**: Honed matte concrete floor aesthetic with subtle hairline borders.
- **Tempered Low-Iron Glass**: Sheen reflection overlays simulating physical sliding glass panels.
- **440 GSM Loopback Drape**: High-contrast, authentic photography capturing the true density of heavy cotton.

---

## 5. MOTION TOKENS & CAMERA DYNAMICS

- **Spatial Perspective Rig**: `perspective: 1400px; transform-style: preserve-3d;`
- **Architectural Dolly Ease**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Duration Hierarchy**:
  - Micro (Tactile Hover): `120ms – 180ms`
  - UI State Transitions: `300ms – 450ms`
  - Architectural Forward Dolly: `1400ms – 1600ms`
  - Acoustic Decay: `680ms`
