# Face analysis

## Flow
1. Form: name, phone, skin concern, consents, 18+. Google email from sign-in.
2. POST /api/lead creates the row and the session cookie.
3. Camera opens (MediaPipe Face Landmarker, self-hosted model). Checks: one face, size,
   brightness, yaw/pitch, steadiness.
4. Analysis runs on one steady frame (or a few averaged), not continuously at 30 FPS,
   to protect low-end phones.
5. If image consent is yes, the frame is resized (about 800px, JPEG q0.8) and uploaded.
   Otherwise it is discarded.
6. Scores are shown. PATCH saves them. Retry twice, never block the result.

## Engine
Heuristics on skin regions only (cheeks, forehead, chin; not eyes, brows, lips, hair):
- Texture: local luminance variance
- Tone: Lab color evenness
- Clarity: small red or dark blob count
- Hydration: specular highlight ratio and smoothness
Each is clamped to 35 to 95. Overall is a weighted mean.
NO randomization or artificial variance. The same input gives the same output.
Low confidence (too dark, over-exposed, no clear face): show no scores, ask to retake.
The engine sits behind a SkinEngine interface so a stronger model can replace it.

## Recommendation rules
- The lowest two sub-scores map to concerns, then to products.
- Sub-score under 60: target that concern.
- All sub-scores 60 or above: suggest a maintenance routine (gentle cleanser, moisturiser, sunscreen).

## Language
"Cosmetic skin insights", "estimate". Never "diagnosis", "clinical", or accuracy percentages.
Add: "If something worries you, a dermatologist is the right person to ask."

## Bias and quality testing (required before launch)
Test across Fitzpatrick types I to VI, indoor and window light, with and without makeup,
three phone models. Record results here, then fix or disclose limits.

| Date | Tester skin type | Light | Device | Result sensible? | Notes |
|---|---|---|---|---|---|
