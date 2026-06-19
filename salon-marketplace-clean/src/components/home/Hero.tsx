import { Link } from "@tanstack/react-router";
import { Sparkles, Search, ArrowRight, Brain } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-salon.jpg";

export function Hero({ onAdvisorClick }: { onAdvisorClick: () => void }) {
  const [q, setQ] = useState("");
  return (
    <section className="relative overflow-hidden">
      <img
        src={heroImg}
        alt="Luxury Mumbai salon interior"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.25 0.08 290 / 0.92) 0%, oklch(0.35 0.18 320 / 0.85) 50%, oklch(0.45 0.2 25 / 0.82) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto max-w-3xl text-center text-white animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> Powered by AI Recommendations
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Mumbai's{" "}
            <span className="bg-gradient-to-r from-rose-200 via-amber-200 to-pink-200 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            Beauty Marketplace
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
            Discover top-rated salons, get personalized AI beauty recommendations, and book
            appointments instantly.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `/salons?q=${encodeURIComponent(q)}`;
            }}
            className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-full bg-white p-2 shadow-2xl"
          >
            <Search className="ml-3 h-5 w-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find salons, spas, grooming in Mumbai"
              className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground outline-none sm:text-base"
            />
            <Button
              type="submit"
              className="rounded-full text-white border-0 px-6"
              style={{ background: "var(--gradient-luxury)" }}
            >
              Search
            </Button>
          </form>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/salons">
              <Button
                size="lg"
                className="rounded-full border-0 text-white px-7 shadow-xl hover:opacity-90"
                style={{ background: "var(--gradient-luxury)" }}
              >
                Find Salons <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={onAdvisorClick}
              className="rounded-full border-white/40 bg-white/10 px-7 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
            >
              <Brain className="mr-1 h-4 w-4" /> Try AI Beauty Advisor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
