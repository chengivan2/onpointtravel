import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function FooterSubscribe() {
  return (
    <form className="mt-12 w-full max-w-xs">
      <div className="space-y-2.5">
        <Label className="block text-sm font-medium" htmlFor="email">
          Subscribe to our newsletter
        </Label>
        <Input
          className="input variant-mixed sz-md"
          placeholder="Your email"
          type="email"
          id="email"
          required
          name="email"
        />
      </div>
      <Button type="submit" className="mt-3">
        <span>Subscribe</span>
      </Button>
    </form>
  );
}
