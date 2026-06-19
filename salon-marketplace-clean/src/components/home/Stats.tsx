import { useEffect, useRef, useState } from "react";
import { Building2, CalendarCheck, Users, Star } from "lucide-react";

const STATS = [
  { value: 500, suffix: "+", label: "Partner Salons", icon: Building2 },
  { value: 25000, suffix: "+", label: "Bookings", icon: CalendarCheck },
  { value: 10000, suffix: "+", label: "Happy Customers", icon: Users },
  { value: 4.8, suffix: "", label: "Average Rating", icon: Star, decimals: 1 },
];

function useCountUp(target: number, start: boolean, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const duration = 1600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start]);
  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-IN");
}

function StatCard({ stat, start }: { stat: (typeof STATS)[number]; start: boolean }) {
  const display = useCountUp(stat.value, start, stat.decimals ?? 0);
  const Icon = stat.icon;
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1"
      style={{ boxShadow: "var(--shadow-premium)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: "var(--gradient-luxury)" }}
      />
      <div
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-white"
        style={{ background: "var(--gradient-luxury)" }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
        {display}
        <span className="bg-gradient-to-r from-rose-500 to-violet-500 bg-clip-text text-transparent">
          {stat.suffix}
        </span>
      </div>
      <div className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</div>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), {
      threshold: 0.2,
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} stat={s} start={visible} />
        ))}
      </div>
    </section>
  );
}
