import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { membershipPlans } from "@/data/services";

export function MembershipPlans() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          Memberships
        </div>
        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
          Beauty, on subscription
        </h2>
        <p className="mt-2 text-muted-foreground">Save more, get pampered more. Cancel anytime.</p>
      </div>
      <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
        {membershipPlans.map((plan) => {
          const highlight = plan.highlight;
          return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border bg-card p-8 transition-all hover:-translate-y-1 ${
                highlight ? "border-transparent md:scale-105" : "border-border"
              }`}
              style={{
                boxShadow: highlight ? "var(--shadow-premium)" : "var(--shadow-card)",
                backgroundImage: highlight ? "var(--gradient-luxury)" : undefined,
              }}
            >
              {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary shadow-md">
                  Most Popular
                </div>
              )}
              <div
                className={`flex items-center gap-2 ${highlight ? "text-white" : "text-foreground"}`}
              >
                <Crown className={`h-5 w-5 ${highlight ? "text-amber-200" : "text-primary"}`} />
                <span className="text-lg font-bold">{plan.name}</span>
              </div>
              <p
                className={`mt-1 text-sm ${highlight ? "text-white/85" : "text-muted-foreground"}`}
              >
                {plan.tagline}
              </p>
              <div
                className={`mt-6 flex items-baseline gap-1 ${highlight ? "text-white" : "text-foreground"}`}
              >
                <span className="text-4xl font-bold">₹{plan.price}</span>
                <span className={highlight ? "text-white/80" : "text-muted-foreground"}>
                  /month
                </span>
              </div>
              <ul
                className={`mt-6 space-y-3 text-sm ${highlight ? "text-white/95" : "text-foreground"}`}
              >
                {plan.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${highlight ? "text-amber-200" : "text-primary"}`}
                    />
                    {b}
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-8 w-full rounded-full ${
                  highlight ? "bg-white text-primary hover:bg-white/90" : "border-0 text-white"
                }`}
                style={!highlight ? { background: "var(--gradient-luxury)" } : undefined}
              >
                Choose {plan.name}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
