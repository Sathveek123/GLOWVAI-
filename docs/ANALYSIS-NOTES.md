# GLOW VAI Skin Analysis Methodology & Engine Architecture

## Overview
GLOW VAI uses a privacy-first, on-device skin analysis pipeline. Camera frames are processed strictly within the user's browser canvas and are **NEVER uploaded or stored on any server**.

## Method & Sub-Score Calculation
The v1 engine (`/lib/analysis/engine.ts`) uses canvas pixel buffer heuristics across facial landmark zones (excluding eyes, brows, lips, and hair):

1. **Hydration**: Calculated from specular highlight ratios and surface luminance smoothness.
2. **Texture**: Measured via local luminance variance across skin patches.
3. **Tone**: Calculated using Lab color space color evenness algorithms.
4. **Clarity**: Estimated from small dark and red pixel blob cluster counts.

Each sub-score is clamped between **35 and 95** to prevent misleading edge values.

## Confidence & Quality Checks
To avoid inaccurate readings:
- Lighting brightness is evaluated before scoring.
- If lighting is too dark (< 30) or overexposed (> 230), the confidence is flagged as `"low"`.
- Under `"low"` confidence, scores are withheld, and the user is prompted:
  > *"We couldn't read that clearly. Try again near a window."*

## Limits & Potential Biases
- **Camera Hardware**: Differences in mobile sensor resolution, auto-exposure, and white balance affect color readings.
- **Lighting Variance**: Direct sunlight vs warm indoor lighting shifts Lab color space calculations.
- **Makeup & Sunscreen**: Heavy foundation or tinted sunscreens mask natural skin texture and tone.
- **Fairness & Skin Tone Bias**: Algorithms must be tested across Fitzpatrick skin types I-VI under standardized lighting before commercial deployment.

## Swapping the Analysis Engine
To replace the v1 heuristic engine with a MediaPipe WASM model or custom ML model:
1. Implement the `SkinEngine` interface defined in `/lib/analysis/engine.ts`:
   ```ts
   export interface SkinEngine {
     analyseFrame(canvas: HTMLCanvasElement | null): Promise<AnalysisReport>;
   }
   ```
2. Update `/lib/analysis/index.ts` to instantiate your new engine class.
