import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const LockInPage = () => {
  const items = [
    { title: 'Review operational cost run-rate', desc: 'Audit AWS compute and database IOPS usage across clusters', status: 'LOCKED_IN' },
    { title: 'Prepare engineering sprint handoff', desc: 'Package telemetry specs and endpoint documentation', status: 'IN_FLIGHT' },
    { title: 'Broadcast milestone status update', desc: 'Sync progress summary with workspace leads', status: 'PENDING' }
  ];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 py-6 space-y-6 pb-20">
        <div className="border-b border-outline-variant pb-5">
          <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-1">Execution Layer</p>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Lock In Mode</h1>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">High-focus delivery sprint and commitment queue.</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase text-on-surface-variant tracking-wider">Current Commitments</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div 
                key={item.title} 
                className="bg-surface-container/60 hover:bg-surface-container border border-outline-variant p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div>
                  <h3 className="font-mono text-sm font-bold text-on-surface">{item.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider self-start sm:self-auto ${
                  item.status === 'LOCKED_IN' 
                    ? 'bg-tertiary-container text-on-tertiary-container border border-outline-variant' 
                    : item.status === 'IN_FLIGHT'
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'bg-surface-container text-on-surface-variant border border-outline-variant'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LockInPage;
