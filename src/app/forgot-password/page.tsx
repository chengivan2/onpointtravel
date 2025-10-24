"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import HeaderLogo from "../rootcomponents/header/Logo";
import Header from "../rootcomponents/header/Header";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import Footer from "../rootcomponents/footer/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Forgot Password - OnPoint Travel",
  description: "Reset your password for OnPoint Travel",
  openGraph: {
    title: "Forgot Password - OnPoint Travel",
    description: "Reset your password for OnPoint Travel",
    url: "https://onpointtravel.com/forgot-password",
    images: [
      {
        url: "https://res.cloudinary.com/doqbnfais/image/upload/v1760291599/onPoint%20website%20concept/OnPoint_logo_multi-use_mh0fmr.png",
      },
    ],
  },
};

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
      setMessage("Please check your email inbox for the password reset link.");
    }
  };

  return (
    <>
      <Header />
      <main className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleForgotPassword}
          className="bg-lightmode-auth-bg-color dark:bg-darkmode-auth-bg-color m-auto h-fit w-full max-w-sm overflow-hidden rounded-lg border shadow-md shadow-zinc-950/5"
        >
          <div className="-m-px rounded-lg] border p-8 pb-6">
            <div>
              <Link href="/" aria-label="go home">
                <HeaderLogo />
              </Link>
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Recover Password
              </h1>
              <p className="text-sm">
                Enter your email to receive a reset link
              </p>
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
      <FooterBefore />
      <Footer />
    </>
  );
}
