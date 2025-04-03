import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function FooterSubscribe() {
  return (
    <form className="min-w-full mt-12">
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
      <Button type="submit" className="cursor-pointer mt-3 bg-lightmode-btn-bg-color dark:bg-green-900 w-[50%] hover:bg-lightmode-btn-bg-color/80 dark:hover:bg-green-800 text-lightmode-btn-text-color rounded-lg py-2 px-4 transition-colors duration-300">
        <span>Subscribe</span>
      </Button>
    </form>
  );
}
