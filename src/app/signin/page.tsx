import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Header from "../rootcomponents/header/Header";
import SignInMain from "./components/SignInMain";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import Footer from "../rootcomponents/footer/Footer";

export const metadata: Metadata = {
  title: "Sign In - OnPoint",
  description: "Sign in to manage your OnPoint account",
};

export default async function SignInPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      <Header />
      <SignInMain />
      <FooterBefore />
      <Footer />
    </>
  );
}
