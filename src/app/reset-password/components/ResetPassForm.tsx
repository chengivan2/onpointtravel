"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ResetPasswordForm() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const accessToken = searchParams.get("access_token");
    if (!accessToken) {
      setError("Invalid or missing reset token.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        "Your password has been reset successfully. You will be redirected shortly."
      );
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <form
        onSubmit={handleResetPassword}
        className="bg-lightmode-auth-bg-color dark:bg-darkmode-auth-bg-color m-auto h-fit w-full max-w-sm rounded-[0.8rem] p-6 shadow-md"
      >
        <h1 className="text-title mb-4 text-xl font-semibold text-center">
          Reset Password
        </h1>
        <p className="text-sm text-center mb-6">
          Enter your new password below.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="block text-sm">
              New Password
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your new password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="block text-sm">
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your new password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="cursor-pointer text-[#F5F5F5] w-full bg-lightmode-btn-bg-color dark:bg-darkmode-btn-bg-color hover:bg-lightmode-btn-bg-hover-color hover:dark:bg-darkmode-btn-bg-hover-color"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </Suspense>
  );
}
