
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";



export default async function MobileAuthButton() {

  const supabase = await createClient();

  
  const { data: { user } } = await supabase.auth.getUser()



  return user ? (
    <Link
      href="/dashboard"
      className="block px-3 py-2 rounded-md text-base font-medium border
                border-lightmode-secondary-btn-border-color text-lightmode-secondary-btn-text-color
                dark:border-darkmode-secondary-btn-border-color dark:text-darkmode-secondary-btn-text-color
                text-center hover:opacity-90 transition-opacity"
    >
      Dashboard
    </Link>
  ) : (
    <Link
      href="/signin"
      className="block px-3 py-2 rounded-md text-base font-medium border
                border-lightmode-secondary-btn-border-color text-lightmode-secondary-btn-text-color
                dark:border-darkmode-secondary-btn-border-color dark:text-darkmode-secondary-btn-text-color
                text-center hover:opacity-90 transition-opacity"
    >
      Sign In
    </Link>
  );
}