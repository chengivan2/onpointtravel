import Header from "../rootcomponents/header/Header";
import Main from "./components/Main";
import Footer from "../rootcomponents/footer/Footer";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";

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
