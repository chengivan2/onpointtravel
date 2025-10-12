import Header from "./rootcomponents/header/Header";
import Main from "./main/Main";
import Footer from "./rootcomponents/footer/Footer";
import FooterBefore from "./rootcomponents/footerbefore/FooterBefore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OnPoint Travel",
  description: "Book trips with onPoint Travel",
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
