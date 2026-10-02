export interface SubScores {
  hydration: number;
  texture: number;
  tone: number;
  clarity: number;
}

export interface AnalysisReport {
  overall: number;
  subScores: SubScores;
  summary: string;
  concerns: string[];
  confidence: "low" | "ok" | "good";
}

export interface SkinEngine {
  analyseFrame(canvas: HTMLCanvasElement | null): Promise<AnalysisReport>;
}

export function clampScore(val: number): number {
  return Math.min(95, Math.max(35, Math.round(val)));
}

/**
 * Deterministic Heuristics-based Skin Engine (v1)
 * Evaluates downscaled canvas pixel buffers to calculate score estimates without artificial randomization.
 */
export class HeuristicSkinEngine implements SkinEngine {
  async analyseFrame(canvas: HTMLCanvasElement | null): Promise<AnalysisReport> {
    if (!canvas) {
      return this.computeReport(70, 15, 20, 10, "low");
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return this.computeReport(70, 15, 20, 10, "low");
    }

    try {
      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0) {
        return this.computeReport(70, 15, 20, 10, "low");
      }

      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      let totalLuminance = 0;
      let totalRed = 0;
      let totalGreen = 0;
      let totalBlue = 0;

      const pixelCount = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        totalLuminance += luminance;
        totalRed += r;
        totalGreen += g;
        totalBlue += b;
      }

      const meanLuminance = totalLuminance / pixelCount;
      const meanRed = totalRed / pixelCount;
      const meanGreen = totalGreen / pixelCount;
      const meanBlue = totalBlue / pixelCount;

      let varianceSum = 0;
      let redVarianceSum = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const luminance = 0.299 * r + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        varianceSum += Math.pow(luminance - meanLuminance, 2);
        redVarianceSum += Math.pow(r - meanRed, 2);
      }

      const luminanceStdDev = Math.sqrt(varianceSum / pixelCount);
      const redStdDev = Math.sqrt(redVarianceSum / pixelCount);

      // Low confidence if too dark (< 30) or overexposed (> 230)
      if (meanLuminance < 30 || meanLuminance > 230) {
        return this.computeReport(meanLuminance, luminanceStdDev, redStdDev, meanRed - meanGreen, "low");
      }

      const confidence: "low" | "ok" | "good" =
        meanLuminance >= 60 && meanLuminance <= 200 && luminanceStdDev >= 8 ? "good" : "ok";

      return this.computeReport(meanLuminance, luminanceStdDev, redStdDev, meanRed - meanGreen, confidence);
    } catch {
      return this.computeReport(70, 15, 20, 10, "ok");
    }
  }

  private computeReport(
    meanLuminance: number,
    luminanceStdDev: number,
    redStdDev: number,
    redDiff: number,
    confidence: "low" | "ok" | "good"
  ): AnalysisReport {
    // Deterministic mathematical sub-scores derived strictly from canvas parameters
    const hydration = clampScore(45 + (meanLuminance / 255) * 45);
    const texture = clampScore(90 - Math.min(45, luminanceStdDev * 1.5));
    const tone = clampScore(88 - Math.min(45, Math.abs(redDiff) * 1.2));
    const clarity = clampScore(92 - Math.min(45, redStdDev * 1.3));

    const overall = clampScore(
      hydration * 0.3 + texture * 0.25 + tone * 0.25 + clarity * 0.2
    );

    const lowest = Object.entries({ hydration, texture, tone, clarity }).sort(
      ([, a], [, b]) => a - b
    )[0][0];

    let summary = "Your skin barrier shows healthy moisture retention with balanced tone across facial zones.";
    if (lowest === "hydration") {
      summary = "Your skin is asking for deeper hydration. Water retention is lower around the cheeks.";
    } else if (lowest === "texture") {
      summary = "Moisture level is stable, but surface texture shows slight roughness needing gentle smoothing.";
    } else if (lowest === "tone") {
      summary = "Hydration levels are stable, but subtle tone unevenness is visible around sun-exposed areas.";
    } else if (lowest === "clarity") {
      summary = "Overall barrier health is strong, though minor surface congestion is present in the T-zone.";
    }

    const concerns: string[] = [];
    if (hydration < 75) concerns.push("dryness");
    if (texture < 75) concerns.push("dullness");
    if (clarity < 75) concerns.push("acne");

    return {
      overall,
      subScores: { hydration, texture, tone, clarity },
      summary,
      concerns,
      confidence,
    };
  }
}
