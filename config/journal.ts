export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  imageSlot: string;
  status: "draft" | "published";
}

export const journalArticles: JournalArticle[] = [
  {
    id: "j-1",
    slug: "how-to-read-ingredient-lists",
    title: "How to read an ingredient list without a degree in chemistry",
    category: "Skin Education",
    readTime: "4 min read",
    excerpt: "Learn why the first 5 ingredients on any bottle matter most, and how to spot active percentages.",
    imageSlot: "Team studio ingredient testing moment, candid lighting, 16:10",
    status: "draft",
  },
  {
    id: "j-2",
    slug: "sunscreen-mistakes-humidity",
    title: "The most common sunscreen mistakes in Indian weather",
    category: "Formulation Science",
    readTime: "5 min read",
    excerpt: "High humidity traps sweat under heavy occlusives. Here is how light gel formulations keep your barrier protected.",
    imageSlot: "Sunscreen swatch texture application, soft morning light, 16:10",
    status: "draft",
  },
  {
    id: "j-3",
    slug: "simple-three-step-routine",
    title: "Building a simple 3 step routine that actually sticks",
    category: "Daily Routines",
    readTime: "3 min read",
    excerpt: "Ditch ten-step routines. Cleanse, hydrate, and protect is all an ordinary skin budget requires.",
    imageSlot: "Three simple skincare bottles on bathroom counter, natural window light, 16:10",
    status: "draft",
  },
];
