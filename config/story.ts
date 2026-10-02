import { BRAND_NAME } from "./site";

export interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
  artDirectionNote: string;
  linkedin?: string;
}

export const storyData = {
  tagline: "Real tech. Honest results. Radiance that is uniquely yours.",
  originCity: "Andhra Pradesh",
  originCountry: "India",

  eyebrow: "Our story",
  headline: "The skincare aisle shouldn't feel like a guessing game.",
  intro: "It started with a simple thought. Too many bottles, too much advice, and no real way to know what your own skin needs.",
  problem: "For years, finding a routine meant trial, error, and money spent on products that didn't suit you. A dermatologist helps, but not everyone has the time or budget for regular visits.",
  turn: "We figured there had to be an easier place to start.",
  origin: `${BRAND_NAME} began in Andhra Pradesh with three of us and one question. What if the best tool for understanding your skin was already in your pocket?`,
  howItWorks: "Your phone camera looks at texture, hydration, and visible concerns. You get a plain-language report and a routine that fits. Your photo stays on your phone.",
  mission: "Personalised skincare should be normal, not a luxury. We want a useful skin check to be free to try for anyone with a phone, and a routine that fits an ordinary budget.",
  cosmeticNote: "Cosmetic skin insights, not medical advice.",
  signoff: `Welcome to ${BRAND_NAME}.`,

  founders: [
    {
      name: "SK Sardhar Musthafa",
      role: "Founder",
      bio: "Set the direction and the vision of bringing dermatological knowledge to everyday people.",
      image: "/images/founders/sardhar-musthafa.jpeg",
      artDirectionNote: "SK Sardhar Musthafa, Founder.",
      linkedin: "",
    },
    {
      name: "Rahimath",
      role: "Market Explorer",
      bio: "Understands what customers need and connects the brand with the people who need it.",
      image: "/images/founders/rahimath.jpeg",
      artDirectionNote: "Rahimath, Market Explorer.",
      linkedin: "",
    },
    {
      name: "Nalla Satvik",
      role: "Lead Technologist",
      bio: "Builds the AI behind the face scan.",
      image: "/images/founders/nalla-satvik.jpg",
      artDirectionNote: "Nalla Satvik, Lead Technologist.",
      linkedin: "",
    },
  ] as Founder[],

  timeline: [
    { label: "Idea", date: "Late 2023", desc: "Three founders in Andhra Pradesh ask why skin routines rely on guesswork.", happened: true },
    { label: "First build", date: "Early 2024", desc: "Nalla Satvik builds the first on-device WebGL face scan engine.", happened: true },
    { label: "First scan", date: "Mid 2024", desc: "First 100 on-device camera skin checks tested with real users.", happened: true },
    { label: "First delivery", date: "", desc: "Micro-hub doorstep express dispatches begin.", happened: true },
  ],
};
