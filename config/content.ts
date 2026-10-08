import { BRAND_NAME } from "./site";

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  concern: string;
  skinTypeTag: string;
  size: string;
  image: string;
  altText: string;
  artDirectionNote: string;
  badge?: string;
  featured?: boolean;
  description: string;
  keyIngredients: string[];
  howToUse: string;
}

export interface ConcernItem {
  id: string;
  slug: string;
  title: string;
  oneLiner: string;
  bgTint: 'skymist' | 'blush' | 'mint' | 'yellow';
  image: string;
  artDirectionNote: string;
}

export interface FAQItemData {
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  author: string;
  city: string;
  skinType: string;
  rating: number;
  quote: string;
  productUsed: string;
  avatar: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  artDirectionNote: string;
}

export const announcementMessages = [
  "⚡ Fresh formulations delivered to your doorstep in ~15 mins.",
  "✨ Take our 30-sec free face scan and get ₹200 off your first order!",
  "🌿 100% Dermatologist tested, zero toxic fillers, cruelty free",
];

export const heroContent = {
  eyebrow: "15-Minute Doorstep Express",
  headlines: [
    { text: "Skincare that knows your face. At your door in 15.", accentWord: "knows" },
    { text: "Scan your face. Get your routine. Fifteen minutes later, it is at your door.", accentWord: "Fifteen" },
    { text: "Your skin has opinions. We listen, then deliver.", accentWord: "listen" },
  ],
  selectedHeadlineIndex: 0,
  subheadline: "Scan your face in 30 seconds. We find what your skin is missing and bring it over before your tea gets cold.",
  primaryCTA: "Scan my face, it's free",
  secondaryCTA: "Shop now",
  ratingText: "4.95 / 5 star rating",
  customerCountText: "18,000+ happy customers",
  deliveryBadge: "Delivered in ~15 min",
  floatingCards: {
    skinScore: {
      score: 84,
      status: "Barrier Strong",
      hydrationScore: "92%",
    },
    deliveryChip: {
      city: "Hyderabad",
      mins: "Arriving in 14 min",
    },
    ingredientChip: {
      name: "2% Niacinamide + Centella",
      origin: "Fresh Batch",
    },
  },
};

export const trustStripItems = [
  { icon: "ShieldCheck", label: "Dermatologist Approved", detail: "Tested on 500+ Indian skin types" },
  { icon: "Zap", label: "Doorstep in 15 Mins", detail: "Hyperlocal micro dark-stores" },
  { icon: "Leaf", label: "Cruelty-Free & Vegan", detail: "PETA certified, zero toxins" },
  { icon: "Lock", label: "Safe Camera Privacy", detail: "Face scans auto-delete instantly" },
  { icon: "RefreshCw", label: "Small Fresh Batches", detail: "Made in last 14 days" },
];

export const faceAnalysisFeature = {
  eyebrow: "30-Second Smart Scan",
  heading: "No 20-question quizzes. Just snap a photo and see what your skin needs.",
  subheading: "Our browser AI analyzes oil distribution, redness, hydration depth, and pore density without storing your photo.",
  steps: [
    {
      number: "01",
      title: "Snap a quick clean photo",
      description: "Good lighting, no filters. Takes 3 seconds inside your browser.",
    },
    {
      number: "02",
      title: "Get your instant 4-point breakdown",
      description: "See clear scores for hydration, barrier clarity, pore texture, and pigmentation.",
    },
    {
      number: "03",
      title: "Order exact matches in 1-click",
      description: "Buy only what your skin needs right now. Delivered in 15 mins.",
    },
  ],
  sampleResult: {
    overallScore: 82,
    subScores: [
      { name: "Hydration Depth", score: 88, color: "bg-brand" },
      { name: "Barrier Balance", score: 74, color: "bg-coral" },
      { name: "Texture Smoothness", score: 81, color: "bg-yellow" },
      { name: "Tone Clarity", score: 85, color: "bg-brand" },
    ],
    recommendationsCount: 2,
    privacyNote: "🔒 Your face photo is processed live in your browser and NEVER saved to any server.",
  },
  ctaText: "Start free face scan",
};

