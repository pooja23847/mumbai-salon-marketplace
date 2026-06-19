import { Link } from "@tanstack/react-router";
import { Brain, Crown, Images, ArrowRight } from "lucide-react";

const items = [
  {
    to: "/ai-advisor",
    icon: Brain,
    title: "AI Beauty Advisor",
    desc: "Get a personalised service plan in seconds based on your hair type, occasion and budget.",
    cta: "Try the Advisor",
  },
  {
    to: "/gallery",
    icon: Images,
    title: "Style Lookbook",
    desc: "Browse curated cuts, color, bridal looks, spa rituals and grooming inspiration — filter by category and find salons that deliver each look.",
    cta: "Open Lookbook",
  },
  {
    to: "/memberships",
    icon: Crown,
    title: "Memberships",
    desc: "Silver, Gold and Platinum plans with up to 25% off and unlimited haircuts.",
    cta: "See Plans",
  },
];

export function FeatureLinks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Explore more</h2>
        <p className="mt-2 text-muted-foreground">Dedicated pages for everything SalonHub.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                style={{ background: "var(--gradient-luxury)" }}
              >
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{it.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{it.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {it.cta}{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
