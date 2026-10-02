import { HeuristicSkinEngine, SkinEngine, AnalysisReport } from "./engine";

const currentEngine: SkinEngine = new HeuristicSkinEngine();

export async function analyse(canvas: HTMLCanvasElement | null): Promise<AnalysisReport> {
  return currentEngine.analyseFrame(canvas);
}

export * from "./engine";
