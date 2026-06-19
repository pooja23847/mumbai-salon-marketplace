import { Link } from "@tanstack/react-router";
import { Star, MapPin, ArrowRight } from "lucide-react";
import type { Salon } from "@/data/salons";

export function SalonCard({ salon }: { salon: Salon }) {
  return (
    <Link
      to="/salons/$salonId"
      params={{ salonId: salon.id }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-2"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={salon.image}
          alt={salon.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
          {salon.priceRange}
        </div>
        {salon.trending && (
          <div
            className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-md"
            style={{ background: "var(--gradient-luxury)" }}
          >
            🔥 Trending
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            {salon.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            {salon.rating}
          </div>
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {salon.area} · {salon.reviews} reviews
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {salon.categories.slice(0, 3).map((c) => (
            <span
              key={c}
              className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground"
            >
              {c}
            </span>
          ))}
        </div>
        <div
          className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform group-hover:scale-[1.02]"
          style={{ background: "var(--gradient-luxury)" }}
        >
          Book Now <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
