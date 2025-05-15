"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import HeaderLogo from "../../rootcomponents/header/Logo";

export default function SignUpMain() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        // Redirect to the welcome page after successful sign-up
        router.push("/welcome");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="flex flex-col lg:flex-row min-h-screen mt-16">
        {/* Glass overlay and text/icons for left image (desktop only) */}
        <div className="hidden lg:flex relative min-h-full bg-center bg-cover bg-[url(/images/signup.jpg)] flex-1/2">
          <div className="absolute inset-0 bg-darkmode-bg-color opacity-10 dark:opacity-20"></div>
          {/* Glass and content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <div className="backdrop-blur-lg bg-white/30 dark:bg-green-900/30 border border-green-100/30 dark:border-green-900/30 rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center gap-4 max-w-xs">
              <svg className="w-12 h-12 text-green-500 mb-2" fill="none" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="4" fill="#bbf7d0" />
                <path
                  d="M16 24l6 6 10-10"
                  stroke="#16a34a"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 text-center">
                Create Your Account
              </h2>
              <p className="text-green-700 dark:text-green-300 text-center">
                Sign up to start your journey with OnPoint Travel.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-center bg-cover bg-[url(/images/signin.jpg)] md:bg-none relative min-h-full flex flex-row justify-center items-center flex-1/2">
          <form
            onSubmit={handleSignUp}
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
                <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
                  Create an OnPoint Account
                </h1>
                <p className="text-sm">
                  Welcome! Create an account to begin your adventure
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstname" className="block text-sm">
                      Firstname
                    </Label>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      id="firstname"
                      className="border border-green-300 dark:border-green-700 rounded-md p-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname" className="block text-sm">
                      Lastname
                    </Label>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      id="lastname"
                      className="border border-green-300 dark:border-green-700 rounded-md p-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="block text-sm">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="email"
                    className="border border-green-300 dark:border-green-700 rounded-md p-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pwd" className="text-title text-sm">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer bg-lightmode-btn-bg-color dark:bg-darkmode-bg-color hover:bg-lightmode-btn-bg-hover-color hover:dark:bg-darkmode-btn-bg-hover-color"
                >
                  <span>{loading ? "Signing you up..." : "Continue"}</span>
                </Button>
              </div>
            </div>

            <div className="bg-muted p-3">
              <p className="text-accent-foreground text-center text-sm">
                Have an account?
                <Button asChild variant="link" className="px-2">
                  <Link href="/signin">Sign In</Link>
                </Button>
              </p>
            </div>
          </form>
        </div>

        {/* On mobile, show glass overlay and text/icons below everything else */}
        <div className="lg:hidden w-full flex flex-col items-center mt-8 mb-4 px-4">
          <div className="backdrop-blur-lg bg-white/30 dark:bg-green-900/30 border border-green-100/30 dark:border-green-900/30 rounded-2xl shadow-2xl px-6 py-8 flex flex-col items-center gap-3 max-w-xs">
            <svg className="w-10 h-10 text-green-500 mb-1" fill="none" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="4" fill="#bbf7d0" />
              <path
                d="M16 24l6 6 10-10"
                stroke="#16a34a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-xl font-bold text-green-800 dark:text-green-100 text-center">
              Create Your Account
            </h2>
            <p className="text-green-700 dark:text-green-300 text-center text-sm">
              Sign up to start your journey with OnPoint Travel.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
