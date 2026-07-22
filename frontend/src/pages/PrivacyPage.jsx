import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased">
      <Navbar variant="landing" />

      <main className="flex-1 pt-[90px] pb-16 px-lg max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <span className="font-label-caps text-label-caps text-primary">LEGAL &amp; PRIVACY</span>
          <h1 className="font-headline-lg text-4xl font-bold mt-2 mb-4">Privacy Policy</h1>
          <p className="text-on-surface-variant font-body-md">Last updated: July 21, 2026</p>
        </div>

        <div className="space-y-8 font-body-md text-on-surface-variant leading-relaxed">
          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              We collect information to provide better services to all our users. The types of information we collect include:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Account Information:</strong> Your name, email address, and authentication credentials when you register via email or Firebase Auth.</li>
              <li><strong>Workspace &amp; Task Data:</strong> Tasks, projects, deadlines, and workspace details created within the application.</li>
              <li><strong>Usage Data:</strong> Log data, device information, and interaction metrics to help us optimize performance.</li>
            </ul>
          </section>

          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">2. How We Use Information</h2>
            <p className="mb-3">We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide, maintain, and improve Mandate's features and task management workflows.</li>
              <li>To synchronize real-time updates across your active devices and workspaces.</li>
              <li>To send automated reminders and notifications for upcoming task deadlines.</li>
            </ul>
          </section>

          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">3. Data Security &amp; Sharing</h2>
            <p>
              We do not sell your personal data to third parties. We enforce workspace isolation and industry-standard encryption for data in transit and at rest.
            </p>
          </section>

          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">4. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please contact our team at <a href="mailto:privacy@mandateapp.com" className="text-primary underline">privacy@mandateapp.com</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
