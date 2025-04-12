import Header from "../rootcomponents/header/Header";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import Footer from "../rootcomponents/footer/Footer";
import ResetPasswordForm from "./components/ResetPassForm";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Sign In - OnPoint",
  description: "Sign in to manage your OnPoint account",
};

export default async function ResetPasswordPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }
  return (
    <>
      <Header />
      <main className="flex items-center justify-center min-h-screen">
        <ResetPasswordForm />
      </main>
      <FooterBefore />
      <Footer />
    </>
  );
}