export const bestsellerProducts: Product[] = [
  {
    id: "prod-1",
    slug: "dew-barrier-daily-hydrator",
    name: "Dew Barrier Daily Hydrator",
    subtitle: "5-type Hyaluronic Acid + Madecassoside Cream",
    price: 699,
    originalPrice: 899,
    rating: 4.9,
    reviewCount: 420,
    concern: "Dryness & Dullness",
    skinTypeTag: "Dry & Combination Skin",
    size: "50 ml / 1.7 fl oz",
    image: "/images/products/moisturiser-1.png",
    altText: `${BRAND_NAME} Dew Barrier Cream Jar on soft blue ceramic tile`,
    artDirectionNote: "Close-up of matte glass cream jar showing creamy white texture swirl beside a splash of pure water.",
    badge: "Bestseller #1",
    featured: true,
    description: "Plumps parched skin instantly with zero sticky residue. Built with cold-pressed botanical oils and 5 molecular weights of Hyaluronic Acid that penetrate deep into epidermal layers.",
    keyIngredients: ["5D Hyaluronic Acid", "Madecassoside (Centella)", "Ceramide NP", "Squalane"],
    howToUse: "Smooth 2 pumps onto clean face and neck morning and night. Follow with sun care during the day.",
  },
  {
    id: "prod-2",
    slug: "clarity-pop-niacinamide-serum",
    name: "Clarity Pop 10% Niacinamide Serum",
    subtitle: "Zinc PCA + Green Tea Pore Balancing Elixir",
    price: 549,
    originalPrice: 749,
    rating: 4.8,
    reviewCount: 312,
    concern: "Acne & Pores",
    skinTypeTag: "Oily & Acne-Prone",
    size: "30 ml / 1.0 fl oz",
    image: "/images/products/serum-1.png",
    altText: `${BRAND_NAME} Clarity Pop Serum dropper bottle with clear gel droplet`,
    artDirectionNote: "Dropper suspended above a crystal glass surface with golden hour sunlight shining through liquid.",
    badge: "Fan Favorite",
    featured: false,
    description: "Tames midday shine and reduces visible pore size within 7 days. Gentle enough for reactive skin, powerful enough to quiet angry spots overnight.",
    keyIngredients: ["10% Pure Niacinamide", "1% Zinc PCA", "Matcha Green Tea Extract"],
    howToUse: "Apply 3-4 drops to cleansed skin before heavy creams. Use daily morning or evening.",
  },
  {
    id: "prod-3",
    slug: "velvet-cloud-cica-cleanser",
    name: "Velvet Cloud Cica Jelly Cleanser",
    subtitle: "pH 5.5 Amino Acid Facial Wash",
    price: 479,
    originalPrice: 599,
    rating: 4.9,
    reviewCount: 188,
    concern: "Redness & Sensitivity",
    skinTypeTag: "All Skin Types",
    size: "120 ml / 4.0 fl oz",
    image: "/images/products/cleanser-1.png",
    altText: `${BRAND_NAME} Velvet Cloud Cleanser tube resting on fresh mint leaves`,
    artDirectionNote: "Clean mint green tube next to fresh botanical leaves and fluffy white lather.",
    badge: "Gentle Formula",
    featured: false,
    description: "Melt away city grime and waterproof makeup without stripping your natural lipid barrier. Leaves skin feeling velvety soft, never tight or squeaky.",
    keyIngredients: ["Centella Asiatica (Cica)", "Amino Acid Complex", "Panthenol (B5)"],
    howToUse: "Massage onto wet face for 60 seconds. Rinse thoroughly with lukewarm water.",
  },
  {
    id: "prod-4",
    slug: "sun-shield-invisible-fluid-spf50",
    name: "Sun Shield Invisible Gel Fluid SPF 50+",
    subtitle: "PA++++ Zero White-Cast Weightless Sunscreen",
    price: 599,
    originalPrice: 799,
    rating: 4.95,
    reviewCount: 560,
    concern: "Sun Care & UV",
    skinTypeTag: "All Indian Skin Tones",
    size: "50 ml / 1.7 fl oz",
    image: "/images/products/sunscreen-1.png",
    altText: `${BRAND_NAME} Sun Shield Fluid SPF 50 bottle on sunny beach sand`,
    artDirectionNote: "Sleek white & blue tube standing on warm sunlit sand with clear water reflection.",
    badge: "Award Winner",
    featured: false,
    description: "Absorbs in 5 seconds with zero greasy feeling and zero chalky white cast. Tested under high humidity and heat.",
    keyIngredients: ["Photostable UV Filters", "Rice Water Ferment", "Vitamin E"],
    howToUse: "Apply generously as the final step of your skincare routine 15 minutes before sun exposure.",
  },
];

