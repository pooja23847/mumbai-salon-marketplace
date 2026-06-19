import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { MembershipPlans } from "@/components/home/MembershipPlans";

export const Route = createFileRoute("/memberships")({
  head: () => ({
    meta: [
      { title: "Memberships — SalonHub Mumbai" },
      {
        name: "description",
        content: "Silver, Gold and Platinum beauty memberships. Save more and get pampered more.",
      },
      { property: "og:title", content: "Memberships — SalonHub Mumbai" },
      { property: "og:description", content: "Beauty, on subscription." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Membership Plans</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Pick a plan that fits your routine — unlock exclusive discounts, priority bookings and
            concierge perks.
          </p>
        </div>
      </section>
      <MembershipPlans />
    </SiteLayout>
  ),
});
