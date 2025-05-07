import Header from "../rootcomponents/header/Header";
import Footer from "../rootcomponents/footer/Footer";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome - OnPoint Travel",
  description: "Welcome to OnPoint Travel",
};

export default function WelcomePage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-100">
            Welcome to OnPoint Travel!
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Thank you for signing up! Please check your email to confirm your
            account and complete the sign-up process.
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            If you don’t see the email in your inbox, please check your spam or
            junk folder.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </main>
      <FooterBefore />
      <Footer />
    </>
  );
}