export const concernCategories: ConcernItem[] = [
  {
    id: "c-1",
    slug: "acne",
    title: "Breakouts & Pores",
    oneLiner: "Calm active spots and clear clogged pores without peeling.",
    bgTint: "skymist",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    artDirectionNote: "Close up skin texture showing clean dewiness and herbal ingredients.",
  },
  {
    id: "c-2",
    slug: "dullness",
    title: "Dullness & Dark Spots",
    oneLiner: "Brighten stubborn marks with stable Vitamin C and Niacinamide.",
    bgTint: "yellow",
    image: "https://images.unsplash.com/photo-1512290900676-26c2a4d4b51b?auto=format&fit=crop&w=600&q=80",
    artDirectionNote: "Bright sunlight illuminating citrus botanical swatches.",
  },
  {
    id: "c-3",
    slug: "dryness",
    title: "Dehydration & Flakiness",
    oneLiner: "Deep 24-hour hydration that locks in moisture instantly.",
    bgTint: "blush",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    artDirectionNote: "Smooth cream texture swatch spreading over clean skin.",
  },
  {
    id: "c-4",
    slug: "pigmentation",
    title: "Uneven Tone & Sun Damage",
    oneLiner: "Target excess melanin production with gentle botanical actives.",
    bgTint: "mint",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
    artDirectionNote: "Aesthetic bottle on clear glass with water ripples.",
  },
  {
    id: "c-5",
    slug: "sun-care",
    title: "Daily Sun Protection",
    oneLiner: "Broad spectrum SPF 50 PA++++ that wears like invisible silk.",
    bgTint: "skymist",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80",
    artDirectionNote: "Sunlight shining through clear gel texture.",
  },
  {
    id: "c-6",
    slug: "hair-body",
    title: "Scalp & Body Barrier",
    oneLiner: "Nourishing body washes and scalp serums for total balance.",
    bgTint: "blush",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
    artDirectionNote: "Warm shower droplets on sleek glass bottle.",
  },
];

export const founderStory = {
  eyebrow: "Why We Started",
  title: "We got tired of waiting 4 days for cosmetics that did not suit our climate.",
  pullQuote: `"Skincare shouldn't feel like a high-school chemistry exam or a logistics nightmare. When you break out before an important day, you need the right solution now."`,
  narrative: [
    `Back in 2023, after living through humid summers in Hyderabad and dusty winters in Delhi, our founder Maya spent thousands on imported serums that broke out her skin. Worse still, when her skin flared up, standard e-commerce took 3 to 5 days to deliver a simple calming gel.`,
    `We asked a simple question: If we can get hot food and groceries in 10 minutes, why are we buying cosmetics made 8 months ago that sit in warehouses for weeks?`,
    `That is when ${BRAND_NAME} was born. We built a network of temperature-controlled dark micro-stores stocked with fresh, small-batch formulations tailored specifically for Indian skin tones and humid weather. Paired with our 30-second camera scan, you get hyper-personalized skin routine items delivered to your hands in under 15 minutes.`,
  ],
  founderName: "Maya Ramanathan",
  founderRole: "Co-Founder & Formulator",
  founderImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  founderImageAlt: "Maya Ramanathan, founder of GLOW VAI in her formulation lab",
  artDirectionNote: "Warm candid studio photograph of female founder holding a laboratory beaker with natural smile, daylighting.",
  timeline: [
    { year: "Late 2023", title: "The Frustration", desc: "Maya tests 40+ products during peak monsoon; 80% cause fungal breakouts." },
    { year: "Early 2024", title: "Lab Batch #01", desc: "Partnered with top dermatologists to craft zero-fillers, pH 5.5 daily barrier formulas." },
    { year: "Mid 2024", title: "Dark-Store Pilot", desc: "Launched 15-min doorstep delivery in 4 hubs across Hyderabad." },
    { year: "Today", title: "18,000+ Happy Skin Scans", desc: "Now operating 32 micro-hubs with an average delivery time of 12.4 minutes." },
  ],
};

