export type Salon = {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviews: number;
  priceRange: "₹" | "₹₹" | "₹₹₹";
  priceLevel: number; // 1-3 for sorting
  categories: string[];
  image: string;
  gallery: string[];
  description: string;
  services: { name: string; price: number; duration: string }[];
  trending?: boolean;
  recommended?: boolean;
};

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

export const categories = [
  {
    id: "haircut",
    name: "Haircut & Styling",
    emoji: "✂️",
    tagline: "Cuts, blow-drys & styling",
    image: img("photo-1562322140-8baeececf3df"),
    gradient: "from-rose-500 to-orange-400",
  },
  {
    id: "bridal",
    name: "Bridal & Makeup",
    emoji: "💍",
    tagline: "HD bridal looks by top MUAs",
    image: img("photo-1595967618143-e3a36b88f3f0"),
    gradient: "from-pink-500 to-fuchsia-500",
  },
  {
    id: "spa",
    name: "Spa & Wellness",
    emoji: "💆",
    tagline: "Massage, facials, hair spa",
    image: img("photo-1540555700478-4be289fbecef"),
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    id: "grooming",
    name: "Men's Grooming",
    emoji: "🧔",
    tagline: "Beard, shave & skin for men",
    image: img("photo-1503951914875-452162b0f3f1"),
    gradient: "from-slate-700 to-zinc-500",
  },
];

