import Header from "../rootcomponents/header/Header";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import Footer from "../rootcomponents/footer/Footer";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - OnPoint Travel",
  description: "Recover your password",
  openGraph: {
    title: "Forgot Password - OnPoint Travel",
    description: "Recover your password",
    url: "https://onpointtravel.vercel.app/forgot-password",
    siteName: "OnPoint Travel",
    images: [
      {
        url: "https://res.cloudinary.com/doqbnfais/image/upload/v1760291599/onPoint%20website%20concept/OnPoint_logo_multi-use_mh0fmr.png",
      },
    ],
    type: "website",
  },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center min-h-screen">
        <ForgotPasswordForm />
      </main>
      <FooterBefore />
      <Footer />
    </>
  );
}
