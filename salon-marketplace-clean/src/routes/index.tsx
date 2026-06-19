import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { TrendingUp, Heart } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SalonCard } from "@/components/SalonCard";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { TrendingServices } from "@/components/home/TrendingServices";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeatureLinks } from "@/components/home/FeatureLinks";
import { SalonMap } from "@/components/home/SalonMap";
import { salons } from "@/data/salons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SalonHub Mumbai — AI-Powered Beauty Marketplace" },
      {
        name: "description",
        content:
          "Discover top-rated salons in Mumbai, get personalized AI beauty recommendations, and book appointments instantly.",
      },
      { property: "og:title", content: "SalonHub Mumbai — AI-Powered Beauty Marketplace" },
      { property: "og:description", content: "Mumbai's AI-powered salon & spa marketplace." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const featured = salons.slice(0, 4);
  const trending = salons.filter((s) => s.trending);
  const recommended = salons.filter((s) => s.recommended);

  return (
    <SiteLayout>
      <Hero onAdvisorClick={() => navigate({ to: "/ai-advisor" })} />
      <Stats />
      <CategoryCards />
      <TrendingServices />

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Featured salons</h2>
            <p className="mt-1 text-sm text-muted-foreground">Hand-picked favourites in Mumbai</p>
          </div>
          <Link to="/salons" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => (
            <SalonCard key={s.id} salon={s} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Trending this week</h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((s) => (
            <SalonCard key={s.id} salon={s} />
          ))}
        </div>
      </section>

      <FeatureLinks />

      {/* Recommended */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Recommended for you</h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((s) => (
            <SalonCard key={s.id} salon={s} />
          ))}
        </div>
      </section>

      <SalonMap />
    </SiteLayout>
  );
}
