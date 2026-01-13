"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { FiLogIn, FiUser } from "react-icons/fi";

export default function HeaderAuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  return user ? (
    <Link
      href="/dashboard"
      className="px-4 flex flex-row gap-[0.8rem] border border-green-500 justify-center items-center py-2 rounded-full text-sm font-medium text-lightmode-secondary-btn-text-color hover:bg-lightmode-secondary-btn-bg-hover-color hover:text-lightmode-secondary-btn-text-hover-color dark:border-darkmode-secondary-btn-border-color dark:text-darkmode-secondary-btn-text-color dark:hover:bg-darkmode-secondary-btn-bg-hover-color dark:hover:text-darkmode-secondary-btn-text-hover-color dark:hover:border-darkmode-secondary-btn-border-hover-color transition-colors focus:outline-none min-w-full lg:min-w-auto"
    >
      <FiUser size="18" className="hidden hover:flex" />
      Dashboard
    </Link>
  ) : (
    <Link
      href="/signin"
      className="px-4 flex flex-row gap-[0.8rem] justify-center items-center py-2 rounded-full text-sm font-medium border-none bg-transparent border-lightmode-btn-border-color hover:bg-lightmode-btn-bg-hover-color dark:hover:bg-darkmode-btn-bg-hover-color transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightmode-heading-color dark:focus:ring-darkmode-heading-color focus:ring-offset-lightmode-header-bg-color dark:focus:ring-offset-darkmode-header-bg-color min-w-full lg:min-w-auto"
    >
      <FiLogIn size="18" className="hidden hover:flex" />
      <span className="text-[#0D0D0D] dark:text-[#F5F5F5] hover:text-[#F5F5F5] dark:hover:text-[#0D0D0D]">Sign in</span>
    </Link>
  );
}
