import Header from "../rootcomponents/header/Header";

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-lightmode-bg-color dark:bg-darkmode-bg-color pt-24 pb-12 px-2">
        <section className="w-full max-w-3xl mx-auto rounded-3xl border border-green-200 dark:border-green-900/40 bg-white/60 dark:bg-green-900/40 backdrop-blur-lg shadow-xl p-8 md:p-12 mt-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-green-800 dark:text-green-100 text-center">Terms &amp; Conditions</h1>
          <div className="prose prose-green dark:prose-invert max-w-none text-base md:text-lg">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using the OnPoint Travel website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
            <h2>2. User Accounts</h2>
            <ul>
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for maintaining the confidentiality of your account and password.</li>
              <li>OnPoint Travel is not liable for any loss or damage arising from your failure to protect your account credentials.</li>
            </ul>
            <h2>3. Bookings &amp; Payments</h2>
            <ul>
              <li>All bookings are subject to availability and confirmation.</li>
              <li>Prices are subject to change without notice until a booking is confirmed.</li>
              <li>Payments must be made in full or as per the agreed payment plan to secure your booking.</li>
            </ul>
            <h2>4. Cancellations &amp; Refunds</h2>
            <ul>
              <li>Cancellations must be made in writing via email or through your account dashboard.</li>
              <li>Refunds are subject to our cancellation policy and may incur fees.</li>
              <li>Some bookings may be non-refundable or partially refundable depending on the provider.</li>
            </ul>
            <h2>5. User Conduct</h2>
            <ul>
              <li>You agree not to use the site for unlawful purposes or to violate any laws or regulations.</li>
              <li>Harassment, abuse, or inappropriate behavior towards staff or other users will not be tolerated.</li>
            </ul>
            <h2>6. Intellectual Property</h2>
            <p>All content, trademarks, and data on this site are the property of OnPoint Travel or its licensors. You may not reproduce, distribute, or use any content without permission.</p>
            <h2>7. Limitation of Liability</h2>
            <p>OnPoint Travel is not liable for any indirect, incidental, or consequential damages arising from your use of our services. Our liability is limited to the amount paid for the booking in question.</p>
            <h2>8. Changes to Terms</h2>
            <p>We reserve the right to update these Terms and Conditions at any time. Continued use of the site constitutes acceptance of the revised terms.</p>
            <h2>9. Contact</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:support@onpointtravel.com">support@onpointtravel.com</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
