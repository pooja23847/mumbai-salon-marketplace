import { trendingServices } from "@/data/services";

export function TrendingServices() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          Trending Services
        </div>
        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Loved across Mumbai</h2>
        <p className="mt-2 text-muted-foreground">
          The most-booked beauty experiences this season.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trendingServices.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.tint} transition-transform group-hover:scale-110`}
              >
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{s.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Explore salons →
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
