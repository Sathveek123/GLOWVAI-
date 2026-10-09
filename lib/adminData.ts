export interface AdminLead {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  skin_concern: string;
  overall_score: number;
  sub_scores: string;
  city: string;
  device: string;
  status: string;
}

export interface AdminOrder {
  id: string;
  order_ref: string;
  created_at: string;
  items: string;
  subtotal: number;
  pincode: string;
  city: string;
  status: "Pending" | "Packing" | "Dispatched" | "Delivered";
}

export interface AdminWaitlist {
  id: string;
  email: string;
  pincode: string;
  city: string;
  created_at: string;
  source: string;
}

export interface AdminContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  created_at: string;
}

export const INITIAL_LEADS: AdminLead[] = [
  {
    id: "LEAD-8841",
    created_at: "2026-10-09 18:42:10",
    name: "Sathveek Nalla",
    phone: "+91 89778 55998",
    email: "sathveek@glowvai.in",
    skin_concern: "Acne & Hyperpigmentation",
    overall_score: 82,
    sub_scores: "Hydration: 85, Oil: 72, Texture: 88",
    city: "Vijayawada",
    device: "iPhone 15 Pro",
    status: "Completed",
  },
  {
    id: "LEAD-8842",
    created_at: "2026-10-09 19:15:33",
    name: "Sardhar Musthafa",
    phone: "+91 98490 12345",
    email: "musthafa@glowvai.in",
    skin_concern: "Dullness & Sun Protection",
    overall_score: 79,
    sub_scores: "Hydration: 78, Barrier: 80, Pores: 76",
    city: "Visakhapatnam",
    device: "MacBook Air M2",
    status: "Completed",
  },
  {
    id: "LEAD-8843",
    created_at: "2026-10-09 20:04:12",
    name: "Rahimath V",
    phone: "+91 91212 98765",
    email: "rahimath@glowvai.in",
    skin_concern: "Dryness & Redness",
    overall_score: 88,
    sub_scores: "Hydration: 90, Sensitivity: 84, Glow: 91",
    city: "Vijayawada",
    device: "Android (Samsung S24)",
    status: "Completed",
  },
  {
    id: "LEAD-8844",
    created_at: "2026-10-09 21:10:05",
    name: "Ananya Sharma",
    phone: "+91 94401 55678",
    email: "ananya.s@gmail.com",
    skin_concern: "Uneven Tone & Dark Spots",
    overall_score: 74,
    sub_scores: "Pigmentation: 68, Hydration: 75, Oil: 80",
    city: "Vijayawada",
    device: "iPhone 14",
    status: "Completed",
  },
];

export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ORD-9901",
    order_ref: "GV-EXP-500081-102",
    created_at: "2026-10-09 19:30:00",
    items: "Dew Barrier Hydrator (x1), Clarity Pop Serum (x1)",
    subtotal: 1298,
    pincode: "520001",
    city: "Vijayawada Central",
    status: "Dispatched",
  },
  {
    id: "ORD-9902",
    order_ref: "GV-EXP-500081-103",
    created_at: "2026-10-09 20:12:44",
    items: "Sun Shield Fluid SPF50 (x2)",
    subtotal: 1398,
    pincode: "520010",
    city: "Vijayawada Benz Circle",
    status: "Packing",
  },
  {
    id: "ORD-9903",
    order_ref: "GV-EXP-530017-104",
    created_at: "2026-10-09 20:55:10",
    items: "Minimalist Niacinamide 10% (x1)",
    subtotal: 699,
    pincode: "530017",
    city: "Visakhapatnam MVP Colony",
    status: "Pending",
  },
];

export const INITIAL_WAITLIST: AdminWaitlist[] = [
  {
    id: "WTL-101",
    email: "kiran.v@yahoo.com",
    pincode: "500081",
    city: "Hyderabad HITECH City",
    created_at: "2026-10-09 15:20:11",
    source: "Pincode Checker Modal",
  },
  {
    id: "WTL-102",
    email: "priya.reddy@outlook.com",
    pincode: "522002",
    city: "Guntur",
    created_at: "2026-10-09 17:45:00",
    source: "Delivery Banner",
  },
  {
    id: "WTL-103",
    email: "vikram.m@gmail.com",
    pincode: "517501",
    city: "Tirupati",
    created_at: "2026-10-09 19:00:22",
    source: "Footer Link",
  },
];

export const INITIAL_CONTACTS: AdminContact[] = [
  {
    id: "CNT-401",
    name: "Dr. K. Srinivas",
    email: "srinivas.derma@gmail.com",
    phone: "+91 98850 44332",
    topic: "Partnership & Derma Collaboration",
    message: "Interested in integrating our dermatology clinic products with GLOW VAI 15-minute dark store dispatch in Vijayawada.",
    created_at: "2026-10-09 14:10:00",
  },
  {
    id: "CNT-402",
    name: "Ramesh Babu",
    email: "ramesh.babu@gmail.com",
    phone: "+91 99123 77665",
    topic: "Campus Ambassador Program",
    message: "Applying for the SRKR Engineering College campus referral program.",
    created_at: "2026-10-09 16:30:15",
  },
];
