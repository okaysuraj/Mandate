import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const LegalPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased">
      <Navbar variant="landing" />

      <main className="flex-1 pt-[90px] pb-16 px-lg max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <span className="font-label-caps text-label-caps text-primary">COMPLIANCE &amp; DISCLOSURES</span>
          <h1 className="font-headline-lg text-4xl font-bold mt-2 mb-4">Legal Notice</h1>
          <p className="text-on-surface-variant font-body-md">Last updated: July 21, 2026</p>
        </div>

        <div className="space-y-8 font-body-md text-on-surface-variant leading-relaxed">
          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">1. Intellectual Property</h2>
            <p>
              All trademarks, logos, brand names, software code, and interface designs contained in Mandate are the exclusive intellectual property of Mandate, Inc. Unauthorized copying or redistribution is strictly prohibited.
            </p>
          </section>

          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">2. Copyright Infringement</h2>
            <p>
              We respect the intellectual property rights of others. If you believe any material hosted on Mandate infringes upon your copyright, please notify our legal team with appropriate documentation.
            </p>
          </section>

          <section className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
            <h2 className="text-xl font-bold text-on-surface mb-3">3. Governing Law</h2>
            <p>
              These terms and disclosures shall be governed by and construed in accordance with applicable governing laws without regard to conflict of law principles.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
