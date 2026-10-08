export type StatKey = "hydration" | "texture" | "tone" | "clarity";

export const personas = {
  hydration: {
    id: "dew-drop",
    name: "Dew Drop",
    color: "#E6EEFF",
    vibe: "Your skin holds water like a champ.",
    superpower: "Hydration hero",
    shareLine: "I got Dew Drop. Which skin vibe are you?",
  },
  texture: {
    id: "smooth-operator",
    name: "Smooth Operator",
    color: "#DDF7EC",
    vibe: "Smooth surface, steady energy.",
    superpower: "Texture talent",
    shareLine: "Smooth Operator over here. What did you get?",
  },
  tone: {
    id: "even-steven",
    name: "Even Steven",
    color: "#FFE6EA",
    vibe: "Your tone is calm, even and consistent.",
    superpower: "Tone balance",
    shareLine: "Even Steven, apparently. Try yours?",
  },
  clarity: {
    id: "clear-skies",
    name: "Clear Skies",
    color: "#FFF3C4",
    vibe: "Clear, calm and ready for the day.",
    superpower: "Clarity champ",
    shareLine: "Clear Skies today. Find your skin vibe?",
  },
  balanced: {
    id: "balanced-boss",
    name: "Balanced Boss",
    color: "#E6EEFF",
    vibe: "No drama. Everything is pulling its weight.",
    superpower: "All-rounder",
    shareLine: "Balanced Boss. Quiet flex. Your turn?",
  },
} as const;

// Strongest stat wins. Ties go in this order. If max minus min is 8 or less, Balanced Boss.
export function pickPersona(s: Record<StatKey, number>) {
  const order: StatKey[] = ["hydration", "texture", "tone", "clarity"];
  const vals = order.map((k) => s[k] ?? 50);
  if (Math.max(...vals) - Math.min(...vals) <= 8) return personas.balanced;
  const best = order.reduce((a, b) => ((s[b] ?? 0) > (s[a] ?? 0) ? b : a), order[0]);
  return personas[best];
}

export const levels = [
  { level: 1, name: "Fresh Start", min: 0, line: "Everyone begins somewhere. Today is a good day for it." },
  { level: 2, name: "Warming Up", min: 50, line: "You are on the board. A steady routine moves this fast." },
  { level: 3, name: "Rising", min: 60, line: "Nice base. A couple of small habits will go a long way." },
  { level: 4, name: "Glowing", min: 70, line: "Looking good. Keep the basics consistent." },
  { level: 5, name: "Radiant", min: 80, line: "Strong all round. Protect it with daily SPF." },
] as const;

export const levelFor = (score: number) =>
  [...levels].reverse().find((l) => score >= l.min) ?? levels[0];

// Deterministic Quiz Result for Event Mode
export function quizResult(tally: Record<StatKey, number>) {
  const total = tally.hydration + tally.texture + tally.tone + tally.clarity; // 0 to 10
  const scaled = {
    hydration: 45 + tally.hydration * 6,
    texture: 45 + tally.texture * 6,
    tone: 45 + tally.tone * 6,
    clarity: 45 + tally.clarity * 6,
  };
  const persona = pickPersona(scaled);
  const level = levelFor(45 + total * 3.5);
  return { persona, level };
}
