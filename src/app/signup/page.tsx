import Header from "../rootcomponents/header/Header";
import { Metadata } from "next";
import SignUpMain from "./components/SignUpMain";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import Footer from "../rootcomponents/footer/Footer";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up - OnPoint",
  description: "Sign up to get great discounts from OnPoint",
};

export default async function SignUpPage() {
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
      <SignUpMain />
      <FooterBefore />
      <Footer />
    </>
  );
}