export const salons: Salon[] = [
  {
    id: "bandra-luxe",
    name: "Bandra Luxe Salon",
    area: "Bandra West, Mumbai",
    rating: 4.8,
    reviews: 412,
    priceRange: "₹₹₹",
    priceLevel: 3,
    categories: ["haircut", "bridal", "spa"],
    image: img("photo-1560066984-138dadb4c035"),
    gallery: [
      img("photo-1560066984-138dadb4c035"),
      img("photo-1522337360788-8b13dee7a37e"),
      img("photo-1633681926022-84c23e8cb2d6"),
    ],
    description:
      "A luxurious salon experience in the heart of Bandra, offering premium hair, skin, and bridal services with celebrity stylists.",
    services: [
      { name: "Signature Haircut", price: 1800, duration: "45 min" },
      { name: "Hair Spa & Treatment", price: 2500, duration: "60 min" },
      { name: "Bridal Makeup", price: 25000, duration: "3 hrs" },
      { name: "Keratin Smoothening", price: 8500, duration: "2.5 hrs" },
    ],
    trending: true,
    recommended: true,
  },
  {
    id: "andheri-glam",
    name: "Andheri Glam Studio",
    area: "Andheri West, Mumbai",
    rating: 4.6,
    reviews: 287,
    priceRange: "₹₹",
    priceLevel: 2,
    categories: ["haircut", "grooming", "spa"],
    image: img("photo-1522337360788-8b13dee7a37e"),
    gallery: [
      img("photo-1522337360788-8b13dee7a37e"),
      img("photo-1599351431202-1e0f0137899a"),
      img("photo-1560066984-138dadb4c035"),
    ],
    description:
      "Trendy studio in Andheri delivering modern cuts, color, and grooming for the urban crowd.",
    services: [
      { name: "Classic Haircut", price: 800, duration: "30 min" },
      { name: "Global Hair Color", price: 3500, duration: "90 min" },
      { name: "Beard Styling", price: 500, duration: "30 min" },
      { name: "Head Massage", price: 700, duration: "30 min" },
    ],
    trending: true,
  },
  {
    id: "powai-style",
    name: "Powai Style Hub",
    area: "Powai, Mumbai",
    rating: 4.4,
    reviews: 198,
    priceRange: "₹₹",
    priceLevel: 2,
    categories: ["haircut", "grooming"],
    image: img("photo-1599351431202-1e0f0137899a"),
    gallery: [
      img("photo-1599351431202-1e0f0137899a"),
      img("photo-1503951914875-452162b0f3f1"),
      img("photo-1605497788044-5a32c7078486"),
    ],
    description: "Lakeside salon in Powai with skilled stylists and an easy, friendly vibe.",
    services: [
      { name: "Men's Haircut", price: 600, duration: "30 min" },
      { name: "Women's Haircut", price: 900, duration: "45 min" },
      { name: "Clean Shave", price: 300, duration: "20 min" },
      { name: "Hair Wash & Blow Dry", price: 700, duration: "30 min" },
    ],
    recommended: true,
  },
  {
    id: "colaba-beauty",
    name: "Colaba Beauty Lounge",
    area: "Colaba, Mumbai",
    rating: 4.7,
    reviews: 356,
    priceRange: "₹₹₹",
    priceLevel: 3,
    categories: ["bridal", "spa"],
    image: img("photo-1633681926022-84c23e8cb2d6"),
    gallery: [
      img("photo-1633681926022-84c23e8cb2d6"),
      img("photo-1487412947147-5cebf100ffc2"),
      img("photo-1560066984-138dadb4c035"),
    ],
    description:
      "Heritage-style lounge in Colaba specializing in bridal packages and luxury spa rituals.",
    services: [
      { name: "Bridal Package", price: 35000, duration: "5 hrs" },
      { name: "Aroma Spa Therapy", price: 3200, duration: "75 min" },
      { name: "Facial - Gold", price: 2800, duration: "60 min" },
      { name: "Mani + Pedi", price: 1500, duration: "60 min" },
    ],
    recommended: true,
  },
  {
    id: "juhu-shine",
    name: "Juhu Shine Salon",
    area: "Juhu, Mumbai",
    rating: 4.5,
    reviews: 221,
    priceRange: "₹₹",
    priceLevel: 2,
    categories: ["haircut", "spa", "grooming"],
    image: img("photo-1487412947147-5cebf100ffc2"),
    gallery: [img("photo-1487412947147-5cebf100ffc2"), img("photo-1522337360788-8b13dee7a37e")],
    description: "Beachside salon offering refreshing hair and skin services with a relaxing vibe.",
    services: [
      { name: "Haircut & Style", price: 1200, duration: "45 min" },
      { name: "De-Tan Facial", price: 1800, duration: "45 min" },
      { name: "Foot Spa", price: 900, duration: "30 min" },
    ],
    trending: true,
  },
  {
    id: "worli-mens",
    name: "Worli Men's Grooming Co.",
    area: "Worli, Mumbai",
    rating: 4.3,
    reviews: 142,
    priceRange: "₹",
    priceLevel: 1,
    categories: ["grooming", "haircut"],
    image: img("photo-1503951914875-452162b0f3f1"),
    gallery: [img("photo-1503951914875-452162b0f3f1"), img("photo-1605497788044-5a32c7078486")],
    description:
      "Sharp, no-nonsense men's grooming with quick service and a classic barbershop feel.",
    services: [
      { name: "Haircut", price: 450, duration: "30 min" },
      { name: "Beard Trim", price: 250, duration: "20 min" },
      { name: "Hair Color (Men)", price: 1500, duration: "60 min" },
    ],
  },
  {
    id: "lower-parel-edge",
    name: "Lower Parel Edge Studio",
    area: "Lower Parel, Mumbai",
    rating: 4.6,
    reviews: 263,
    priceRange: "₹₹₹",
    priceLevel: 3,
    categories: ["haircut", "spa", "bridal"],
    image: img("photo-1521590832167-7bcbfaa6381f"),
    gallery: [img("photo-1521590832167-7bcbfaa6381f"), img("photo-1560066984-138dadb4c035")],
    description:
      "High-rise studio with celebrity stylists, advanced color bar and a serene spa lounge.",
    services: [
      { name: "Premium Haircut", price: 1500, duration: "45 min" },
      { name: "Balayage", price: 6500, duration: "2 hrs" },
      { name: "Pre-Bridal Package", price: 12000, duration: "3 hrs" },
    ],
    trending: true,
  },
  {
    id: "malad-bliss",
    name: "Malad Bliss Beauty Bar",
    area: "Malad West, Mumbai",
    rating: 4.4,
    reviews: 174,
    priceRange: "₹₹",
    priceLevel: 2,
    categories: ["spa", "bridal"],
    image: img("photo-1571646034647-52e6ea84b28c"),
    gallery: [img("photo-1571646034647-52e6ea84b28c"), img("photo-1487412947147-5cebf100ffc2")],
    description:
      "Cozy beauty bar in Malad offering relaxing facials, body spa and bridal prep packages.",
    services: [
      { name: "Aromatherapy Facial", price: 1600, duration: "60 min" },
      { name: "Full Body Spa", price: 2800, duration: "75 min" },
      { name: "Bridal Mehendi", price: 4500, duration: "2 hrs" },
    ],
    recommended: true,
  },
  {
    id: "dadar-trends",
    name: "Dadar Trends Salon",
    area: "Dadar East, Mumbai",
    rating: 4.2,
    reviews: 156,
    priceRange: "₹",
    priceLevel: 1,
    categories: ["haircut", "grooming"],
    image: img("photo-1605497788044-5a32c7078486"),
    gallery: [img("photo-1605497788044-5a32c7078486"), img("photo-1503951914875-452162b0f3f1")],
    description:
      "Friendly neighbourhood salon with quick, affordable cuts and grooming for the whole family.",
    services: [
      { name: "Family Haircut", price: 350, duration: "25 min" },
      { name: "Kids Haircut", price: 250, duration: "20 min" },
      { name: "Threading", price: 80, duration: "10 min" },
    ],
  },
  {
    id: "thane-radiance",
    name: "Thane Radiance Spa & Salon",
    area: "Thane West, Mumbai",
    rating: 4.5,
    reviews: 209,
    priceRange: "₹₹",
    priceLevel: 2,
    categories: ["spa", "haircut", "grooming"],
    image: img("photo-1540555700478-4be289fbecef"),
    gallery: [img("photo-1540555700478-4be289fbecef"), img("photo-1522337360788-8b13dee7a37e")],
    description:
      "Spacious wellness-focused salon and spa with skilled therapists and modern hair services.",
    services: [
      { name: "Swedish Massage", price: 2200, duration: "60 min" },
      { name: "Haircut & Wash", price: 700, duration: "40 min" },
      { name: "Detan Pack", price: 1100, duration: "45 min" },
    ],
    trending: true,
  },
  {
    id: "ghatkopar-shears",
    name: "Ghatkopar Shears & Co.",
    area: "Ghatkopar East, Mumbai",
    rating: 4.3,
    reviews: 138,
    priceRange: "₹₹",
    priceLevel: 2,
    categories: ["haircut", "grooming"],
    image: img("photo-1622286342621-4bd786c2447c"),
    gallery: [img("photo-1622286342621-4bd786c2447c"), img("photo-1605497788044-5a32c7078486")],
    description:
      "Modern barbershop with skin fades, classic shaves and stylish men's grooming services.",
    services: [
      { name: "Skin Fade", price: 550, duration: "35 min" },
      { name: "Royal Shave", price: 450, duration: "30 min" },
      { name: "Hair Spa for Men", price: 900, duration: "45 min" },
    ],
  },
  {
    id: "khar-rosegold",
    name: "Khar Rose Gold Salon",
    area: "Khar West, Mumbai",
    rating: 4.7,
    reviews: 298,
    priceRange: "₹₹₹",
    priceLevel: 3,
    categories: ["bridal", "spa", "haircut"],
    image: img("photo-1556228720-195a672e8a03"),
    gallery: [img("photo-1556228720-195a672e8a03"), img("photo-1633681926022-84c23e8cb2d6")],
    description:
      "Boutique luxury salon in Khar known for bridal styling, premium hair color and gold facials.",
    services: [
      { name: "24K Gold Facial", price: 3500, duration: "75 min" },
      { name: "Bridal Hair & Makeup", price: 28000, duration: "4 hrs" },
      { name: "Olaplex Treatment", price: 4200, duration: "90 min" },
    ],
    trending: true,
    recommended: true,
  },
];

