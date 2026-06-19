import { MapPin } from "lucide-react";
import { mumbaiMapLocations } from "@/data/services";

export function SalonMap() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          On the Map
        </div>
        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
          Find salons near you
        </h2>
        <p className="mt-2 text-muted-foreground">
          Partner salons across every Mumbai neighbourhood.
        </p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div
          className="overflow-hidden rounded-3xl border border-border"
          style={{ boxShadow: "var(--shadow-premium)" }}
        >
          <iframe
            title="Mumbai salons map"
            src="https://www.google.com/maps?q=Mumbai+salon&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div
          className="rounded-3xl border border-border bg-card p-6"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h3 className="font-semibold text-foreground">Popular locations</h3>
          <ul className="mt-4 space-y-3">
            {mumbaiMapLocations.map((l) => (
              <li
                key={l.name}
                className="flex items-start gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary/40"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                  style={{ background: "var(--gradient-luxury)" }}
                >
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{l.name}</div>
                  <div className="text-xs text-muted-foreground">{l.area}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
