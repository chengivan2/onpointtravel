import Header from "./rootcomponents/header/Header";
import Main from "./main/Main";
import Footer from "./rootcomponents/footer/Footer";
import FooterBefore from "./rootcomponents/footerbefore/FooterBefore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OnPoint Travel",
  description: "Book trips with onPoint Travel",
  openGraph: {
    title: "OnPoint Travel",
    description: "Book trips with onPoint Travel",
    url: "https://onpointtravel.vercel.app",
    siteName: "OnPoint Travel",
    images: [
      {
        url: "https://res.cloudinary.com/doqbnfais/image/upload/v1760291599/onPoint%20website%20concept/OnPoint_logo_multi-use_mh0fmr.png",
        width: 800,
        height: 600,
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
      <FooterBefore />
      <Footer />
    </>
  );
}
