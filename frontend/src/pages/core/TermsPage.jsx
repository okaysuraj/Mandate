import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased">
      <Navbar variant="landing" />

      <main className="flex-1 pt-[90px] pb-16 px-lg max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <span className="font-label-caps text-label-caps text-primary">TERMS &amp; CONDITIONS</span>
          <h1 className="font-headline-lg text-4xl font-bold mt-2 mb-4">Terms of Service</h1>
          <p className="text-on-surface-variant font-body-md">Last updated: July 21, 2026</p>
        </div>

        <div className="space-y-8 font-body-md text-on-surface-variant leading-relaxed">
          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Mandate, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
            </p>
          </section>

          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">2. User Accounts &amp; Workspaces</h2>
            <p className="mb-3">
              You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Workspace owners are responsible for managing workspace member roles and permissions.</li>
              <li>You must immediately notify us of any unauthorized use of your account.</li>
            </ul>
          </section>

          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">3. Acceptable Use</h2>
            <p>
              You agree not to misuse the Mandate platform, attempt to gain unauthorized access to other workspaces, or execute actions that degrade platform availability for other users.
            </p>
          </section>

          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">4. Limitation of Liability</h2>
            <p>
              Mandate is provided "as is" without warranty of any kind. We are not liable for any indirect or consequential damages arising out of your use of the service.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
