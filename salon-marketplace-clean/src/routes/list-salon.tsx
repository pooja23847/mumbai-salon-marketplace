import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Store } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/list-salon")({
  head: () => ({ meta: [{ title: "List your salon — SalonHub" }] }),
  component: ListSalonPage,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function ListSalonPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    category: "unisex",
    description: "",
    image_url: "",
    city: "Mumbai",
  });
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  const onChange =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setErr(null);
    setBusy(true);
    try {
      const id = `${slugify(form.name)}-${Math.random().toString(36).slice(2, 6)}`;
      const { error } = await supabase.from("salons").insert({
        id,
        owner_id: user.id,
        name: form.name,
        address: form.address,
        phone: form.phone,
        category: form.category,
        description: form.description || null,
        image_url: form.image_url || null,
        city: form.city,
      });
      if (error) throw error;
      navigate({ to: "/owner-dashboard" });
    } catch (e: unknown) {
      setErr(getErrorMessage(e, "Failed to list salon"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
            style={{ background: "var(--gradient-luxury)" }}
          >
            <Store className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">List your salon</h1>
            <p className="text-sm text-muted-foreground">
              Reach Mumbai customers and manage bookings in one place.
            </p>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-lg"
        >
          <Field label="Salon name">
            <input
              required
              value={form.name}
              onChange={onChange("name")}
              className={inp}
              placeholder="e.g. Lakme Salon Bandra"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City">
              <input required value={form.city} onChange={onChange("city")} className={inp} />
            </Field>
            <Field label="Phone">
              <input
                required
                value={form.phone}
                onChange={onChange("phone")}
                className={inp}
                placeholder="+91 ..."
              />
            </Field>
          </div>
          <Field label="Address">
            <input
              required
              value={form.address}
              onChange={onChange("address")}
              className={inp}
              placeholder="Shop, street, area"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <select value={form.category} onChange={onChange("category")} className={inp}>
                {["unisex", "haircut", "bridal", "spa", "grooming", "nails"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Image URL (optional)">
              <input
                value={form.image_url}
                onChange={onChange("image_url")}
                className={inp}
                placeholder="https://..."
              />
            </Field>
          </div>
          <Field label="Description (optional)">
            <textarea
              value={form.description}
              onChange={onChange("description")}
              rows={3}
              className={inp + " resize-y"}
            />
          </Field>

          {err && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {err}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-2">
            <Link
              to="/owner-dashboard"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              View my dashboard →
            </Link>
            <Button
              type="submit"
              disabled={busy}
              className="rounded-full text-white border-0 px-6 py-5 shadow-md"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {busy ? "Listing…" : "List my salon"}
            </Button>
          </div>
        </form>
      </div>
    </SiteLayout>
  );
}

const inp =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
