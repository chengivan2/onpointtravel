"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import HeaderLogo from "@/app/rootcomponents/header/Logo";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SignInMain() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      redirect("/dashboard");
    } else {
      setError("Invalid email or password.");
      alert("Invalid email or password.");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <main>
      <section className="flex flex-col md:flex-row mt-16 min-h-screen bg-transparent">
        <div className="hidden lg:flex relative min-h-full bg-center bg-cover bg-[url(/images/signin.jpg)] flex-1/2">
          <div className="absolute inset-0 bg-darkmode-bg-color opacity-10 dark:opacity-20"></div>
        </div>

        <div className="bg-center bg-cover bg-[url(/images/signin.jpg)] md:bg-none relative min-h-full flex flex-row justify-center items-center flex-2/3">
          <form
            onSubmit={handleSignIn}
            className="relative backdrop-blur-lg bg-white/40 dark:bg-green-900/30 border border-green-100/30 dark:border-green-900/30 shadow-xl rounded-2xl m-auto h-fit w-full max-w-sm p-0.5 overflow-hidden"
          >
            {/* SVG background shapes */}
            <svg
              className="absolute -top-10 -right-10 w-64 h-64 opacity-10 text-green-300 pointer-events-none z-0"
              fill="none"
              viewBox="0 0 200 200"
            >
              <circle cx="100" cy="100" r="100" fill="currentColor" />
            </svg>
            <svg
              className="absolute bottom-0 left-0 w-40 h-40 opacity-10 text-green-200 pointer-events-none z-0"
              fill="none"
              viewBox="0 0 160 160"
            >
              <circle cx="80" cy="80" r="80" fill="currentColor" />
            </svg>
            <div className="relative z-10 p-8 pb-6">
              <div>
                <Link href="/" aria-label="go home">
                  <HeaderLogo />
                </Link>
                <h1 className="mb-1 mt-4 text-xl font-semibold">
                  Sign In to OnPoint
                </h1>
                <p className="text-sm">Welcome back! Sign in to continue</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="block text-sm">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    name="email"
                    id="email"
                    className="border border-green-300 dark:border-green-700 rounded-md p-2"
                  />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pwd" className="text-title text-sm">
                      Password
                    </Label>
                    <Button asChild variant="link" size="sm">
                      <Link
                        href="/forgot-password"
                        className="link intent-info variant-ghost text-sm"
                      >
                        Forgot your Password ?
                      </Link>
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      name="pwd"
                      id="pwd"
                      className="border border-green-300 dark:border-green-700 rounded-md p-2 pr-10"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-green-700 dark:text-green-300"
                      tabIndex={0}
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <Button
                  className="w-full cursor-pointer bg-lightmode-btn-bg-color dark:bg-darkmode-btn-bg-color hover:bg-lightmode-btn-bg-hover-color hover:dark:bg-darkmode-btn-bg-hover-color"
                  type="submit"
                  disabled={loading}
                >
                  <span className="text-lightmode-btn-text-color dark:text-darkmode-btn-text-color">
                    {loading ? "Signing you in..." : "Sign In"}
                  </span>
                </Button>
              </div>
            </div>

            <div className="bg-muted rounded-(--radius) p-3">
              <p className="text-accent-foreground text-center text-sm">
                Don't have an account?
                <Button asChild variant="link" className="px-2">
                  <Link href="/signup">Create account</Link>
                </Button>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
