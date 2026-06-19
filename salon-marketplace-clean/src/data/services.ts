import { Scissors, Crown, Sparkles, Palette, Heart, Droplet, type LucideIcon } from "lucide-react";

export type TrendingService = {
  name: string;
  description: string;
  icon: LucideIcon;
  tint: string;
};

export const trendingServices: TrendingService[] = [
  {
    name: "Hair Spa",
    description: "Deep conditioning rituals to restore shine and softness.",
    icon: Droplet,
    tint: "from-sky-500/15 to-blue-500/10 text-sky-600",
  },
  {
    name: "Bridal Makeup",
    description: "HD bridal looks crafted by Mumbai's top makeup artists.",
    icon: Crown,
    tint: "from-rose-500/15 to-pink-500/10 text-rose-600",
  },
  {
    name: "Keratin Treatment",
    description: "Frizz-free, silky-smooth hair that lasts up to 6 months.",
    icon: Sparkles,
    tint: "from-violet-500/15 to-purple-500/10 text-violet-600",
  },
  {
    name: "Nail Art",
    description: "Designer nail art, gel polish & extensions for every mood.",
    icon: Palette,
    tint: "from-fuchsia-500/15 to-pink-500/10 text-fuchsia-600",
  },
  {
    name: "Facial Treatments",
    description: "Glow facials, 24K gold therapy & skincare for radiant skin.",
    icon: Heart,
    tint: "from-amber-500/15 to-orange-500/10 text-amber-600",
  },
  {
    name: "Hair Coloring",
    description: "Balayage, highlights & global color by certified colorists.",
    icon: Scissors,
    tint: "from-emerald-500/15 to-teal-500/10 text-emerald-600",
  },
];

export type MembershipPlan = {
  name: string;
  price: number;
  tagline: string;
  benefits: string[];
  highlight?: boolean;
};

export const membershipPlans: MembershipPlan[] = [
  {
    name: "Silver",
    price: 499,
    tagline: "For first-time pamper seekers",
    benefits: [
      "10% off on all bookings",
      "1 free haircut every month",
      "Priority appointment slots",
      "Birthday surprise gift",
    ],
  },
  {
    name: "Platinum",
    price: 1499,
    tagline: "The ultimate beauty membership",
    highlight: true,
    benefits: [
      "25% off on all premium services",
      "Unlimited haircuts & blow-drys",
      "Free bridal trial session",
      "Dedicated beauty concierge",
      "Access to celebrity stylists",
    ],
  },
  {
    name: "Gold",
    price: 999,
    tagline: "Most loved by regulars",
    benefits: [
      "18% off on all bookings",
      "2 free hair spas every month",
      "Free monthly clean-up",
      "Exclusive seasonal offers",
    ],
  },
];

export const mumbaiMapLocations = [
  { name: "Bandra Luxe Salon", area: "Bandra West" },
  { name: "Andheri Glam Studio", area: "Andheri West" },
  { name: "Powai Style Hub", area: "Powai" },
  { name: "Colaba Beauty Lounge", area: "Colaba" },
  { name: "Juhu Shine Salon", area: "Juhu" },
  { name: "Worli Men's Grooming", area: "Worli" },
];
