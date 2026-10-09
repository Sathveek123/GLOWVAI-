import { BRAND_NAME } from "./site";

export interface DetailedStorySection {
  title: string;
  content: string[];
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  image: string;
  artDirectionNote: string;
  linkedin?: string;
  location: string;
  storyTitle: string;
  storySubtitle: string;
  sections: DetailedStorySection[];
}

export interface TimelineEvent {
  period: string;
  title: string;
  description: string[];
  badge?: string;
  isKeyMilestone?: boolean;
}

export const storyData = {
  tagline: "AI Skin Telemetry + 15-Min Quick-Commerce Dark Store Delivery.",
  originCity: "Vijayawada & Visakhapatnam, Andhra Pradesh",
  originCountry: "India",

  eyebrow: "GLOW VAI QUICK-COMMERCE STARTUP JOURNEY",
  headline: "Not just a skincare store — an AI-powered Quick-Commerce Dark Store network.",
  intro: "Glow VAI connects on-device dermatological AI telemetry with hyperlocal micro-hubs (Dark Stores) in Vijayawada. From instant 30-second skin analysis to 15-minute doorstep cosmetic delivery.",
  problem: "Traditional skincare shopping requires guessing in supermarket aisles or waiting days for e-commerce deliveries. People spend fortunes on wrong products without knowing their actual skin metrics.",
  turn: "We built Glow VAI to combine instant camera diagnostics with hyperlocal 15-minute dark store fulfillment.",
  origin: `${BRAND_NAME} began with three founders across Vijayawada, Visakhapatnam, and Hyderabad. What if your phone could diagnose skin hydration and barrier depth in 30 seconds, and deliver exact matching serums to your doorstep in 15 minutes?`,
  howItWorks: "Your camera measures micro-nodes and moisture barriers. Our Vijayawada dark store dispatches exact Minimalist & Derma Co routines via instant courier.",
  mission: "Democratise dermatological intelligence and instant beauty commerce. Making AI skin analysis 100% free and delivering routine essentials in 15 minutes to every neighborhood.",
  cosmeticNote: "Cosmetic skin insights, not medical advice.",
  signoff: `Welcome to ${BRAND_NAME} Quick-Commerce.`,

  founders: [
    {
      id: "sardhar",
      name: "Sardhar Musthafa",
      role: "Founder, Vision & CEO",
      tagline: "Set the direction and vision of bringing dermatological AI and quick commerce to everyday people.",
      bio: "Ethical hacker turned beauty-tech entrepreneur. From late night research to founding GLOW VAI's AI dark store vision.",
      image: "/images/founders/sardhar-musthafa.jpeg",
      artDirectionNote: "Sardhar Musthafa, Founder & Vision.",
      location: "Vijayawada, Andhra Pradesh",
      storyTitle: "SARDHAR MUSTHAFA — The Story of a Boy Who Decided to Build Something of His Own",
      storySubtitle: "2023–2026 | A journey nobody saw completely.",
      sections: [
        {
          title: "2023–2024 — Before the Dream Had a Name",
          content: [
            "Before Glowvai existed, before the website, before the title of founder, there was a young boy named Sardhar Musthafa.",
            "In 2023 and 2024, he was learning ethical hacking, exploring technology, and trying to understand what he could make of his future.",
            "He wasn't someone who already had everything figured out. He was still learning, still exploring, and still trying to discover where he belonged.",
            "During that period, he became friends with Rehmat. Neither of them knew that a friendship formed during those years would eventually lead to a business idea that would change the direction of Sardhar's life.",
            "He didn't have a company, an established team, investors, or a roadmap to success. He had curiosity, ambition, and an idea of the kind of life he wanted to build."
          ]
        },
        {
          title: "February 18, 2025 — The Beginning of Glowvai",
          content: [
            "On February 18, 2025, Sardhar visited Rehmat at his location. A conversation between two friends became the starting point of an idea in the beauty industry.",
            "Three days later, on February 21, they connected again to redefine the concept.",
            "At that moment, Glowvai was not a successful startup. It wasn't even a finished product. It was an idea that needed research, validation, technology, and people willing to work on it.",
            "Sardhar only knew that he wanted to build something of his own. And he began."
          ]
        },
        {
          title: "March 2025 — Searching for the Real Problem",
          content: [
            "Sardhar and Rehmat started speaking with people to understand the problems in the beauty industry. They researched, asked questions, and refined their idea based on what they learned.",
            "The original concept evolved as they tried to understand what customers actually needed. But identifying a problem was only the beginning.",
            "Sardhar was entering a world where having a good idea meant very little without the ability to execute it."
          ]
        },
        {
          title: "2025 — The People Who Promised to Help",
          content: [
            "Building a startup without sufficient resources is difficult. Building one while depending on people who never deliver can be even harder.",
            "Sardhar explored AI tools, experimented with different ways of building the product, and spent months researching the business. He also pursued investment opportunities.",
            "Some people made promises that never became reality. Time was spent following possibilities that ultimately led nowhere.",
            "Sardhar had to learn a painful distinction: someone believing in an idea is not the same as someone being willing to work for it."
          ]
        },
        {
          title: "The Disrespect Nobody Puts in the Pitch Deck",
          content: [
            "People see a founder's announcement. They see a logo, a website, a title, and sometimes a launch post. They rarely see the person behind those things when there is nothing impressive to show.",
            "Sardhar's journey included the frustration of trying to find people willing to take his work seriously, dealing with people who did not follow through, and facing situations in which support wasn't there.",
            "The hardest truth was that the work still had to be done, even when the expected support never arrived."
          ]
        },
        {
          title: "November 2025 — Building Beyond the Startup & Public Announcement",
          content: [
            "Around November 12–20, Sardhar began creating content around startups and entrepreneurship. On November 20, 2025, Glowvai's public announcement marked another step.",
            "The project that had started with private conversations was now something people could discover publicly. Sardhar now had to make Glowvai more than an idea with a name. He needed a product."
          ]
        },
        {
          title: "December 2025 — A Door Opens",
          content: [
            "In December 2025, Work Wizards Innovations connected with Glowvai. With support from the organization and its team, including Venkat, Sardhar had an opportunity to move closer to building the first version."
          ]
        },
        {
          title: "January 1, 2026 — Proof That the Idea Could Become Real (V1 Launch)",
          content: [
            "On January 1, 2026, Glowvai V1 went live with AI-powered face analysis.",
            "During an early period, Glowvai recorded more than 600 website visitors and approximately 300 skin analyses tracked by Sardhar.",
            "The idea that began with a conversation in February 2025 had become a real digital product."
          ]
        },
        {
          title: "2026 — Controlling Ambition & Navigating the V2 Trap",
          content: [
            "After launching V1, Sardhar envisioned a broader beauty platform combining AI personalization, quick commerce, nearby beauty vendors, and 15-minute delivery.",
            "However, expanding features before proving core retention created delays. He learned that building a company is not about adding everything imaginable, but proving what matters most."
          ]
        },
        {
          title: "September 15, 2026 — A New Chapter with Sathweek",
          content: [
            "On September 15, 2026, Sardhar reconnected with Sathweek, an online Instagram connection who joined as Co-Founder & Technology Partner.",
            "With Sathweek in Visakhapatnam, Sardhar in Vijayawada, and Rehmat in Vijayawada, GLOW VAI gained the relentless technical execution needed to build a real quick-commerce platform."
          ]
        },
        {
          title: "October 2026 — Still Here, Still Building",
          content: [
            "By October 2026, Sardhar has experienced the full startup cycle: research, public launch, V1 traction, V2 scope traps, team lessons, and technical partnership.",
            "The story is still being written — focused on execution, customer trust, and 15-minute dark store delivery value."
          ]
        }
      ]
    },
    {
      id: "rahimath",
      name: "Rahimath",
      role: "Marketing Lead & Market Explorer",
      tagline: "Understands what customers need and connects the brand with the people who need it.",
      bio: "Founding partner who ignited the first Glow VAI conversation in February 2025. Leads customer research and market expansion.",
      image: "/images/founders/rahimath.jpeg",
      artDirectionNote: "Rahimath, Marketing Lead & Market Explorer.",
      location: "Hyderabad & Vijayawada, Andhra Pradesh",
      storyTitle: "RAHIMATH — The Story of a Friend Who Became Part of a Startup Journey",
      storySubtitle: "2023–2026 | Friendship, ambition, setbacks, and the unfinished dream of Glowvai.",
      sections: [
        {
          title: "2023–2024 — Before Glowvai Existed",
          content: [
            "Before Glowvai became a startup, before the website and plans for a beauty-tech platform, there was a friendship.",
            "Rehmat and Sardhar Musthafa became friends while Sardhar was learning ethical hacking during 2023–2024.",
            "There were simply two people who knew each other, each with a life and future still taking shape."
          ]
        },
        {
          title: "February 18, 2025 — The Conversation That Started Glowvai",
          content: [
            "On February 18, 2025, Sardhar visited Rehmat at his location. During their meeting, they discussed an idea in the beauty industry.",
            "Three days later, on February 21, they connected again to redefine the concept. Those early discussions turned a casual possibility into a serious startup exploration."
          ]
        },
        {
          title: "March 2025 — Looking Beyond the Original Idea",
          content: [
            "During March, Rehmat and Sardhar spoke with multiple people to understand challenges in the beauty industry.",
            "They used these customer conversations to refine and pivot their original concept based on real skin frustrations."
          ]
        },
        {
          title: "2025 — The Long Road Before the First Product",
          content: [
            "The team experimented with AI tools, researched business models, and navigated investor discussions that did not materialize.",
            "Glowvai had to keep moving despite uncertainty and resource constraints."
          ]
        },
        {
          title: "November 2025 to January 1, 2026 — Public Launch & V1",
          content: [
            "In November 2025, Glowvai was publicly announced. With Work Wizards Innovations connecting in December, Glowvai V1 launched on January 1, 2026.",
            "Over 600 visitors and 300 skin scans tested the initial platform."
          ]
        },
        {
          title: "2026 — Quick Commerce Expansion & Market Growth",
          content: [
            "Rehmat continues leading market exploration, expanding Glow VAI's reach from skin checks into Vijayawada hyperlocal dark store delivery and partner referral programs.",
            "The journey proves that building a lasting business requires relentless customer focus."
          ]
        }
      ]
    },
    {
      id: "sathveek",
      name: "Sathveek Nalla",
      role: "Co-Founder & Technical Lead",
      tagline: "Builds the high-speed AI engine, scan telemetry, and quick-commerce platform infrastructure.",
      bio: "B.Tech student from Visakhapatnam deeply passionate about software engineering, AI, and relentless startup execution.",
      image: "/images/founders/nalla-satvik.jpg",
      artDirectionNote: "Sathveek Nalla, Co-Founder & Technical Lead.",
      location: "Visakhapatnam, Andhra Pradesh",
      storyTitle: "SATHVEEK NALLA — September 15, 2026: The New Chapter",
      storySubtitle: "From an Instagram online connection to Co-Founder & Technical Lead driving relentless engineering.",
      sections: [
        {
          title: "September 15, 2026 — The New Chapter Begins",
          content: [
            "Before September 15, 2026, Sardhar Musthafa and Sathweek knew each other through Instagram. They were connected online, but had not yet begun building Glowvai together.",
            "Sathweek, a B.Tech student from Visakhapatnam, was deeply interested in technology, startups, businesses, and building software. Technology wasn't just an interest to him; it was something he genuinely wanted to build his future around.",
            "On September 15, 2026, that online connection became something more. They started working together, their friendship grew, and Sathweek joined Glowvai as its new technology partner and co-founder.",
            "What made this chapter different was his commitment to execution. He wasn't just interested in discussing ideas or imagining what Glowvai could become. He was putting in serious work, often pushing himself even harder than Sardhar expected.",
            "For Sardhar, who had spent months searching for dependable people and dealing with collaborations that failed to deliver, this marked an important new chapter.",
            "Glowvai had found someone who shared the ambition to build and was willing to put in the work.",
            "September 15, 2026 — An online connection became a friendship, a partnership, and a shared commitment to building Glowvai."
          ]
        }
      ]
    }
  ] as Founder[],

  timeline: [
    {
      period: "2023–2024",
      title: "Before Glowvai — Where the Journey Began",
      description: [
        "Sardhar Musthafa was learning ethical hacking and exploring technology in Vijayawada.",
        "Met Rehmat; a strong friendship formed before any business idea existed."
      ],
      badge: "ORIGIN & LEARNING"
    },
    {
      period: "Feb 18, 2025",
      title: "The First Conversation (The Spark)",
      description: [
        "Sardhar visited Rehmat at his location.",
        "What began as a casual chat turned into the founding idea for a beauty-tech startup."
      ],
      badge: "FOUNDING MOMENT",
      isKeyMilestone: true
    },
    {
      period: "Feb 21, 2025",
      title: "Redefining the Idea",
      description: [
        "3 days later, Sardhar & Rehmat re-engaged to define what problem Glowvai would solve.",
        "Identified customer frustrations in finding suitable skincare routines."
      ],
      badge: "CONCEPT DEFINITION"
    },
    {
      period: "March 2025",
      title: "Listening to the Beauty Industry",
      description: [
        "Conducted in-depth interviews with potential users regarding skincare confusion.",
        "Shifted focus from simply having a business idea to solving real consumer pain points."
      ],
      badge: "USER RESEARCH"
    },
    {
      period: "Mar–Oct 2025",
      title: "Experimentation, Research & Hard Lessons",
      description: [
        "Explored AI tools, Amazon infrastructure, and business models.",
        "Navigated unfulfilled investor promises, learning the critical difference between talk and execution."
      ],
      badge: "RESEARCH & PIVOTS"
    },
    {
      period: "Nov 12–20, 2025",
      title: "Building in Public",
      description: [
        "Sardhar began sharing startup journey content online.",
        "On Nov 20, 2025, Glowvai was officially announced to the public."
      ],
      badge: "PUBLIC ANNOUNCEMENT",
      isKeyMilestone: true
    },
    {
      period: "Dec 2025",
      title: "Work Wizards Innovations Partnership",
      description: [
        "Work Wizards Innovations (Venkat & team) collaborated with Glowvai.",
        "Transitioned the concept into a tangible web product."
      ],
      badge: "TECH COLLABORATION"
    },
    {
      period: "Jan 1, 2026",
      title: "Glowvai V1 Goes Live",
      description: [
        "Launched AI-powered face & skin analysis experience.",
        "Achieved 600+ website visitors and 300+ completed skin scans."
      ],
      badge: "V1 LAUNCH",
      isKeyMilestone: true
    },
    {
      period: "Early–Mid 2026",
      title: "The V2 Trap & Quick-Commerce Blueprint",
      description: [
        "Expanded vision into AI personalization + Hyperlocal Dark Store fulfillment.",
        "Learned that a startup succeeds by solving the right problem well, not by adding bloated features."
      ],
      badge: "QUICK-COMMERCE SHIFT"
    },
    {
      period: "Sep 15, 2026",
      title: "A New Chapter: Sathweek Joins as Co-Founder & Tech Lead",
      description: [
        "Sathweek Nalla (B.Tech, Visakhapatnam) reconnected with Sardhar & Rehmat.",
        "Brought intense engineering speed and execution discipline to Glow VAI."
      ],
      badge: "TECHNICAL LEADERSHIP",
      isKeyMilestone: true
    },
    {
      period: "Oct 2026 – Today",
      title: "Building the AI Quick-Commerce Dark Store Network",
      description: [
        "Operating 15-minute express delivery micro-hubs in Vijayawada.",
        "Combining on-device dermatological AI checks with direct doorstep fulfillment."
      ],
      badge: "LIVE TODAY",
      isKeyMilestone: true
    }
  ] as TimelineEvent[]
};
