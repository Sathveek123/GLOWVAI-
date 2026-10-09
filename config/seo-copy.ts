/**
 * Unique SEO Copy for Brands & Categories
 * Each entry provides rich 60-100 word informative content without em-dashes.
 */

export interface SeoCopy {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
}

export const seoCategoryCopy: Record<string, SeoCopy> = {
  "minimalist": {
    title: "Minimalist Skincare Range | Authentic Products | GLOW VAI",
    metaDescription: "Shop authentic Minimalist active skincare in India. Fast delivery on Niacinamide, Salicylic Acid, Vitamin C, and barrier repair formulas.",
    h1: "Minimalist Active Skincare",
    intro: "Minimalist stands for transparent, science-backed skin formulations with high active concentrations. From potent 10 percent Niacinamide serums to gentle Salicylic Acid cleansers, every product target skin concerns directly without fragrance or fluff. Explore our curated selection of original Minimalist products delivered to your doorstep across India with rapid order dispatch.",
  },
  "the-derma-co": {
    title: "The Derma Co Range | Dermaceutical Skincare | GLOW VAI",
    metaDescription: "Discover dermatologist-designed skincare solutions by The Derma Co. Shop authentic sunscreen, serums, and acne treatments with fast shipping.",
    h1: "The Derma Co Dermaceutical Solutions",
    intro: "Designed alongside certified dermatologists, The Derma Co formulates active treatments for acne marks, hyperpigmentation, and sun damage. Featuring micro-encapsulated actives, broad spectrum Hyaluronic acid sunscreens, and Kojic acid formulas, this lineup delivers clinic-inspired results at home. Order authentic products guaranteed fresh and sealed.",
  },
  "face-serums": {
    title: "Targeted Face Serums | Active Formulations | GLOW VAI",
    metaDescription: "Explore targeted face serums for acne, dullness, and dehydration. High active ingredients designed for Indian skin types.",
    h1: "Targeted Face Serums",
    intro: "Face serums deliver high concentrations of active ingredients straight to your epidermal layers. Whether you need Niacinamide for oil regulation, Vitamin C for radiance, or Hyaluronic acid for deep hydration, our collection is curated for Indian climate conditions. Discover lightweight non-sticky serums that transform your daily routine.",
  },
  "face-washes": {
    title: "Gentle Face Washes & Cleansers | GLOW VAI",
    metaDescription: "pH-balanced facial cleansers and gentle face washes for oily, dry, and sensitive skin. Cleanse thoroughly without stripping.",
    h1: "Gentle Facial Cleansers",
    intro: "Effective skin care begins with proper cleansing. Our pH-balanced face washes dissolve impurities, excess sebum, and environmental pollutants without disrupting your delicate skin barrier. Formulated with soothing botanicals, Cica, and mild amino acid surfactants, these cleansers leave your face calm, fresh, and perfectly prepped.",
  },
  "sunscreen": {
    title: "Broad Spectrum Sunscreens | Zero White Cast | GLOW VAI",
    metaDescription: "Lightweight fluid sunscreens with SPF 50 and PA++++ protection. Non-comedogenic, sweat-resistant formulas for Indian weather.",
    h1: "Broad Spectrum Sunscreens",
    intro: "Daily sun protection is essential for preventing premature aging, hyperpigmentation, and UV damage. Our sunscreen collection features modern UV filters with SPF 50 PA++++ ratings that absorb quickly without greasy residue or white cast. Protect your skin effortlessly during humid summer days and sunny outdoors.",
  },
  "moisturizers": {
    title: "Hydrating Moisturizers & Gel Creams | GLOW VAI",
    metaDescription: "Lightweight gel-creams and barrier repair moisturizers formulated for Indian humidity. Hydrate for 24 hours without clogging pores.",
    h1: "Barrier Repair Moisturizers",
    intro: "Keep your skin hydrated and resilient with barrier-strengthening moisturizers. Blending ceramides, hyaluronic acid, and lightweight emollients, our moisture creams lock in hydration while keeping shine in check. Ideal for dry, combination, or sensitive skin types seeking all-day comfort.",
  },
};
