import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Store, CalendarCheck, Plus, Phone, MapPin, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/owner-dashboard")({
  head: () => ({ meta: [{ title: "Owner dashboard — SalonHub" }] }),
  component: OwnerDashboard,
});

type Salon = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  category: string;
  description: string | null;
  image_url: string | null;
};
type Booking = {
  id: string;
  salon_id: string;
  salon_name: string;
  service: string;
  customer_name: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  created_at: string;
};

function OwnerDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setBusy(true);
      const { data: s } = await supabase
        .from("salons")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });
      setSalons((s as Salon[]) ?? []);
      const ids = (s ?? []).map((x) => x.id);
      if (ids.length) {
        const { data: b } = await supabase
          .from("bookings")
          .select("*")
          .in("salon_id", ids)
          .order("appointment_date", { ascending: false });
        setBookings((b as Booking[]) ?? []);
      } else {
        setBookings([]);
      }
      setBusy(false);
    })();
  }, [user]);

  const removeSalon = async (id: string) => {
    if (!confirm("Remove this salon listing?")) return;
    await supabase.from("salons").delete().eq("id", id);
    setSalons((s) => s.filter((x) => x.id !== id));
    setBookings((b) => b.filter((x) => x.salon_id !== id));
  };

  if (loading || !user) return null;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Owner dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage your salons and view customer bookings.
            </p>
          </div>
          <Link to="/list-salon">
            <Button
              className="rounded-full text-white border-0 shadow-md"
              style={{ background: "var(--gradient-luxury)" }}
            >
              <Plus className="mr-1.5 h-4 w-4" /> List a salon
            </Button>
          </Link>
        </div>

        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Store className="h-5 w-5 text-primary" /> Your salons
          </h2>
          {busy ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : salons.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">No salons listed yet.</p>
              <Link
                to="/list-salon"
                className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
              >
                List your first salon →
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {salons.map((s) => (
                <div key={s.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-foreground">{s.name}</div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {s.category}
                      </div>
                    </div>
                    <button
                      onClick={() => removeSalon(s.id)}
                      className="rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {s.address}, {s.city}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      {s.phone}
                    </div>
                  </div>
                  {s.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-foreground/80">{s.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
            <CalendarCheck className="h-5 w-5 text-primary" /> Customer bookings
          </h2>
          {busy ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : bookings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
              No bookings yet for your salons.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Salon</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-t border-border">
                      <td className="px-4 py-3 font-medium text-foreground">{b.customer_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{b.phone}</td>
                      <td className="px-4 py-3 text-muted-foreground">{b.salon_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{b.service}</td>
                      <td className="px-4 py-3 text-muted-foreground">{b.appointment_date}</td>
                      <td className="px-4 py-3 text-muted-foreground">{b.appointment_time}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </SiteLayout>
  );
}
