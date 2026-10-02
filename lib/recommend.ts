import { Product } from "@/config/products";
import { getProducts } from "@/lib/catalog";
import { SubScores } from "./analysis";

export function getRecommendedProducts(subScores: SubScores): Product[] {
  const all = getProducts();
  if (all.length === 0) return [];

  // Sort sub-scores to find lowest two concerns
  const sortedScores = Object.entries(subScores).sort(([, a], [, b]) => a - b);
  const lowestConcernKey = sortedScores[0]?.[0] || "hydration";

  let primaryCategory = "moisturiser";
  if (lowestConcernKey === "hydration") primaryCategory = "moisturiser";
  else if (lowestConcernKey === "texture" || lowestConcernKey === "clarity") primaryCategory = "serum";
  else if (lowestConcernKey === "tone") primaryCategory = "sunscreen";

  const matched = all.filter((p) => p.category === primaryCategory);
  const remaining = all.filter((p) => p.category !== primaryCategory);

  return [...matched, ...remaining].slice(0, 3);
}
