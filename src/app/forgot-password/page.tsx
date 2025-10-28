import Header from "../rootcomponents/header/Header";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import Footer from "../rootcomponents/footer/Footer";
import ForgotPasswordForm from "./ForgotPasswordForm";

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
