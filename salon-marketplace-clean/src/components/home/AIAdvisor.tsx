import { forwardRef, useState } from "react";
import { Brain, Loader2, Sparkles, Wand2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import {
  getRecommendations,
  type Budget,
  type HairType,
  type Occasion,
  type Recommendation,
} from "@/lib/aiAdvisor";
import { generateAdvice, type AdvisorResponse } from "@/lib/aiAdvice.functions";

const HAIR: { value: HairType; label: string }[] = [
  { value: "dry", label: "Dry" },
  { value: "oily", label: "Oily" },
  { value: "normal", label: "Normal" },
];
const OCC: { value: Occasion; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "party", label: "Party" },
  { value: "wedding", label: "Wedding" },
];
const BUDG: { value: Budget; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "premium", label: "Premium" },
];

function Chips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                active
                  ? "border-transparent text-white shadow-md"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
              style={active ? { background: "var(--gradient-luxury)" } : undefined}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const AIAdvisor = forwardRef<HTMLDivElement>(function AIAdvisor(_, ref) {
  const [hair, setHair] = useState<HairType>("normal");
  const [occ, setOcc] = useState<Occasion>("daily");
  const [budg, setBudg] = useState<Budget>("medium");
  const [notes, setNotes] = useState("");
  const [recs, setRecs] = useState<Recommendation[] | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const advise = useServerFn(generateAdvice);

  async function onGenerate() {
    setLoading(true);
    setError(null);
    setSummary(null);
    try {
      const result: AdvisorResponse = await advise({
        data: { hair, occasion: occ, budget: budg, notes },
      });
      setRecs(result.recommendations);
      setSummary(result.summary);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(`${msg} Showing offline suggestions instead.`);
      setRecs(getRecommendations(hair, occ, budg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      ref={ref}
      id="ai-advisor"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6"
    >
      <div
        className="overflow-hidden rounded-3xl border border-border p-8 md:p-12"
        style={{
          boxShadow: "var(--shadow-premium)",
          background: "linear-gradient(135deg, oklch(0.98 0.02 320) 0%, oklch(0.97 0.03 280) 100%)",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ background: "var(--gradient-luxury)" }}
            >
              <Brain className="h-3.5 w-3.5" /> AI Beauty Advisor
            </div>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Personalised beauty plans, instantly.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us about your hair, occasion and budget. Our AI matches you with the most-loved
              services across Mumbai's top salons.
            </p>

            <div className="mt-8 space-y-5">
              <Chips label="Hair Type" options={HAIR} value={hair} onChange={setHair} />
              <Chips label="Occasion" options={OCC} value={occ} onChange={setOcc} />
              <Chips label="Budget" options={BUDG} value={budg} onChange={setBudg} />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tell our AI more (optional)
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.slice(0, 280))}
                  placeholder="e.g. I have frizzy color-treated hair and a Bandra brunch on Saturday."
                  rows={3}
                  className="mt-2 w-full resize-none rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
                />
                <div className="mt-1 text-right text-[10px] text-muted-foreground">
                  {notes.length}/280
                </div>
              </div>

              <Button
                onClick={onGenerate}
                disabled={loading}
                size="lg"
                className="mt-2 rounded-full border-0 text-white px-7 shadow-xl hover:opacity-90 disabled:opacity-70"
                style={{ background: "var(--gradient-luxury)" }}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                {loading ? "Consulting AI..." : "Generate AI Recommendation"}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className="rounded-2xl border border-border bg-card p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-primary" /> Your AI recommendations
              </div>
              {error && (
                <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                  {error}
                </div>
              )}
              {summary && (
                <div className="mt-4 rounded-xl border border-border bg-background px-3 py-2 text-sm italic text-foreground">
                  "{summary}"
                </div>
              )}
              {!recs && !loading ? (
                <div className="mt-6 flex h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center text-sm text-muted-foreground">
                  <Brain className="mb-2 h-8 w-8 text-primary/60" />
                  Pick your preferences and tap <br />
                  <strong className="text-foreground">Generate AI Recommendation</strong>
                </div>
              ) : loading && !recs ? (
                <div className="mt-6 flex h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center text-sm text-muted-foreground">
                  <Loader2 className="mb-2 h-8 w-8 animate-spin text-primary" />
                  Crafting your personalised plan...
                </div>
              ) : (
                <div className="mt-5 space-y-3 animate-fade-in">
                  {recs!.map((r: Recommendation, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-2xl"
                        style={{ background: "var(--gradient-luxury)" }}
                      >
                        <span>{r.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{r.title}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{r.description}</div>
                        <div className="mt-1.5 text-xs font-semibold text-primary">
                          {r.estimatedPrice}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
