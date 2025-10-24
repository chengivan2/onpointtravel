"use client";

import { FaEnvelope, FaLocationPin, FaPhone } from "react-icons/fa6";
import Header from "../rootcomponents/header/Header";
import LogoSeparator from "../main/separator/LogoSeparator";
import FooterBefore from "../rootcomponents/footerbefore/FooterBefore";
import Footer from "../rootcomponents/footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - OnPoint Travel",
  description: "Explore and book your next adventure with OnPoint Travel",
  openGraph: {
    title: "About Us - OnPoint Travel",
    description: "Learn more about OnPoint Travel and our mission.",
    url: "https://onpointtravel.com/about",
    images: [
      {
        url: "https://res.cloudinary.com/doqbnfais/image/upload/v1760291599/onPoint%20website%20concept/OnPoint_logo_multi-use_mh0fmr.png",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-gray-100 dark:bg-green-900/20">
        {/* Hero Section */}
        <section className="relative mt-16 flex items-center justify-center h-[60vh] bg-[url(https://res.cloudinary.com/doqbnfais/image/upload/v1745946843/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/herobgimage_ec9u8h.jpg)] bg-cover bg-top">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold">About Us</h1>
            <p className="mt-4 text-lg md:text-xl">
              Discover who we are and what drives us.
            </p>
          </div>
        </section>

        {/* Vision and Mission Section */}
        <section className="py-12 md:py-24 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="relative bg-white/30 dark:bg-green-900/30 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-100">
                Our Vision
              </h2>
              <p className="mt-4 text-green-600">
                To be the leading travel agency, inspiring people to explore the
                world and create unforgettable memories.
              </p>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg
                  className="w-32 h-32 opacity-10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v10m0 0l3-3m-3 3l-3-3"
                  />
                </svg>
              </div>
            </div>

            {/* Mission */}
            <div className="relative bg-white/30 dark:bg-green-900/30 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-100">
                Our Mission
              </h2>
              <p className="mt-4 text-green-600">
                To provide exceptional travel experiences by offering
                personalized services, innovative solutions, and a commitment to
                excellence.
              </p>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg
                  className="w-32 h-32 opacity-10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v10m0 0l3-3m-3 3l-3-3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <LogoSeparator />

        {/* Contact Section */}
        <section className="py-12 md:py-24 px-6">
          <div className="max-w-3xl mx-auto bg-white/30 dark:bg-green-900/30 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 text-center">
              Contact Us
            </h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <FaPhone size={24} />
                <p className="text-green-600">
                  +1 234 567 890
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope size={24} />
                <p className="text-green-600">
                  contact@onpointtravel.com
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FaLocationPin size={24} />
                <p className="text-green-600">
                  123 Travel Lane, Wanderlust City
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterBefore />
      <Footer />
    </>
  );
}
