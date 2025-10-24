import Header from "../rootcomponents/header/Header";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import Footer from "../rootcomponents/footer/Footer";
import ResetPasswordForm from "./components/ResetPassForm";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Reset Password - OnPoint Travel",
  description: "Reset your password for OnPoint Travel",
  openGraph: {
    title: "Reset Password - OnPoint Travel",
    description: "Reset your password for OnPoint Travel",
    url: "https://onpointtravel.com/reset-password",
    images: [
      {
        url: "https://res.cloudinary.com/doqbnfais/image/upload/v1760291599/onPoint%20website%20concept/OnPoint_logo_multi-use_mh0fmr.png",
      },
    ],
  },
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
