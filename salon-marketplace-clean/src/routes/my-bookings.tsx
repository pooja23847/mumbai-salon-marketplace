import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Trash2, CalendarPlus } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/my-bookings")({
  head: () => ({ meta: [{ title: "My Bookings — SalonHub" }] }),
  component: MyBookings,
});

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

function MyBookings() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("bookings")
      .select("*")
      .order("appointment_date", { ascending: false })
      .then(({ data, error }) => {
        if (error) setErr(error.message);
        else setBookings(data as Booking[]);
      });
  }, [user]);

  const cancel = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (!error) setBookings((b) => b?.filter((x) => x.id !== id) ?? null);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  if (loading || !user) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">
          Loading…
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">My Bookings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Signed in as <strong className="text-foreground">{user.email}</strong>
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/salons">
              <Button variant="outline" className="rounded-full">
                Book another
              </Button>
            </Link>
            <Button onClick={signOut} variant="ghost" className="rounded-full">
              Sign out
            </Button>
          </div>
        </div>

        {err && (
          <div className="mt-6 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {err}
          </div>
        )}

        <div className="mt-8 space-y-4">
          {bookings === null ? (
            <div className="text-center text-muted-foreground">Loading bookings…</div>
          ) : bookings.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <CalendarPlus className="mx-auto h-10 w-10 text-muted-foreground" />
              <h2 className="mt-4 text-lg font-semibold text-foreground">No bookings yet</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Find a salon and book your first appointment.
              </p>
              <Link to="/salons" className="mt-5 inline-block">
                <Button
                  className="rounded-full text-white border-0"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Explore salons
                </Button>
              </Link>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Link
                      to="/salons/$salonId"
                      params={{ salonId: b.salon_id }}
                      className="text-lg font-semibold text-foreground hover:text-primary"
                    >
                      {b.salon_name}
                    </Link>
                    <div className="mt-1 text-sm text-muted-foreground">{b.service}</div>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> {b.appointment_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {b.appointment_time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {b.phone}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
                      {b.status}
                    </span>
                    <button
                      onClick={() => cancel(b.id)}
                      className="inline-flex items-center gap-1 text-xs text-destructive hover:underline"
                    >
                      <Trash2 className="h-3 w-3" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