export const brandValues = {
  eyebrow: "Our Core Standards",
  heading: "Formulated for real skin in real weather. No gimmicks, no toxic fillers.",
  values: [
    {
      title: "1. Micro Dark-Store Freshness",
      description: "Our products don't rot on warm warehouse shelves for months. Batches are produced monthly and kept in cold-chain micro hubs.",
    },
    {
      title: "2. Climate-Adaptive Formulas",
      description: "Indian humidity requires light, fast-absorbing water-gel textures that won't clog pores under sweat or dust.",
    },
    {
      title: "3. Transparency You Can Read",
      description: "Every percentage of active ingredients is clearly printed on the front label. No secret proprietary blends.",
    },
    {
      title: "4. Zero-Hassle Camera Scan",
      description: "No guesswork. Our AI scan accurately checks your barrier health without storing your face photos.",
    },
  ],
  bannedIngredientsHeading: "What We NEVER Put in Our Bottles:",
  bannedIngredients: [
    "Parabens & Phthalates",
    "Synthetic Fragrance / Parfum",
    "Drying Denatured Alcohol",
    "Mineral Oil & Petrolatum",
    "Sulphates (SLS / SLES)",
    "Formaldehyde Releasers",
  ],
};

export const quickDeliveryContent = {
  eyebrow: "Hyperlocal Cosmetics Engine",
  heading: "How we get fresh cosmetics to your door in 15 minutes flat.",
  description: "We built temperature-controlled micro hubs right in your neighborhood. When you place an order, our system picks fresh batches and dispatches a dedicated electric rider immediately.",
  steps: [
    { step: "01", title: "Smart Matching", desc: "Your scan picks the exact fresh batch needed for your skin concern." },
    { step: "02", title: "Micro-Hub Dispatch", desc: "Order packed in cold-chain bio-bags at your nearest neighborhood dark store." },
    { step: "03", title: "Rider at Doorstep", desc: "Live GPS tracking. Delivered to your hands in ~12 to 15 minutes." },
  ],
  stats: [
    { value: "12.4 min", label: "Average Delivery Time" },
    { value: "32", label: "Live Micro Dark-Stores" },
    { value: "99.4%", label: "On-Time Dispatch Rate" },
    { value: "4.9★", label: "Rider Rating" },
  ],
  activeCities: ["Hyderabad", "Bengaluru", "Mumbai", "Delhi NCR", "Pune", "Chennai"],
  pincodePlaceholder: "Enter your 6-digit pincode...",
};

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    author: "Ananya Sharma",
    city: "Hyderabad",
    skinType: "Combination / Sensitive",
    rating: 5,
    quote: "I had a sudden hormonal acne breakout before my friend's sangeet. I used the face scan at 4 PM, ordered the Clarity Pop Serum, and the rider rang my doorbell at 4:14 PM! By next morning the redness had dropped significantly.",
    productUsed: "Clarity Pop Serum",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "t-2",
    author: "Rohan Varma",
    city: "Bengaluru",
    skinType: "Oily Skin",
    rating: 5,
    quote: "Most sunscreens make me look like a ghost or sweat off in 5 minutes. The Sun Shield Gel feels like nothing on the skin. Plus getting it delivered faster than my coffee order was mind-blowing.",
    productUsed: "Sun Shield Fluid SPF 50",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "t-3",
    author: "Pooja Reddy",
    city: "Hyderabad",
    skinType: "Dry & Flaky",
    rating: 5,
    quote: "The Dew Barrier hydrator fixed my damaged skin barrier after I over-exfoliated with harsh acids. The packaging feels super high-end and the 15-minute delivery is unreal.",
    productUsed: "Dew Barrier Cream",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "t-4",
    author: "Dr. Kavita Menon",
    city: "Mumbai",
    skinType: "Dermatologist Tested",
    rating: 5,
    quote: "As a practicing dermatologist, I love that GLOW VAI discloses exact percentage actives and avoids synthetic fragrances. My patients love the speed and privacy of the scan.",
    productUsed: "Velvet Cloud Cleanser",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
  },
];

