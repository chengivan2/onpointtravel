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
        url: "https://onpoint-travel.vercel.app/og-image.png",
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
