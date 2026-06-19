import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { getSalon, type Salon } from "@/data/salons";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

type SearchParams = { service?: string };

export const Route = createFileRoute("/book/$salonId")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    service: typeof s.service === "string" ? s.service : undefined,
  }),
  loader: ({ params }): { salon: Salon } => {
    const salon = getSalon(params.salonId);
    if (!salon) throw notFound();
    return { salon };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Book ${loaderData?.salon.name} — SalonHub` }],
  }),
  component: BookPage,
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

function BookPage() {
  const { salon } = Route.useLoaderData() as { salon: Salon };
  const search = Route.useSearch();
  const { user, loading } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "10:00",
    service: search.service ?? salon.services[0].name,
  });
  const [confirmed, setConfirmed] = useState<typeof form | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) {
      const meta = user.user_metadata as Record<string, unknown>;
      const fullName = typeof meta.full_name === "string" ? meta.full_name : undefined;
      const name = typeof meta.name === "string" ? meta.name : undefined;
      setForm((f) => (f.name ? f : { ...f, name: fullName || name || f.name }));
    }
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setErr(null);
    setBusy(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      salon_id: salon.id,
      salon_name: salon.name,
      service: form.service,
      customer_name: form.name,
      phone: form.phone,
      appointment_date: form.date,
      appointment_time: form.time,
    });
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    setConfirmed(form);
  };

  if (!loading && !user) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-foreground">Sign in to book</h1>
            <p className="mt-2 text-muted-foreground">
              Create a free account so your bookings are saved and you can manage them anytime.
            </p>
            <Link to="/auth" className="mt-6 inline-block">
              <Button
                className="rounded-full text-white border-0 px-6"
                style={{ background: "var(--gradient-primary)" }}
              >
                Sign in to continue
              </Button>
            </Link>
            <div className="mt-4">
              <Link
                to="/salons/$salonId"
                params={{ salonId: salon.id }}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                ← Back to {salon.name}
              </Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (confirmed) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-lg">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-foreground">Booking Confirmed!</h1>
            <p className="mt-2 text-muted-foreground">
              Thanks {confirmed.name}, your appointment at{" "}
              <strong className="text-foreground">{salon.name}</strong> is booked.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-secondary/60 p-5 text-left text-sm">
              <div>
                <div className="text-muted-foreground">Service</div>
                <div className="font-medium text-foreground">{confirmed.service}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Date</div>
                <div className="font-medium text-foreground">{confirmed.date}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Time</div>
                <div className="font-medium text-foreground">{confirmed.time}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Phone</div>
                <div className="font-medium text-foreground">{confirmed.phone}</div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/salons">
                <Button variant="outline" className="rounded-full">
                  Explore more
                </Button>
              </Link>
              <Link to="/my-bookings">
                <Button
                  className="rounded-full text-white border-0"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  View my bookings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          to="/salons/$salonId"
          params={{ salonId: salon.id }}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to salon
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">Book an appointment</h1>
        <p className="mt-1 text-muted-foreground">
          at <strong className="text-foreground">{salon.name}</strong> · {salon.area}
        </p>

        <form
          onSubmit={submit}
          className="mt-8 grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:grid-cols-2"
        >
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-foreground">Full name</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">Phone number</span>
            <input
              required
              type="tel"
              pattern="[0-9+\- ]{7,15}"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
              placeholder="+91 98765 43210"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">Service</span>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
            >
              {salon.services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} — ₹{s.price}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">Date</span>
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              min={new Date().toISOString().split("T")[0]}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">Time</span>
            <input
              required
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
            />
          </label>
          <div className="sm:col-span-2">
            {err && (
              <div className="mb-3 rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {err}
              </div>
            )}
            <Button
              type="submit"
              className="w-full rounded-full text-white border-0 py-6 text-base shadow-md hover:opacity-90"
              style={{ background: "var(--gradient-primary)" }}
              disabled={busy}
            >
              {busy ? "Booking…" : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </div>
    </SiteLayout>
  );
}
