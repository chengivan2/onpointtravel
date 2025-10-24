import Header from "../rootcomponents/header/Header";
import Main from "./components/Main";
import Footer from "../rootcomponents/footer/Footer";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import { Metadata } from "next";
import OnPointFAQs from "./components/faqs/OnPointFAQs";

export const metadata: Metadata = {
    title: "Contact OnPoint Travel",
    description: "Contact us through this page for any inquiries or support.",
    openGraph: {
      title: "Contact OnPoint Travel",
      description: "Get in touch with OnPoint Travel for assistance.",
      url: "https://onpointtravel.vercel.app/contact",
      siteName: "OnPoint Travel",
      images: [
        {
          url: "https://res.cloudinary.com/doqbnfais/image/upload/v1760291599/onPoint%20website%20concept/OnPoint_logo_multi-use_mh0fmr.png",
        },
      ],
      type: "website",
    },
  };

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <OnPointFAQs />
      <FooterBefore />
      <Footer />
    </>
  );
}
