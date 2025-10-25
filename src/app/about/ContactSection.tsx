"use client";

import { FaEnvelope, FaLocationPin, FaPhone } from "react-icons/fa6";

export default function ContactSection() {
  return (
    <section className="py-12 md:py-24 px-6">
      <div className="max-w-3xl mx-auto bg-white/30 dark:bg-green-900/30 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 text-center">
          Contact Us
        </h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-4">
            <FaPhone size={24} />
            <p className="text-green-600">+1 234 567 890</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope size={24} />
            <p className="text-green-600">contact@onpointtravel.com</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaLocationPin size={24} />
            <p className="text-green-600">123 Travel Lane, Wanderlust City</p>
          </div>
        </div>
      </div>
    </section>
  );
}