export const journalArticles: JournalArticle[] = [
  {
    id: "j-1",
    slug: "how-to-read-ingredient-lists",
    title: "How to read cosmetic labels without a degree in biochemistry",
    category: "Skin Education",
    readTime: "4 min read",
    excerpt: "Learn why the first 5 ingredients on any bottle matter most, and how to spot marketing fluff vs active percentages.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    artDirectionNote: "Flatlay of skincare bottles with handwritten notebook notes and glass dropper.",
  },
  {
    id: "j-2",
    slug: "humidity-and-skin-barrier",
    title: "Why heavy western creams fail in Indian humidity and what to do instead",
    category: "Formulation Science",
    readTime: "5 min read",
    excerpt: "High humidity traps sweat under heavy occlusives. Here is how water-gel matrices keep your barrier hydrated without breakouts.",
    image: "https://images.unsplash.com/photo-1512290900676-26c2a4d4b51b?auto=format&fit=crop&w=600&q=80",
    artDirectionNote: "Clean glass container filled with clear hydrating gel with light reflections.",
  },
  {
    id: "j-3",
    slug: "sunscreen-reapplication-hacks",
    title: "3 realistic ways to reapply sunscreen over makeup during busy workdays",
    category: "Daily Routines",
    readTime: "3 min read",
    excerpt: "Ditch chalky sticks and greasy sprays. Simple steps to maintain SPF 50 protection without ruining your foundation.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
    artDirectionNote: "Sunlight shining on sunscreen tube beside sunglasses and silk scarf.",
  },
];

export const faqItems: FAQItemData[] = [
  {
    question: "How does 15-minute delivery actually work?",
    answer: "We operate small, temperature-controlled micro-stores (dark stores) in major tech hubs and neighborhoods. When you order, our automated system picks your items in under 60 seconds and assigns an electric delivery rider immediately.",
    category: "Delivery",
  },
  {
    question: "Is my face scan photo saved on your servers?",
    answer: "Never. Your face scan photo is processed locally inside your phone or laptop browser using WebGL and lightweight client-side AI modules. Only numerical scores (e.g. hydration score 84) are stored. Photos are discarded immediately.",
    category: "Privacy & Scan",
  },
  {
    question: "Are GLOW VAI products safe for sensitive or acne-prone skin?",
    answer: "Yes! Every single product is non-comedogenic, dermatologist-tested, pH 5.5 balanced, and free from synthetic fragrances, drying alcohols, and essential oils.",
    category: "Formulation",
  },
  {
    question: "What if delivery is delayed beyond 20 minutes?",
    answer: "If unexpected traffic or severe weather delays your delivery beyond 25 minutes, you get automatic ₹100 cashback credited to your wallet, no questions asked.",
    category: "Delivery",
  },
  {
    question: "Can I return a product if it doesn't suit my skin?",
    answer: "Yes. We offer a 14-day Skin Satisfaction Guarantee. If a product causes discomfort, contact support and our team will process a full refund or swap it for a different formula.",
    category: "Orders & Returns",
  },
  {
    question: "Are your formulas cruelty-free and vegan?",
    answer: "100%. We never test on animals, nor do we use any animal-derived ingredients like lanolin or carmine. All products are certified by PETA.",
    category: "Ethics",
  },
  {
    question: "Which cities are currently supported?",
    answer: "We are live across major pincodes in Hyderabad, Bengaluru, Mumbai, Delhi NCR, Pune, and Chennai. Check your pincode using our delivery checker widget above!",
    category: "Delivery",
  },
  {
    question: "How do I use the Face Analysis scan tool?",
    answer: "Simply click 'Scan my face', allow temporary camera access in a well-lit room without heavy filters, and within 30 seconds you will get your personalized skin score breakdown.",
    category: "Privacy & Scan",
  },
];

export const finalCTABannerContent = {
  heading: "Ready to give your skin what it actually wants?",
  subheading: "Takes 30 seconds to scan. Delivered to your doorstep in ~15 minutes.",
  primaryCTA: "Scan My Face Now",
  secondaryCTA: "Browse Full Shop",
  newsletterHeading: "Get 15% off your first 15-min delivery",
  newsletterSubheading: "Join 25,000+ subscribers for skin tips, fresh batch alerts, and secret discounts.",
  privacyDisclaimer: "We respect your inbox. No spam ever. Unsubscribe anytime.",
};
