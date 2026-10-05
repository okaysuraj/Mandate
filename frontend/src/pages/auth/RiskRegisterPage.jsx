import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const RiskRegisterPage = () => {
  const risks = [
    { title: 'Third-party API latency spike', desc: 'Upstream vendor degradation impacting automated dispatch', severity: 'HIGH', status: 'MITIGATION_ACTIVE' },
    { title: 'Sprint capacity deficit', desc: 'Two engineers on medical leave during critical milestone', severity: 'MEDIUM', status: 'REALLOCATING' },
    { title: 'Database IOPS saturation risk', desc: 'Approaching 80% sustained provisioned throughput threshold', severity: 'LOW', status: 'MONITORED' }
  ];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 py-6 space-y-6 pb-20">
        <div className="border-b border-outline-variant pb-5">
          <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-1">Governance Layer</p>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Risk Register</h1>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">Operational threat modeling and mitigation tracking.</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase text-on-surface-variant tracking-wider">Monitored Anomalies</h2>
          <div className="space-y-3">
            {risks.map((item) => (
              <div 
                key={item.title} 
                className="bg-surface-container/60 hover:bg-surface-container border border-outline-variant p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-sm font-bold text-on-surface">{item.title}</h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                      item.severity === 'HIGH' 
                        ? 'bg-error/10 text-error border-error/20' 
                        : item.severity === 'MEDIUM' 
                        ? 'bg-primary/10 text-primary border-primary/20' 
                        : 'bg-surface-container text-on-surface-variant border-outline-variant'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-lg border border-outline-variant self-start sm:self-auto">
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

export default RiskRegisterPage;
