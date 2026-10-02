# GLOW VAI: Design System, Typography & Compliance Guidelines

This document details the visual design language, color palette tokens, typography rules, glassmorphism specifications, ASCI advertising compliance rules, and tone-of-voice restrictions.

---

## 1. Color Palette Tokens

GLOW VAI uses a warm, editorial color palette based on HSL tailored colors designed for rich depth, softness, and modern glassmorphism UI elements.

| Token Name | Color Code / HSL | Usage Description |
| :--- | :--- | :--- |
| `bg-primary` | `#FAF8F5` / Warm Cream | Primary app background |
| `bg-secondary` | `#F4EFE6` / Soft Sand | Card and section contrast background |
| `text-primary` | `#1C2B26` / Deep Forest | Primary typography and headings |
| `text-muted` | `#5C6B64` / Slate Sage | Body text, captions, and secondary copy |
| `accent-coral` | `#E87A5D` / Warm Coral | Call-to-action buttons, badges, highlights |
| `accent-gold` | `#D4A359` / Botanical Gold | Rating stars, verified badges, accents |
| `glass-bg` | `rgba(250, 248, 245, 0.75)` | Glassmorphism card backdrops |
| `glass-border` | `rgba(28, 43, 38, 0.08)` | Subtle translucent card borders |

---

## 2. Typography System

GLOW VAI utilizes three curated font families loaded via `next/font/google`:

```
Bricolage Grotesque (Variable) -> Section Headings (h1, h2, h3)
Instrument Serif (Italics)     -> Editorial Emphasis & Font Accents (<Accent>)
DM Sans (400, 500, 700)        -> UI Controls, Body Copy, Navigation
```

### Font Pairings & Styling Usage
- **Display Headings (`h1`, `h2`)**: Set in Bricolage Grotesque with subtle negative letter spacing (`tracking-tight`).
- **Editorial Accent Class (`<Accent>`)**: Wraps key impact words in italicized Instrument Serif to add human craft and elegance.
  - Example: `Skin that <Accent>understands</Accent> your face`
- **Body & UI Controls**: Set in DM Sans for legibility across small mobile screens.

---

## 3. Glassmorphism Specifications

The platform employs modern glassmorphism card overlays across floating pills, navbar badges, and shop unlock gates.

### CSS Implementation Pattern
```css
.glass-card {
  background: rgba(250, 248, 245, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(28, 43, 38, 0.08);
  box-shadow: 0 8px 32px 0 rgba(28, 43, 38, 0.04);
}
```

---

## 4. Honesty & ASCI Compliance Framework

In accordance with Advertising Standards Council of India (ASCI) regulations and Indian Consumer Protection Rules:

### Rule 1: Verified Claim Matrix ([config/claims.ts](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/config/claims.ts))
Unverified claims or fabricated ratings (e.g., *"18,000+ happy customers"*, *"4.95 / 5 star rating"*) are strictly prohibited prior to verified sales history. Verified claims dynamically render based on proof state:
- `"Made in India"` -> Verified
- `"Photo never stored"` -> Verified (On-device engine guarantee)
- `"Free scan"` -> Verified

### Rule 2: Sample Score Labeling
All skin score displays in hero visuals, previews, and marketing banners must be labeled explicitly as `"Sample score"` rather than `"Live AI score"`.

### Rule 3: Mandatory Cosmetic Disclaimer
Every face analysis section must render the prominent banner:
> *"Cosmetic skin insights, not medical advice."*

---

## 5. Copy Restrictions & Tone of Voice

### Zero Em-Dash Policy
The usage of em-dashes (`—`) is strictly prohibited site-wide in all copy, headings, docstrings, and metadata. Use clean hyphens (`-`), colons (`:`), or commas (`,`) instead.

### Banned Corporate Buzzwords
The following terms are banned across all marketing materials:
- `unlock` (Except code variables like `ShopUnlockGate`)
- `elevate`
- `seamless`
- `revolutionize`
- `leverage`
- `empower`
- `journey`
- `glow-up`
- `game-changer`
- `clinical-level`
- `diagnostic` (Must use `cosmetic insight` instead)
