import Header from "../rootcomponents/header/Header";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-lightmode-bg-color dark:bg-darkmode-bg-color pt-24 pb-12 px-2">
        <section className="w-full max-w-3xl mx-auto rounded-3xl border border-green-200 dark:border-green-900/40 bg-gradient-to-br from-white/70 via-green-100/60 to-green-200/40 dark:from-green-900/60 dark:via-green-900/40 dark:to-green-800/30 backdrop-blur-lg shadow-xl p-8 md:p-12 mt-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-green-800 dark:text-green-100 text-center">Privacy Policy</h1>
          <div className="prose prose-green dark:prose-invert max-w-none text-base md:text-lg">
            <h2>1. Introduction</h2>
            <p>OnPoint Travel is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.</p>
            <h2>2. Information We Collect</h2>
            <ul>
              <li>Personal information you provide when creating an account or booking a trip (e.g., name, email, contact details).</li>
              <li>Payment and billing information for processing transactions.</li>
              <li>Usage data such as IP address, browser type, and pages visited.</li>
            </ul>
            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To provide and manage your bookings and account.</li>
              <li>To communicate with you about your trips, updates, and offers.</li>
              <li>To improve our website, services, and user experience.</li>
              <li>To comply with legal obligations and prevent fraud.</li>
            </ul>
            <h2>4. Sharing Your Information</h2>
            <ul>
              <li>We do not sell your personal information.</li>
              <li>We may share your data with trusted partners and service providers as necessary to fulfill your bookings.</li>
              <li>We may disclose information if required by law or to protect our rights and users.</li>
            </ul>
            <h2>5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
            <h2>6. Cookies & Tracking</h2>
            <p>We use cookies and similar technologies to enhance your experience and analyze site usage. You can manage cookie preferences in your browser settings.</p>
            <h2>7. Your Rights</h2>
            <ul>
              <li>You may access, update, or delete your personal information at any time through your account settings.</li>
              <li>You may opt out of marketing communications at any time.</li>
            </ul>
            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website.</p>
            <h2>9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@onpointtravel.com">support@onpointtravel.com</a>.</p>
          </div>
        </section>
      </main>
    </>
  );
}