export const getSalon = (id: string) => salons.find((s) => s.id === id);

// Style Lookbook — curated inspiration shots grouped by service category.
// Each look points to salons (by id) that offer that service in Mumbai.
export type LookbookItem = {
  id: string;
  title: string;
  category: "haircut" | "bridal" | "spa" | "grooming";
  image: string;
  description: string;
  salonIds: string[];
};

export const lookbook: LookbookItem[] = [
  {
    id: "soft-layered-bob",
    title: "Soft Layered Bob",
    category: "haircut",
    image: img("photo-1560869713-7d0a29430803"),
    description: "Shoulder-grazing layers with a face-framing front — easy to style at home.",
    salonIds: ["bandra-luxe", "andheri-glam", "lower-parel-edge"],
  },
  {
    id: "balayage-highlights",
    title: "Caramel Balayage",
    category: "haircut",
    image: img("photo-1522337360788-8b13dee7a37e"),
    description: "Hand-painted caramel highlights blended into a natural base.",
    salonIds: ["lower-parel-edge", "khar-rosegold", "bandra-luxe"],
  },
  {
    id: "blow-dry-waves",
    title: "Glossy Blow-Dry Waves",
    category: "haircut",
    image: img("photo-1560066984-138dadb4c035"),
    description: "Big, bouncy waves with a polished, salon-finish gloss.",
    salonIds: ["bandra-luxe", "juhu-shine", "andheri-glam"],
  },
  {
    id: "hd-bridal",
    title: "HD Bridal Makeup",
    category: "bridal",
    image: img("photo-1595967618143-e3a36b88f3f0"),
    description: "Camera-ready HD base with a classic Indian bridal palette.",
    salonIds: ["colaba-beauty", "khar-rosegold", "bandra-luxe"],
  },
  {
    id: "bridal-updo",
    title: "Bridal Updo with Floral Accent",
    category: "bridal",
    image: img("photo-1633681926022-84c23e8cb2d6"),
    description: "Sculpted updo holding through the ceremony, finished with fresh florals.",
    salonIds: ["colaba-beauty", "khar-rosegold"],
  },
  {
    id: "engagement-glam",
    title: "Engagement Glam",
    category: "bridal",
    image: img("photo-1571646034647-52e6ea84b28c"),
    description: "Soft glam look — perfect for engagement, sangeet and reception.",
    salonIds: ["malad-bliss", "khar-rosegold", "bandra-luxe"],
  },
  {
    id: "hair-spa",
    title: "Deep-Conditioning Hair Spa",
    category: "spa",
    image: img("photo-1487412947147-5cebf100ffc2"),
    description: "Steam + masque ritual to revive dry, frizzy or chemically-treated hair.",
    salonIds: ["bandra-luxe", "thane-radiance", "juhu-shine"],
  },
  {
    id: "gold-facial",
    title: "24K Gold Glow Facial",
    category: "spa",
    image: img("photo-1556228720-195a672e8a03"),
    description: "Brightening facial with gold-infused serum for an event-ready glow.",
    salonIds: ["khar-rosegold", "colaba-beauty", "malad-bliss"],
  },
  {
    id: "body-massage",
    title: "Aromatherapy Body Massage",
    category: "spa",
    image: img("photo-1540555700478-4be289fbecef"),
    description: "Full-body relaxation with essential oils — Swedish or deep tissue.",
    salonIds: ["thane-radiance", "colaba-beauty"],
  },
  {
    id: "skin-fade",
    title: "Mid Skin Fade",
    category: "grooming",
    image: img("photo-1622286342621-4bd786c2447c"),
    description: "Sharp mid-fade with a textured top — clean lines, modern silhouette.",
    salonIds: ["ghatkopar-shears", "worli-mens", "powai-style"],
  },
  {
    id: "beard-sculpt",
    title: "Beard Sculpt & Line-Up",
    category: "grooming",
    image: img("photo-1503951914875-452162b0f3f1"),
    description: "Symmetrical beard shape with crisp neckline and cheek-line definition.",
    salonIds: ["andheri-glam", "ghatkopar-shears", "worli-mens"],
  },
  {
    id: "classic-shave",
    title: "Hot-Towel Classic Shave",
    category: "grooming",
    image: img("photo-1605497788044-5a32c7078486"),
    description: "Traditional straight-razor shave with hot towels and after-shave balm.",
    salonIds: ["worli-mens", "ghatkopar-shears", "dadar-trends"],
  },
];

export const dummyReviews = [
  { name: "Priya S.", rating: 5, text: "Absolutely loved the experience. Will be back!" },
  { name: "Rohan M.", rating: 4, text: "Great service and very professional staff." },
  { name: "Aisha K.", rating: 5, text: "Best salon in Mumbai. Highly recommend." },
  { name: "Vikram T.", rating: 4, text: "Clean place, skilled stylists, fair pricing." },
];
