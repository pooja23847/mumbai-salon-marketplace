import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, MapPin, Clock, Check, Info, ThumbsUp, Calendar, Flame } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { getSalon, dummyReviews, lookbook, type Salon } from "@/data/salons";

export const Route = createFileRoute("/salons/$salonId")({
  loader: ({ params }): { salon: Salon } => {
    const salon = getSalon(params.salonId);
    if (!salon) throw notFound();
    return { salon };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.salon.name} — SalonHub Mumbai` },
      { name: "description", content: loaderData?.salon.description },
      { property: "og:image", content: loaderData?.salon.image },
    ],
  }),
  component: SalonDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Salon not found</h1>
        <Link to="/salons" className="mt-4 inline-block text-primary hover:underline">
          ← Back to salons
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <button onClick={reset} className="mt-4 text-primary hover:underline">
          Try again
        </button>
      </div>
    </SiteLayout>
  ),
});

function SalonDetail() {
  const { salon } = Route.useLoaderData() as { salon: Salon };
  const [active, setActive] = useState(0);
  const [helpful, setHelpful] = useState<Record<number, boolean>>({});
  const popular = salon.services.slice(0, 3);
  const salonLooks = lookbook.filter((l) => l.salonIds.includes(salon.id)).slice(0, 6);
  const hours = [
    { day: "Mon – Fri", time: "10:00 AM – 9:00 PM" },
    { day: "Saturday", time: "9:00 AM – 10:00 PM" },
    { day: "Sunday", time: "10:00 AM – 8:00 PM" },
  ];
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Gallery */}
        <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={salon.gallery[active]}
              alt={salon.name}
              className="h-96 w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {salon.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`overflow-hidden rounded-xl border-2 transition-all ${active === i ? "border-primary" : "border-transparent"}`}
              >
                <img src={g} alt="" className="h-24 w-full object-cover md:h-28" />
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{salon.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {salon.area}
              </span>
              <span className="flex items-center gap-1 text-foreground">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />{" "}
                <strong>{salon.rating}</strong> ({salon.reviews} reviews)
              </span>
              <span className="font-semibold text-foreground">{salon.priceRange}</span>
            </div>
          </div>
          <Link to="/book/$salonId" params={{ salonId: salon.id }}>
            <Button
              className="rounded-full text-white border-0 px-6 shadow-md hover:opacity-90"
              style={{ background: "var(--gradient-primary)" }}
            >
              Book Appointment
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-foreground">About</h2>
              <p className="mt-2 text-muted-foreground">{salon.description}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Services & prices</h2>
              <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
                {salon.services.map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-4">
                    <div>
                      <div className="font-medium text-foreground">{s.name}</div>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {s.duration}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">
                        ₹{s.price.toLocaleString("en-IN")}
                      </span>
                      <Link
                        to="/book/$salonId"
                        params={{ salonId: salon.id }}
                        search={{ service: s.name } as never}
                      >
                        <Button size="sm" variant="outline" className="rounded-full">
                          Book
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {salonLooks.length > 0 && (
              <section>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Style Lookbook</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Inspiration shots for services this salon offers.
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {salonLooks.map((l) => (
                    <div
                      key={l.id}
                      className="overflow-hidden rounded-xl border border-border bg-card"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img
                          src={l.image}
                          alt={l.title}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          {l.category}
                        </span>
                      </div>
                      <div className="p-2.5">
                        <div className="text-xs font-semibold text-foreground">{l.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Reviews</h2>
                <span className="text-xs text-muted-foreground">{dummyReviews.length} shown</span>
              </div>
              <div className="mt-2 flex items-start gap-2 rounded-xl border border-dashed border-border bg-accent/40 p-3 text-xs text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p>
                  <strong className="text-foreground">Note:</strong> these are{" "}
                  <strong>sample reviews</strong> shown for demo purposes. Real customer reviews
                  will appear here once the platform goes live and bookings start.
                </p>
              </div>
              <div className="mt-4 space-y-3">
                {dummyReviews.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{r.name}</div>
                          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                            Sample review
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${j < r.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                    <button
                      onClick={() => setHelpful((h) => ({ ...h, [i]: !h[i] }))}
                      className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                        helpful[i]
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:bg-accent"
                      }`}
                    >
                      <ThumbsUp className="h-3 w-3" /> Helpful {helpful[i] ? "✓" : ""}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-foreground">Why book on SalonHub?</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                "Verified salons",
                "Instant confirmation",
                "Best price guarantee",
                "Free cancellation",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> {p}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-border pt-5">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <Calendar className="h-4 w-4 text-primary" /> Working hours
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center justify-between text-muted-foreground"
                  >
                    <span className="font-medium text-foreground">{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <Flame className="h-4 w-4 text-primary" /> Popular services
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {popular.map((s) => (
                  <li key={s.name} className="flex items-center justify-between">
                    <span className="text-foreground">{s.name}</span>
                    <span className="font-semibold text-primary">
                      ₹{s.price.toLocaleString("en-IN")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/book/$salonId" params={{ salonId: salon.id }} className="mt-6 block">
              <Button
                className="w-full rounded-full text-white border-0 shadow-md"
                style={{ background: "var(--gradient-luxury)" }}
              >
                Book Appointment
              </Button>
            </Link>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
