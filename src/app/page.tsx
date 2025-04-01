import Header from "./rootcomponents/header/HomeHeader";
import Main from "./main/Main";
import Footer from "./rootcomponents/footer/Footer";
import FooterBefore from "./rootcomponents/footerbefore/FooterBefore";

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
