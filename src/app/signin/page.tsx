"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from './actions/actions'
import { createClient} from "@/utils/supabase/client";
import { FaGoogle } from "react-icons/fa6";
import Header from "../rootcomponents/header/Header";
import HeaderLogo from "../rootcomponents/header/Logo";

export default function SignInPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  };

  return (
    <main>
      <Header />

      <section className="flex flex-col lg:flex-row mt-16 min-h-screen bg-transparent">
        <div className="hidden lg:flex relative min-h-full bg-center bg-cover bg-[url(/images/signin.jpg)] flex-1/2">
          <div className="absolute inset-0 bg-darkmode-bg-color opacity-10 dark:opacity-20"></div>
        </div>

        <div className="relative min-h-full flex flex-row justify-center items-center flex-2/3">
          <form
            onSubmit={handleSignIn}
            className="bg-lightmode-auth-bg-color dark:bg-darkmode-auth-bg-color m-auto h-fit w-full max-w-sm rounded-[0.85rem] p-0.5 shadow-md"
          >
            <div className="p-8 pb-6">
              <div>
                <Link href="/" aria-label="go home">
                  <HeaderLogo />
                </Link>
                <h1 className="mb-1 mt-4 text-xl font-semibold">
                  Sign In to OnPoint
                </h1>
                <p className="text-sm">Welcome back! Sign in to continue</p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  type="button"
                  className="rounded-full cursor-pointer bg-lightmode-btn-bg-color dark:bg-darkmode-btn-bg-color hover:bg-lightmode-btn-bg-hover-color hover:dark:bg-darkmode-btn-bg-hover-color"
                >
                  <FaGoogle className="text-lightmode-btn-text-color dark:text-darkmode-btn-text-color" />
                  <span className="text-lightmode-btn-text-color dark:text-darkmode-btn-text-color">
                    Continue with Google
                  </span>
                </Button>
              </div>

              <div className="flex items-center my-8">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                <span className="mx-4 text-lightmode-text-color dark:text-darkmode-text-color text-sm">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
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
                  />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pwd" className="text-title text-sm">
                      Password
                    </Label>
                    <Button asChild variant="link" size="sm">
                      <Link
                        href="#"
                        className="link intent-info variant-ghost text-sm"
                      >
                        Forgot your Password ?
                      </Link>
                    </Button>
                  </div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    name="pwd"
                    id="pwd"
                    className="input sz-md variant-mixed"
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <Button
                formAction={login}
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
