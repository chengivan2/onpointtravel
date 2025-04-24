import Header from "../rootcomponents/header/Header";
import Main from "./components/Main";
import Footer from "../rootcomponents/footer/Footer";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import { Metadata } from "next";
import OnPointFAQs from "./components/faqs/OnPointFAQs";

export const metadata: Metadata = {
    title: "Contact OnPoint Travel",
    description: "Contact us through the channels on this page or reach out to our suport team through the contact form",
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
