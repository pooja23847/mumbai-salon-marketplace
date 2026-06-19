import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  MessageCircle,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Brain,
  CalendarCheck,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/use-auth";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
              style={{ background: "var(--gradient-luxury)" }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-bold text-foreground">SalonHub</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Mumbai
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              Home
            </Link>
            <Link
              to="/salons"
              className="text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              Explore
            </Link>
            <Link
              to="/ai-advisor"
              className="inline-flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              <Brain className="h-4 w-4" /> AI Advisor
            </Link>
            <Link
              to="/gallery"
              className="text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              Lookbook
            </Link>
            <Link
              to="/memberships"
              className="text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              Memberships
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <Link to="/my-bookings">
                <Button variant="outline" className="rounded-full gap-1.5">
                  <CalendarCheck className="h-4 w-4" /> My Bookings
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="rounded-full hidden sm:inline-flex">
                  Sign in
                </Button>
              </Link>
            )}
            <Link to="/salons">
              <Button
                className="rounded-full text-white border-0 shadow-md hover:opacity-90"
                style={{ background: "var(--gradient-luxury)" }}
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                  style={{ background: "var(--gradient-luxury)" }}
                >
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="font-bold text-foreground">SalonHub Mumbai</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Mumbai's AI-powered beauty marketplace. Discover, compare and book instantly.
              </p>
              <div className="mt-4 flex gap-2">
                {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">About</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/ai-advisor" className="hover:text-primary">
                    AI Advisor
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-primary">
                    Style Lookbook
                  </Link>
                </li>
                <li>
                  <Link to="/memberships" className="hover:text-primary">
                    Memberships
                  </Link>
                </li>
                <li>
                  <Link to="/salons" className="hover:text-primary">
                    Explore Salons
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Services</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/salons"
                    search={{ category: "haircut" } as never}
                    className="hover:text-primary"
                  >
                    Haircut
                  </Link>
                </li>
                <li>
                  <Link
                    to="/salons"
                    search={{ category: "bridal" } as never}
                    className="hover:text-primary"
                  >
                    Bridal
                  </Link>
                </li>
                <li>
                  <Link
                    to="/salons"
                    search={{ category: "spa" } as never}
                    className="hover:text-primary"
                  >
                    Spa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/salons"
                    search={{ category: "grooming" } as never}
                    className="hover:text-primary"
                  >
                    Grooming
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Contact</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>hello@salonhub.app</li>
                <li>+91 98765 43210</li>
                <li>Bandra Kurla Complex, Mumbai</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <div>© {new Date().getFullYear()} SalonHub Mumbai. All rights reserved.</div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-semibold text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Built for AI Startup Buildathon
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot button */}
      <button
        onClick={() => setChatOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105"
        style={{ background: "var(--gradient-luxury)" }}
      >
        <MessageCircle className="h-5 w-5" />
        Ask Salon Assistant
      </button>
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="px-4 py-3 text-white" style={{ background: "var(--gradient-luxury)" }}>
            <div className="font-semibold">Salon Assistant</div>
            <div className="text-xs opacity-90">Online · ready to help</div>
          </div>
          <div className="space-y-3 p-4 text-sm">
            <div className="rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 text-foreground">
              Hi! 👋 I can help you find the perfect salon in Mumbai. What are you looking for?
            </div>
            <div className="flex flex-wrap gap-2">
              {["Haircut", "Bridal", "Spa", "Grooming"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
            <input
              placeholder="Type a message..."
              className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}
