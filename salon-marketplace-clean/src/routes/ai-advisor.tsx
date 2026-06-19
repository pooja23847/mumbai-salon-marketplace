import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { AIAdvisor } from "@/components/home/AIAdvisor";

export const Route = createFileRoute("/ai-advisor")({
  head: () => ({
    meta: [
      { title: "AI Beauty Advisor — SalonHub Mumbai" },
      {
        name: "description",
        content:
          "Get personalised salon service recommendations based on your hair type, occasion and budget.",
      },
      { property: "og:title", content: "AI Beauty Advisor — SalonHub Mumbai" },
      { property: "og:description", content: "Personalised beauty plans, instantly." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <div className="pt-6">
        <AIAdvisor />
      </div>
    </SiteLayout>
  ),
});
