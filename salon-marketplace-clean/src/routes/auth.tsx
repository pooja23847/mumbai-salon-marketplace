import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — SalonHub" }] }),
  component: AuthPage,
});

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function validatePassword(password: string, email: string, name: string) {
  const lowerPassword = password.toLowerCase();
  const emailName = email.split("@")[0]?.toLowerCase() ?? "";
  const normalizedName = name.toLowerCase().replace(/\s+/g, "");
  const hasPersonalInfo =
    (emailName.length >= 3 && lowerPassword.includes(emailName)) ||
    (normalizedName.length >= 3 && lowerPassword.includes(normalizedName));

  if (password.length < 10) return "Use at least 10 characters.";
  if (!/[a-z]/.test(password)) return "Add at least one lowercase letter.";
  if (!/[A-Z]/.test(password)) return "Add at least one uppercase letter.";
  if (!/\d/.test(password)) return "Add at least one number.";
  if (!/[^A-Za-z0-9]/.test(password)) return "Add at least one symbol, like @, #, or !.";
  if (hasPersonalInfo) return "Do not include your name or email in the password.";

  return null;
}

function getFriendlyAuthError(error: unknown) {
  const message = getErrorMessage(error, "Something went wrong");
  if (message.toLowerCase().includes("password is known to be weak")) {
    return "This password is too common. Try a unique one, like Beauty#8492Moon.";
  }

  return message;
}

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/my-bookings" });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setNotice(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const passwordError = validatePassword(password, email, name);
        if (passwordError) throw new Error(passwordError);

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;

        if (data.user && data.user.identities?.length === 0) {
          setErr("An account already exists for this email. Please sign in instead.");
          setMode("signin");
          return;
        }

        if (data.session) {
          navigate({ to: "/my-bookings" });
          return;
        }

        setNotice(
          "Account created. Please check your email and confirm your account, then sign in.",
        );
        setMode("signin");
        setPassword("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/my-bookings" });
      }
    } catch (e: unknown) {
      setErr(getFriendlyAuthError(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteLayout>
      <div className="mx-auto flex max-w-md flex-col px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="flex items-center gap-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
              style={{ background: "var(--gradient-luxury)" }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {mode === "signin" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="text-xs text-muted-foreground">Save bookings & track appointments</p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-3">
            {mode === "signup" && (
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
              />
            )}
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
            />
            <input
              required
              type="password"
              minLength={10}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
            />
            {mode === "signup" && (
              <p className="px-1 text-xs text-muted-foreground">
                Use 10+ characters with uppercase, lowercase, number, and symbol. Avoid your name or
                email.
              </p>
            )}
            {err && (
              <div className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {err}
              </div>
            )}
            {notice && (
              <div className="rounded-md bg-primary/10 px-3 py-2 text-xs text-primary">
                {notice}
              </div>
            )}
            <Button
              type="submit"
              disabled={busy}
              className="w-full rounded-full text-white border-0 py-5 shadow-md"
              style={{ background: "var(--gradient-primary)" }}
            >
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setErr(null);
                setNotice(null);
                setMode(mode === "signin" ? "signup" : "signin");
              }}
              className="font-semibold text-primary hover:underline"
            >
              {mode === "signin" ? "Create account" : "Sign in"}
            </button>
          </div>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
