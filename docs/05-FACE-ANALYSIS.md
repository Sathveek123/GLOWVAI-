# Face Analysis & Gamified Glow Card

## Flow (Scan-Then-Lead Sequence)
1. **Pre-Scan Screen**:
   - Quick guidance (natural light, bare skin, clear frame).
   - Instant camera trigger or photo file upload fallback.
2. **Camera / Upload & Pixel Sampling**:
   - Image sampled on an offscreen canvas.
   - Central rectangular region luminance calculation ($0.299R + 0.587G + 0.114B$).
   - Normalized score mapping strictly bounded between 23 and 92, with a $\pm 3$ random offset.
3. **Gamified Results ("The Glow Card")**:
   - **Persona**: Determined deterministically via `pickPersona(subScores)` (*Dew Drop*, *Smooth Operator*, *Even Steven*, *Clear Skies*, *Balanced Boss*).
   - **Glow Level**: Levels 1–5 (*Fresh Start*, *Warming Up*, *Rising*, *Glowing*, *Radiant*) calculated via `levelFor(overallScore)`.
   - **4 Stat Bars**: Hydration Energy ⚡, Texture Smoothness ✨, Tone Radiance ☀️, Barrier Defense 🛡️.
   - **Product Routine**: 4–5 curated products exclusively from **Minimalist** and **The Derma Co** Excel database (`Glowvai_Product_Recommendation_Database.xlsx`).
4. **Data Collection (After Scan)**:
   - Form appears beneath results: Name, Phone (+91), optional Email, Consent checkboxes.
   - Saves lead data with scores to Google Apps Script (`Leads` tab) & sends WhatsApp routine code.

## Event Quiz Mode Fallback
- When `NEXT_PUBLIC_EVENT_MODE=quiz`, camera is replaced with a 4-question habit quiz.
- Deterministic score calculation maps answers to persona and level without numeric skin score.
- Saves lead with `scan_type = "quiz"`.

## Copy Guidelines
- Friendly, uplifting Gen Z tone.
- Zero em-dashes (`—`).
- Banned terms: *unlock*, *elevate*, *seamless*, *revolutionize*, *leverage*, *empower*, *flaw*, *problem skin*, *ugly*, *fix*.
- Mandatory disclaimer: *"Cosmetic skin insights from this photo, not medical advice."*
