# GLOW VAI — Hero Product Photography Brief

## Overview
This document specifies the exact photography instructions for shooting the hero product bottle and texture swatches for **GLOW VAI**. The resulting photos will replace the placeholder assets in `/public/images/hero/`.

---

## 📷 1. Setup & Equipment
- **Camera**: Smartphone main camera (2x optical zoom tap, no digital distortion) or DSLR/mirrorless with a 50mm-85mm lens.
- **Aspect Ratio**: Shoot vertically at 4:5 aspect ratio.
- **Lighting**:
  - Place product next to a large window with soft indirect morning daylight.
  - Position a white foam-board card opposite the window to bounce soft fill light onto shadow areas.
  - **No flash**, no ceiling lights, no direct harsh sunlight.
- **Backdrop**: White paper sweep curved smoothly from table up the wall behind the bottle.

---

## 🧴 2. Product Preparation
- Wipe bottle clean of all dust and fingerprints with a microfiber cloth.
- Ensure front label is centered and level.
- Fill dropper so the liquid level line is visible through the glass.
- Capture one heroic frame with a single drop hanging from the tip of the dropper.

---

## 🖼️ 3. Deliverables List

| Filename | Description | Crop & Aspect |
|---|---|---|
| `hero-product-front.webp` | Front-facing 30ml serum bottle cutout (background removed, shadow preserved) | 4:5 cutout (1200x1500) |
| `hero-swatch.webp` | Macro close-up gel/cream swatch smear on clean white glass | 1:1 circle cutout (600x600) |
| `hero-product-34-left.webp` | 3/4 angle left bottle shot for product detail pages | 4:5 (1200x1500) |
| `hero-flatlay.webp` | Top-down flatlay with 3 products and botanical leaves | 16:9 (1920x1080) |
| `hero-hand.webp` | Natural skin-tone hand holding product | 4:5 (1200x1500) |

---

## 🎨 4. Post-Processing & Export
1. Remove white background cleanly using a vector mask.
2. Keep soft natural contact shadow on a separate layer (opacity ~18%).
3. Export WebP at 80% quality, targeting under 150KB file size.
4. Save exported file into `/public/images/hero/product.webp`.
