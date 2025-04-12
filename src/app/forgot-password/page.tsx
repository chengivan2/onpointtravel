"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import HeaderLogo from "../rootcomponents/header/Logo";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage("A password reset link has been sent to your email.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-lightmode-auth-bg-color dark:bg-darkmode-auth-bg-color">
      <form
        onSubmit={handleForgotPassword}
        className="bg-lightmode-auth-bg-color dark:bg-darkmode-auth-bg-color m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home">
              <HeaderLogo />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Recover Password
            </h1>
            <p className="text-sm">Enter your email to receive a reset link</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-lightmode-btn-bg-color dark:bg-darkmode-btn-bg-color hover:bg-lightmode-btn-bg-hover-color hover:dark:bg-darkmode-btn-bg-hover-color"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              We'll send you a link to reset your password.
            </p>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Remembered your password?
            <Button asChild variant="link" className="px-2">
              <Link href="/signin">Log in</Link>
            </Button>
          </p>
        </div>
      </form>
    </main>
  );
}
