import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { lookbook, salons, categories } from "@/data/salons";

type CatId = "all" | "haircut" | "bridal" | "spa" | "grooming";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Style Lookbook — SalonHub Mumbai" },
      {
        name: "description",
        content:
          "Browse curated haircut, bridal, spa and grooming looks. Each style links to salons in Mumbai that deliver it.",
      },
      { property: "og:title", content: "Style Lookbook — SalonHub Mumbai" },
      {
        property: "og:description",
        content: "Curated salon inspiration for cuts, color, bridal, spa and grooming.",
      },
    ],
  }),
  component: LookbookPage,
});

function LookbookPage() {
  const [cat, setCat] = useState<CatId>("all");

  const filtered = useMemo(
    () => (cat === "all" ? lookbook : lookbook.filter((l) => l.category === cat)),
    [cat],
  );

  const filters: { id: CatId; label: string }[] = [
    { id: "all", label: "All looks" },
    ...categories.map((c) => ({ id: c.id as CatId, label: c.name })),
  ];

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            Style Lookbook
          </div>
          <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
            Find a look you love, then book it
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Curated inspiration for cuts, color, bridal, spa and men's grooming. Every look links to
            Mumbai salons that actually deliver it.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setCat(f.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                cat === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((look) => {
            const offered = look.salonIds
              .map((id) => salons.find((s) => s.id === id))
              .filter((s): s is NonNullable<typeof s> => Boolean(s));
            return (
              <article
                key={look.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {look.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-foreground">{look.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{look.description}</p>

                  <div className="mt-4 border-t border-border pt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Get this look at
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {offered.slice(0, 3).map((s) => (
                        <li key={s.id}>
                          <Link
                            to="/salons/$salonId"
                            params={{ salonId: s.id }}
                            className="flex items-center justify-between text-sm text-foreground hover:text-primary"
                          >
                            <span className="truncate">{s.name}</span>
                            <span className="ml-2 shrink-0 text-xs text-muted-foreground">
                              {s.area.split(",")[0]}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/salons"
                    search={{ category: look.category } as never}
                    className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    See all {look.category} salons →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">No looks in this category yet.</p>
        )}
      </section>
    </SiteLayout>
  );
}
