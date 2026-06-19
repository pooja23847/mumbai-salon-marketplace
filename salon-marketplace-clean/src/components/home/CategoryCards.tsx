import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/salons";

export function CategoryCards() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          Categories
        </div>
        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Browse by category</h2>
        <p className="mt-2 text-muted-foreground">
          Tap a category to explore Mumbai's best salons.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            to="/salons"
            search={{ category: c.id } as never}
            className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-border"
            style={{ boxShadow: "var(--shadow-premium)" }}
          >
            <img
              src={c.image}
              alt={c.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-70 mix-blend-multiply`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 text-2xl shadow-lg backdrop-blur">
              {c.emoji}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <div className="text-xl font-bold">{c.name}</div>
              <div className="mt-1 text-sm text-white/85">{c.tagline}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold opacity-0 transition-all group-hover:opacity-100">
                Explore <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
