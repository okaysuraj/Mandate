import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const PermissionsPage = () => {
  const roles = [
    { role: 'Owner', desc: 'Full root access to billing, project administration, and system governance', users: '1 Member', badge: 'ROOT_ACCESS' },
    { role: 'Manager', desc: 'Can manage workspace tasks, projects, timelines, and invite contributors', users: '3 Members', badge: 'MANAGEMENT' },
    { role: 'Contributor', desc: 'Can create, execute, update, and resolve assigned daily mandates', users: '12 Members', badge: 'CONTRIBUTOR' }
  ];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 py-6 space-y-6 pb-20">
        <div className="border-b border-outline-variant pb-5">
          <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest mb-1">Governance Layer</p>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Permissions &amp; Roles</h1>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">Role-based access control matrix across workspace resources.</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 md:p-6 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase text-on-surface-variant tracking-wider">Access Hierarchy</h2>
          <div className="space-y-3">
            {roles.map((item) => (
              <div 
                key={item.role} 
                className="bg-surface-container/60 hover:bg-surface-container border border-outline-variant p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-on-surface">{item.role}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant border border-outline-variant">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">{item.desc}</p>
                </div>
                <span className="text-xs font-mono text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-lg border border-outline-variant whitespace-nowrap self-start sm:self-auto">
                  {item.users}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PermissionsPage;
