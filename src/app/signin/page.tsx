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
  openGraph: {
      title: "Sign In - OnPoint Travel",
      description: "Sign in to your OnPoint Travel account",
      url: "https://onpointtravel.vercel.app/signin",
      siteName: "OnPoint Travel",
      images: [
        {
          url: "https://res.cloudinary.com/doqbnfais/image/upload/v1760291599/onPoint%20website%20concept/OnPoint_logo_multi-use_mh0fmr.png",
        },
      ],
      type: "website",
    },
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
