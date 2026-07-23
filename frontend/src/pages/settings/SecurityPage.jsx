import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const SecurityPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased">
      <Navbar variant="landing" />

      <main className="flex-1 pt-[90px] pb-16 px-lg max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <span className="font-label-caps text-label-caps text-primary">INFRASTRUCTURE &amp; TRUST</span>
          <h1 className="font-headline-lg text-4xl font-bold mt-2 mb-4">Security &amp; Protection</h1>
          <p className="text-on-surface-variant font-body-md">Last updated: July 21, 2026</p>
        </div>

        <div className="space-y-8 font-body-md text-on-surface-variant leading-relaxed">
          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">1. Authentication &amp; Access Control</h2>
            <p className="mb-3">
              Mandate leverages Firebase Authentication and secure ID token verification on every backend API request.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Stateless token validation using standard OAuth 2.0 / Firebase ID tokens.</li>
              <li>Strict email verification requirements prior to API access.</li>
              <li>Multi-tenant database design with strict workspace isolation.</li>
            </ul>
          </section>

          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">2. Data Encryption</h2>
            <p>
              All network communication between client applications, WebSockets, and backend REST services is encrypted in transit using TLS 1.3. Database storage is encrypted at rest via MongoDB Atlas.
            </p>
          </section>

          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">3. Reporting Vulnerabilities</h2>
            <p>
              If you discover a security vulnerability or bug, please report it responsibly to <a href="mailto:security@mandateapp.com" className="text-primary underline">security@mandateapp.com</a>. We investigate all valid reports promptly.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecurityPage;
