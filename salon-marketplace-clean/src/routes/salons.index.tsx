import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { SalonCard } from "@/components/SalonCard";
import { salons, categories } from "@/data/salons";
import { Search, X } from "lucide-react";

type SearchParams = { q?: string; category?: string; sort?: string };

export const Route = createFileRoute("/salons/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Explore Salons in Mumbai — SalonHub" },
      {
        name: "description",
        content: "Browse and filter salons, spas and grooming studios across Mumbai.",
      },
    ],
  }),
  component: SalonsListPage,
});

function SalonsListPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [category, setCategory] = useState(search.category ?? "all");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState(search.sort ?? "recommended");
  const [area, setArea] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(3);

  const areas = useMemo(() => {
    const set = new Set<string>();
    salons.forEach((s) => {
      const city = s.area.split(",")[0]?.trim();
      if (city) set.add(city);
    });
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    let list = salons.filter((s) => {
      const matchQ = !q || [s.name, s.area].join(" ").toLowerCase().includes(q.toLowerCase());
      const matchC = category === "all" || s.categories.includes(category);
      const matchR = s.rating >= minRating;
      const matchA = area === "all" || s.area.toLowerCase().includes(area.toLowerCase());
      const matchP = s.priceLevel <= maxPrice;
      return matchQ && matchC && matchR && matchA && matchP;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.priceLevel - b.priceLevel);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.priceLevel - a.priceLevel);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, category, minRating, sort, area, maxPrice]);

  const hasFilters =
    q ||
    category !== "all" ||
    minRating > 0 ||
    area !== "all" ||
    maxPrice < 3 ||
    sort !== "recommended";
  function clearAll() {
    setQ("");
    setCategory("all");
    setMinRating(0);
    setArea("all");
    setMaxPrice(3);
    setSort("recommended");
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Salons in Mumbai</h1>
        <p className="mt-1 text-muted-foreground">{filtered.length} results</p>

        <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card p-2 shadow-sm">
          <Search className="ml-3 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or area..."
            className="flex-1 bg-transparent px-2 py-1.5 text-sm outline-none"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Filters */}
          <aside className="space-y-6 rounded-2xl border border-border bg-card p-5 h-fit">
            {hasFilters && (
              <button
                onClick={clearAll}
                className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary"
              >
                <X className="h-3 w-3" /> Clear all filters
              </button>
            )}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Category</h3>
              <div className="mt-3 space-y-2">
                {[{ id: "all", name: "All" }, ...categories].map((c) => (
                  <label key={c.id} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="cat"
                      checked={category === c.id}
                      onChange={() => setCategory(c.id)}
                      className="accent-primary"
                    />
                    <span className="text-foreground">{c.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Area</h3>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="all">All Mumbai</option>
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Max price</h3>
              <div className="mt-3 flex gap-2">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    onClick={() => setMaxPrice(p)}
                    className={`flex-1 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      maxPrice === p
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:bg-accent"
                    }`}
                  >
                    {"₹".repeat(p)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Sort by</h3>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Min rating</h3>
              <div className="mt-3 flex gap-2">
                {[0, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      minRating === r
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:bg-accent"
                    }`}
                  >
                    {r === 0 ? "Any" : `${r}+`}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
                No salons match your filters.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((s) => (
                  <SalonCard key={s.id} salon={s} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
