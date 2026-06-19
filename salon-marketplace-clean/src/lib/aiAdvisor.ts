export type HairType = "dry" | "oily" | "normal";
export type Occasion = "daily" | "party" | "wedding";
export type Budget = "low" | "medium" | "premium";

export type Recommendation = {
  title: string;
  description: string;
  estimatedPrice: string;
  icon: string;
};

const HAIR_TREATMENTS: Record<HairType, Recommendation> = {
  dry: {
    title: "Deep Moisture Hair Spa",
    description: "Intense hydration ritual with argan-oil mask to revive dry, brittle hair.",
    estimatedPrice: "₹1,800 – ₹3,200",
    icon: "💧",
  },
  oily: {
    title: "Clarifying Scalp Detox",
    description: "Charcoal scalp cleanse + tea-tree treatment to balance oil production.",
    estimatedPrice: "₹1,200 – ₹2,400",
    icon: "🌿",
  },
  normal: {
    title: "Signature Glow Hair Spa",
    description: "Nourishing spa that keeps healthy hair shiny, soft, and frizz-free.",
    estimatedPrice: "₹1,500 – ₹2,800",
    icon: "✨",
  },
};

const OCCASION_LOOKS: Record<Occasion, Recommendation> = {
  daily: {
    title: "Effortless Everyday Styling",
    description: "Quick blow-dry + soft makeup for an instant put-together look.",
    estimatedPrice: "₹800 – ₹1,500",
    icon: "🌸",
  },
  party: {
    title: "Glam Party Makeover",
    description: "Statement waves, smokey eyes & glossy lips for that show-stopping entrance.",
    estimatedPrice: "₹2,500 – ₹5,000",
    icon: "💃",
  },
  wedding: {
    title: "Bridal Styling Package",
    description: "HD bridal makeup, hairstyling & saree draping by celebrity artists.",
    estimatedPrice: "₹18,000 – ₹35,000",
    icon: "👰",
  },
};

const BUDGET_ADDONS: Record<Budget, Recommendation> = {
  low: {
    title: "Express Refresh Add-on",
    description: "Quick threading, clean-up & polish — feel fresh without splurging.",
    estimatedPrice: "₹300 – ₹800",
    icon: "💖",
  },
  medium: {
    title: "Luxury Hair Spa Upgrade",
    description: "Premium serum + scalp massage to elevate any service into a treat.",
    estimatedPrice: "₹1,800 – ₹3,500",
    icon: "🛁",
  },
  premium: {
    title: "Keratin Smoothening Treatment",
    description: "Salon-grade keratin that delivers silky, frizz-free hair for months.",
    estimatedPrice: "₹7,500 – ₹14,000",
    icon: "👑",
  },
};

export function getRecommendations(
  hair: HairType,
  occasion: Occasion,
  budget: Budget,
): Recommendation[] {
  return [HAIR_TREATMENTS[hair], OCCASION_LOOKS[occasion], BUDGET_ADDONS[budget]];
}
