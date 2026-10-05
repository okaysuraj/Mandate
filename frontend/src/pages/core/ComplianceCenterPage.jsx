import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const ComplianceCenterPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6 sm:space-y-8 pb-16 px-4 sm:px-6 md:px-8 py-6 max-w-5xl mx-auto">
        <div className="border-b border-outline-variant/40 pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
              Governance Layer
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
            Compliance Center
          </h1>
          <p className="text-sm text-on-surface-variant max-w-xl mt-1">
            Enterprise telemetric registry and operational oversight for Compliance Center.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-sm font-bold text-on-surface uppercase font-mono tracking-wider">
              OPERATIONAL DIRECTIVES
            </h2>
            <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
              SYNCHRONIZED
            </span>
          </div>
          <div className="space-y-3">
            {['Policy acknowledgements', 'Audit trail', 'Risk controls'].map((item) => (
              <div
                key={item}
                className="p-4 bg-surface-container-low border border-outline-variant/60 rounded-xl flex items-center justify-between text-sm font-medium text-on-surface hover:border-primary/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-base">radio_button_checked</span>
                  <span>{item}</span>
                </div>
                <span className="font-mono text-[10px] uppercase font-bold text-on-surface-variant/70 group-hover:text-primary transition-colors">
                  ACTIVE
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ComplianceCenterPage;
