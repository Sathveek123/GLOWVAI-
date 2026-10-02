import { Product } from "@/config/products";
import { getProducts } from "@/lib/catalog";
import { SubScores } from "./analysis";

export function getRecommendedProducts(subScores: SubScores): Product[] {
  const all = getProducts();
  if (all.length === 0) return [];

  const values = Object.values(subScores);
  const allSixtyOrAbove = values.every((s) => s >= 60);

  // If all scores are 60 or above, recommend a maintenance routine (cleanser, moisturiser, sunscreen)
  if (allSixtyOrAbove) {
    const cleanser = all.find((p) => p.category === "cleanser") || all[0];
    const moisturiser = all.find((p) => p.category === "moisturiser") || all[1] || all[0];
    const sunscreen = all.find((p) => p.category === "sunscreen") || all[2] || all[0];
    return [cleanser, moisturiser, sunscreen].filter(Boolean);
  }

  // Otherwise target the lowest sub-score deficits
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
