# GLOW VAI: AI Face Analysis Lead Flow & Scoring Engine

This document provides complete technical specifications for the `/face-analysis` route ([app/face-analysis/page.tsx](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/app/face-analysis/page.tsx)), browser camera heuristics, scoring engine, and product recommendation matrix.

---

## 1. Flow Overview & Architecture

The Face Analysis feature serves as the primary lead generation engine for GLOW VAI. It is built to run on low-power mobile devices directly within the web browser.

```
Step 1: User Lead Form        Step 2: Age Gate & Consent     Step 3: Live Camera Scan
+----------------------+     +-----------------------+     +------------------------+
| Name, Phone, Email,  | --> | Consent to DPDP terms | --> | 30-sec canvas analysis |
| City, Skin Concerns  |     | Confirm age 18+       |     | Frames processed locally|
+----------------------+     +-----------------------+     +------------------------+
           |                                                            |
           v (POST /api/lead)                                           v (Local Pixel Math)
+----------------------+                                   +------------------------+
| Google Sheets Lead   |                                   | Calculated Sub-Scores: |
| Created (status:     |                                   | Hydration, Texture,    |
| 'pending')           |                                   | Tone, Clarity (35-95)  |
+----------------------+                                   +------------------------+
                                                                        |
                                                                        v (PATCH /api/lead)
                                                           +------------------------+
                                                           | Google Sheets Sync:    |
                                                           | Overall score + status |
                                                           | = 'completed'          |
                                                           +------------------------+
                                                                        |
                                                                        v
                                                           Step 4: Routine Results
                                                           +------------------------+
                                                           | Score Breakdown Card   |
                                                           | Tailored Product Suite |
                                                           +------------------------+
```

---

## 2. On-Device Canvas Heuristics Engine

### Algorithm Specs ([lib/analysis/engine.ts](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/lib/analysis/engine.ts))

The browser camera captures video frames onto an HTML5 `<canvas>` element at 30 FPS. The heuristic engine extracts sub-scores across 4 skin parameters:

1. **Hydration Score (35 - 95)**: Calculated from specular highlight reflections and surface luminance uniformity across cheek and forehead zones. Higher specular reflection within ambient thresholds correlates to higher hydration.
2. **Texture Score (35 - 95)**: Evaluates local luminance variance (standard deviation of grayscale values across 8x8 pixel patches). High variance indicates surface roughness; low variance indicates smooth texture.
3. **Tone Score (35 - 95)**: Computed using CIELAB color space transformation to measure color variance across facial patches, detecting redness and hyperpigmentation clusters.
4. **Clarity Score (35 - 95)**: Counts localized red and dark pixel clusters representing blemishes or dark spots.

### Score Clamping & Randomized Natural Variance
To prevent unrealistic edge values (e.g., 0% or 100%), all raw scores are clamped between **35 and 95**. In compliance with consumer protection guidelines, sample scores displayed in promotional materials are labeled explicitly as *"Sample score"*.

### Lighting Quality Checks
- If mean frame luminance is `< 30` (too dark) or `> 230` (overexposed), the engine flags `confidence: "low"`.
- Under low confidence, the analysis halts and prompts: *"Lighting is too dim or too bright. Please step near a natural window for accurate results."*

---

## 3. Product Recommendation Engine

Based on the lowest sub-score calculated during the analysis, [lib/recommend.ts](file:///d:/Client%20Projects/GlowVai/glow%20vai%20landing%20page/lib/recommend.ts) maps the user's primary skin target to a tailored 3-step routine:

| Primary Deficit | Primary Concern Target | Recommended Routine |
| :--- | :--- | :--- |
| Hydration < 60 | Dehydration & Dryness | Cold-Pressed Hyaluronic Hydrator + Barrier Restore Cream |
| Texture < 60 | Roughness & Enlarged Pores | Niacinamide Clarifying Serum + Gentle Gel Cleanser |
| Tone < 60 | Hyperpigmentation & Dullness | Vitamin C Brightening Concentrate + Daily Shield SPF 50 |
| Clarity < 60 | Blemishes & Breakouts | Salicylic Acid Spot Treatment + Balancing Cleanser |

---

## 4. API Sync & State Machine

1. **Session Creation**:
   - Client sends initial lead payload to `POST /api/lead`.
   - API creates session cookie `gv_session_id` and writes row to `Leads` sheet tab in Google Sheets with `status: "pending"`.
2. **Scan Completion**:
   - Client completes camera analysis.
   - Client sends computed scores to `PATCH /api/lead`.
   - API updates the existing session row in Google Sheets with `status: "completed"`, `overall_score`, and `sub_scores`.

---

## 5. Mandatory Medical Disclaimer

All face analysis screens and result cards display the prominent disclaimer banner:
> *"Cosmetic skin insights, not medical advice. GLOW VAI recommendations provide general cosmetic routine suggestions and do not replace professional dermatological diagnosis."*
