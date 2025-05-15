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
        {/* Glass overlay and text/icons for left image (desktop only) */}
        <div className="hidden lg:flex relative min-h-full bg-center bg-cover bg-[url(/images/signin.jpg)] flex-1/2">
          <div className="absolute inset-0 bg-darkmode-bg-color opacity-10 dark:opacity-20"></div>
          {/* Glass overlays with benefits/info */}
          <div className="absolute top-10 left-10 flex flex-col gap-6 z-20">
            <div className="backdrop-blur-lg bg-white/40 dark:bg-green-900/40 border border-green-100/40 dark:border-green-900/40 rounded-xl shadow-xl px-6 py-4 flex items-center gap-3 min-w-[220px]">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" fill="#bbf7d0" />
                <path
                  d="M8 12l2 2 4-4"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <div className="font-semibold text-green-800 dark:text-green-100">
                  Game Drives Available
                </div>
                <div className="text-green-700 dark:text-green-300 text-sm">
                  Experience the wild up close
                </div>
              </div>
            </div>
            <div className="backdrop-blur-lg bg-white/40 dark:bg-green-900/40 border border-green-100/40 dark:border-green-900/40 rounded-xl shadow-xl px-6 py-4 flex items-center gap-3 min-w-[220px]">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" fill="#bbf7d0" />
                <path
                  d="M12 8v4l3 3"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <div className="font-semibold text-green-800 dark:text-green-100">
                  Flexible Payment
                </div>
                <div className="text-green-700 dark:text-green-300 text-sm">
                  Pay in installments
                </div>
              </div>
            </div>
          </div>
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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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

            <div className="border-t p-3">
              <p className="text-center text-sm">
                Don't have an account?
                <Button asChild variant="link" className="px-2">
                  <Link href="/signup">Create account</Link>
                </Button>
              </p>
            </div>
          </form>
        </div>

        {/* On mobile, show glass overlay and text/icons below everything else */}
        <div className="lg:hidden w-full flex flex-col items-center mt-8 mb-4 px-4">
          <div className="backdrop-blur-lg bg-white/30 dark:bg-green-900/30 border border-green-100/30 dark:border-green-900/30 rounded-2xl shadow-2xl px-6 py-8 flex flex-col items-center gap-3 max-w-xs">
            <svg
              className="w-10 h-10 text-green-500 mb-1"
              fill="none"
              viewBox="0 0 48 48"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="currentColor"
                strokeWidth="4"
                fill="#bbf7d0"
              />
              <path
                d="M16 24l6 6 10-10"
                stroke="#16a34a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-xl font-bold text-green-800 dark:text-green-100 text-center">
              Welcome Back!
            </h2>
            <p className="text-green-700 dark:text-green-300 text-center text-sm">
              Sign in to access your dashboard, manage trips, and more.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
